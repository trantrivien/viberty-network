import { Response } from 'express';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const sendResponse = <T>(res: Response, status: number, data: T, message?: string) => {
  res.status(status).json({
    status,
    message: message || 'Success',
    data,
  });
};

export const sendError = (res: Response, error: ApiError | Error) => {
  if (error instanceof ApiError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};