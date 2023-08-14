import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';

function logError(err: Error): void {
  console.error(err);
}

function logErrorMiddleware(err: Error, _req: Request, _res: Response, next: NextFunction): void {
  logError(err);
  next(err);
}

function returnError(err: BaseError, _req: Request, res: Response, _next: NextFunction): void {
  res.status(err.statusCode || 500).send(err.message);
}

function isOperationalError(error: Error): boolean {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError
};
