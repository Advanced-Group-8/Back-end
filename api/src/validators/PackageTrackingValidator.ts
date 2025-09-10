import { BadRequestError } from "@/errors/Error";
import { CreatePackageTrackingRequest } from "@/types/requestTypes";
import { NextFunction } from "express";
import { ZodError } from "zod";
import PackageValidator from "./PackageValidator";
import { createPackageTrackingSchema } from "@/schemas/validation/packageTrackingValidationSchemas";

const PackageTrackingValidator = {
  create: {
    body: async (req: CreatePackageTrackingRequest, _res: Response, next: NextFunction) => {
      const payload = req.body;

      try {
        createPackageTrackingSchema.parse(payload);

        await PackageValidator.hasDeviceId({ deviceId: payload.deviceId });

        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          return next(new BadRequestError(JSON.stringify(err.errors)));
        }

        return next(err);
      }
    },
  },
};

export default PackageTrackingValidator;
