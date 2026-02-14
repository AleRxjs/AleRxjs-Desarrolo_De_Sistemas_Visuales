const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: "Datos de película inválidos" });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- NUEVA FUNCIÓN: REQUISITO DE PERSISTENCIA EN MONGO ---
exports.updateMovie = async (req, res) => {
    try {
        // Buscamos por ID y actualizamos con los datos que vienen del formulario (req.body)
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // 'new: true' devuelve la peli ya editada
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'No se encontró la película para actualizar' });
        }

        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la base de datos", details: error.message });
    }
};