import express from "express";
import { createPurchaseController } from "../controllers/purchase.controller";

const purchaseRouter = express.Router();

// Route to create a new purchase
purchaseRouter.post("/", createPurchaseController);

export default purchaseRouter;
