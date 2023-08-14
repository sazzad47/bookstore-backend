import { BaseError } from "./baseError";
import { httpStatusCodes } from "./httpStatusCodes";

export class CustomError extends BaseError {
  constructor(
    name: string,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
