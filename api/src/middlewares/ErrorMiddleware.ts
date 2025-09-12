import { AppError, NotFoundError } from "@/errors/Error";
import { buildZodValidationErrors } from "@/utils/validation";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const ErrorMiddleware = {
  errorHandler: (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
        success: false,
      });
    } else if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Malformed input",
        success: false,
        errors: buildZodValidationErrors(err),
      });
    }

    console.error(err);

    res.status(500).json({
      message: "Internal server errorkkkkk",
      success: false,
    });
  },
  notFoundHandler: (req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
  },
};

export default ErrorMiddleware;
