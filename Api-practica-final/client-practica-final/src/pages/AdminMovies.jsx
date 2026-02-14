import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Film, Plus, Image as ImageIcon, Calendar, Tag, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminMovies = () => {
  const { user } = useContext(AuthContext);
  
  // Estado inicial con borrador de LocalStorage
  const [movieData, setMovieData] = useState(() => {
    const saved = localStorage.getItem('admin_movie_draft');
    return saved ? JSON.parse(saved) : { title: '', year: '', genre: '', poster: '', description: '' };
  });

  // Guardar borrador automáticamente
  useEffect(() => {
    localStorage.setItem('admin_movie_draft', JSON.stringify(movieData));
  }, [movieData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de reglas de negocio
    if (movieData.year < 1895 || movieData.year > 2030) {
      return alert("Año de estreno no válido.");
    }

    // Persistencia en "Base de Datos" local
    const currentMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    const newMovie = { ...movieData, id: Date.now() };
    
    localStorage.setItem('movies', JSON.stringify([...currentMovies, newMovie]));
    
    alert("🚀 Película registrada y persistida en el sistema.");
    localStorage.removeItem('admin_movie_draft');
    setMovieData({ title: '', year: '', genre: '', poster: '', description: '' });
  };

  if (user?.role !== 'Admin') {
    return <div className="text-white p-20 text-center">Acceso denegado. Se requiere nivel Administrador.</div>;
  }

  return (
    <div className="min-h-screen bg-midnight p-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto bg-surface p-10 rounded-[2.5rem] border border-gold/10 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gold p-3 rounded-2xl">
            <Film className="text-midnight" size={28} />
          </div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Panel de <span className="text-gold">Gestión</span></h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Título de la Obra</label>
              <input 
                required
                className="w-full bg-midnight border border-white/5 rounded-xl p-4 text-white focus:border-gold outline-none transition-all"
                value={movieData.title}
                onChange={(e) => setMovieData({...movieData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Año de Estreno</label>
              <input 
                type="number"
                required
                className="w-full bg-midnight border border-white/5 rounded-xl p-4 text-white focus:border-gold outline-none transition-all"
                value={movieData.year}
                onChange={(e) => setMovieData({...movieData, year: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">URL del Poster (Imagen)</label>
            <input 
              type="url"
              placeholder="https://..."
              required
              className="w-full bg-midnight border border-white/5 rounded-xl p-4 text-white focus:border-gold outline-none transition-all"
              value={movieData.poster}
              onChange={(e) => setMovieData({...movieData, poster: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sinopsis</label>
            <textarea 
              rows="3"
              className="w-full bg-midnight border border-white/5 rounded-xl p-4 text-white focus:border-gold outline-none transition-all resize-none"
              value={movieData.description}
              onChange={(e) => setMovieData({...movieData, description: e.target.value})}
            ></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gold text-midnight font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-gold/5 uppercase tracking-widest text-sm"
          >
            <Save size={20} /> Guardar en Base de Datos
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminMovies;