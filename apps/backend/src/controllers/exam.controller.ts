import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { ExamMarksBulkSchema } from '@edumanage/validation';

export const calculateCbseGrade = (marksObtained: number, maxMarks: number): string => {
  const percentage = (marksObtained / maxMarks) * 100;
  if (percentage >= 91) return 'A1';
  if (percentage >= 81) return 'A2';
  if (percentage >= 71) return 'B1';
  if (percentage >= 61) return 'B2';
  if (percentage >= 51) return 'C1';
  if (percentage >= 41) return 'C2';
  if (percentage >= 33) return 'D';
  return 'E (Needs Improvement)';
};

export const listExaminations = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const exams = dbService.store.examinations.filter((e) => e.schoolId === schoolId);
  return res.json({ success: true, data: exams });
};

export const createExamination = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { name, type, startDate, endDate, academicYearId, subjects } = req.body;

  if (!name || !startDate || !endDate) {
    throw new AppError('Exam name, start date, and end date are required', 400);
  }

  const examId = `exam-${Date.now()}`;
  const newExam = {
    id: examId,
    schoolId,
    academicYearId: academicYearId || 'ay-2026-2027',
    name,
    type: type || 'MID_TERM',
    startDate,
    endDate,
    isPublished: true,
    subjects: (subjects || []).map((s: any, idx: number) => ({
      id: `es-${Date.now()}-${idx}`,
      examId,
      classId: s.classId,
      className: s.className,
      subjectId: s.subjectId,
      subjectName: s.subjectName,
      examDate: s.examDate,
      startTime: s.startTime || '09:00',
      endTime: s.endTime || '12:00',
      maxMarks: s.maxMarks || 80,
      passMarks: s.passMarks || 27,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  dbService.store.examinations.push(newExam);

  return res.status(201).json({
    success: true,
    message: 'Examination scheduled successfully',
    data: newExam,
  });
};

export const saveBulkMarks = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = ExamMarksBulkSchema.parse(req.body);
  const { examId, subjectId, marksList } = validated;

  const subject = dbService.store.subjects.find((s) => s.id === subjectId);

  marksList.forEach((item) => {
    const grade = calculateCbseGrade(item.marksObtained, item.maxMarks);
    const student = dbService.store.students.find((s) => s.id === item.studentId);

    const existingIndex = dbService.store.marks.findIndex(
      (m) => m.schoolId === schoolId && m.examId === examId && m.studentId === item.studentId && m.subjectId === subjectId
    );

    if (existingIndex !== -1) {
      dbService.store.marks[existingIndex].marksObtained = item.marksObtained;
      dbService.store.marks[existingIndex].maxMarks = item.maxMarks;
      dbService.store.marks[existingIndex].grade = grade;
      dbService.store.marks[existingIndex].remarks = item.remarks;
      dbService.store.marks[existingIndex].updatedAt = new Date().toISOString();
    } else {
      dbService.store.marks.push({
        id: `mrk-${Date.now()}-${item.studentId}`,
        schoolId,
        examId,
        studentId: item.studentId,
        studentName: student?.fullName,
        rollNumber: student?.rollNumber,
        subjectId,
        subjectName: subject?.name,
        marksObtained: item.marksObtained,
        maxMarks: item.maxMarks,
        grade,
        remarks: item.remarks,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  return res.json({
    success: true,
    message: `Marks recorded for ${marksList.length} students with CBSE grade calculations`,
  });
};

export const getStudentReportCard = async (req: Request, res: Response) => {
  const { examId, studentId } = req.params;

  const exam = dbService.store.examinations.find((e) => e.id === examId);
  const student = dbService.store.students.find((s) => s.id === studentId);
  const school = dbService.store.schools.find((s) => s.id === student?.schoolId);

  if (!exam || !student) {
    throw new AppError('Exam or Student record not found', 404);
  }

  const marks = dbService.store.marks.filter((m) => m.examId === examId && m.studentId === studentId);

  const totalMaxMarks = marks.reduce((sum, m) => sum + m.maxMarks, 0);
  const totalMarksObtained = marks.reduce((sum, m) => sum + m.marksObtained, 0);
  const overallPercentage = totalMaxMarks > 0 ? Math.round((totalMarksObtained / totalMaxMarks) * 100 * 10) / 10 : 0;
  const overallGrade = calculateCbseGrade(totalMarksObtained, totalMaxMarks || 100);

  return res.json({
    success: true,
    data: {
      school: {
        name: school?.name,
        affiliation: school?.affiliationNumber,
        board: school?.board,
        address: school?.address,
        logo: school?.logo,
      },
      student: {
        id: student.id,
        fullName: student.fullName,
        admissionNumber: student.admissionNumber,
        rollNumber: student.rollNumber,
        className: student.className,
        sectionName: student.sectionName,
        dob: student.dateOfBirth,
        attendancePercentage: student.attendancePercentage || 94,
      },
      exam: {
        id: exam.id,
        name: exam.name,
        academicYear: '2026-2027',
      },
      marks,
      summary: {
        totalMaxMarks,
        totalMarksObtained,
        overallPercentage,
        overallGrade,
        result: overallPercentage >= 33 ? 'PASSED' : 'NEEDS IMPROVEMENT',
        rankInClass: '4th',
        principalRemarks: 'Exemplary academic and co-curricular performance throughout the term.',
      },
    },
  });
};

