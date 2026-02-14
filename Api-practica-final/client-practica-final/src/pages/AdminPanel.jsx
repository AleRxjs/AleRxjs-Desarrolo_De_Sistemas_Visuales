import React, { useState, useEffect, useRef } from 'react';
import { Film, Save, Image as ImageIcon, Calendar, Clock, Tag, AlignLeft } from 'lucide-react';

const DRAFT_KEY = 'admin_new_movie_draft';
const MOVIES_KEY = 'movies';

const AdminPanel = () => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved
      ? JSON.parse(saved)
      : { title: '', poster: '', description: '', year: '', genre: '', duration: '' };
  });

  const [savedMsg, setSavedMsg] = useState('');
  const timer = useRef(null);

  // Guardado automático del borrador
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSavedMsg('Autoguardado...');
    
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSavedMsg('Borrador listo'), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos mínimos
    if (!form.title || !form.poster) return alert("Mínimo necesitas título y poster.");

    // LÓGICA LOCAL (Para que funcione ya mismo)
    const currentMovies = JSON.parse(localStorage.getItem(MOVIES_KEY) || '[]');
    const newMovie = { 
      id: Date.now().toString(), 
      ...form,
      year: form.year || '2024' // Fallback por si no ponen año
    };
    
    // Añadimos al inicio de la lista
    localStorage.setItem(MOVIES_KEY, JSON.stringify([newMovie, ...currentMovies]));
    
    // Limpiar todo
    localStorage.removeItem(DRAFT_KEY);
    setForm({ title: '', poster: '', description: '', year: '', genre: '', duration: '' });
    setSavedMsg('✅ ¡Película añadida con éxito!');
    
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-midnight p-8 text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gold flex items-center gap-3 italic tracking-tighter">
              <Film className="w-10 h-10" /> ADMIN PANEL
            </h1>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em] mt-2">Gestión de Cartelera</p>
          </div>
          <span className="text-xs font-mono text-gold/50 bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
            {savedMsg || 'Esperando cambios...'}
          </span>
        </header>

        <div className="bg-surface p-8 rounded-3xl border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Título */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                <Tag className="w-3 h-3 text-gold" /> Título de la Obra
              </label>
              <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                placeholder="Ej: El Padrino"
                className="w-full bg-midnight border border-gray-800 rounded-xl p-3.5 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all font-medium" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Poster */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-3 h-3 text-gold" /> URL del Poster
                </label>
                <input 
                  name="poster" 
                  value={form.poster} 
                  onChange={handleChange} 
                  placeholder="https://..."
                  className="w-full bg-midnight border border-gray-800 rounded-xl p-3.5 focus:border-gold outline-none transition-all font-medium text-sm" 
                />
              </div>

              {/* Año y Género */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gold" /> Año
                  </label>
                  <input name="year" value={form.year} onChange={handleChange} placeholder="2024" className="w-full bg-midnight border border-gray-800 rounded-xl p-3.5 focus:border-gold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gold" /> Duración
                  </label>
                  <input name="duration" value={form.duration} onChange={handleChange} placeholder="120 min" className="w-full bg-midnight border border-gray-800 rounded-xl p-3.5 focus:border-gold outline-none" />
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                <AlignLeft className="w-3 h-3 text-gold" /> Sinopsis
              </label>
              <textarea 
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                rows={4} 
                placeholder="Escribe una breve descripción..."
                className="w-full bg-midnight border border-gray-800 rounded-xl p-3.5 focus:border-gold outline-none transition-all resize-none font-medium" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-hover text-midnight font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-gold/10"
            >
              <Save className="w-5 h-5" /> PUBLICAR EN CARTELERA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;