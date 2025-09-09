import { AppError } from "@/errors/Error";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const ErrorHandlerMiddleware = {
  errorHandler: (async (err: unknown, req: Request, res: Response, next: NextFunction) => {
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
  }) as ErrorRequestHandler,
};

export default ErrorHandlerMiddleware;
