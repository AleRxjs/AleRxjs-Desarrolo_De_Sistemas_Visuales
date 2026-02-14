import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Ticket, Play, Clock, Calendar, Tag, ArrowLeft, X, Download, ShieldCheck, Crown, User, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from "jspdf";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); 
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // --- FORMULARIO DINÁMICO ---
  const [formData, setFormData] = useState({
    fullName: '',
    tickets: 1,
    date: '',
    zone: ''
  });

  // EFECTO DE RESETEO: Cada vez que el ID de la peli o el usuario cambien
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        tickets: 1,
        date: '',
        zone: user.role === 'vip' ? 'VIP Gold' : 'General'
      });
    }
  }, [id, user]); 

  // Carga de películas
  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies') || '[]');
    const sampleMovies = [
      { id: '1', title: 'La Noche Estelar', year: '2023', duration: '124 min', genre: 'Drama', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80', description: 'Una odisea visual a través de los sueños y la realidad.' },
      { id: '2', title: 'Cyberpunk City', year: '2049', duration: '145 min', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80', description: 'Un futuro distópico y una conspiración tecnológica.' },
      { id: '3', title: 'El Último Frame', year: '2024', duration: '98 min', genre: 'Documental', poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80', description: 'La historia de los cines que resistieron la era digital.' }
    ];
    const allMovies = [...localMovies, ...sampleMovies];
    const found = allMovies.find(m => m.id.toString() === id.toString());
    setMovie(found);
    setLoading(false);
  }, [id]);

  const downloadTicketPDF = () => {
    const doc = new jsPDF();
    const role = user?.role || 'client';
    const themeColor = role === 'vip' ? [255, 180, 58] : role === 'admin' ? [220, 38, 38] : [255, 255, 255];
    
    doc.setFillColor(10, 11, 15); doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(themeColor[0], themeColor[1], themeColor[2]);
    doc.setFontSize(26);
    doc.text("MIDNIGHT CINEMA", 105, 40, { align: 'center' });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`TICKET DE ACCESO: ${role.toUpperCase()}`, 105, 60, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Cinta: ${movie.title}`, 30, 85);
    doc.text(`Titular: ${formData.fullName}`, 30, 95);
    doc.text(`Zona: ${formData.zone}`, 30, 105);
    doc.text(`Fecha: ${formData.date || 'Sin fecha'}`, 30, 115);
    doc.save(`Ticket_${movie.title}.pdf`);
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    alert(`✨ ¡Reserva Exitosa!\nPelícula: ${movie.title}\nCinéfilo: ${formData.fullName}`);
    
    // Limpiamos solo los campos variables después de comprar
    setFormData(prev => ({ ...prev, tickets: 1, date: '' }));
    setShowBookingModal(false);
  };

  if (loading) return <div className="min-h-screen bg-midnight flex items-center justify-center text-gold">Cargando...</div>;
  if (!movie) return <div className="min-h-screen bg-midnight text-white text-center p-20">No encontrada</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-midnight text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/movies')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-gold font-bold uppercase text-xs tracking-widest group">
          <ArrowLeft className="w-4 h-4" /> Volver a Cartelera
        </button>

        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-surface rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[400px] h-[500px] lg:h-auto overflow-hidden">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-4">{movie.title}</h1>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="flex items-center gap-2 text-gold bg-gold/10 px-3 py-1 rounded-lg border border-gold/20 font-bold text-xs"><Calendar size={14}/> {movie.year}</span>
                <span className="flex items-center gap-2 text-gray-400 font-bold text-xs"><Clock size={14} className="text-gold"/> {movie.duration}</span>
                <span className="flex items-center gap-2 text-gray-400 font-bold text-xs"><Tag size={14} className="text-gold"/> {movie.genre}</span>
              </div>
              <p className="text-gray-400 text-lg mb-10 italic">"{movie.description}"</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    onClick={() => setShowBookingModal(true)}
                    className="flex-1 bg-gold text-midnight font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Ticket className="w-5 h-5" /> ADQUIRIR ENTRADAS
                  </motion.button>
                </div>

                {/* BOTÓN DE EDICIÓN */}
                {(user?.role === 'editor' || user?.role === 'admin') && (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(`/admin/edit-movie/${id}`)}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl uppercase italic tracking-tighter"
                  >
                    <Edit3 size={20} /> Editar Información
                  </motion.button>
                )}

                <motion.button 
                  onClick={downloadTicketPDF}
                  whileHover={{ y: -2 }}
                  className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 border-2 border-dashed
                    ${user?.role === 'vip' ? 'bg-gold text-midnight border-amber-600' : 'bg-midnight text-gold border-gold/40'}`}
                >
                  <Download size={20} /> DESCARGAR TICKET PDF
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE RESERVA */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-midnight/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-surface border border-gold/20 p-8 rounded-[2.5rem] max-w-md w-full relative">
              <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-gold"><X/></button>
              
              <h2 className="text-2xl font-black italic uppercase text-white mb-6">Reservar para {movie.title}</h2>
              
              <form onSubmit={handleConfirmReservation} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Nombre Completo</label>
                  <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Entradas</label>
                    <input type="number" min="1" max="10" required value={formData.tickets} onChange={(e) => setFormData({...formData, tickets: e.target.value})} className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Zona</label>
                    <select value={formData.zone} onChange={(e) => setFormData({...formData, zone: e.target.value})} className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white outline-none text-sm">
                      <option>General</option>
                      <option>VIP Gold</option>
                      {user?.role === 'admin' && <option>Palco Staff</option>}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Fecha</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-midnight border border-white/10 rounded-xl p-4 text-white outline-none" />
                </div>

                <motion.button whileHover={{ scale: 1.02 }} type="submit" className="w-full bg-gold text-midnight font-black py-4 rounded-xl mt-4 uppercase text-xs tracking-widest">
                  Confirmar Reserva
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MovieDetail;