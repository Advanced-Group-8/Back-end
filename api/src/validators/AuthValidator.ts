import { signInSchema, signUpSchmea } from "@/schemas/validation/authValidationSchemas.js";
import { NextFunction, Request, Response } from "express";

const AuthValidator = {
  signUp: {
    body: async (req: Request, _res: Response, next: NextFunction) => {
      try {
        signUpSchmea.parse(req.body);
        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
  signIn: {
    body: async (req: Request, _res: Response, next: NextFunction) => {
      try {
        signInSchema.parse(req.body);
        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
};

export default AuthValidator;
