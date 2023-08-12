"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookController = exports.getAllBooksController = void 0;
const book_service_1 = require("../services/book.service");
const book_repository_1 = require("../repositories/book.repository");
// Initialize repository and service
const bookRepository = new book_repository_1.BookRepository();
const bookService = new book_service_1.BookService(bookRepository);
const getAllBooksController = async (_req, res) => {
    try {
        // Get all books from the service
        const books = await bookService.getAllBooks();
        // Respond with the list of books
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllBooksController = getAllBooksController;
const createBookController = async (req, res) => {
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
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createBookController = createBookController;
