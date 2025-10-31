import CancionesService from "../services/canciones.service.js";

const create = async (req, res) => {
  try { const { nombre } = req.body; res.status(201).json(await CancionesService.create(nombre)); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

const update = async (req, res) => {
  try { const { id, nombre } = req.body; res.json(await CancionesService.update(id, nombre)); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

const remove = async (req, res) => {
  try { const { id } = req.body; await CancionesService.remove(id); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

export default { create, update, remove };
