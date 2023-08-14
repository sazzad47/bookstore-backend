import { BookRepository } from "../repositories/book.repository";
import { Book } from "../entities/book.entity";
import { CustomError } from "../errors/customError";
import { httpStatusCodes } from "../errors/httpStatusCodes";

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async createBook(newBook: Book): Promise<Book> {
    if (!newBook.title || !newBook.price || !newBook.description || !newBook.discountRate || !newBook.coverImage) {
      throw new CustomError("Invalid Input", httpStatusCodes.BAD_REQUEST, "All book fields are required to create a book");
    }

    if (newBook.discountRate < 1 || newBook.discountRate > 99) {
      throw new CustomError("Invalid Input", httpStatusCodes.BAD_REQUEST, "Discount rate must be between 1 and 99");
    }

    if (newBook.price <= 0) {
      throw new CustomError("Invalid Input", httpStatusCodes.BAD_REQUEST, "Price must be greater than 0");
    }

    return this.bookRepository.createBook(newBook);
  }

  async getAllBooks(): Promise<Book[]> {
    // Fetch all books from the repository
    const books = await this.bookRepository.findAllBooks();

    if (books.length === 0) {
      throw new CustomError("Not Found", httpStatusCodes.NOT_FOUND, "No books found.");
    }

    return books;
  }

  async getBookById(bookId: number): Promise<Book | null> {
    // Fetch the book from the repository
    const book = await this.bookRepository.findOneBook(bookId);

    if (!book) {
      throw new CustomError("Not Found", httpStatusCodes.NOT_FOUND, "Book not found");
    }

    return book;
  }
}
