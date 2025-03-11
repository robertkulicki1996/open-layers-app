import { Coordinate } from "ol/coordinate";
import { transform } from "ol/proj";
import { getEuclideanDistance } from "./getEuclideanDistance";

/**
 * Computes the scale factor between two projections.
 * @param point1 - First coordinate [lon, lat] in source projection.
 * @param point2 - Second coordinate [lon, lat] in source projection.
 * @param sourceProj - EPSG code of the source projection.
 * @param targetProj - EPSG code of the target projection.
 * @returns Scale factor between original and transformed coordinates.
 */
export function getScaleFactor(
  point1: Coordinate,
  point2: Coordinate,
  sourceProj: string,
  targetProj: string
): number {
  const transformedPoint1 = transform(point1, sourceProj, targetProj);
  const transformedPoint2 = transform(point2, sourceProj, targetProj);

  const originalDist = getEuclideanDistance(point1, point2);
  const transformedDist = getEuclideanDistance(
    transformedPoint1,
    transformedPoint2
  );

  if (originalDist === 0) return 1;

  return transformedDist / originalDist;
}
