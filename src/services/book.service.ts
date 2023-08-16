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
        // Validation checks for required fields and valid values
        if (
            !newBook.title ||
            !newBook.price ||
            !newBook.description ||
            !newBook.discountRate ||
            !newBook.coverImage
        ) {
            throw new CustomError(
                "Invalid Input",
                httpStatusCodes.BAD_REQUEST,
                "All book fields are required to create a book"
            );
        }

        if (newBook.discountRate < 1 || newBook.discountRate > 99) {
            throw new CustomError(
                "Invalid Input",
                httpStatusCodes.BAD_REQUEST,
                "Discount rate must be between 1 and 99"
            );
        }

        if (newBook.price <= 0) {
            throw new CustomError(
                "Invalid Input",
                httpStatusCodes.BAD_REQUEST,
                "Price must be greater than 0"
            );
        }

        return this.bookRepository.createBook(newBook);
    }

    async getPaginatedBooks(
        page: number,
        perPage: number
    ): Promise<{ books: Book[]; totalCount: number; totalPages: number, remainingBooks: number; }> {
        // Calculate pagination values and retrieve paginated books
        const totalCount = await this.bookRepository.count();
        const totalPages = Math.ceil(totalCount / perPage);

        if (page < 1) {
            page = 1;
        } else if (page > totalPages) {
            page = totalPages;
        }

        const skip = (page - 1) * perPage;
        const books = await this.bookRepository.findPaginatedBooks(skip, perPage);

        const remainingBooks = totalCount - skip - books.length;
        if (books.length === 0) {
            throw new CustomError(
                "Not Found",
                httpStatusCodes.NOT_FOUND,
                "No books found."
            );
        }

        return { books, totalCount, totalPages, remainingBooks };
    }

    async getBookById(bookId: number): Promise<Book | null> {
        const book = await this.bookRepository.findOneBook(bookId);

        if (!book) {
            throw new CustomError(
                "Not Found",
                httpStatusCodes.NOT_FOUND,
                "Book not found"
            );
        }

        return book;
    }

    async updateBook(
        bookId: number,
        updatedBookData: Book
    ): Promise<Book | null> {
        const existingBook = await this.getBookById(bookId);

        if (!existingBook) {
            throw new CustomError(
                "Not Found",
                httpStatusCodes.NOT_FOUND,
                "Book not found"
            );
        }

        // Validation checks for updatedBookData
        if (
            updatedBookData.discountRate !== undefined &&
            (updatedBookData.discountRate < 1 || updatedBookData.discountRate > 99)
        ) {
            throw new CustomError(
                "Invalid Input",
                httpStatusCodes.BAD_REQUEST,
                "Discount rate must be between 1 and 99"
            );
        }

        if (updatedBookData.price !== undefined && updatedBookData.price <= 0) {
            throw new CustomError(
                "Invalid Input",
                httpStatusCodes.BAD_REQUEST,
                "Price must be greater than 0"
            );
        }

        const mergedBook = { ...existingBook, ...updatedBookData };
        await this.bookRepository.updateBook(mergedBook);

        return mergedBook;
    }

    async deleteBook(bookId: number): Promise<Book | null> {
        const existingBook = await this.getBookById(bookId);

        if (existingBook) {
            await this.bookRepository.deleteBook(bookId);
            return existingBook;
        } else {
            throw new CustomError(
                "Not Found",
                httpStatusCodes.NOT_FOUND,
                "Book not found"
            );
        }
    }
}
