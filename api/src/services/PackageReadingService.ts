import PackageTrackingModel from "@/models/PackageTrackingModel";
import { CreatePackageTracking } from "@/src/types/types.js";

const PackageService = {
  create: async (
    payload: CreatePackageTracking
  ): Promise<ReturnType<typeof PackageTrackingModel.create>> => {
    return await PackageTrackingModel.create(payload);
  },
};

export default PackageService;
