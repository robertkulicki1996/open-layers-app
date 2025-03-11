import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";
import { createLayerOptions } from "./layerOptions";
import { LayerZIndex } from "../types";

/**
 * Creates a vector layer.
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
export function createGeoJsonVectorLayer(title: string): VectorLayer {
  const vectorSource = new VectorSource({
    format: new GeoJSON(),
    strategy: bbox,
    loader: async () => {
      const response = await fetch(
        "http://localhost:5173/data/6/vectors/2472/2472.geojson"
      );
      if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
      }
      const geojson = await response.json();
      const geoJSONFormat = new GeoJSON();
      const features = geoJSONFormat.readFeatures(geojson);
      vectorSource.addFeatures(features);
    },
  });
  return new VectorLayer({
    source: vectorSource,
    ...createLayerOptions(title, LayerZIndex.THIRD),
  });
}
