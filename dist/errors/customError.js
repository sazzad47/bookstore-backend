"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const baseError_1 = require("./baseError");
const httpStatusCodes_1 = require("./httpStatusCodes");
class CustomError extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.httpStatusCodes.NOT_FOUND, description = "Not found.", isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.CustomError = CustomError;
