import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/crearusuario", authController.crearUsuario);
router.post("/login", authController.login);
router.get("/escucho", verifyToken, authController.escucho);

export default router;
