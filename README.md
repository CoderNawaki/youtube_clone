# YouTube Clone

A React-based YouTube-style browsing app backed by the RapidAPI YouTube endpoint.

## Features

- homepage feed by category
- search results
- video detail pages with related videos
- channel detail pages
- unit/integration tests with React Testing Library
- API mocking with MSW
- Playwright smoke coverage for critical browser flows

## Prerequisites

- Node.js 18+
- npm 9+
- a RapidAPI key for `youtube-v31.p.rapidapi.com`

## Environment Variables

Create a local `.env` file from `.env.example`.

```bash
cp .env.example .env
```

Required variable:

- `REACT_APP_RAPID_API_KEY`: RapidAPI key used for YouTube data requests

## Local Development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

The app runs at `http://localhost:3000`.

## Scripts

- `npm start`: run the development server
- `npm run build`: create a production build
- `npm test`: run the Jest/RTL test suite
- `npm run lint`: run ESLint
- `npm run lint:fix`: run ESLint with autofix
- `npm run format`: run Prettier
- `npm run format:check`: verify formatting
- `npm run e2e`: run Playwright smoke tests
- `npm run e2e:headed`: run Playwright smoke tests with a visible browser

## Testing

Run unit/integration tests:

```bash
npm test
```

Run end-to-end smoke tests:

```bash
npm run e2e
```

## Deployment

Phase 6 deployment guidance lives in:

- `docs/deployment.md`
- `docs/environment-strategy.md`
- `docs/observability.md`
- `docs/maintenance.md`

## Architecture

Architecture overview:

- `docs/architecture.md`

Architecture decision records:

- `docs/adr/`

## Troubleshooting

- If API calls fail immediately, verify `REACT_APP_RAPID_API_KEY` is set in `.env`.
- If the app reports rate limits or authorization failures, check RapidAPI quota and key status.
- If Playwright cannot run, install the browser runtime with:

```bash
npx playwright install chromium
```
