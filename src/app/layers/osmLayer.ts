import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

/**
 * Tworzy warstwę OpenStreetMap.
 * @param {string} title - Tytuł warstwy.
 * @returns {TileLayer} - Warstwa OpenStreetMap.
 */
export function createOsmLayer(title: string): TileLayer {
  return new TileLayer({
    source: new OSM(),
    properties: { title },
  });
}