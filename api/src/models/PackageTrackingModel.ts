import { PackageTracking } from "@/src/types/httpPayloadTypes.js";
import { executeQuery } from "@/src/utils/index.js";
import {
  CreatePackageTracking,
  GetPackageTrackingByDeviceId,
  PackageTrackingGroup,
} from "@/types/types.js";

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
  getByDevice: async ({
    deviceId,
    latest,
  }: GetPackageTrackingByDeviceId & { latest?: boolean }): Promise<PackageTracking[]> => {
    return await executeQuery<PackageTracking>(
      `
        SELECT 
        id, 
        device_id as "deviceId", 
        lat, 
        lng, 
        temperature, 
        humidity, 
        created_at as "createdAt"
        FROM package_tracking 
        WHERE device_id = $1
        ORDER BY created_at DESC
        ${latest ? "LIMIT 1" : ""}
    `,
      [deviceId]
    );
  },
  getAllGroupedByDeviceId: async (): Promise<PackageTrackingGroup[]> => {
    return await executeQuery(
      `
        SELECT 
        device_id as "deviceId",
        json_agg(
            json_build_object(
            'id', id,
            'deviceId', device_id,
            'lat', lat,
            'lng', lng,
            'temperature', temperature,
            'humidity', humidity,
            'createdAt', created_at
            ) ORDER BY created_at DESC
        ) as "readings"
        FROM package_tracking
        GROUP BY device_id
        ORDER BY device_id;
    `
    );
  },
};

export default PackageTrackingModel;
