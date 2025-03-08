import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import LayerPanel from "./LayerPanel";
import Zoom from "ol/control/Zoom";
import { useMap } from "../hooks/useMap";
import { Projection, RasterMetadata, VectorDataResponse } from "../types";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { useFitToExtent } from "../hooks/useFitToExtent";
import { createOsmLayer } from "../layers/osmLayer";
import { createRgbLayer } from "../layers/rgbLayer";
import { createHeightMapLayer } from "../layers/lercLayer";
import { createVectorLayer } from "../layers/vectorLayer";
import CoordinatesPanel from "./CoordinatesPanel";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { transform } from "ol/proj";
import { Coordinate } from "ol/coordinate";

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
    const heightMapLayer = createHeightMapLayer(
      "Mapa rastrowa - wysokościowa",
      rasterMetadata1
    );
    const vectorLayer = createVectorLayer("Mapa wektorowa");

    const style = new Style({
      fill: new Fill({
        color: "rgba(6, 23, 39, 0.5)",
      }),
      stroke: new Stroke({
        color: "#061727",
        width: 1,
      }),
    });

    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      strategy: bbox,
      loader: function () {
        fetch("http://localhost:5173/data/vectors_response.json")
          .then((response) => response.json())
          .then((data: VectorDataResponse) => {
            const geoJSON = {
              type: "FeatureCollection",
              features: data.results.map((item) => {
                // Pobranie współrzędnych (część geom)
                const coordinates = item.geom.coordinates[0].map(
                  (coord: Coordinate) => {
                    // Transformacja współrzędnych z EPSG:4326 na EPSG:2176
                    const [x, y] = coord;
                    const transformedCoord = transform(
                      [x, y],
                      "EPSG:4326",
                      "EPSG:2176"
                    );
                    return transformedCoord; // Zwracamy przekształcone współrzędne
                  }
                );

                // Tworzymy feature w GeoJSON
                return {
                  type: "Feature",
                  geometry: {
                    type: "Polygon", // Ponieważ masz Poligon w danych
                    coordinates: [coordinates], // Dodajemy przekształcone współrzędne do geometrii
                  },
                  properties: {
                    pred_ID: item.properties.pred_ID,
                    dataset_fk: item.dataset_fk,
                    file_fk: item.file_fk,
                  },
                };
              }),
            };

            // Wczytanie featureów z przekształconymi współrzędnymi
            const geoJSONFormat = new GeoJSON();
            const features = geoJSONFormat.readFeatures(geoJSON);

            // Dodajemy przekształcone obiekty do źródła
            vectorSource.addFeatures(features);
          })
          .catch(() => {
            //TODO
          });
      },
    });

    // Tworzymy warstwę wektorową
    const vectorLayer2 = new VectorLayer({
      source: vectorSource,
      style,
      zIndex: 4,
    });

    const olMap = new Map({
      target: mapRef.current,
      layers: [osmLayer, rgbLayer, heightMapLayer, vectorLayer, vectorLayer2],
      view: new View({ projection: Projection.EPSG_2176 }),
      controls: defaultControls({ rotate: false, attribution: false }).extend([
        new Zoom(),
      ]),
    });

    setMap(olMap);
    setLayers([osmLayer, rgbLayer, heightMapLayer, vectorLayer, vectorLayer2]);

    return () => olMap.setTarget(undefined);
  }, [data]);

  useFitToExtent(map, layers);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      {map && layers.length && <LayerPanel layers={layers} />}
      {map && <CoordinatesPanel />}
    </div>
  );
}
