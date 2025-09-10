import z, { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@/errors/Error";

const createPackageSchema = z.object({
  senderId: z
    .number({ message: "'senderId' is required and must be a postive number" })
    .positive({ message: "'senderId' is required and must be a postive number" }),
  receiverId: z
    .number({ message: "'receiverId' is required and must be a postive number" })
    .positive({ message: "'receiverId' is required and must be a postive number" }),
  currentCarrierId: z
    .number({ message: "'currentCarrierId' is required and must be a postive number" })
    .positive({ message: "'currentCarrierId' is required and must be a postive number" }),
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
});

const PackageValidator = {
  create: {
    body: async (req: Request, _res: Response, next: NextFunction) => {
      try {
        createPackageSchema.parse(req.body);
        next();
      } catch (err: unknown) {
        if (err instanceof ZodError) {
          return next(new BadRequestError(err.errors.map((e) => e.message).join(", ")));
        }
      }
    },
  },
};

export default PackageValidator;
