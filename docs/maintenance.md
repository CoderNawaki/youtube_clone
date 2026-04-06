# Dependency and Maintenance Policy

## Dependency Update Policy

- review dependencies monthly
- prioritize security updates for direct dependencies immediately
- keep testing and build tooling current when practical
- avoid large multi-package upgrades without running lint, test, build, and E2E smoke checks

## Monthly Maintenance Checklist

- run `npm audit`
- review outdated direct dependencies
- verify the RapidAPI key is still valid and not over quota
- run:

```bash
npm run lint
npm test
npm run build
npm run e2e
```

- check CI workflow health
- verify deployment documentation still matches the actual hosting setup

## Security Maintenance

- rotate exposed API keys immediately
- remove accidentally tracked secrets from Git moving forward
- review dependency advisories for `axios`, Playwright, and major build tooling

## Quality Gate Policy

Changes should not be merged unless:

- lint passes
- tests pass
- build passes
- E2E smoke checks pass for routing-critical changes

## Ownership Guidance

Before large refactors:

- create a focused feature branch
- keep PR scope narrow
- prefer incremental PRs over broad rewrites
