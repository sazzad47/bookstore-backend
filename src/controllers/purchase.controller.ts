import { NextFunction, Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { BookRepository } from "../repositories/book.repository";

export const createPurchaseController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId, bookId, quantity } = req.body;

        // Create new instances of repositories for this request
        const purchaseRepository = new PurchaseRepository();
        const bookRepository = new BookRepository();

        const purchaseService = new PurchaseService(
            purchaseRepository,
            bookRepository
        );

        const purchase = await purchaseService.createPurchase(
            userId,
            quantity,
            bookId
        );

        res.status(201).json(purchase);
    } catch (error) {
        next(error);
    }
};
