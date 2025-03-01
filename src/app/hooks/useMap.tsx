import { useContext } from "react";
import { MapContext, MapContextType } from "../context/MapContext";

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
