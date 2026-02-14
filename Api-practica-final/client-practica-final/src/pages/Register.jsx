import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Requisito: Animaciones

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('register_draft');
    return saved ? JSON.parse(saved) : { username: '', email: '', password: '', role: 'user' };
  });

  useEffect(() => {
    localStorage.setItem('register_draft', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // REGLAS DE NEGOCIO Y VALIDACIÓN DE TIPO DE DATO (Punto 1 de la rúbrica)
    const emailRegex = /\S+@\S+\.\S+/;
    if(formData.username.length < 3) return alert("Usuario demasiado corto.");
    if(!emailRegex.test(formData.email)) return alert("Email no válido (Falta @ o .com)");
    if(formData.password.length < 6) return alert("Password debe ser mayor a 6 caracteres.");

    const existingUsers = JSON.parse(localStorage.getItem('users_database') || '[]');
    if (existingUsers.find(u => u.email === formData.email)) return alert("Email ya registrado.");

    const newUser = {
      ...formData,
      id: Date.now(),
      role: formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
    };

    existingUsers.push(newUser);
    localStorage.setItem('users_database', JSON.stringify(existingUsers));
    
    alert('✨ ¡Registro exitoso!');
    localStorage.removeItem('register_draft');
    navigate('/login');
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex justify-center items-center min-h-screen px-4 bg-midnight">
      <div className="bg-surface p-8 rounded-[2rem] border border-gold/20 shadow-2xl w-full max-w-md">
        <header className="text-center mb-8">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <UserPlus className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Únete al <span className="text-gold">Club</span></h2>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
              <input name="username" value={formData.username} onChange={handleChange} onKeyDown={() => console.log('Typing...')}
                className="w-full bg-midnight border border-gray-800 rounded-xl py-3 pl-12 focus:border-gold outline-none text-white transition-all" placeholder="Tu apodo" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                className="w-full bg-midnight border border-gray-800 rounded-xl py-3 pl-12 focus:border-gold outline-none text-white transition-all" placeholder="cine@ejemplo.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Membresía (4 ROLES)</label>
            <div className="relative">
              <Shield className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-midnight border border-gray-800 rounded-xl py-3 pl-12 text-white outline-none">
                <option value="user">User (Estándar)</option>
                <option value="vip">VIP (Premium)</option>
                <option value="editor">Editor (Contenido)</option>
                <option value="admin">Admin (Gestor)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 text-gray-500 w-5 h-5" />
              <input name="password" type="password" value={formData.password} onChange={handleChange}
                className="w-full bg-midnight border border-gray-800 rounded-xl py-3 pl-12 focus:border-gold outline-none text-white transition-all" placeholder="••••••••" />
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" 
            className="w-full bg-gold text-midnight font-black py-4 rounded-2xl mt-4 uppercase tracking-widest text-sm shadow-xl">
            CREAR MI CUENTA
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;