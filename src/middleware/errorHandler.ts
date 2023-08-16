import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';

function returnError(err: BaseError, _req: Request, res: Response, _next: NextFunction): void {
  res.status(err.statusCode || 500).send(err.message);
}

export {
  returnError,
};
