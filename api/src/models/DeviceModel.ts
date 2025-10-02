import { DeviceTable } from "@/types/dbTablesTypes.js";
import { executeQuery } from "@/utils/index.js";

const DeviceModel = {
  create: async () => {
    return (await executeQuery<DeviceTable>("INSERT INTO device DEFAULT VALUES RETURNING *"))[0];
  },
};

export default DeviceModel;
