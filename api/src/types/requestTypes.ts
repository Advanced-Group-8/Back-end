import { Request } from "express";
import { CreatePackagePayload } from "./types";

export type CreatePackageRequest = Request<{}, {}, CreatePackagePayload>;
