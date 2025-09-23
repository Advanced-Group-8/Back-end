import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.resolve(__dirname, "./swagger.yaml");

export const swaggerSpec = yaml.load(fs.readFileSync(swaggerPath, "utf8"));
