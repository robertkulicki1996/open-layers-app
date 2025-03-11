import { LayerZIndex, Projection, RasterMetadata } from "../types";
import { createHeightMapCanvas } from "../helpers/createHeightMapCanvas";
import { TileGrid } from "ol/tilegrid";
import TileLayer from "ol/layer/Tile";
import ImageTileSource from "ol/source/ImageTile";
import * as Lerc from "lerc";
import { loadWasm } from "../helpers/loadWasmFile";
import { createLayerOptions } from "./layerOptions";


export function createHeightMapLayer(
  title: string,
  metadata: RasterMetadata
): TileLayer {
  const { minX, minY, maxX, maxY, resolutions, tileSize, minVal, maxVal } =
    metadata;
  const extent = [minX, minY, maxX, maxY];

  loadWasm();

  const source = new ImageTileSource({
    tileGrid: new TileGrid({
      extent,
      resolutions,
      tileSize,
    }),
    loader: async (z: number, x: number, y: number, _options): Promise<any> => {
      if (!minVal || !maxVal) return;

      await Lerc.load();
      const response = await fetch(
        `http://localhost:5173/data/6/rasters/499/499/${z}/${x}/${y}.lerc`
      );
      const arrayBuffer = await response.arrayBuffer();
      const lercData = Lerc.decode(arrayBuffer);

      return createHeightMapCanvas(
        lercData.pixels,
        tileSize,
        tileSize,
        minVal,
        maxVal,
        lercData.mask
      );
    },
    crossOrigin: "anonymous",
    projection: Projection.EPSG_2176,
  });

  return new TileLayer({
    extent,
    source,
    ...createLayerOptions(title, LayerZIndex.SECOND),
  });
}
