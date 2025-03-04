import React, { useState } from "react";
import { Layer } from "ol/layer";

interface LayerPanelProps {
  layers: Layer[];
}

const LayerPanel: React.FC<LayerPanelProps> = ({ layers }) => {
  const [_, setRefresh] = useState(0);

  const toggleLayerVisibility = (layer: Layer) => {
    layer.setVisible(!layer.getVisible());
    setRefresh((prev) => prev + 1);
  };
  return (
    <div className="layer-panel">
      <h3 className="panel-title">Warstwy</h3>
      {layers.map((layer, index) => (
        <div key={index} className="layer-item">
          <span>
            {index + 1}. {layer.get("title") || `Warstwa ${index + 1}`}
          </span>
          <input
            type="checkbox"
            checked={layer.getVisible()}
            onChange={() => toggleLayerVisibility(layer)}
          />
        </div>
      ))}
    </div>
  );
};

export default LayerPanel;
