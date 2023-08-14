"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = exports.NotFoundError = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
class NotFoundError extends ErrorHandler_1.BaseError {
    constructor(resource) {
        super('NOT FOUND', ErrorHandler_1.HttpStatusCode.NOT_FOUND, true, `${resource} not found`);
    }
}
exports.NotFoundError = NotFoundError;
class ClientError extends ErrorHandler_1.BaseError {
    constructor(message) {
        super(message, ErrorHandler_1.HttpStatusCode.BAD_REQUEST, true, 'Client error');
    }
}
exports.ClientError = ClientError;
