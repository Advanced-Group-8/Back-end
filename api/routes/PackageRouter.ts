import PackageContoller from "@/controllers/PackageController.js";
import PackageValidator from "@/validators/PackageValidator.js";
import express from "express";

const router = express.Router();

router.post("/", PackageValidator.create, PackageContoller.create);

export default router;
