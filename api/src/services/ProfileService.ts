import { BadRequestError, ConflictError } from "@/errors/Error.js";
import ProfileModel from "@/models/ProfileModel.js";
import { SignInPayload, SignUpPayload } from "@/types/httpPayloadTypes.js";
import { GetProfileById } from "@/types/types.js";
import { omit } from "@/utils/index.js";
import bcrypt from "bcryptjs";

import { logger } from "@/utils/logger.js";

const ProfileService = {
  create: async (payload: SignUpPayload) => {
    const { email, name, password, role, companyName } = payload;

    const isNameOrEmailTaken = (await ProfileModel.getByFields({ email, name })).length > 0;

    if (isNameOrEmailTaken) {
      throw new ConflictError("Email or name is already taken");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    logger.info(`Profile created for company: ${companyName} name on profile: `, name);
    
    return omit(await ProfileModel.create({ email, name, passwordHash, role, companyName }), [
      "passwordHash",
    ]);
  },
  signIn: async ({ name, email, password }: SignInPayload) => {
    const profile = (await ProfileModel.getByFields({ name: name || "", email: email || "" }))[0];

    if (!profile) {
      throw new BadRequestError("Invalid credentilas");
    }

    const isPasswordMatch = await bcrypt.compare(password, profile.passwordHash);

    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid credentilas");
    }

    return omit(profile, ["passwordHash"]);
  },
  getById: async ({ id }: GetProfileById) => {
    return ProfileModel.getById({ id });
  },
  getProfile: async (params: GetProfileById) => {
    return omit(await ProfileModel.getById(params), ["passwordHash"]);
  },
};

export default ProfileService;
