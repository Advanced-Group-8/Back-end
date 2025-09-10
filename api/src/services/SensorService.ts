import SensorModel from "@/src/models/SensorModels.js";
import { TemperatureSensor, HumiditySensor, LocationSensor } from "@/src/types/types.js";

const SensorService = {
    // Temperature services
    createTemperature: async (temperatureData: TemperatureSensor): Promise<TemperatureSensor> => {
        try {
            return await SensorModel.createTemperature(temperatureData);
        } catch (error) {
            throw error;
        }
    },

    getTemperatureHistory: async (packageId: number): Promise<TemperatureSensor[]> => {
        try {
            return await SensorModel.getTemperatureByPackage(packageId);
        } catch (error) {
            throw error;
        }
    },

    getLatestTemperature: async (packageId: number): Promise<TemperatureSensor | null> => {
        try {
            return await SensorModel.getLatestTemperature(packageId);
        } catch (error) {
            throw error;
        }
    },

    // Humidity services
    createHumidity: async (humidityData: HumiditySensor): Promise<HumiditySensor> => {
        try {
            return await SensorModel.createHumidity(humidityData);
        } catch (error) {
            throw error;
        }
    },

    getHumidityHistory: async (packageId: number): Promise<HumiditySensor[]> => {
        try {
            return await SensorModel.getHumidityByPackage(packageId);
        } catch (error) {
            throw error;
        }
    },

    getLatestHumidity: async (packageId: number): Promise<HumiditySensor | null> => {
        try {
            return await SensorModel.getLatestHumidity(packageId);
        } catch (error) {
            throw error;
        }
    },

    // Location services
    createLocation: async (locationData: LocationSensor): Promise<LocationSensor> => {
        try {
            return await SensorModel.createLocation(locationData);
        } catch (error) {
            throw error;
        }
    },

    getLocationHistory: async (packageId: number): Promise<LocationSensor[]> => {
        try {
            return await SensorModel.getLocationByPackage(packageId);
        } catch (error) {
            throw error;
        }
    },

    getLatestLocation: async (packageId: number): Promise<LocationSensor | null> => {
        try {
            return await SensorModel.getLatestLocation(packageId);
        } catch (error) {
            throw error;
        }
    },

    // Combined sensor data
    getAllSensorData: async (packageId: number) => {
        try {
            return await SensorModel.getAllSensorDataByPackage(packageId);
        } catch (error) {
            throw error;
        }
    }
};

export default SensorService;