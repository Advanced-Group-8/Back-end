import PackageModel from "@/src/models/PackageModel.js";
import {
  CreatePackagePayload,
  GetPackagesWithFilter,
  GetPackageByIdWithFilter,
  GetPackageByDeviceIdWithFilter,
} from "@/src/types/types.js";
import { getRandomETA, getRandomTrackingCode, omit } from "@/utils/index.js";
import AddressService from "./AddressService.js";
import { Address, Package } from "@/types/responseTypes.js";
import ProfileService from "./ProfileService.js";

import { logger } from "@/utils/logger.js";

const PackageService = {
  get: async (payload: GetPackagesWithFilter) => {
    return await PackageModel.get(payload);
  },
  getById: async (payload: GetPackageByIdWithFilter) => {
    return await PackageModel.getById(payload);
  },
  getByDeviceId: async (payload: GetPackageByDeviceIdWithFilter) => {
    return PackageModel.getByDeviceId(payload);
  },
  getByCarrierId: async (carrierId: number) => {
    return await PackageModel.get({ currentCarrierId: carrierId });
  },
  create: async ({
    senderId,
    receiverId,
    currentCarrierId,
    deviceId,
    senderAddress,
    receiverAddress,
  }: CreatePackagePayload): Promise<Package> => {
    const { id: senderAddressId } = await AddressService.create(senderAddress);
    const { id: receiverAddressId } =
      await AddressService.create(receiverAddress);

    const [sender, receiver, currentCarrier] = await Promise.all([
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

    logger.info(
      `Package created with tracking code: `,
      createdPackage.trackingCode
    );

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
      senderAddress: { id: senderAddressId, ...senderAddress } as Address,
      receiverAddress: { id: receiverAddressId, ...receiverAddress } as Address,
      readings: [],
    } as Package;
  },
};

export default PackageService;
