"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = require("../controllers/purchase.controller");
const purchaseRouter = express_1.default.Router();
purchaseRouter.post("/", purchase_controller_1.createPurchaseController);
exports.default = purchaseRouter;
