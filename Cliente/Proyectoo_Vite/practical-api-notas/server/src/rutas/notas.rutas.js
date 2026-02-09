const express = require("express");
const Nota = require("../modelos/nota");

const router = express.Router();

// Mensaje de bienvenida/estado de la ruta raíz del router
router.get("/status", (req, res) => {
    res.send("API de notas funcionando 🚀");
});

// Crear nota
router.post("/", async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto || texto.trim().length < 5) {
            return res.status(400).json({
                mensaje: "El texto debe tener al menos 5 caracteres."
            });
        }

        const notaCreada = await Nota.create({
            texto: texto.trim()
        });

        return res.status(201).json(notaCreada);

    } catch (error) {
        console.error("Error al crear nota:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notas = await Nota.find().sort({ createdAt: -1 });
        return res.status(200).json(notas);
    } catch (error) {
        console.error("Error al obtener notas:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

module.exports = router;