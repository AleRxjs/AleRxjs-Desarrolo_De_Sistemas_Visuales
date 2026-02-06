import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

export default mongoose.model("Nota", notaSchema);
