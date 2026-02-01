import { useState } from "react";
import "../styles/loadouts.css";

export default function LoadoutForm({ onAdd }: { onAdd: (l: any) => void }) {
  const [name, setName] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [grenades, setGrenades] = useState<string[]>([]);
  const [ability, setAbility] = useState("");
  const [color, setColor] = useState("#3ad5ff");
  const [error, setError] = useState("");

  const toggleGrenade = (g: string) => {
    setGrenades(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return setError("El nombre del loadout es obligatorio.");
    if (!primary) return setError("Selecciona un arma principal.");
    if (grenades.length === 0) return setError("Selecciona al menos una granada.");

    const newLoadout = {
      id: crypto.randomUUID(),
      name,
      primary,
      secondary,
      grenades,
      ability,
      color,
      boostActive: false,
    };

    onAdd(newLoadout);

    // reset
    setName("");
    setPrimary("");
    setSecondary("");
    setGrenades([]);
    setAbility("");
    setColor("#3ad5ff");
    setError("");
  };

  return (
    <form className="loadout-form halo-frame" onSubmit={handleSubmit}>
      <h2 className="section-title">Crear Loadout</h2>

      {error && <p className="error-msg">{error}</p>}

      <input
        className="halo-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del Loadout"
      />

      <select
        className="halo-input"
        value={primary}
        onChange={(e) => setPrimary(e.target.value)}
      >
        <option value="">Arma Principal</option>
        <option>Rifle de batalla</option>
        <option>DMR</option>
        <option>Rifle de asalto </option>
        <option>Carbine</option>
      </select>

      <select
        className="halo-input"
        value={secondary}
        onChange={(e) => setSecondary(e.target.value)}
      >
        <option value="">Arma Secundaria</option>
        <option>Magnum</option>
        <option>Pistola de plasma</option>
        <option>Needler</option>
      </select>

      <div className="grenades-box">
        <label>
          <input
            type="checkbox"
            checked={grenades.includes("Fragmentation")}
            onChange={() => toggleGrenade("Fragmentation")}
          />
          Fragmentation
        </label>
        <label>
          <input
            type="checkbox"
            checked={grenades.includes("Plasma")}
            onChange={() => toggleGrenade("Plasma")}
          />
          Plasma
        </label>
      </div>

      <select
        className="halo-input"
        value={ability}
        onChange={(e) => setAbility(e.target.value)}
      >
        <option value="">Habilidad Spartan</option>
        <option>Mochila cohete</option>
        <option>Bloqueo de armadura</option>
        <option>Holograma</option>
        <option>Linterna</option>
      </select>

      <label className="color-picker-label">
        Color del Spartan:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <button className="halo-btn">Agregar Spartan</button>
    </form>
  );
}
