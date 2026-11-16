import { Router } from 'express';
import { authenticate, requireRole, requireTenant } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import * as authCtrl from '../controllers/auth.controller.js';
import * as dashCtrl from '../controllers/dashboard.controller.js';
import * as admCtrl from '../controllers/admission.controller.js';
import * as stuCtrl from '../controllers/student.controller.js';
import * as acaCtrl from '../controllers/academic.controller.js';
import * as stfCtrl from '../controllers/staff.controller.js';
import * as attCtrl from '../controllers/attendance.controller.js';
import * as feeCtrl from '../controllers/fee.controller.js';
import * as payCtrl from '../controllers/payment.controller.js';
import * as exmCtrl from '../controllers/exam.controller.js';
import * as opsCtrl from '../controllers/academic-ops.controller.js';
import * as logCtrl from '../controllers/operations.controller.js';
import * as comCtrl from '../controllers/communication.controller.js';
import * as webCtrl from '../controllers/website.controller.js';
import * as repCtrl from '../controllers/report.controller.js';
import * as setCtrl from '../controllers/settings.controller.js';
import * as aiCtrl from '../controllers/ai.controller.js';

const router = Router();

// Apply tenant context to all routes
router.use(requireTenant);

// --- Public Endpoints ---
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', authenticate, authCtrl.getMe);
router.post('/auth/logout', authCtrl.logout);

// Public Website Content & Online Enquiry
router.get('/website/public', webCtrl.getPublicWebsiteContent);
router.post('/admissions/enquiry', admCtrl.createEnquiry); // Public Admission Enquiry form
router.post('/ai/admission-chat', aiCtrl.admissionChat); // Public AI Admission Assistant chatbot
router.get('/news/public', comCtrl.listNews);
router.get('/news/public/:slug', comCtrl.getNewsBySlug);
router.get('/events/public', comCtrl.listEvents);
router.get('/gallery/public', comCtrl.listGallery);

// File Upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  return res.json({
    success: true,
    message: 'File uploaded successfully',
    data: {
      fileUrl,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});

// --- Authenticated Portal Endpoints ---
router.use(authenticate);

// 1. Dashboard
router.get('/dashboard', dashCtrl.getDashboardStats);

// 2. Admission CRM
router.get('/admissions', admCtrl.listEnquiries);
router.get('/admissions/:id', admCtrl.getEnquiry);
router.patch('/admissions/:id/status', admCtrl.updateEnquiryStatus);
router.post('/admissions/:id/convert', admCtrl.convertEnquiryToStudent);

// 3. Student Management
router.get('/students', stuCtrl.listStudents);
router.get('/students/:id', stuCtrl.getStudentProfile);
router.post('/students', requireRole('ADMIN', 'SUPER_ADMIN', 'ADMISSION_OFFICER'), stuCtrl.createStudent);
router.put('/students/:id', requireRole('ADMIN', 'SUPER_ADMIN'), stuCtrl.updateStudent);
router.delete('/students/:id', requireRole('ADMIN', 'SUPER_ADMIN'), stuCtrl.deleteStudent);

// 4. Academic Management
router.get('/academic-years', acaCtrl.listAcademicYears);
router.get('/classes', acaCtrl.listClasses);
router.post('/classes', requireRole('ADMIN', 'SUPER_ADMIN'), acaCtrl.createClass);
router.get('/subjects', acaCtrl.listSubjects);
router.post('/subjects', requireRole('ADMIN', 'SUPER_ADMIN'), acaCtrl.createSubject);

// 5. Staff & Teachers
router.get('/teachers', stfCtrl.listTeachers);
router.post('/teachers', requireRole('ADMIN', 'SUPER_ADMIN'), stfCtrl.createTeacher);
router.get('/staff', stfCtrl.listStaff);
router.get('/departments', stfCtrl.listDepartments);

// 6. Attendance Management
router.get('/attendance/sheet', attCtrl.getAttendanceSheet);
router.post('/attendance/bulk', requireRole('ADMIN', 'SUPER_ADMIN', 'TEACHER'), attCtrl.saveBulkAttendance);
router.get('/attendance/reports', attCtrl.getAttendanceReports);

// 7. Fees Management
router.get('/fees/categories', feeCtrl.listFeeCategories);
router.get('/fees/structures', feeCtrl.listFeeStructures);
router.post('/fees/structures', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), feeCtrl.createFeeStructure);
router.get('/fees/invoices', feeCtrl.listInvoices);
router.get('/fees/invoices/:id', feeCtrl.getInvoiceById);
router.post('/fees/invoices', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), feeCtrl.generateInvoice);

// 8. Payment & Razorpay Integration
router.post('/payments/razorpay-order', payCtrl.createRazorpayOrder);
router.post('/payments/razorpay-verify', payCtrl.verifyRazorpayPayment);
router.post('/payments/collect-offline', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), payCtrl.collectOfflinePayment);
router.get('/payments', payCtrl.listPayments);

// 9. Examinations & Results
router.get('/examinations', exmCtrl.listExaminations);
router.post('/examinations', requireRole('ADMIN', 'SUPER_ADMIN'), exmCtrl.createExamination);
router.post('/examinations/marks/bulk', requireRole('ADMIN', 'SUPER_ADMIN', 'TEACHER'), exmCtrl.saveBulkMarks);
router.get('/examinations/:examId/report-card/:studentId', exmCtrl.getStudentReportCard);

// 10. Timetables & Homework
router.get('/timetables', opsCtrl.getTimetable);
router.get('/homework', opsCtrl.listHomework);
router.post('/homework', requireRole('ADMIN', 'SUPER_ADMIN', 'TEACHER'), opsCtrl.createHomework);
router.post('/homework/:homeworkId/submit', opsCtrl.submitHomework);

// 11. Operations (Library & Transport)
router.get('/library/books', logCtrl.listLibraryBooks);
router.post('/library/issue', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), logCtrl.issueBook);
router.post('/library/return/:id', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), logCtrl.returnBook);
router.get('/transport/routes', logCtrl.listTransportRoutes);
router.get('/transport/vehicles', logCtrl.listVehicles);

// 12. Communication (Notices, Events, News, Gallery)
router.get('/notices', comCtrl.listNotices);
router.post('/notices', requireRole('ADMIN', 'SUPER_ADMIN', 'TEACHER'), comCtrl.createNotice);
router.get('/events', comCtrl.listEvents);
router.get('/news', comCtrl.listNews);
router.get('/gallery', comCtrl.listGallery);

// 13. Website CMS (Admin)
router.post('/website/cms', requireRole('ADMIN', 'SUPER_ADMIN'), webCtrl.updateWebsiteContent);

// 14. Reports & Settings
router.get('/reports/consolidated', requireRole('ADMIN', 'SUPER_ADMIN', 'ACCOUNTANT'), repCtrl.getConsolidatedReports);
router.get('/settings/school', setCtrl.getSchoolSettings);
router.put('/settings/school', requireRole('ADMIN', 'SUPER_ADMIN'), setCtrl.updateSchoolSettings);
router.get('/settings/audit-logs', requireRole('ADMIN', 'SUPER_ADMIN'), setCtrl.listAuditLogs);

// 15. AI Powered Modules
router.post('/ai/executive-summary', aiCtrl.executiveSummary);
router.post('/ai/draft-notice', aiCtrl.draftNotice);
router.post('/ai/student-insights', aiCtrl.studentInsights);

export default router;

