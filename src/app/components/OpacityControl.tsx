import React, { useCallback, useState } from "react";
import { Layer } from "ol/layer";

interface OpacityControlProps {
  layer: Layer;
}

const OpacityControl: React.FC<OpacityControlProps> = React.memo(
  ({ layer }) => {
    const [opacity, setOpacity] = useState(layer.getOpacity());

    const handleOpacityChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(e.target.value);
        layer.setOpacity(newOpacity);
				setOpacity(newOpacity);
      },
      [layer]
    );

    const formatOpacity = useCallback((opacity: number): string => {
      return `${(opacity * 100).toFixed()}%`;
    }, []);

    return (
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
        <span>{formatOpacity(opacity)}</span>
      </div>
    );
  }
);

export default OpacityControl;
