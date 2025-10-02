import {
  CreatePackage,
  GetPackagesWithFilter,
  GetPackageByIdWithFilter,
  GetPackageByDeviceIdWithFilter,
  PackageUpdateFields,
} from "@/src/types/types.js";
import { PackageTable } from "@/types/dbTablesTypes.js";
import { Package } from "@/types/responseTypes.js";
import { executeQuery } from "@/utils/index.js";

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

    const limitClause =
      limit !== undefined ? `LIMIT $${values.length + (readingsLimit !== undefined ? 1 : 0)}` : "";
    const readingsLimitClause = readingsLimit !== undefined ? `LIMIT ${readingsLimit}` : "";

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
            SELECT json_agg(row_data)
            FROM (
              SELECT json_build_object(
                'id', pt.id,
                'deviceId', pt.device_id,
                'lat', pt.lat,
                'lng', pt.lng,
                'temperature', pt.temperature,
                'humidity', pt.humidity,
                'createdAt', pt.created_at
              ) AS row_data
              FROM package_tracking pt
              WHERE pt.device_id = p.device_id
              ORDER BY pt.created_at DESC
              ${readingsLimitClause}
            ) subq
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
      ${limitClause};
    `;

    return await executeQuery<Package>(query, values);
  },
  getById: async ({ id, readingsLimit }: GetPackageByIdWithFilter): Promise<Package | null> => {
    const values: (string | number)[] = [id];
    const limitClause = readingsLimit !== undefined ? `LIMIT ${readingsLimit}` : "";

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
              SELECT json_agg(row_data)
              FROM (
                SELECT json_build_object(
                  'id', pt.id,
                  'deviceId', pt.device_id,
                  'lat', pt.lat,
                  'lng', pt.lng,
                  'temperature', pt.temperature,
                  'humidity', pt.humidity,
                  'createdAt', pt.created_at
                ) AS row_data
                FROM package_tracking pt
                WHERE pt.device_id = p.device_id
                ORDER BY pt.created_at DESC
                ${limitClause}
              ) subq
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
  }: GetPackageByDeviceIdWithFilter): Promise<Package[]> => {
    const values: (string | number)[] = [deviceId];
    const limitClause = readingsLimit !== undefined ? `LIMIT ${readingsLimit}` : "";

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
              SELECT json_agg(row_data)
              FROM (
                SELECT json_build_object(
                  'id', pt.id,
                  'deviceId', pt.device_id,
                  'lat', pt.lat,
                  'lng', pt.lng,
                  'temperature', pt.temperature,
                  'humidity', pt.humidity,
                  'createdAt', pt.created_at
                ) AS row_data
                FROM package_tracking pt
                WHERE pt.device_id = p.device_id
                ORDER BY pt.created_at DESC
                ${limitClause}
              ) subq
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

    return result;
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
  update: async (
    where: Record<string, string | number>,
    fields: PackageUpdateFields
  ): Promise<Package[]> => {
    const setClauses: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(fields).forEach(([key, value]) => {
      values.push(value!);
      setClauses.push(`${key} = $${values.length}`);
    });

    if (setClauses.length === 0) {
      throw new Error("No fields provided to update");
    }

    const whereClauses: string[] = [];

    Object.entries(where).forEach(([key, value]) => {
      values.push(value);
      whereClauses.push(`${key} = $${values.length}`);
    });

    if (whereClauses.length === 0) {
      throw new Error("No filter provided for update");
    }

    const result = await executeQuery<Package>(
      `
        UPDATE package
        SET ${setClauses.join(", ")}
        WHERE ${whereClauses.join(" AND ")}
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
      values
    );

    return result;
  },
};

export default PackageModel;
