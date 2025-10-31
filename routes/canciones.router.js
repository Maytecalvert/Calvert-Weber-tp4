import { Router } from "express";
import CancionesController from "../controllers/canciones.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/role.middleware.js";
const router = Router();

router.post("/", verifyToken, role(), CancionesController.create);
router.put("/", verifyToken, role(), CancionesController.update);
router.delete("/", verifyToken, role(), CancionesController.remove);

export default router;
