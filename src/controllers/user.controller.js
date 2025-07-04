const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchError = require('../utils/catchError');
const User = require('../models/User');
const createController = require('./createController');

// Crear controlador base para User
const baseController = createController('User');

// ✅ Registro personalizado (con confirmación y hash de contraseña)
const create = catchError(async (req, res) => {
  const { contraseña, confirmPassword, ...rest } = req.body;

  if (confirmPassword && contraseña !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  const hashedPassword = await bcrypt.hash(contraseña, 10);
  const user = await User.create({ ...rest, contraseña: hashedPassword });

  return res.status(201).json(user);
});

// ✅ Login (devuelve token JWT)
const login = catchError(async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  const user = await User.findOne({ where: { correoElectronico } });
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const isValid = await bcrypt.compare(contraseña, user.contraseña);
  if (!isValid) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return res.json({ user, token });
});

// ✅ Logout
const logout = catchError(async (_req, res) => {
  return res.json({ message: 'Sesión cerrada con éxito' });
});

// ✅ Exportar todo
module.exports = {
  ...baseController, // getAll, getOne, update, remove
  create,            // sobrescribe create para validar y hashear
  login,
  logout,
};
