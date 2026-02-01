import { useEffect, useState } from "react";
import "../styles/loadouts.css";

export default function SpartanBoostTimer({
  active,
  endsAt,
  onActivate,
}: {
  active: boolean;
  endsAt?: number;
  onActivate: () => void;
}) {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!active || !endsAt) return;

    const interval = setInterval(() => {
      const diff = endsAt - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    }, 100);

    return () => clearInterval(interval);
  }, [active, endsAt]);

  return (
    <div className="boost-box">
      {!active ? (
        <button className="boost-btn halo-btn" onClick={onActivate}>
          Activar Spartan Boost
        </button>
      ) : (
        <div className="boost-timer">
          <div className="boost-circle" />
          <p>{(remaining / 1000).toFixed(1)}s</p>
        </div>
      )}
    </div>
  );
}
