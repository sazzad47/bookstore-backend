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
const getAllBooksController = async (_req, res, next) => {
    try {
        // Get all books from the service
        const books = await bookService.getAllBooks();
        // Respond with the list of books
        res.json(books);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooksController = getAllBooksController;
const createBookController = async (req, res, next) => {
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
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.createBookController = createBookController;
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
const deleteBookController = async (req, res, next) => {
    try {
        const bookId = parseInt(req.params.bookId);
        // Delete the book using the service
        const deletedBook = await bookService.deleteBook(bookId);
        if (!deletedBook) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
        // Respond with the deleted book
        res.json(deletedBook);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBookController = deleteBookController;
