import MapContainer from "../components/MapContainer";
import { useFetch } from "../hooks/useFetch";
import { RasterMetadata } from "../types";

function MapView() {
  const { loading, data, error } = useFetch<RasterMetadata>([
    "http://localhost:5173/data/6/rasters/499/499/metadata.json",
    "http://localhost:5173/data/6/rasters/500/500/metadata.json",
  ]);

  if (loading) {
    return (
      <>
        <div
          style={{
            margin: "20vh auto",
            width: "fit-content",
            height: "30vh",
            padding: "0",
            display: "flex",
          }}
        >
          <img src="logo-skysnap-sq.webp" />
        </div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "sans-serif, Arial",
          }}
        >
          SkySnap - Rekrutacja 2025
        </h1>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "sans-serif, Arial",
          }}
        >
          Trwa ładowanie metadanych...
        </h2>
      </>
    );
  }

  if (error) {
    return <div>Błąd podczas ładowania metadanych: {error}</div>;
  }

  return (
    <div>
      {!loading && data?.length === 2 ? (
        <MapContainer data={data} />
      ) : (
        <p>Brak metadanych.</p>
      )}
    </div>
  );
}

export default MapView;
