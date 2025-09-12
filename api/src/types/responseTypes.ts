export type ApiResponse<T = unknown> = {
  statusCode: number;
  message?: string;
  data?: T | T[];
  success?: boolean;
};

export type Profile = {
  id: number;
  email: string;
  name: string;
  role: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Package = {
  id: number;
  sender: Profile;
  receiver: Profile;
  currentCarrier: Profile;
  senderAddress: Address;
  receiverAddress: Address;
  deviceId: string;
  status: PackageStatus;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
  eta: string;
  readings: PackageTracking[];
};

export type PackageStatus =
  | "pending"
  | "in_transit"
  | "delivered"
  | "cancelled"
  | "out_for_delivery";

export type PackageTracking = {
  id: number;
  deviceId: string;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  createdAt: string;
};
