"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCodes_1 = require("./httpStatusCodes");
/**
 * Custom error class that extends the BaseError class.
 */
class CustomError extends baseError_1.BaseError {
    /**
     * Creates a new instance of the CustomError class.
     *
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {string} description - The description or message of the error.
     * @param {boolean} isOperational - Indicates if the error is operational.
     */
    constructor(name, statusCode = httpStatusCodes_1.httpStatusCodes.NOT_FOUND, description = "Not found.", isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.CustomError = CustomError;
