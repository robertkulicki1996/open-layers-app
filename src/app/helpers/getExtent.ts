import { Extent } from "ol/extent";
import { RasterMetadata } from "../types";

export function getExtent(metadata: RasterMetadata): Extent {
  const { minX, minY, maxX, maxY } = metadata;
  return [minX, minY, maxX, maxY];
}
