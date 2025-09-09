import AddressModel from "@/models/AddressModel";
import PackageModel from "@/src/models/PackageModel.js";
import { CreatePackagePayload } from "@/src/types/types.js";
import { executeQuery } from "@/utils";

const PackageService = {
  create: async ({
    senderAddress,
    receiverAddress,
    packageInfo: { senderId, receiverId, currentCarrierId, deviceId, trackingCode, eta },
  }: CreatePackagePayload): Promise<ReturnType<typeof PackageModel.create>> => {
    try {
      await executeQuery("BEGIN;");

      const { id: senderAddressId } = await AddressModel.create(senderAddress);
      const { id: receiverAddressId } = await AddressModel.create(receiverAddress);

      const createdPackage = await PackageModel.create({
        senderId,
        receiverId,
        senderAddressId,
        receiverAddressId,
        currentCarrierId,
        trackingCode,
        deviceId,
        status: "pending",
        eta,
      });

      await executeQuery("COMMIT;");

      return createdPackage;
    } catch (err) {
      await executeQuery("ROLLBACK;");
      throw err;
    }
  },
};

export default PackageService;
