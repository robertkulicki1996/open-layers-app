export const createHeightMapCanvas = (
  pixels: any,
  width: number,
  height: number,
  minVal: number,
  maxVal: number,
  mask: any
) => {
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
          let sum = 0;
          let count = 0;

          // Oblicz średnią wartość wysokości w promieniu radius
          for (let di = -radius; di <= radius; di++) {
            for (let dj = -radius; dj <= radius; dj++) {
              const ni = i + di;
              const nj = j + dj;
              if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
                sum += pixels[0][ni * width + nj];
                count++;
              }
            }
          }
          const blurredHeight = sum / count;

          // Normalizujemy wysokości do skali 0-1
          let normalizedHeight = (blurredHeight - minVal) / scale;
          normalizedHeight = Math.max(0, Math.min(1, normalizedHeight));

          // Poprawiona interpolacja heatmapy
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

          // Ustawianie wartości pikseli w obrazie
          const index = i * width + j;
          data[index * 4] = redIntensity; // Czerwony
          data[index * 4 + 1] = greenIntensity; // Zielony
          data[index * 4 + 2] = blueIntensity; // Niebieski
          data[index * 4 + 3] = 255; // Pełna nieprzezroczystość (alpha)
        }
      }
    }
  }

  // Umieszczamy dane obrazu na canvas
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};
