import { PlaceType, icon } from '@/data';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function MiniMap({
  place,
  setMiniMap,
}: {
  place: PlaceType;
  setMiniMap: (map: L.Map | null) => void;
}) {
  return (
    <MapContainer
      ref={setMiniMap}
      key={place.name}
      center={place.latlng}
      zoom={16}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}
      style={{ height: '224px', width: '100%' }}
      className="mb-6 dark:brightness-95 dark:contrast-75 dark:hue-rotate-180 dark:invert"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={place.latlng} icon={icon} />
    </MapContainer>
  );
}
