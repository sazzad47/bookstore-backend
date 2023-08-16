"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = void 0;
function returnError(err, _req, res, _next) {
    res.status(err.statusCode || 500).send(err.message);
}
exports.returnError = returnError;
