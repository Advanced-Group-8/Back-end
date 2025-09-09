import { CreatePackageTracking, PackageTracking } from "@/types/types";
import { executeQuery } from "@/utils";

const PackageTrackingModel = {
  create: async ({ deviceId, lat, lng, temperature, humidity }: CreatePackageTracking) => {
    return (
      await executeQuery<PackageTracking>(
        `
            INSERT INTO package_tracking (device_id, lat, lng, temperature, humidity)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `,
        [deviceId, lat, lng, temperature, humidity]
      )
    )[0];
  },
};

export default PackageTrackingModel;
