import { AddressTable } from "@/types/dbTablesTypes.js";
import { CreateAddress } from "@/types/types.js";
import { executeQuery } from "@/utils/index.js";

const AddressModel = {
  create: async ({ street, city, postalCode, country }: CreateAddress) => {
    return (
      await executeQuery<AddressTable>(
        `
          INSERT INTO address (street, city, postal_code, country)
          VALUES ($1, $2, $3, $4)
          RETURNING
            id,
            street,
            city,
            postal_code AS "postalCode",
            country;
        `,
        [street, city, postalCode, country]
      )
    )[0];
  },
};

export default AddressModel;
