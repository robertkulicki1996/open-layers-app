import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { bbox } from "ol/loadingstrategy";

export default function createVectorLayer(): VectorLayer {
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
    visible: true,
    properties: { title: "Mapa wektorowa - wysokościowa" },
    source: vectorSource,
  });
}
