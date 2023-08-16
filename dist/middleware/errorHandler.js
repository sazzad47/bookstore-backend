"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = void 0;
/**
 * Middleware to handle and return custom errors.
 *
 * @param {BaseError} err - The error object.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next function.
 */
function returnError(err, _req, res, _next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
