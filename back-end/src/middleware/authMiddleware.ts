import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  role: 'admin' | 'user' | 'agent';
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const refreshTokens = new Set<string>();

export const generateAccessToken = (user: JwtPayload) => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: JwtPayload) => {
  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
  refreshTokens.add(token);
  return token;
};

export const refreshTokenHandler = (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token || !refreshTokens.has(token)) {
    return res.status(403).json({ message: 'Invalid or missing refresh token' });
  }

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;

    // Invalidate old refresh token
    refreshTokens.delete(token);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const checkRole = (roles: ('admin' | 'user' | 'agent')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

