'use client';

import { Avatar } from '@/components/catalyst/avatar';
import { Button } from '@/components/catalyst/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/catalyst/dialog';
import { Navbar } from '@/components/catalyst/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/catalyst/sidebar';
import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import { PlaceType, getBoundedPlaces } from '@/data';
import {
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const londonBounds: L.LatLngBounds = L.latLngBounds(
  L.latLng(51.53135619079523, -0.08182149094053658),
  L.latLng(51.491576912253926, -0.19390027804411508),
);

const siliconValleyBounds: L.LatLngBounds = L.latLngBounds(
  L.latLng(37.44932057039871, -121.88416847719738),
  L.latLng(37.34403806224733, -122.18491921873996),
);

const icon = L.icon({
  iconAnchor: [12, 41],
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconUrl: '/images/marker-icon.png',
  shadowSize: [41, 41],
  shadowUrl: '/images/marker-shadow.png',
  // popupAnchor: [1, -34],
  // tooltipAnchor: [16, -28],
});

export default function Home() {
  const [bounds, setBounds] = useState<L.LatLngBounds>(siliconValleyBounds);
  const [map, setMap] = useState<L.Map | null>(null);
  const [miniMap, setMiniMap] = useState<L.Map | null>(null);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onMove = useCallback(() => {
    if (map) setBounds(map.getBounds());
  }, [map]);

  useEffect(() => {
    const fetchData = async () => setPlaces(await getBoundedPlaces(bounds));
    fetchData();
  }, [bounds]);

  useEffect(() => {
    map?.on('move', onMove);
    return () => {
      map?.off('move', onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    if (place) map?.flyTo(place.latlng, 13);
  }, [map, place]);

  useEffect(() => {
    miniMap?.invalidateSize();
  }, [miniMap]);

  return (
    <SidebarLayout
      navbar={<Navbar></Navbar>}
      sidebar={sidebar(places, setPlace, setIsOpen)}
    >
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
            icon={icon}
            eventHandlers={{ click: () => setPlace(place) }}
          />
        ))}
      </MapContainer>
      {place && placeDialog(place, setPlace, setMiniMap)}
    </SidebarLayout>
  );
}

const sidebar = (
  places: PlaceType[],
  setPlace: (place: PlaceType | null) => void,
  setIsOpen: (open: boolean) => void,
) => (
  <Sidebar>
    <SidebarHeader>
      <SidebarSection>
        <SidebarItem>
          <Avatar
            initials="ft"
            className="size-6 bg-zinc-900 text-white dark:bg-white dark:text-black"
          />
          <SidebarLabel>Famous Tables</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
      <SidebarSection className="max-lg:hidden">
        <SidebarItem href="/search">
          <MagnifyingGlassIcon />
          <SidebarLabel>Search</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarHeader>
    <SidebarBody>
      <SidebarSection>
        <SidebarHeading>Results</SidebarHeading>
        {places.map((place, placeIndex) => (
          <SidebarItem key={placeIndex} onClick={() => setPlace(place)}>
            <div>
              <h1 className="text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white">
                {place.name}
              </h1>
              <p>{place.events?.[0]?.description || 'No events available'}</p>
            </div>
          </SidebarItem>
        ))}
      </SidebarSection>
      <SidebarSpacer />
      <SidebarSection>
        <SidebarItem onClick={() => setIsOpen(true)}>
          <BuildingStorefrontIcon />
          <SidebarLabel>Suggest a place</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarBody>
  </Sidebar>
);

const placeDialog = (
  place: PlaceType,
  setPlace: (place: PlaceType | null) => void,
  setMiniMap: (map: L.Map | null) => void,
) => (
  <Dialog open={place != null} onClose={() => setPlace(null)}>
    <DialogTitle>{place.name}</DialogTitle>
    <DialogDescription>{place.address}</DialogDescription>
    <DialogBody className="text-base/6 text-zinc-900 sm:text-sm/6 dark:text-white">
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

      {place.events.map((event, eventIndex) => (
        <div key={`event-${eventIndex}`}>
          <p className="mb-4">{event.description}</p>
          {event.quotes.map((quote, quoteIndex) => (
            <div
              key={`quote-${quoteIndex}`}
              className="mb-4 text-zinc-500 dark:text-zinc-400"
            >
              <blockquote>
                <p>“{quote.text}”</p>
              </blockquote>
              <p>{`― ${quote.authors.join(', ')}, ${quote.title}`}</p>
            </div>
          ))}
        </div>
      ))}
    </DialogBody>
    <DialogActions>
      <Button plain onClick={() => setPlace(null)}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
