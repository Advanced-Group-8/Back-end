import express, { Request, Response } from "express";
import dotenv from "dotenv";
import PackageRouter from "./routes/PackageRouter.js";
import PackageTrackingRouter from "./routes/PackageTrackingRouter.js"; // Lägg till
import "./db/config.js";
import { executeQuery } from "./utils/index.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes
app.use("/package", PackageRouter);
app.use("/package-tracking", PackageTrackingRouter); // Lägg till

app.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Backend API is Working!",
    timestamp: new Date().toISOString(),
    endpoints: {
      packages: "/package",
      tracking: "/package-tracking",
      createPackage: "POST /package",
      getPackages: "GET /package",
      getPackageById: "GET /package/:id",
      createTracking: "POST /package-tracking",
      getTrackingByDevice: "GET /package-tracking/:deviceId",
      getLatestTracking: "GET /package-tracking/:deviceId/latest"
    },
  });
});

// ... rest of code ...