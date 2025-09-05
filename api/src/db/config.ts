import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

console.log(DATABASE_URL);

export const pool = new Pool({
  connectionString: DATABASE_URL,
});



