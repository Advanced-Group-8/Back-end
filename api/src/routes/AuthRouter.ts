import AuthController from "@/controllers/AuthController.js";
import AuthValidator from "@/validators/AuthValidator.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", AuthValidator.signUp.body, AuthController.signUp);

router.post("/sign-in", AuthValidator.signIn.body, AuthController.signIn);

// Endpoint to get info about the logged-in user
router.get("/me", AuthMiddleware.authenticate, AuthController.getMe);

export default router;
