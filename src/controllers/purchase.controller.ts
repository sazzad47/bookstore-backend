import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { BookRepository } from "../repositories/book.repository";

export const createPurchaseController = async (req: Request, res: Response) => {
  try {
    const { userId, bookId, quantity } = req.body;

    if (!userId || !bookId || !quantity) {
      throw new ClientError("Invalid request parameters");
    }

    // Create new instances of repositories for this request
    const purchaseRepository = new PurchaseRepository();
    const bookRepository = new BookRepository();

    const purchaseService = new PurchaseService(purchaseRepository, bookRepository);
    const purchase = await purchaseService.createPurchase(userId, quantity, bookId);

    res.status(201).json(purchase);
  } catch (error) {
    console.error(error);

    if (error instanceof ClientError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
  }
}
