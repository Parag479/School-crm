import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';

export const listFeeCategories = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const categories = dbService.store.feeCategories.filter((c) => c.schoolId === schoolId);
  return res.json({ success: true, data: categories });
};

export const listFeeStructures = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId } = req.query;

  let structures = dbService.store.feeStructures.filter((s) => s.schoolId === schoolId);
  if (classId && classId !== 'ALL') {
    structures = structures.filter((s) => s.classId === classId);
  }

  return res.json({ success: true, data: structures });
};

export const createFeeStructure = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { academicYearId, classId, categoryId, title, amount, frequency, dueDate } = req.body;

  if (!classId || !categoryId || !title || !amount || !dueDate) {
    throw new AppError('Missing required fee structure fields', 400);
  }

  const newStructure = {
    id: `fstr-${Date.now()}`,
    schoolId,
    academicYearId: academicYearId || 'ay-2026-2027',
    classId,
    categoryId,
    title,
    amount: parseFloat(amount),
    frequency: frequency || 'QUARTERLY',
    dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dbService.store.feeStructures.push(newStructure);

  return res.status(201).json({
    success: true,
    message: 'Fee structure created successfully',
    data: newStructure,
  });
};

export const listInvoices = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { status, studentId, search } = req.query;

  let invoices = dbService.store.invoices.filter((i) => i.schoolId === schoolId);

  if (status && status !== 'ALL') {
    invoices = invoices.filter((i) => i.status === status);
  }

  if (studentId) {
    invoices = invoices.filter((i) => i.studentId === studentId);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    invoices = invoices.filter(
      (i) =>
        i.invoiceNumber.toLowerCase().includes(q) ||
        (i.studentName && i.studentName.toLowerCase().includes(q)) ||
        (i.admissionNumber && i.admissionNumber.toLowerCase().includes(q))
    );
  }

  invoices.sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime());

  return res.json({
    success: true,
    data: invoices,
    meta: { total: invoices.length },
  });
};

export const getInvoiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const invoice = dbService.store.invoices.find((i) => i.id === id);

  if (!invoice) {
    throw new AppError('Invoice not found', 404);
  }

  const student = dbService.store.students.find((s) => s.id === invoice.studentId);
  const payments = dbService.store.payments.filter((p) => p.invoiceId === id);

  return res.json({
    success: true,
    data: {
      ...invoice,
      student,
      payments,
    },
  });
};

export const generateInvoice = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { studentId, items, dueDate } = req.body;

  const student = dbService.store.students.find((s) => s.id === studentId);
  if (!student) {
    throw new AppError('Student not found', 404);
  }

  const totalAmount = items.reduce((sum: number, it: any) => sum + parseFloat(it.amount), 0);
  const invoiceNumber = `INV-2026-${String(dbService.store.invoices.length + 1001)}`;
  const invoiceId = `inv-${Date.now()}`;

  const newInvoice = {
    id: invoiceId,
    schoolId,
    invoiceNumber,
    studentId,
    studentName: student.fullName,
    admissionNumber: student.admissionNumber,
    className: student.className,
    sectionName: student.sectionName,
    academicYearId: student.academicYearId || 'ay-2026-2027',
    totalAmount,
    paidAmount: 0,
    balanceAmount: totalAmount,
    discountAmount: 0,
    lateFee: 0,
    status: 'PENDING',
    dueDate: dueDate || new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
    issuedDate: new Date().toISOString().split('T')[0],
    items: items.map((it: any, idx: number) => ({
      id: `item-${Date.now()}-${idx}`,
      invoiceId,
      title: it.title,
      amount: parseFloat(it.amount),
      category: it.category || 'TUITION',
    })),
    payments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dbService.store.invoices.unshift(newInvoice);
  student.totalPendingFees = (student.totalPendingFees || 0) + totalAmount;

  return res.status(201).json({
    success: true,
    message: 'Invoice generated successfully',
    data: newInvoice,
  });
};

