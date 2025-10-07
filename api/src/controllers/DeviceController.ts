import DeviceService from "@/services/DeviceService.js";
import { GetDeviceByIdRequest } from "@/types/requestTypes.js";
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
  get: async (_req: Request, _res: Response, next: NextFunction) => {
    try {
      const devices = await DeviceService.get();

      next({ statusCode: 200, data: devices } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req: GetDeviceByIdRequest, _res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const device = await DeviceService.getById({ id });

      next({ statusCode: 200, data: device } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  updateStatus: async (req: GetDeviceByIdRequest, _res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const { packages, newStatus } = (await DeviceService.updateStatus({ id })) ?? {};

      next({
        message: "Status of packages updated successfully",
        statusCode: 200,
        data: { status: newStatus, packages },
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default DeviceController;
