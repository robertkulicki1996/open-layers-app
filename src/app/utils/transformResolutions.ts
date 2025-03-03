/**
 * Convert resolutions from EPSG:2176 to EPSG:3857 using a given scale factor.
 * @param resolutions - Resolutions in EPSG:2176
 * @param scaleFactor - The scale factor to apply to resolutions (computed beforehand)
 * @returns Transformed resolutions in EPSG:3857
 */
export function transformResolutions(
  resolutions: number[],
  scaleFactor: number,
): number[] {
  if (scaleFactor === null) {
    console.error("Error: Scale factor could not be calculated.");
    return resolutions;
  }

  return resolutions.map((res) => res * scaleFactor);
}