import { useState, useEffect } from "react";
import "./SessionForm.css";

interface SessionData {
  name: string;
  email: string;
  timestamp: number;
}

export default function SessionForm() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Cargar sesión del localStorage al montar
  useEffect(() => {
    const savedSession = localStorage.getItem("userSession");
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
      } catch (error) {
        console.error("Error al cargar sesión:", error);
        setSession(null);
      }
    }
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    const newSession: SessionData = {
      name: formData.name,
      email: formData.email,
      timestamp: Date.now(),
    };

    localStorage.setItem("userSession", JSON.stringify(newSession));
    setSession(newSession);
    setFormData({ name: "", email: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setSession(null);
    setFormData({ name: "", email: "" });
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="session-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="loading-text">CARGANDO...</p>
        </div>
      </div>
    );
  }

  // LAYOUT: Sesión Activa
  if (session) {
    return (
      <div className="session-container">
        <div className="session-card">
          <div className="session-header">
            <h1 className="session-title">SESIÓN ACTIVA</h1>
          </div>

          <div className="session-content">
            <div className="session-info">
              <div className="info-group">
                <label className="info-label">USUARIO</label>
                <p className="info-value">{session.name}</p>
              </div>

              <div className="info-group">
                <label className="info-label">EMAIL</label>
                <p className="info-value">{session.email}</p>
              </div>

              <div className="info-group">
                <label className="info-label">FECHA DE INICIO</label>
                <p className="info-value date">
                  {formatDate(session.timestamp)}
                </p>
              </div>
            </div>

            <div className="session-actions">
              <button className="btn btn-primary" onClick={handleLogout}>
                ✕ CERRAR SESIÓN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LAYOUT: Formulario de Login
  return (
    <div className="session-container">
      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">INICIAR SESIÓN</h1>
        </div>

        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">NOMBRE DE USUARIO</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tu nombre completo..."
              className="form-input"
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label className="form-label">CORREO ELECTRÓNICO</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu.email@ejemplo.com..."
              className="form-input"
              maxLength={100}
            />
          </div>

          <button type="submit" className="btn btn-submit">
            INICIAR SESIÓN
          </button>
        </form>


      </div>
    </div>
  );
}
