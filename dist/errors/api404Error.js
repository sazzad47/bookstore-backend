"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api404Error = void 0;
const baseError_1 = require("./baseError");
const httpStatusCodes_1 = require("./httpStatusCodes");
class Api404Error extends baseError_1.BaseError {
    constructor(name, statusCode = httpStatusCodes_1.httpStatusCodes.NOT_FOUND, description = "Not found.", isOperational = true) {
        super(name, statusCode, isOperational, description);
    }
}
exports.Api404Error = Api404Error;
