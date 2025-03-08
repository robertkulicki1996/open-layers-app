import { XYZ } from "ol/source";
import { Projection, RasterMetadata } from "../types";
import TileLayer from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";

/**
 * Creates an RGB layer based on raster metadata in EPSG:2176 projection.
 * 
 * This function creates a new RGB tile layer using the provided raster metadata.
 * It sets up the extent, tile grid, and source for the layer based on the given metadata,
 * and uses an XYZ source to load the raster tiles in the EPSG:2176 projection.
 * 
 * @param {string} title - The title of the RGB layer.
 * @param {RasterMetadata} metadata - The raster metadata containing extent, resolutions, and tile size.
 * @returns {TileLayer} - The created RGB tile layer.
 * 
 * @example
 * // Create an RGB layer with the title "RGB Layer" and provided raster metadata
 * const rgbLayer = createRgbLayer("RGB Layer", rasterMetadata);
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
    visible: true,
    properties: { title },
    extent,
    source,
    zIndex: 1
  });
}
