import {
  CreatePackageRequest,
  GetPackageByDeviceIdRequest,
  GetPackageByIdRequest,
  GetPackagesRequest,
  GetPackageByCarrierIdRequest,
} from "@/types/requestTypes.js";
import PackageService from "../services/PackageService.js";
import { NextFunction, Response } from "express";
import { ApiResponse } from "@/types/responseTypes.js";
import {
  extractGetPackagesQuery,
  extractPackageFilter,
} from "@/utils/request.js";

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
  getById: async (
    req: GetPackageByIdRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const numericId = Number(id);
    const filters = extractPackageFilter(req);

    try {
      const foundPackage = await PackageService.getById({
        ...filters,
        id: numericId,
      });

      next({
        statusCode: 200,
        data: foundPackage,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  getByDeviceId: async (
    req: GetPackageByDeviceIdRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const { deviceId } = req.params;
    const numericDeviceId = Number(deviceId);
    const filters = extractPackageFilter(req);

    try {
      const foundPackage = await PackageService.getByDeviceId({
        ...filters,
        deviceId: numericDeviceId,
      });

      next({
        statusCode: 200,
        data: foundPackage,
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  },
  create: async (
    req: CreatePackageRequest,
    _res: Response,
    next: NextFunction
  ) => {
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
  getByCarrierId: async (
    req: GetPackageByCarrierIdRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const carrierId = Number(req.params.carrierId);
      const packages = await PackageService.getByCarrierId(carrierId);
      res.status(200).json({
        statusCode: 200,
        message: "Packages fetched successfully",
        data: packages,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default PackageContoller;
