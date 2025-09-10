import { AppError, NotFoundError } from "@/errors/Error";
import { Request, Response, NextFunction } from "express";

const ErrorMiddleware = {
  errorHandler: (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        success: false,
      });
    }

    console.error(err);

    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  },
  notFoundHandler: (req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  },
};

export default ErrorMiddleware;
