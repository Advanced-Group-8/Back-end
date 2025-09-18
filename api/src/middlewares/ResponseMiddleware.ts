import { isOkApiResponse } from "@/utils/index.js";
import { NextFunction, Request, Response } from "express";

const ResponseMiddleware = {
  respond: (payload: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (isOkApiResponse(payload)) {
      const { statusCode, message, data } = payload;

      return res.status(statusCode).json({ message, data, success: true });
    }

    return next(payload);
  },
};

export default ResponseMiddleware;