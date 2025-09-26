import z from "zod";

export const signUpSchmea = z.object({
  email: z.string().email("Invalid email"),
  name: z
    .string()
    .min(3, "'name' must be atleast three characters long")
    .max(50, "'name' cannot be longer than 50 characters long"),
  password: z
    .string()
    .min(6, "'password' must be atleast six characters long")
    .max(50, "'password' cannot be longer than 50 characters long"),
  role: z
    .string()
    .min(3, "'role' must be atleast three characters long")
    .max(50, "'role' cannot be longer than 50 characters long"),
  companyName: z
    .string()
    .min(3, "'password' must be atleast three characters long")
    .max(50, "'companyName' cannot be longer than 50 characters long"),
});

export const signInSchema = z
  .object({
    email: z.string().email("Invalid email").optional(),
    name: z
      .string()
      .min(3, "'name' must be at least three characters long")
      .max(50, "'name' cannot be longer than 50 characters long")
      .optional(),
    password: z
      .string()
      .min(6, "'password' must be at least six characters long")
      .max(50, "'password' cannot be longer than 50 characters long"),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.name) {
      ctx.addIssue({
        code: "custom",
        message: "Either 'email' or 'name' is required",
        path: ["email"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Either 'email' or 'name' is required",
        path: ["name"],
      });
    }
  });
