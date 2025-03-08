import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { Projection } from "../types";

/**
 * Registers the EPSG:2176 coordinate reference system using the `proj4` library.
 * 
 * This function defines the parameters for the EPSG:2176 coordinate reference system 
 * using `proj4.defs()`. These parameters describe the transformation for a Transverse 
 * Mercator projection, commonly used in Poland. The function then registers this projection 
 * in OpenLayers using `register()`.
 * 
 * The EPSG:2176 definition is based on the local coordinate system (Transverse Mercator) 
 * with the GRS80 ellipsoid and other specific parameters.
 * 
 * @function
 * @name registerEPSG2176
 * 
 * @example
 * // Register the EPSG:2176 projection
 * registerEPSG2176();
 * 
 * @see https://epsg.io/2176
 * @see {@link https://proj.org/ proj4js documentation}
 */
export function registerEPSG2176() {
  proj4.defs(
    Projection.EPSG_2176,
    "+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
  );
  register(proj4);
}