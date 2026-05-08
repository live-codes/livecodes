---
name: livecodes/headless-mode
description: >
  Run playground without visible UI using SDK methods directly. Load this skill
  when building Markdown compilers, code formatters, or tools that need compiled
  output without display.
type: core
library: livecodes
library_version: 0.13.0
requires:
  - sdk-embedding
  - sdk-methods
sources:
  - live-codes/livecodes:docs/docs/sdk/headless.mdx
---

This skill builds on sdk-embedding and sdk-methods. Read them first for foundational concepts.

# LiveCodes — Headless Mode

Headless mode runs LiveCodes without any visible UI. Use SDK methods to compile code, get output, and react to events.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Create headless playground - container is optional
const playground = await createPlayground({
  headless: true,
  config: {
    markup: { language: 'markdown', content: '# Hello World' },
  },
});

// Use SDK methods
const code = await playground.getCode();
console.log(code.markup.compiled); // "<h1>Hello World</h1>"
console.log(code.result); // Result page HTML
```

## Core Patterns

### Markdown compiler

```javascript
import { createPlayground } from 'livecodes';

let playground;

async function compileMarkdown(markdown) {
  if (!playground) {
    playground = await createPlayground({
      headless: true,
      config: { autoupdate: false },
    });
  }

  await playground.setConfig({
    markup: { language: 'markdown', content: markdown },
  });

  const code = await playground.getCode();
  return code.markup.compiled;
}

// Usage
const html = await compileMarkdown('# Hello\n\nWorld');
console.log(html); // "<h1>Hello</h1>\n<p>World</p>"
```

### React/JSX compiler

```javascript
import { createPlayground } from 'livecodes';

let playground;

async function compileJSX(jsxCode) {
  if (!playground) {
    playground = await createPlayground({
      headless: true,
      config: { autoupdate: false },
    });
  }

  await playground.setConfig({
    script: { language: 'react', content: jsxCode },
  });

  const code = await playground.getCode();
  return code.script.compiled;
}

const compiled = await compileJSX(`
  function App() {
    return <h1>Hello</h1>;
  }
`);
```

### Python interpreter

```javascript
import { createPlayground } from 'livecodes';

let playground;

async function runPython(code) {
  if (!playground) {
    playground = await createPlayground({
      headless: true,
      config: { autoupdate: true },
    });
  }

  // Set up console listener before running
  const outputs = [];
  playground.watch('console', ({ method, args }) => {
    outputs.push({ method, args });
  });

  await playground.setConfig({
    script: { language: 'python', content: code },
  });

  // Python runs automatically with autoupdate: true
  // Or: await playground.run();

  return outputs;
}

// Usage
const outputs = await runPython('print("Hello from Python!")');
// [{ method: 'log', args: ['Hello from Python!'] }]
```

### Get result HTML

```javascript
async function getResultHTML(config) {
  const playground = await createPlayground({
    headless: true,
    config: { ...config, autoupdate: false },
  });

  await playground.setConfig(config);

  const code = await playground.getCode();
  return code.result; // Result page HTML
}
```

### Watch for changes

```javascript
const playground = await createPlayground({
  headless: true,
  config: { autoupdate: false },
});

// Watch for compiled code changes
playground.watch('code', ({ code, config }) => {
  console.log('Compiled:', code.script.compiled);
});

// Change config - watch callback fires
await playground.setConfig({
  script: { language: 'typescript', content: 'const x: number = 1;' },
});
```

## Common Mistakes

## Headless vs Visible Mode

| Aspect    | Visible          | Headless                 |
| --------- | ---------------- | ------------------------ |
| Container | Required         | Optional                 |
| UI        | Shown            | Hidden                   |
| Use case  | User interaction | Programmatic compilation |

## When to Use Headless

- **Markdown/MDX compiler** — Get compiled HTML without display
- **Code formatter** — Use Prettier via LiveCodes
- **Language transpiler** — TypeScript → JavaScript, SCSS → CSS
- **Testing pipelines** — Run and verify code programmatically
- **Python/Ruby/Go interpreter** — Execute WASM languages and capture output
