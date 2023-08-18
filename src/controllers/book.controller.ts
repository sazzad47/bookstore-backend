import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/book.repository";
import { CustomError } from "../errors/customError";
import { httpStatusCodes } from "../errors/httpStatusCodes";

// Initialize repository and service
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);

/**
 * Controller to get paginated list of books.
 */
export const getAllBooksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = 6;

        const { books, totalCount, totalPages, remainingBooks } = await bookService.getPaginatedBooks(page, perPage);

        res.json({ books, totalCount, totalPages, remainingBooks });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to create a new book.
 */
export const createBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, discountRate, coverImage, price, stock } = req.body;

        // Create the book using the service
        const newBook = await bookService.createBook({
            title,
            description,
            discountRate,
            coverImage,
            price,
            stock
        });

        // Respond with the created book
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * Controller to get a book by its ID.
 */
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

/**
 * Controller to update a book.
 */
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

/**
 * Controller to delete a book.
 */
export const deleteBookController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = parseInt(req.params.bookId);

        // Delete the book using the service
        const deletedBook = await bookService.deleteBook(bookId);

        if (!deletedBook) {
            throw new CustomError("Not Found", httpStatusCodes.NOT_FOUND, "Book not found");
        }

        // Respond with the success message
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        next(error);
    }
};
