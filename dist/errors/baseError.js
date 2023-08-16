"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
/**
 * Custom error class that extends the base Error class.
 */
class BaseError extends Error {
    name;
    statusCode;
    isOperational;
    /**
     * Creates a new instance of the BaseError class.
     *
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {boolean} isOperational - Indicates if the error is operational.
     * @param {string} description - The description or message of the error.
     */
    constructor(name, statusCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseError = BaseError;
