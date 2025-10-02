import DeviceController from "@/controllers/DeviceController.js";
import express from "express";

const router = express.Router();

router.post("/", DeviceController.create);

export default router;
