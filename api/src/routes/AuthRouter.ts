import AuthController from "@/controllers/AuthController.js";
import AuthValidator from "@/validators/AuthValidator.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", AuthValidator.signUp.body, AuthController.signUp);

router.post("/sign-in", AuthValidator.signIn.body, AuthController.signIn);

export default router;
