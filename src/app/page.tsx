'use client';

import { Avatar } from '@/components/catalyst/avatar';
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from '@/components/catalyst/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/catalyst/sidebar';
import { SidebarLayout } from '@/components/catalyst/sidebar-layout';
import { PlaceDialog, SuggestionDialog } from '@/components/dialog';
import { GitHubIcon } from '@/components/icons';
import { PlaceType, getPlace } from '@/data';
import { london, newYork, siliconValley } from '@/data';
import {
  BuildingOffice2Icon,
  BuildingStorefrontIcon,
} from '@heroicons/react/20/solid';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

const DynamicMap = dynamic(
  () => import('@/components/map').then((mod) => mod.Map),
  { ssr: false },
);

const sidebar = (
  map: L.Map | null,
  places: PlaceType[],
  setPlace: (place: PlaceType | null) => void,
  setIsSidebarOpen: (open: boolean) => void,
  setIsSuggestionDialogOpen: (open: boolean) => void,
  placeHover: PlaceType | null,
  setPlaceHover: (place: PlaceType | null) => void,
) => (
  <Sidebar>
    <SidebarHeader>
      <SidebarSection>
        <SidebarItem href="/" aria-label="Famous Tables">
          <Avatar
            initials="ft"
            className="size-6 bg-zinc-900 text-white dark:bg-white dark:text-black"
          />
          <SidebarLabel>Famous Tables</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
      <SidebarSection>
        <SidebarHeading>Cities</SidebarHeading>
        <SidebarItem
          onClick={() => {
            setIsSidebarOpen(false);
            map?.fitBounds(london);
          }}
        >
          <BuildingOffice2Icon />
          <SidebarLabel>London</SidebarLabel>
        </SidebarItem>
        <SidebarItem
          onClick={() => {
            setIsSidebarOpen(false);
            map?.fitBounds(newYork);
          }}
        >
          <BuildingOffice2Icon />
          <SidebarLabel>New York</SidebarLabel>
        </SidebarItem>
        <SidebarItem
          onClick={() => {
            setIsSidebarOpen(false);
            map?.fitBounds(siliconValley);
          }}
        >
          <BuildingOffice2Icon />
          <SidebarLabel>Silicon Valley</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarHeader>
    <SidebarBody>
      <SidebarSection>
        <SidebarHeading>Results</SidebarHeading>
        {places.length === 0 && (
          <SidebarItem disabled>
            <SidebarLabel>No places found.</SidebarLabel>
          </SidebarItem>
        )}
        {places.map((place, placeIndex) => (
          <SidebarItem
            key={placeIndex}
            onClick={() => {
              setIsSidebarOpen(false);
              setPlace(place);
            }}
            onMouseEnter={() => setPlaceHover(place)}
            onMouseLeave={() => setPlaceHover(null)}
            data-hover={place === placeHover ? 'true' : undefined}
          >
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
    </SidebarBody>
    <SidebarFooter className="max-lg:hidden">
      <SidebarSection>
        <SidebarItem
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSuggestionDialogOpen(true);
          }}
        >
          <BuildingStorefrontIcon />
          <SidebarLabel>Suggest a Place</SidebarLabel>
        </SidebarItem>
        <SidebarItem
          href="https://github.com/tlyleung/famous-tables"
          aria-label="GitHub repository"
        >
          <GitHubIcon />
          <SidebarLabel>GitHub Repository</SidebarLabel>
        </SidebarItem>
      </SidebarSection>
    </SidebarFooter>
  </Sidebar>
);

function FetchPlace({
  setPlace,
}: {
  setPlace: (place: PlaceType | null) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPlace = async () => {
      const name = searchParams.get('p');
      if (name) setPlace(await getPlace(name));
    };
    fetchPlace();
  }, [searchParams, setPlace]);

  return null;
}

export default function Home() {
  const [bounds, setBounds] =
    useState<[[number, number], [number, number]]>(siliconValley);
  const [map, setMap] = useState<L.Map | null>(null);
  const [miniMap, setMiniMap] = useState<L.Map | null>(null);
  const [place, setPlace] = useState<PlaceType | null>(null);
  const [placeHover, setPlaceHover] = useState<PlaceType | null>(null);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = useState(false);

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem disabled>
              <NavbarLabel>Famous Tables</NavbarLabel>
            </NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem onClick={() => setIsSuggestionDialogOpen(true)}>
              <BuildingStorefrontIcon />
            </NavbarItem>
          </NavbarSection>
        </Navbar>
      }
      sidebar={sidebar(
        map,
        places,
        setPlace,
        setIsSidebarOpen,
        setIsSuggestionDialogOpen,
        placeHover,
        setPlaceHover,
      )}
      showSidebar={isSidebarOpen}
      setShowSidebar={setIsSidebarOpen}
    >
      <DynamicMap
        bounds={bounds}
        setBounds={setBounds}
        map={map}
        setMap={setMap}
        place={place}
        setPlace={setPlace}
        places={places}
        setPlaces={setPlaces}
        placeHover={placeHover}
        setPlaceHover={setPlaceHover}
      />
      <Suspense fallback={null}>
        <FetchPlace setPlace={setPlace} />
      </Suspense>
      {place && (
        <PlaceDialog
          miniMap={miniMap}
          setMiniMap={setMiniMap}
          place={place}
          setPlace={setPlace}
        />
      )}
      <SuggestionDialog
        isOpen={isSuggestionDialogOpen}
        setIsOpen={setIsSuggestionDialogOpen}
      />
    </SidebarLayout>
  );
}
