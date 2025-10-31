import { Escucha } from "../models/models.js";

const registrar = async (usuarioId, cancionId) => {
  const e = await Escucha.create({ usuarioid: usuarioId, cancionid: cancionId, fechaEscucha: new Date() });
  return e.toJSON();
};

export default { registrar };
