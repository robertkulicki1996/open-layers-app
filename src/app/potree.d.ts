// potree.d.ts

declare global {
  interface Window {
    Potree: Potree;
		viewer: ViewStateLayerStateExtent;
  }

  interface Potree {
    Viewer: Viewer;
    PointCloud: PointCloud;
  }

  interface PotreeViewer {
    scene: any;
    setPointBudget: (budget: number) => void;
    loadPointCloud: (
      url: string,
      name: string,
      callback: (pointCloud: PointCloud) => void
    ) => void;
    fitToScreen: () => void;
  }

  interface PointCloud {
    // Define the properties or methods that are relevant to PointCloud
  }
}

export {};
