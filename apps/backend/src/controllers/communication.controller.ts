import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';
import { NoticeCreateSchema } from '@edumanage/validation';

export const listNotices = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { role } = req.query;

  let notices = dbService.store.notices.filter((n) => n.schoolId === schoolId);

  if (role && role !== 'ALL') {
    notices = notices.filter((n) => n.targetRole === 'ALL' || n.targetRole === role);
  }

  notices.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return res.json({ success: true, data: notices });
};

export const createNotice = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const validated = NoticeCreateSchema.parse(req.body);

  const newNotice = {
    id: `not-${Date.now()}`,
    schoolId,
    title: validated.title,
    content: validated.content,
    targetRole: validated.targetRole,
    isImportant: validated.isImportant,
    publishedAt: new Date().toISOString(),
    expiresAt: validated.expiresAt,
    authorName: req.user?.name || 'Principal Office',
  };

  dbService.store.notices.unshift(newNotice);

  return res.status(201).json({
    success: true,
    message: 'Notice published successfully',
    data: newNotice,
  });
};

export const listEvents = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const events = dbService.store.events.filter((e) => e.schoolId === schoolId);
  return res.json({ success: true, data: events });
};

export const listNews = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const news = dbService.store.news.filter((n) => n.schoolId === schoolId);
  return res.json({ success: true, data: news });
};

export const getNewsBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const article = dbService.store.news.find((n) => n.slug === slug);
  if (!article) throw new AppError('News article not found', 404);
  return res.json({ success: true, data: article });
};

export const listGallery = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { category } = req.query;

  let items = dbService.store.galleries.filter((g) => g.schoolId === schoolId);
  if (category && category !== 'ALL') {
    items = items.filter((g) => g.category === category);
  }

  return res.json({ success: true, data: items });
};

