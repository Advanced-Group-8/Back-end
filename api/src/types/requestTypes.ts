import { Request } from "express";
import { CreatePackagePayload, CreatePackageTracking, GetPackages } from "./types";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;

export type GetPackagesRequest = Request<{}, {}, {}, GetPackages>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking>;
