import PackageContoller from "../controllers/PackageController";
import PackageValidator from "../validators/PackageValidator";
import express from "express";

const router = express.Router();

router.get("/:id", PackageValidator.getById.params, PackageContoller.getById);

router.get("/:deviceId", PackageValidator.getByDeviceId.params, PackageContoller.getByDeviceId);

router.get("/", PackageValidator.get.query, PackageContoller.get);

router.post("/", PackageValidator.create.body, PackageContoller.create);

export default router;
