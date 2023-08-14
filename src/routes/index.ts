import express from "express";
import purchaseRouter from "./purchase.routes";
import bookRouter from "./book.routes"; 

const router = express.Router();

router.use("/purchase", purchaseRouter);
router.use("/book", bookRouter); 

export default router;
