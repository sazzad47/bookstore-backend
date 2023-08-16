"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const customError_1 = require("../errors/customError");
const httpStatusCodes_1 = require("../errors/httpStatusCodes");
class BookService {
    bookRepository;
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async createBook(newBook) {
        if (!newBook.title ||
            !newBook.price ||
            !newBook.description ||
            !newBook.discountRate ||
            !newBook.coverImage) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "All book fields are required to create a book");
        }
        if (newBook.discountRate < 1 || newBook.discountRate > 99) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Discount rate must be between 1 and 99");
        }
        if (newBook.price <= 0) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Price must be greater than 0");
        }
        return this.bookRepository.createBook(newBook);
    }
    async getPaginatedBooks(page, perPage) {
        const totalCount = await this.bookRepository.count();
        const totalPages = Math.ceil(totalCount / perPage);
        if (page < 1) {
            page = 1;
        }
        else if (page > totalPages) {
            page = totalPages;
        }
        const skip = (page - 1) * perPage;
        const books = await this.bookRepository.findPaginatedBooks(skip, perPage);
        const remainingBooks = totalCount - skip - books.length;
        if (books.length === 0) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "No books found.");
        }
        return { books, totalCount, totalPages, remainingBooks };
    }
    async getBookById(bookId) {
        const book = await this.bookRepository.findOneBook(bookId);
        if (!book) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
        return book;
    }
    async updateBook(bookId, updatedBookData) {
        const existingBook = await this.getBookById(bookId);
        if (!existingBook) {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
        // Validation checks for updatedBookData
        if (updatedBookData.discountRate !== undefined &&
            (updatedBookData.discountRate < 1 || updatedBookData.discountRate > 99)) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Discount rate must be between 1 and 99");
        }
        if (updatedBookData.price !== undefined && updatedBookData.price <= 0) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Price must be greater than 0");
        }
        const mergedBook = { ...existingBook, ...updatedBookData };
        await this.bookRepository.updateBook(mergedBook);
        return mergedBook;
    }
    async deleteBook(bookId) {
        const existingBook = await this.getBookById(bookId);
        if (existingBook) {
            await this.bookRepository.deleteBook(bookId);
            return existingBook;
        }
        else {
            throw new customError_1.CustomError("Not Found", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, "Book not found");
        }
    }
}
exports.BookService = BookService;
