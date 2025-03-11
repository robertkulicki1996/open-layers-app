import Logo from "../components/Logo";
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
        <Logo />
        <h1 className="app-info">SkySnap - zadanie rekrutacyjne 2025</h1>
        <span className="app-loader" />
      </>
    );
  }

  if (error) {
    return <div>Błąd podczas ładowania metadanych: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <p>Brak metadanych.</p>;
  }

  return <MapContainer data={data} />;
}

export default MapView;
