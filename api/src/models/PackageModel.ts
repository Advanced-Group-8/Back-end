import { CreatePackage, Package } from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const PackageModel = {
  getOneByPackageId: async (packageId: number) => {
    //run sql
  },
  getMany: async () => {},
  create: async ({
    senderId,
    receiverId,
    senderAddressId,
    receiverAddressId,
    currentCarrierId,
    status,
    trackingCode,
    eta,
  }: CreatePackage) => {
    return (
      await executeQuery<Package>(
        `
            INSERT INTO package (sender_id, receiver_id, sender_address_id, receiver_address_id, current_carrier_id, status, tracking_code, eta)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
          `,
        [
          senderId,
          receiverId,
          senderAddressId,
          receiverAddressId,
          currentCarrierId,
          status,
          trackingCode,
          eta,
        ]
      )
    )[0];
  },
};

export default PackageModel;
