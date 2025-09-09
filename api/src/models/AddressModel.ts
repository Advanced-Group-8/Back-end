import { CreateAddress } from "@/types/types";
import { executeQuery } from "@/utils";

const AddressModel = {
  create: async ({ street, city, postalCode, country }: CreateAddress) => {
    return (
      await executeQuery(
        `
            INSERT INTO address (street, city, postal_code, country)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
        [street, city, postalCode, country]
      )
    )[0];
  },
};

export default AddressModel;
