import EscuchasService from "../services/escuchas.service.js";

const registrar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cancionId } = req.body;

    if (!cancionId) {
      return res.status(400).json({ message: "Falta id de canción" });
    }
    
    const row = await EscuchasService.registrar(userId, cancionId);

    res.status(201).json(row);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default { registrar };

