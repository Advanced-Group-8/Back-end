import PackageTrackingModel from "@/src/models/PackageTrackingModel.js";
import { PackageTracking } from "@/src/types/httpPayloadTypes.js";

const PackageTrackingService = {
    create: async (trackingData: PackageTracking): Promise<PackageTracking> => {
        try {
            return await PackageTrackingModel.create(trackingData);
        } catch (error) {
            throw error;
        }
    },

    getByDevice: async (deviceId: string): Promise<PackageTracking[]> => {
        try {
            return await PackageTrackingModel.getByDevice(deviceId);
        } catch (error) {
            throw error;
        }
    },

    getLatest: async (deviceId: string): Promise<PackageTracking | null> => {
        try {
            return await PackageTrackingModel.getLatest(deviceId);
        } catch (error) {
            throw error;
        }
    },

    getAllGroupedByDeviceId: async (): Promise<{ deviceId: string; data: PackageTracking[]; }[]> => {
        return await PackageTrackingModel.getAllGroupedByDeviceId();
    }
};

export default PackageTrackingService;