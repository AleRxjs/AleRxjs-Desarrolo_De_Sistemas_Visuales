const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir tu FrontEnd

// Rutas
app.use('/api', require('../routes/whats.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de WhatsApp API corriendo en puerto ${PORT}`);
});