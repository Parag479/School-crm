import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { HomeworkCreateSchema } from '@edumanage/validation';

export const getTimetable = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId, sectionId, teacherId } = req.query;

  let slots = dbService.store.timetables.filter((t) => t.schoolId === schoolId);

  if (classId && sectionId) {
    slots = slots.filter((t) => t.classId === classId && t.sectionId === sectionId);
  } else if (teacherId) {
    slots = slots.filter((t) => t.teacherId === teacherId);
  }

  return res.json({ success: true, data: slots });
};

export const listHomework = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId, sectionId, teacherId } = req.query;

  let homework = dbService.store.homeworks.filter((h) => h.schoolId === schoolId);

  if (classId) {
    homework = homework.filter((h) => h.classId === classId);
  }
  if (sectionId) {
    homework = homework.filter((h) => h.sectionId === sectionId);
  }
  if (teacherId) {
    homework = homework.filter((h) => h.teacherId === teacherId);
  }

  homework.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return res.json({ success: true, data: homework });
};

export const createHomework = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = HomeworkCreateSchema.parse(req.body);

  const targetClass = dbService.store.classes.find((c) => c.id === validated.classId);
  const targetSection = dbService.store.sections.find((s) => s.id === validated.sectionId);
  const subject = dbService.store.subjects.find((s) => s.id === validated.subjectId);

  const newHomework = {
    id: `hw-${Date.now()}`,
    schoolId,
    classId: validated.classId,
    className: targetClass?.name || 'Class 10',
    sectionId: validated.sectionId,
    sectionName: targetSection?.name || 'A',
    subjectId: validated.subjectId,
    subjectName: subject?.name || 'Mathematics',
    teacherId: req.user?.id || 'tch-001',
    teacherName: req.user?.name || 'Dr. Rajesh Verma',
    title: validated.title,
    description: validated.description,
    dueDate: validated.dueDate,
    createdAt: new Date().toISOString(),
    submissionsCount: 0,
  };

  dbService.store.homeworks.unshift(newHomework);

  return res.status(201).json({
    success: true,
    message: 'Homework assigned successfully',
    data: newHomework,
  });
};

export const submitHomework = async (req: Request, res: Response) => {
  const { homeworkId } = req.params;
  const { studentId, notes, attachmentUrl } = req.body;

  const homework = dbService.store.homeworks.find((h) => h.id === homeworkId);
  if (!homework) throw new AppError('Homework not found', 404);

  const student = dbService.store.students.find((s) => s.id === studentId);

  const submission = {
    id: `sub-${Date.now()}`,
    homeworkId,
    studentId,
    studentName: student?.fullName || 'Student',
    submittedAt: new Date().toISOString(),
    notes,
    attachmentUrl,
    status: 'SUBMITTED',
  };

  // Replace or push
  const existingIdx = dbService.store.homeworkSubmissions.findIndex(
    (s) => s.homeworkId === homeworkId && s.studentId === studentId
  );
  if (existingIdx !== -1) {
    dbService.store.homeworkSubmissions[existingIdx] = submission;
  } else {
    dbService.store.homeworkSubmissions.push(submission);
    homework.submissionsCount = (homework.submissionsCount || 0) + 1;
  }

  return res.json({
    success: true,
    message: 'Homework submitted successfully',
    data: submission,
  });
};

