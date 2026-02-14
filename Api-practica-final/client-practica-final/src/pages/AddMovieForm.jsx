import React, { useState } from 'react';
import { Film, PlusCircle, Image as ImageIcon } from 'lucide-react';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({ title: '', genre: '', duration: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Regla de negocio: Título no vacío
    if (movie.title.trim() === "") return alert("La película necesita un título.");
    alert("🎬 Película añadida a la base de datos (Simulado)");
  };

  return (
    <div className="bg-midnight p-6 rounded-3xl border-2 border-dashed border-gold/30">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-gold" />
        <h2 className="text-white font-black uppercase">Panel de Control: <span className="text-gold">Nueva Cinta</span></h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input 
          placeholder="Título de la película" 
          className="bg-surface border border-gray-800 p-3 rounded-xl text-white outline-none focus:border-gold"
          onChange={(e) => setMovie({...movie, title: e.target.value})}
        />
        <select className="bg-surface border border-gray-800 p-3 rounded-xl text-white outline-none focus:border-gold">
          <option>Acción / Anime</option>
          <option>Ciencia Ficción</option>
          <option>Drama</option>
        </select>
        <button className="bg-white text-midnight font-black py-3 rounded-xl uppercase hover:bg-gold transition-colors">
          Publicar en Cartelera
        </button>
      </form>
    </div>
  );
};

export default AddMovieForm;