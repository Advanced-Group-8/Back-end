import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthorizedError } from "@/errors/Error.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export const sign = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1w",
    ...options,
  });

export const verify = <T extends object = JwtPayload>(token: string): T => {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    throw new UnauthorizedError("Your session has expired, plase login in again to continue");
  }
};
