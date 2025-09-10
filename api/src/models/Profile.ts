import { GetProfileById, Profile } from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const ProfileModel = {
  getById: async ({ id }: GetProfileById): Promise<Profile> => {
    return (
      await executeQuery<Profile>(
        `
            SELECT * FROM profile
            WHERE id = $1
        `,
        [id]
      )
    )[0];
  },
};

export default ProfileModel;
