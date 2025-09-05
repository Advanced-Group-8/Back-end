import { Package } from "@/src/types/types.js";

const PackageModel = {
  getOneByPackageId: async (packageId: number) => {
    //run sql
  },
  getMany: async () => {},
  create: async (packageData: Package) => {
    //create package query (inster data row)
  },
};

export default PackageModel;
