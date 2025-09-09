export type Profile = {
  id?: number;
  email: string;
  passwordHash: string;
  role?: string;
  companyName?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

export type Address = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CreateAddress = Omit<Address, "id">;

export type PackageStatus =
  | "pending" // Package created but not yet shipped
  | "in_transit" // Package is on its way
  | "delivered" // Package delivered to recipient
  | "cancelled";

export type Package = {
  id?: number;
  senderId: number; // FK → Profile.id
  receiverId: number; // FK → Profile.id
  senderAddressId: number; // FK → Address.id
  receiverAddressId: number; // FK → Address.id
  currentCarrierId: number;
  deviceId: string;
  status?: PackageStatus;
  trackingCode?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  eta?: string; // ISO timestamp
  readings?: PackageTracking[];
};

export type CreatePackage = Omit<Package, "id" | "createdAt" | "updatedAt">;

export type GetPackageById = { id: NonNullable<Package["id"]> };

export type GetPackages = Pick<Package, "senderId" | "receiverId"> &
  Partial<Pick<Package, "currentCarrierId" | "status">> & { senderAddress: Partial<Address> } & {
    receiverAddress: Partial<Address>;
  };

export type CreatePackagePayload = {
  senderAddress: CreateAddress;
  receiverAddress: CreateAddress;
  packageInfo: Pick<
    CreatePackage,
    "receiverId" | "senderId" | "currentCarrierId" | "deviceId" | "trackingCode" | "eta"
  >;
};

export type ContactInfo = {
  id?: number;
  profileId: number;
  phone?: string;
  address?: string;
};

export type PackageTracking = {
  id: number;
  deviceId: string;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  createdAt: string;
};

export type CreatePackageTracking = Omit<PackageTracking, "id" | "createdAt">;
