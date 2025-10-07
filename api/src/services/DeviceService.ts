import DeviceModel from "@/models/DeviceModel.js";
import { GetDeviceById } from "@/types/types.js";
import PackageService from "./PackageService.js";
import { mostFrequentString } from "@/utils/index.js";
import { PackageStatus } from "@/types/responseTypes.js";
import PackageModel from "@/models/PackageModel.js";

const DeviceService = {
  create: async () => {
    return await DeviceModel.create();
  },
  get: async () => {
    return await DeviceModel.get();
  },
  getById: async (payload: GetDeviceById) => {
    return await DeviceModel.getById(payload);
  },
  updateStatus: async ({ id }: GetDeviceById) => {
    const statuses = (await PackageService.getByDeviceId({ deviceId: id })).map((p) => p.status);
    const status = mostFrequentString(statuses);

    if (!status) {
      return;
    }

    if (status === "delivered") {
      return;
    }

    const newStatus: PackageStatus =
      status === "pending"
        ? "in_transit"
        : status === "in_transit"
          ? "out_for_delivery"
          : "delivered";

    const packages = (await PackageModel.update({ deviceId: id }, { status: newStatus })) ?? [];

    return { packages, newStatus };
  },
};

export default DeviceService;
