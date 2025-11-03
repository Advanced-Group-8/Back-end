import { isOkApiResponse } from "@/utils/index.js";
import { NextFunction, Request, Response } from "express";

const ResponseMiddleware = {
  respond: (payload: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (isOkApiResponse(payload)) {
      const { statusCode, message, data, token } = payload as any;

      const responseBody: Record<string, unknown> = {
        success: true,
        message,
      };

      if (data !== undefined) responseBody.data = data;
      if (token !== undefined) responseBody.token = token;

      return res.status(statusCode).json(responseBody);
    }

    return next(payload);
  },
};

export default ResponseMiddleware;
