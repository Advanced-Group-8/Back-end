import express, { Request, Response } from "express";
import dotenv from "dotenv";
import PackageRouter from "./routes/PackageRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/package", PackageRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
