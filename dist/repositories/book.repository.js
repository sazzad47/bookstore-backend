"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const ormconfig_1 = require("../ormconfig");
class BookRepository {
    repository;
    constructor() {
        this.repository = ormconfig_1.dataSource.getRepository(book_entity_1.Book);
    }
    // Create a new book
    async createBook(newBook) {
        return this.repository.save(newBook);
    }
    // Count the number of books in the repository
    async count() {
        return this.repository.count();
    }
    // Find and return an array of paginated books with available stock
    async findPaginatedBooks(skip, perPage) {
        return this.repository.find({
            where: { stock: (0, typeorm_1.MoreThan)(0) },
            skip,
            take: perPage,
            order: { id: 'ASC' }
        });
    }
    // Find a book by its ID
    async findOneBook(bookId) {
        return this.repository.findOne({ where: { id: bookId } });
    }
    // Update a book's information
    async updateBook(updatedBook) {
        await this.repository.update({ id: updatedBook.id }, updatedBook);
    }
    // Update a book's stock
    async updateBookStock(bookId, newStock) {
        await this.repository.update({ id: bookId }, { stock: newStock });
    }
    // Delete a book by its ID
    async deleteBook(bookId) {
        await this.repository.delete(bookId);
    }
}
exports.BookRepository = BookRepository;
