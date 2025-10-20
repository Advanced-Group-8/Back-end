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
        message: "Account created successfully",
        statusCode: 201,
        token: sign(profile),
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req: SignInRequest, res: Response, next: NextFunction) => {
    try {
      const profile = await ProfileService.signIn(req.body);

        const token = sign(profile); // generate JWT

      res
        .cookie("token", sign(profile), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        .status(200)
        .json({ message: "Login successful" }) as ApiResponse;
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
