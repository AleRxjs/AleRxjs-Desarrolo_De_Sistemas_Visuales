// En tu archivo bd.js
const mongoose = require("mongoose");

const conectarBaseDeDatos = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Conectado a MongoDB ✅");
    } catch (error) {
        console.error("Error al conectar a la base de datos ❌:", error.message);
        // Opcional: process.exit(1); // Esto cierra el servidor si no hay BD
    }
};

module.exports = conectarBaseDeDatos;