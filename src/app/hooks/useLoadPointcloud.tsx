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


        // 1. Wczytanie pliku LAS i utworzenie chmury punktów
        Potree.loadPointCloud(pointcloudURL, "MyPointCloud", (e: any) => {
          let pointcloud = e.pointcloud;
          let scene = viewer.scene;

          // 2. Ustawienie materiału chmury punktów
          let material = pointcloud.material;
          material.size = 1;
          material.pointSizeType = Potree.PointSizeType.FIXED;
          material.shape = Potree.PointShape.CIRCLE;

          // 3. Dodanie chmury punktów do sceny Potree
          scene.addPointCloud(pointcloud);
          viewer.fitToScreen(); // Dopasowanie do widoku
          console.log("Chmura punktów została załadowana!");
        });
   

        // // 1. Tworzymy instancję LazPerf
        // const LazPerf = await createLazPerf();
        // const laszip = new LazPerf.LASZip();

        // // 2. Alokujemy pamięć wirtualną na dane
        // const filePtr = LazPerf._malloc(arrayBuffer.byteLength); // Przydzielamy miejsce w pamięci

        // // 3. Kopiujemy dane z ArrayBuffer do pamięci wirtualnej
        // LazPerf.HEAPU8.set(new Uint8Array(arrayBuffer), filePtr);

        // // 4. Otwieramy plik w pamięci
        // laszip.open(filePtr, arrayBuffer.byteLength); // Otwarcie pliku z pamięci wirtualnej

  
        //   const points = [];
        //   for (let i = 0; i < laszip.getPointCount(); i++) {
        //     laszip.getPoint(filePtr); // Pobranie punktu
        //     const pointData = LazPerf.HEAPU8.subarray(filePtr, filePtr + laszip.getPointDataLength());
            
        //     // Zastosowanie konwersji na XYZ, zakładając, że wiesz, jak interpretować te dane
        //     const x = pointData[0]; // Właściwe dekodowanie w zależności od formatu pliku
        //     const y = pointData[4];
        //     const z = pointData[8];
            
        //     points.push(new THREE.Vector3(x, y, z));
        //   }
  
        //   // 4. Tworzenie geometrii chmury punktów
        //   const geometry = new THREE.BufferGeometry();
        //   const positionArray = new Float32Array(points.length * 3);
  
        //   points.forEach((point, index) => {
        //     positionArray.set([point.x, point.y, point.z], index * 3);
        //   });
  
        //   geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
  
        //   // 5. Użycie materiału do chmury punktów
        //   const material = new Potree.PointCloudMaterial();
        //   const pointCloud = new Potree.PointCloudOctree(geometry, material);
  
        //   // 6. Dodanie chmury punktów do sceny Potree
        //   const viewer = new Potree.Viewer(document.getElementById("potree_container"));
        //   viewer.scene.addPointCloud(pointCloud);
        //   viewer.fitToScreen();
  
        } catch (error) {
          console.error("Błąd podczas ładowania pliku LAS:", error);
        }

      
      }

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
