import PackageService from "@/services/PackageService.js";
import { Package } from "@/types/types.js";
import { Request, Response } from "express";

type PackageRequest = Request<{}, {}, Package>;

const PackageContoller = {
  create: async (req: PackageRequest, res: Response) => {
    try {
      const packageData: Package = req.body;

      const createdPackage = await PackageService.create(packageData);

      return res.status(201).json(createdPackage);
    } catch (error) {
      //   return res.status(500).json({ message: "Server error" }); handle errors in middleware
    }
  },
};

export default PackageContoller;
