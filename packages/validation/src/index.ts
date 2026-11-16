import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const AdmissionEnquirySchema = z.object({
  studentName: z.string().min(2, 'Student name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid DOB is required (YYYY-MM-DD)'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  parentName: z.string().min(2, 'Parent name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Valid email is required'),
  currentSchool: z.string().optional(),
  applyingClass: z.string().min(1, 'Applying class is required'),
  address: z.string().optional(),
  message: z.string().optional(),
});

export type AdmissionEnquiryInput = z.infer<typeof AdmissionEnquirySchema>;

export const StudentCreateSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'DOB must be YYYY-MM-DD'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().regex(/^[6-9]\d{9}$/, '10-digit phone number').optional().or(z.literal('')),
  address: z.string().min(3, 'Address is required'),
  city: z.string().default('New Delhi'),
  state: z.string().default('Delhi'),
  pincode: z.string().regex(/^\d{6}$/, '6-digit PIN code required'),
  classId: z.string().min(1, 'Class is required'),
  sectionId: z.string().min(1, 'Section is required'),
  academicYearId: z.string().min(1, 'Academic year is required'),
  admissionDate: z.string().default(() => new Date().toISOString().split('T')[0]),
  fatherName: z.string().min(2, "Father's name is required"),
  fatherPhone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit father's contact number"),
  fatherEmail: z.string().email().optional().or(z.literal('')),
  motherName: z.string().min(2, "Mother's name is required"),
  motherPhone: z.string().optional(),
});

export type StudentCreateInput = z.infer<typeof StudentCreateSchema>;

export const TeacherCreateSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, '10-digit phone number'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  joiningDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  designation: z.string().min(2, 'Designation is required'),
  qualification: z.string().min(2, 'Qualification is required'),
  experienceYears: z.coerce.number().min(0),
  departmentId: z.string().optional(),
  address: z.string().min(3, 'Address is required'),
  salary: z.coerce.number().optional(),
});

export type TeacherCreateInput = z.infer<typeof TeacherCreateSchema>;

export const AttendanceBulkSchema = z.object({
  classId: z.string().min(1),
  sectionId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid date required (YYYY-MM-DD)'),
  records: z.array(
    z.object({
      studentId: z.string().min(1),
      status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'LEAVE', 'HALF_DAY']),
      remarks: z.string().optional(),
    })
  ),
});

export type AttendanceBulkInput = z.infer<typeof AttendanceBulkSchema>;

export const FeePaymentSchema = z.object({
  invoiceId: z.string().min(1),
  amount: z.coerce.number().positive('Payment amount must be greater than zero'),
  paymentMode: z.enum(['CASH', 'BANK_TRANSFER', 'UPI', 'CARD', 'RAZORPAY', 'CHEQUE']),
  transactionReference: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  razorpaySignature: z.string().optional(),
});

export type FeePaymentInput = z.infer<typeof FeePaymentSchema>;

export const ExamMarksBulkSchema = z.object({
  examId: z.string().min(1),
  classId: z.string().min(1),
  subjectId: z.string().min(1),
  marksList: z.array(
    z.object({
      studentId: z.string().min(1),
      marksObtained: z.coerce.number().min(0),
      maxMarks: z.coerce.number().positive(),
      remarks: z.string().optional(),
    })
  ),
});

export type ExamMarksBulkInput = z.infer<typeof ExamMarksBulkSchema>;

export const HomeworkCreateSchema = z.object({
  classId: z.string().min(1),
  sectionId: z.string().min(1),
  subjectId: z.string().min(1),
  title: z.string().min(3, 'Homework title is required'),
  description: z.string().min(5, 'Description is required'),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Due date required (YYYY-MM-DD)'),
});

export type HomeworkCreateInput = z.infer<typeof HomeworkCreateSchema>;

export const NoticeCreateSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
  targetRole: z.enum(['ALL', 'TEACHERS', 'STUDENTS', 'PARENTS', 'STAFF']),
  isImportant: z.boolean().default(false),
  expiresAt: z.string().optional(),
});

export type NoticeCreateInput = z.infer<typeof NoticeCreateSchema>;

