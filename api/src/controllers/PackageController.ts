import {
  CreatePackageRequest,
  GetPackageByDeviceIdRequest,
  GetPackageByIdRequest,
  GetPackagesRequest,
} from "@/types/requestTypes";
import PackageService from "../services/PackageService";
import { NextFunction, Response } from "express";
import { ApiResponse } from "@/types/responseTypes";
import { extractGetPackagesQuery, extractPackageFilter } from "@/utils/request";

const PackageContoller = {
  get: async (req: GetPackagesRequest, _res: Response, next: NextFunction) => {
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
  getById: async (req: GetPackageByIdRequest, _res: Response, next: NextFunction) => {
    const { id } = req.params;
    const filters = extractPackageFilter(req);

    try {
      const foundPackage = await PackageService.getById({ ...filters, id });

      next({
        statusCode: 200,
        data: foundPackage,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  getByDeviceId: async (req: GetPackageByDeviceIdRequest, _res: Response, next: NextFunction) => {
    const { deviceId } = req.params;
    const filters = extractPackageFilter(req);

    console.log("filters", filters);

    try {
      const foundPackage = await PackageService.getByDeviceId({ ...filters, deviceId });

      next({
        statusCode: 200,
        data: foundPackage,
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
