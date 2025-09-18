import { NextFunction, Response } from "express";
import { NotFoundError } from "@/errors/Error";
import {
  CreatePackageRequest,
  GetPackageByDeviceIdRequest,
  GetPackageByIdRequest,
  GetPackagesRequest,
} from "@/types/requestTypes";
import ProfileValidator from "./ProfileValidator";
import { GetPackageById, GetPackageByDeviceId } from "@/types/types";
import PackageService from "@/services/PackageService";
import {
  createPackageBodySchema,
  getPackageByDeviceIdParamsSchema,
  getPackageByIdParamsSchema,
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
        return next(err);
      }
    },
  },
  getById: {
    params: async (req: GetPackageByIdRequest, _res: Response, next: NextFunction) => {
      const payload = req.params;

      try {
        getPackageByIdParamsSchema.parse(payload);

        await PackageValidator.exists({ id: payload.id });

        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
  getByDeviceId: {
    params: async (req: GetPackageByDeviceIdRequest, _res: Response, next: NextFunction) => {
      const payload = req.params;

      try {
        getPackageByDeviceIdParamsSchema.parse(payload);

        await PackageValidator.hasDeviceId({ deviceId: payload.deviceId });

        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
  exists: async (payload: GetPackageById) => {
    const packageId = (await PackageService.getById(payload))?.id;

    if (!packageId) {
      throw new NotFoundError(`No package with id '${payload.id}' found`);
    }

    return packageId;
  },
  hasDeviceId: async ({ deviceId }: GetPackageByDeviceId) => {
    const packageId = (await PackageService.getByDeviceId({ deviceId }))?.id;

    if (!packageId) {
      throw new NotFoundError(`No package with deviceId '${deviceId}' found`);
    }

    return packageId;
  },
};

export default PackageValidator;
