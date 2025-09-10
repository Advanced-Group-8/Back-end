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
