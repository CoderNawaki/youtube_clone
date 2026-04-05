# Architecture Overview

## Purpose

This project is a React single-page application that renders a YouTube-style browsing experience backed by the RapidAPI YouTube endpoint. The app is currently optimized for learning, but the structure below is intended to keep new changes consistent as the codebase grows.

## Runtime Flow

1. `src/index.js` mounts the React application.
2. `src/App.js` defines the top-level routes and shared page chrome.
3. Route components in `src/components` fetch the data they need through `src/utils/fetchFromAPI.js`.
4. Shared async state is managed with hooks in `src/hooks`.
5. Reusable presentational components render page sections, cards, and UI states.

## Routes

- `/` renders `Feed`
- `/search/:searchTerm` renders `SearchFeed`
- `/video/:id` renders `VideoDetail`
- `/channel/:id` renders `ChannelDetail`

## Data Flow

- API access is centralized in `src/utils/fetchFromAPI.js`.
- Route components call specialized fetch helpers such as `fetchSearchVideos` and `fetchVideoDetails`.
- `useAsyncResource` in `src/hooks/useAsyncResource.js` owns the repeated loading, error, and retry lifecycle.
- Reusable UI states are rendered through `LoadingState`, `ErrorState`, and `EmptyState`.

## Folder Structure

```text
src/
  components/
    layout/     App chrome and navigation pieces
    routes/     Route-level page components
    shared/     Reusable UI states and shared display helpers
    video/      Video/channel card and list presentation
  hooks/        Shared React hooks for async/resource logic
  tests/        Unit/integration test files, mocks, and fixtures
  utils/        API module and shared constants
```

## Component Boundaries

- Route components are responsible for selecting the data they need and composing the page.
- Card/list components are presentational and should stay light on business logic.
- Shared hooks should own repeated state orchestration before more logic is duplicated across routes.

## Testing Strategy

- `src/tests` contains React Testing Library tests, shared test setup, fixtures, and MSW mocks.
- `e2e/` contains Playwright smoke coverage for critical browser flows.

## Current Direction

Phase 4 focuses on maintainability rather than visual changes. The immediate architectural goal is to reduce repeated async logic, keep data access centralized, and make future feature-oriented reorganization easier without forcing a disruptive rewrite now.

Key decisions are also recorded in `docs/adr/` so structural changes remain explainable as the codebase evolves.
