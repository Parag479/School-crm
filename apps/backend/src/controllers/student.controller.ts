import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { StudentCreateSchema } from '@edumanage/validation';

export const listStudents = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId, sectionId, search, status } = req.query;

  let students = dbService.store.students.filter((s) => s.schoolId === schoolId);

  if (classId && classId !== 'ALL') {
    students = students.filter((s) => s.classId === classId);
  }

  if (sectionId && sectionId !== 'ALL') {
    students = students.filter((s) => s.sectionId === sectionId);
  }

  if (status && status !== 'ALL') {
    students = students.filter((s) => s.status === status);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    students = students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.admissionNumber.toLowerCase().includes(q) ||
        (s.rollNumber && s.rollNumber.includes(q))
    );
  }

  return res.json({
    success: true,
    data: students,
    meta: { total: students.length },
  });
};

export const getStudentProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = dbService.store.students.find((s) => s.id === id);

  if (!student) {
    throw new AppError('Student record not found', 404);
  }

  // 1. Parent info
  const mappings = dbService.store.studentParents.filter((sp) => sp.studentId === id);
  const parentIds = mappings.map((m) => m.parentId);
  const parents = dbService.store.parents.filter((p) => parentIds.includes(p.id));

  // 2. Attendance history
  const attendance = dbService.store.attendanceRecords
    .filter((a) => a.studentId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const presentCount = attendance.filter((a) => a.status === 'PRESENT').length;
  const totalCount = attendance.length || 1;
  const attendancePercentage = Math.round((presentCount / totalCount) * 100);

  // 3. Fee invoices and payments
  const invoices = dbService.store.invoices.filter((i) => i.studentId === id);
  const payments = dbService.store.payments.filter((p) => p.studentId === id);

  // 4. Examination marks
  const marks = dbService.store.marks.filter((m) => m.studentId === id);

  // 5. Timetable for student's class and section
  const timetable = dbService.store.timetables.filter(
    (t) => t.classId === student.classId && t.sectionId === student.sectionId
  );

  // 6. Transport allocation
  const transport = dbService.store.transportAllocations.find((t) => t.studentId === id);

  // 7. Library issues
  const bookIssues = dbService.store.bookIssues.filter((b) => b.studentId === id);

  return res.json({
    success: true,
    data: {
      student: {
        ...student,
        attendancePercentage,
      },
      parents,
      attendance,
      invoices,
      payments,
      marks,
      timetable,
      transport,
      bookIssues,
      documents: student.documents || [
        { id: 'doc-01', title: 'Birth Certificate', fileUrl: '/docs/birth-cert.pdf', verified: true, uploadedAt: '2026-04-01' },
        { id: 'doc-02', title: 'Aadhaar Card Copy', fileUrl: '/docs/aadhaar.pdf', verified: true, uploadedAt: '2026-04-01' },
        { id: 'doc-03', title: 'Previous School Transfer Certificate', fileUrl: '/docs/tc.pdf', verified: true, uploadedAt: '2026-04-01' },
      ],
    },
  });
};

export const createStudent = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = StudentCreateSchema.parse(req.body);

  const studentCount = dbService.store.students.length + 1;
  const admissionNumber = `GIA-2026-${String(studentCount).padStart(3, '0')}`;

  const targetClass = dbService.store.classes.find((c) => c.id === validated.classId);
  const targetSection = dbService.store.sections.find((s) => s.id === validated.sectionId);

  // 1. Create Parent
  const parentId = `par-${Date.now()}`;
  const newParent = {
    id: parentId,
    schoolId,
    fatherName: validated.fatherName,
    fatherPhone: validated.fatherPhone,
    fatherEmail: validated.fatherEmail || '',
    motherName: validated.motherName,
    motherPhone: validated.motherPhone || '',
    address: validated.address,
    createdAt: new Date().toISOString(),
  };
  dbService.store.parents.push(newParent);

  // 2. Create Student
  const studentId = `stu-${Date.now()}`;
  const newStudent = {
    id: studentId,
    schoolId,
    admissionNumber,
    rollNumber: String(100 + studentCount),
    firstName: validated.firstName,
    lastName: validated.lastName,
    fullName: `${validated.firstName} ${validated.lastName}`,
    dateOfBirth: validated.dateOfBirth,
    gender: validated.gender,
    bloodGroup: validated.bloodGroup || 'B+',
    email: validated.email || '',
    phone: validated.phone || validated.fatherPhone,
    address: validated.address,
    city: validated.city,
    state: validated.state,
    pincode: validated.pincode,
    classId: validated.classId,
    className: targetClass?.name || 'Class 10',
    sectionId: validated.sectionId,
    sectionName: targetSection?.name || 'A',
    academicYearId: validated.academicYearId,
    admissionDate: validated.admissionDate,
    status: 'ACTIVE',
    attendancePercentage: 100,
    totalPendingFees: 0,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dbService.store.students.push(newStudent);

  // 3. Link parent
  dbService.store.studentParents.push({
    id: `sp-${Date.now()}`,
    studentId,
    parentId,
    relationship: 'FATHER',
  });

  return res.status(201).json({
    success: true,
    message: 'Student admitted successfully',
    data: newStudent,
  });
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = dbService.store.students.find((s) => s.id === id);

  if (!student) {
    throw new AppError('Student not found', 404);
  }

  Object.assign(student, req.body, { updatedAt: new Date().toISOString() });

  return res.json({
    success: true,
    message: 'Student details updated successfully',
    data: student,
  });
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = dbService.store.students.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new AppError('Student not found', 404);
  }

  // Soft deactivate
  dbService.store.students[index].status = 'INACTIVE';
  dbService.store.students[index].updatedAt = new Date().toISOString();

  return res.json({
    success: true,
    message: 'Student record deactivated successfully',
  });
};

