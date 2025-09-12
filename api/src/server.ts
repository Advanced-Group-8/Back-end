import express from "express";
import dotenv from "dotenv";
import PackageRouter from "./routes/PackageRouter.js";
import PackageTrackingRouter from "./routes/PackageTrackingRouter.js";
import "./db/config.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import ResponseMiddleware from "./middlewares/ResponseMiddleware.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.resolve(__dirname, "./docs/swagger.yaml");
const swaggerSpec = yaml.load(fs.readFileSync(swaggerPath, "utf8"));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec!));

// Routes
app.use("/package", PackageRouter);

app.use("/package-tracking", PackageTrackingRouter);

// Custom response middleware (must come before notFound + errorHandler)
app.use(ResponseMiddleware.respond);

//404 handler - route not found
app.use(ErrorMiddleware.notFoundHandler);

//Generic error handler
app.use(ErrorMiddleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
