import {
  AddressTable,
  DeviceTable,
  PackageTable,
  PackageTrackingTable,
  ProfileTable,
} from "./dbTablesTypes.js";

export type GetProfileById = { id: NonNullable<ProfileTable["id"]> };

export type CreateAddress = Omit<AddressTable, "id">;

export type CreatePackage = Omit<PackageTable, "id" | "createdAt" | "updatedAt">;

export type PackageFilter = {
  limit?: number;
  readingsLimit?: number;
};

export type GetPackageById = { id: NonNullable<PackageTable["id"]>; readingsLimit?: number };

export type GetPackageByIdWithFilter = GetPackageById & PackageFilter;

export type GetPackageByDeviceId = {
  deviceId: NonNullable<PackageTable["deviceId"]>;
};

export type GetDeviceById = {
  id: NonNullable<DeviceTable["id"]>;
};

export type GetPackageByDeviceIdWithFilter = GetPackageByDeviceId & PackageFilter;

export type GetPackages = Pick<PackageTable, "senderId" | "receiverId"> &
  Partial<Pick<PackageTable, "currentCarrierId" | "status">> & {
    senderAddress: Partial<AddressTable>;
  } & {
    receiverAddress: Partial<AddressTable>;
  };

export type GetPackagesWithFilter = GetPackages & PackageFilter;

export type CreatePackagePayload = {
  senderId: PackageTable["senderId"];
  receiverId: PackageTable["receiverId"];
  currentCarrierId: PackageTable["currentCarrierId"];
  deviceId: PackageTable["deviceId"];
  senderAddress: CreateAddress;
  receiverAddress: CreateAddress;
};

export type CreatePackageTracking = Omit<PackageTrackingTable, "id" | "createdAt">;

export type PackageTrackingGroup = {
  deviceId: PackageTrackingTable["deviceId"];
  readings: PackageTrackingTable[];
};

export type GetPackageTrackingByDeviceId = {
  deviceId: NonNullable<PackageTrackingTable["deviceId"]>;
};

export type PackageWithReadings = PackageTable & { readings: PackageTrackingTable[] };

export type PackageUpdateFields = Partial<{
  senderId: number;
  receiverId: number;
  currentCarrierId: number;
  deviceId: string;
  status: string;
  trackingCode: string;
  eta: string;
  senderAddressId: number;
  receiverAddressId: number;
}>;
