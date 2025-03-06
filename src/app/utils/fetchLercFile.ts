/**
 * Pobiera plik LERC jako ArrayBuffer.
 * @param {string} url - Pełny URL do pliku LERC.
 * @returns {Promise<ArrayBuffer | null>} - Zwraca dane binarne lub `null`, jeśli wystąpił błąd.
 */
export async function fetchLercFile(url: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Błąd pobierania: ${url}`);

    return await response.arrayBuffer();
  } catch (error) {
    console.error("Błąd pobierania LERC:", error);
    return null;
  }
}
