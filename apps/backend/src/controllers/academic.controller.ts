import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';

export const listAcademicYears = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const years = dbService.store.academicYears.filter((ay) => ay.schoolId === schoolId);
  return res.json({ success: true, data: years });
};

export const listClasses = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const classes = dbService.store.classes.filter((c) => c.schoolId === schoolId);

  const classesWithRelations = classes.map((c) => {
    const sections = dbService.store.sections.filter((s) => s.classId === c.id);
    const subjects = dbService.store.subjects.filter((sub) => sub.classId === c.id);
    const studentCount = dbService.store.students.filter((st) => st.classId === c.id && st.status === 'ACTIVE').length;
    return {
      ...c,
      sections,
      subjects,
      studentCount,
    };
  });

  return res.json({
    success: true,
    data: classesWithRelations,
  });
};

export const createClass = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { name, numericOrder } = req.body;

  if (!name) throw new AppError('Class name is required', 400);

  const newClass = {
    id: `class-${Date.now()}`,
    schoolId,
    name,
    numericOrder: numericOrder || dbService.store.classes.length + 1,
  };

  dbService.store.classes.push(newClass);

  // Auto-create default Section A
  dbService.store.sections.push({
    id: `sec-${newClass.id}-a`,
    classId: newClass.id,
    name: 'A',
    roomNumber: 'Room 101',
    capacity: 40,
  });

  return res.status(201).json({
    success: true,
    message: 'Class created successfully',
    data: newClass,
  });
};

export const listSubjects = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId } = req.query;

  let subjects = dbService.store.subjects.filter((s) => s.schoolId === schoolId);
  if (classId && classId !== 'ALL') {
    subjects = subjects.filter((s) => s.classId === classId);
  }

  return res.json({ success: true, data: subjects });
};

export const createSubject = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId, name, code, type, teacherId } = req.body;

  if (!classId || !name || !code) {
    throw new AppError('Class, Subject Name, and Code are required', 400);
  }

  const teacher = dbService.store.teachers.find((t) => t.id === teacherId);

  const newSubject = {
    id: `subj-${Date.now()}`,
    schoolId,
    classId,
    name,
    code,
    type: type || 'THEORY',
    teacherId,
    teacherName: teacher ? teacher.fullName : undefined,
  };

  dbService.store.subjects.push(newSubject);

  return res.status(201).json({
    success: true,
    message: 'Subject added successfully',
    data: newSubject,
  });
};

