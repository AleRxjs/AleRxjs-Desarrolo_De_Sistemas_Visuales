import { useEffect, useState } from "react";
import "./App.css";
import icono from "./assets/icono.svg";

function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    carrera: "",
    telefono: "",
  });

  const [registros, setRegistros] = useState<any[]>([]);
  const [progreso, setProgreso] = useState(0);
  const [animar, setAnimar] = useState(false); // <-- activar animación

  // Cargar registros
  useEffect(() => {
    const saved = localStorage.getItem("registros");
    if (saved) setRegistros(JSON.parse(saved));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  // Inputs
  const handleInput = (e: any) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);

    const total = 4;
    const llenos = Object.values(newData).filter((v) => v !== "").length;
    setProgreso(Math.round((llenos / total) * 100));
  };

  // Guardar registro + animación
  const agregarRegistro = () => {
    if (!formData.nombre || !formData.edad || !formData.carrera || !formData.telefono) return;

    setRegistros([...registros, formData]);
    setFormData({ nombre: "", edad: "", carrera: "", telefono: "" });
    setProgreso(0);

    // Activar animación
    setAnimar(true);
    setTimeout(() => setAnimar(false), 1200); // duración animación
  };

  const eliminarRegistro = (index: number) => {
    setRegistros(registros.filter((_, i) => i !== index));
  };

  // Colores invertidos
  const colorProgreso =
    progreso < 33 ? "red" : progreso < 66 ? "yellow" : "green";

  return (
    <div className="container">
      <img src={icono} alt="logo futurista" className="icon-svg" />

      <h1>Registros de alumnos :3</h1>

      <div className="form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInput}
        />

        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleInput}
        />

        {/* SELECT de ingenierías */}
        <select
          name="carrera"
          value={formData.carrera}
          onChange={handleInput}
        >
          <option value="">Selecciona carrera</option>
          <option value="Ingeniería en Sistemas">Ingeniería en Sistemas</option>
          <option value="Ingeniería Industrial">Ingeniería Industrial</option>
          <option value="Ingeniería Mecatrónica">Ingeniería Mecatrónica</option>
        </select>

        <input
          type="number"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleInput}
        />

        <button className="btn-registrar" onClick={agregarRegistro}>
          Guardar
        </button>

        <div className="barra">
          <div
            className={`progreso ${animar ? "animar" : ""}`} // <-- clase animada
            style={{ width: `${progreso}%`, background: colorProgreso }}
          ></div>
        </div>
      </div>

      <h2 style={{ marginTop: "25px" }}>Registros Guardados</h2>

      <ul className="lista">
        {registros.map((r, i) => (
          <li key={i}>
            {r.nombre} — {r.edad} años — {r.carrera} — {r.telefono}
            <button className="btn-borrar" onClick={() => eliminarRegistro(i)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
