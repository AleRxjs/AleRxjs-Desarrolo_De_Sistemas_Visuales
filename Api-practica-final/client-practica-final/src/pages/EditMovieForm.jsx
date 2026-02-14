import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Film, Info, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

// CONFIGURACIÓN GLOBAL: Vital para el requisito de Cookies
axios.defaults.withCredentials = true;

const EditMovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    description: '',
    duration: '',
    genre: ''
  });

  // 1. CARGA DE DATOS DESDE MONGODB
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Consultamos al endpoint GET /api/movies/:id
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la película:", error);
        alert("No se pudo cargar la información de la base de datos.");
        navigate('/movies');
      }
    };
    fetchMovie();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 2. PERSISTENCIA REAL EN MONGO
      // Enviamos la petición PUT. Axios enviará la Cookie de sesión automáticamente
      await axios.put(`http://localhost:5000/api/movies/${id}`, movie);

      alert("✅ ¡Base de Datos (MongoDB) actualizada con éxito!");
      navigate(`/movies/${id}`);
    } catch (error) {
      // Manejo de errores según RBAC (Si no es Admin o Editor, el servidor rechaza)
      const mensaje = error.response?.data?.message || "Error de red o permisos";
      alert(`❌ Falló la actualización: ${mensaje}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-midnight flex items-center justify-center text-gold italic animate-pulse">
      Sincronizando con la API...
    </div>
  );

  return (
    <div className="min-h-screen bg-midnight p-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-blue-500/30 p-8 rounded-[2rem] max-w-2xl w-full shadow-2xl"
      >
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <ArrowLeft size={14}/> Cancelar y Volver
        </button>

        <h2 className="text-3xl font-black italic uppercase text-white mb-2 flex items-center gap-3">
          <Film className="text-blue-500" /> Editor de Contenido
        </h2>
        <p className="text-gray-400 text-sm mb-8 italic">
          ID de Registro: <span className="text-blue-400">{id}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TÍTULO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Título de la Cinta</label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={movie.title}
                onChange={(e) => setMovie({...movie, title: e.target.value})}
                className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none pl-12 transition-all"
              />
              <Info className="absolute left-4 top-4 text-gray-600" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* AÑO */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Año de Estreno</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={movie.year}
                  onChange={(e) => setMovie({...movie, year: e.target.value})}
                  className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none pl-12"
                />
                <Calendar className="absolute left-4 top-4 text-gray-600" size={18} />
              </div>
            </div>
            {/* DURACIÓN */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Duración (min)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={movie.duration}
                  onChange={(e) => setMovie({...movie, duration: e.target.value})}
                  className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none pl-12"
                />
                <Clock className="absolute left-4 top-4 text-gray-600" size={18} />
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Sinopsis</label>
            <textarea 
              rows="4"
              value={movie.description}
              onChange={(e) => setMovie({...movie, description: e.target.value})}
              className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full bg-blue-600 text-white font-black py-4 rounded-xl mt-4 uppercase text-xs tracking-widest shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Confirmar Cambios en MongoDB
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditMovieForm;