import authService from "../services/auth.service.js";
import EscuchasService from "../services/escuchas.service.js"; 

const crearUsuario = async (req, res) => {
  try {
    const { id, nombre, password, rol } = req.body; // <-- agregamos rol opcional
    console.log(req.body);

    if (!id || !nombre || !password) {
      return res.status(400).json({ message: "Faltan campos" });
    }

    console.log(id, nombre, password, rol);

    // Pasamos rol opcional al servicio
    const user = await authService.crearUsuario(id, nombre, password, rol);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password)
      return res.status(400).json({ message: "Faltan credenciales" });

    const token = await authService.login(id, password);
    res.json({ token });
  } catch (e) {
    res.status(e.code || 500).json({ message: e.message });
  }
};

const escucho = async (req, res) => {
  try {
    const list = await authService.escuchoListado(req.user.id);
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const registrarEscucha = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cancionId } = req.body;

    if (!cancionId) return res.status(400).json({ message: "Falta id de canción" });

    const escucha = await EscuchasService.registrar(userId, cancionId);
    res.status(201).json(escucha);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default { crearUsuario, login, escucho, registrarEscucha };
