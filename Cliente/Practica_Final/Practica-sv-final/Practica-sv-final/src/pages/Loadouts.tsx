import { useState } from "react";
import LoadoutForm from "../components/LoadoutForm";
import DraggableLoadout from "../components/DraggableLoadout";
import SpartanBoostTimer from "../components/SpartanBoostTimer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../styles/loadouts.css";

export default function Loadouts() {
  const [loadouts, setLoadouts] = useLocalStorage<any[]>("loadouts", []);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addLoadout = (l: any) => {
    setLoadouts([...loadouts, l]);
  };

  const deleteLoadout = (id: string) => {
    setDeletingId(id);

    setTimeout(() => {
      setLoadouts(loadouts.filter(l => l.id !== id));
      setDeletingId(null);
    }, 650);
  };

  const onDragStart = (index: number) => {
    setDragIndex(index);
  };

  const onDrop = (index: number) => {
    if (dragIndex === null) return;

    const updated = [...loadouts];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);

    setLoadouts(updated);
    setDragIndex(null);
  };

  const activateBoost = (id: string) => {
    setLoadouts(loadouts.map(l =>
      l.id === id
        ? { ...l, boostActive: true, boostEndsAt: Date.now() + 5000 }
        : l
    ));
  };

  return (
    <div className="loadouts-page">
      <header className="page-header">
        <h1 className="halo-title">Organiza tu armadura Spartan</h1>
        <p className="halo-subtitle">
          Ecos de memoria en un sistema que aún respira.
        </p>
      </header>

      <LoadoutForm onAdd={addLoadout} />

      <div className="loadout-list">
        {loadouts.map((l, i) => (
          <DraggableLoadout
            key={l.id}
            onDragStart={() => onDragStart(i)}
            onDragOver={(e: any) => e.preventDefault()}
            onDrop={() => onDrop(i)}
          >
            <div
              className={`loadout-card ${
                deletingId === l.id ? "glitch-out absorb-particles" : ""
              }`}
              style={{ borderColor: l.color }}
            >
              <div className="card-header">
                <h3>{l.name}</h3>
                <button
                  className="delete-btn"
                  onClick={() => deleteLoadout(l.id)}
                  title="Eliminar Spartan"
                >
                  ✖
                </button>
              </div>

              <p className="weapons">
                {l.primary} / {l.secondary || "Sin secundaria"}
              </p>

              <p className="grenades">{l.grenades.join(", ")}</p>

              {l.ability && (
                <p className="ability">{l.ability}</p>
              )}

              <SpartanBoostTimer
                active={l.boostActive}
                endsAt={l.boostEndsAt}
                onActivate={() => activateBoost(l.id)}
              />

              {/* partículas */}
              {deletingId === l.id && (
                <div className="death-particles">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              )}
            </div>
          </DraggableLoadout>
        ))}
      </div>
    </div>
  );
}

