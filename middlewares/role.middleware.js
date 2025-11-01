import dotenv from "dotenv";
import db from "../services/auth.service.js";
dotenv.config();


async function getRole(id) {
  return await db.verifyRole(id);
}

function role() {
  return async (req, res, next) => {
    try {
      console.log(req.user);

      if (!req.user || !req.user.id) {
        return res.status(401).send("Usuario no autenticado");
      }

      const userRole = await getRole(req.user.id); 
      console.log("Rol del usuario:", userRole);

      if (userRole !== "admin") {
        return res.status(401).send("No está autorizado");
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: "Invalid role", detail: err.message });
    }
  };
}

export { role };
