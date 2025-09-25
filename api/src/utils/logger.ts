import fs from "fs";
import path from "path";

const logDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, "backend.log");

function logToFile(level: string, message: string, meta?: unknown) {
  const entry = {
    timestamp: new Date().toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" }),
    level,
    message,
    ...(meta ? { meta } : {}),
  };
  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n");
}

export const logger = {
  info: (msg: string, meta?: unknown) => {
    console.log(`ℹ️  ${msg}`, meta || "");
    logToFile("INFO", msg, meta);
  },
  warn: (msg: string, meta?: unknown) => {
    console.warn(`⚠️  ${msg}`, meta || "");
    logToFile("WARN", msg, meta);
  },
  error: (msg: string, meta?: unknown) => {
    console.error(`❌ ${msg}`, meta || "");
    logToFile("ERROR", msg, meta);
  },
};