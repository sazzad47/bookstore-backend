/**
 * Custom error class that extends the base Error class.
 */
export class BaseError extends Error {
    public readonly name: string;
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    /**
     * Creates a new instance of the BaseError class.
     *
     * @param {string} name - The name of the error.
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {boolean} isOperational - Indicates if the error is operational.
     * @param {string} description - The description or message of the error.
     */
    constructor(name: string, statusCode: number, isOperational: boolean, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}
