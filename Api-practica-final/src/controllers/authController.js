const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "Usuario registrado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    res.json({ username: user.username, role: user.role });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
};

exports.me = (req, res) => {
  // protect middleware decodes token and sets req.user
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });
  res.json({ id: req.user.id, role: req.user.role });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};