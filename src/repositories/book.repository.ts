import { Repository } from "typeorm";
import { Book } from "../entities/book.entity";
import { dataSource } from "../ormconfig";

export class BookRepository {
    private repository: Repository<Book>;

    constructor() {
        this.repository = dataSource.getRepository(Book);
    }

    // Create a new book
    async createBook(newBook: Book): Promise<Book> {
        return this.repository.save(newBook);
    }

    // Count the number of books in the repository
    async count(): Promise<number> {
        return this.repository.count();
    }

    // Find and return an array of paginated books
    async findPaginatedBooks(skip: number, perPage: number): Promise<Book[]> {
        return this.repository.find({ skip, take: perPage, order: { id: 'ASC' } });
    }

    // Find a book by its ID
    async findOneBook(bookId: number): Promise<Book | null> {
        return this.repository.findOne({ where: { id: bookId } });
    }

    // Update a book's information
    async updateBook(updatedBook: Book): Promise<void> {
        await this.repository.update({ id: updatedBook.id }, updatedBook);
    }

    // Delete a book by its ID
    async deleteBook(bookId: number): Promise<void> {
        await this.repository.delete(bookId);
    }
}
