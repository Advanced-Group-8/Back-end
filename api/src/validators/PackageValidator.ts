import z, { ZodError, ZodIssueCode } from "zod";
import { NextFunction, Response } from "express";
import { BadRequestError, NotFoundError } from "@/errors/Error";
import { CreatePackageRequest } from "@/types/requestTypes";
import ProfileValidator from "./ProfileValidator";
import { GetPackageDeviceId } from "@/types/types";
import PackageService from "@/services/PackageService";

const createPackageSchema = z
  .object({
    senderId: z
      .number({ message: "'senderId' is required and must be a positive number" })
      .positive({ message: "'senderId' is required and must be a positive number" }),
    receiverId: z
      .number({ message: "'receiverId' is required and must be a positive number" })
      .positive({ message: "'receiverId' is required and must be a positive number" }),
    currentCarrierId: z
      .number({ message: "'currentCarrierId' is required and must be a positive number" })
      .positive({ message: "'currentCarrierId' is required and must be a positive number" }),
    deviceId: z
      .string({ message: "'deviceId' is required and cannot be empty" })
      .nonempty({ message: "'deviceId' is required and cannot be empty" }),
    senderAddress: z.object({
      street: z
        .string({ message: "'senderAddress.street' is required and cannot be empty" })
        .nonempty({ message: "'senderAddress.street' is required and cannot be empty" }),
      city: z
        .string({ message: "'senderAddress.city' is required and cannot be empty" })
        .nonempty({ message: "'senderAddress.city' is required and cannot be empty" }),
      postalCode: z
        .string({ message: "'senderAddress.postalCode' is required and cannot be empty" })
        .nonempty({ message: "'senderAddress.postalCode' is required and cannot be empty" }),
      country: z
        .string({ message: "'senderAddress.country' is required and cannot be empty" })
        .nonempty({ message: "'senderAddress.country' is required and cannot be empty" }),
    }),
    receiverAddress: z.object({
      street: z
        .string({ message: "'receiverAddress.street' is required and cannot be empty" })
        .nonempty({ message: "'receiverAddress.street' is required and cannot be empty" }),
      city: z
        .string({ message: "'receiverAddress.city' is required and cannot be empty" })
        .nonempty({ message: "'receiverAddress.city' is required and cannot be empty" }),
      postalCode: z
        .string({ message: "'receiverAddress.postalCode' is required and cannot be empty" })
        .nonempty({ message: "'receiverAddress.postalCode' is required and cannot be empty" }),
      country: z
        .string({ message: "'receiverAddress.country' is required and cannot be empty" })
        .nonempty({ message: "'receiverAddress.country' is required and cannot be empty" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.senderId === data.receiverId) {
      ctx.addIssue({
        path: ["receiverId"],
        code: ZodIssueCode.custom,
        message: "'senderId' cannot be the same as 'receiverId'",
      });
    }
    if (data.receiverId === data.currentCarrierId) {
      ctx.addIssue({
        path: ["receiverId"],
        code: ZodIssueCode.custom,
        message: "'receiverId' cannot be the same as 'currentCarrierId'",
      });
    }
  });

const PackageValidator = {
  create: {
    body: async (req: CreatePackageRequest, _res: Response, next: NextFunction) => {
      const payload = req.body;

      try {
        createPackageSchema.parse(payload);

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
