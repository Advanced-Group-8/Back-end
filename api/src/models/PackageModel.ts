import { CreatePackage, Package } from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const PackageModel = {
  get: async () => {},

  getById: async (id: NonNullable<Package["id"]>) => {
    const result = await executeQuery<Package>(
      `
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pt.id,
              'deviceId', pt.device_id,
              'lat', pt.lat,
              'lng', pt.lng,
              'temperature', pt.temperature,
              'humidity', pt.humidity,
              'createdAt', pt.created_at
            )
          ) FILTER (WHERE pt.id IS NOT NULL), '[]'
        ) AS readings
      FROM package p
      LEFT JOIN package_tracking pt
        ON p.device_id = pt.device_id
      WHERE p.id = $1
      GROUP BY p.id;
      `,
      [id]
    );

    return result[0];
  },
  create: async ({
    senderId,
    receiverId,
    senderAddressId,
    receiverAddressId,
    currentCarrierId,
    deviceId,
    status,
    trackingCode,
    eta,
  }: CreatePackage) => {
    return (
      await executeQuery<Package>(
        `
            INSERT INTO package (sender_id, receiver_id, sender_address_id, receiver_address_id, current_carrier_id, device_id, status, tracking_code, eta)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
          `,
        [
          senderId,
          receiverId,
          senderAddressId,
          receiverAddressId,
          currentCarrierId,
          deviceId,
          status,
          trackingCode,
          eta,
        ]
      )
    )[0];
  },
};

export default PackageModel;
