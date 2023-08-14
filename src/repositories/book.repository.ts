import { Repository } from "typeorm";
import { Book } from "../entities/book.entity";
import { dataSource } from "../ormconfig";

export class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = dataSource.getRepository(Book);
  }

  async createBook(newBook: Book): Promise<Book> {
    return this.repository.save(newBook);
  }

  async findAllBooks(): Promise<Book[]> {
    return this.repository.find();
  }

  async findOneBook(bookId: number): Promise<Book | null> {
    return this.repository.findOne({ where: { id: bookId } });
  }

  async updateBook(updatedBook: Book): Promise<void> {
    await this.repository.update({ id: updatedBook.id }, updatedBook);
  }

  async deleteBook(bookId: number): Promise<void> {
    await this.repository.delete(bookId);
  }
}
