import AddressModel from "@/models/AddressModel";
import PackageModel from "@/src/models/PackageModel.js";
import { CreateOrder } from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const PackageService = {
  create: async ({
    senderAddress,
    receiverAddress,
    packageInfo: { senderId, receiverId, currentCarrierId, trackingCode, eta },
  }: CreateOrder): Promise<ReturnType<typeof PackageModel.create>> => {
    try {
      await executeQuery("BEGIN;");

      const { id: senderAddressId } = await AddressModel.create(senderAddress);
      const { id: receiverAddressId } = await AddressModel.create(receiverAddress);

      const createdOrder = await PackageModel.create({
        senderId,
        receiverId,
        senderAddressId,
        receiverAddressId,
        currentCarrierId,
        trackingCode,
        eta,
        status: "pending",
      });

      await executeQuery("COMMIT;");

      return createdOrder;
    } catch (err) {
      await executeQuery("ROLLBACK;");
      throw err;
    }
  },
};

export default PackageService;
