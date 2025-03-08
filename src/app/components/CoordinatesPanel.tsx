import { useEffect, useState } from "react";
import { useMap } from "../hooks/useMap";
import { Projection } from "../types";

const CoordinatesPanel = () => {
  const { map } = useMap();
  const [coordinates, setCoordinates] = useState<{
    easting: string | null;
    northing: string | null;
  }>({ easting: null, northing: null });

  useEffect(() => {
    if (map) {
      map.on("pointermove", (event) => {
        const pixel = event.pixel;
        const [easting, northing] = map.getCoordinateFromPixel(pixel);
        setCoordinates({
          easting: easting.toFixed(3),
          northing: northing.toFixed(3),
        });
      });
    }
  }, [map]);

  return (
    <div className="coordinates-panel">
      {coordinates.easting && coordinates.northing
        ? `Współrzędne: ${coordinates.easting}, ${coordinates.northing}`
        : null}
      <span className="projection">{Projection.EPSG_2176}</span>
    </div>
  );
};

export default CoordinatesPanel;
