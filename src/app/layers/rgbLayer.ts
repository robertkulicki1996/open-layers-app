import { XYZ } from "ol/source";
import { transformExtent } from "ol/proj";
import { RasterMetadata } from "../types";
import { getScaleFactor } from "../utils/getScaleFactor";
import { transformResolutions } from "../utils/transformResolutions";
import TileLayer from "ol/layer/Tile";
import TileGrid from "ol/tilegrid/TileGrid";

/**
 * Function to create an RGB layer for raster data in EPSG:2176 and transform it to EPSG:3857.
 * @param { RasterMetadata } Raster metadata containing bounding box, resolutions, and tile size.
 * @returns { TileLayer } OpenLayers TileLayer for displaying raster data.
 */
export default function createRgbLayer({
  minX,
  minY,
  maxX,
  maxY,
  resolutions,
  tileSize,
}: RasterMetadata): TileLayer {
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

  const source = new XYZ({
    url: `http://localhost:5173/data/6/rasters/500/500/{z}/{x}/{y}.webp`,
    projection: "EPSG:3857",
    tileGrid,
  });

  const rgbLayer = new TileLayer({
    visible: true,
    properties: { title: "Mapa rastrowa - RGB" },
    extent: transformedExtent,
    source,
  });

  return rgbLayer;
}
