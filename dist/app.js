"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
// routes
app.get('/', (req, res) => {
    res.send('<h1>App is running</h1> <h4>Message: Success</h4> <p>Version 1.1</p>');
});
app.use("/api", routes_1.default);
// Error handling middleware
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
