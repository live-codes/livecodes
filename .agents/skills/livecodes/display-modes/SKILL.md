---
name: livecodes/display-modes
description: >
  Configure how the playground is displayed: full, focus, simple, lite, editor,
  codeblock, and result modes. Load this skill when choosing display mode for
  embeddings, configuring read-only views, or showing only result or editor.
type: core
library: livecodes
library_version: 0.13.0
requires:
  - configuration
sources:
  - live-codes/livecodes:docs/docs/features/display-modes.mdx
  - live-codes/livecodes:docs/docs/features/lite.mdx
---

This skill builds on configuration. Read it first for foundational concepts.

# LiveCodes — Display Modes

Display modes control what UI elements are shown in the playground. Choose mode based on your embedding use case.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Via config object
createPlayground('#container', {
  config: { mode: 'simple' },
});

// Via query params
createPlayground('#container', {
  params: { mode: 'result' },
});

// Via URL
// https://livecodes.io/?mode=lite&template=react
```

## Core Patterns

### Full mode (default)

Complete playground with toolbars, all editors, result pane.

```javascript
// Default mode - no need to specify
createPlayground('#container', {
  template: 'react',
});
// Mode is 'full' by default
```

### Simple mode (embeds)

One editor + result. Ideal for embedded playgrounds with limited space.

```javascript
createPlayground('#container', {
  config: {
    mode: 'simple',
    layout: 'vertical', // 'vertical' or 'horizontal'
    activeEditor: 'script',
    editor: 'monaco', // 'monaco' or 'codemirror' (default)
  },
  params: {
    js: 'console.log("Hello")',
    console: 'open',
  },
});

// With style editor
createPlayground('#container', {
  config: {
    mode: 'simple',
    layout: 'vertical',
    activeEditor: 'script',
    editor: 'monaco',
  },
});
```

### Lite mode

Lightweight editor for faster loading. Minimal features.

```javascript
createPlayground('#container', {
  config: { mode: 'lite' },
  template: 'react',
});

// Via URL
// https://livecodes.io/?mode=lite&template=react
```

Lite mode features:

- Uses CodeJar editor (light-weight)
- No minimap, no advanced autocomplete
- Still supports all languages
- Faster initial load

### Editor mode (code only)

No result pane. Shows only the editors.

```javascript
createPlayground('#container', {
  config: { mode: 'editor' },
  template: 'react',
});
```

Use for:

- Code review interfaces
- Teaching code patterns
- Read-only snippet viewers

### Codeblock mode (read-only)

Static code display with copy button on hover. No editing.

```javascript
createPlayground('#container', {
  config: {
    mode: 'codeblock',
    editor: 'monaco', // Optional: use Monaco instead of CodeJar
  },
  params: { html: '<h1>Hello World</h1>' },
});
```

Use for:

- Blog posts with code snippets
- Documentation
- One-way code display

### Result mode (output only)

Shows only the result page with a drawer to open in full playground.

```javascript
createPlayground('#container', {
  params: {
    mode: 'result',
    template: 'react',
  },
});

// Show console in result mode
createPlayground('#container', {
  params: {
    mode: 'result',
    tools: 'console|full',
    js: 'console.log("Hello World")',
  },
});
```

Use for:

- Demo showcase
- Embedded output
- Presentations

### Focus mode

Minimal UI: editors, result, console only. No menus or secondary controls.

```javascript
createPlayground('#container', {
  config: { mode: 'focus' },
});
```

Toggle between focus and full in the app UI. Access via button in bottom-left corner.

## Display Mode vs Default View

| Concept | What it controls               |
| ------- | ------------------------------ |
| Mode    | What UI elements are loaded    |
| View    | Which pane is shown by default |

```javascript
// Mode: 'editor' - Only editors exist, no result pane
createPlayground('#container', {
  config: { mode: 'editor' },
});

// Mode: 'full', View: 'editor' - All UI, editors shown by default
createPlayground('#container', {
  config: {
    mode: 'full', // Full UI
    view: 'editor', // Show editors first
  },
});
```

## Common Mistakes

### MEDIUM Confusing mode with view

Wrong:

```javascript
// Want to show result by default but use full UI
createPlayground('#container', {
  config: { mode: 'result' }, // Result mode - no editors!
});
```

Correct:

```javascript
// Use view for default visible pane
createPlayground('#container', {
  config: {
    mode: 'full', // Full UI with all elements
    view: 'result', // Show result by default
  },
});
```

`mode` determines what elements exist. `view` determines which element is visible first.

Source: docs/docs/features/display-modes.mdx — Display Mode vs Default View section

### MEDIUM Tools not visible in result mode

```javascript
// Console won't show in result mode by default
createPlayground('#container', {
  params: {
    mode: 'result',
    js: 'console.log("Hello")',
  },
});
```

Correct:

```javascript
// Set tools to 'open' or 'full' in result mode
createPlayground('#container', {
  params: {
    mode: 'result',
    tools: 'console|full', // Show console in full height
    js: 'console.log("Hello")',
  },
});
```

In result mode, tools pane is hidden by default. Set `tools: 'console|open'` or `tools: 'console|full'` to show it.

Source: docs/docs/features/display-modes.mdx — Result mode section

## Mode Reference

| Mode        | Shows                      | Use Case                    |
| ----------- | -------------------------- | --------------------------- |
| `full`      | All UI (default)           | Full playground experience  |
| `focus`     | Editors + result + console | Minimal distractions        |
| `simple`    | One editor + result        | Compact embeds              |
| `lite`      | Lightweight editor         | Fast loading, basic editing |
| `editor`    | Only editors               | Code review, teaching       |
| `codeblock` | Static code with copy      | Read-only snippets          |
| `result`    | Only result page           | Demo showcase               |

## View Reference

| View     | Description                               |
| -------- | ----------------------------------------- |
| `split`  | Editors and result side by side (default) |
| `editor` | Editors visible, result hidden            |
| `result` | Result visible, editors hidden            |

## Tools Configuration

```javascript
const config = {
  tools: {
    enabled: ['console', 'compiled'],  // or 'all'
    active: 'console',    // Which tool is open
    status: 'open',       // 'open', 'full', 'closed', 'none'
  },
};

// Via params
params: {
  tools: 'console|open',     // Console open
  tools: 'compiled|full',     // Compiled code, full height
  console: 'open',            // Shorthand for console
}
```
