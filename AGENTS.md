# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Famous Tables (https://famoustables.com) is a map of restaurants and bars where
notable events from books took place. It is a single-page Next.js 14 app,
statically exported and deployed to GitHub Pages. There is no backend, no
database, and no test suite. All content lives in one TypeScript file.

## Commands

```bash
npm install          # Node 20 in CI; Node 22 works locally
npm run dev          # http://localhost:3000
npm run lint         # next lint over src/ (ESLint: next/core-web-vitals, next/typescript, prettier)
npx tsc --noEmit     # typecheck (strict mode); not wired to a script
npm run build        # static export to ./out (output: 'export')
npx prettier --write <files>   # format; see .prettierrc
```

Both `npm run lint` and `npx tsc --noEmit` pass on `main`. Run them after any
change. There are no tests to run.

## Layout

```
src/
  app/
    layout.tsx         Root layout: Inter font, metadata
    page.tsx           The whole UI: sidebar, navbar, map, dialogs ('use client')
    globals.css        Tailwind directives + light/dark CSS variables
  components/
    map.tsx            Map (main Leaflet map + markers) and MiniMap (in dialog)
    dialog.tsx         PlaceDialog (place details) and SuggestionDialog (form)
    icons.tsx          GitHubIcon SVG
    catalyst/          Tailwind UI Catalyst kit (vendored, see below)
  data.ts              ALL place data + types + city bounds + query helpers
public/                Leaflet marker PNGs (open/closed, hover, 2x) + shadow
.github/workflows/nextjs.yml   Build + deploy to GitHub Pages on push to main
```

Import alias: `@/*` maps to `./src/*`.

## How the app works

- `page.tsx` owns all state (`map`, `bounds`, `place`, `places`, `placeHover`,
  sidebar/dialog open flags) and passes it down as props. There is no state
  library or context.
- The Leaflet `Map` and `MiniMap` are loaded with `next/dynamic` and
  `ssr: false` because Leaflet touches `window`. Keep it that way; importing
  `leaflet` at module scope in a server-rendered component will break the
  export build.
- Moving the map updates `bounds`, which triggers `getBoundedPlaces(bounds)`
  from `data.ts`. The sidebar "Results" list and the markers both render from
  that filtered `places` array.
- Hover is shared: hovering a sidebar row or a marker sets `placeHover`, and
  both the row (`data-hover`) and the marker icon react to it.
- Clicking a place sets `place`, which flies the map to it and opens
  `PlaceDialog`. Deep links use `?p=<encoded place name>`; `FetchPlace` reads
  the query param inside a `Suspense` boundary (required for `useSearchParams`
  in a static export).
- "Suggest a Place" is a react-hook-form + zod form that builds a `mailto:`
  link with a human-readable body and a JSON footer. Nothing is posted anywhere.
- Book links append `?tag=${process.env.NEXT_PUBLIC_TAG}` (Amazon Associates).
  The value comes from `.env.local` locally and a GitHub secret in CI. Do not
  hardcode or commit the tag.
- Dark mode is CSS-only: the map tiles are inverted with Tailwind filter
  classes (`dark:invert dark:hue-rotate-180 ...`), not a dark tile set.

## Data model (`src/data.ts`)

```ts
PlaceType { name, address, category, closed: boolean, latlng: [lat, lng], events: EventType[] }
EventType { description /* <=140 chars */, people: string[], year, category, quotes: QuoteType[] }
QuoteType { title, authors: string[], url /* may be '' */, text /* full paragraph */ }
```

- `places` is a plain array at the top of the file, followed by the city
  bounds (`london`, `newYork`, `siliconValley`), the types, and three async
  helpers (`getPlaces`, `getBoundedPlaces`, `getPlace`). The helpers are async
  so the data source could later move off the bundle; preserve the signatures.
- `getPlace` matches on exact `name`, and share links encode the name, so
  renaming a place breaks existing links.
- Event `description` is rendered as `"${description} in ${year}."` in both the
  sidebar and the dialog, so write it as a sentence fragment without a trailing
  period, e.g. `'PayPal made the first transfer using its own technology here'`.
- Use typographic apostrophes (’) in names and quotes, matching existing
  entries. `category` is free text on places but the suggestion form only
  offers "Bar" and "Restaurant"; event categories come from the long list in
  `SuggestionDialog`.
- To add a city shortcut, export a new bounds tuple from `data.ts` and add a
  `SidebarItem` under "Cities" in `page.tsx`.

## Catalyst components (`src/components/catalyst/`)

These are vendored from Tailwind Plus's Catalyst kit and are intentionally
excluded from both Prettier (`.prettierignore`) and ESLint (`ignorePatterns` in
`.eslintrc.json`). Catalyst uses `let` and its own formatting by convention;
do not "fix" that, so diffs against upstream updates stay clean. Avoid editing
these files except when the app genuinely needs it. The one local change so far is `sidebar-layout.tsx`:
`SidebarLayout` now takes `showSidebar`/`setShowSidebar` as props instead of
owning that state, so `page.tsx` can close the mobile sidebar on item click.
If you touch a Catalyst file, keep the change minimal and leave the rest of the
file in its upstream formatting.

## Conventions

- TypeScript strict, functional components, hooks. `'use client'` only where
  needed (`page.tsx`; the dynamic imports handle the Leaflet components).
- Prettier: single quotes, semicolons, trailing commas, 80 columns, 2 spaces.
  Imports are sorted by `@trivago/prettier-plugin-sort-imports` and Tailwind
  classes by `prettier-plugin-tailwindcss`. Run Prettier rather than sorting
  by hand.
- Tailwind for styling; use `clsx` for conditional classes. Colors follow the
  Catalyst zinc palette with `dark:` variants.
- Icons come from `@heroicons/react` (`20/solid` for nav, `16/solid` inside
  buttons).
- Commit messages are short imperative sentences ("Add closed state",
  "Update places"). Data-only changes are typically titled "Update places".

## Gotchas

- `next.config.mjs` sets `eslint: { dirs: ['src'] }`, so `next lint` covers
  the whole `src` tree except the Catalyst ignore pattern.
- The site is a static export: no API routes, no server components that need
  request data, no `next/image` optimization. `CNAME` must stay at the repo
  root for the custom domain.
- Marker icon URLs in `map.tsx` are absolute (`/marker-icon-open.png`). The
  Pages workflow uses `static_site_generator: next`, which can inject a
  `basePath`; the custom domain means it is currently empty, so these work.
- Leaflet's CSS is imported in `page.tsx` (`leaflet/dist/leaflet.css`). The
  `Map` component calls `map.remove()` on cleanup; `MiniMap` is keyed on
  `place.name` so it remounts per place.
- `.env.local` is gitignored but present locally with `NEXT_PUBLIC_TAG`. Do
  not echo its contents into commits, logs, or docs.
