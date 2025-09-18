import { GetProfileById } from "@/src/types/types.js";
import { ProfileTable } from "@/types/dbTablesTypes.js";
import { executeQuery } from "@/utils/index.js";

const ProfileModel = {
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
            created_at AS "createdAt",
            updated_at AS "updatedAt"
          FROM profile
          WHERE id = $1
        `,
        [id]
      )
    )[0];
  },
};

export default ProfileModel;
