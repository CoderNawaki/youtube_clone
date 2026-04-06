# Environment Strategy

## Current Environments

Recommended environments:

- `development`
- `staging`
- `production`

## Variable Contract

Current required variable:

- `REACT_APP_RAPID_API_KEY`

Documented template:

- `.env.example`

Local developer secret:

- `.env`

## Rules

- never commit real `.env` files
- only commit `.env.example`
- use different API keys for staging and production where possible
- rotate keys immediately if they are ever exposed in git history, logs, or screenshots

## Build-Time Constraint

This app uses Create React App, so `REACT_APP_*` variables are embedded at build time.

That means:

- changing the environment variable requires a rebuild
- production and staging builds should be created with the correct key for that target environment

## Recommended Setup

### Development

- local `.env`
- lower-risk key with limited quota if possible

### Staging

- deployment platform environment variable
- separate key from production

### Production

- deployment platform environment variable
- dedicated key with monitored quota usage

## Key Management

- keep keys out of PRs and issue comments
- do not log keys in application code
- review RapidAPI usage monthly
- rotate exposed keys immediately
