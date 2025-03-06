import { useEffect, useRef } from "react";
import Map from "ol/Map";
import { View } from "ol";
import LayerPanel from "./LayerPanel";
import { useMap } from "../hooks/useMap";
import { RasterMetadata } from "../types";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { useFitToExtent } from "../hooks/useFitToExtent";
import Zoom from "ol/control/Zoom";
import { createOsmLayer } from "../layers/osmLayer";
import { createRgbLayer } from "../layers/rgbLayer";
import { createHeightMapLayer } from "../layers/lercLayer";

// import createElevationLayer from "../layers/lercLayer";

interface MapContainerProps {
  data: RasterMetadata[];
}

export default function MapContainer({ data }: MapContainerProps) {
  const { map, setMap, layers, setLayers } = useMap();

  const [rasterMetadata1, rasterMetadata2] = data;

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !data || map) return;

    const osmLayer = createOsmLayer("Mapa bazowa - Open street map");
    const rgbLayer = createRgbLayer("Mapa rastrowa - RGB", rasterMetadata2);
    const heightMapLayer = createHeightMapLayer("Mapa rastrowa - wysokościowa", rasterMetadata1);
    // const vectorLayer = createVectorLayer("Mapa wektorowa");

    const olMap = new Map({
      target: mapRef.current,
      layers: [osmLayer, rgbLayer, heightMapLayer],
      view: new View({ projection: "EPSG:2176" }),
      controls: defaultControls({ rotate: false, attribution: false }).extend([
        new Zoom(),
      ]),
    });
    

    setMap(olMap);
    setLayers([osmLayer, rgbLayer, heightMapLayer]);

    return () => olMap.setTarget(undefined);
  }, [data]);

  useFitToExtent(map, layers);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      {map && layers.length && <LayerPanel layers={layers} />}
    </div>
  );
}
