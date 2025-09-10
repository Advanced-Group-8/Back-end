import z, { ZodError, ZodIssueCode } from "zod";
import { NextFunction, Response } from "express";
import { BadRequestError, NotFoundError } from "@/errors/Error";
import { CreatePackageRequest, GetPackagesRequest } from "@/types/requestTypes";
import ProfileValidator from "./ProfileValidator";
import { GetPackageDeviceId } from "@/types/types";
import PackageService from "@/services/PackageService";
import {
  createPackageBodySchema,
  getPackagesQuerySchema,
} from "@/schemas/validation/packageValidationSchemas";

const PackageValidator = {
  create: {
    body: async (req: CreatePackageRequest, _res: Response, next: NextFunction) => {
      const payload = req.body;

      try {
        createPackageBodySchema.parse(payload);

        await Promise.all([
          ProfileValidator.exists({ id: payload.senderId, role: "sender" }),
          ProfileValidator.exists({ id: payload.receiverId, role: "receiver" }),
          ProfileValidator.exists({ id: payload.currentCarrierId, role: "carrier" }),
        ]);

        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          return next(new BadRequestError(JSON.stringify(err.errors)));
        }

        return next(err);
      }
    },
  },
  get: {
    query: async (req: GetPackagesRequest, _res: Response, next: NextFunction) => {
      const payload = req.query;

      try {
        getPackagesQuerySchema.parse(payload);

        await Promise.all([
          ProfileValidator.exists({ id: payload.senderId, role: "sender" }),
          ProfileValidator.exists({ id: payload.receiverId, role: "receiver" }),
          ProfileValidator.exists({ id: payload.currentCarrierId, role: "carrier" }),
        ]);

        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          return next(new BadRequestError(JSON.stringify(err.errors)));
        }

        return next(err);
      }
    },
  },
  hasDeviceId: async ({ deviceId }: GetPackageDeviceId) => {
    const packageId = (await PackageService.getByDeviceId({ deviceId })).id;

    if (!packageId) {
      throw new NotFoundError(`No package with deviceId '${deviceId}' found`);
    }

    return packageId;
  },
};

export default PackageValidator;
