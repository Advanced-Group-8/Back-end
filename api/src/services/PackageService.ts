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
  create: async ({
    senderId,
    receiverId,
    currentCarrierId,
    deviceId,
    senderAddress,
    receiverAddress,
  }: CreatePackagePayload): Promise<Package> => {
    // 1. Create addresses first
    const { id: senderAddressId } = await AddressService.create(senderAddress);
    const { id: receiverAddressId } = await AddressService.create(receiverAddress);

    // 2. Fetch profiles
    const [sender, receiver, currentCarrier] = await Promise.all([
      ProfileService.getProfile({ id: senderId }),
      ProfileService.getProfile({ id: receiverId }),
      ProfileService.getProfile({ id: currentCarrierId }),
    ]);

    // 3. Insert package
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
