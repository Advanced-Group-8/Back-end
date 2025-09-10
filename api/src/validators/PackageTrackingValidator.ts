import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { BadRequestError } from "@/errors/Error.js";

const trackingSchema = z.object({
    deviceId: z.string().min(1, "Device ID is required"),
    lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    lng: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
    temperature: z.number().min(-50).max(100, "Temperature must be realistic"),
    humidity: z.number().min(0).max(100, "Humidity must be between 0-100%")
});

const PackageTrackingValidator = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            trackingSchema.parse(req.body);
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                return next(new BadRequestError(JSON.stringify(err.errors)));
            }
            return next(err);
        }
    }
};

export default PackageTrackingValidator;