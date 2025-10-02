import DeviceController from "@/controllers/DeviceController.js";
import DeviceValidator from "@/validators/DeviceValidator.js";
import express from "express";

const router = express.Router();

router.get("/", DeviceController.get);

router.get("/:id", DeviceValidator.getById.params, DeviceController.getById);

router.post("/", DeviceController.create);

export default router;
