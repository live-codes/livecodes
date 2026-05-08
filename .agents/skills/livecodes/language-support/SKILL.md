---
name: livecodes/language-support
description: >
  Work with 90+ supported languages, compilers, CSS processors, and WASM-compiled
  languages for markup, style, and script editors. Load this skill when configuring
  languages, setting up CSS processors, or working with WASM-based languages like
  Python, Ruby, or Go.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/languages/index.mdx
  - live-codes/livecodes:docs/docs/languages/_template.mdx
  - live-codes/livecodes:docs/docs/features/css.mdx
references:
  - references/languages.md
---

# LiveCodes — Work with Languages

LiveCodes supports 90+ languages across three editors: markup (HTML/templating), style (CSS/preprocessors), and script (JS/compiled languages).

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Basic language setup
createPlayground('#container', {
  config: {
    markup: { language: 'markdown', content: '# Hello' },
    style: { language: 'scss', content: '$color: blue; body { color: $color; }' },
    script: { language: 'typescript', content: 'const x: number = 1;' },
  },
});

// WASM language (Python)
createPlayground('#container', {
  config: {
    script: { language: 'python-wasm', content: 'print("Hello from Python")' },
  },
});

// Framework template
createPlayground('#container', { template: 'react' });
```

## Core Patterns

### Set language for each editor

```javascript
// Markup languages
markup: { language: 'html', content: '...' }        // HTML
markup: { language: 'markdown', content: '...' }    // Markdown
markup: { language: 'mdx', content: '...' }         // MDX
markup: { language: 'pug', content: '...' }         // Pug
markup: { language: 'handlebars', content: '...' }   // Handlebars

// Style languages
style: { language: 'css', content: '...' }          // CSS
style: { language: 'scss', content: '...' }         // SCSS/Sass
style: { language: 'less', content: '...' }        // Less
style: { language: 'stylus', content: '...' }       // Stylus

// Script languages
script: { language: 'javascript', content: '...' } // JavaScript
script: { language: 'typescript', content: '...' }  // TypeScript
script: { language: 'jsx', content: '...' }         // JSX
script: { language: 'tsx', content: '...' }         // TSX
```

### Use CSS processors

```javascript
const config = {
  style: { language: 'css', content: '...' },
  processors: [
    'tailwindcss', // Tailwind CSS
    'autoprefixer', // Add vendor prefixes
    'postcssPresetEnv', // Use future CSS
    'cssmodules', // CSS Modules
    'cssnano', // Minify
  ],
};

// Processors run in order listed
// Tailwind should come before PostCSS tools
```

### Import styles from script

```javascript
// Import CSS in script editor
script: {
  language: 'javascript',
  content: `
import 'tailwindcss/utilities.css';
import './style.css';  // Gets added as a link tag
  `,
}

// Get compiled CSS from style editor
import styles from './style.css';
console.log(styles); // CSS string
```

### WASM languages (first load is slow)

```javascript
// Python (Wasm)
script: { language: 'python-wasm', content: 'def greet(name): return f"Hello, {name}"' }

// Ruby (Wasm)
script: { language: 'ruby-wasm', content: 'puts "Hello from Ruby"' }

// Go (Wasm)
script: { language: 'go-wasm', content: 'package main\n\nfunc main() { println("Hello") }' }
```

WASM languages download large files on first use (5-20MB). Subsequent runs use cached WASM.

### Set editor title and position

```javascript
script: {
  language: 'python-wasm',
  content: 'print("Hello")',
  title: 'Python',           // Override displayed title
  hideTitle: false,          // Hide editor title
  order: 0,                  // Editor order (0, 1, 2)
}

// Use hidden content for helper functions
script: {
  language: 'javascript',
  content: 'export function main() { return helper(); }',
  hiddenContent: 'function helper() { return 42; }', // Hidden but evaluated
}
```

## Common Mistakes

### MEDIUM CSS processors in wrong order

Wrong:

```javascript
// PurgeCSS runs before Tailwind generates classes
processors: ['purgecss', 'tailwindcss', 'autoprefixer'];
```

Correct:

```javascript
// Correct order: Tailwind generates → PostCSS processes → PurgeCSS removes unused
processors: ['tailwindcss', 'autoprefixer', 'purgecss'];
```

Processors run in the order listed. Tailwind must generate classes before other processors. In the app UI, processors are ordered automatically.

Source: docs/docs/features/css.mdx — CSS Processors section

### MEDIUM WASM language first load appears slow

Wrong assumption:

```javascript
// Expecting instant execution for Python
script: { language: 'python-wasm', content: 'print("Hello")' }
// First run downloads ~15MB WASM file
```

Understanding:

```javascript
// WASM languages need initial download
// - Python (Pyodide): ~15MB
// - Ruby: ~10MB
// - Go: ~8MB
// Subsequent runs use cached WASM
// Consider showing loading indicator on first run
```

Source: docs/docs/languages/python-wasm.mdx

## Language Categories

| Editor | Categories                          | Examples                                                  |
| ------ | ----------------------------------- | --------------------------------------------------------- |
| Markup | HTML, Markdown, Templates, Diagrams | `html`, `markdown`, `pug`, `handlebars`, `mdx`, `astro`   |
| Style  | CSS, Preprocessors, PostCSS         | `css`, `scss`, `less`, `stylus`, `postcss`                |
| Script | JS, TypeScript, Compiled, WASM      | `javascript`, `typescript`, `python`, `ruby`, `go`, `php` |

## Processor Reference

See [Full Language Reference](references/languages.md) for all 90+ languages, aliases, and extensions.

| Processor          | Purpose                             |
| ------------------ | ----------------------------------- |
| `tailwindcss`      | Utility-first CSS framework         |
| `windicss`         | Windi CSS (alternative to Tailwind) |
| `unocss`           | Atomic CSS engine                   |
| `autoprefixer`     | Add vendor prefixes                 |
| `postcssPresetEnv` | Use future CSS features             |
| `cssmodules`       | Scoped CSS classes                  |
| `cssnano`          | Minify CSS                          |
| `lightningcss`     | Fast CSS processing                 |
| `tokencss`         | Design tokens                       |
