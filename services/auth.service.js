import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario, Escucha, Cancion } from "../models/models.js";

const crearUsuario = async ({ userid, nombre, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await Usuario.create({ userid, nombre, password: hashed, rol: "usuario" });
  return { id: user.id, userid: user.userid, nombre: user.nombre, rol: user.rol };
};

const login = async ({ userid, password }) => {
  const user = await Usuario.findOne({ where: { userid } });
  if (!user) { const e = new Error("Usuario no encontrado"); e.code = 404; throw e; }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) { const e = new Error("Clave inválida"); e.code = 401; throw e; }
  return jwt.sign({ id: user.id, nombre: user.nombre, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const escuchoListado = async (userId) => {
  const rows = await Escucha.findAll({
    where: { usuarioid: userId },
    include: [{ model: Cancion, attributes: ["id","nombre"] }],
    order: [["fechaEscucha","DESC"]]
  });
  return rows.map(r => ({
    cancionId: r.cancionid,
    cancion: r.cancion?.nombre,
    fechaEscucha: r.fechaEscucha
  }));
};

export default { crearUsuario, login, escuchoListado };
