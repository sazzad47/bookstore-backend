"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
class PurchaseService {
    purchaseRepository;
    bookRepository;
    constructor(purchaseRepository, bookRepository) {
        this.purchaseRepository = purchaseRepository;
        this.bookRepository = bookRepository;
    }
    async createPurchase(userId, quantity, bookId) {
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
        const purchase = await this.purchaseRepository.createPurchase(userId, book, quantity, totalPrice);
        if (!purchase) {
            throw new Error("Failed to create purchase");
        }
        return purchase;
    }
}
exports.PurchaseService = PurchaseService;
