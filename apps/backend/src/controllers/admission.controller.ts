import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { AdmissionEnquirySchema } from '@edumanage/validation';

export const listEnquiries = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { status, search, applyingClass } = req.query;

  let enquiries = dbService.store.admissions.filter((a) => a.schoolId === schoolId);

  if (status && status !== 'ALL') {
    enquiries = enquiries.filter((a) => a.status === status);
  }

  if (applyingClass && applyingClass !== 'ALL') {
    enquiries = enquiries.filter((a) => a.applyingClass === applyingClass);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    enquiries = enquiries.filter(
      (a) =>
        a.studentName.toLowerCase().includes(q) ||
        a.parentName.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.enquiryNumber.toLowerCase().includes(q)
    );
  }

  // Sort newest first
  enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return res.json({
    success: true,
    data: enquiries,
    meta: { total: enquiries.length },
  });
};

export const getEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const enquiry = dbService.store.admissions.find((a) => a.id === id);

  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }

  const followups = dbService.store.admissionFollowups.filter((f) => f.admissionId === id);

  return res.json({
    success: true,
    data: {
      ...enquiry,
      followups,
    },
  });
};

export const createEnquiry = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = AdmissionEnquirySchema.parse(req.body);

  const enquiryCount = dbService.store.admissions.length + 1001;
  const enquiryNumber = `ENQ-2026-${enquiryCount}`;

  const newEnquiry = {
    id: `adm-${Date.now()}`,
    schoolId,
    enquiryNumber,
    studentName: validated.studentName,
    dateOfBirth: validated.dateOfBirth,
    gender: validated.gender,
    parentName: validated.parentName,
    phone: validated.phone,
    email: validated.email,
    currentSchool: validated.currentSchool || '',
    applyingClass: validated.applyingClass,
    address: validated.address || '',
    message: validated.message || '',
    status: 'NEW_ENQUIRY',
    assignedOfficerId: 'usr-admissions-001',
    assignedOfficerName: 'Pooja Singhania',
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dbService.store.admissions.unshift(newEnquiry);

  // Add initial system follow-up note
  dbService.store.admissionFollowups.push({
    id: `fol-${Date.now()}`,
    admissionId: newEnquiry.id,
    officerName: 'System Gateway',
    note: `Online enquiry received from website for ${newEnquiry.applyingClass}. Notification sent to admission desk.`,
    createdAt: new Date().toISOString(),
  });

  return res.status(201).json({
    success: true,
    message: 'Admission enquiry submitted successfully',
    data: newEnquiry,
  });
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note, followUpDate, assignedOfficerName } = req.body;

  const enquiry = dbService.store.admissions.find((a) => a.id === id);
  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }

  if (status) {
    enquiry.status = status;
  }
  if (followUpDate) {
    enquiry.followUpDate = followUpDate;
  }
  if (assignedOfficerName) {
    enquiry.assignedOfficerName = assignedOfficerName;
  }
  enquiry.updatedAt = new Date().toISOString();

  if (note) {
    dbService.store.admissionFollowups.push({
      id: `fol-${Date.now()}`,
      admissionId: id,
      officerName: req.user?.name || 'Admission Officer',
      note,
      followUpDate: followUpDate || enquiry.followUpDate,
      createdAt: new Date().toISOString(),
    });
  }

  return res.json({
    success: true,
    message: 'Enquiry updated successfully',
    data: enquiry,
  });
};

export const convertEnquiryToStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { classId, sectionId } = req.body;

  const enquiry = dbService.store.admissions.find((a) => a.id === id);
  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }

  const studentCount = dbService.store.students.length + 1;
  const admissionNumber = `GIA-2026-${String(studentCount).padStart(3, '0')}`;

  const targetClass = dbService.store.classes.find((c) => c.id === (classId || 'class-13')) || dbService.store.classes[12];
  const targetSection = dbService.store.sections.find((s) => s.id === (sectionId || 'sec-class-13-a')) || dbService.store.sections[0];

  // 1. Create Parent record
  const parentId = `par-${Date.now()}`;
  const newParent = {
    id: parentId,
    schoolId: enquiry.schoolId,
    fatherName: enquiry.parentName,
    fatherPhone: enquiry.phone,
    fatherEmail: enquiry.email,
    motherName: 'Mrs. Parent',
    motherPhone: '',
    address: enquiry.address || 'Noida, NCR',
    createdAt: new Date().toISOString(),
  };
  dbService.store.parents.push(newParent);

  // 2. Create Student record
  const studentId = `stu-${Date.now()}`;
  const newStudent = {
    id: studentId,
    schoolId: enquiry.schoolId,
    admissionNumber,
    rollNumber: String(100 + studentCount),
    firstName: enquiry.studentName.split(' ')[0] || enquiry.studentName,
    lastName: enquiry.studentName.split(' ').slice(1).join(' ') || 'Student',
    fullName: enquiry.studentName,
    dateOfBirth: enquiry.dateOfBirth,
    gender: enquiry.gender,
    bloodGroup: 'B+',
    email: enquiry.email,
    phone: enquiry.phone,
    address: enquiry.address || 'Noida, NCR',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    classId: targetClass.id,
    className: targetClass.name,
    sectionId: targetSection.id,
    sectionName: targetSection.name,
    academicYearId: 'ay-2026-2027',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'ACTIVE',
    attendancePercentage: 100,
    totalPendingFees: 31500,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dbService.store.students.push(newStudent);

  // 3. Link parent to student
  dbService.store.studentParents.push({
    id: `sp-${Date.now()}`,
    studentId,
    parentId,
    relationship: 'PARENT',
  });

  // 4. Mark enquiry as APPROVED and converted
  enquiry.status = 'APPROVED';
  enquiry.convertedStudentId = studentId;
  enquiry.updatedAt = new Date().toISOString();

  // 5. Generate first term invoice for the new student
  const invoiceId = `inv-${Date.now()}`;
  dbService.store.invoices.push({
    id: invoiceId,
    schoolId: enquiry.schoolId,
    invoiceNumber: `INV-2026-${String(dbService.store.invoices.length + 1001)}`,
    studentId,
    studentName: newStudent.fullName,
    admissionNumber,
    className: targetClass.name,
    sectionName: targetSection.name,
    academicYearId: 'ay-2026-2027',
    totalAmount: 31500,
    paidAmount: 0,
    balanceAmount: 31500,
    discountAmount: 0,
    lateFee: 0,
    status: 'PENDING',
    dueDate: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
    issuedDate: new Date().toISOString().split('T')[0],
    items: [
      { id: `item-adm-${Date.now()}`, invoiceId, title: 'Admission & Registration Fee', amount: 7500, category: 'ADMISSION' },
      { id: `item-tui-${Date.now()}`, invoiceId, title: 'Term 1 Tuition Fee', amount: 24000, category: 'TUITION' },
    ],
    payments: [],
  });

  return res.json({
    success: true,
    message: `Student successfully admitted with Admission No: ${admissionNumber}`,
    data: {
      student: newStudent,
      admissionNumber,
      invoiceId,
    },
  });
};

