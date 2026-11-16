export type RoleType =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'TEACHER'
  | 'PARENT'
  | 'STUDENT'
  | 'ACCOUNTANT'
  | 'ADMISSION_OFFICER';

export type LeadStatus =
  | 'NEW_ENQUIRY'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'SCHOOL_VISIT'
  | 'APPLICATION_SUBMITTED'
  | 'DOCUMENT_VERIFICATION'
  | 'APPROVED'
  | 'REJECTED';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE' | 'HALF_DAY';
export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'REFUNDED';
export type PaymentMode = 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD' | 'RAZORPAY' | 'CHEQUE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: RoleType;
  avatar?: string;
  schoolId: string;
  schoolName: string;
  schoolCode?: string;
  student?: any;
  parent?: any;
  teacher?: any;
}

export interface Student {
  id: string;
  admissionNumber: string;
  rollNumber?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  admissionDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  attendancePercentage?: number;
  totalPendingFees?: number;
}

export interface AdmissionEnquiry {
  id: string;
  enquiryNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  phone: string;
  email: string;
  currentSchool?: string;
  applyingClass: string;
  address?: string;
  message?: string;
  status: LeadStatus;
  assignedOfficerName?: string;
  followUpDate?: string;
  createdAt: string;
  followups?: { id: string; officerName: string; note: string; createdAt: string }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName?: string;
  admissionNumber?: string;
  className?: string;
  sectionName?: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: PaymentStatus;
  dueDate: string;
  issuedDate: string;
  items: { id: string; title: string; amount: number; category: string }[];
  payments: { id: string; receiptNumber: string; amount: number; paymentMode: string; paidAt: string }[];
}

export interface Examination {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  subjects?: {
    id: string;
    className: string;
    subjectName: string;
    examDate: string;
    startTime: string;
    endTime: string;
    maxMarks: number;
    passMarks: number;
  }[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetRole: string;
  isImportant: boolean;
  publishedAt: string;
  authorName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  bannerImage?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedDate: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  isFeatured: boolean;
}

