import { Request, Response, NextFunction } from "express";
import { z } from "zod";


const temperatureSchema = z.object({
    packageId: z.number().positive("Package ID must be positive"),
    temperature: z.number().min(-50).max(100, "Temperature must be between -50 and 100 degeres C")
});

const humiditySchema = z.object({
    packageId: z.number().positive("Package ID must be positive"),
    humidity: z.number().min(0).max(100, "Humidity must be between 0 and 100")
});

const locationSchema = z.object({
    packageId: z.number().positive("Package ID must be positive"),
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    long: z.number().min(-180).max(180, "Longitude must be between -180 and 180")
});

const SensorValidator = {
    createTemperature: (req: Request, res: Response, next: NextFunction) => {
        try {
            temperatureSchema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Temperature validation error",
                error: error instanceof z.ZodError ? error.errors : []
            });
        }
    },

    createHumidity: (req: Request, res: Response, next: NextFunction) => {
        try {
            humiditySchema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Humidity validation error",
                errors: error instanceof z.ZodError ? error.errors : []
            });
        }
    },

    createLocation: (req: Request, res: Response, next: NextFunction) => {
        try {
            locationSchema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Location validation error",
                errors: error instanceof z.ZodError ? error.errors : []
            });
        }
    },

};

export default SensorValidator;





