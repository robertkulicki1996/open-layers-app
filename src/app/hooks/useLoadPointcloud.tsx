import { useEffect } from "react";

interface UseLoadPointcloudProps {
  loaded: boolean;
  potreeLibRef: React.RefObject<any>;
  potreeViewerRef: React.RefObject<any>;
  pointcloudURL: string;
  pointcloudTitle: string;
  fitToScreen?: boolean;
}

export default function useLoadPointcloud({
  loaded,
  potreeLibRef,
  potreeViewerRef,
  pointcloudURL,
  pointcloudTitle,
  fitToScreen = false,
}: UseLoadPointcloudProps) {
  useEffect(() => {
    if (loaded && potreeViewerRef.current && potreeLibRef.current) {
      const Potree = potreeLibRef.current;
      const viewer = potreeViewerRef.current;

      const loadLasFile = async () => {
        try {
          Potree.loadPointCloud(pointcloudURL, "PointCloud", (e: any) => {
            let pointcloud = e.pointcloud;
            let scene = viewer.scene;

            let material = pointcloud.material;
            material.size = 1;
            material.pointSizeType = Potree.PointSizeType.FIXED;
            material.shape = Potree.PointShape.CIRCLE;

            scene.addPointCloud(pointcloud);
            viewer.fitToScreen();
            console.log("Chmura punktów została załadowana!");
          });
        } catch (error) {
          console.error("Błąd podczas ładowania pliku LAS:", error);
        }
      };

      loadLasFile();
    }
  }, [
    fitToScreen,
    loaded,
    pointcloudTitle,
    pointcloudURL,
    potreeLibRef,
    potreeViewerRef,
  ]);
}
