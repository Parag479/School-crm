import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbService } from '../services/db.service.js';
import { env } from '../config/env.js';
import { AppError } from '../middleware/error.middleware.js';
import { LoginSchema } from '@edumanage/validation';

export const login = async (req: Request, res: Response) => {
  const validated = LoginSchema.parse(req.body);
  const { email, password } = validated;

  const user = dbService.store.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive
  );

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const school = dbService.store.schools.find((s) => s.id === user.schoolId);

  // If student or parent, attach extra contextual data
  let studentData: any = null;
  let parentData: any = null;
  let teacherData: any = null;

  if (user.role === 'STUDENT') {
    studentData = dbService.store.students.find((s) => s.userId === user.id || s.email === user.email);
  } else if (user.role === 'PARENT') {
    parentData = dbService.store.parents.find((p) => p.userId === user.id || p.fatherEmail === user.email);
    if (parentData) {
      const studentMappings = dbService.store.studentParents.filter((sp) => sp.parentId === parentData.id);
      const studentIds = studentMappings.map((sp) => sp.studentId);
      const linkedStudents = dbService.store.students.filter((s) => studentIds.includes(s.id));
      parentData = { ...parentData, children: linkedStudents };
    }
  } else if (user.role === 'TEACHER') {
    teacherData = dbService.store.teachers.find((t) => t.userId === user.id || t.email === user.email);
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    schoolId: user.schoolId,
    name: user.name,
  };

  const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' });
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  // Update last login
  user.lastLoginAt = new Date().toISOString();

  // Audit log
  dbService.store.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    schoolId: user.schoolId,
    userId: user.id,
    userName: user.name,
    action: 'USER_LOGIN',
    resource: 'AUTH',
    details: `User ${user.email} logged in successfully with role ${user.role}`,
    ipAddress: req.ip || '127.0.0.1',
    createdAt: new Date().toISOString(),
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    message: 'Login successful',
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        schoolId: user.schoolId,
        schoolName: school?.name || 'Greenwood International Academy',
        schoolCode: school?.code || 'GIA-DEL-042',
        student: studentData,
        parent: parentData,
        teacher: teacherData,
      },
    },
  });
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const user = dbService.store.users.find((u) => u.id === req.user?.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const school = dbService.store.schools.find((s) => s.id === user.schoolId);

  let studentData: any = null;
  let parentData: any = null;
  let teacherData: any = null;

  if (user.role === 'STUDENT') {
    studentData = dbService.store.students.find((s) => s.userId === user.id || s.email === user.email);
  } else if (user.role === 'PARENT') {
    parentData = dbService.store.parents.find((p) => p.userId === user.id || p.fatherEmail === user.email);
    if (parentData) {
      const studentMappings = dbService.store.studentParents.filter((sp) => sp.parentId === parentData.id);
      const studentIds = studentMappings.map((sp) => sp.studentId);
      const linkedStudents = dbService.store.students.filter((s) => studentIds.includes(s.id));
      parentData = { ...parentData, children: linkedStudents };
    }
  } else if (user.role === 'TEACHER') {
    teacherData = dbService.store.teachers.find((t) => t.userId === user.id || t.email === user.email);
  }

  return res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        schoolId: user.schoolId,
        schoolName: school?.name || 'Greenwood International Academy',
        schoolCode: school?.code,
        student: studentData,
        parent: parentData,
        teacher: teacherData,
      },
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  return res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
