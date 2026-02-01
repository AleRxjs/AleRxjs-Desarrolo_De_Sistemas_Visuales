import Loadouts from "./pages/Loadouts";
import CortanaParticles from "./components/CortanaParticles";

function App() {
  return (
    <>
      <CortanaParticles />
      <div id="root-content">
        <Loadouts />
      </div>
    </>
  );
}

export default App;
