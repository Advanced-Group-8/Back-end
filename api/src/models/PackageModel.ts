import {
  CreatePackage,
  GetPackageById,
  GetPackageDeviceId,
  GetPackages,
  Package,
} from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const PackageModel = {
  get: async ({
    senderId,
    receiverId,
    currentCarrierId,
    status,
    senderAddress,
    receiverAddress,
  }: GetPackages) => {
    const filters: string[] = [];
    const values: (string | number)[] = [];

    values.push(senderId);
    filters.push(`p.sender_id = $${values.length}`);

    values.push(receiverId);
    filters.push(`p.receiver_id = $${values.length}`);

    if (currentCarrierId !== undefined) {
      values.push(currentCarrierId);
      filters.push(`p.current_carrier_id = $${values.length}`);
    }

    if (status !== undefined) {
      values.push(status);
      filters.push(`p.status = $${values.length}`);
    }

    if (senderAddress) {
      Object.entries(senderAddress).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          values.push(`%${value}%`);
          filters.push(`sa.${key} ILIKE $${values.length}`);
        }
      });
    }

    if (receiverAddress) {
      Object.entries(receiverAddress).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          values.push(`%${value}%`);
          filters.push(`ra.${key} ILIKE $${values.length}`);
        }
      });
    }

    let query = `
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
      LEFT JOIN address sa
        ON p.sender_address_id = sa.id
      LEFT JOIN address ra
        ON p.receiver_address_id = ra.id
    `;

    if (filters.length > 0) {
      query += ` WHERE ${filters.join(" AND ")}`;
    }

    query += ` GROUP BY p.id`;
    query += ` ORDER BY p.eta ASC NULLS LAST`;

    return await executeQuery<Package>(query, values);
  },
  getById: async ({ id }: GetPackageById) => {
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
  getByDeviceId: async ({ deviceId }: GetPackageDeviceId) => {
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
      WHERE p.device_id = $1
      GROUP BY p.id;
      `,
      [deviceId]
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
