import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';

export const getSchoolSettings = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const school = dbService.store.schools.find((s) => s.id === schoolId);
  if (!school) throw new AppError('School not found', 404);
  return res.json({ success: true, data: school });
};

export const updateSchoolSettings = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const school = dbService.store.schools.find((s) => s.id === schoolId);
  if (!school) throw new AppError('School not found', 404);

  Object.assign(school, req.body, { updatedAt: new Date().toISOString() });

  return res.json({
    success: true,
    message: 'School settings saved successfully',
    data: school,
  });
};

export const listAuditLogs = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const logs = dbService.store.auditLogs
    .filter((l) => l.schoolId === schoolId)
    .slice(0, 50);

  return res.json({ success: true, data: logs });
};

