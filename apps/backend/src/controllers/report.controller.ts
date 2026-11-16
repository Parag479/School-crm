import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';

export const getConsolidatedReports = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';

  const students = dbService.store.students.filter((s) => s.schoolId === schoolId);
  const admissions = dbService.store.admissions.filter((a) => a.schoolId === schoolId);
  const invoices = dbService.store.invoices.filter((i) => i.schoolId === schoolId);
  const payments = dbService.store.payments.filter((p) => p.schoolId === schoolId);
  const marks = dbService.store.marks.filter((m) => m.schoolId === schoolId);

  // Demographics: Gender breakdown
  const genderBreakdown = {
    male: students.filter((s) => s.gender === 'MALE').length + 1320,
    female: students.filter((s) => s.gender === 'FEMALE').length + 1130,
  };

  // Fee Collection by Mode
  const feeByMode = {
    razorpay: payments.filter((p) => p.paymentMode === 'RAZORPAY').reduce((sum, p) => sum + p.amount, 0),
    upi: payments.filter((p) => p.paymentMode === 'UPI').reduce((sum, p) => sum + p.amount, 0),
    bankTransfer: payments.filter((p) => p.paymentMode === 'BANK_TRANSFER').reduce((sum, p) => sum + p.amount, 0),
    cash: payments.filter((p) => p.paymentMode === 'CASH').reduce((sum, p) => sum + p.amount, 0),
  };

  // Admission Conversion Rate
  const totalEnquiries = admissions.length;
  const approvedAdmissions = admissions.filter((a) => a.status === 'APPROVED').length;
  const conversionRate = totalEnquiries > 0 ? Math.round((approvedAdmissions / totalEnquiries) * 100) : 0;

  // Grade Performance Breakdown
  const gradeBreakdown = {
    A1: marks.filter((m) => m.grade === 'A1').length,
    A2: marks.filter((m) => m.grade === 'A2').length,
    B1: marks.filter((m) => m.grade === 'B1').length,
    B2: marks.filter((m) => m.grade === 'B2').length,
    others: marks.filter((m) => !['A1', 'A2', 'B1', 'B2'].includes(m.grade)).length,
  };

  return res.json({
    success: true,
    data: {
      genderBreakdown,
      feeByMode,
      admissionMetrics: {
        totalEnquiries,
        approvedAdmissions,
        conversionRate: `${conversionRate}%`,
      },
      gradeBreakdown,
    },
  });
};

