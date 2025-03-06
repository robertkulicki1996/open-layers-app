import { ImageTile, XYZ } from "ol/source";
import { Projection, RasterMetadata } from "../types";
import { getLercData } from "../utils/getLercData";
import { createHeightMapCanvas } from "../utils/createHeightMapImage";
import { createXYZ, TileGrid } from "ol/tilegrid";
import TileLayer from "ol/layer/Tile";
import ImageTileSource, { Loader } from "ol/source/ImageTile";
import { LoaderOptions } from "ol/source/DataTile";
import { ImageLike } from "ol/DataTile";
import * as Lerc from "lerc";

const createHeightMapCanvasWithDummyData = () => {
  const width = 512;  // Przykładowa szerokość
  const height = 512; // Przykładowa wysokość
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Stwórz jednolity kolor lub prosty wzór
    const imageData = ctx.createImageData(width, height);
    
    // Wypełnij obraz danymi (np. kolor szary)
    for (let i = 0; i < width * height; i++) {
      // Szary kolor
      imageData.data[i * 4] = 128;   // Red
      imageData.data[i * 4 + 1] = 128; // Green
      imageData.data[i * 4 + 2] = 128; // Blue
      imageData.data[i * 4 + 3] = 255; // Alpha (pełna przezroczystość)
    }
    
    // Wpisz dane do canvas
    ctx.putImageData(imageData, 0, 0);
  }

  return canvas;
};

export function createHeightMapLayer(title: string, metadata: RasterMetadata): TileLayer {
  const { minX, minY, maxX, maxY, resolutions, tileSize, minVal, maxVal } = metadata;

  const extent = [minX, minY, maxX, maxY];

  const tileGrid = new TileGrid({
    extent,
    resolutions,
    tileSize,
  });

    // Zmienna przechowująca stan, kiedy WebAssembly jest załadowane
    let wasmLoaded = false;

    // Ładowanie WebAssembly w komponencie
    const loadWasm = async () => {
      try {
        const wasmPath = '/lerc-wasm.wasm'; // Ścieżka do pliku .wasm w folderze public
        const response = await fetch(wasmPath);
        const wasmBuffer = await response.arrayBuffer();
        
        // Ładowanie WebAssembly
        await Lerc.load({ locateFile: () => "/lerc-wasm.wasm"});
        console.log("WebAssembly załadowane pomyślnie!");
        wasmLoaded = true;
      } catch (error) {
        console.error("Błąd ładowania WebAssembly:", error);
      }
    };
  
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
      // Tworzenie obrazu na podstawie danych wysokościowych
      return createHeightMapCanvas(lercData.pixels as any, lercData.width, lercData.height, minVal as number, maxVal as number);
    },
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
  });
}
