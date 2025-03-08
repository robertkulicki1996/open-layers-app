import { useEffect, useRef, useState } from "react";
import useBasicViewerConfig from "../hooks/useBasicViewerConfig.js";
import useLoadPointcloud from "../hooks/useLoadPointcloud.js";

export default function PotreePointcloud() {
  const iframe = useRef<any>(null);
  const potreeLibRef = useRef<any>(null);
  const potreeViewerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (iframe.current && loaded) {
      potreeLibRef.current = iframe.current.contentDocument.defaultView.Potree;
      potreeViewerRef.current = iframe.current.contentDocument.defaultView.viewer;
    }
  }, [loaded]);

  useBasicViewerConfig({ loaded, potreeLibRef, potreeViewerRef });

  useLoadPointcloud({
    loaded,
    potreeLibRef,
    potreeViewerRef,
    pointcloudURL: "http://localhost:5173/data/6/pointclouds/2473/ept/ept.json",
    pointcloudTitle: "Chmura punktów 3D",
    fitToScreen: true
  });

  return (
    <iframe
      title="3D Pointcloud"
      id="potreeIframe"
      src="potree/viewer.html"
      ref={iframe}
      style={iframeStyle}
      onLoad={() => setLoaded(true)}
    />
  );
}

const iframeStyle = {
  width: "100%",
  height: "80vh",
  border: 0,
};
