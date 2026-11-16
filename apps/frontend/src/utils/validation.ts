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
