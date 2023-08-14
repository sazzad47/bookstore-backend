"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP400Error = exports.HttpStatusCode = exports.BaseError = void 0;
class BaseError extends Error {
    name;
    httpCode;
    isOperational;
    constructor(name, httpCode, isOperational, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
        super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, description);
    }
}
exports.HTTP400Error = HTTP400Error;
