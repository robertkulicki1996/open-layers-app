import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";

/**
 * Tworzy warstwę wektorową.
 * @param {string} title - Tytuł warstwy.
 * @returns {VectorLayer} - Warstwa wektorowa.
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

          features.forEach((feature) => {
            const geometry = feature.getGeometry();
            if (geometry) {
              geometry.transform("EPSG:2176", "EPSG:3857");
            }
          });

          vectorSource.addFeatures(features);
        });
    },
  });
  return new VectorLayer({
    properties: { title },
    source: vectorSource,
  });
}
