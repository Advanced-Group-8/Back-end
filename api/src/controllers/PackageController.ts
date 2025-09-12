import { CreatePackageRequest } from "@/types/requestTypes";
import PackageService from "../services/PackageService";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@/types/responseTypes";
import { extractGetPackagesQuery } from "@/utils/request";

const PackageContoller = {
  get: async (req: Request, _res: Response, next: NextFunction) => {
    const filters = extractGetPackagesQuery(req);

    try {
      const packages = await PackageService.get(filters);

      next({
        statusCode: 200,
        data: packages,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
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
