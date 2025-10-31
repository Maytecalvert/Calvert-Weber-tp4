import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/crearusuario", AuthController.crearUsuario);
router.post("/login", AuthController.login);
router.get("/escucho", verifyToken, AuthController.escucho);

export default router;
