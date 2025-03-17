import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MapProvider } from "./context/MapContext";
import { registerEPSG2176 } from "./projections/epsg2176";
// import MapView from "./views/MapView";
// import PotreeView from "./views/PotreeView";

import "./style.css";
import React, { Suspense } from "react";

registerEPSG2176();

const MapView = React.lazy(() => import("./views/MapView"));
const PotreeView = React.lazy(() => import("./views/PotreeView"));

function App() {
  return (
    <BrowserRouter>
      <MapProvider>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<MapView />} />
            <Route path="/point-cloud" element={<PotreeView />} />
          </Routes>
        </Suspense>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
