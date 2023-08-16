import express from "express";
import purchaseRouter from "./purchase.routes";
import bookRouter from "./book.routes"; 

const router = express.Router();

// Route for handling purchase-related routes
router.use("/purchase", purchaseRouter);

// Route for handling book-related routes
router.use("/book", bookRouter); 

export default router;
