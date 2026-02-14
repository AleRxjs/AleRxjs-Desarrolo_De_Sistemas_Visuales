const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Simularemos que estas funciones existen en el controlador
const { getMovies, createMovie } = require('../controllers/movieController');

router.get('/', getMovies); // Público: Todos ven películas
router.post('/', protect, authorize('admin', 'editor'), createMovie); // Solo Admin o Editor

module.exports = router;