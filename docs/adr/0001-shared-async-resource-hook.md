# ADR 0001: Use a Shared Async Resource Hook for Route Data

## Status

Accepted

## Date

2026-04-05

## Context

Several route components were repeating the same async orchestration pattern:

- set loading state before a request
- clear previous errors
- call an API helper
- guard against state updates after unmount
- reset local data on failure
- expose a retry path

This duplication existed in `Feed`, `SearchFeed`, `ChannelDetail`, and `VideoDetail`. The repeated logic made the routes harder to read and increased the chance of inconsistent behavior when future pages need similar async loading.

## Decision

Introduce a shared hook, `useAsyncResource`, in `src/hooks/useAsyncResource.js`.

The hook owns:

- loading state
- error state
- reload behavior
- safe state updates across async requests
- resetting to known initial data when a request fails

Route components remain responsible for choosing what data to load, while the hook standardizes how the request lifecycle is handled.

## Consequences

### Positive

- less duplicated async code across route components
- easier to reason about route components because they focus on composition
- retry behavior is more consistent
- future routes can reuse the same pattern instead of rebuilding it

### Negative

- one more abstraction layer exists between route components and state updates
- developers need to understand the hook contract before extending route-loading logic

### Tradeoff

This is a small abstraction, not a generic data framework. It improves maintainability without introducing a heavier state-management dependency.
