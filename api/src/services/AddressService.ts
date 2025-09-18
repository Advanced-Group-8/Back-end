import AddressModel from "@/models/AddressModel";
import { CreateAddress } from "@/types/types";

const AddressService = {
  create: async (payload: CreateAddress) => {
    return await AddressModel.create(payload);
  },
};

export default AddressService;
