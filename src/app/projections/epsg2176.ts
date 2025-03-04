import { get } from "ol/proj";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

export function registerEPSG2176() {
  proj4.defs(
    "EPSG:2176",
    "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
  );
  register(proj4);

  console.log(get("EPSG:2176"));
}