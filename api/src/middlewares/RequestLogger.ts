import { Request, Response, NextFunction } from "express";
import logger from "@/utils/logger";

const RequestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);
  next();
};

export default RequestLogger;