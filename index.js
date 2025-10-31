
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

app.get("/", (_, res) => res.send("API TP4 Sequelize (solo ORM)"));
app.use("/auth", AuthRouter);
app.use("/cancion", CancionesRouter);
app.use("/escucho", EscuchasRouter);

app.use((req, res) => {
  res.status(404).json({ Error: "unknown endpoint", Path: req.path });
});

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log("DB conectada y sincronizada (Sequelize).");
  app.listen(process.env.PORT || 9000, () => {
    console.log("Servidor escuchando en puerto", process.env.PORT || 9000);
  });
};

start();


