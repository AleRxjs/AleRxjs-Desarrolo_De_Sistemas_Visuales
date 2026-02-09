require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarBaseDeDatos = require("./bd");
const rutasNotas = require("./rutas/notas.rutas");

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a Mongo
conectarBaseDeDatos(process.env.URI_MONGO);

// Rutas
app.use("/notas", rutasNotas);

// Fallback rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, () => console.log(`Servidor corriendo en puerto ${puerto}`));
