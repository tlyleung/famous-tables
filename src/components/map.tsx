import { PlaceType } from '@/data';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function Map({
  bounds,
  places,
  setMap,
  setPlace,
}: {
  bounds: [[number, number], [number, number]];
  places: PlaceType[];
  setMap: (map: L.Map | null) => void;
  setPlace: (place: PlaceType | null) => void;
}) {
  return (
    <MapContainer
      ref={setMap}
      bounds={bounds}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
      className="absolute inset-0 dark:brightness-95 dark:contrast-75 dark:hue-rotate-180 dark:invert"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, placeIndex) => (
        <Marker
          key={`place-${placeIndex}`}
          position={place.latlng}
          eventHandlers={{ click: () => setPlace(place) }}
        />
      ))}
    </MapContainer>
  );
}
