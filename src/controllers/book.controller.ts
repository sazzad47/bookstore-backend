import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/book.repository";

// Initialize repository and service
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

export const getAllBooksController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all books from the service
    const books = await bookService.getAllBooks();

    // Respond with the list of books
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const createBookController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, discountRate, coverImage, price } = req.body;

    // Create the book using the service
    const newBook = await bookService.createBook({
      title,
      description,
      discountRate,
      coverImage,
      price,
    });

    // Respond with the created book
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
};