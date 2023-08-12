import { Repository } from "typeorm";
import { Purchase } from "../entities/purchase.entity";
import { dataSource } from "../ormconfig";
import { Book } from "../entities/book.entity";

export class PurchaseRepository {
  private repository: Repository<Purchase>;

  constructor() {
    this.repository = dataSource.getRepository(Purchase);
  }

  async createPurchase(
    userId: number,
    book: Book,
    quantity: number,
    totalPrice: number
  ): Promise<Purchase> {
    const purchase = new Purchase();
    purchase.userId = userId;
    purchase.book = book;
    purchase.quantity = quantity;
    purchase.totalPrice = totalPrice;

    return this.repository.save(purchase);
  }

}
