import { dataSource } from "../ormconfig";
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
        const queryRunner = dataSource.createQueryRunner();
        let purchase: Purchase | undefined;

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const book = await this.bookRepository.findOneBook(bookId);

            if (!book) {
                throw new CustomError(
                    "Error",
                    httpStatusCodes.NOT_FOUND,
                    `Book with id: ${bookId} not found.`
                );
            }

            if (book.stock === undefined || book.stock < quantity) {
                throw new CustomError(
                    "Insufficient Stock",
                    httpStatusCodes.BAD_REQUEST,
                    "Not enough stock available for purchase."
                );
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
            const newPurchase = await this.purchaseRepository.createPurchase(
                userId,
                book,
                quantity,
                totalPrice
            );

            await queryRunner.commitTransaction();
            purchase = newPurchase;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        return purchase;
    }
}
