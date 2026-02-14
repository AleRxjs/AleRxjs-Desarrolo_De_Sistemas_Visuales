import React, { useState, useEffect } from 'react';
import { Film, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Películas fijas por defecto
    const sampleMovies = [
      { id: '1', title: 'La Noche Estelar', year: '2023', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80' },
      { id: '2', title: 'Cyberpunk City', year: '2049', poster: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80' },
      { id: '3', title: 'El Último Frame', year: '2024', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80' },
    ];

    // 2. Traer las películas que creó el Admin del localStorage
    const localMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    
    // 3. Combinarlas (las nuevas primero)
    setMovies([...localMovies, ...sampleMovies]);
  }, []);

  return (
    <div className="min-h-screen bg-midnight p-8 text-white">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-5xl font-black text-gold italic tracking-tighter flex items-center gap-4">
          <Film className="w-12 h-12" /> CARTELERA
        </h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em] mt-2 ml-1">Estrenos Exclusivos Midnight</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((m) => (
          <div key={m.id} className="group bg-surface rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl hover:border-gold/30 transition-all transform hover:-translate-y-2">
            <div className="relative h-80 overflow-hidden">
              <img src={m.poster} alt={m.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="p-6">
              <span className="text-gold text-[10px] font-black tracking-widest uppercase bg-gold/10 px-2 py-1 rounded">Digital 4K</span>
              <h3 className="text-2xl font-bold mt-3 group-hover:text-gold transition-colors">{m.title}</h3>
              <p className="text-gray-500 font-medium">{m.year}</p>
              
              <button 
                onClick={() => navigate(`/movies/${m.id}`)}
                className="mt-6 w-full bg-white/5 text-white border border-white/10 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gold hover:text-midnight hover:border-gold transition-all flex items-center justify-center gap-2"
              >
                <Info className="w-4 h-4" /> Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;