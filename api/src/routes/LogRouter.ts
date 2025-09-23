import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  const logPath = path.resolve(process.cwd(), "logs", "backend.log");
  if (!fs.existsSync(logPath)) {
    return res.status(404).json({ message: "Loggfilen finns inte." });
  }
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", "attachment; filename=backend.log");
  fs.createReadStream(logPath).pipe(res);
});

export default router;