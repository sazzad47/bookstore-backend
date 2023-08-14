import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/book.repository";
import { CustomError } from "../errors/customError";
import { httpStatusCodes } from "../errors/httpStatusCodes";

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

export const getBookByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.bookId);

    // Get the book by ID from the service
    const book = await bookService.getBookById(bookId);

    // Respond with the book
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const updatedBookData = req.body;

    // Update the book using the service
    const updatedBook = await bookService.updateBook(bookId, updatedBookData);

    if (!updatedBook) {
      throw new CustomError("Not Found", httpStatusCodes.NOT_FOUND, "Book not found");
    }

    // Respond with the updated book
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.bookId);

    // Delete the book using the service
    const deletedBook = await bookService.deleteBook(bookId);

    if (!deletedBook) {
      throw new CustomError("Not Found", httpStatusCodes.NOT_FOUND, "Book not found");
    }

    // Respond with the deleted book
    res.json(deletedBook);
  } catch (error) {
    next(error);
  }
};
