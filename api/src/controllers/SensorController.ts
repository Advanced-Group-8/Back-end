import SensorService from "../services/SensorService";
import { TemperatureSensor, HumiditySensor, LocationSensor } from "../types/types";
import { Request, Response } from "express";

type SensorRequest = Request<{}, {}, TemperatureSensor | HumiditySensor | LocationSensor>;
type SensorParamsRequest = Request<{ packageId: string }>;

const SensorController = {
  // Temperature endpoints
  createTemperature: async (req: Request<{}, {}, TemperatureSensor>, res: Response) => {
    try {
      const temperatureData: TemperatureSensor = req.body;
      const created = await SensorService.createTemperature(temperatureData);
      return res.status(201).json(created);
    } catch (error) {
      throw error;
    }
  },

  getTemperatureByPackage: async (req: SensorParamsRequest, res: Response) => {
    try {
      const packageId = parseInt(req.params.packageId);
      const readings = await SensorService.getTemperatureByPackage(packageId);
      return res.status(200).json(readings);
    } catch (error) {
      throw error;
    }
  },

  // Humidity endpoints
  createHumidity: async (req: Request<{}, {}, HumiditySensor>, res: Response) => {
    try {
      const humidityData: HumiditySensor = req.body;
      const created = await SensorService.createHumidity(humidityData);
      return res.status(201).json(created);
    } catch (error) {
      throw error;
    }
  },

  getHumidityByPackage: async (req: SensorParamsRequest, res: Response) => {
    try {
      const packageId = parseInt(req.params.packageId);
      const readings = await SensorService.getHumidityByPackage(packageId);
      return res.status(200).json(readings);
    } catch (error) {
      throw error;
    }
  },

  // Location endpoints
  createLocation: async (req: Request<{}, {}, LocationSensor>, res: Response) => {
    try {
      const locationData: LocationSensor = req.body;
      const created = await SensorService.createLocation(locationData);
      return res.status(201).json(created);
    } catch (error) {
      throw error;
    }
  },

  getLocationByPackage: async (req: SensorParamsRequest, res: Response) => {
    try {
      const packageId = parseInt(req.params.packageId);
      const readings = await SensorService.getLocationByPackage(packageId);
      return res.status(200).json(readings);
    } catch (error) {
      throw error;
    }
  },

  // Get all sensor data for a package
  getAllSensorsByPackage: async (req: SensorParamsRequest, res: Response) => {
    try {
      const packageId = parseInt(req.params.packageId);
      const allSensors = await SensorService.getAllSensorsByPackage(packageId);
      return res.status(200).json(allSensors);
    } catch (error) {
      throw error;
    }
  },

  // Get latest readings for a package
  getLatestReadings: async (req: SensorParamsRequest, res: Response) => {
    try {
      const packageId = parseInt(req.params.packageId);
      const latest = await SensorService.getLatestReadings(packageId);
      return res.status(200).json(latest);
    } catch (error) {
      throw error;
    }
  },
};

export default SensorController;
