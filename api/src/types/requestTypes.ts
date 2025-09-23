import { Request } from "express";
import {
  CreatePackagePayload,
  CreatePackageTracking,
  GetPackageByDeviceId,
  GetPackageById,
  GetPackagesWithFilter,
  GetPackageTrackingByDeviceId,
  PackageFilter,
} from "./types.js";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;

export type GetPackagesRequest = Request<{}, {}, {}, GetPackagesWithFilter>;

export type GetPackageByIdRequest = Request<GetPackageById, {}, {}, PackageFilter>;

export type GetPackageByDeviceIdRequest = Request<GetPackageByDeviceId, {}, {}, PackageFilter>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking>;

export type GetPackageTrackingByDeviceIdQuery = {
  latest?: string;
};

export type GetPackageTrackingByDeviceIdRequest = Request<
  GetPackageTrackingByDeviceId,
  {},
  {},
  GetPackageTrackingByDeviceIdQuery
>;
