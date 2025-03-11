import { LayerZIndex } from "../types";

interface LayerProperties {
  title: string,
  [key: string]: string | boolean | number
}

interface LayerOptionsProps {
  properties: LayerProperties
  zIndex: LayerZIndex,
  opacity?: number,
  visible?: boolean;
}

/**
 * Creates common options for layers: title, zIndex, opacity and visible.
 * @param {string} title The title of the layer.
 * @param {LayerZIndex} zIndex The zIndex of the layer.
 * @param {number} opacity The opacity level of the layer (from 0 to 1).
 * @param {boolean} visible The visible flag - boolean (default true).
 * @returns {Object} The layer options including title, zIndex, and opacity.
 *
 * @example
 * const options = createLayerOptions("My Layer", LayerZIndex.BASE, 0.7);
 */
export function createLayerOptions(
  title: string,
  zIndex: LayerZIndex = LayerZIndex.BASE,
  opacity: number = 1,
  visible: boolean = true
): LayerOptionsProps {
  return {
    properties: { title },
    zIndex,
    opacity,
    visible
  };
}
