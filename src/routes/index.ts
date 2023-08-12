import express from "express";
import purchaseRouter from "./purchase.routes";
import bookRouter from "./book.routes"; 

const router = express.Router();

router.use("/purchases", purchaseRouter);
router.use("/books", bookRouter); 

export default router;
