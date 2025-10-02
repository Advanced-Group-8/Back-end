import { NextFunction, Response } from "express";
import { NotFoundError } from "@/errors/Error.js";
import { GetDeviceByIdRequest } from "@/types/requestTypes.js";
import { GetDeviceById } from "@/types/types.js";
import DeviceService from "@/services/DeviceService.js";
import { getDeviceByIdParamsSchema } from "@/schemas/validation/deviceValidationSchemas.js";

const DeviceValidator = {
  getById: {
    params: async (req: GetDeviceByIdRequest, _res: Response, next: NextFunction) => {
      const payload = req.params;

      try {
        const transformedId = getDeviceByIdParamsSchema.parse(payload).id;

        if (isNaN(transformedId)) {
          throw new NotFoundError(`No device with id '${transformedId}' found`);
        }

        await DeviceValidator.exists({ id: payload.id });

        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
  exists: async (payload: GetDeviceById) => {
    const deviceId = (await DeviceService.getById(payload))?.id;

    if (!deviceId) {
      throw new NotFoundError(`No device with id '${payload.id}' found`);
    }

    return deviceId;
  },
};

export default DeviceValidator;
