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

/**
 * Context for managing OpenLayers map and related layers and features.
 * Provides access to the current map, layers, and features layer, as well as functions to update them.
 * 
 * The `MapContext` is used throughout the application to share the OpenLayers map instance and its state
 * (layers and features) across components, allowing for seamless updates and access to the map configuration.
 * 
 * @example
 * const { map, layers, setMap, setLayers } = useContext(MapContext);
 * 
 * @interface MapContextType
 * @property {OLMap | null} map - The OpenLayers map instance or `null` if not initialized.
 * @property {function} setMap - Function to set the OpenLayers map instance. Accepts an `OLMap` or `null`.
 * @property {Layer[]} layers - Array of OpenLayers layers currently added to the map.
 * @property {function} setLayers - Function to set the layers on the map. Accepts an array of `Layer` instances.
 * @property {VectorLayer< VectorSource<Feature<Geometry>>, Feature<Geometry> > | null} featuresLayer - The layer that holds vector features, such as points or polygons, or `null` if not set.
 * @property {function} setFeaturesLayer - Function to set the vector layer for features. Accepts a `VectorLayer` containing vector features.
 *
 * Context object for OpenLayers map state management.
 * 
 * @type {React.Context<MapContextType | undefined>}
 * @example
 * const context = useContext(MapContext);
 * if (context) {
 *   // Access map and layer state
 *   const { map, layers, setMap, setLayers } = context;
 * }
 */
export const MapContext: React.Context<MapContextType | undefined> = createContext<MapContextType | undefined>(undefined);

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
