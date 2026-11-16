import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { AttendanceBulkSchema } from '@edumanage/validation';

export const getAttendanceSheet = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { classId, sectionId, date } = req.query;

  if (!classId || !sectionId || !date) {
    throw new AppError('classId, sectionId, and date (YYYY-MM-DD) are required', 400);
  }

  const dateStr = date as string;

  // 1. Get all active students in class and section
  const students = dbService.store.students.filter(
    (s) => s.schoolId === schoolId && s.classId === classId && s.sectionId === sectionId && s.status === 'ACTIVE'
  );

  // 2. Fetch existing attendance records for this date
  const existingRecords = dbService.store.attendanceRecords.filter(
    (a) => a.schoolId === schoolId && a.classId === classId && a.sectionId === sectionId && a.date === dateStr
  );

  const recordsMap = new Map<string, any>();
  existingRecords.forEach((r) => recordsMap.set(r.studentId, r));

  const sheet = students.map((s) => {
    const record = recordsMap.get(s.id);
    return {
      studentId: s.id,
      studentName: s.fullName,
      rollNumber: s.rollNumber,
      avatar: s.avatar,
      status: record ? record.status : 'PRESENT', // default to PRESENT
      remarks: record ? record.remarks : '',
      attendanceId: record ? record.id : null,
    };
  });

  return res.json({
    success: true,
    data: {
      date: dateStr,
      classId,
      sectionId,
      totalStudents: students.length,
      isMarked: existingRecords.length > 0,
      sheet,
    },
  });
};

export const saveBulkAttendance = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = AttendanceBulkSchema.parse(req.body);

  const { classId, sectionId, date, records } = validated;

  let createdCount = 0;
  let updatedCount = 0;

  records.forEach((item) => {
    // Check if record exists for this student on this date (prevent duplicates)
    const existingIndex = dbService.store.attendanceRecords.findIndex(
      (a) => a.schoolId === schoolId && a.studentId === item.studentId && a.date === date
    );

    const student = dbService.store.students.find((s) => s.id === item.studentId);

    if (existingIndex !== -1) {
      // Update existing record
      dbService.store.attendanceRecords[existingIndex].status = item.status;
      dbService.store.attendanceRecords[existingIndex].remarks = item.remarks;
      dbService.store.attendanceRecords[existingIndex].updatedAt = new Date().toISOString();
      updatedCount++;
    } else {
      // Insert new record
      dbService.store.attendanceRecords.push({
        id: `att-${Date.now()}-${item.studentId}`,
        schoolId,
        studentId: item.studentId,
        studentName: student?.fullName,
        rollNumber: student?.rollNumber,
        classId,
        sectionId,
        date,
        status: item.status,
        remarks: item.remarks,
        recordedById: req.user?.id || 'tch-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      createdCount++;
    }
  });

  // Re-calculate attendance percentage for affected students
  records.forEach((item) => {
    const student = dbService.store.students.find((s) => s.id === item.studentId);
    if (student) {
      const studentHistory = dbService.store.attendanceRecords.filter((a) => a.studentId === student.id);
      const presentCount = studentHistory.filter((a) => a.status === 'PRESENT').length;
      student.attendancePercentage = Math.round((presentCount / (studentHistory.length || 1)) * 100);
    }
  });

  return res.json({
    success: true,
    message: `Attendance saved successfully (${createdCount} created, ${updatedCount} updated)`,
  });
};

export const getAttendanceReports = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { month, year } = req.query;

  // Monthly stats
  const students = dbService.store.students.filter((s) => s.schoolId === schoolId && s.status === 'ACTIVE');

  const reportData = students.map((s) => {
    const records = dbService.store.attendanceRecords.filter((a) => a.studentId === s.id);
    const present = records.filter((r) => r.status === 'PRESENT').length;
    const absent = records.filter((r) => r.status === 'ABSENT').length;
    const late = records.filter((r) => r.status === 'LATE').length;
    const leave = records.filter((r) => r.status === 'LEAVE').length;
    const totalWorkingDays = records.length || 24;
    const percentage = Math.round(((present + late) / totalWorkingDays) * 100) || 92;

    return {
      studentId: s.id,
      admissionNumber: s.admissionNumber,
      fullName: s.fullName,
      className: s.className,
      sectionName: s.sectionName,
      presentDays: present,
      absentDays: absent,
      lateDays: late,
      leaveDays: leave,
      totalWorkingDays,
      percentage,
    };
  });

  return res.json({
    success: true,
    data: reportData,
  });
};

