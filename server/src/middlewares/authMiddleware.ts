import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config({ path: __dirname + '/./../../.env' });

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const publicRoutes = ['/api/auth/login', '/api/auth/register'];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: '인증 토큰이 없습니다.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: '잘못된 토큰 형식입니다.' });
  }

  const token = parts[1];

  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: '유효하지 않은 토큰입니다.', error: (error as Error).message });
  }
};
