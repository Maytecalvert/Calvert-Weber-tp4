import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Usuario } from "../models/index.js";

export const verifyToken = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "Falta token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Sin usuario" });
    const user = await Usuario.findByPk(req.user.id, { attributes: ["id","rol"] });
    if (!user) return res.status(404).json({ error: "Usuario no existe" });
    if (user.rol !== "admin") return res.status(403).json({ error: "Requiere rol admin" });
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
