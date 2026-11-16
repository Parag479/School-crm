import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { TeacherCreateSchema } from '@edumanage/validation';

export const listTeachers = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { departmentId, search } = req.query;

  let teachers = dbService.store.teachers.filter((t) => t.schoolId === schoolId);

  if (departmentId && departmentId !== 'ALL') {
    teachers = teachers.filter((t) => t.departmentId === departmentId);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    teachers = teachers.filter(
      (t) =>
        t.fullName.toLowerCase().includes(q) ||
        t.employeeId.toLowerCase().includes(q) ||
        t.designation.toLowerCase().includes(q)
    );
  }

  return res.json({
    success: true,
    data: teachers,
    meta: { total: teachers.length },
  });
};

export const createTeacher = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = TeacherCreateSchema.parse(req.body);

  const teacherCount = dbService.store.teachers.length + 101;
  const employeeId = `EMP-TCH-${teacherCount}`;

  // Create User account for Teacher portal login
  const defaultPassword = await bcrypt.hash('teacher123', 10);
  const userId = `usr-tch-${Date.now()}`;
  dbService.store.users.push({
    id: userId,
    schoolId,
    name: `${validated.firstName} ${validated.lastName}`,
    email: validated.email,
    passwordHash: defaultPassword,
    phone: validated.phone,
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  const department = dbService.store.departments.find((d) => d.id === validated.departmentId);

  const newTeacher = {
    id: `tch-${Date.now()}`,
    schoolId,
    userId,
    employeeId,
    firstName: validated.firstName,
    lastName: validated.lastName,
    fullName: `${validated.firstName} ${validated.lastName}`,
    email: validated.email,
    phone: validated.phone,
    gender: validated.gender,
    dateOfBirth: validated.dateOfBirth,
    joiningDate: validated.joiningDate,
    designation: validated.designation,
    qualification: validated.qualification,
    experienceYears: validated.experienceYears,
    departmentId: validated.departmentId,
    departmentName: department ? department.name : undefined,
    address: validated.address,
    salary: validated.salary || 65000,
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dbService.store.teachers.push(newTeacher);

  return res.status(201).json({
    success: true,
    message: 'Teacher added successfully and login credentials provisioned',
    data: newTeacher,
  });
};

export const listStaff = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const staff = dbService.store.staff.filter((s) => s.schoolId === schoolId);
  return res.json({ success: true, data: staff });
};

export const listDepartments = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const departments = dbService.store.departments.filter((d) => d.schoolId === schoolId);
  return res.json({ success: true, data: departments });
};

