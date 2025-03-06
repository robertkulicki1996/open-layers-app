import { decodeLercData } from "./decodeLerc";
import { fetchLercFile } from "./fetchLercFile";

/**
 * Pobiera i dekoduje plik LERC na podstawie podanego URL.
 * @param {string} url - Pełny URL do pliku LERC.
 * @returns {Promise<{ pixels: Float32Array; width: number; height: number } | null>} - Zwraca zdekodowane dane wysokościowe lub `null` w przypadku błędu.
 */
export async function getLercData(
  url: string
): Promise<{ pixels: Float32Array; width: number; height: number } | null> {
  const arrayBuffer = await fetchLercFile(url);
  if (!arrayBuffer) return null;

  return decodeLercData(arrayBuffer);
}
