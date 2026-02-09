const express = require('express');
const app = express();

// Importante para recibir datos de Postman y del Front
app.use(express.json()); 

// Cargar tus rutas
const whatsRoutes = require('../routes/whats.routes');
app.use('/api', whatsRoutes);

app.listen(3000, () => console.log("Servidor en puerto 3000"));