import { Request, Response, NextFunction } from 'express';
import logger from '@/logger';
import { internalServerErrorResponse } from '@/utils/httpResponses';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(`${err.stack}`);
  return internalServerErrorResponse(res);
}
