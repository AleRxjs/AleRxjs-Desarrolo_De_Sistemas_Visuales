const { Router } = require('express');
const router = Router();
const Mensaje = require('../models/whats'); // <--- Tu archivo de modelo

let mensajes = []; // Tu base de datos temporal

router.get('/notas', (req, res) => {
    res.json(mensajes);
});

router.post('/notas', (req, res) => {
    const { usuario, texto } = req.body;
    const nuevaNota = new Mensaje(mensajes.length + 1, usuario, texto);
    mensajes.push(nuevaNota);
    res.status(201).json(nuevaNota);
});

module.exports = router;