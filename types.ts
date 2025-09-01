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
  id?: number;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

export type Package = {
  id?: number;
  senderId: number; // FK → Profile.id
  receiverId: number; // FK → Profile.id
  senderAddressId: number; // FK → Address.id
  receiverAddressId: number; // FK → Address.id
  currentCarrierId: string;
  status?: string;
  trackingCode?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  eta?: string; // ISO timestamp
};

export type ContactInfo = {
  id?: number;
  profileId: number; // FK → Profile.id
  phone?: string;
  address?: string;
};

export type Location = {
  id?: number;
  packageId: number; // FK → Package.id
  lat?: number;
  long?: number;
  createdAt: string; // ISO timestamp
};

export type Temperature = {
  id?: number;
  packageId: number; // FK → Package.id
  temperature: number;
  createdAt: string; // ISO timestamp
};

export type Humidity = {
  id?: number;
  packageId: number; // FK → Package.id
  humidity: number;
};
