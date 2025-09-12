import { NotFoundError } from "@/errors/Error";
import PackageTrackingModel from "@/src/models/PackageTrackingModel.js";
import { PackageTracking } from "@/src/types/httpPayloadTypes.js";
import {
  CreatePackageTracking,
  GetPackageTrackingByDeviceId,
  PackageTrackingGroup,
} from "@/types/types";

const PackageTrackingService = {
  create: async (payload: CreatePackageTracking): Promise<PackageTracking> => {
    return await PackageTrackingModel.create(payload);
  },
  getByDevice: async ({ deviceId }: GetPackageTrackingByDeviceId): Promise<PackageTracking[]> => {
    return await PackageTrackingModel.getByDevice({ deviceId });
  },
  getLatest: async ({ deviceId }: GetPackageTrackingByDeviceId): Promise<PackageTracking> => {
    const packageTracking = await PackageTrackingModel.getLatest({ deviceId });

    if (!packageTracking) {
      throw new NotFoundError(`No tracking data found for device '${deviceId}'`);
    }

    return packageTracking;
  },
  getAllGroupedByDeviceId: async (): Promise<PackageTrackingGroup[]> => {
    return await PackageTrackingModel.getAllGroupedByDeviceId();
  },
};

export default PackageTrackingService;
