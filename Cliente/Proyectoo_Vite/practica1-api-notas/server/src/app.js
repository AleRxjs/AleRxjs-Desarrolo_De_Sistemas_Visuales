import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notasRoutes from "./src/rutas/notas.rutas.js"; 
import conectarBD from "./bd.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a BD
conectarBD();

// Rutas
app.use("/api/notas", notasRoutes);
// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
