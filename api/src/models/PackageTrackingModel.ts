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
    },

    getAllGroupedByDeviceId: async (): Promise<{ deviceId: string, data: PackageTracking[] }[]> => {
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
            ORDER BY device_id, created_at DESC
        `;
        const result = await executeQuery<PackageTracking>(query);

        // Gruppera på deviceId
        const grouped: Record<string, PackageTracking[]> = {};
        for (const row of result) {
            if (!grouped[row.deviceId]) grouped[row.deviceId] = [];
            grouped[row.deviceId].push(row);
        }
        // Returnera som array av objekt
        return Object.entries(grouped).map(([deviceId, data]) => ({ deviceId, data }));
    }
};

export default PackageTrackingModel;