---
name: livecodes/sdk-methods
description: >
  Use SDK methods to interact with playgrounds: run, getCode, setConfig, getConfig,
  watch, runTests, format, getShareUrl, show, destroy. Load this skill when
  programmatically controlling embedded playgrounds, reacting to code changes,
  or retrieving compiled output.
type: core
library: livecodes
library_version: 0.13.0
requires:
  - sdk-embedding
sources:
  - live-codes/livecodes:docs/docs/sdk/js-ts.mdx
  - live-codes/livecodes:src/sdk/index.ts
---

This skill builds on sdk-embedding. Read it first for foundational concepts.

# LiveCodes — Use SDK Methods

The Playground object returned by `createPlayground` exposes methods to programmatically control the playground.

## Setup

```javascript
import { createPlayground } from 'livecodes';

const playground = await createPlayground('#container', {
  template: 'react',
});

// All SDK methods return Promises
await playground.run();
const code = await playground.getCode();
await playground.setConfig({
  /* new config */
});
```

## Core Patterns

### Run the playground

```javascript
// Run the result page (after any needed compilation)
await playground.run();
```

### Get current code and config

```javascript
// Get code from all editors
const code = await playground.getCode();
console.log(code.markup.content); // Source markup
console.log(code.markup.language); // Language name
console.log(code.markup.compiled); // Compiled output (if applicable)
console.log(code.result); // Result page HTML

// Get configuration object
const config = await playground.getConfig();
console.log(config.title);
console.log(config.markup.language);

// Get content-only config (without user preferences)
const contentConfig = await playground.getConfig(true);
```

### Update playground configuration

```javascript
// Load new project in place (no full reload)
await playground.setConfig({
  markup: { language: 'markdown', content: '# New Content' },
});

// Get the resulting config
const newConfig = await playground.setConfig({
  script: { language: 'typescript', content: 'const x: number = 1;' },
});
```

### Watch for changes

```javascript
// Watch for code changes
const codeWatcher = playground.watch('code', ({ code, config }) => {
  console.log('Code changed:', code.script.content);
});

// Watch for console output
const consoleWatcher = playground.watch('console', ({ method, args }) => {
  console[method](...args);
});

// Watch for test results
const testsWatcher = playground.watch('tests', ({ results, error }) => {
  results.forEach((r) => console.log(r.status, r.testPath));
});

// Remove watchers when done
codeWatcher.remove();
consoleWatcher.remove();
```

### Run tests programmatically

```javascript
const { results } = await playground.runTests();
results.forEach((result) => {
  console.log(result.status); // 'pass', 'fail', or 'skip'
  console.log(result.errors); // Array of error strings
  console.log(result.testPath); // ['describe', 'it']
});
```

### Show specific panel

```javascript
// Show editors
await playground.show('editor'); // Active editor
await playground.show('markup'); // Markup editor
await playground.show('style'); // Style editor
await playground.show('script'); // Script editor

// Show tools
await playground.show('console'); // Console panel
await playground.show('compiled'); // Compiled code viewer
await playground.show('tests'); // Tests panel

// Show result
await playground.show('result'); // Result page
await playground.show('toggle-result'); // Toggle result visibility

// With options
await playground.show('result', { full: true }); // Full screen
await playground.show('result', { zoom: 0.5 }); // 50% zoom
await playground.show('script', { line: 10, column: 5 }); // Scroll to line
```

### Format code

```javascript
// Format all editors
await playground.format();

// Format only active editor
await playground.format(false);
```

### Get share URL

```javascript
// Long URL with compressed config
const longUrl = await playground.getShareUrl();

// Short URL (requires share service)
const shortUrl = await playground.getShareUrl(true);
```

### Execute custom commands

```javascript
// Set broadcast token
await playground.exec('setBroadcastToken', 'my-token');

// Show version info
await playground.exec('showVersion');
```

### Destroy playground

```javascript
await playground.destroy();
// Playground removed from DOM, all event listeners cleaned up
```

## Common Mistakes

### HIGH Not awaiting async SDK methods

Wrong:

```javascript
const playground = await createPlayground('#container', {});
const code = playground.getCode(); // Returns Promise, not code
console.log(code); // Promise { <pending> }
```

Correct:

```javascript
const playground = await createPlayground('#container', {});
const code = await playground.getCode(); // Await the Promise
console.log(code.markup.content);
```

All SDK methods return Promises. Use `await` or `.then()` to get the result.

Source: docs/docs/sdk/js-ts.mdx — SDK methods section

### MEDIUM watch callback receives wrong data structure

Wrong:

```javascript
playground.watch('code', (data) => {
  console.log(data.content); // Undefined
});
```

Correct:

```javascript
// 'code' event provides { code, config }
playground.watch('code', ({ code, config }) => {
  console.log(code.markup.content);
  console.log(code.style.content);
  console.log(code.script.content);
  console.log(code.result); // Result page HTML
});

// 'console' event provides { method, args }
playground.watch('console', ({ method, args }) => {
  console[method](...args);
});

// 'tests' event provides { results, error? }
playground.watch('tests', ({ results, error }) => {
  if (error) console.error(error);
  results.forEach((r) => console.log(r.status));
});
```

Source: docs/docs/sdk/js-ts.mdx — watch method section

### LOW Using deprecated onChange instead of watch

Wrong:

```javascript
// Deprecated method
const watcher = playground.onChange(({ code, config }) => {
  console.log('changed');
});
```

Correct:

```javascript
// Use watch instead
const watcher = playground.watch('code', ({ code, config }) => {
  console.log('changed');
});
watcher.remove(); // When done watching
```

`onChange` is deprecated. Use `watch('code', callback)` instead.

Source: src/sdk/index.ts — `onChange` marked as deprecated

## SDK Method Reference

| Method                    | Returns              | Description                              |
| ------------------------- | -------------------- | ---------------------------------------- |
| `load()`                  | `Promise<void>`      | Load playground (for click-to-load mode) |
| `run()`                   | `Promise<void>`      | Run the result page                      |
| `format(allEditors?)`     | `Promise<void>`      | Format code                              |
| `getShareUrl(shortUrl?)`  | `Promise<string>`    | Get shareable URL                        |
| `getConfig(contentOnly?)` | `Promise<Config>`    | Get configuration                        |
| `setConfig(config)`       | `Promise<Config>`    | Update configuration                     |
| `getCode()`               | `Promise<Code>`      | Get code from all editors                |
| `show(panel, options?)`   | `Promise<void>`      | Show specific panel                      |
| `runTests()`              | `Promise<{results}>` | Run tests                                |
| `watch(event, fn)`        | `{remove()}`         | Subscribe to events                      |
| `exec(command, ...args)`  | `Promise<any>`       | Execute custom command                   |
| `destroy()`               | `Promise<void>`      | Clean up and remove                      |
