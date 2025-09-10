export type Profile = {
  id?: number;
  email: string;
  passwordHash: string;
  role?: string;
  companyName?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

export type GetProfileById = { id: NonNullable<Profile["id"]> };

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
  | "cancelled"
  | "out_for_delivery";

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

export type GetPackageDeviceId = { deviceId: NonNullable<Package["deviceId"]> };

export type GetPackages = Pick<Package, "senderId" | "receiverId"> &
  Partial<Pick<Package, "currentCarrierId" | "status">> & { senderAddress: Partial<Address> } & {
    receiverAddress: Partial<Address>;
  };

export type CreatePackagePayload = {
  senderId: Package["senderId"];
  receiverId: Package["receiverId"];
  currentCarrierId: Package["currentCarrierId"];
  deviceId: Package["deviceId"];
  senderAddress: CreateAddress;
  receiverAddress: CreateAddress;
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

// ...existing code...

// Lägg till dessa sensor types baserat på din databas
export type TemperatureSensor = {
  id?: number;
  packageId: number;
  temperature: number;
  createdAt?: string;
};

export type HumiditySensor = {
  id?: number;
  packageId: number;
  humidity: number;
  createdAt?: string;
};

export type LocationSensor = {
  id?: number;
  packageId: number;
  lat: number;
  long: number; // Obs: mockdata använder "lng" i databas men "long" i kod
  createdAt?: string;
};

export type SensorReading = {
  id?: number;
  packageId: number;
  sensorType: 'temperature' | 'humidity' | 'location';
  value: number;
  lat?: number;
  long?: number;
  createdAt?: string;
};

// ...existing code...

export type CreatePackageTracking = Omit<PackageTracking, "id" | "createdAt">;
