import {
  CreatePackage,
  GetPackagesWithFilter,
  GetPackageByIdWithFilter,
  GetPackageByDeviceIdWithFilter,
} from "@/src/types/types.js";
import { PackageTable } from "@/types/dbTablesTypes";
import { Package } from "@/types/responseTypes";
import { executeQuery } from "@/utils";

const PackageModel = {
  get: async ({
    senderId,
    receiverId,
    currentCarrierId,
    status,
    senderAddress,
    receiverAddress,
    limit,
    readingsLimit,
  }: GetPackagesWithFilter): Promise<Package[]> => {
    const filters: string[] = [];
    const values: (string | number)[] = [];

    if (senderId !== undefined) {
      values.push(senderId);
      filters.push(`p.sender_id = $${values.length}`);
    }

    if (receiverId !== undefined) {
      values.push(receiverId);
      filters.push(`p.receiver_id = $${values.length}`);
    }

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

    if (readingsLimit !== undefined) {
      values.push(readingsLimit);
    }

    if (limit !== undefined) {
      values.push(limit);
    }

    const query = `
      SELECT
        p.id,
        json_build_object(
          'id', sp.id,
          'email', sp.email,
          'name', sp.name,
          'role', sp.role,
          'companyName', sp.company_name,
          'createdAt', sp.created_at,
          'updatedAt', sp.updated_at
        ) AS "sender",
        json_build_object(
          'id', rp.id,
          'email', rp.email,
          'name', rp.name,
          'role', rp.role,
          'companyName', rp.company_name,
          'createdAt', rp.created_at,
          'updatedAt', rp.updated_at
        ) AS "receiver",
        json_build_object(
          'id', cp.id,
          'email', cp.email,
          'name', cp.name,
          'role', cp.role,
          'companyName', cp.company_name,
          'createdAt', cp.created_at,
          'updatedAt', cp.updated_at
        ) AS "currentCarrier",
        json_build_object(
          'id', sa.id,
          'street', sa.street,
          'city', sa.city,
          'postalCode', sa.postal_code,
          'country', sa.country
        ) AS "senderAddress",
        json_build_object(
          'id', ra.id,
          'street', ra.street,
          'city', ra.city,
          'postalCode', ra.postal_code,
          'country', ra.country
        ) AS "receiverAddress",
        p.device_id AS "deviceId",
        p.status,
        p.tracking_code AS "trackingCode",
        p.created_at AS "createdAt",
        p.updated_at AS "updatedAt",
        p.eta,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'id', pt.id,
                'deviceId', pt.device_id,
                'lat', pt.lat,
                'lng', pt.lng,
                'temperature', pt.temperature,
                'humidity', pt.humidity,
                'createdAt', pt.created_at
              )
            )
            FROM package_tracking pt
            WHERE pt.device_id = p.device_id
            ORDER BY pt.created_at DESC
            ${readingsLimit !== undefined ? `LIMIT $${values.length - (limit !== undefined ? 1 : 0)}` : ""}
          ), '[]'
        ) AS readings
      FROM package p
      LEFT JOIN profile sp ON p.sender_id = sp.id
      LEFT JOIN profile rp ON p.receiver_id = rp.id
      LEFT JOIN profile cp ON p.current_carrier_id = cp.id
      LEFT JOIN address sa ON p.sender_address_id = sa.id
      LEFT JOIN address ra ON p.receiver_address_id = ra.id
      ${filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : ""}
      ORDER BY p.eta ASC NULLS LAST
      ${limit !== undefined ? `LIMIT $${values.length}` : ""};
    `;

    return await executeQuery<Package>(query, values);
  },
  getById: async ({ id, readingsLimit }: GetPackageByIdWithFilter): Promise<Package | null> => {
    const values: (string | number)[] = [id];
    const readingsLimitClause = readingsLimit !== undefined ? `LIMIT $${values.length + 1}` : "";

    if (readingsLimit !== undefined) {
      values.push(readingsLimit);
    }

    const result = await executeQuery<Package>(
      `
        SELECT 
          p.id,
          json_build_object(
            'id', sp.id,
            'email', sp.email,
            'name', sp.name,
            'role', sp.role,
            'companyName', sp.company_name,
            'createdAt', sp.created_at,
            'updatedAt', sp.updated_at
          ) AS "sender",
          json_build_object(
            'id', rp.id,
            'email', rp.email,
            'name', rp.name,
            'role', rp.role,
            'companyName', rp.company_name,
            'createdAt', rp.created_at,
            'updatedAt', rp.updated_at
          ) AS "receiver",
          json_build_object(
            'id', cp.id,
            'email', cp.email,
            'name', cp.name,
            'role', cp.role,
            'companyName', cp.company_name,
            'createdAt', cp.created_at,
            'updatedAt', cp.updated_at
          ) AS "currentCarrier",
          json_build_object(
            'id', sa.id,
            'street', sa.street,
            'city', sa.city,
            'postalCode', sa.postal_code,
            'country', sa.country
          ) AS "senderAddress",
          json_build_object(
            'id', ra.id,
            'street', ra.street,
            'city', ra.city,
            'postalCode', ra.postal_code,
            'country', ra.country
          ) AS "receiverAddress",
          p.device_id AS "deviceId",
          p.status,
          p.tracking_code AS "trackingCode",
          p.created_at AS "createdAt",
          p.updated_at AS "updatedAt",
          p.eta,
          COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'id', pt.id,
                  'deviceId', pt.device_id,
                  'lat', pt.lat,
                  'lng', pt.lng,
                  'temperature', pt.temperature,
                  'humidity', pt.humidity,
                  'createdAt', pt.created_at
                )
                ORDER BY pt.created_at DESC
                ${readingsLimitClause}
              )
              FROM package_tracking pt
              WHERE pt.device_id = p.device_id
            ), '[]'
          ) AS readings
        FROM package p
        LEFT JOIN profile sp ON p.sender_id = sp.id
        LEFT JOIN profile rp ON p.receiver_id = rp.id
        LEFT JOIN profile cp ON p.current_carrier_id = cp.id
        LEFT JOIN address sa ON p.sender_address_id = sa.id
        LEFT JOIN address ra ON p.receiver_address_id = ra.id
        WHERE p.id = $1
        GROUP BY p.id, sp.id, rp.id, cp.id, sa.id, ra.id;
      `,
      values
    );

    return result[0] ?? null;
  },
  getByDeviceId: async ({
    deviceId,
    readingsLimit,
  }: GetPackageByDeviceIdWithFilter): Promise<Package | null> => {
    const values: (string | number)[] = [deviceId];
    const readingsLimitClause = readingsLimit !== undefined ? `LIMIT $${values.length + 1}` : "";

    if (readingsLimit !== undefined) {
      values.push(readingsLimit);
    }

    const result = await executeQuery<Package>(
      `
        SELECT 
          p.id,
          json_build_object(
            'id', sp.id,
            'email', sp.email,
            'name', sp.name,
            'role', sp.role,
            'companyName', sp.company_name,
            'createdAt', sp.created_at,
            'updatedAt', sp.updated_at
          ) AS "sender",
          json_build_object(
            'id', rp.id,
            'email', rp.email,
            'name', rp.name,
            'role', rp.role,
            'companyName', rp.company_name,
            'createdAt', rp.created_at,
            'updatedAt', rp.updated_at
          ) AS "receiver",
          json_build_object(
            'id', cp.id,
            'email', cp.email,
            'name', cp.name,
            'role', cp.role,
            'companyName', cp.company_name,
            'createdAt', cp.created_at,
            'updatedAt', cp.updated_at
          ) AS "currentCarrier",
          json_build_object(
            'id', sa.id,
            'street', sa.street,
            'city', sa.city,
            'postalCode', sa.postal_code,
            'country', sa.country
          ) AS "senderAddress",
          json_build_object(
            'id', ra.id,
            'street', ra.street,
            'city', ra.city,
            'postalCode', ra.postal_code,
            'country', ra.country
          ) AS "receiverAddress",
          p.device_id AS "deviceId",
          p.status,
          p.tracking_code AS "trackingCode",
          p.created_at AS "createdAt",
          p.updated_at AS "updatedAt",
          p.eta,
          COALESCE(
            (
              SELECT json_agg(
                json_build_object(
                  'id', pt.id,
                  'deviceId', pt.device_id,
                  'lat', pt.lat,
                  'lng', pt.lng,
                  'temperature', pt.temperature,
                  'humidity', pt.humidity,
                  'createdAt', pt.created_at
                )
                ORDER BY pt.created_at DESC
                ${readingsLimitClause}
              )
              FROM package_tracking pt
              WHERE pt.device_id = p.device_id
            ), '[]'
          ) AS readings
        FROM package p
        LEFT JOIN profile sp ON p.sender_id = sp.id
        LEFT JOIN profile rp ON p.receiver_id = rp.id
        LEFT JOIN profile cp ON p.current_carrier_id = cp.id
        LEFT JOIN address sa ON p.sender_address_id = sa.id
        LEFT JOIN address ra ON p.receiver_address_id = ra.id
        WHERE p.device_id = $1
        GROUP BY p.id, sp.id, rp.id, cp.id, sa.id, ra.id;
    `,
      values
    );

    return result[0] ?? null;
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
      await executeQuery<PackageTable>(
        `
          INSERT INTO package (
            sender_id, 
            receiver_id, 
            sender_address_id, 
            receiver_address_id, 
            current_carrier_id, 
            device_id, 
            status, 
            tracking_code, 
            eta
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING 
            id,
            sender_id AS "senderId",
            receiver_id AS "receiverId",
            sender_address_id AS "senderAddressId",
            receiver_address_id AS "receiverAddressId",
            current_carrier_id AS "currentCarrierId",
            device_id AS "deviceId",
            status,
            tracking_code AS "trackingCode",
            created_at AS "createdAt",
            updated_at AS "updatedAt",
            eta;
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
