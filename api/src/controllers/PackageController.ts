import { CreatePackageRequest } from "@/types/requestTypes";
import PackageService from "../services/PackageService";
import { NextFunction, Response } from "express";
import { ApiResponse, Package } from "@/types/responseTypes";

const PackageContoller = {
  create: async (req: CreatePackageRequest, _res: Response, next: NextFunction) => {
    const payload = req.body;

    try {
      const createdPackage = await PackageService.create(payload);

      next({
        statusCode: 201,
        message: "Package created successfully",
        data: createdPackage,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
};

export default PackageContoller;
