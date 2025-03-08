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

      Potree.loadPointCloud(pointcloudURL, pointcloudTitle, (e: any) => {
        let scene = viewer.scene;
        let pointcloud = e.pointcloud;

        let material = pointcloud.material;
        material.size = 1;
        material.pointSizeType = Potree.PointSizeType.FIXED;
        material.shape = Potree.PointShape.CIRCLE;

        scene.addPointCloud(pointcloud);

        fitToScreen && viewer.fitToScreen();

        console.log(`added pointcloud ${pointcloudTitle}`);
      });
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
