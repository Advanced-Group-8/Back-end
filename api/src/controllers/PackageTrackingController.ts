import PackageTrackingService from "@/src/services/PackageTrackingService";
import {
  CreatePackageTrackingRequest,
  GetPackageTrackingByDeviceIdRequest,
} from "@/types/requestTypes";
import { ApiResponse } from "@/types/responseTypes";
import { Request, Response, NextFunction } from "express";

const PackageTrackingController = {
  create: async (req: CreatePackageTrackingRequest, _res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const createdPackageTracking = await PackageTrackingService.create(payload);

      next({
        statusCode: 201,
        message: "Package tracking data registered successfully",
        data: createdPackageTracking,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  getByDeviceId: async (
    req: GetPackageTrackingByDeviceIdRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const deviceId = req.params.deviceId;
    const latest = req.query.latest === "true";

    try {
      const packageTrackings = await PackageTrackingService.getByDevice({ deviceId, latest });

      next({
        statusCode: 200,
        data: packageTrackings,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  getAllGroupedByDeviceId: async (_req: Request, _res: Response, next: NextFunction) => {
    try {
      const packageTrackings = await PackageTrackingService.getAllGroupedByDeviceId();

      next({
        statusCode: 200,
        data: packageTrackings,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default PackageTrackingController;
