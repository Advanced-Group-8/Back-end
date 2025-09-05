import express, { Request, Response } from "express";
import dotenv from "dotenv";
import PackageRouter from "./src/routes/PackageRouter.js";
import SensorRouter from "./src/routes/SensorRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/package", PackageRouter);
app.use("/sensor", SensorRouter);

app.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Backend API is Working!",
    timestamp: new Date().toISOString(),
    endpoints: {
      packages: "/package",
      sensors: "/sensor",
      temperature: "/sensor/temperature",
      humidity: "/sensor/humidity",
      location: "/sensor/location"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`)
});

