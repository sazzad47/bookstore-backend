import { BaseError } from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

/**
 * Custom error class that extends the BaseError class.
 */
export class CustomError extends BaseError {
    /**
     * Creates a new instance of the CustomError class.
     *
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {string} description - The description or message of the error.
     * @param {boolean} isOperational - Indicates if the error is operational.
     */
    constructor(
        name: string,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = "Not found.",
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}
