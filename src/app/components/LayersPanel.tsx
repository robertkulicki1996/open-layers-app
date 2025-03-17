import React, { useCallback, useState } from "react";
import { Layer } from "ol/layer";
import OpacityControl from "./OpacityControl";

interface LayersPanelProps {
  layers: Layer[];
}

/**
 * LayersPanel component allows toggling the visibility of map layers and adjusting opacity.
 *
 * This component renders a list of layers with checkboxes to toggle their visibility.
 * When a layer is clicked, an input range appears to adjust the layer's opacity.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Layer[]} props.layers - Array of layers that will be displayed in the panel.
 *
 * @example
 * // Example usage:
 * const layers = [layer1, layer2, layer3];
 * <LayersPanel layers={layers} />
 *
 * @returns {JSX.Element} Renders the layers panel with checkboxes to toggle layer visibility and opacity control.
 */
const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
}: LayersPanelProps): JSX.Element => {
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);

  const toggleLayerVisibility = useCallback((layer: Layer) => {
    layer.setVisible(!layer.getVisible());
  }, []);

  const handleLayerClick = useCallback((layer: Layer) => {
    setSelectedLayer(layer);
  }, []);

  const getLayerTitle = useCallback((layer: Layer, index: number): string => {
    return `${index + 1}. ${layer.get("title") || `Layer ${index + 1}`}`;
  }, []);

  return (
    <div className="layers-panel">
      <h3 className="panel-title">Warstwy</h3>
      {layers.map((layer, index) => (
        <div key={index} className="layer-item">
          <div className="layer-item-label">
            <span
              onClick={() => handleLayerClick(layer)}
              title="kliknij by zmienić przezroczystość"
            >
              {getLayerTitle(layer, index)}
            </span>
            <input
              type="checkbox"
              defaultChecked
              onChange={() => toggleLayerVisibility(layer)}
            />
          </div>
          {selectedLayer === layer && <OpacityControl layer={layer} />}
        </div>
      ))}
    </div>
  );
};

export default LayersPanel;
