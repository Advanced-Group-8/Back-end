import { GetProfileById } from "@/src/types/types.js";
import { CreateProfile, ProfileTable } from "@/types/dbTablesTypes.js";
import { executeQuery } from "@/utils/index.js";

const ProfileModel = {
  create: async ({ email, name, passwordHash, role, companyName }: CreateProfile) => {
    return (
      await executeQuery<CreateProfile>(
        `
          INSERT INTO profile (email, name, password_hash, role, company_name)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING
            id,
            email,
            name,
            role,
            company_name AS "companyName",
            created_at AT TIME ZONE 'UTC' AS "createdAt",
            updated_at AT TIME ZONE 'UTC' AS "createdAt"
        `,
        [email, name, passwordHash, role, companyName]
      )
    )[0];
  },
  getByFields: async (where: Record<string, string | number>): Promise<ProfileTable[]> => {
    const whereClauses: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(where).forEach(([key, value]) => {
      values.push(value);
      whereClauses.push(`${key} = $${values.length}`);
    });

    if (whereClauses.length === 0) {
      throw new Error("No filter provided");
    }

    const result = await executeQuery<ProfileTable>(
      `
        SELECT
          id,
          email,
          name,
          role,
          password_hash AS "passwordHash"
          company_name AS "companyName",
          created_at AT TIME ZONE 'UTC' AS "createdAt",
          updated_at AT TIME ZONE 'UTC' AS "updatedAt"
        FROM profile
        WHERE ${whereClauses.join(" OR ")}
      `,
      values
    );

    return result;
  },
  getById: async ({ id }: GetProfileById): Promise<ProfileTable> => {
    return (
      await executeQuery<ProfileTable>(
        `
          SELECT 
            id,
            email,
            name,
            password_hash AS "passwordHash",
            role,
            company_name AS "companyName",
            created_at AT TIME ZONE 'UTC' AS "createdAt",
            updated_at AT TIME ZONE 'UTC' AS "createdAt"
          FROM profile
          WHERE id = $1
        `,
        [id]
      )
    )[0];
  },
};

export default ProfileModel;
