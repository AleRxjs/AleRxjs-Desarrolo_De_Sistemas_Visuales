import "../styles/loadouts.css";

export default function LoadoutCard({ loadout }: any) {
  return (
    <div className="loadout-card halo-frame" style={{ borderColor: loadout.color }}>
      <h3 className="card-title">{loadout.name}</h3>

      <p><strong>Principal:</strong> {loadout.primary}</p>
      <p><strong>Secundaria:</strong> {loadout.secondary || "Ninguna"}</p>

      <p><strong>Granadas:</strong> {loadout.grenades.join(", ")}</p>
      <p><strong>Habilidad:</strong> {loadout.ability || "N/A"}</p>

      <div className="color-preview" style={{ background: loadout.color }}></div>
    </div>
  );
}
