import { Coordinate } from "ol/coordinate";

/**
 * Calculates the Euclidean distance between two points.
 * @param point1 - First point [x, y].
 * @param point2 - Second point [x, y].
 * @returns Euclidean distance between the points.
 */
export function getEuclideanDistance(
  point1: Coordinate,
  point2: Coordinate
): number {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  
  return Math.sqrt(dx * dx + dy * dy);
}
