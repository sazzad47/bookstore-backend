import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import {
  returnError,
} from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Read Swagger JSON from file
const swaggerFile = `${process.cwd()}/swagger/index.json`;
const swaggerData = fs.readFileSync(swaggerFile, "utf8");
const swaggerJSON = JSON.parse(swaggerData);

// routes
app.get('/', (req, res) => {
  res.send('The app is running.');
});
app.use("/api", routes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// Error handling middleware
app.use(returnError);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
