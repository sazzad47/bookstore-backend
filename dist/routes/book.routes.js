"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
// Route to get all books
bookRouter.get("/", book_controller_1.getAllBooksController);
// Route to create a new book
bookRouter.post("/", book_controller_1.createBookController);
// Route to get a book by its ID
bookRouter.get("/:bookId", book_controller_1.getBookByIdController);
// Route to update a book by its ID
bookRouter.put("/:bookId", book_controller_1.updateBookController);
// Route to delete a book by its ID
bookRouter.delete("/:bookId", book_controller_1.deleteBookController);
exports.default = bookRouter;
