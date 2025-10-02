import DeviceModel from "@/models/DeviceModel.js";

const DeviceService = {
  create: async () => {
    return await DeviceModel.create();
  },
};

export default DeviceService;
