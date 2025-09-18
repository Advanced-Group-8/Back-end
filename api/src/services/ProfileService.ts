import ProfileModel from "@/models/ProfileModel";
import { GetProfileById } from "@/types/types";
import { omit } from "@/utils";

const ProfileService = {
  getById: async ({ id }: GetProfileById) => {
    return ProfileModel.getById({ id });
  },
  getProfile: async (params: GetProfileById) => {
    return omit(await ProfileModel.getById(params), ["passwordHash"]);
  },
};

export default ProfileService;
