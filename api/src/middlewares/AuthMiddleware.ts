import { UnauthorizedError } from "@/errors/Error.js";
import { verify } from "@/utils/jwt.js";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload | string;
  }
}

const AuthMiddleware = {
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid Authorization header");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verify(token);

    req.user = decoded;
    next();
  },
};

export default AuthMiddleware;
