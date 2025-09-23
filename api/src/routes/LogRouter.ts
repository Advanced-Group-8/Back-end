import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const logPath = path.resolve(process.cwd(), "logs", "backend.log");

router.get("/", (req, res) => {
  if (!fs.existsSync(logPath)) {
    return res.status(404).json({ message: "Loggfilen finns inte." });
  }
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", "attachment; filename=backend.log");
  fs.createReadStream(logPath).pipe(res);
});

router.delete("/", (req, res) => {
  try {
    fs.writeFileSync(logPath, "");
    res.json({ message: "Loggfilen är nu rensad. "});
  }
  catch (err) {
    res.status(500).json({ message: "Kunde inte rensa loggfilen", error: err });
  }
});

export default router;