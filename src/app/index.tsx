import { MapProvider } from "./context/MapContext";
import { registerEPSG2176 } from "./projections/epsg2176";
import MapView from "./views/MapView";
import "./style.css";

registerEPSG2176();

function App() {
  return (
    <MapProvider>
      <MapView />
    </MapProvider>
  );
}

export default App;
