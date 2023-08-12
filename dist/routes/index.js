"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_routes_1 = __importDefault(require("./purchase.routes"));
const book_routes_1 = __importDefault(require("./book.routes"));
const router = express_1.default.Router();
router.use("/purchases", purchase_routes_1.default);
router.use("/books", book_routes_1.default);
exports.default = router;
