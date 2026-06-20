# Copilot instructions for youtube_clone

This file summarizes repository-specific information for Copilot-powered assistants: how to build, test, lint, key architecture, and conventions to surface during sessions.

## Build, test, and lint (commands)

- Install: `npm install` (CI uses `npm ci`).
- Dev server: `npm start` (Vite at http://localhost:3000).
- Build: `npm run build` and preview with `npm run preview`.
- Unit / integration tests (Vitest + React Testing Library):
  - Full run: `npm test` (runs `vitest run`).
  - Watch: `npm run test:watch` (runs `vitest`).
  - Run a single test file: `npx vitest run path/to/file.test.{js,jsx}`.
  - Run by test name: `npx vitest -t "test name"` (use quotes).
- End-to-end smoke tests (Playwright):
  - Headless: `npm run e2e` (uses `playwright test`).
  - Headed: `npm run e2e:headed`.
  - Playwright uses `playwright.config.js` and starts a local server (`npm start`) with test env vars.
- Lint / format:
  - Lint: `npm run lint` (ESLint)
  - Auto-fix lint: `npm run lint:fix`
  - Format: `npm run format`
  - Check format: `npm run format:check`
  - Single-file lint: `npx eslint src/path/to/file.jsx`
- Pre-commit hooks: Husky + lint-staged (`prepare` script). CI runs `npm ci`, `npm run lint`, `npm test`, and `npm run build`.

## High-level architecture (big picture)

- Frontend: React app bundled by Vite. App root in `src/`.
- Component organization:
  - `src/components/routes/` — route-level pages (Feed, VideoDetail, ChannelDetail, SearchFeed).
  - `src/components/shared/` — shared UI (Sidebar, LoadingState, ErrorState, boundaries).
  - `src/hooks/` — reusable hooks (notably `useAsyncResource`).
- Data & API:
  - Uses RapidAPI `youtube-v31` endpoint; runtime key via `REACT_APP_RAPID_API_KEY` (.env from `.env.example`).
  - Tests mock network with MSW (`msw` devDependency).
- Testing:
  - Unit/integration: Vitest + React Testing Library + jsdom.
  - E2E: Playwright smoke tests located in `./e2e` (configured in `playwright.config.js`). Playwright config starts the dev server and injects a test API key.
- Docs & ADRs: architecture notes in `docs/architecture.md` and ADRs under `docs/adr/`.

## Key conventions and patterns

- Vite + React. Expect `npm start` to run the Vite dev server (not react-scripts).
- Tests use Vitest CLI (`vitest run`) for CI; local dev can use watch mode.
- API mocking with MSW is preferred during unit/integration runs; Playwright runs the app with a test key (see `playwright.config.js` `webServer.env`).
- Linting enforces strict rules configured in package.json (curly, eqeqeq, no-var) and Prettier integration.
- Husky + lint-staged will auto-format and autofix staged JS/JSX files; make sure to run `npm run prepare` if hooks need (re)install on contributor machines.
- Playwright e2e are smoke-level — they rely on `playwright.config.js` testDir `./e2e` and assume a running local server (webServer config will start one).

## Useful repo locations to reference during sessions

- README.md — quick start and script list.
- package.json — scripts and tool versions (source of truth for commands).
- playwright.config.js — how Playwright starts the app and test env variables.
- docs/architecture.md and docs/adr/ — design decisions and architecture details.
- `.github/workflows/ci.yml` — CI steps (install, lint, test, build).

---

If updates are needed, prefer small targeted edits that keep examples accurate (script names, test paths).
