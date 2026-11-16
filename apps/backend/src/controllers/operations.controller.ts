import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';
import { AppError } from '../middleware/error.middleware.js';

// Library Books
export const listLibraryBooks = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { category, search } = req.query;

  let books = dbService.store.libraryBooks.filter((b) => b.schoolId === schoolId);

  if (category && category !== 'ALL') {
    books = books.filter((b) => b.category === category);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    books = books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q));
  }

  return res.json({ success: true, data: books });
};

export const issueBook = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const { bookId, studentId, dueDate } = req.body;

  const book = dbService.store.libraryBooks.find((b) => b.id === bookId);
  if (!book) throw new AppError('Book not found', 404);

  if (book.availableCopies <= 0) {
    throw new AppError('No copies available for issue', 400);
  }

  const student = dbService.store.students.find((s) => s.id === studentId);

  const issue = {
    id: `bi-${Date.now()}`,
    schoolId,
    bookId,
    bookTitle: book.title,
    studentId,
    studentName: student?.fullName,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: dueDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    fineAmount: 0,
    status: 'ISSUED',
    createdAt: new Date().toISOString(),
  };

  dbService.store.bookIssues.unshift(issue);
  book.availableCopies -= 1;

  return res.status(201).json({
    success: true,
    message: 'Book issued successfully',
    data: issue,
  });
};

export const returnBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const issue = dbService.store.bookIssues.find((bi) => bi.id === id);
  if (!issue) throw new AppError('Issue record not found', 404);

  const book = dbService.store.libraryBooks.find((b) => b.id === issue.bookId);
  if (book) {
    book.availableCopies += 1;
  }

  issue.status = 'RETURNED';
  issue.returnDate = new Date().toISOString().split('T')[0];

  return res.json({
    success: true,
    message: 'Book returned successfully',
    data: issue,
  });
};

// Transport
export const listTransportRoutes = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const routes = dbService.store.transportRoutes.filter((r) => r.schoolId === schoolId);

  const routesWithParsedStops = routes.map((r) => ({
    ...r,
    stops: JSON.parse(r.stopsJson || '[]'),
    allocatedStudentsCount: dbService.store.transportAllocations.filter((a) => a.routeId === r.id).length,
  }));

  return res.json({ success: true, data: routesWithParsedStops });
};

export const listVehicles = async (req: Request, res: Response) => {
  const schoolId = req.schoolId || 'school-greenwood-001';
  const vehicles = dbService.store.vehicles.filter((v) => v.schoolId === schoolId);
  return res.json({ success: true, data: vehicles });
};

