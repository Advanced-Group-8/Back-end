import { NotFoundError } from "@/errors/Error";
import ProfileService from "@/services/ProfileService";
import { GetProfileById, Profile } from "@/types/types";

const ProfileValidator = {
  exists: async ({ id, role }: GetProfileById & { role?: string }): Promise<Profile["id"]> => {
    const profileId = (await ProfileService.getById({ id })).id;

    if (!profileId) {
      throw new NotFoundError(`No available profile found with id '${id}' as ${role}`);
    }

    return profileId;
  },
};

export default ProfileValidator;
