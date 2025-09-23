import ProfileModel from "@/models/ProfileModel.js";
import { GetProfileById } from "@/types/types.js";
import { omit } from "@/utils/index.js";

const ProfileService = {
  getById: async ({ id }: GetProfileById) => {
    return ProfileModel.getById({ id });
  },
  getProfile: async (params: GetProfileById) => {
    return omit(await ProfileModel.getById(params), ["passwordHash"]);
  },
};

export default ProfileService;
