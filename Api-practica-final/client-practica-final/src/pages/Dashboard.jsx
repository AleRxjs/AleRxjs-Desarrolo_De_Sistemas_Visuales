import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Film, Star, ShieldCheck, LogOut, Clapperboard, Ticket, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight text-gold font-sans">
        <p className="text-xl font-bold italic tracking-widest">ACCESO DENEGADO</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight p-6 font-sans text-white">
      {/* Navbar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 border-b border-gold/10 pb-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="text-gold w-8 h-8" />
          <h1 className="text-2xl font-black tracking-tighter">MIDNIGHT <span className="text-gold">CINEMA</span></h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-all text-sm font-bold uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" /> Salir
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h2 className="text-5xl font-black mb-3">Hola, <span className="text-gold">{user.name}</span></h2>
          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 bg-gold/10 text-gold border border-gold/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              Suscripción: {user.role}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. CARTELERA */}
          <div className="bg-surface p-6 rounded-3xl border border-white/5 hover:border-gold/20 transition-all group cursor-pointer" 
               onClick={() => navigate('/movies')}>
            <Film className="text-gold mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Cartelera</h3>
            <p className="text-gray-500 text-xs mb-4">Explora los últimos estrenos.</p>
            <span className="text-gold text-[10px] font-black uppercase tracking-widest">Explorar →</span>
          </div>

          {/* 2. COMPRAR TICKET (Formulario 3 de 4) */}
          <div className="bg-surface p-6 rounded-3xl border border-white/5 hover:border-gold/20 transition-all group cursor-pointer" 
               onClick={() => navigate('/purchase/default')}>
            <Ticket className="text-gold mb-4 w-8 h-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Comprar</h3>
            <p className="text-gray-500 text-xs mb-4">Reserva tus asientos ahora.</p>
            <span className="text-gold text-[10px] font-black uppercase tracking-widest">Reservar →</span>
          </div>

          {/* 3. VIP CONTENT (RBAC) */}
          {(user.role === 'vip' || user.role === 'admin') && (
            <div className="bg-surface p-6 rounded-3xl border border-gold/20 relative overflow-hidden group">
              <Star className="text-gold mb-4 w-8 h-8 group-hover:rotate-12 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-gold">Exclusive</h3>
              <p className="text-gray-500 text-xs">Contenido preventa disponible.</p>
            </div>
          )}

          {/* 4. ADMIN PANEL (RBAC + Formulario 4 de 4) */}
          {user.role === 'admin' && (
            <div className="bg-gold p-6 rounded-3xl text-midnight flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div>
                <PlusCircle className="mb-4 w-8 h-8" />
                <h3 className="text-xl font-black mb-1 uppercase italic">Gestión</h3>
                <p className="text-midnight/70 text-[10px] font-bold leading-tight">Añadir nuevas cintas al sistema.</p>
              </div>
              <button 
                onClick={() => navigate('/admin/add-movie')}
                className="mt-4 bg-midnight text-white w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
              >
                Nueva Película
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;