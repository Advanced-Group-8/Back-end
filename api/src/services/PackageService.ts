import PackageModel from "@/src/models/PackageModel.js";
import { CreatePackagePayload, GetPackageById, GetPackages } from "@/src/types/types.js";
import { executeQuery, getRandomETA, getRandomTrackingCode } from "@/utils";
import AddressService from "./AddressService";

const PackageService = {
  get: async (payload: GetPackages) => {
    return await PackageModel.get(payload);
  },
  getById: async (payload: GetPackageById) => {
    return await PackageModel.getById(payload);
  },
  create: async ({
    senderId,
    receiverId,
    currentCarrierId,
    deviceId,
    senderAddress,
    receiverAddress,
  }: CreatePackagePayload): Promise<ReturnType<typeof PackageModel.create>> => {
    try {
      await executeQuery("BEGIN;");

      const [{ id: senderAddressId }, { id: receiverAddressId }] = await Promise.all([
        AddressService.create(senderAddress),
        AddressService.create(receiverAddress),
      ]);

      const createdPackage = await PackageModel.create({
        senderId,
        receiverId,
        senderAddressId,
        receiverAddressId,
        currentCarrierId,
        trackingCode: getRandomTrackingCode(),
        deviceId,
        status: "pending",
        eta: getRandomETA(),
      });

      await executeQuery("COMMIT;");

      return createdPackage;
    } catch (err) {
      await executeQuery("ROLLBACK;");
      throw err;
    }
  },
};

export default PackageService;
