import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";
import { createLayerOptions } from "./layerOptions";
import { LayerZIndex, Projection, VectorDataResponse } from "../types";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { Coordinate } from "ol/coordinate";
import { transform } from "ol/proj";

/**
 * Creates a vector layer from response from external server in JSON format.
 *
 * This function creates a new vector layer by fetching a GeoJSON file from the provided URL,
 * parsing it, and adding the features to the vector source. The vector layer is then returned
 * with the specified title.
 *
 * @param { string } title - The title of the vector layer.
 * @returns { VectorLayer } - The created vector layer.
 *
 * @example
 * // Create a vector layer with the title "My Vector Layer"
 * const geoJsonVectorLayer = createGeoJsonVectorLayer("My Vector Layer");
 */
export function createGeoJsonVectorLayerFromResponse(
  title: string
): VectorLayer {
  const vectorSource = new VectorSource({
    format: new GeoJSON(),
    strategy: bbox,
    loader: async () => {
      try {
        const response = await fetch(
          "http://localhost:5173/data/vectors_response.json"
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: VectorDataResponse = await response.json();

        const mapVectorData = (results: VectorDataResponse["results"]) => {
          return results.map((item) => {
            const coordinates = item.geom.coordinates[0].map(
              (coord: Coordinate) => {
                const [x, y] = coord;
                return transform(
                  [x, y],
                  Projection.EPSG_4326,
                  Projection.EPSG_2176
                );
              }
            );

            return {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [coordinates],
              },
              properties: {
                pred_ID: item.properties.pred_ID,
                dataset_fk: item.dataset_fk,
                file_fk: item.file_fk,
              },
            };
          });
        };

        const geoJSON = {
          type: "FeatureCollection",
          features: mapVectorData(data.results),
        };

        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(geoJSON);

        vectorSource.addFeatures(features);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    },
  });

  const style = new Style({
    fill: new Fill({
      color: "rgba(6, 23, 39, 0.5)",
    }),
    stroke: new Stroke({
      color: "#061727",
      width: 1,
    }),
  });

  return new VectorLayer({
    source: vectorSource,
    style,
    ...createLayerOptions(title, LayerZIndex.FOURTH),
  });
}
