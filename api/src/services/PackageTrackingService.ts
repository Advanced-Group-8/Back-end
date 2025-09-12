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
  getByDevice: async (
    params: GetPackageTrackingByDeviceId & { latest?: boolean }
  ): Promise<PackageTracking[]> => {
    return await PackageTrackingModel.getByDevice(params);
  },
  getAllGroupedByDeviceId: async (): Promise<PackageTrackingGroup[]> => {
    return await PackageTrackingModel.getAllGroupedByDeviceId();
  },
};

export default PackageTrackingService;
