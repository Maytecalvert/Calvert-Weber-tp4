import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./config/dbconfig.js";
import "./models/index.js"; 

import AuthRouter from "./routes/auth.router.js";
import CancionesRouter from "./routes/canciones.router.js";
import EscuchasRouter from "./routes/escuchas.router.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (_, res) => res.send("API TP4 Sequelize (solo ORM)"));
app.use("/auth", AuthRouter);
app.use("/cancion", CancionesRouter);
app.use("/escucho", EscuchasRouter);

// Inicialización de la BD
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    await sequelize.sync({ alter: true }); 
    console.log("Tablas sincronizadas con la base de datos.");

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al iniciar la base de datos:", error);
  }
};

start();
