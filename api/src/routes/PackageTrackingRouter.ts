import express from "express";
import PackageTrackingController from "@/src/controllers/PackageTrackingController.js";
import PackageTrackingValidator from "@/src/validators/PackageTrackingValidator.js";

const router = express.Router();

router.post("/", PackageTrackingValidator.create, PackageTrackingController.create);

router.get("/:deviceId", PackageTrackingController.getByDeviceId);

router.get("/", PackageTrackingController.getAllGroupedByDeviceId);

export default router;
