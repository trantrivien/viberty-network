import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthPayload {
  userId: number;
  role: 'admin' | 'user';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired access token' });
  }
};

export const requireRole = (role: 'admin' | 'user') => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }

    next();
  };
};
