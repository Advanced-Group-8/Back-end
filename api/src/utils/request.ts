import { GetPackagesWithFilter } from "@/types/types";
import { parseJson } from ".";
import { Request } from "express";

export const extractGetPackagesQuery = (req: Request): GetPackagesWithFilter => {
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
