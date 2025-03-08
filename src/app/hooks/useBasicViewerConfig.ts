import { useEffect } from "react";

interface UseBasicViewerConfigProps {
  loaded: boolean;
  potreeLibRef: React.RefObject<any>;
  potreeViewerRef: React.RefObject<any>;
}

export default function useBasicViewerConfig({
  loaded,
  potreeLibRef,
  potreeViewerRef,
}: UseBasicViewerConfigProps) {
  useEffect(() => {
    if (loaded && potreeViewerRef.current && potreeLibRef.current) {
      const Potree = potreeLibRef.current;
      const viewer = potreeViewerRef.current;

      viewer.setEDLEnabled(true);
      viewer.setFOV(60);
      viewer.setPointBudget(1_000_000);
      viewer.loadSettingsFromURL();
      viewer.setBackground("gradient");
      viewer.setDescription("potree component");

      const controls = new Potree.EarthControls(viewer);
      viewer.setControls(controls);

      viewer.loadGUI(() => {
        viewer.setLanguage("en");
      });

      console.log("using basic Potree viewer config");
    }
  }, [loaded, potreeViewerRef, potreeLibRef]);
}
