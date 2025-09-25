import ProfileService from "@/services/ProfileService.js";
import { SignInRequest, SignUpRequest } from "@/types/requestTypes.js";
import { ApiResponse } from "@/types/responseTypes.js";
import { sign } from "@/utils/jwt.js";
import { NextFunction, Response } from "express";

const AuthController = {
  signUp: async (req: SignUpRequest, _res: Response, next: NextFunction) => {
    try {
      const profile = await ProfileService.create(req.body);

      next({
        statusCode: 201,
        token: sign(profile),
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req: SignInRequest, _res: Response, next: NextFunction) => {
    try {
      const profile = await ProfileService.signIn(req.body);

      next({
        statusCode: 200,
        token: sign(profile),
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
