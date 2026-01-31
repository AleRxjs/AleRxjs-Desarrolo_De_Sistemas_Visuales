import { useEffect, useState } from "react";
import "./App.css";
import icono from "./assets/icono.svg";

function App() {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    carrera: "",
    telefono: "",
    acepto: false,
  });

  const [registros, setRegistros] = useState<any[]>([]);
  const [progreso, setProgreso] = useState(0);
  const [animar, setAnimar] = useState(false);

  // Cargar registros del localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("registros");
    if (saved) setRegistros(JSON.parse(saved));
  }, []);

  // Guardar registros en localStorage
  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  // Manejo de inputs y checkbox
  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Guardar registro con animación de barra
  const agregarRegistro = () => {
    if (!formData.nombre || !formData.edad || !formData.carrera || !formData.telefono) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (!formData.acepto) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setProgreso(0);
    setAnimar(true);

    // Simular animación de guardado
    let progresoTemp = 0;
    const intervalo = setInterval(() => {
      progresoTemp += 5; // aumenta 5% cada paso
      setProgreso(progresoTemp);

      if (progresoTemp >= 100) {
        clearInterval(intervalo);
        setRegistros([...registros, formData]);
        setFormData({ nombre: "", edad: "", carrera: "", telefono: "", acepto: false });
        setAnimar(false);
        setProgreso(100); // mantener barra llena un instante
        setTimeout(() => setProgreso(0), 400); // reiniciar después de un toque
      }
    }, 50); // velocidad de animación
  };

  const eliminarRegistro = (index: number) => {
    setRegistros(registros.filter((_, i) => i !== index));
  };

  // Color de barra: rojo, amarillo, verde (opcional)
  const colorProgreso = progreso < 33 ? "red" : progreso < 66 ? "yellow" : "green";

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

        {/* Checkbox de Términos y Condiciones */}
        <label className="terminos">
          <input
            type="checkbox"
            name="acepto"
            checked={formData.acepto}
            onChange={handleInput}
          />
          Acepto los términos y condiciones
        </label>

        <button className="btn-registrar" onClick={agregarRegistro}>
          Guardar
        </button>

        <div className="barra">
          <div
            className={`progreso ${animar ? "animar" : ""}`}
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
