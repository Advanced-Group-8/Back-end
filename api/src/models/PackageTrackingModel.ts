import { PackageTracking } from "@/src/types/httpPayloadTypes.js";
import { executeQuery } from "@/src/utils/index.js";

const PackageTrackingModel = {
    create: async (trackingData: PackageTracking): Promise<PackageTracking> => {
        try {
            const query = `
                INSERT INTO package_tracking (device_id, lat, lng, temperature, humidity)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, device_id as "deviceId", lat, lng, temperature, humidity, created_at as "createdAt"
            `;
            const values = [
                trackingData.deviceId,
                trackingData.lat,
                trackingData.lng,
                trackingData.temperature,
                trackingData.humidity
            ];
            const result = await executeQuery(query, values);
            return result[0] as PackageTracking;
        } catch (error) {
            throw error;
        }
    },

    getByDevice: async (deviceId: string): Promise<PackageTracking[]> => {
        try {
            const query = `
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
            `;
            const result = await executeQuery(query, [deviceId]);
            return result as PackageTracking[];
        } catch (error) {
            throw error;
        }
    },

    getLatest: async (deviceId: string): Promise<PackageTracking | null> => {
        try {
            const query = `
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
                LIMIT 1
            `;
            const result = await executeQuery(query, [deviceId]);
            return (result[0] as PackageTracking) || null;
        } catch (error) {
            throw error;
        }
    }
};

export default PackageTrackingModel;