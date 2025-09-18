export type CreatePackagePayload = {
  /**
   * ID of the sender profile.
   * - Must exist in the `profiles` table.
   * - Cannot be the same as `receiverId`.
   * - Can be the same as `currentCarrierId`.
   */
  senderId: number;

  /**
   * ID of the receiver profile.
   * - Must exist in the `profiles` table.
   * - Cannot be the same as `senderId` or `currentCarrierId`.
   */
  receiverId: number;

  /**
   * ID of the carrier profile currently handling the package.
   * - Must exist in the `profiles` table.
   * - Cannot be the same as `receiverId`.
   * - Can be the same as `senderId`.
   */
  currentCarrierId: number;

  /**
   * Device ID used to register the package.
   * - Required, non-empty string.
   * - Typically represents the device that scanned/registered the package.
   */
  deviceId: string;

  /**
   * Address of the sender.
   * - All fields are required and non-empty.
   */
  senderAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  /**
   * Address of the receiver.
   * - All fields are required and non-empty.
   */
  receiverAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

export type PackageTracking = {
  /**
   * Unique identifier for the tracking record.
   */
  id: number;

  /**
   * Device ID associated with this tracking entry.
   * - Typically represents the device that recorded the package's location or status.
   * - Required and non-empty string.
   */
  deviceId: string;

  /**
   * Latitude of the package at the time of recording.
   * - Required numeric value.
   * - Represents geographic coordinate in decimal degrees.
   */
  lat: number;

  /**
   * Longitude of the package at the time of recording.
   * - Required numeric value.
   * - Represents geographic coordinate in decimal degrees.
   */
  lng: number;

  /**
   * Temperature recorded by the device at the time of tracking.
   * - Required numeric value.
   * - Typically in Celsius or Fahrenheit (document the unit your system uses).
   */
  temperature: number;

  /**
   * Humidity recorded by the device at the time of tracking.
   * - Required numeric value.
   * - Typically represents relative humidity as a percentage.
   */
  humidity: number;

  /**
   * Timestamp when this tracking entry was created.
   * - ISO 8601 formatted string.
   * - Represents the exact time the device recorded this data.
   */
  createdAt: string;
};
