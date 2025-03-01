import { transform } from "ol/proj";

const referencePointEPSG2176: [number, number] = [5575800, 5996000]; // A point in EPSG:2176

/**
 * Convert resolutions from EPSG:2176 to EPSG:3857
 * @param resolutions - Resolutions in EPSG:2176
 * @param referencePoint - Reference point for conversion (e.g., [x, y] in EPSG:2176)
 * @returns Transformed resolutions in EPSG:3857
 */
export function transformResolutions(
  resolutions: number[],
  referencePoint: [number, number] = referencePointEPSG2176
): number[] {
  const [x1, y1] = referencePoint;
  const [x2, y2] = transform([x1, y1], "EPSG:2176", "EPSG:3857");

  const scaleFactor = Math.abs(x2 - x1) / Math.abs(x1);

  return resolutions.map((res) => res * scaleFactor);
}
