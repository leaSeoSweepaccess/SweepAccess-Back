import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '@/config/env';
import { forbiddenResponse, unauthorizedResponse } from '@/utils/httpResponses';

interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorizedResponse(res, 'No token provided');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, env.ACCESS_JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return forbiddenResponse(res, 'Invalid token');
    }

    if (typeof decoded === 'object' && 'userId' in decoded) {
      req.userId = (decoded as JwtPayload).userId as string;
    } else {
      return forbiddenResponse(res, 'Invalid token payload');
    }

    next();
  });
};
