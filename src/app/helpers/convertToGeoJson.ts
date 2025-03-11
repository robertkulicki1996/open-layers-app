import { VectorData } from "../types";

export function convertToGeoJSON(vectorData: VectorData): any {
  const coordinates = vectorData.geom.coordinates[0].map((coord) => [
    coord[0],
    coord[1],
  ]);

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: vectorData.geom.type,
          coordinates: coordinates,
        },
        properties: vectorData.properties,
      },
    ],
  };
}
