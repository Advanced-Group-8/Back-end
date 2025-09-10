import express from "express";
import PackageTrackingController from "@/src/controllers/PackageTrackingController.js";
import PackageTrackingValidator from "@/src/validators/PackageTrackingValidator.js";

const router = express.Router();

// POST: Skapa tracking-data från IoT
router.post("/", PackageTrackingValidator.create, PackageTrackingController.create);

// GET: Hämta tracking-data för en device
router.get("/:deviceId", PackageTrackingController.getByDeviceId);

// GET: Senaste tracking för en device
router.get("/:deviceId/latest", PackageTrackingController.getLatest);

export default router;