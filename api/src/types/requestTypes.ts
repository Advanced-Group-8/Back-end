import { Request } from "express";
import { ParsedQs } from "qs";
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

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload, ParsedQs>;

export type GetPackagesRequest = Request<{}, {}, {}, ParsedQs>;

export type GetPackageByIdRequest = Request<{ id: string }, {}, {}, ParsedQs>;

export type GetPackageByDeviceIdRequest = Request<{ deviceId: string }, {}, {}, ParsedQs>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking, ParsedQs>;

export type GetDeviceByIdRequest = Request<GetDeviceById, {}, {}, PackageFilter>;

export type GetPackageTrackingByDeviceIdQuery = {
  latest?: string;
};

export type GetPackageTrackingByDeviceIdRequest = Request<{ deviceId: string }, {}, {}, ParsedQs>;

export type SignUpRequest = Request<{}, {}, SignUpPayload>;

export type SignInRequest = Request<{}, {}, SignInPayload>;
