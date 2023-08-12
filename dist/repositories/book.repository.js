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
    async findAllBooks() {
        return this.repository.find();
    }
    async findOneBook(bookId) {
        return this.repository.findOne({ where: { id: bookId } });
    }
}
exports.BookRepository = BookRepository;
