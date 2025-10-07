import { DeviceTable } from "@/types/dbTablesTypes.js";
import { GetDeviceById } from "@/types/types.js";
import { executeQuery } from "@/utils/index.js";

const DeviceModel = {
  create: async () => {
    return (
      await executeQuery<DeviceTable>(
        `INSERT INTO device DEFAULT VALUES RETURNING id, created_at AS "createdAt"`
      )
    )[0];
  },
  get: async () => {
    return await executeQuery<DeviceTable>(
      `
        SELECT 
            id as "id", 
            created_at AS "createdAt"
        FROM device  
      `
    );
  },
  getById: async ({ id }: GetDeviceById) => {
    return (
      await executeQuery<DeviceTable>(
        `
        SELECT 
            id as "id", 
            created_at AS "createdAt"
        FROM device  
        WHERE id = $1
      `,
        [id]
      )
    )[0];
  },
};

export default DeviceModel;
