import DeviceController from "@/controllers/DeviceController.js";
import DeviceValidator from "@/validators/DeviceValidator.js";
import express from "express";

const router = express.Router();

router.get("/", DeviceController.get);

router.get("/:id", DeviceValidator.getById.params, DeviceController.getById);

router.post("/", DeviceController.create);

router.patch("/:id/status", DeviceValidator.getById.params, DeviceController.updateStatus);

export default router;
