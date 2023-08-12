"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
class BookService {
    bookRepository;
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async createBook(newBook) {
        if (!newBook.title || !newBook.price || !newBook.description || !newBook.discountRate || !newBook.coverImage) {
            throw new Error("All book fields are required to create a book");
        }
        if (newBook.discountRate < 1 || newBook.discountRate > 99) {
            throw new Error("Discount rate must be between 1 and 99");
        }
        if (newBook.price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        return this.bookRepository.createBook(newBook);
    }
    async getAllBooks() {
        // Fetch all books from the repository
        const books = await this.bookRepository.findAllBooks();
        if (books.length === 0) {
            throw new Error("No books found.");
        }
        return books;
    }
    async getBookById(bookId) {
        // Fetch the book from the repository
        const book = await this.bookRepository.findOneBook(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    }
}
exports.BookService = BookService;
