import express from "express";
import {
  getAllBooksController,
  createBookController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";

const bookRouter = express.Router();

// Route to get all books
bookRouter.get("/", getAllBooksController);

// Route to create a new book
bookRouter.post("/", createBookController);

// Route to get a book by its ID
bookRouter.get("/:bookId", getBookByIdController);

// Route to update a book by its ID
bookRouter.put("/:bookId", updateBookController);

// Route to delete a book by its ID
bookRouter.delete("/:bookId", deleteBookController);

export default bookRouter;
