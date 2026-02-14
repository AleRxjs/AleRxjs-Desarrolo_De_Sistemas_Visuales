import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useContext(AuthContext); // Función del contexto para guardar la sesión
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(() => localStorage.getItem('login_email_draft') || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('login_email_draft', email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Petición a la API de tu Backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Si las credenciales son correctas (Backend validó con bcrypt)
        alert(`¡Bienvenido de nuevo, ${data.username}!`);
        
        // Guardamos en el contexto de Auth de React
        login({ name: data.username, role: data.role });
        
        localStorage.removeItem('login_email_draft');
        navigate('/dashboard'); // O a la ruta que prefieras
      } else {
        // 3. El Backend respondió "Credenciales incorrectas"
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. Verifica que el Backend esté en el puerto 5000.");
    }
  };

  return (
    <motion.div initial={{scale: 0.9}} animate={{scale: 1}} className="min-h-screen flex items-center justify-center bg-midnight px-4">
      <div className="bg-surface p-8 rounded-[2rem] border border-gold/20 shadow-2xl w-full max-w-md">
        <header className="text-center mb-8">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/20">
            <LogIn className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Iniciar <span className="text-gold">Sesión</span></h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-600 w-5 h-5" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-midnight border border-gray-800 rounded-xl py-3.5 pl-12 text-white focus:border-gold outline-none" placeholder="tu@email.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-600 w-5 h-5" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-midnight border border-gray-800 rounded-xl py-3.5 pl-12 text-white focus:border-gold outline-none" placeholder="••••••••" />
            </div>
          </div>

          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} type="submit"
            className="w-full bg-gold text-midnight font-black py-4 rounded-2xl uppercase tracking-widest text-sm">
            ENTRAR AL CINE
          </motion.button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-500">
          ¿No tienes cuenta? <Link to="/register" className="text-gold font-bold">Regístrate</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;