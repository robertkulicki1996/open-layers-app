import React, { useState } from "react";
import { Layer } from "ol/layer";

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
const LayersPanel: React.FC<LayersPanelProps> = ({ layers }: LayersPanelProps): JSX.Element => {
  const [_, setRefresh] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);
  const [opacity, setOpacity] = useState<number>(1);

  const toggleLayerVisibility = (layer: Layer) => {
    layer.setVisible(!layer.getVisible());
    setRefresh((prev) => prev + 1);
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = parseFloat(e.target.value);
    if (selectedLayer) {
      selectedLayer.setOpacity(newOpacity);
      setOpacity(newOpacity);
    }
  };

  const handleLayerClick = (layer: Layer) => {
    setSelectedLayer(layer);
    setOpacity(layer.getOpacity() ?? 1);
  };

  return (
    <div className="layers-panel">
      <h3 className="panel-title">Warstwy</h3>
      {layers.map((layer, index) => (
        <div key={index} className="layer-item">
          <div className="layer-item-label">
            <span onClick={() => handleLayerClick(layer)} title={"kliknij by zmienić przezroczystość"}>
              {index + 1}. {layer.get("title") || `Layer ${index + 1}`}
            </span>
            <input
              type="checkbox"
              checked={layer.getVisible()}
              onChange={() => toggleLayerVisibility(layer)}
            />
          </div>
          {selectedLayer === layer && (
            <div className="opacity-input-wrapper">
              <label>Przezroczystość:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={opacity}
                onChange={handleOpacityChange}
              />
              <span>{(opacity * 100).toFixed(0)}%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LayersPanel;
