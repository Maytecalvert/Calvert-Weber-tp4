import AuthService from "../services/auth.service.js";

const crearUsuario = async (req, res) => {
  try {
    const { userid, nombre, password } = req.body;
    if (!userid || !nombre || !password) return res.status(400).json({ message: "Faltan campos" });
    const user = await AuthService.crearUsuario({ userid, nombre, password });
    res.status(201).json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const login = async (req, res) => {
  try {
    const { userid, password } = req.body;
    if (!userid || !password) return res.status(400).json({ message: "Faltan credenciales" });
    const token = await AuthService.login({ userid, password });
    res.json({ token });
  } catch (e) { res.status(e.code || 500).json({ message: e.message }); }
};

const escucho = async (req, res) => {
  try {
    const list = await AuthService.escuchoListado(req.user.id);
    res.json(list);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export default { crearUsuario, login, escucho };
