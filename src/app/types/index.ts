export enum Projection {
  EPSG_2176 = "EPSG:2176",
  EPSG_3857 = "EPSG:3857",
  EPSG_4326 = "EPSG:4326"
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

export interface Geom {
  type: string;
  coordinates: number[][][];
}

export interface Properties {
  pred_ID: number;
}

export interface VectorData {
  id: number;
  photos_m2m: never[];
  tabulars_m2m: never[];
  is_active: boolean;
  data_type_fk: number;
  geom: Geom;
  is_2d: boolean;
  properties: Properties;
  dataset_fk: number;
  file_fk: number;
}

export interface VectorDataResponse {
  count: number,
  next: boolean | null,
  previous: boolean | null,
  results: VectorData[]
}