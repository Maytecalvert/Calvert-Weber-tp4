import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.router.js";
import cancionesRouter from "./routes/canciones.router.js";
import escuchasRouter from "./routes/escuchas.router.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/cancion", cancionesRouter);
app.use("/escucho", escuchasRouter);
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en puerto ${app.get('port')}`);
  });

