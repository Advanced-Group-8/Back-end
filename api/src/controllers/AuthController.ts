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
  getMe: async (req: SignInRequest, _res: Response, next: NextFunction) => {
    try {
      // req.user kommer från AuthMiddleware.authenticate
      const user = req.user;
      // Om user har JWT payload, hämta id
      const userId = typeof user === "object" && user && "id" in user ? user.id as number : undefined;
      if (!userId) {
        return next({ statusCode: 401, message: "User not authenticated" });
      }
      const profile = await ProfileService.getProfile({ id: userId });
      next({ statusCode: 200, data: profile });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
