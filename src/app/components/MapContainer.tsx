import { useEffect, useMemo, useRef } from "react";
import Map from "ol/Map";
import { View } from "ol";
import LayerPanel from "./LayerPanel";
import { useMap } from "../hooks/useMap";
import { osmLayer } from "../layers/osmLayer";
import { RasterMetadata } from "../types";
import createRgbLayer from "../layers/rgbLayer";
import { defaults as defaultControls } from "ol/control/defaults.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useFitToExtent } from "../hooks/useFitToExtent";
import Zoom from "ol/control/Zoom";
// import createElevationLayer from "../layers/elevationLayer";

interface MapContainerProps {
  data: (RasterMetadata | null)[];
}

export default function MapContainer({ data }: MapContainerProps) {
  const { map, setMap, layers, setLayers, featuresLayer, setFeaturesLayer } = useMap();

  const mapRef = useRef<HTMLDivElement>(null);

  const rgbLayer = useMemo(() => {
    return data[1] !== null  ? createRgbLayer(data[1]) : null;
  }, [data[1]]);

  // const elevationLayer = useMemo(() => {
  //   return data[0] !== null  ? createElevationLayer(data[0]) : null;
  // }, [data[0]]);

  const featureLayer = useMemo(
    () => new VectorLayer({ source: new VectorSource() }),
    []
  );

  useEffect(() => {
    if (!mapRef.current || !data || map) return;

    const olMap = new Map({
      target: mapRef.current,
      layers: [
        osmLayer,
        ...(rgbLayer ? [rgbLayer] : []),
      ],
      view: new View({ projection: "EPSG:3857" }),
      controls: defaultControls().extend([new Zoom()]),
    });

    setMap(olMap);
    setLayers([
      osmLayer,
      ...(rgbLayer ? [rgbLayer] : []),
    ]);
    setFeaturesLayer(featureLayer);

    return () => {
      olMap.setTarget(undefined);
      setMap(null);
      setLayers([]);
    };
  }, [rgbLayer]);

  useFitToExtent(map, layers, featuresLayer);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      {map && layers.length && <LayerPanel layers={layers} />}
    </div>
  );
}
