# 🎬 MovieMint

A client-side movie discovery app in the spirit of IMDb and Letterboxd, built with React and powered by the [TMDB API](https://www.themoviedb.org/documentation/api).

MovieMint is also a learning project: it's the vehicle for working through REST APIs, HTTP fundamentals, state management, and systems thinking by building something real rather than following tutorials.

<!-- Add a screenshot or GIF here once the UI is ready -->
<!-- ![MovieMint screenshot](./docs/screenshot.png) -->

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| UI | React (vanilla JavaScript, no TypeScript) |
| Build tool | Vite |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Data | TMDB API |
| Fonts | Inter (primary), Space Grotesk (optional display) |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A free TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
git clone <your-repo-url>
cd moviemint
npm install
```

### Environment variables

For local development, create a `.env.local` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

For Vercel production deployments, add `TMDB_API_KEY` in the project's Environment Variables settings. The Vercel function reads this server-side variable; do not use the `VITE_` prefix for the production secret.

### Run the app

```bash
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Presentational UI (MovieCard, MovieGrid, ...)
├── context/       # Shared cross-component state (MovieContext.jsx)
├── hooks/         # Data-fetching hooks (useMovies.js)
├── pages/         # Route-level views
├── services/      # TMDB access + data normalization (tmdb.js)
└── utils/         # Small helpers
```

## Architecture Notes

A few deliberate decisions worth knowing about:

- **Single normalization boundary.** All raw TMDB responses pass through `src/services/tmdb.js`. Its `normalizeMovie()` function unifies movie and TV fields (`title`/`name`, `release_date`/`first_air_date`), so components only ever see one consistent shape. It uses `??` rather than `||` where `0` is a meaningful value.
- **Hooks own fetch lifecycle.** `useMovies.js` manages loading, error, and data state, keeping components free of fetching logic.
- **Context only for truly shared state.** `MovieContext` holds state that multiple distant components need; everything else stays local.
- **Data down, actions up.** Presentational components (`MovieCard`, `MovieGrid`) receive props and render; data-owning components handle logic.
- **Genre names need a second call.** TMDB returns `genre_ids`; resolving them to readable names requires a separate request to `/genre/movie/list`.

### API key handling

In development, Vite proxies requests to TMDB so the key stays out of client code. In production on Vercel, `api/tmdb/[...path].js` provides the same proxy and reads `TMDB_API_KEY` server-side.

The local Vite proxy and Vercel function both support the search and movie-details requests used by the app. A production deployment must set `TMDB_API_KEY` in Vercel's project settings.

## Design

- Dark background with an amber accent color
- Inter for body text, Space Grotesk for optional display headings
- Visual reference: Letterboxd; data structure reference: TMDB's own site
- Favicon provided in SVG, ICO, and PNG

## Roadmap

- [ ] Production deployment with a serverless proxy for the API key
- [ ] Resilience: graceful handling of API failures, rate limits, and empty states
- [ ] Genre resolution via `/genre/movie/list`
- [ ] Persistence layer exploration (relational DB with Prisma or Sequelize)

## Learning Goals

This repo follows a phased path, moving from contract-first API reasoning, to raw HTTP fundamentals, to proxy/backend setup, to React data-fetching patterns, to state scoping, to component architecture, and finally to resilience planning.

## Acknowledgements

- Movie data and images from [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
- UI inspiration from Letterboxd.

## License

Add a license of your choice (MIT is a common default for portfolio projects).
