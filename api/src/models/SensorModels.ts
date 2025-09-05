import { TemperatureSensor, HumiditySensor, LocationSensor } from "@/src/types/types.js"
import { date } from "zod/v4";

const SensorModel = {
    createTemperature: async (temperatureData: TemperatureSensor): Promise<TemperatureSensor> => {
        // Att göra: Implementera SQL
        // const result = await sql`
        //    INSERT INTO temperature (package_id, temperature)
        //    VALUES (${temperatureData.packageId}, ${temperatureData.temperature})
        //    RETURNING *
        // `;
        // return result [0];
        
        return { ...temperatureData, id: 1, createdAt: new Date().toISOString() };
    },

    getTemperatureByPackage: async (packageId: number): Promise<TemperatureSensor[]> => {
         // TODO: Implement SQL query
        // const result = await sql`
        //   SELECT * FROM temperature 
        //   WHERE package_id = ${packageId}
        //   ORDER BY created_at DESC
        // `;
        // return result;

        return [
            {id: 1, packageId, temperature: 2.5, createdAt: new Date().toISOString() },
            {id: 1, packageId, temperature: 2.8, createdAt: new Date().toISOString() }
        ];
    },

    getLatestTemperature: async (packageId: number): Promise<TemperatureSensor | null> => {
        // TODO: Implement SQL query
        // const result = await sql`
        //   SELECT * FROM temperature 
        //   WHERE package_id = ${packageId}
        //   ORDER BY created_at DESC
        //   LIMIT 1
        // `;
        // return result[0] || null;

        return {id: 1, packageId, temperature: 2.5, createdAt: new Date().toISOString() };
    },

    createHumidity: async (humidityData: HumiditySensor): Promise<HumiditySensor> => {
        // TODO: Implement SQL insert

        return { ...humidityData, id: 1, createdAt: new Date().toISOString() };
    },

    getHumidityByPackage: async (packageId: number): Promise<HumiditySensor[]> => {
        // TODO: Implement SQL query
        return [
            { id: 1, packageId, humidity: 45.2, createdAt: new Date().toISOString() },
            { id: 2, packageId, humidity: 47.8, createdAt: new Date().toISOString() }
        ];
    },

    getlatestHumidity: async (packageId: number): Promise<HumiditySensor | null> => {
        //TODO: Implement SQL query
        
        return { id: 1, packageId, humidity: 45.2, createdAt: new Date().toISOString() };
    },

    createLocation: async (locationData: LocationSensor): Promise<LocationSensor> => {
        //TODO: Implement SQL insert

        return { ...locationData, id: 1, createdAt: new Date().toISOString() };
    },

    getLocationByPackage: async (packageId: number): Promise<LocationSensor[]> => {
        //TODO: Implement SQL query

        return [
            { id:1, packageId, lat: 59.334591, long: 18.063240, createdAt: new Date().toISOString() },
            { id:2, packageId, lat: 58.167891, long: 19.496735, createdAt: new Date().toISOString() }
        ];
    },

    getLatestLocation: async (packageId: number): Promise<LocationSensor | null> => {
        // TODO: Implement SQL query

        return { id: 1, packageId, lat: 59.334591, long: 18.063240, createdAt: new Date().toISOString() };
    }
};

export default SensorModel;