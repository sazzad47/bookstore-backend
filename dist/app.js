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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Read Swagger JSON from file
const swaggerFile = `${process.cwd()}/swagger/index.json`;
const swaggerData = fs_1.default.readFileSync(swaggerFile, "utf8");
const swaggerJSON = JSON.parse(swaggerData);
// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('The app is running.');
});
// Set up API routes
app.use("/api", routes_1.default);
// Serve Swagger UI at /api-docs
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJSON));
// Error handling middleware
app.use(errorHandler_1.returnError);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
