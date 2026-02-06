import { Router } from "express";
import Nota from "../modelos/nota.js";

const router = Router();

// Crear nueva nota
router.post("/", async (req, res) => {
    try {
        const { titulo, contenido } = req.body;

        if (!titulo || !contenido) {
            return res
                .status(400)
                .json({ mensaje: "Título y contenido son obligatorios." });
        }

        const notaCreada = await Nota.create({
            titulo: titulo.trim(),
            contenido: contenido.trim()
        });

        return res.status(201).json(notaCreada);
    } catch (error) {
        console.error("Error al crear la nota:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

// Obtener todas las notas
router.get("/", async (req, res) => {
    try {
        const notas = await Nota.find().sort({ fecha: -1 });
        return res.status(200).json(notas);
    } catch (error) {
        console.error("Error al obtener las notas:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor." });
    }
});

export default router;
