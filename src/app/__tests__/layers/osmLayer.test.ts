import { describe, it, expect } from "vitest";
import { createOsmLayer } from "../../layers/osmLayer";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

describe("createOsmLayer", () => {
  it("should create an OpenStreetMap layer with the correct title", () => {
    const title = "Mapa bazowa - Open street map";
    const osmLayer = createOsmLayer(title);

    expect(osmLayer).toBeInstanceOf(TileLayer);
    expect(osmLayer.getSource()).toBeInstanceOf(OSM);
    console.log(osmLayer.get("title"));
    expect(osmLayer.getProperties().title).toBe(title);
  });
});