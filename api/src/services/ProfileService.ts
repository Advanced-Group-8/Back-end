import ProfileModel from "@/models/Profile";
import { GetProfileById } from "@/types/types";

const ProfileService = {
  getById: async ({ id }: GetProfileById) => {
    return ProfileModel.getById({ id });
  },
};

export default ProfileService;
