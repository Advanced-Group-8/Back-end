import DeviceService from "@/services/DeviceService.js";
import { ApiResponse } from "@/types/responseTypes.js";
import { NextFunction, Request, Response } from "express";

const DeviceController = {
  create: async (_req: Request, _res: Response, next: NextFunction) => {
    try {
      const createdDevice = await DeviceService.create();

      next({ message: "Device created", statusCode: 201, data: createdDevice } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default DeviceController;
