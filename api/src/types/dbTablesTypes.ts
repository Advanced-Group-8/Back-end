export type ProfileTable = {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProfile = {
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  companyName: string;
};

export type AddressTable = {
  id: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PackageTable = {
  id: number;
  senderId: number;
  receiverId: number;
  senderAddressId: number;
  receiverAddressId: number;
  currentCarrierId: number;
  deviceId: number;
  status: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
  eta: string;
};

export type ContactInfoTable = {
  id: number;
  profileId: number;
  addressId: number;
  phone: string;
};

export type PackageTrackingTable = {
  id: number;
  deviceId: number;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  createdAt: string;
};

export type DeviceTable = {
  id: number;
  createdAt: string;
};
