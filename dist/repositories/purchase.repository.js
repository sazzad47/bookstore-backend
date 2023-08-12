"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRepository = void 0;
const purchase_entity_1 = require("../entities/purchase.entity");
const ormconfig_1 = require("../ormconfig");
class PurchaseRepository {
    repository;
    constructor() {
        this.repository = ormconfig_1.dataSource.getRepository(purchase_entity_1.Purchase);
    }
    async createPurchase(userId, book, quantity, totalPrice) {
        const purchase = new purchase_entity_1.Purchase();
        purchase.userId = userId;
        purchase.book = book;
        purchase.quantity = quantity;
        purchase.totalPrice = totalPrice;
        return this.repository.save(purchase);
    }
}
exports.PurchaseRepository = PurchaseRepository;
