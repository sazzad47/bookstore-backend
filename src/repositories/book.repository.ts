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
    return this.repository.findOne({where: {id: bookId}});
  }

}
