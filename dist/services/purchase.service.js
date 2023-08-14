"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const customError_1 = require("../errors/customError");
const httpStatusCodes_1 = require("../errors/httpStatusCodes");
class PurchaseService {
    purchaseRepository;
    bookRepository;
    constructor(purchaseRepository, bookRepository) {
        this.purchaseRepository = purchaseRepository;
        this.bookRepository = bookRepository;
    }
    async createPurchase(userId, quantity, bookId) {
        // Check if required parameters are provided by the client
        if (userId === undefined ||
            quantity === undefined ||
            bookId === undefined) {
            throw new customError_1.CustomError("Missing Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Required parameters are missing.");
        }
        // Validate input parameters
        if (userId <= 0) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Invalid userId.");
        }
        if (quantity <= 0) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Invalid quantity.");
        }
        if (bookId <= 0) {
            throw new customError_1.CustomError("Invalid Input", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Invalid bookId.");
        }
        const book = await this.bookRepository.findOneBook(bookId);
        if (!book) {
            throw new customError_1.CustomError("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, `Book with id: ${bookId} not found.`);
        }
        let totalPrice = 0;
        // Calculate the totalPrice only if book.price is defined
        if (book.price !== undefined) {
            totalPrice = book.price * quantity;
            if (book.discountRate !== undefined &&
                book.discountRate > 0 &&
                book.discountRate < 100) {
                const discountedPrice = book.price * (1 - book.discountRate / 100);
                totalPrice = discountedPrice * quantity;
            }
        }
        const purchase = await this.purchaseRepository.createPurchase(userId, book, quantity, totalPrice);
        if (!purchase) {
            throw new customError_1.CustomError("Error", httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER, "Failed to create purchase");
        }
        return purchase;
    }
}
exports.PurchaseService = PurchaseService;
