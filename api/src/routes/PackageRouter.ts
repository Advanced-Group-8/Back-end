import PackageContoller from "../controllers/PackageController";
import PackageValidator from "../validators/PackageValidator";
import express from "express";

const router = express.Router();

router.post("/", PackageValidator.create, PackageContoller.create);

export default router;
