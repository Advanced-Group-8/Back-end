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
  status?: PackageStatus;
  trackingCode?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  eta?: string; // ISO timestamp
};
export type CreatePackge = Omit<Package, "id" | "createdAt" | "updatedAt">;

export type CreateOrder = {
  senderAddress: CreateAddress;
  receiverAddress: CreateAddress;
  packageInfo: Pick<
    CreatePackge,
    "receiverId" | "senderId" | "currentCarrierId" | "trackingCode" | "eta"
  >;
};

export type ContactInfo = {
  id?: number;
  profileId: number; // FK → Profile.id
  phone?: string;
  address?: string;
};

export type LocationSensor = {
  id?: number;
  packageId: number; // FK → Package.id
  lat?: number;
  long?: number;
  createdAt: string; // ISO timestamp
};

export type TemperatureSensor = {
  id?: number;
  packageId: number; // FK → Package.id
  temperature: number;
  createdAt: string; // ISO timestamp
};

export type HumiditySensor = {
  id?: number;
  packageId: number; // FK → Package.id
  humidity: number;
  createdAt: string;
};

export type SensorReading = {
  id?: number;
  packageId: number;
  sensorType: "temperature" | "humidity" | "location";
  value: number;
  lat?: number;
  long?: number;
  createdAt?: string;
};
