import { Request } from "express";
import { CreatePackagePayload, CreatePackageTracking } from "./types";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;

export type CreatePackageTrackingRequest = Request<{}, {}, CreatePackageTracking>;
