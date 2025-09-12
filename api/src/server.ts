import express from "express";
import dotenv from "dotenv";
import PackageRouter from "./routes/PackageRouter.js";
import PackageTrackingRouter from "./routes/PackageTrackingRouter.js";
import "./db/config.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import ResponseMiddleware from "./middlewares/ResponseMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
