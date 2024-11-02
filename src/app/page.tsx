'use client';

import { Avatar } from '@/components/catalyst/avatar';
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
import { london, newYork, siliconValley } from '@/data';
import { BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/20/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';

import PlaceDialog from './place-dialog';
import SuggestionDialog from './suggestion-dialog';

const DynamicMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Home() {
  const [bounds, setBounds] = useState<L.LatLngBounds>(siliconValley);
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

  useEffect(() => {
    miniMap?.invalidateSize();
  }, [miniMap]);

  return (
    <SidebarLayout
      navbar={<Navbar></Navbar>}
      sidebar={sidebar(map, places, setPlace, setIsOpen)}
    >
      <DynamicMap
        bounds={bounds}
        places={places}
        setMap={setMap}
        setPlace={setPlace}
      />
      {place && (
        <PlaceDialog
          place={place}
          setPlace={setPlace}
          setMiniMap={setMiniMap}
        />
      )}
      <SuggestionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </SidebarLayout>
  );
}

const sidebar = (
  map: L.Map | null,
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
      <SidebarSection>
        <SidebarHeading>Cities</SidebarHeading>
        <SidebarItem onClick={() => map?.fitBounds(london)}>
          <MapPinIcon />
          <SidebarLabel>London</SidebarLabel>
        </SidebarItem>
        <SidebarItem onClick={() => map?.fitBounds(newYork)}>
          <MapPinIcon />
          <SidebarLabel>New York</SidebarLabel>
        </SidebarItem>
        <SidebarItem onClick={() => map?.fitBounds(siliconValley)}>
          <MapPinIcon />
          <SidebarLabel>Silicon Valley</SidebarLabel>
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
              <p>
                {`${place.events?.[0]?.description} in ${place.events?.[0]?.year}.`}
              </p>
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
