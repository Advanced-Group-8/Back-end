import { PoolClient, QueryResult, QueryResultRow } from "pg";
import { pool } from "../db/config";
import { addDays } from "date-fns";

export const sanitizeValues = <T>(values: (string | T)[]): (string | T)[] => {
  return values.map((value) => (typeof value === "string" ? value.trim() : value));
};

export const executeQuery = async <T extends QueryResultRow = QueryResultRow>(
  query: string,
  values: unknown[] = []
): Promise<T[]> => {
  const sanitizedValues = sanitizeValues(values);
  let client: PoolClient | null = null;

  try {
    client = await pool.connect();
    const response: QueryResult<T> = await client.query(query, sanitizedValues);
    return response.rows;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Database query error:", err.message);
    } else {
      console.error("Unknown database query error:", err);
    }
    throw err;
  } finally {
    client?.release();
  }
};

export const getRandomETA = () =>
  addDays(new Date(), Math.floor(Math.random() * 8) + 3).toISOString();

export const getRandomTrackingCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const generateBlock = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  return `${generateBlock()}-${generateBlock()}-${generateBlock()}-${generateBlock()}`;
};
