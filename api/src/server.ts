import express from "express";
import dotenv from "dotenv";
import PackageRouter from "./routes/PackageRouter.js";
import PackageTrackingRouter from "./routes/PackageTrackingRouter.js";
import "./db/config.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import ResponseMiddleware from "./middlewares/ResponseMiddleware.js";
import swaggerUi from "swagger-ui-express";
import { executeQuery } from "./utils/index.js";
import { swaggerSpec } from "./docs/swagger.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || process.env.WEBSITES_PORT || "3000");
const HOST = "0.0.0.0";

app.use(express.json());

// Health check endpoint (VIKTIGT för Azure!)
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT,
    host: HOST,
  });
});

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec!));

// Routes
app.use("/package", PackageRouter);
app.use("/package-tracking", PackageTrackingRouter);

// Middlewares
app.use(ResponseMiddleware.respond);
app.use(ErrorMiddleware.notFoundHandler);
app.use(ErrorMiddleware.errorHandler);

// Async startup function
async function startServer() {
  try {
    // Test database connection
    console.log("🔍 Testing database connection...");
    const dbTest = await executeQuery("SELECT NOW() as current_time;");
    console.log("✅ Database connected:", dbTest);

    // Start server - BARA EN GÅNG!
    const server = app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
      console.log(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`);
      console.log(`❤️ Health check: http://${HOST}:${PORT}/health`);
      console.log(`🐳 Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("🛑 SIGTERM received, shutting down gracefully");
      server.close(() => {
        console.log("✅ Process terminated gracefully");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("🛑 SIGINT received, shutting down gracefully");
      server.close(() => {
        console.log("✅ Process terminated gracefully");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
