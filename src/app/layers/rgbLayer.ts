import { XYZ } from "ol/source";
import { transformExtent } from "ol/proj";
import { RasterMetadata } from "../types";
import { getScaleFactor } from "../utils/getScaleFactor";
import { transformResolutions } from "../utils/transformResolutions";
import TileLayer from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";

/**
 * Tworzy warstwę RGB na podstawie metadanych rastrowych w projekcji EPSG:2176.
 * @param {string} title - Tytuł warstwy.
 * @param {RasterMetadata} metadata - Metadane rastra.
 * @returns {TileLayer} - Warstwa RGB.
 */
export function createRgbLayer(
  title: string,
  metadata: RasterMetadata
): TileLayer {
  const { minX, minY, maxX, maxY, resolutions, tileSize } = metadata;

  const transformedExtent = transformExtent(
    [minX, minY, maxX, maxY],
    "EPSG:2176",
    "EPSG:3857"
  );
  const scaleFactor = getScaleFactor(
    [minX, minY],
    [maxX, maxY],
    "EPSG:2176",
    "EPSG:3857"
  );
  const transformedResolutions = transformResolutions(resolutions, scaleFactor);

  const tileGrid = new TileGrid({
    extent: transformedExtent,
    resolutions: transformedResolutions,
    tileSize,
  });

  return new TileLayer({
    visible: true,
    properties: { title },
    extent: transformedExtent,
    source: new XYZ({
      url: "http://localhost:5173/data/6/rasters/500/500/{z}/{x}/{y}.webp",
      projection: "EPSG:3857",
      tileGrid,
    }),
  });
}
