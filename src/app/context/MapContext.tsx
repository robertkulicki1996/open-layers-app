import React, { createContext, useState, ReactNode } from "react";
import { Feature, Map as OLMap } from "ol";
import { Layer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";

export interface MapContextType {
  map: OLMap | null;
  setMap: (map: OLMap | null) => void;
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  featuresLayer: VectorLayer<
    VectorSource<Feature<Geometry>>,
    Feature<Geometry>
  > | null;
  setFeaturesLayer: (vectorLayer: VectorLayer) => void;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [map, setMap] = useState<OLMap | null>(null);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>(
    new VectorLayer({ source: new VectorSource() })
  );

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        layers,
        setLayers,
        featuresLayer,
        setFeaturesLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
