import { notFoundResponse } from '@/utils/httpResponses';
import { Request, Response, NextFunction } from 'express';

export function notSupportedHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return notFoundResponse(res);
}
