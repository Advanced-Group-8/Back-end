import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { BadRequestError } from "@/errors/Error.js";

const temperatureSchema = z.object({
    packageId: z.number().positive("Package ID must be positive"),
    temperature: z.number().min(-50).max(100, "Temperature must be between -50 and 100 degrees C")
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
    createTemperature: async (req: Request, res: Response, next: NextFunction) => {
        try {
            temperatureSchema.parse(req.body);
            
            // TODO: Lägg till business validation
            // await PackageValidator.exists({ id: req.body.packageId });
            
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                return next(new BadRequestError(JSON.stringify(err.errors)));
            }
            return next(err);
        }
    },

    createHumidity: async (req: Request, res: Response, next: NextFunction) => {
        try {
            humiditySchema.parse(req.body);
            
            // TODO: Validera att packageId existerar
            // await PackageValidator.exists({ id: req.body.packageId });
            
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                return next(new BadRequestError(JSON.stringify(err.errors)));
            }
            return next(err);
        }
    },

    createLocation: async (req: Request, res: Response, next: NextFunction) => {
        try {
            locationSchema.parse(req.body);
            
            // TODO: Validera att packageId existerar
            // await PackageValidator.exists({ id: req.body.packageId });
            
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                return next(new BadRequestError(JSON.stringify(err.errors)));
            }
            return next(err);
        }
    }
};

export default SensorValidator;