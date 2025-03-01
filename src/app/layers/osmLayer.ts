import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export const osmLayer = new TileLayer({
  preload: Infinity,
  visible: true,
  source: new OSM(),
  properties: { title: "Mapa bazowa" },
});
