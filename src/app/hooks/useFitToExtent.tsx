import { useEffect } from "react";
import { Feature, Map } from "ol";
import { Layer } from "ol/layer";
import { extend as extendExtent, Extent } from "ol/extent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";

export function useFitToExtent(
  map: Map | null,
  layers: Layer[],
  featuresLayer?: VectorLayer<
    VectorSource<Feature<Geometry>>,
    Feature<Geometry>
  > | null
) {
  useEffect(() => {
    if (!map) return;

    let combinedExtent: Extent | undefined;

    if (featuresLayer && featuresLayer?.getSource()?.getFeatures().length) {
      combinedExtent = featuresLayer?.getSource()?.getExtent();
    }

    layers.forEach((layer) => {
      const layerExtent = layer.getExtent?.();
      if (layerExtent) {
        combinedExtent = combinedExtent
          ? extendExtent(combinedExtent, layerExtent)
          : layerExtent;
      }
    });

    if (combinedExtent) {
      map
        .getView()
        .fit(combinedExtent, { padding: [50, 50, 50, 50], duration: 2000 });
    }
  }, [map, layers, featuresLayer]);
}
