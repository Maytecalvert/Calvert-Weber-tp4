import { Escucha } from "../models/index.js";

const registrar = async (usuarioId, cancionId) => {
  const e = await Escucha.create({ usuarioid: usuarioId, cancionid: cancionId, fechaEscucha: new Date() });
  return e.toJSON();
};

export default { registrar };
