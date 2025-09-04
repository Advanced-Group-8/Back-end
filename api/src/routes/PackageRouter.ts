import PackageContoller from "@/src/controllers/PackageController.js";
import PackageValidator from "@/src/validators/PackageValidator.js";
import express from "express";

const router = express.Router();

router.post("/", PackageValidator.create, PackageContoller.create);

export default router;
