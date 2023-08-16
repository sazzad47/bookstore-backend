"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const book_entity_1 = require("../entities/book.entity");
const ormconfig_1 = require("../ormconfig");
class BookRepository {
    repository;
    constructor() {
        this.repository = ormconfig_1.dataSource.getRepository(book_entity_1.Book);
    }
    async createBook(newBook) {
        return this.repository.save(newBook);
    }
    async count() {
        return this.repository.count();
    }
    async findPaginatedBooks(skip, perPage) {
        return this.repository.find({ skip, take: perPage, order: { id: 'ASC' } });
    }
    async findOneBook(bookId) {
        return this.repository.findOne({ where: { id: bookId } });
    }
    async updateBook(updatedBook) {
        await this.repository.update({ id: updatedBook.id }, updatedBook);
    }
    async deleteBook(bookId) {
        await this.repository.delete(bookId);
    }
}
exports.BookRepository = BookRepository;
