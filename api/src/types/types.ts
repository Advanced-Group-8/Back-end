import { AddressTable, PackageTable, PackageTrackingTable, ProfileTable } from "./dbTablesTypes";

export type GetProfileById = { id: NonNullable<ProfileTable["id"]> };

export type CreateAddress = Omit<AddressTable, "id">;

export type CreatePackage = Omit<PackageTable, "id" | "createdAt" | "updatedAt">;

export type GetPackageById = { id: NonNullable<PackageTable["id"]> };

export type GetPackageDeviceId = { deviceId: NonNullable<PackageTable["deviceId"]> };

export type GetPackages = Pick<PackageTable, "senderId" | "receiverId"> &
  Partial<Pick<PackageTable, "currentCarrierId" | "status">> & {
    senderAddress: Partial<AddressTable>;
  } & {
    receiverAddress: Partial<AddressTable>;
  };

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
