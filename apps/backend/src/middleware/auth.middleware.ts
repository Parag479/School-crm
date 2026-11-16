import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './error.middleware.js';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  schoolId: string;
  name?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      schoolId?: string;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AppError('Authentication token missing. Please sign in.', 401);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    req.user = decoded;
    req.schoolId = decoded.schoolId;

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid authentication credentials.' });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (req.user.role === 'SUPER_ADMIN') {
      return next(); // Super admin has full access
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access requires one of the following roles: [${roles.join(', ')}]`,
      });
    }

    next();
  };
};

export const requireTenant = (req: Request, res: Response, next: NextFunction) => {
  // If schoolId is passed in header (e.g., from public website or multi-tenant switch)
  const headerSchoolId = req.headers['x-school-id'] as string;
  if (headerSchoolId) {
    req.schoolId = headerSchoolId;
  } else if (req.user && req.user.schoolId) {
    req.schoolId = req.user.schoolId;
  } else {
    // Default demo school ID for public endpoints if not specified
    req.schoolId = 'school-greenwood-001';
  }
  next();
};

