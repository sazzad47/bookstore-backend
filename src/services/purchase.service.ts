import { PurchaseRepository } from "../repositories/purchase.repository";
import { BookRepository } from "../repositories/book.repository";
import { Purchase } from "../entities/purchase.entity";

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
   
    const book = await this.bookRepository.findOneBook(bookId);
   
    if (!book) {
      throw new Error("Book not found");
    }

    let totalPrice = 0;

    // Calculate the totalPrice only if book.price is defined
    if (book.price !== undefined) {
      totalPrice = book.price * quantity;

      if (book.discountRate !== undefined && book.discountRate > 0 && book.discountRate < 100) {
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
      throw new Error("Failed to create purchase");
    }

    return purchase;
  }

}
