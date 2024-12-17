import { PlaceType, getBoundedPlaces } from '@/data';
import { ViewfinderCircleIcon } from '@heroicons/react/20/solid';
import L from 'leaflet';
import { useCallback } from 'react';
import { useEffect } from 'react';
import {
  AttributionControl,
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';

const iconHover = new L.Icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: '/marker-icon-hover-2x.png',
  iconSize: [25, 41],
  iconUrl: '/marker-icon-hover.png',
  shadowSize: [41, 41],
  shadowUrl: '/marker-shadow.png',
});

export function Map({
  bounds,
  setBounds,
  map,
  setMap,
  place,
  setPlace,
  places,
  setPlaces,
  placeHover,
  setPlaceHover,
}: {
  bounds: [[number, number], [number, number]];
  setBounds: (bounds: [[number, number], [number, number]]) => void;
  map: L.Map | null;
  setMap: (map: L.Map | null) => void;
  place: PlaceType | null;
  setPlace: (place: PlaceType | null) => void;
  places: PlaceType[];
  setPlaces: (places: PlaceType[]) => void;
  placeHover: PlaceType | null;
  setPlaceHover: (place: PlaceType | null) => void;
}) {
  const centerOnCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map?.flyTo([latitude, longitude], 13);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location');
        },
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [map]);

  const onMove = useCallback(() => {
    if (map) {
      const bounds = map.getBounds();
      setBounds([
        [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
        [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
      ]);
    }
  }, [map]);

  useEffect(() => {
    const fetchPlaces = async () => setPlaces(await getBoundedPlaces(bounds));
    fetchPlaces();
  }, [bounds, map]);

  useEffect(() => {
    map?.on('move', onMove);
    return () => {
      map?.off('move', onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    if (place) map?.flyTo(place.latlng, 13);
  }, [map, place]);

  return (
    <>
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
        <AttributionControl
          position="bottomright"
          prefix="As an Amazon Associate, Famous Tables earns from qualifying purchases."
        />
        {places.map((place, placeIndex) => (
          <Marker
            key={`place-${placeIndex}` + (place === placeHover ? '-hover' : '')}
            position={place.latlng}
            eventHandlers={{
              click: () => setPlace(place),
              mouseover: () => setPlaceHover(place),
              mouseout: () => setPlaceHover(null),
            }}
            {...(place === placeHover && { icon: iconHover })}
          />
        ))}
      </MapContainer>
      <div
        className="absolute left-[10px] top-[80px] z-[1000] h-[34px] w-[34px] cursor-pointer overflow-hidden rounded dark:brightness-95 dark:contrast-75 dark:hue-rotate-180 dark:invert"
        style={{ border: '2px solid rgba(0, 0, 0, 0.2)' }}
        onClick={centerOnCurrentLocation}
      >
        <ViewfinderCircleIcon className="box-content h-6 w-6 bg-[#ffffff] p-[3px] text-black hover:bg-[#f4f4f4]" />
      </div>
    </>
  );
}

export function MiniMap({
  place,
  miniMap,
  setMiniMap,
}: {
  place: PlaceType;
  miniMap: L.Map | null;
  setMiniMap: (map: L.Map | null) => void;
}) {
  useEffect(() => {
    miniMap?.invalidateSize();
  }, [miniMap]);

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
      <Marker position={place.latlng} />
    </MapContainer>
  );
}
