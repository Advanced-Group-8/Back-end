import { Request } from "express";
import {
  CreatePackagePayload,
  CreatePackageTracking,
  GetDeviceById,
  GetPackageByDeviceId,
  GetPackageById,
  GetPackagesWithFilter,
  GetPackageTrackingByDeviceId,
  PackageFilter,
} from "./types.js";
import { SignInPayload, SignUpPayload } from "./httpPayloadTypes.js";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;

export type GetPackagesRequest = Request<{}, {}, {}, GetPackagesWithFilter>;

export type GetPackageByIdRequest = Request<GetPackageById, {}, {}, PackageFilter>;

export type GetPackageByDeviceIdRequest = Request<GetPackageByDeviceId, {}, {}, PackageFilter>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking>;

export type GetDeviceByIdRequest = Request<GetDeviceById, {}, {}, PackageFilter>;

export type GetPackageTrackingByDeviceIdQuery = {
  latest?: string;
};

export type GetPackageTrackingByDeviceIdRequest = Request<
  GetPackageTrackingByDeviceId,
  {},
  {},
  GetPackageTrackingByDeviceIdQuery
>;

export type SignUpRequest = Request<{}, {}, SignUpPayload>;

export type SignInRequest = Request<{}, {}, SignInPayload>;
