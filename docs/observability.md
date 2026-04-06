# Observability Plan

## Goals

- make API failures easier to diagnose
- detect quota/auth issues before they become user-visible incidents
- capture critical frontend failures in production

## Current State

The app currently has:

- standardized API error mapping in `src/utils/fetchFromAPI.js`
- reusable loading and error states in the UI
- an application-level React error boundary in `src/components/shared/AppErrorBoundary.jsx`

The app does not yet have:

- production error reporting
- centralized frontend logging
- performance monitoring dashboards

## Recommended Next Steps

### Error Boundary Follow-Up

- enrich boundary logging with route context and build/version metadata
- decide whether retry should reset only the failed subtree or trigger a full reload option
- connect boundary failures to an external reporting provider once one is selected

### Frontend Error Tracking

Evaluate one of:

- Sentry
- Bugsnag
- LogRocket

Capture:

- route
- user-visible error message
- API status code when available
- build/version identifier

### Performance Signals

Track:

- initial page load time
- route transition timing
- failed API requests
- repeated 401/403/429 responses

### Operational Alerts

Set alerts for:

- repeated authorization failures
- repeated rate-limit failures
- deployment build failures
- E2E smoke failures in CI

## Minimal Incident Checklist

When a production issue occurs:

1. identify whether it is auth, rate limit, network, or rendering related
2. confirm deployment environment variables are correct
3. verify the latest successful CI/build status
4. reproduce the issue on homepage, search, and video detail routes
