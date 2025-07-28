import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function MapPlanner({ onAreaSelect }) {
  const center = [18.5204, 73.8567];

  const handleCreated = (e) => {
    const layer = e.layer;
    if (e.layerType === "polygon") {
      const coordinates = layer
        .getLatLngs()[0]
        .map((point) => [point.lat, point.lng]);
      onAreaSelect(coordinates); // pass to parent
    }
  };

  return (
    <MapContainer center={center} zoom={14} className="h-[400px] w-full z-10">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
          onCreated={handleCreated}
        />
      </FeatureGroup>
    </MapContainer>
  );
}

export default MapPlanner;
