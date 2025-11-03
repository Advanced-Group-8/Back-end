import PackageContoller from "../controllers/PackageController.js";
import PackageValidator from "../validators/PackageValidator.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import express from "express";

const router = express.Router();

router.get(
  "/:id",
  AuthMiddleware.authenticate,
  PackageValidator.getById.params,
  PackageContoller.getById
);

router.get(
  "/device/:deviceId",
  AuthMiddleware.authenticate,
  PackageValidator.getByDeviceId.params,
  PackageContoller.getByDeviceId
);

router.get(
  "/carrier/:carrierId",
  AuthMiddleware.authenticate,
  PackageValidator.getByCarrierId.params,
  PackageContoller.getByCarrierId
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  PackageValidator.get.query,
  PackageContoller.get
);

router.post(
  "/",
  AuthMiddleware.authenticate,
  PackageValidator.create.body,
  PackageContoller.create
);

export default router;
