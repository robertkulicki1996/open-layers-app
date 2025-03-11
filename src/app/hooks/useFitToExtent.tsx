import { useEffect } from "react";
import { Feature, Map } from "ol";
import { Layer } from "ol/layer";
import { extend as extendExtent, Extent } from "ol/extent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry } from "ol/geom";

/**
 * Custom React hook that automatically adjusts the map view to fit the extent of provided layers and features.
 *
 * This hook listens for changes in the map, layers, and an optional features layer.
 * It calculates the combined extent of all provided layers and fits the map view accordingly.
 *
 * @param {Map | null} map - The OpenLayers map instance. If `null`, the hook does nothing.
 * @param {Layer[]} layers - An array of OpenLayers layers whose extents should be considered for fitting.
 * @param {VectorLayer<VectorSource<Feature<Geometry>>, Feature<Geometry>> | null} [featuresLayer] - 
 *        An optional vector layer containing features. If provided, its extent will also be included in the fitting calculation.
 *
 * @example
 * useFitToExtent(map, layers, featuresLayer);
 */
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
