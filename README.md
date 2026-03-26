# Epstein Brasil Map

## Overview

This is an investigative data visualization application called "Epstein Brasil Map" that maps and visualizes connections between Jeffrey Epstein's network and locations across Brazil. The app features an interactive map with location markers, a network graph showing relationships between people and places, a timeline of events, statistical charts, and PDF export functionality. The visual design follows a dark cyberpunk/neon aesthetic with glassmorphism effects and particle backgrounds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Structure
The project follows a monorepo pattern with three top-level code directories:
- **`client/`** — React SPA (Single Page Application)
- **`server/`** — Express.js backend API
- **`shared/`** — Code shared between client and server (database schema, route definitions, types)

### Frontend (`client/src/`)
- **Framework**: React with TypeScript, built with Vite
- **Routing**: Uses `wouter` (lightweight router). Two routes: `/` (Home with map) and `/connections` (network graph)
- **State/Data**: TanStack React Query for server state management. Custom hooks in `client/src/hooks/` fetch data from the API
- **UI Components**: shadcn/ui component library (new-york style) with Radix UI primitives. Components live in `client/src/components/ui/`
- **Styling**: Tailwind CSS with CSS variables for theming. Dark mode by default with neon purple (`#b026ff`) and neon green (`#00ff9d`) accent colors. Custom glassmorphism utility class (`.glass`)
- **Key Libraries**:
  - `react-leaflet` + `leaflet` for interactive maps (CartoDB DarkMatter tiles)
  - `vis-network` (loaded via CDN in `index.html`) for the connection graph visualization
  - `recharts` for pie charts in statistics modal
  - `framer-motion` for animations
  - `@tsparticles/react` for particle background effects
  - `jspdf` + `jspdf-autotable` for PDF report generation
  - `lucide-react` for icons

### Backend (`server/`)
- **Framework**: Express.js running on Node.js with TypeScript (executed via `tsx`)
- **Entry Point**: `server/index.ts` creates an HTTP server, registers routes, and serves static files in production or sets up Vite dev middleware in development
- **API Routes**: Defined in `server/routes.ts`, following patterns from `shared/routes.ts`. Three main endpoints:
  - `GET /api/locations` — Returns all locations with their categories and sources
  - `GET /api/locations/:id` — Returns a single location with details
  - `GET /api/timeline` — Returns timeline events
  - `GET /api/stats` — Returns computed statistics (locations grouped by state)
- **Storage Layer**: `server/storage.ts` implements a `DatabaseStorage` class with a `seedData()` method that populates the database on first run. Uses Drizzle ORM for all database operations.

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema** (`shared/schema.ts`): Five tables:
  - `locations` — Cities/places with coordinates (lat/lng), name, type, description
  - `categories` — Tags like "recruitment", "financial" with icons
  - `location_categories` — Many-to-many join table between locations and categories
  - `timeline_events` — Year-based events optionally linked to a location
  - `sources` — Reference links/URLs tied to locations
- **Migrations**: Managed via `drizzle-kit push` (schema push approach, not migration files)
- **Connection**: Uses `pg` Pool with `DATABASE_URL` environment variable

### Build System
- **Development**: `tsx server/index.ts` with Vite dev server middleware for HMR
- **Production Build**: Custom `script/build.ts` that runs Vite build for client and esbuild for server. Output goes to `dist/` (server) and `dist/public/` (client static assets)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

### Shared Code (`shared/`)
- `schema.ts` — Drizzle table definitions and Zod insert schemas (via `drizzle-zod`)
- `routes.ts` — API route definitions with paths, methods, and Zod response schemas. Used by both server (route registration) and client (query keys, type-safe fetching)

## External Dependencies

- **PostgreSQL** — Primary database, connected via `DATABASE_URL` environment variable. Required for the app to start.
- **CartoDB DarkMatter Tiles** — Map tile provider (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`), free public CDN
- **vis-network CDN** — Network graph library loaded from `https://unpkg.com/vis-network/standalone/umd/vis-network.min.js`
- **Google Fonts** — Inter, Rajdhani, DM Sans, Fira Code, Geist Mono, Architects Daughter fonts
- **Unsplash** — Used as fallback image source for location drawer hero images (`source.unsplash.com`)
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` (dev-only, Replit-specific)
