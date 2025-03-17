import { ImageLike } from "ol/DataTile";
import * as Lerc from "lerc";

/**
 * Creates a height map canvas with color-coded height values.
 *
 * This function generates a canvas element with a height map based on the provided pixel data. It applies a blur effect and normalizes the height values to a range between 0 and 1, then color codes the height values into a gradient from blue (low) to red (high).
 * Optionally, a mask can be provided to determine which pixels to process.
 *
 * @param {any} pixels - The pixel data representing the height map. This is expected to be a 2D array of height values (e.g., a `Float64Array`).
 * @param {number} width - The width of the height map (in pixels).
 * @param {number} height - The height of the height map (in pixels).
 * @param {number} minVal - The minimum height value in the dataset (used for normalization).
 * @param {number} maxVal - The maximum height value in the dataset (used for normalization).
 * @param {any} mask - An optional mask array where a `true` value means the pixel should be processed and a `false` value means it will be skipped. If not provided, all pixels are processed.
 * 
 * @returns {ImageLike | undefined} The generated canvas element with the height map. If the 2D context is unavailable, `undefined` is returned.
 *
 * @example
 * const heightMapCanvas = createHeightMapCanvas(pixels, 1024, 1024, 0, 255, mask);
 * document.body.appendChild(heightMapCanvas);  // Add the canvas to the DOM.
 */
export const createHeightMapCanvas = (
  pixels: Lerc.PixelTypedArray[],
  width: number,
  height: number,
  minVal: number,
  maxVal: number,
  mask: any
): ImageLike | undefined => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Nie udało się uzyskać kontekstu 2D");
    return;
  }

  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const scale = maxVal - minVal;
  const radius = 2; 

  if (pixels[0] instanceof Float64Array) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (!mask || mask[i * width + j]) {
          // Pobieranie wartości wysokości bezpośrednio z tablicy pixels
          const blurredHeight = pixels[0][i * width + j];
          // let sum = 0;
          // let count = 0;

          // // Obliczanie rozmytej wartości wysokości
          // for (let di = -radius; di <= radius; di++) {
          //   for (let dj = -radius; dj <= radius; dj++) {
          //     const ni = i + di;
          //     const nj = j + dj;
          //     if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
          //       sum += pixels[0][ni * width + nj];
          //       count++;
          //     }
          //   }
          // }
          // const blurredHeight = sum / count;

          let normalizedHeight = (blurredHeight - minVal) / scale;
          normalizedHeight = Math.max(0, Math.min(1, normalizedHeight));

          let redIntensity, greenIntensity, blueIntensity;

          if (normalizedHeight < 0.5) {
            blueIntensity = Math.round(255 * (1 - 2 * normalizedHeight));
            greenIntensity = Math.round(255 * (2 * normalizedHeight));
            redIntensity = 0;
          } else {
            redIntensity = Math.round(255 * (2 * (normalizedHeight - 0.5)));
            greenIntensity = Math.round(
              255 * (1 - 2 * (normalizedHeight - 0.5))
            );
            blueIntensity = 0;
          }

          const index = i * width + j;
          data[index * 4] = redIntensity;
          data[index * 4 + 1] = greenIntensity;
          data[index * 4 + 2] = blueIntensity;
          data[index * 4 + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};
