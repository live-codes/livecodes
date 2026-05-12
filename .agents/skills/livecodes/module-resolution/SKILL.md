---
name: livecodes/module-resolution
description: >
  Import npm, deno.land/x, jsr, and GitHub modules without build steps using
  automatic CDN resolution, custom import maps, and CDN provider prefixes.
  Load this skill when using bare module imports, configuring CDN providers,
  or resolving import conflicts.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/features/module-resolution.mdx
  - live-codes/livecodes:src/livecodes/compiler/import-map.ts
---

# LiveCodes — Resolve Modules

LiveCodes automatically resolves bare module imports to CDN URLs using import maps. Use npm packages and other modules without `npm install` or build steps.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Bare imports work automatically
createPlayground('#container', {
  config: {
    script: {
      language: 'javascript',
      content: `
import { v4 } from 'uuid';           // npm module
import React from 'react';            // npm module
import { useState } from 'react';     // Named import
console.log(v4());
      `,
    },
  },
});
```

## Core Patterns

### Import npm packages

```javascript
// Default: uses esm.sh CDN
import { v4 } from 'uuid';
import React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Specifying version
import React from 'react@18'; // React 18.x
import React from 'react@18.2.0'; // Exact version
import _ from 'lodash@4.17.21'; // Lodash specific version
```

### Use different CDN providers

```javascript
// esm.sh (default)
import React from 'react';
import React from 'esm.sh:react';

// Skypack
import React from 'skypack:react';

// jsDelivr
import React from 'jsdelivr:react';

// unpkg
import React from 'unpkg:react';

// Deno bundle
import { uuid } from 'deno:uuid';

// Full URL imports work too
import React from 'https://esm.sh/react@18';
```

### Import from Deno, GitHub, JSR

```javascript
// Deno.land/x (TS files auto-bundled)
import { uuid } from 'https://deno.land/x/uuid/mod.ts';

// JSR (Deno's npm-compatible registry)
import { yassify } from 'jsr:@kwhinnery/yassify';

// GitHub files (auto-bundled)
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts';

// Skip bundling with #nobundle
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts#nobundle';

// pkg.pr.new (unpublished packages)
import { Bench } from 'pr:tinybench@a832a55';
```

### Custom import maps

```javascript
// Via SDK config
createPlayground('#container', {
  config: {
    imports: {
      'my-lib': 'https://my-cdn.com/lib.js',
      'my-lib/utils': 'https://my-cdn.com/utils.js',
      'my-private-package': 'https://my-server.com/package/index.js',
    },
    script: {
      language: 'javascript',
      content: `
import { something } from 'my-lib';
import { helper } from 'my-lib/utils';
      `,
    },
  },
});

// Via custom settings in standalone app
// Settings → Custom Settings:
{
  "imports": {
    "my-lib": "https://my-cdn.com/lib.js"
  }
}
```

### Change default CDN

```javascript
const config = {
  customSettings: {
    defaultCDN: 'skypack', // Use Skypack for all bare imports
  },
  script: {
    language: 'javascript',
    content: `import React from 'react'; // Now uses skypack`,
  },
};
```

### Import CSS from script

```javascript
// URL ending in .css becomes <link>
import 'https://unpkg.com/github-markdown-css/github-markdown.css';

// Bare import for CSS
import 'github-markdown-css/github-markdown.css';
// Becomes: <link href="https://unpkg.com/github-markdown-css/github-markdown.css">

// Import compiled CSS from style editor
import styles from './style.css';
console.log(styles); // CSS string
```

## Common Mistakes

### HIGH Same module from different CDNs conflicts

Wrong:

```javascript
// React from different CDNs are DIFFERENT instances
import React from 'esm.sh:react'; // React instance A
import { createRoot } from 'skypack:react-dom/client'; // React instance B
// BREAKS: createRoot expects React instance A
```

Correct:

```javascript
// Always use same CDN (or no prefix = default)
import React from 'react';
import { createRoot } from 'react-dom/client';

// Or explicit same CDN
import React from 'esm.sh:react';
import { createRoot } from 'esm.sh:react-dom/client';
```

Module instances from different CDNs are separate. React context, hooks, and component state require the same instance.

Source: docs/docs/features/module-resolution.mdx — CDN Providers caution

### MEDIUM CommonJS require works but ESM preferred

Works but not recommended:

```javascript
const { v4 } = require('uuid'); // Works, converted to ESM
const React = require('react'); // Works
```

Preferred:

```javascript
import { v4 } from 'uuid';
import React from 'react';
```

LiveCodes converts `require` to ESM imports, but explicit ESM is clearer and matches local development.

Source: docs/docs/features/module-resolution.mdx — CommonJS Modules section

### LOW Not using #nobundle for pre-bundled URLs

When you want raw module URLs instead of bundling:

```javascript
// Without #nobundle, this gets bundled by bundlejs.com
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts';

// With #nobundle, get the raw URL
import { flatten } from 'https://github.com/remeda/remeda/blob/master/src/flatten.ts#nobundle';
```

Use `#nobundle` when the URL already serves bundled code or when you want to avoid bundling overhead.

Source: docs/docs/features/module-resolution.mdx — GitHub/GitLab/Bitbucket section

## CDN Provider Reference

| Prefix      | CDN                 | URL Format                                    |
| ----------- | ------------------- | --------------------------------------------- |
| (none)      | esm.sh              | `https://esm.sh/{package}`                    |
| `esm.sh:`   | esm.sh              | `https://esm.sh/{package}`                    |
| `skypack:`  | Skypack             | `https://cdn.skypack.dev/{package}`           |
| `jsdelivr:` | jsDelivr            | `https://cdn.jsdelivr.net/npm/{package}`      |
| `unpkg:`    | unpkg               | `https://unpkg.com/{package}?module`          |
| `bundle:`   | bundlejs            | `https://deno.bundlejs.com/?file&q={package}` |
| `deno:`     | bundlejs            | `https://deno.bundlejs.com/?file&q={url}`     |
| `jsr:`      | esm.sh (JSR)        | `https://esm.sh/jsr/{package}`                |
| `pr:`       | esm.sh (pkg.pr.new) | `https://esm.sh/pr/{package}`                 |

## How It Works

1. **Bare imports** (`import x from 'package'`) are resolved via import maps
2. **Import map** maps bare specifiers to full CDN URLs
3. **CDN** (default: esm.sh) serves ESM versions of npm packages
4. **Deno/GitHub URLs** ending in `.ts/.tsx/.jsx` are bundled via bundlejs.com
5. **CommonJS** `require()` calls are transpiled to ESM imports
