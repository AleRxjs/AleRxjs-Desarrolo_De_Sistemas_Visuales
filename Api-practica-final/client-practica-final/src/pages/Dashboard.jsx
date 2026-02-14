import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Corregido: sin "Value"
import { Film, Star, ShieldCheck, LogOut, Clapperboard } from 'lucide-react';
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
    <div className="min-h-screen bg-midnight p-6 font-sans">
      {/* Navbar con estilo Midnight */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cartelera - Acceso para todos */}
          <div className="bg-surface p-8 rounded-3xl border border-white/5 hover:border-gold/20 transition-all group cursor-pointer" 
               onClick={() => navigate('/movies')}>
            <Film className="text-gold mb-6 w-10 h-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-3">Cartelera</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Explora los últimos estrenos y clásicos del cine mundial.</p>
            <span className="text-gold text-xs font-black uppercase tracking-widest group-hover:underline">Explorar →</span>
          </div>

          {/* VIP Content */}
          {(user.role === 'VIP' || user.role === 'Admin') && (
            <div className="bg-surface p-8 rounded-3xl border border-gold/20 shadow-[0_0_30px_rgba(255,180,58,0.02)] relative overflow-hidden">
              <Star className="text-gold mb-6 w-10 h-10" />
              <h3 className="text-2xl font-bold mb-3 text-gold">Exclusive</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Acceso premium a preventas y contenido detrás de cámaras.</p>
            </div>
          )}

          {/* Admin Panel */}
          {user.role === 'Admin' && (
            <div className="bg-gold p-8 rounded-3xl text-midnight flex flex-col justify-between">
              <div>
                <ShieldCheck className="mb-6 w-10 h-10" />
                <h3 className="text-2xl font-black mb-3 italic uppercase">Admin Panel</h3>
                <p className="text-midnight/70 text-sm font-bold leading-relaxed">Gestión total de cintas, usuarios y métricas.</p>
              </div>
              <button 
                onClick={() => navigate('/admin')}
                className="mt-8 bg-midnight text-white w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
              >
                Configurar Sistema
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;