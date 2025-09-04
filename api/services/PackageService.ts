import PackageModel from "@/models/PackageModel.js";
import { Package } from "@/types/types.js";

const PackageService = {
  create: async (packageData: Package) => {
    //PackageModel.create(packageData)
    //call other services when package should be created
  },
};

export default PackageService;
