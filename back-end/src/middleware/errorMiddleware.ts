import { Request, Response, NextFunction } from 'express';
import { ApiError, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error.message, { stack: error.stack });
  sendError(res, error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
};