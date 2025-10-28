import express from "express";
import PackageTrackingController from "@/src/controllers/PackageTrackingController.js";
import PackageTrackingValidator from "@/src/validators/PackageTrackingValidator.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/", AuthMiddleware.authenticate, PackageTrackingValidator.create, PackageTrackingController.create);

router.get("/:deviceId", AuthMiddleware.authenticate, PackageTrackingController.getByDeviceId);

router.get("/", AuthMiddleware.authenticate, PackageTrackingController.getAllGroupedByDeviceId);

export default router;
