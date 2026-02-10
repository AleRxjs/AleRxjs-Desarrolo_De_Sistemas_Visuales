const express = require('express');
const cors = require('cors');
const notas = require('./src/notas');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sirve el FrontEnd

// GET: Obtener todas las notas
app.get('/api/notas', (req, res) => {
    console.log("LOG: GET solicitado");
    res.json(notas);
});

// POST: Crear una nueva nota
app.post('/api/notas', (req, res) => {
    const nuevaNota = {
        id: notas.length + 1,
        autor: req.body.autor || "Anónimo",
        contenido: req.body.contenido
    };
    notas.push(nuevaNota);
    console.log("LOG: POST recibido:", nuevaNota);
    res.status(201).json(nuevaNota);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});