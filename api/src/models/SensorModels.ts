import { TemperatureSensor, HumiditySensor, LocationSensor } from "@/src/types/types.js";
import { executeQuery } from "@/src/utils/index.js";

const SensorModel = {
    // TEMPERATURE METHODS
    createTemperature: async (temperatureData: TemperatureSensor): Promise<TemperatureSensor> => {
        try {
            const query = `
                INSERT INTO temperature (package_id, temperature)
                VALUES ($1, $2)
                RETURNING id, package_id as "packageId", temperature, created_at as "createdAt"
            `;
            const values = [temperatureData.packageId, temperatureData.temperature];
            const result = await executeQuery(query, values);
            return result[0] as TemperatureSensor;
        } catch (error) {
            throw error;
        }
    },

    getTemperatureByPackage: async (packageId: number): Promise<TemperatureSensor[]> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    temperature, 
                    created_at as "createdAt"
                FROM temperature 
                WHERE package_id = $1
                ORDER BY created_at DESC
            `;
            const result = await executeQuery(query, [packageId]);
            return result as TemperatureSensor[];
        } catch (error) {
            throw error;
        }
    },

    getLatestTemperature: async (packageId: number): Promise<TemperatureSensor | null> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    temperature, 
                    created_at as "createdAt"
                FROM temperature 
                WHERE package_id = $1
                ORDER BY created_at DESC
                LIMIT 1
            `;
            const result = await executeQuery(query, [packageId]);
            return result[0] as TemperatureSensor || null;
        } catch (error) {
            throw error;
        }
    },

    // HUMIDITY METHODS
    createHumidity: async (humidityData: HumiditySensor): Promise<HumiditySensor> => {
        try {
            const query = `
                INSERT INTO humidity (package_id, humidity)
                VALUES ($1, $2)
                RETURNING id, package_id as "packageId", humidity, created_at as "createdAt"
            `;
            const values = [humidityData.packageId, humidityData.humidity];
            const result = await executeQuery(query, values);
            return result[0] as HumiditySensor;
        } catch (error) {
            throw error;
        }
    },

    getHumidityByPackage: async (packageId: number): Promise<HumiditySensor[]> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    humidity, 
                    created_at as "createdAt"
                FROM humidity 
                WHERE package_id = $1
                ORDER BY created_at DESC
            `;
            const result = await executeQuery(query, [packageId]);
            return result as HumiditySensor[];
        } catch (error) {
            throw error;
        }
    },

    getLatestHumidity: async (packageId: number): Promise<HumiditySensor | null> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    humidity, 
                    created_at as "createdAt"
                FROM humidity 
                WHERE package_id = $1
                ORDER BY created_at DESC
                LIMIT 1
            `;
            const result = await executeQuery(query, [packageId]);
            return result[0] as HumiditySensor || null;
        } catch (error) {
            throw error;
        }
    },

    // LOCATION METHODS
    createLocation: async (locationData: LocationSensor): Promise<LocationSensor> => {
        try {
            const query = `
                INSERT INTO location (package_id, lat, lng)
                VALUES ($1, $2, $3)
                RETURNING id, package_id as "packageId", lat, lng as "long", created_at as "createdAt"
            `;
            const values = [locationData.packageId, locationData.lat, locationData.long];
            const result = await executeQuery(query, values);
            return result[0] as LocationSensor;
        } catch (error) {
            throw error;
        }
    },

    getLocationByPackage: async (packageId: number): Promise<LocationSensor[]> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    lat, 
                    lng as "long", 
                    created_at as "createdAt"
                FROM location 
                WHERE package_id = $1
                ORDER BY created_at DESC
            `;
            const result = await executeQuery(query, [packageId]);
            return result as LocationSensor[];
        } catch (error) {
            throw error;
        }
    },

    getLatestLocation: async (packageId: number): Promise<LocationSensor | null> => {
        try {
            const query = `
                SELECT 
                    id, 
                    package_id as "packageId", 
                    lat, 
                    lng as "long", 
                    created_at as "createdAt"
                FROM location 
                WHERE package_id = $1
                ORDER BY created_at DESC
                LIMIT 1
            `;
            const result = await executeQuery(query, [packageId]);
            return result[0] as LocationSensor || null;
        } catch (error) {
            throw error;
        }
    },

    // COMBINED SENSOR DATA
    getAllSensorDataByPackage: async (packageId: number) => {
        try {
            const [temperature, humidity, location] = await Promise.all([
                SensorModel.getLatestTemperature(packageId),
                SensorModel.getLatestHumidity(packageId),
                SensorModel.getLatestLocation(packageId)
            ]);

            return {
                temperature,
                humidity,
                location,
                packageId
            };
        } catch (error) {
            throw error;
        }
    }
};

export default SensorModel;