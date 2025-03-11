import { XYZ } from "ol/source";
import { LayerZIndex, Projection, RasterMetadata } from "../types";
import TileLayer from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";
import { createLayerOptions } from "./layerOptions";

/**
 * Creates an RGB layer.
 * @param {string} title The title of the layer.
 * @param {Object} metadata Raster metadata (including extent, resolutions, tile size).
 * @returns {TileLayer} The created RGB tile layer.
 *
 * @example
 * const rgbLayer = createRgbLayer("RGB Map", rasterMetadata, LayerZIndex.OVERLAY, 0.7);
 */
export function createRgbLayer(
  title: string,
  metadata: RasterMetadata
): TileLayer {
  const { minX, minY, maxX, maxY, resolutions, tileSize } = metadata;

  // const transformedExtent = transformExtent(
  //   [minX, minY, maxX, maxY],
  //   "EPSG:2176",
  //   "EPSG:3857"
  // );

  // const scaleFactor = getScaleFactor(
  //   [minX, minY],
  //   [maxX, maxY],
  //   "EPSG:2176",
  //   "EPSG:3857"
  // );

  // const transformedResolutions = transformResolutions(resolutions, scaleFactor);

  const extent = [minX, minY, maxX, maxY];

  const tileGrid = new TileGrid({
    extent,
    resolutions,
    tileSize,
  });

  const source = new XYZ({
    url: "http://localhost:5173/data/6/rasters/500/500/{z}/{x}/{y}.webp",
    projection: Projection.EPSG_2176,
    tileGrid,
  });

  return new TileLayer({
    extent,
    source,
    ...createLayerOptions(title, LayerZIndex.FIRST)
  });
}
