"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const ormconfig_1 = require("../ormconfig");
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
        const queryRunner = ormconfig_1.dataSource.createQueryRunner();
        let purchase;
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const book = await this.bookRepository.findOneBook(bookId);
            if (!book) {
                throw new customError_1.CustomError("Error", httpStatusCodes_1.httpStatusCodes.NOT_FOUND, `Book with id: ${bookId} not found.`);
            }
            if (book.stock === undefined || book.stock < quantity) {
                throw new customError_1.CustomError("Insufficient Stock", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Not enough stock available for purchase.");
            }
            // Update the book's stock quantity
            const newStock = book.stock - quantity;
            await this.bookRepository.updateBookStock(bookId, newStock);
            // Calculate totalPrice
            let totalPrice = 0;
            if (book.price !== undefined) {
                totalPrice = book.price * quantity;
                if (book.discountRate !== undefined && book.discountRate > 0 && book.discountRate < 100) {
                    const discountedPrice = book.price * (1 - book.discountRate / 100);
                    totalPrice = discountedPrice * quantity;
                }
            }
            // Create the purchase record using the repository
            const newPurchase = await this.purchaseRepository.createPurchase(userId, book, quantity, totalPrice);
            await queryRunner.commitTransaction();
            purchase = newPurchase;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
        return purchase;
    }
}
exports.PurchaseService = PurchaseService;
