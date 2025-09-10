import z from "zod";

export const createPackageTrackingSchema = z.object({
  deviceId: z
    .string({ message: "'deviceId' is required and cannot be empty" })
    .nonempty({ message: "'deviceId' is required and cannot be empty" }),
  lat: z
    .number({ message: "'lat' is required and must be a number" })
    .refine((val) => val >= -90 && val <= 90, { message: "'lat' must be between -90 and 90" }),
  lng: z
    .number({ message: "'lng' is required and must be a number" })
    .refine((val) => val >= -180 && val <= 180, { message: "'lng' must be between -180 and 180" }),
  temperature: z
    .number({ message: "'temperature' is required and must be a number" })
    .refine((val) => val >= -50 && val <= 100, {
      message: "'temperature' must be realistic in °C",
    }),
  humidity: z
    .number({ message: "'humidity' is required and must be a number" })
    .refine((val) => val >= 0 && val <= 100, { message: "'humidity' must be between 0 and 100" }),
});
