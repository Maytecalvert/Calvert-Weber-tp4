import EscuchasService from "../services/escuchas.service.js";

const registrar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body; // id de canción
    const row = await EscuchasService.registrar(userId, id);
    res.status(201).json(row);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export default { registrar };
