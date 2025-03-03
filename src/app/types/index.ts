export enum EPSG {
  EPSG_2176 = "EPSG:2176",
  EPSG_3857 = "EPSG:3857",
}

export type TileSize = 512 | 256;

export interface RasterMetadata {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  minVal?: number;
  maxVal?: number;
  resolutions: number[];
  tileSize: TileSize;
}
