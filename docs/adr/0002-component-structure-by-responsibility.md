# ADR 0002: Organize Components by Responsibility

## Status

Accepted

## Date

2026-04-05

## Context

The project originally stored all React components in a single flat `src/components` directory. As the codebase grew, that layout made it harder to distinguish:

- top-level route components
- shared layout pieces
- reusable UI state components
- video/card presentation components

The flat structure also increased navigation cost for new contributors and made future reorganization more disruptive.

## Decision

Reorganize `src/components` into responsibility-based groups:

- `src/components/routes`
- `src/components/layout`
- `src/components/shared`
- `src/components/video`

Retain `src/components/index.js` as the public export surface so application imports remain stable wherever possible.

## Consequences

### Positive

- related files are easier to locate
- route components are clearly separated from presentational pieces
- shared UI primitives have a defined home
- future architecture work can build on this structure incrementally

### Negative

- internal import paths become slightly longer in some files
- tests and local imports need maintenance when folders move

### Tradeoff

This is not a fully feature-sliced architecture. It is an incremental step that improves maintainability without forcing a broad rewrite of the codebase.
