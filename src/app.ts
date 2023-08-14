import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import fs from 'fs';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Read Swagger JSON from file
const swaggerFile = `${process.cwd()}/swagger/index.json`;
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerJSON = JSON.parse(swaggerData);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));

// routes
app.use("/api", routes);

// Error handling middleware
app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
