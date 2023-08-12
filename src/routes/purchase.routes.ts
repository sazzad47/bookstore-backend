import express from "express";
import { createPurchaseController } from "../controllers/purchase.controller";

const purchaseRouter = express.Router();

purchaseRouter.post("/", createPurchaseController);

export default purchaseRouter;
