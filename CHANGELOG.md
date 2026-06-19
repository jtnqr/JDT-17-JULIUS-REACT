# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-06-19

### Added
- **Redux Toolkit Integration**: Added `@reduxjs/toolkit` and `react-redux` and configured the global store in [store/index.ts](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/store/index.ts).
- **Biome Linter/Formatter**: Replaced ESLint with Biome to handle fast linting, formatting, and import sorting. Added `biome.json` in the root workspace.
- **Shared Movie Layout**: Added [MovieLayout.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/movies/components/MovieLayout.tsx) to wrap shared elements (Header, Footer, Profile Avatar, Log Out) for all movies pages, resolving massive code duplication.
- **Movies Categories Pages**: Implemented [TopRated.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/movies/TopRated.tsx) and [Upcoming.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/movies/Upcoming.tsx) views powered by RTK Query hooks.
- **Movie Navigation Tabs**: Implemented [MovieNavigation.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/movies/components/MovieNavigation.tsx) to switch between Now Playing, Top Rated, Upcoming, and Search routes.
- **Todo Redux Slice**: Created [todoSlice.ts](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/todo/todoSlice.ts) with pure reducers managing CRUD operations, with state synchronized to `localStorage` via a Redux store middleware.
- **Todo Interactive UI**: Replaced construction stub [Todo.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/todo/Todo.tsx) with a premium glassmorphic list manager supporting inline task editing and filtering.
- **Interactive CV Page**: Converted Julius Wahyu Wicaksono's PDF resume into a fully responsive, interactive [CV.tsx](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/cv/CV.tsx) component featuring work timeline, certification listings, and interactive category-based skill filters.

### Changed
- **Feature-Based Folder Structure**: Reorganized files under `src/features/` (Grouped into `auth`, `movies`, `todo`, `cv`) for high modularity.
- **RTK Query Migration**: Refactored movie searches, list fetches, and detail page integrations from manual Axios queries into declarative RTK Query service endpoints in [moviesApi.ts](file:///D:/Jtnqr/Documents/Codes/Web/jdt17/jdt-17-react/src/features/movies/moviesApi.ts).
- **Authentication State Migration**: Replaced old React Context-based authentication with a secure Redux Toolkit slice. Passwords are kept in memory and sanitized (never persisted to disk in `localStorage`).
- **Resilient Storage Parser**: Wrapped JSON parsing of local storage states in try/catch checks to avoid startup crashes if corrupt/invalid data is encountered.
- **Dedicated Movie Search Page**: Moved the search bar and its results from the main list dashboard onto its own `/movies/search` route page.

### Removed
- **Unused/ESLint Boilerplate**: Deleted ESLint configuration files (`eslint.config.js`), unused logos (`react.svg`, `vite.svg`), and dead components (`App.tsx` and `App.css`).
