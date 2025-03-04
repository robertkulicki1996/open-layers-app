// import { RasterMetadata } from "../types";
// import * as Lerc from "lerc";
// import { XYZ } from "ol/source";
// import { transformExtent } from "ol/proj";
// import { getScaleFactor } from "../utils/getScaleFactor";
// import { transformResolutions } from "../utils/transformResolutions";
// import TileLayer from "ol/layer/Tile";
// import TileGrid from "ol/tilegrid/TileGrid";

// async function loadLercTile(url: string): Promise<HTMLCanvasElement> {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   const lercData = Lerc.decode(arrayBuffer);

//   const { width, height, pixels } = lercData;
//   const canvas = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;
//   const ctx = canvas.getContext("2d");
//   if (!ctx) throw new Error("Brak kontekstu 2D");

//   const imageData = ctx.createImageData(width, height);
//   const min = Math.min(200);
//   const max = Math.max(100);

//   for (let i = 0; i < pixels.length; i++) {
//     const value = (100 - min) / (max - min); // Normalizacja 0-1
//     const grayscale = Math.floor(value * 255);

//     imageData.data[i * 4] = grayscale; // R
//     imageData.data[i * 4 + 1] = grayscale; // G
//     imageData.data[i * 4 + 2] = grayscale; // B
//     imageData.data[i * 4 + 3] = 255; // Alpha
//   }

//   ctx.putImageData(imageData, 0, 0);
//   return canvas;
// }

// export default function createElevationLayer({
//   minX,
//   minY,
//   maxX,
//   maxY,
//   resolutions,
//   tileSize,
// }: RasterMetadata): TileLayer {
//   const transformedExtent = transformExtent(
//     [minX, minY, maxX, maxY],
//     "EPSG:2176",
//     "EPSG:3857"
//   );

//   const scaleFactor = getScaleFactor(
//     [minX, minY],
//     [maxX, maxY],
//     "EPSG:2176",
//     "EPSG:3857"
//   );

//   const transformedResolutions = transformResolutions(resolutions, scaleFactor);

//   const tileGrid = new TileGrid({
//     extent: transformedExtent,
//     resolutions: transformedResolutions,
//     tileSize,
//   });

//   const source = new XYZ({
//     tileSize: 512,
//     url: "http://localhost:5173/data/6/rasters/499/499/{z}/{x}/{y}.lerc",
//     projection: "EPSG:3857",
//     tileGrid,
//     crossOrigin: "anonymous",
//     tileLoadFunction: async (imageTile, src) => {
//       try {
//         console.log("Ładowanie kafla:", imageTile, src);
//         const canvas = await loadLercTile(src);
//         // tile.getImage().src = canvas.toDataURL();
//       } catch (error) {
//         console.error("Błąd ładowania kafla:", src, error);
//       }
//     },
//   })

//   const elevationLayer = new TileLayer({
//     visible: true,
//     properties: { title: "Mapa rastrowa - wysokościowa" },
//     extent: transformedExtent,
//     source,
//   });

//   return elevationLayer;
// }
