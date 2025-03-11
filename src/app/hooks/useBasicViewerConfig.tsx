import { useEffect } from "react";

interface UseBasicViewerConfigProps {
  loaded: boolean;
  potreeLibRef: React.RefObject<any>;
  potreeViewerRef: React.RefObject<any>;
}

/**
 * A custom hook that configures the basic settings for a Potree viewer instance.
 * This hook sets up the Potree viewer when the `loaded` state is `true` and both the `potreeLibRef` and `potreeViewerRef` are available.
 *
 * The settings applied include enabling EDL (Eye-Dome Lighting), configuring the field of view (FOV), setting point budget,
 * and loading the viewer's GUI and settings from a URL. It also applies basic controls to the viewer.
 *
 * @param {UseBasicViewerConfigProps} props - The configuration for the Potree viewer.
 * @param {boolean} props.loaded - A flag that indicates whether the Potree viewer has been loaded.
 * If `true`, the hook will execute the configuration setup.
 * @param {React.RefObject<any>} props.potreeLibRef - A reference to the Potree library, typically pointing to the Potree object inside the iframe.
 * @param {React.RefObject<any>} props.potreeViewerRef - A reference to the Potree viewer instance to configure.
 *
 * @example
 * useBasicViewerConfig({
 *   loaded: true,
 *   potreeLibRef: potreeLibRef,
 *   potreeViewerRef: potreeViewerRef,
 * });
 *
 * @returns {void}
 */
const useBasicViewerConfig = ({
  loaded,
  potreeLibRef,
  potreeViewerRef,
}: UseBasicViewerConfigProps): void => {
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

      console.log("Using basic Potree viewer config");
    }
  }, [loaded, potreeViewerRef, potreeLibRef]);
};

export default useBasicViewerConfig;
