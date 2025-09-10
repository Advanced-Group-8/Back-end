import { CreatePackageRequest } from "@/types/requestTypes";
import PackageService from "../services/PackageService";
import { Package, CreatePackagePayload } from "../types/types";
import { Request, Response } from "express";

type PackageRequest = Request<{}, {}, CreatePackagePayload>;

const PackageContoller = {
  create: async (req: CreatePackageRequest, res: Response) => {
    try {
      const packageData: CreatePackagePayload = req.body;

      const createdPackage = await PackageService.create(packageData);

      return res.status(201).json(createdPackage);
    } catch (error) {
      //   return res.status(500).json({ message: "Server error" }); handle errors in middleware
    }
  },
};

export default PackageContoller;
