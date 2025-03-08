import { useEffect } from "react";
// import { createLazPerf } from 'laz-perf';

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

      // const loadLasFile = async () => {
      //   const url = "http://localhost:5173/data/6/pointclouds/2473/2473.laz";
  
      //   try {
      //     const response = await fetch(url);
      //     const arrayBuffer = await response.arrayBuffer();
      //     const LazPerf = await createLazPerf();

      //     // Dekodowanie pliku .laz
      //     const lasFile = new LA(arrayBuffer);
      //     lasFile.open();
  
      //     const header = lasFile.getHeader();
      //     console.log("Nagłówek pliku:", header);
  
      //     // Pobranie punktów z pliku
      //     lasFile.readData(header.pointsCount, (points) => {
      //       console.log("Przykładowe punkty:", points);
  
      //       // Konwersja do formatu kompatybilnego z Three.js
      //       const geometry = new THREE.BufferGeometry();
      //       const positions = new Float32Array(points.length * 3);
            
      //       for (let i = 0; i < points.length; i++) {
      //         positions[i * 3] = points[i].position[0];
      //         positions[i * 3 + 1] = points[i].position[1];
      //         positions[i * 3 + 2] = points[i].position[2];
      //       }
  
      //       geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  
      //       // Dodanie chmury punktów do Potree
      //       const material = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
      //       const pointCloud = new THREE.Points(geometry, material);
  
      //       // Inicjalizacja Potree
      //       const viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
      //       viewer.setEDLEnabled(true);
      //       viewer.scene.addPointCloud(pointCloud);
      //       viewer.fitToScreen();
      //     });
  
      //     lasFile.close();
      //   } catch (error) {
      //     console.error("Błąd podczas odczytu pliku LAS:", error);
      //   }
      // };

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
