import { NotFoundError } from "@/errors/Error";
import ProfileService from "@/services/ProfileService";
import { GetProfileById, Profile } from "@/types/types";

const ProfileValidator = {
  exists: async (
    paylod: { id: Profile["id"] } & { role?: string }
  ): Promise<Profile["id"] | null> => {
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
