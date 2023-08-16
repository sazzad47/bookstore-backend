import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';

/**
 * Middleware to handle and return custom errors.
 *
 * @param {BaseError} err - The error object.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next function.
 */
function returnError(err: BaseError, _req: Request, res: Response, _next: NextFunction): void {
    res.status(err.statusCode || 500).send(err.message);
}

export {
    returnError,
};
