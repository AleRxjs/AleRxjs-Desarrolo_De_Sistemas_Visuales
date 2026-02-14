const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Añadimos 'updateMovie' a la lista de funciones importadas del controlador
const { 
    getMovies, 
    createMovie, 
    getMovieById, 
    updateMovie // <--- Esta es la que acabamos de crear en el controlador
} = require('../controllers/movieController');

// --- RUTAS PÚBLICAS ---
router.get('/', getMovies); 
router.get('/:id', getMovieById); 

// --- RUTAS PROTEGIDAS (RBAC) ---
// Para crear una película nueva
router.post('/', protect, authorize('admin', 'editor'), createMovie); 

// NUEVA RUTA: Para editar una película existente (Punto clave de la rúbrica)
// Usamos .put porque estamos actualizando datos existentes en Mongo
router.put('/:id', protect, authorize('admin', 'editor'), updateMovie); 

module.exports = router;