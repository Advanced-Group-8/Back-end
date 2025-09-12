import PackageTrackingService from "@/src/services/PackageTrackingService";
import { PackageTracking } from "@/src/types/httpPayloadTypes";
import { Request, Response, NextFunction } from "express";

const PackageTrackingController = {
  // POST: Skapa tracking-data från IoT
  create: async (req: Request<{}, {}, PackageTracking>, res: Response, next: NextFunction) => {
    try {
      const trackingData = req.body;
      const result = await PackageTrackingService.create(trackingData);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
  // GET: Hämta tracking-historik för en device
  getByDeviceId: async (req: Request<{ deviceId: string }>, res: Response, next: NextFunction) => {
    try {
      const deviceId = req.params.deviceId;
      const result = await PackageTrackingService.getByDevice(deviceId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  // GET: Senaste tracking för en device
  getLatest: async (req: Request<{ deviceId: string }>, res: Response, next: NextFunction) => {
    try {
      const deviceId = req.params.deviceId;
      const result = await PackageTrackingService.getLatest(deviceId);

      if (!result) {
        return res.status(404).json({ message: "No tracking data found for this device" });
      }

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
