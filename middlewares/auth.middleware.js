// auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Usuario } from "../models/models.js";

// Middleware para verificar token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Falta token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos la info del token en req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// Middleware para verificar que sea admin
export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user?.id) return res.status(401).json({ error: "Sin usuario" });

    // Buscamos el usuario en la base de datos
    const user = await Usuario.findByPk(req.user.id, { attributes: ["id", "rol"] });

    if (!user) return res.status(404).json({ error: "Usuario no existe" });

    // Dependiendo de la configuración de Sequelize, puede ser user.rol o user.dataValues.rol
    const role = user.rol || user.dataValues?.rol;

    if (role !== "admin") return res.status(403).json({ error: "Requiere rol admin" });

    next(); // Todo ok, sigue a la ruta
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
