import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import AdminPanel from './pages/AdminPanel'; 
import PurchaseTicket from './pages/PurchaseTicket'; 
import AddMovieForm from './pages/AddMovieForm';
// --- IMPORTANTE: FALTA ESTA LÍNEA ---
import EditMovieForm from './pages/EditMovieForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-midnight text-white font-sans">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* RUTAS PROTEGIDAS BÁSICAS */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
            <Route path="/movies/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} />
            <Route path="/purchase/:id" element={<ProtectedRoute><PurchaseTicket /></ProtectedRoute>} />

            {/* RUTA PARA AGREGAR PELÍCULA (ADMIN) */}
            <Route path="/admin/add-movie" element={
              <ProtectedRoute requireAdmin={true}>
                <AddMovieForm />
              </ProtectedRoute>
            } />

            {/* --- AQUÍ ESTÁ EL TRUCO: RUTA DE EDICIÓN --- */}
            {/* La dejamos sin 'requireAdmin' para que el EDITOR también entre */}
            <Route path="/admin/edit-movie/:id" element={
              <ProtectedRoute>
                <EditMovieForm />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;