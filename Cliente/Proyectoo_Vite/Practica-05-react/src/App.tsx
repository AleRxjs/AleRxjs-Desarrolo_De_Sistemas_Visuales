import { useState } from "react";
import "./app.css";

export default function App() {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => setIsOn(!isOn);

  return (
    <div className="app">
      <div className="status-panel">
        <div className="status-item">
          <span className="status-label">Estado:</span>
          <span className={`status-value ${isOn ? "active" : "inactive"}`}>
            {isOn ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>
        <div className="status-item">
          <span className="status-label">Energía:</span>
          <span className="status-value">{isOn ? "100%" : "0%"}</span>
        </div>
      </div>

      <div className="logos">
        <img src="/vite.svg" className="logo" alt="Vite Logo" />
      </div>

      <button className="power-button" onClick={toggleLight}>
        {isOn ? "DESACTIVAR" : "ACTIVAR"}
      </button>

      <div className={`light ${isOn ? "on" : ""}`}></div>
    </div>
  );
}
