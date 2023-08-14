"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.get("/", book_controller_1.getAllBooksController);
bookRouter.post("/", book_controller_1.createBookController);
bookRouter.get("/:bookId", book_controller_1.getBookByIdController);
bookRouter.put("/:bookId", book_controller_1.updateBookController);
bookRouter.delete("/:bookId", book_controller_1.deleteBookController);
exports.default = bookRouter;
