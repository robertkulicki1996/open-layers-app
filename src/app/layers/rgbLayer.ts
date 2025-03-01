import XYZ from "ol/source/XYZ";
import TileGrid from "ol/tilegrid/TileGrid";
import { RasterMetadata } from "../types";
import { transformExtent } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { transformResolutions } from "../utils/transformResolutions";

export default function createRgbLayer({
  minX,
  minY,
  maxX,
  maxY,
  resolutions,
  tileSize,
}: RasterMetadata) {
  const transformedExtent = transformExtent(
    [minX, minY, maxX, maxY],
    "EPSG:2176",
    "EPSG:3857"
  );

  const transformedResolutions = transformResolutions(resolutions);

  const tileGrid = new TileGrid({
		extent: transformedExtent,
    resolutions: transformedResolutions,
    tileSize: tileSize * 2.5, // wyciągnać scaleFactor z transformResolutions
  });

	const source = new XYZ({
		url: `http://localhost:5173/data/6/rasters/500/500/{z}/{x}/{y}.webp`,
		projection: "EPSG:3857",
		tileGrid,
	})

  const rgbLayer = new TileLayer({
    visible: true,
    properties: { title: "Mapa rastrowa - RGB" },
    extent: transformedExtent,
    source
  });

  return rgbLayer;
}
