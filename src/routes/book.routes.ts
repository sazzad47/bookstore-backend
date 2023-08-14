import express from "express";
import {
  getAllBooksController,
  createBookController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooksController);
bookRouter.post("/", createBookController);
bookRouter.get("/:bookId", getBookByIdController); 
bookRouter.put("/:bookId", updateBookController);  
bookRouter.delete("/:bookId", deleteBookController); 

export default bookRouter;
