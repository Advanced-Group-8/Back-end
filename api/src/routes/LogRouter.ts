import express from "express";
import fs from "fs";
import path from "path";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();
const logPath = path.resolve(process.cwd(), "logs", "backend.log");

router.get("/", (req, res) => {
  if (!fs.existsSync(logPath)) {
    return res.status(404).send("<h2>Loggfilen finns inte.</h2>");
  }
  const logs = fs
    .readFileSync(logPath, "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        const entry = JSON.parse(line);
        return `<div><strong>[${entry.level}]</strong> ${entry.timestamp}: ${entry.message} ${entry.meta ? JSON.stringify(entry.meta) : ""}</div>`;
      } catch {
        return `<div>${line}</div>`;
      }
    })
    .join("");

  res.send(`
    <html>
      <body>
        <h2>Loggar</h2>
        <div>${logs}</div>
        <br>
        <form method="GET" action="/logs/download">
          <button type="submit">Ladda ner loggfil</button>
        </form>
      </body>
    </html>
  `);
});

// Nedladdning av loggfil
router.get("/download", (req, res) => {
  if (!fs.existsSync(logPath)) {
    return res.status(404).send("Loggfilen finns inte.");
  }
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", "attachment; filename=backend.log");
  fs.createReadStream(logPath).pipe(res);
});

router.delete("/", (req, res) => {
  try {
    fs.writeFileSync(logPath, "");
    res.json({ message: "Loggfilen är nu rensad. " });
  } catch (err) {
    res.status(500).json({ message: "Kunde inte rensa loggfilen", error: err });
  }
});

export default router;
