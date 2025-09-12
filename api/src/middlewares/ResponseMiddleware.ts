import { isApiResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";

const ResponseMiddleware = {
  respond: (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (isApiResponse(err)) {
      const { statusCode, message, data } = err;

      return res.status(statusCode).json({ statusCode, message, data, success: true });
    }

    return next(err);
  },
};

export default ResponseMiddleware;
