---
name: livecodes/import-export
description: >
  Import code from GitHub gists/files/repos, GitLab, URLs, DOM, and local files.
  Export projects as HTML, JSON, ZIP, or to external services. Load this skill
  when loading projects from external sources or exporting project state.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/features/import.mdx
  - live-codes/livecodes:docs/docs/features/export.mdx
---

# LiveCodes — Import and Export Code

LiveCodes imports code from external sources and exports projects in multiple formats.

## Setup

```javascript
import { createPlayground, getPlaygroundUrl } from 'livecodes';

// Import from URL
const playground = await createPlayground('#container', {
  import: 'https://github.com/user/repo/blob/main/src/index.js',
});

// Import from URL via query param
// https://livecodes.io/?x=https://github.com/user/repo

// Export to shareable URL
const shareUrl = await playground.getShareUrl();
const shortUrl = await playground.getShareUrl(true);
```

## Core Patterns

### Import from GitHub

```javascript
// GitHub file
createPlayground('#container', {
  import: 'https://github.com/lodash/lodash/blob/master/isObject.js',
});

// GitHub directory
createPlayground('#container', {
  import: 'https://github.com/user/repo/tree/main/src',
});

// GitHub gist
createPlayground('#container', {
  import: 'https://gist.github.com/abc123',
});

// Specify files from multi-file source
createPlayground('#container', {
  import: 'https://github.com/user/repo/tree/main/src',
  params: { files: 'App.tsx,styles.css,index.html' },
});
```

### Import from GitLab

```javascript
// GitLab snippet
createPlayground('#container', {
  import: 'https://gitlab.com/-/snippets/12345',
});

// GitLab file
createPlayground('#container', {
  import: 'https://gitlab.com/user/repo/-/blob/main/src/index.js',
});
```

### Import from URL

```javascript
// Raw code URL
createPlayground('#container', {
  import: 'https://example.com/code.js',
});

// URL with language specified
createPlayground('#container', {
  params: {
    x: 'https://example.com/code',
    lang: 'typescript', // Force language
  },
});

// Import from Vue/TypeScript playgrounds
createPlayground('#container', {
  import: 'https://play.vuejs.org/#...',
});
```

### Import from shared project

```javascript
// Short URL
createPlayground('#container', {
  import: 'id/abc123', // Shared project ID
});

// Compressed config
createPlayground('#container', {
  import: 'code/...', // Compressed base64 config
});

// Via URL
// https://livecodes.io/?x=id/abc123
// https://livecodes.io/?x=code/...
```

### Import from DOM

```javascript
// HTML page with code blocks
createPlayground('#container', {
  import: 'https://example.com/blog-post',
});

// HTML must use specific structure:
// <code class="livecodes">
//   <pre data-lang="html">...</pre>
//   <pre data-lang="css">...</pre>
//   <pre data-lang="javascript">...</pre>
// </code>
```

### Import via SDK config

```javascript
// Set config with code
await playground.setConfig({
  markup: { language: 'html', content: '<h1>Hello</h1>' },
  style: { language: 'css', content: 'h1 { color: blue; }' },
  script: { language: 'javascript', content: 'console.log("hi")' },
});

// Set config from URL
await playground.setConfig('https://example.com/config.json');
```

### Specify files from multi-file sources

```javascript
// When importing directory or gist with multiple files
createPlayground('#container', {
  import: 'https://github.com/user/repo/tree/main/src',
  params: {
    files: 'Counter.tsx,counter.css,index.html',
    active: 'script', // Which editor to show: 'markup', 'style', 'script', or 0, 1, 2
  },
});
```

### Export via SDK

```javascript
const playground = await createPlayground('#container', {
  /* ... */
});

// Get share URL
const longUrl = await playground.getShareUrl(); // Long URL with compressed config
const shortUrl = await playground.getShareUrl(true); // Short URL

// Get config to save/export
const config = await playground.getConfig();
```

### Export via URL

```
# Long URL (compressed config)
https://livecodes.io/#config/...

# Short URL
https://livecodes.io/?x=id/abc123
```

## Common Import Sources

| Source                | URL Pattern                       | Notes                  |
| --------------------- | --------------------------------- | ---------------------- |
| GitHub file           | `github.com/user/repo/blob/...`   | Single file            |
| GitHub directory      | `github.com/user/repo/tree/...`   | Multiple files         |
| GitHub gist           | `gist.github.com/...`             | Multi-file gists work  |
| GitLab file           | `gitlab.com/user/repo/-/blob/...` | Single file            |
| GitLab snippet        | `gitlab.com/-/snippets/...`       | Snippet                |
| JS Bin                | `jsbin.com/...`                   | JS Bin embeds          |
| Vue Playground        | `play.vuejs.org/#...`             | Vue SFC playground     |
| TypeScript Playground | `typescriptlang.org/play#...`     | TS playground          |
| Raw URL               | Any URL                           | Language auto-detected |
| Local files           | Drag & drop                       | Standalone app only    |

## File Selection Priority

When importing multiple files, LiveCodes prioritizes:

1. Files named `index.*`, `default.*` (markup)
2. Files named `style.*`, `styles.*` (style)
3. Files named `script.*`, `app.*`, `main.*`, `index.*` (script)
4. README and markdown files get lower priority
5. Use `files` parameter to explicitly select files

## SDK Import Methods

```javascript
// Option 1: EmbedOptions.import
createPlayground('#container', {
  import: 'https://github.com/user/repo',
});

// Option 2: Query param x
createPlayground('#container', {
  params: { x: 'https://github.com/user/repo' },
});

// Option 3: URL
// https://livecodes.io/?x=https://github.com/user/repo

// Option 4: setConfig with URL
await playground.setConfig('https://example.com/config.json');
```
