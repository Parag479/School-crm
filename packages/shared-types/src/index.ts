export type RoleType =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'TEACHER'
  | 'PARENT'
  | 'STUDENT'
  | 'ACCOUNTANT'
  | 'ADMISSION_OFFICER';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

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

export type FeeCategoryType =
  | 'ADMISSION'
  | 'TUITION'
  | 'TRANSPORT'
  | 'EXAMINATION'
  | 'LIBRARY'
  | 'LABORATORY'
  | 'SPORTS'
  | 'OTHER';

export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'REFUNDED';

export type PaymentMode = 'CASH' | 'BANK_TRANSFER' | 'UPI' | 'CARD' | 'RAZORPAY' | 'CHEQUE';

export type ExamType =
  | 'UNIT_TEST_1'
  | 'MID_TERM'
  | 'UNIT_TEST_2'
  | 'FINAL_TERM'
  | 'PERIODIC_TEST'
  | 'PRACTICAL';

export type HomeworkStatus = 'PENDING' | 'SUBMITTED' | 'EVALUATED' | 'OVERDUE';

export type BookIssueStatus = 'ISSUED' | 'RETURNED' | 'OVERDUE' | 'LOST';

export interface School {
  id: string;
  name: string;
  slug: string;
  code: string;
  affiliationNumber?: string;
  board: 'CBSE' | 'ICSE' | 'STATE_BOARD' | 'IB' | 'CAMBRIDGE';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
  favicon?: string;
  principalName?: string;
  principalMessage?: string;
  establishedYear?: number;
  currency: string;
  currencySymbol: string;
  activeAcademicYearId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  phone?: string;
  role: RoleType;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicYear {
  id: string;
  schoolId: string;
  name: string; // e.g., "2026-2027"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassEntity {
  id: string;
  schoolId: string;
  name: string; // e.g. "Class 10"
  numericOrder: number;
  sections?: SectionEntity[];
  subjects?: SubjectEntity[];
}

export interface SectionEntity {
  id: string;
  classId: string;
  name: string; // e.g. "A", "B", "C"
  classTeacherId?: string;
  classTeacherName?: string;
  roomNumber?: string;
  capacity?: number;
}

export interface SubjectEntity {
  id: string;
  schoolId: string;
  classId: string;
  name: string;
  code: string;
  type: 'THEORY' | 'PRACTICAL' | 'BOTH';
  teacherId?: string;
  teacherName?: string;
}

export interface StudentEntity {
  id: string;
  schoolId: string;
  admissionNumber: string;
  rollNumber?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup?: BloodGroup;
  category?: string;
  religion?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  classId: string;
  className?: string;
  sectionId: string;
  sectionName?: string;
  academicYearId: string;
  admissionDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ALUMNI' | 'SUSPENDED';
  parents?: ParentEntity[];
  documents?: StudentDocumentEntity[];
  attendancePercentage?: number;
  totalPendingFees?: number;
}

export interface ParentEntity {
  id: string;
  schoolId: string;
  userId?: string;
  fatherName: string;
  fatherOccupation?: string;
  fatherPhone: string;
  fatherEmail?: string;
  motherName: string;
  motherOccupation?: string;
  motherPhone?: string;
  motherEmail?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianRelation?: string;
  address: string;
  students?: StudentEntity[];
}

export interface TeacherEntity {
  id: string;
  schoolId: string;
  userId?: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string;
  joiningDate: string;
  designation: string;
  qualification: string;
  experienceYears: number;
  departmentId?: string;
  departmentName?: string;
  assignedClasses?: string[];
  assignedSubjects?: string[];
  avatar?: string;
  address: string;
  salary?: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
}

export interface StaffEntity {
  id: string;
  schoolId: string;
  userId?: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
}

export interface AdmissionEnquiry {
  id: string;
  schoolId: string;
  enquiryNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: Gender;
  parentName: string;
  phone: string;
  email: string;
  currentSchool?: string;
  applyingClass: string;
  address?: string;
  message?: string;
  status: LeadStatus;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  followUpDate?: string;
  notes?: AdmissionNote[];
  documents?: AdmissionDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionNote {
  id: string;
  enquiryId: string;
  userId: string;
  userName: string;
  note: string;
  createdAt: string;
}

export interface AdmissionDocument {
  id: string;
  enquiryId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}

export interface StudentDocumentEntity {
  id: string;
  studentId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  verified: boolean;
  uploadedAt: string;
}

export interface AttendanceRecord {
  id: string;
  schoolId: string;
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  classId: string;
  sectionId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  remarks?: string;
  recordedById: string;
}

export interface FeeStructure {
  id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  className?: string;
  category: FeeCategoryType;
  title: string;
  amount: number;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | 'ONE_TIME';
  dueDate: string;
}

export interface Invoice {
  id: string;
  schoolId: string;
  invoiceNumber: string;
  studentId: string;
  studentName?: string;
  admissionNumber?: string;
  className?: string;
  sectionName?: string;
  academicYearId: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  discountAmount: number;
  lateFee: number;
  status: PaymentStatus;
  dueDate: string;
  issuedDate: string;
  items: InvoiceItem[];
  payments: PaymentReceipt[];
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  title: string;
  amount: number;
  category: FeeCategoryType;
}

export interface PaymentReceipt {
  id: string;
  schoolId: string;
  receiptNumber: string;
  invoiceId: string;
  studentId: string;
  studentName?: string;
  amount: number;
  paymentMode: PaymentMode;
  transactionReference?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  paidAt: string;
  collectedById?: string;
}

export interface Examination {
  id: string;
  schoolId: string;
  academicYearId: string;
  name: string;
  type: ExamType;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  subjects?: ExamScheduleItem[];
}

export interface ExamScheduleItem {
  id: string;
  examId: string;
  classId: string;
  className?: string;
  subjectId: string;
  subjectName?: string;
  examDate: string;
  startTime: string;
  endTime: string;
  maxMarks: number;
  passMarks: number;
}

export interface StudentMarks {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  subjectId: string;
  subjectName?: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
}

export interface TimetableSlot {
  id: string;
  schoolId: string;
  classId: string;
  sectionId: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';
  periodNumber: number;
  startTime: string; // e.g. "08:30"
  endTime: string;   // e.g. "09:15"
  subjectId: string;
  subjectName?: string;
  teacherId: string;
  teacherName?: string;
  roomNumber?: string;
}

export interface HomeworkEntity {
  id: string;
  schoolId: string;
  classId: string;
  className?: string;
  sectionId: string;
  sectionName?: string;
  subjectId: string;
  subjectName?: string;
  teacherId: string;
  teacherName?: string;
  title: string;
  description: string;
  dueDate: string;
  attachmentUrl?: string;
  createdAt: string;
  submissionsCount?: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName?: string;
  submittedAt: string;
  attachmentUrl?: string;
  notes?: string;
  status: 'SUBMITTED' | 'GRADED' | 'RETURNED';
  grade?: string;
  feedback?: string;
}

export interface LibraryBook {
  id: string;
  schoolId: string;
  isbn: string;
  title: string;
  author: string;
  publisher?: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  locationRack?: string;
}

export interface BookIssue {
  id: string;
  schoolId: string;
  bookId: string;
  bookTitle?: string;
  studentId?: string;
  studentName?: string;
  teacherId?: string;
  teacherName?: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: BookIssueStatus;
}

export interface TransportRoute {
  id: string;
  schoolId: string;
  routeNumber: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  vehicleId?: string;
  vehicleNumber?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  fareMonthly: number;
  stops: TransportStop[];
}

export interface TransportStop {
  id: string;
  routeId: string;
  stopName: string;
  pickupTime: string;
  dropTime: string;
  fare: number;
}

export interface TransportAllocation {
  id: string;
  schoolId: string;
  studentId: string;
  studentName?: string;
  routeId: string;
  routeName?: string;
  stopId: string;
  stopName?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface NoticeEntity {
  id: string;
  schoolId: string;
  title: string;
  content: string;
  targetRole: 'ALL' | 'TEACHERS' | 'STUDENTS' | 'PARENTS' | 'STAFF';
  isImportant: boolean;
  publishedAt: string;
  expiresAt?: string;
  attachmentUrl?: string;
  authorName?: string;
}

export interface EventEntity {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  category: 'ACADEMIC' | 'SPORTS' | 'CULTURAL' | 'HOLIDAY' | 'MEETING';
  bannerImage?: string;
  isPublicWebsite: boolean;
}

export interface NewsEntity {
  id: string;
  schoolId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedDate: string;
  isFeatured: boolean;
  author: string;
}

export interface GalleryItem {
  id: string;
  schoolId: string;
  title: string;
  category: 'CAMPUS' | 'SPORTS' | 'EVENTS' | 'CELEBRATIONS' | 'CLASSROOMS' | 'LABS';
  imageUrl: string;
  caption?: string;
  isFeatured: boolean;
}

export interface WebsiteCMSConfig {
  schoolId: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  schoolIntro: string;
  vision: string;
  mission: string;
  coreValues: string[];
  principalPhotoUrl: string;
  principalName: string;
  principalDesignation: string;
  principalMessage: string;
  statsStudents: number;
  statsTeachers: number;
  statsYears: number;
  statsClassrooms: number;
  whyChoosePoints: { title: string; description: string; icon: string }[];
  phone: string;
  email: string;
  address: string;
  timings: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

