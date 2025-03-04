// import { Map, View } from "ol";
// import TileLayer from "ol/layer/Tile";
// import { ImageTile } from "ol/source";
// import * as LERC from "lerc"; // Import LERC library
// import { ImageLike } from "ol/DataTile";
// import { Loader } from "ol/source/ImageTile";


// // Function to decode LERC data and create an image for the tile
// async function decodeLercData(
//   arrayBuffer: ArrayBuffer
// ): Promise<HTMLImageElement> {
//   const pixelBlock = LERC.decode(arrayBuffer);
//   const { height, width, pixels, mask } = pixelBlock;

//   // Create a canvas to render the image
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;
//   canvas.width = width;
//   canvas.height = height;

//   const imageData = ctx.createImageData(width, height);
//   const data = imageData.data;

//   // Process each pixel
//   for (let i = 0; i < height; i++) {
//     for (let j = 0; j < width; j++) {
//       const idx = i * width + j;
//       if (!mask || mask[idx]) {
//         const elevation = pixels[idx]; // Get elevation data

//         // Convert elevation to RGB for visualization (You can customize this)
//         const color = elevationToColor(elevation);

//         // Set the pixel color (RGBA format)
//         const pixelIndex = idx * 4;
//         data[pixelIndex] = color.r;
//         data[pixelIndex + 1] = color.g;
//         data[pixelIndex + 2] = color.b;
//         data[pixelIndex + 3] = 255; // Full opacity
//       }
//     }
//   }

//   ctx.putImageData(imageData, 0, 0);

//   // Create an image from the canvas
//   const img = new Image();
//   img.src = canvas.toDataURL();

//   return new Promise((resolve, reject) => {
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//   });
// }

// // Helper function to convert elevation to RGB color
// function elevationToColor(elevation: number): {
//   r: number;
//   g: number;
//   b: number;
// } {
//   const normalized = Math.min(255, Math.max(0, elevation));
//   return {
//     r: normalized, // Red channel
//     g: normalized, // Green channel
//     b: 255 - normalized, // Blue channel
//   };
// }

// const tileLayer = new TileLayer({
//   source: new ImageTile({
//     loader: async function (z: number, x: number, y: number) {
//       const url = "http://localhost:5173/data/6/rasters/499/499/{z}/{x}/{y}.lerc"
//         .replace("{z}", z.toString())
//         .replace("{x}", x.toString())
//         .replace("{y}", y.toString());
//       try {
//         const response = await fetch(url);
//         const arrayBuffer = await response.arrayBuffer();
  
//         // Decode LERC data and return image
//         const image = await decodeLercData(arrayBuffer);
//         return image;
//       } catch (error) {
//         console.error("Error loading LERC tile:", error);
//       }
//     },
//   });
// });
