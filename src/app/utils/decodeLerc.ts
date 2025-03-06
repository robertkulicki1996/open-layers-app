import * as Lerc from "lerc";

/**
 * Dekoduje plik LERC do tablicy wysokości.
 * @param {ArrayBuffer} arrayBuffer - Bufor binarny pobrany z pliku LERC.
 * @returns {{ pixels: Float32Array; width: number; height: number } | null} - Zdekodowane dane wysokościowe lub `null`, jeśli wystąpił błąd.
 */
export function decodeLercData(arrayBuffer: ArrayBuffer): { pixels: Float32Array; width: number; height: number } | null {
  try {
    const lercData = Lerc.decode(arrayBuffer) as Lerc.LercData;

    console.log(lercData);

    // Pobieramy pierwszą warstwę danych, jeśli `pixels` jest tablicą tablic
    const pixels = Array.isArray(lercData.pixels) ? (lercData.pixels[0] as Float32Array) : (lercData.pixels as Float32Array);

    console.log(pixels);

    return { pixels, width: lercData.width, height: lercData.height };
  } catch (error) {
    console.error("Błąd dekodowania LERC:", error);
    return null;
  }
}
