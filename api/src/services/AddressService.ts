import AddressModel from "@/models/AddressModel.js";
import { CreateAddress } from "@/types/types.js";

const AddressService = {
  create: async (payload: CreateAddress) => {
    return await AddressModel.create(payload);
  },
};

export default AddressService;
