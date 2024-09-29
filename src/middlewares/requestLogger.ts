import { Request, Response, NextFunction } from 'express';
import logger from '@/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.url}`);
  next();
}
