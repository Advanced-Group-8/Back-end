import PackageModel from "@/src/models/PackageModel.js";
import {
  CreatePackagePayload,
  GetPackagesWithFilter,
  GetPackageByIdWithFilter,
  GetPackageByDeviceIdWithFilter,
} from "@/src/types/types.js";
import { executeQuery, getRandomETA, getRandomTrackingCode, omit } from "@/utils";
import AddressService from "./AddressService";
import { Package } from "@/types/responseTypes";
import ProfileService from "./ProfileService";
import { pool } from "@/db/config";

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

    // 4. Return full package object
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
  },
};

export default PackageService;
