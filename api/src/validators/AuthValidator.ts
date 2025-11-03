import { signInSchema, signUpSchema } from "@/schemas/validation/authValidationSchemas.js";
import { NextFunction, Request, Response } from "express";

const AuthValidator = {
  signUp: {
    body: (req: Request, _res: Response, next: NextFunction) => {
      try {
        signUpSchema.parse(req.body);
        next();
      } catch (err: unknown) {
        return next(err);
      }
    },
  },
  signIn: {
    body: (req: Request, _res: Response, next: NextFunction) => {
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
