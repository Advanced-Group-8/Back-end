import express from "express";
import SensorController from "@/src/controllers/SensorController.js";
import SensorValidator from "@/src/validators/SensorValidator.js";

const router = express.Router();

router.post("/temperature", SensorValidator.createTemperature, SensorController.createTemperature);
router.get("/temperature/:packageId", SensorController.getTemperatureByPackage);

router.post("/humidity", SensorValidator.createHumidity, SensorController.createHumidity);
router.get("/humidity/:packageId", SensorController.getHumidityByPackage);

router.post("/location", SensorValidator.createLocation, SensorController.createLocation);
router.get("/location/:packageId", SensorController.getLocationByPackage);

router.get("/all/:packageId", SensorController.getAllSensorsByPackage);
router.get("/latest/:packageId", SensorController.getLatestReadings);

export default router;



