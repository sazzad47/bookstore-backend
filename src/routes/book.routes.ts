import express from "express";
import { getAllBooksController, createBookController } from "../controllers/book.controller";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooksController);
bookRouter.post("/", createBookController);

export default bookRouter;
