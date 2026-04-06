# Deployment Guide

## Target

This project currently fits static frontend hosting platforms such as:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages with custom routing support

## Build Command

```bash
npm run build
```

## Output Directory

```text
build/
```

## Required Runtime Configuration

The frontend requires:

- `REACT_APP_RAPID_API_KEY`

Because this is a Create React App application, the variable is injected at build time, not at true runtime. Each deployment environment must provide the variable before building.

## SPA Routing

The repository includes `public/_redirects` for single-page-app routing behavior on hosts that support it.

For other platforms, configure all unknown routes to serve `index.html`.

## Suggested Deployment Workflow

1. Install dependencies with `npm ci`
2. Run `npm run lint`
3. Run `npm test`
4. Run `npm run build`
5. Publish the `build/` directory

## Release Checklist

- environment variables configured in the hosting platform
- build completed successfully
- smoke test the homepage, search flow, and video detail route after deploy
- verify API quota and key status before announcing a release
