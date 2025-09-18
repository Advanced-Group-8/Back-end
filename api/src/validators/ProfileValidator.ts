import { NotFoundError } from "@/errors/Error.js";
import ProfileService from "@/services/ProfileService.js";
import { ProfileTable } from "@/types/dbTablesTypes.js";

const ProfileValidator = {
  exists: async (
    paylod: { id?: ProfileTable["id"] } & { role?: string }
  ): Promise<ProfileTable["id"] | null> => {
    const id = paylod.id;
    const role = paylod.role;

    if (!id) {
      return null;
    }

    const profileId = (await ProfileService.getById({ id })).id;

    if (!profileId) {
      throw new NotFoundError(`No available profile found with id '${id}' as ${role}`);
    }

    return profileId;
  },
};

export default ProfileValidator;
