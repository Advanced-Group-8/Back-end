import { GetPackagesWithFilter, PackageFilter } from "@/types/types";
import { parseJson } from ".";
import {
  GetPackageByDeviceIdRequest,
  GetPackageByIdRequest,
  GetPackagesRequest,
} from "@/types/requestTypes";

export const extractGetPackagesQuery = (req: GetPackagesRequest): GetPackagesWithFilter => {
  const query = req.query;

  return {
    senderId: query.senderId ? Number(query.senderId) : undefined,
    receiverId: query.receiverId ? Number(query.receiverId) : undefined,
    currentCarrierId: query.currentCarrierId ? Number(query.currentCarrierId) : undefined,
    status: query.status as string | undefined,
    limit: query.limit ? Number(query.limit) : undefined,
    readingsLimit: query.readingsLimit ? Number(query.readingsLimit) : undefined,
    senderAddress: parseJson(query.senderAddress, {}),
    receiverAddress: parseJson(query.receiverAddress, {}),
  } as GetPackagesWithFilter;
};

export const extractPackageFilter = (
  req: GetPackageByIdRequest | GetPackageByDeviceIdRequest
): PackageFilter => {
  const query = req.query;

  return {
    limit: query.limit ? Number(query.limit) : undefined,
    readingsLimit: query.readingsLimit ? Number(query.readingsLimit) : undefined,
  };
};
