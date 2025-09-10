import SensorService from "@/src/services/SensorService.js";
import { TemperatureSensor, HumiditySensor, LocationSensor } from "@/src/types/types.js"; // Lägg till detta
import { Request, Response, NextFunction } from "express";

const SensorController = {
    // Temperature endpoints
    createTemperature: async (req: Request<{}, {}, TemperatureSensor>, res: Response, next: NextFunction) => {
        try {
            const temperatureData = req.body;
            const result = await SensorService.createTemperature(temperatureData);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    getTemperatureHistory: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getTemperatureHistory(packageId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getLatestTemperature: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getLatestTemperature(packageId);
            
            if (!result) {
                return res.status(404).json({ message: "No temperature data found for this package" });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    // Humidity endpoints
    createHumidity: async (req: Request<{}, {}, HumiditySensor>, res: Response, next: NextFunction) => {
        try {
            const humidityData = req.body;
            const result = await SensorService.createHumidity(humidityData);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    getHumidityHistory: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getHumidityHistory(packageId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getLatestHumidity: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getLatestHumidity(packageId);
            
            if (!result) {
                return res.status(404).json({ message: "No humidity data found for this package" });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    // Location endpoints
    createLocation: async (req: Request<{}, {}, LocationSensor>, res: Response, next: NextFunction) => {
        try {
            const locationData = req.body;
            const result = await SensorService.createLocation(locationData);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    getLocationHistory: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getLocationHistory(packageId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getLatestLocation: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getLatestLocation(packageId);
            
            if (!result) {
                return res.status(404).json({ message: "No location data found for this package" });
            }
            
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    // Combined sensor data
    getAllSensorData: async (req: Request<{ packageId: string }>, res: Response, next: NextFunction) => {
        try {
            const packageId = parseInt(req.params.packageId);
            const result = await SensorService.getAllSensorData(packageId);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
};

export default SensorController;