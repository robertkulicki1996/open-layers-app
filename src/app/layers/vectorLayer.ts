import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";

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
 * const vectorLayer = createVectorLayer("My Vector Layer");
 */
export function createVectorLayer(title: string): VectorLayer {
  const vectorSource = new VectorSource({
    format: new GeoJSON(),
    strategy: bbox,
    loader: function () {
      fetch("http://localhost:5173/data/6/vectors/2472/2472.geojson")
        .then((response) => response.json())
        .then((geojson) => {
          const geoJSONFormat = new GeoJSON();
          const features = geoJSONFormat.readFeatures(geojson);
          vectorSource.addFeatures(features);
        });
    },
  });
  return new VectorLayer({
    properties: { title },
    source: vectorSource,
    zIndex: 3
  });
}
