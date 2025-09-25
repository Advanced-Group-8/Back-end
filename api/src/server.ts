import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import PackageRouter from "./routes/PackageRouter.js";
import PackageTrackingRouter from "./routes/PackageTrackingRouter.js";
import "./db/config.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import ResponseMiddleware from "./middlewares/ResponseMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import LogRouter from "./routes/LogRouter.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || process.env.WEBSITES_PORT || "3000");
const HOST = "0.0.0.0";

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec!));

// Routes
app.use("/package", PackageRouter);
app.use("/package-tracking", PackageTrackingRouter);
app.use("/logs", LogRouter);

// Middlewares
app.use(ResponseMiddleware.respond);
app.use(ErrorMiddleware.notFoundHandler);
app.use(ErrorMiddleware.errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
