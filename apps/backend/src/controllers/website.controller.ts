import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';

export const getPublicWebsiteContent = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';

  const school = dbService.store.schools.find((s) => s.id === schoolId);
  const homeConfigPage = dbService.store.websitePages.find((p) => p.schoolId === schoolId && p.pageKey === 'HOME');

  let cmsData = {};
  if (homeConfigPage && homeConfigPage.contentJson) {
    try {
      cmsData = JSON.parse(homeConfigPage.contentJson);
    } catch (e) {
      // fallback
    }
  }

  const latestNews = dbService.store.news.filter((n) => n.schoolId === schoolId).slice(0, 3);
  const upcomingEvents = dbService.store.events.filter((e) => e.schoolId === schoolId && e.isPublicWebsite).slice(0, 4);
  const gallery = dbService.store.galleries.filter((g) => g.schoolId === schoolId && g.isFeatured).slice(0, 6);

  return res.json({
    success: true,
    data: {
      school,
      cms: cmsData,
      news: latestNews,
      events: upcomingEvents,
      gallery,
    },
  });
};

export const updateWebsiteContent = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { pageKey, content } = req.body;

  const key = pageKey || 'HOME';
  const page = dbService.store.websitePages.find((p) => p.schoolId === schoolId && p.pageKey === key);

  if (page) {
    page.contentJson = JSON.stringify(content);
    page.updatedAt = new Date().toISOString();
  } else {
    dbService.store.websitePages.push({
      id: `wp-${Date.now()}`,
      schoolId,
      pageKey: key,
      contentJson: JSON.stringify(content),
      isPublished: true,
      updatedAt: new Date().toISOString(),
    });
  }

  // If school name, phone or email updated, sync with school entity
  const school = dbService.store.schools.find((s) => s.id === schoolId);
  if (school && content) {
    if (content.phone) school.phone = content.phone;
    if (content.email) school.email = content.email;
    if (content.address) school.address = content.address;
    if (content.principalName) school.principalName = content.principalName;
    if (content.principalMessage) school.principalMessage = content.principalMessage;
    school.updatedAt = new Date().toISOString();
  }

  return res.json({
    success: true,
    message: 'Website CMS content saved and published successfully',
    data: content,
  });
};

