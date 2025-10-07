import z, { ZodIssueCode } from "zod";

export const createPackageBodySchema = z
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
      .number({ message: "'deviceId' is required and must be a positive number" })
      .positive({ message: "'deviceId' is required and must be a positive number" }),
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

export const getPackagesQuerySchema = z.object({
  senderId: z
    .string({ message: "'senderId' is required" })
    .nonempty({ message: "'senderId' cannot be empty" })
    .transform(Number),
  receiverId: z
    .string({ message: "'receiverId' is required" })
    .nonempty({ message: "'receiverId' cannot be empty" })
    .transform(Number),
  currentCarrierId: z
    .string({ message: "'currentCarrierId' must be a string if provided" })
    .optional()
    .transform((val) => (val !== undefined ? Number(val) : undefined)),
  status: z.string({ message: "'status' must be a string if provided" }).optional(),
  senderAddress: z
    .object({
      street: z
        .string({ message: "'senderAddress.street' must be a string if provided" })
        .optional(),
      city: z.string({ message: "'senderAddress.city' must be a string if provided" }).optional(),
      postalCode: z
        .string({ message: "'senderAddress.postalCode' must be a string if provided" })
        .optional(),
      country: z
        .string({ message: "'senderAddress.country' must be a string if provided" })
        .optional(),
    })
    .optional(),
  receiverAddress: z
    .object({
      street: z
        .string({ message: "'receiverAddress.street' must be a string if provided" })
        .optional(),
      city: z.string({ message: "'receiverAddress.city' must be a string if provided" }).optional(),
      postalCode: z
        .string({ message: "'receiverAddress.postalCode' must be a string if provided" })
        .optional(),
      country: z
        .string({ message: "'receiverAddress.country' must be a string if provided" })
        .optional(),
    })
    .optional(),
});

export const getPackageByIdParamsSchema = z.object({
  id: z
    .string({ message: "'id' is required" })
    .nonempty({ message: "'id' is required" })
    .transform(Number),
});

export const getPackageByDeviceIdParamsSchema = z.object({
  deviceId: z
    .string({ message: "'device' is required" })
    .nonempty({ message: "'device' is required" })
    .transform(Number),
});
