import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import LayersPanel from "./LayersPanel";
import Zoom from "ol/control/Zoom";
import { useMap } from "../hooks/useMap";
import { Projection, RasterMetadata } from "../types";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { useFitToExtent } from "../hooks/useFitToExtent";
import { createOsmLayer } from "../layers/osmLayer";
import { createRgbLayer } from "../layers/rgbLayer";
import { createHeightMapLayer } from "../layers/heightMapLayer";
import { createGeoJsonVectorLayer } from "../layers/geoJsonVectorLayer";
import CoordinatesPanel from "./CoordinatesPanel";
import { createGeoJsonVectorLayerFromResponse } from "../layers/geoJsonVectorLayerFromResponse";
import { Link } from "react-router-dom";

interface MapContainerProps {
  data: RasterMetadata[];
}

/**
 * MapContainer is a presentational component that displays a map with layers and other map-related UI elements.
 * It receives raster metadata as props to create the raster layers on the map.
 * It simply renders the map and its associated layers.
 *
 * @param {Object} props - The component props
 * @param {RasterMetadata[]} props.data - An array of raster metadata that will be used to create raster layers
 *
 * @returns {JSX.Element} The map container with layers, coordinates, and layers panel UI elements.
 *
 * @example
 * // Usage in a parent component:
 * <MapContainer data={rasterMetadataArray} />
 */
const MapContainer = ({ data }: MapContainerProps): JSX.Element => {
  const { map, setMap, layers, setLayers } = useMap();

  const [rasterMetadata1, rasterMetadata2] = data;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !data) return;

    const osmLayer = createOsmLayer("Mapa bazowa - Open street map");
    const rgbLayer = createRgbLayer("Mapa rastrowa - RGB", rasterMetadata2);
    const heightMapLayer = createHeightMapLayer(
      "Mapa rastrowa - wysokościowa",
      rasterMetadata1
    );
    const geoJsonVectorLayer = createGeoJsonVectorLayer(
      "Mapa wektorowa - z pliku .geojson"
    );
    const geoJsonVectorLayerFromResponse = createGeoJsonVectorLayerFromResponse(
      "Mapa wektorowa - z pliku .json"
    );
    const olMap = new Map({
      target: mapRef.current,
      layers: [
        osmLayer,
        rgbLayer,
        heightMapLayer,
        geoJsonVectorLayer,
        geoJsonVectorLayerFromResponse,
      ],
      view: new View({ projection: Projection.EPSG_2176 }),
      controls: defaultControls({ rotate: false, attribution: false }).extend([
        new Zoom(),
      ]),
    });

    setMap(olMap);
    setLayers([
      osmLayer,
      rgbLayer,
      heightMapLayer,
      geoJsonVectorLayer,
      geoJsonVectorLayerFromResponse,
    ]);

    return () => {
      olMap.setTarget(undefined);
      setMap(null);
      setLayers([]);
    }
  }, [data]);

  useFitToExtent(map, layers);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      {map && layers.length && <LayersPanel layers={layers} />}
      {map && <CoordinatesPanel />}
      <Link className="point-cloud-link" to="/point-cloud">Chmura punktów 3D</Link>
    </div>
  );
};

export default MapContainer;
