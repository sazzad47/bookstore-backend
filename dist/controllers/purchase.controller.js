"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseController = void 0;
const purchase_service_1 = require("../services/purchase.service");
const purchase_repository_1 = require("../repositories/purchase.repository");
const book_repository_1 = require("../repositories/book.repository");
const createPurchaseController = async (req, res, next) => {
    try {
        const { userId, bookId, quantity } = req.body;
        // Create new instances of repositories for this request
        const purchaseRepository = new purchase_repository_1.PurchaseRepository();
        const bookRepository = new book_repository_1.BookRepository();
        const purchaseService = new purchase_service_1.PurchaseService(purchaseRepository, bookRepository);
        const purchase = await purchaseService.createPurchase(userId, quantity, bookId);
        res.status(201).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
exports.createPurchaseController = createPurchaseController;
