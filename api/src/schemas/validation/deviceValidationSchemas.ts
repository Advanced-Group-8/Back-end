import z from "zod";

export const getDeviceByIdParamsSchema = z.object({
  id: z
    .string({ message: "'id' is required" })
    .nonempty({ message: "'id' is required" })
    .transform(Number),
});
