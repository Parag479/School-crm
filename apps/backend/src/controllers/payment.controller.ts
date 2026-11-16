import { Request, Response } from 'express';
import crypto from 'crypto';
import { dbService } from '../services/db.service.js';
import { env } from '../config/env.js';
import { AppError } from '../middleware/error.middleware.js';
import { FeePaymentSchema } from '@edumanage/validation';

export const createRazorpayOrder = async (req: Request, res: Response) => {
  const { invoiceId, amount } = req.body;

  const invoice = dbService.store.invoices.find((i) => i.id === invoiceId);
  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  const payAmount = parseFloat(amount || invoice.balanceAmount);
  if (payAmount <= 0) {
    throw new AppError('Invalid payment amount', 400);
  }

  if (payAmount > invoice.balanceAmount) {
    throw new AppError(`Payment amount (₹${payAmount}) cannot exceed invoice balance (₹${invoice.balanceAmount})`, 400);
  }

  // Create simulated or live Razorpay order
  const razorpayOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  // Record pending transaction
  dbService.store.paymentTransactions.push({
    id: `tx-${Date.now()}`,
    schoolId: invoice.schoolId,
    razorpayOrderId,
    amount: payAmount,
    currency: 'INR',
    status: 'CREATED',
    createdAt: new Date().toISOString(),
  });

  return res.json({
    success: true,
    data: {
      orderId: razorpayOrderId,
      amount: payAmount * 100, // paise
      currency: 'INR',
      keyId: env.RAZORPAY_KEY_ID,
      schoolName: 'Greenwood International Academy',
      studentName: invoice.studentName,
      invoiceNumber: invoice.invoiceNumber,
    },
  });
};

export const verifyRazorpayPayment = async (req: Request, res: Response) => {
  const { invoiceId, razorpayOrderId, razorpayPaymentId, razorpaySignature, amount } = req.body;

  const invoice = dbService.store.invoices.find((i) => i.id === invoiceId);
  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  // Verify HMAC signature
  const generatedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  // If in demo/test mode with dummy key, verify or allow test signature verification
  const isTestMode = env.RAZORPAY_KEY_SECRET === 'rzp_secret_schoolerp456';
  const isSignatureValid = isTestMode || generatedSignature === razorpaySignature;

  if (!isSignatureValid) {
    throw new AppError('Invalid Razorpay signature. Payment verification failed.', 400);
  }

  // Prevent duplicate payment processing
  const existingPayment = dbService.store.payments.find(
    (p) => p.razorpayPaymentId && p.razorpayPaymentId === razorpayPaymentId
  );
  if (existingPayment) {
    return res.json({
      success: true,
      message: 'Payment already processed and recorded',
      data: existingPayment,
    });
  }

  const payAmount = parseFloat(amount || invoice.balanceAmount);
  const receiptCount = dbService.store.payments.length + 101;
  const receiptNumber = `RCP-2026-${String(receiptCount).padStart(4, '0')}`;

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    schoolId: invoice.schoolId,
    receiptNumber,
    invoiceId: invoice.id,
    studentId: invoice.studentId,
    studentName: invoice.studentName,
    amount: payAmount,
    paymentMode: 'RAZORPAY',
    transactionReference: razorpayPaymentId,
    razorpayPaymentId,
    razorpayOrderId,
    status: 'SUCCESS',
    paidAt: new Date().toISOString(),
    collectedById: 'RAZORPAY_GATEWAY',
    notes: 'Online payment verified via Razorpay webhook signature',
  };

  dbService.store.payments.push(paymentRecord);

  // Update invoice balance
  invoice.paidAmount += payAmount;
  invoice.balanceAmount = Math.max(0, invoice.totalAmount - invoice.paidAmount);
  invoice.status = invoice.balanceAmount === 0 ? 'PAID' : 'PARTIAL';
  invoice.updatedAt = new Date().toISOString();

  // Update student pending balance
  const student = dbService.store.students.find((s) => s.id === invoice.studentId);
  if (student) {
    student.totalPendingFees = Math.max(0, (student.totalPendingFees || 0) - payAmount);
  }

  // Audit log
  dbService.store.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    schoolId: invoice.schoolId,
    userId: req.user?.id || 'system',
    userName: req.user?.name || 'Razorpay Gateway',
    action: 'ONLINE_FEE_PAYMENT',
    resource: 'PAYMENT',
    details: `Payment of ₹${payAmount} received for ${invoice.invoiceNumber}. Receipt: ${receiptNumber}`,
    createdAt: new Date().toISOString(),
  });

  return res.json({
    success: true,
    message: 'Payment verified and receipt generated successfully',
    data: paymentRecord,
  });
};

export const collectOfflinePayment = async (req: Request, res: Response) => {
  const validated = FeePaymentSchema.parse(req.body);
  const { invoiceId, amount, paymentMode, transactionReference } = validated;

  const invoice = dbService.store.invoices.find((i) => i.id === invoiceId);
  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  if (amount > invoice.balanceAmount) {
    throw new AppError(`Amount ₹${amount} exceeds balance ₹${invoice.balanceAmount}`, 400);
  }

  const receiptCount = dbService.store.payments.length + 101;
  const receiptNumber = `RCP-2026-${String(receiptCount).padStart(4, '0')}`;

  const paymentRecord = {
    id: `pay-${Date.now()}`,
    schoolId: invoice.schoolId,
    receiptNumber,
    invoiceId: invoice.id,
    studentId: invoice.studentId,
    studentName: invoice.studentName,
    amount,
    paymentMode,
    transactionReference: transactionReference || `${paymentMode}-OFFLINE`,
    status: 'SUCCESS',
    paidAt: new Date().toISOString(),
    collectedById: req.user?.id || 'usr-accountant-001',
    notes: `Offline collection recorded by ${req.user?.name || 'Accounts Desk'}`,
  };

  dbService.store.payments.push(paymentRecord);

  // Update invoice
  invoice.paidAmount += amount;
  invoice.balanceAmount = Math.max(0, invoice.totalAmount - invoice.paidAmount);
  invoice.status = invoice.balanceAmount === 0 ? 'PAID' : 'PARTIAL';
  invoice.updatedAt = new Date().toISOString();

  // Update student total pending
  const student = dbService.store.students.find((s) => s.id === invoice.studentId);
  if (student) {
    student.totalPendingFees = Math.max(0, (student.totalPendingFees || 0) - amount);
  }

  return res.status(201).json({
    success: true,
    message: 'Fee payment collected successfully',
    data: paymentRecord,
  });
};

export const listPayments = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const payments = dbService.store.payments.filter((p) => p.schoolId === schoolId);
  payments.sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());
  return res.json({ success: true, data: payments });
};

