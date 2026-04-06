# Deployment Guide

## Recommended Target

The current recommended host for this project is Netlify.

It is a good fit because:

- the app is a static Create React App build
- the output directory is `build/`
- the repository already includes `public/_redirects` for SPA routing
- GitHub-based preview and production deploys are straightforward

Other static hosts can still work, but Netlify is the primary target for this repository.

## Other Compatible Targets

This project also fits static frontend hosting platforms such as:

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

## Required Build-Time Configuration

The frontend requires:

- `REACT_APP_RAPID_API_KEY`

Because this is a Create React App application, the variable is injected at build time, not at true runtime. Each deployment environment must provide the variable before building.

Important:

- this value is bundled into client-side code
- treat it as an exposed browser key, not a server secret
- if stronger key protection is required, move API access behind a backend or serverless proxy

## Netlify Setup

1. Import the GitHub repository into Netlify
2. Use the default branch for production deploys
3. Confirm the build settings:

```text
Build command: npm run build
Publish directory: build
```

4. Add the environment variable in Netlify:

```text
REACT_APP_RAPID_API_KEY=your_key_here
```

5. Trigger the first deploy

The repository also includes `netlify.toml`, so Netlify can pick up the expected build and publish settings automatically.

## SPA Routing

The repository includes `public/_redirects` with:

```text
/* /index.html 200
```

This enables single-page-app routing behavior on Netlify so direct visits to routes such as `/video/:id` and `/search/:searchTerm` resolve correctly.

For other platforms, configure all unknown routes to serve `index.html`.

## Suggested Deployment Workflow

1. Install dependencies with `npm ci`
2. Run `npm run lint`
3. Run `npm test`
4. Run `npm run build`
5. Publish the `build/` directory

## Post-Deploy Checks

After a successful Netlify deploy, verify:

- homepage feed renders
- search navigation works
- direct navigation to `/video/<id>` works
- direct navigation to `/channel/<id>` works
- the deployed app can successfully call the RapidAPI endpoint

## Release Checklist

- environment variables configured in the hosting platform
- build completed successfully
- smoke test the homepage, search flow, and video detail route after deploy
- verify API quota and key status before announcing a release
