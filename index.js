import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./config/dbconfig.js";
import "./models/models.js"; // importa y registra modelos + relaciones

import AuthRouter from "./routes/auth.router.js";
import CancionesRouter from "./routes/canciones.router.js";
import EscuchasRouter from "./routes/escuchas.router.js";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (_, res) =>
  res.send("API TP4 Sequelize (con relaciones + sync)")
);

// Rutas principales
app.use("/auth", AuthRouter);
app.use("/cancion", CancionesRouter);
app.use("/escucho", EscuchasRouter);

// Inicialización con SYNC
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida correctamente con la base de datos.");

    // 💡 Punto 4 del TP: sincroniza los modelos declarados en Sequelize
    await sequelize.sync(); // crea o actualiza las tablas si es necesario
    console.log("🧩 Modelos sincronizados correctamente con Sequelize.");

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error al iniciar la base de datos:", error);
  }
};

start();
