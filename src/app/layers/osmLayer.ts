import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { LayerZIndex } from "../types";
import { createLayerOptions } from "./layerOptions";

/**
 * Creates an OpenStreetMap layer.
 * @param {string} title The title of the layer.
 * @returns {TileLayer} The created OpenStreetMap tile layer.
 *
 * @example
 * const osmLayer = createOsmLayer("Base Map", LayerZIndex.BASE, 1);
 */
export function createOsmLayer(title: string): TileLayer {
  return new TileLayer({
    source: new OSM(),
    ...createLayerOptions(title, LayerZIndex.BASE),
  });
}
