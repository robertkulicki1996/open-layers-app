// import { RasterMetadata } from "../types";
// import * as lerc from "lerc";
// import { XYZ } from "ol/source";
// import { transformExtent } from "ol/proj";
// import { getScaleFactor } from "../utils/getScaleFactor";
// import { transformResolutions } from "../utils/transformResolutions";
// import TileLayer from "ol/layer/Tile";
// import TileGrid from "ol/tilegrid/TileGrid";
// import ImageTileSource from "ol/source/ImageTile";
// import { ImageLike } from "ol/DataTile";

// async function loadLercTile(
//   url: string,
//   minVal: number,
//   maxVal: number
// ): Promise<HTMLCanvasElement> {
//   try {
//     const response = await fetch(url);
//     const arrayBuffer = await response.arrayBuffer();
//     const lercData = lerc.decode(arrayBuffer); // Use the correct decode function

//     console.log(lercData);

//     if (!lercData || !lercData.pixels) {
//       throw new Error("Invalid LERC data");
//     }

//     console.log(lercData);

//     const { width, height, pixels } = lercData;
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) throw new Error("Canvas context not available");

//     const imageData = ctx.createImageData(width, height);

//     for (let i = 0; i < pixels.length; i++) {
//       const value = ((pixels[i] as any) - minVal) / (maxVal - minVal); // Normalize 0-1
//       const grayscale = Math.floor(value * 255);

//       imageData.data[i * 4] = grayscale; // R
//       imageData.data[i * 4 + 1] = grayscale; // G
//       imageData.data[i * 4 + 2] = grayscale; // B
//       imageData.data[i * 4 + 3] = 255; // Alpha
//     }

//     ctx.putImageData(imageData, 0, 0);
//     return canvas;
//   } catch (error) {
//     console.error("Error decoding LERC:", error);
//     throw error;
//   }
// }

// export default function createElevationLayer({
//   minX,
//   minY,
//   maxX,
//   maxY,
//   minVal,
//   maxVal,
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
//     extent: [minX, minY, maxX, maxY],
//     resolutions: transformedResolutions,
//     tileSize,
//   });

//   const source = new ImageTileSource({
//     tileSize: 512,
//     projection: "EPSG:3857",
//     tileGrid,
//     crossOrigin: "anonymous",
//     loader: async (z: number, x: number, y: number) => {
//       try {
//         console.log("Ładowanie kafla:  ", z, x, y);

//         const response = await fetch(
//           `http://localhost:5173/data/6/rasters/499/499/${z}/${x}/${y}.lerc`
//         );
//         const arrayBuffer = await response.arrayBuffer();
//         console.log(arrayBuffer);

//         // Decode the LERC data
//         const lercData = lerc.decode(arrayBuffer);
//         console.log(lercData);
//         // if (!lercData || !lercData.pixels) {
//         //   throw new Error("Failed to decode LERC data or missing pixels.");
//         // }

//         // // Extract width, height, and pixel data
//         // const { width, height, pixels } = lercData;

//         // // Create a canvas to render the decoded data
//         // const canvas = document.createElement("canvas");
//         // canvas.width = width;
//         // canvas.height = height;
//         // const ctx = canvas.getContext("2d");
//         // if (!ctx) throw new Error("Unable to get canvas context.");

//         // // Create ImageData for the canvas
//         // const imageData = ctx.createImageData(width, height);
//         // const min = Math.min(...(pixels as any));
//         // const max = Math.max(...(pixels as any));

//         // // Normalize pixel data to grayscale
//         // pixels.forEach((value: any, i) => {
//         //   const normalizedValue = (value - min) / (max - min); // Normalize to range [0, 1]
//         //   const grayscale = Math.floor(normalizedValue * 255); // Convert to grayscale value
//         //   imageData.data.set([grayscale, grayscale, grayscale, 255], i * 4); // RGBA format
//         // });

//         // // Put the image data into the canvas
//         // ctx.putImageData(imageData, 0, 0);
//         // return canvas as any;
//       } catch (error) {
//         console.error("Error decoding LERC:", error);
//         // throw error;
//       }
//     },
//   });

//   const elevationLayer = new TileLayer({
//     visible: true,
//     properties: { title: "Mapa rastrowa - wysokościowa" },
//     extent: transformedExtent,
//     source,
//   });

//   return elevationLayer;
// }
