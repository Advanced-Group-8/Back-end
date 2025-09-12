import PackageModel from "@/src/models/PackageModel.js";
import {
  CreatePackagePayload,
  GetPackageById,
  GetPackageDeviceId,
  GetPackages,
} from "@/src/types/types.js";
import { executeQuery, getRandomETA, getRandomTrackingCode, omit } from "@/utils";
import AddressService from "./AddressService";
import { Package, PackageStatus } from "@/types/responseTypes";
import ProfileService from "./ProfileService";

const PackageService = {
  get: async (payload: GetPackages) => {
    return await PackageModel.get(payload);
  },
  getById: async (payload: GetPackageById) => {
    return await PackageModel.getById(payload);
  },
  getByDeviceId: async ({ deviceId }: GetPackageDeviceId) => {
    return PackageModel.getByDeviceId({ deviceId });
  },
  create: async ({
    senderId,
    receiverId,
    currentCarrierId,
    deviceId,
    senderAddress,
    receiverAddress,
  }: CreatePackagePayload): Promise<Package> => {
    try {
      await executeQuery("BEGIN;");

      const [{ id: senderAddressId }, { id: receiverAddressId }, sender, receiver, currentCarrier] =
        await Promise.all([
          AddressService.create(senderAddress),
          AddressService.create(receiverAddress),
          ProfileService.getProfile({ id: senderId }),
          ProfileService.getProfile({ id: receiverId }),
          ProfileService.getProfile({ id: currentCarrierId }),
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

      return {
        ...omit(createdPackage, [
          "senderId",
          "receiverId",
          "currentCarrierId",
          "senderAddressId",
          "receiverAddressId",
        ]),
        sender,
        receiver,
        currentCarrier,
        senderAddress: { id: senderAddressId, ...senderAddress },
        receiverAddress: { id: receiverAddressId, ...receiverAddress },
        readings: [],
      } as Package;
    } catch (err) {
      await executeQuery("ROLLBACK;");
      throw err;
    }
  },
};

export default PackageService;
