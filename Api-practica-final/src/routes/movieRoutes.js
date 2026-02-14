const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Controlador de películas
const { getMovies, createMovie, getMovieById } = require('../controllers/movieController');

router.get('/', getMovies); // Público: Todos ven películas
router.get('/:id', getMovieById); // Obtener película por id
router.post('/', protect, authorize('admin', 'editor'), createMovie); // Solo Admin o Editor

module.exports = router;