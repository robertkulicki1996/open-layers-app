import { useEffect, useRef, useState } from "react";
import useBasicViewerConfig from "../hooks/useBasicViewerConfig.js";
import useLoadPointcloud from "../hooks/useLoadPointcloud.js";

/**
 * `PotreePointcloud` component that embeds a Potree point cloud viewer inside an iframe.
 * This component initializes the Potree viewer within the iframe and loads a 3D point cloud from a specified URL.
 * It utilizes Potree's API to manage the viewer and the loaded point cloud.
 *
 * The component renders an iframe that points to a Potree viewer HTML file,
 * which will then load and display a 3D point cloud based on the provided pointcloud URL.
 *
 * @component
 * @example
 * return <PotreePointcloud />;
 *
 * @returns {JSX.Element} An iframe element embedding the Potree point cloud viewer.
 * The iframe contains a Potree viewer that will load and display the point cloud.
 */
const PotreePointcloud = (): JSX.Element => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const potreeLibRef = useRef<Potree>();

  const potreeViewerRef = useRef<PotreeViewer>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (iframe.current && loaded) {
      const iframeDoc = iframe.current.contentDocument;

      if (iframeDoc && iframeDoc.defaultView) {
        potreeLibRef.current =
          iframe.current.contentDocument.defaultView?.Potree;
        potreeViewerRef.current =
          iframe.current.contentDocument.defaultView?.viewer;
      }
    }
  }, [loaded]);

  useBasicViewerConfig({ loaded, potreeLibRef, potreeViewerRef });

  useLoadPointcloud({
    loaded,
    potreeLibRef,
    potreeViewerRef,
    pointcloudURL: "http://localhost:5173/data/6/pointclouds/2473/ept/ept.json",
    pointcloudTitle: "Chmura punktów 3D",
    fitToScreen: true,
  });

  return (
    <iframe
      title="Chmura punktów 3D"
      id="potreeIframe"
      src="potree/viewer.html"
      ref={iframe}
      style={{ width: "100%", height: "100vh", border: 0 }}
      onLoad={() => setLoaded(true)}
    />
  );
};

export default PotreePointcloud;
