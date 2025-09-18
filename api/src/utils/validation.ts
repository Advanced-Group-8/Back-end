import { ZodError } from "zod";

export const buildZodValidationErrors = (err: unknown) => {
  if (err instanceof ZodError) {
    return err.errors.map(({ path, message }) => ({ path, message }));
  }
};