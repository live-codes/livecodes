---
name: livecodes/self-hosting
description: >
  Deploy LiveCodes to static servers, GitHub Pages, or Docker. Configure SDK appUrl,
  BASE_URL for subdirectories, and handle share/broadcast services. Load this skill
  when self-hosting LiveCodes or using a custom app URL.
type: composition
library: livecodes
library_version: 0.13.0
requires:
  - sdk-embedding
sources:
  - live-codes/livecodes:docs/docs/features/self-hosting.mdx
---

This skill requires sdk-embedding. Read it first for foundational concepts.

# LiveCodes — Self-Host LiveCodes

LiveCodes runs entirely client-side. Host it on any static file server or CDN.

## Deployment Options

### Download Release

1. Download from [GitHub releases](https://github.com/live-codes/livecodes/releases)
2. Extract the `build` folder
3. Serve from any static host

```bash
# Files to serve
build/
├── index.html
├── livecodes/
│   ├── assets/
│   └── ...
└── docs/ (optional)
```

### Build from Source

```bash
git clone https://github.com/live-codes/livecodes.git
cd livecodes
npm install
npm run build      # Build to build/ directory
npm run serve      # Local preview at http://localhost:8080
npm run deploy      # Build + deploy to GitHub Pages
```

### GitHub Pages (Built-in)

```bash
# Setup
npm install
npm run deploy      # Deploys to gh-pages branch
```

Configure `CNAME` file for custom domain if needed.

### Docker

```bash
docker-compose up -d
```

Docker setup includes:

- HTTPS with auto-certificates
- Share service (short URLs)
- Broadcast server
- Open Graph meta tags
- Custom 404 page

```yaml
# docker-compose.yml
# See: docs/docs/advanced/docker.mdx for customization
```

### Other Static Hosts

- **Cloudflare Pages**: Connect repo, `npm run build`, serve `build/`
- **Netlify**: Connect repo, `npm run build`, serve `build/`
- **Firebase Hosting**: `firebase init hosting`, deploy `build/`

## Configure SDK for Self-Hosted App

```javascript
import { createPlayground } from 'livecodes';

createPlayground('#container', {
  appUrl: 'https://playground.example.com',
  template: 'react',
});
```

The `appUrl` tells the SDK where to load the playground iframe from.

## Custom Build

### Subdirectory Hosting

By default, LiveCodes expects to be at the root of a domain. For subdirectories:

```bash
# Host at https://example.com/playground/
npx cross-env BASE_URL="/playground/" npm run build
```

This sets `<base href="/playground/">` and adjusts all asset paths.

### Skip Building Docs

To link documentation to livecodes.io instead of building locally:

```bash
npx cross-env DOCS_BASE_URL=null npm run build:app
```

Docs links will point to `https://livecodes.io/docs/` instead of local docs.

## Services

Self-hosted apps use fallback services:

| Service            | Default Hosted        | Self-Hosted                |
| ------------------ | --------------------- | -------------------------- |
| Share (short URLs) | dpaste.com (365 days) | dpaste.com or Docker setup |
| Broadcast          | LiveCodes server      | Docker setup required      |
| GitHub Integration | LiveCodes OAuth       | Your GitHub App            |

### Docker for Full Services

Docker setup provides all services:

```bash
docker-compose up -d
# Serves at https://livecodes.localhost
```

See `docs/docs/advanced/docker.mdx` for configuration.

## Permanent URL for Stable Embeds

Use versioned URLs to prevent breaking changes:

```javascript
// Version-specific URL (never changes)
createPlayground('#container', {
  appUrl: 'https://v48.livecodes.io',
  template: 'react',
});

// Pin SDK version
import { createPlayground } from 'livecodes@0.13.0';
// or
import { createPlayground } from 'https://cdn.jsdelivr.net/npm/livecodes@0.13.0';
```

Permanent URLs format: `https://v{VERSION}.livecodes.io`

## Common Mistakes

### MEDIUM Not configuring BASE_URL for subdirectories

Wrong:

```bash
# Build default, serve at /playground/
npm run build
# Results in broken asset paths
```

Correct:

```bash
# Set BASE_URL for subdirectory
npx cross-env BASE_URL="/playground/" npm run build
```

Without `BASE_URL`, the app expects to be at root (`/`) and asset paths will be wrong.

Source: docs/docs/features/self-hosting.mdx — Custom Build section

### MEDIUM Self-hosted share URLs expire

```javascript
// dpaste.com deletes share URLs after 365 days
// For permanent self-hosted share:
// 1. Use Docker setup for own share service
// 2. Or use permanent URL pattern for embeds
```

The default dpaste.com service deletes shared URLs after one year. For permanent sharing, use Docker setup with your own share service.

Source: docs/docs/features/self-hosting.mdx — Services section

## Examples

### GitHub Pages

```bash
# Fork live-codes/livecodes
# Enable GitHub Pages in repo settings
npm install
npm run deploy

# Access at https://your-username.github.io/livecodes/
```

### Cloudflare Pages

```bash
# Build command: npm run build:app
# Output directory: build
# Environment: NODE_VERSION=18

# Access at https://your-subdomain.pages.dev/
```

### Docker VPS

```bash
git clone https://github.com/live-codes/livecodes.git
cd livecodes
docker-compose up -d

# Access at https://livecodes.localhost
# Configure domain in docker-compose.yml
```
