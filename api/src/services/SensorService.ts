import SensorModel from "@/src/models/SensorModels.js";
import { TemperatureSensor, HumiditySensor, LocationSensor } from "@/src/types/types.js";

const SensorService = {
    createTemperature: async (temperatureData: TemperatureSensor) => {
        return await SensorModel.createTemperature(temperatureData);
    },

    getTemperatureByPackage: async (packageId: number) => {
        return await SensorModel.getTemperatureByPackage(packageId);
    },

    createHumidity: async (humidityData: HumiditySensor) => {
        return await SensorModel.createHumidity(humidityData);
    },

    getHumidityByPackage: async (packageId: number) => {
        return await SensorModel.getHumidityByPackage(packageId);
    },

    createLocation: async (locationData: LocationSensor) => {
        return await SensorModel.createLocation(locationData);
    },

    getLocationByPackage: async (packageId: number) => {
        return await SensorModel.getLocationByPackage(packageId);
    },

    getAllSensorsByPackage: async (packageId: number) => {
        const [temperature, humidity, location] = await Promise.all([
            SensorModel.getHumidityByPackage(packageId),
            SensorModel.getTemperatureByPackage(packageId),
            SensorModel.getLocationByPackage(packageId)
        ]);

        return {
            temperature,
            humidity,
            location
        };
    },

    getLatestReadings: async (packageId: number) => {
        const [latestTemp, latestHumidity, latestLocation] = await Promise.all([
            SensorModel.getlatestHumidity(packageId),
            SensorModel.getLatestLocation(packageId),
            SensorModel.getLatestTemperature(packageId)
        ]);
    
        return {
            temperature: latestTemp,
            humidity: latestHumidity,
            location: latestLocation
        };
    }
};

export default SensorService;