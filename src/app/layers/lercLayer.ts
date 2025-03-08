import { Projection, RasterMetadata } from "../types";
import { createHeightMapCanvas } from "../utils/createHeightMapImage";
import { TileGrid } from "ol/tilegrid";
import TileLayer from "ol/layer/Tile";
import ImageTileSource from "ol/source/ImageTile";
import * as Lerc from "lerc";
import { loadWasm } from "../utils/loadWasmFile";

export function createHeightMapLayer(
  title: string,
  metadata: RasterMetadata
): TileLayer {
  const { minX, minY, maxX, maxY, resolutions, tileSize, minVal, maxVal } =
    metadata;

  const extent = [minX, minY, maxX, maxY];

  const tileGrid = new TileGrid({
    extent,
    resolutions,
    tileSize,
  });


  // Załaduj WebAssembly tylko raz, jeśli jeszcze nie jest załadowane
  loadWasm();

  const source = new ImageTileSource({
    tileGrid,
    loader: async (z: number, x: number, y: number, _options): Promise<any> => {
      // Tworzenie URL do pobrania kafelka
      const url = `http://localhost:5173/data/6/rasters/499/499/${z}/${x}/${y}.lerc`;
      console.log(`Ładowanie kafelka: ${url}`);

      // Pobranie i dekodowanie LERC
      await Lerc.load();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      const lercData = Lerc.decode(arrayBuffer);
      console.log(lercData);

      // Tworzenie obrazu na podstawie danych wysokościowych
      return createHeightMapCanvas(
        lercData.pixels as any,
        512,
        512,
        minVal as number,
        maxVal as number,
        lercData.mask
      );
    },
    crossOrigin: "anonymous",
    projection: Projection.EPSG_2176,
  });

  // const source = new XYZ({
  //   url: "http://localhost:5173/data/6/rasters/499/499/{z}/{x}/{y}.webp",
  //   projection: Projection.EPSG_2176,
  //   tileGrid,
  // });

  return new TileLayer({
    visible: true,
    properties: { title: "HeightMap" },
    extent,
    source,
    zIndex: 2,
  });
}
