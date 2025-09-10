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
      getLatestTracking: "GET /package-tracking/:deviceId/latest",
      getAllGroupedByDeviceId: "GET /package-tracking/"
    },
  });
});

// ... rest of code ...


async function testConnection() {
  try {
    const result = await executeQuery("SELECT * FROM package");
    console.log("Database time:", result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Connection test failed:", error.message);
    } else {
      console.error("Unknown error while testing connection:", error);
    }
  }
}

testConnection();

app.use(ErrorMiddleware.notFoundHandler, ErrorMiddleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
});