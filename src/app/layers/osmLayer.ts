import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

/**
 * Creates an OpenStreetMap layer.
 * 
 * This function creates a new OpenStreetMap tile layer with the specified title.
 * The layer uses the default OpenStreetMap source for tiles.
 * 
 * @param {string} title - The title of the OpenStreetMap layer.
 * @returns {TileLayer} - The created OpenStreetMap tile layer.
 * 
 * @example
 * // Create an OpenStreetMap layer with the title "Base Map"
 * const osmLayer = createOsmLayer("Base Map");
 */
export function createOsmLayer(title: string): TileLayer {
  return new TileLayer({
    source: new OSM(),
    properties: { title },
    zIndex: 0
  });
}