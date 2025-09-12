import PackageTrackingService from "@/src/services/PackageTrackingService";
import {
  CreatePackageTrackingRequest,
  GetPackageTrackingByDeviceIdRequest,
} from "@/types/requestTypes";
import { Request, Response, NextFunction } from "express";

const PackageTrackingController = {
  create: async (req: CreatePackageTrackingRequest, res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const result = await PackageTrackingService.create(payload);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
  getByDeviceId: async (
    req: GetPackageTrackingByDeviceIdRequest,
    res: Response,
    next: NextFunction
  ) => {
    const deviceId = req.params.deviceId;
    const latest = req.query.latest === "true";

    try {
      const result = await PackageTrackingService.getByDevice({ deviceId, latest });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  getAllGroupedByDeviceId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deviceIds = await PackageTrackingService.getAllGroupedByDeviceId();
      res.status(200).json(deviceIds);
    } catch (error) {
      next(error);
    }
  },
};

export default PackageTrackingController;
