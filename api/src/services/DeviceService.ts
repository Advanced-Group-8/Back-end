import DeviceModel from "@/models/DeviceModel.js";
import { GetDeviceById } from "@/types/types.js";

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
};

export default DeviceService;
