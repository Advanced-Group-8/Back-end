import { NextFunction, Response } from "express";
import { NotFoundError } from "@/errors/Error.js";
import {
  CreatePackageRequest,
  GetPackageByDeviceIdRequest,
  GetPackageByIdRequest,
  GetPackagesRequest,
} from "@/types/requestTypes.js";
import ProfileValidator from "./ProfileValidator.js";
import { GetPackageById, GetPackageByDeviceId } from "@/types/types.js";
import PackageService from "@/services/PackageService.js";
import {
  createPackageBodySchema,
  getPackageByDeviceIdParamsSchema,
  getPackageByIdParamsSchema,
  getPackagesQuerySchema,
} from "@/schemas/validation/packageValidationSchemas.js";

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
        const transformedId = getPackageByIdParamsSchema.parse(payload).id;

        if (isNaN(transformedId)) {
          throw new NotFoundError(`No package with id '${transformedId}' found`);
        }

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
        const transformedId = getPackageByDeviceIdParamsSchema.parse(payload).deviceId;

        if (isNaN(transformedId)) {
          throw new NotFoundError(`No device with id '${transformedId}' found`);
        }

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
