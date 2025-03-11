import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MapProvider } from "./context/MapContext";
import { registerEPSG2176 } from "./projections/epsg2176";
import MapView from "./views/MapView";
import PotreeView from "./views/PotreeView";

import "./style.css";

registerEPSG2176();

function App() {
  return (
    <BrowserRouter>
      <MapProvider>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/point-cloud" element={<PotreeView />} />
        </Routes>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
