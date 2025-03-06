import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";

export const createHeightMapCanvas = (pixels: any, width: number, height: number, minVal: number, maxVal: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error("Nie udało się uzyskać kontekstu 2D");
      return;
    }
  
    canvas.width = width;
    canvas.height = height;
  
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
  
    const scale = (maxVal - minVal) / 255;

    console.log(pixels[0], typeof pixels[0]);
  
    const colorScale = scaleSequential(interpolateViridis).domain([0, maxVal]);

    if (pixels[0] instanceof Float64Array) {
      for (let i = 0; i < pixels[0].length; i++) {
        const heightValue = pixels[0][i];

// Normalizujemy wysokości do skali 0-255
const normalizedHeight = Math.round((heightValue - minVal) / scale);

// Używamy interpolacji liniowej, aby stworzyć płynne przejście między czerwonym a niebieskim
const redIntensity = Math.round(255 * Math.pow((normalizedHeight / 255), 2));  // Czerwony (kwadratowa interpolacja)
const blueIntensity = Math.round(255 * Math.pow((1 - normalizedHeight / 255), 2));  // Niebieski (kwadratowa interpolacja odwrotna)

// Wartości pikseli w obrazie: Czerwony, Zielona (neutralna), Niebieski, Przezroczystość (Alpha)
data[i * 4] = redIntensity;  // Czerwony
data[i * 4 + 1] = 0;  // Zielona (brak koloru zielonego)
data[i * 4 + 2] = blueIntensity;  // Niebieski
data[i * 4 + 3] = 255;  // Pełna przezroczystość (alpha)


      }
        }
  
    // Umieszczamy dane obrazu na canvas
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  };
  