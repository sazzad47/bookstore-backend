"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookController = exports.updateBookController = exports.getBookByIdController = exports.createBookController = exports.getAllBooksController = void 0;
const book_service_1 = require("../services/book.service");
const book_repository_1 = require("../repositories/book.repository");
const customError_1 = require("../errors/customError");
const httpStatusCodes_1 = require("../errors/httpStatusCodes");
// Initialize repository and service
const bookRepository = new book_repository_1.BookRepository();
const bookService = new book_service_1.BookService(bookRepository);
/**
 * Controller to get paginated list of books.
 */
const getAllBooksController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 6;
        const { books, totalCount, totalPages, remainingBooks } = await bookService.getPaginatedBooks(page, perPage);
        res.json({ books, totalCount, totalPages, remainingBooks });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooksController = getAllBooksController;
/**
 * Controller to create a new book.
 */
const createBookController = async (req, res, next) => {
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
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.createBookController = createBookController;
/**
 * Controller to get a book by its ID.
 */
const getBookByIdController = async (req, res, next) => {
    try {
        const bookId = parseInt(req.params.bookId);
        // Get the book by ID from the service
        const book = await bookService.getBookById(bookId);
        // Respond with the book
        res.json(book);
    }
    catch (error) {
        next(error);
    }
};
exports.getBookByIdController = getBookByIdController;
/**
 * Controller to update a book.
 */
const updateBookController = async (req, res, next) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const updatedBookData = req.body;
        // Update the book using the service
        const updatedBook = await bookService.updateBook(bookId, updatedBookData);
        if (!updatedBook) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
        // Respond with the updated book
        res.json(updatedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.updateBookController = updateBookController;
/**
 * Controller to delete a book.
 */
const deleteBookController = async (req, res, next) => {
    try {
        const bookId = parseInt(req.params.bookId);
        // Delete the book using the service
        const deletedBook = await bookService.deleteBook(bookId);
        if (!deletedBook) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
        // Respond with the success message
        res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBookController = deleteBookController;
