import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import EscuchasController from "../controllers/escuchas.controller.js";
const router = Router();

router.post("/", verifyToken, EscuchasController.registrar);

export default router;
