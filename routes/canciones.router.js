import { Router } from "express";
import CancionesController from "../controllers/canciones.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/", verifyToken, verifyAdmin, CancionesController.create);
router.put("/", verifyToken, verifyAdmin, CancionesController.update);
router.delete("/", verifyToken, verifyAdmin, CancionesController.remove);

export default router;
