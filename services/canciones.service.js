import { Cancion } from "../models/models.js";

const create = async (nombre) => {
  const c = await Cancion.create({ nombre });
  return c.toJSON();
};

const update = async (id, nombre) => {
  const c = await Cancion.findByPk(id);
  if (!c) throw new Error("Canción no encontrada");
  c.nombre = nombre;
  await c.save();
  return c.toJSON();
};

const remove = async (id) => {
  const c = await Cancion.findByPk(id);
  if (!c) throw new Error("Canción no encontrada");
  await c.destroy();
  return true;
};

export default { create, update, remove };
