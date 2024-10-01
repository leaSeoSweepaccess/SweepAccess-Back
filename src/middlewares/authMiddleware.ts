import type { Request, Response, NextFunction } from 'express';
import { forbiddenResponse } from '@/utils/httpResponses';
import { authService } from '@/services/auth.service';

interface CustomRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await authService.getTokenFromHeader(req);
    const decoded = await authService.verifyBearerToken(token);

    if ('userId' in decoded) {
      req.userId = decoded.userId as string;
      next();
    } else {
      return forbiddenResponse(res, 'Invalid token payload');
    }
  } catch (err) {
    return forbiddenResponse(res, err || 'Invalid token');
  }
};
