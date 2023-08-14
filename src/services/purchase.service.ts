import { PurchaseRepository } from "../repositories/purchase.repository";
import { BookRepository } from "../repositories/book.repository";
import { Purchase } from "../entities/purchase.entity";
import { CustomError } from "../errors/customError";
import { httpStatusCodes } from "../errors/httpStatusCodes";

export class PurchaseService {
  private purchaseRepository: PurchaseRepository;
  private bookRepository: BookRepository;

  constructor(
    purchaseRepository: PurchaseRepository,
    bookRepository: BookRepository
  ) {
    this.purchaseRepository = purchaseRepository;
    this.bookRepository = bookRepository;
  }

  async createPurchase(
    userId: number,
    quantity: number,
    bookId: number
  ): Promise<Purchase> {
    // Check if required parameters are provided by the client
    if (
      userId === undefined ||
      quantity === undefined ||
      bookId === undefined
    ) {
      throw new CustomError(
        "Missing Input",
        httpStatusCodes.BAD_REQUEST,
        "Required parameters are missing."
      );
    }

    // Validate input parameters
    if (userId <= 0) {
      throw new CustomError(
        "Invalid Input",
        httpStatusCodes.BAD_REQUEST,
        "Invalid userId."
      );
    }

    if (quantity <= 0) {
      throw new CustomError(
        "Invalid Input",
        httpStatusCodes.BAD_REQUEST,
        "Invalid quantity."
      );
    }

    if (bookId <= 0) {
      throw new CustomError(
        "Invalid Input",
        httpStatusCodes.BAD_REQUEST,
        "Invalid bookId."
      );
    }

    const book = await this.bookRepository.findOneBook(bookId);

    if (!book) {
      throw new CustomError(
        "Error",
        httpStatusCodes.NOT_FOUND,
        `Book with id: ${bookId} not found.`
      );
    }

    let totalPrice = 0;

    // Calculate the totalPrice only if book.price is defined
    if (book.price !== undefined) {
      totalPrice = book.price * quantity;

      if (
        book.discountRate !== undefined &&
        book.discountRate > 0 &&
        book.discountRate < 100
      ) {
        const discountedPrice = book.price * (1 - book.discountRate / 100);
        totalPrice = discountedPrice * quantity;
      }
    }

    const purchase = await this.purchaseRepository.createPurchase(
      userId,
      book,
      quantity,
      totalPrice
    );

    if (!purchase) {
      throw new CustomError(
        "Error",
        httpStatusCodes.INTERNAL_SERVER,
        "Failed to create purchase"
      );
    }

    return purchase;
  }
}
