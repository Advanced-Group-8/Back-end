import { CreatePackageRequest } from "@/types/requestTypes";
import PackageService from "../services/PackageService";
import { Response } from "express";

const PackageContoller = {
  create: async (req: CreatePackageRequest, res: Response) => {
    try {
      const createdPackage = await PackageService.create(req.body);

      return res.status(201).json(createdPackage);
    } catch (error) {
      //   return res.status(500).json({ message: "Server error" }); handle errors in middleware
    }
  },
};

export default PackageContoller;
