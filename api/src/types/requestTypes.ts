import { Request } from "express";
import { CreatePackagePayload, CreatePackageTracking, GetPackageById, GetPackages } from "./types";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;

export type GetPackagesRequest = Request<{}, {}, {}, GetPackages>;

export type GetPackageByIdRequest = Request<GetPackageById>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking>;
