import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarBD = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("ERROR: No existe MONGO_URI en el archivo .env");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI, {
            // Opciones opcionales modernas, no son obligatorias
        });

        console.log("Base de datos conectada correctamente");
    } catch (error) {
        console.error("Error al conectar la base de datos:", error.message);
        process.exit(1);
    }
};

export default conectarBD;
