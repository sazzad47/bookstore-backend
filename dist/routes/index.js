"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_routes_1 = __importDefault(require("./purchase.routes"));
const book_routes_1 = __importDefault(require("./book.routes"));
const router = express_1.default.Router();
// Route for handling purchase-related routes
router.use("/purchase", purchase_routes_1.default);
// Route for handling book-related routes
router.use("/book", book_routes_1.default);
exports.default = router;
