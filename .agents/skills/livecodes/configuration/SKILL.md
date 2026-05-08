---
name: livecodes/configuration
description: >
  Configure playground behavior through Config object, query parameters, EmbedOptions,
  editor settings, processors, external resources, and custom settings. Load this skill
  when setting up project content, configuring CSS processors, or customizing display.
type: core
library: livecodes
library_version: 0.13.0
sources:
  - live-codes/livecodes:docs/docs/configuration/configuration-object.mdx
  - live-codes/livecodes:docs/docs/configuration/query-params.mdx
  - live-codes/livecodes:src/sdk/models.ts
---

# LiveCodes — Configure Playground

LiveCodes uses configuration objects to define project content and behavior. Config can be passed to `createPlayground` or set via URL parameters.

## Setup

```javascript
import { createPlayground } from 'livecodes';

// Full config object
createPlayground('#container', {
  config: {
    title: 'My Project',
    markup: { language: 'html', content: '<h1>Hello</h1>' },
    style: { language: 'css', content: 'h1 { color: blue; }' },
    script: { language: 'javascript', content: 'console.log("hi")' },
    activeEditor: 'script',
  },
});

// Query params (simpler syntax)
createPlayground('#container', {
  params: {
    html: '<h1>Hello</h1>',
    css: 'h1 { color: blue; }',
    js: 'console.log("hi")',
    console: 'open',
  },
});
```

## Core Patterns

### Configure each editor

```javascript
const config = {
  markup: {
    language: 'markdown',
    content: '# Title\n\nParagraph',
    contentUrl: 'https://example.com/content.md', // Alternative to content
  },
  style: {
    language: 'scss',
    content: '$color: blue; h1 { color: $color; }',
  },
  script: {
    language: 'typescript',
    content: 'const x: number = 1;',
    hiddenContent: 'export function helper() {}', // Hidden but evaluated
  },
};
```

### Enable CSS processors

```javascript
const config = {
  style: { language: 'css', content: '...' },
  processors: ['tailwindcss', 'autoprefixer'], // Processors run in order
};
```

### Add external resources

```javascript
const config = {
  stylesheets: ['https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css'],
  scripts: ['https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js'],
};
```

### Configure tests

```javascript
const config = {
  tests: {
    language: 'typescript',
    content: `
      import { sum } from './script';
      test('sums numbers', () => {
        expect(sum(1, 2)).toBe(3);
      });
    `,
  },
};
```

### Set display mode

```javascript
const config = {
  mode: 'simple', // 'full' | 'focus' | 'simple' | 'lite' | 'editor' | 'codeblock' | 'result'
  view: 'result', // 'split' | 'editor' | 'result'
  readonly: true, // Read-only mode
};
```

### Configure editor settings

```javascript
const config = {
  editor: 'monaco', // 'monaco' | 'codemirror' | 'codejar' | 'auto'
  theme: 'dark', // 'light' | 'dark'
  editorTheme: 'vs-dark', // See themes in docs
  fontFamily: 'Fira Code',
  fontSize: 14,
  useTabs: false,
  tabSize: 2,
  lineNumbers: true,
  wordWrap: false,
  emmet: true,
  editorMode: 'vim', // 'vim' | 'emacs' | undefined
};
```

### Add custom imports

```javascript
const config = {
  imports: {
    'my-lib': 'https://my-cdn.com/lib.js',
    'my-lib/submodule': 'https://my-cdn.com/sub.js',
  },
};
```

### Use URL query parameters

URL: `https://livecodes.io/?js=console.log("Hello")&console=open&theme=light`

```javascript
// Equivalent in createPlayground
createPlayground('#container', {
  params: {
    js: 'console.log("Hello")',
    console: 'open',
    theme: 'light',
  },
});
```

### Hidden content for embedded playgrounds

```javascript
const config = {
  script: {
    language: 'javascript',
    content: 'export function myFunc() { return 42; }',
    hiddenContent: '// Hidden helper\nfunction helper() { return 1; }',
  },
  tests: {
    language: 'javascript',
    content: "import { myFunc } from './script';\ntest('works', () => expect(myFunc()).toBe(42))",
  },
};
```

## Common Mistakes

### HIGH Confusing Config with EmbedOptions

Wrong:

```javascript
createPlayground('#container', {
  config: {
    appUrl: 'https://my-server.com', // Wrong: appUrl belongs in EmbedOptions
    template: 'react', // Wrong: template belongs in EmbedOptions
  },
});
```

Correct:

```javascript
createPlayground('#container', {
  // EmbedOptions (SDK-level settings)
  appUrl: 'https://my-server.com',
  template: 'react',
  loading: 'lazy',
  headless: false,

  // Config (Project content)
  config: {
    title: 'My Project',
    markup: { language: 'html', content: '<h1>Hello</h1>' },
    style: { language: 'css', content: '...' },
    script: { language: 'javascript', content: '...' },
  },
});
```

`EmbedOptions` controls how the playground is embedded (appUrl, template, loading, headless). `Config` controls the project content (languages, code, processors).

Source: docs/docs/sdk/js-ts.mdx — EmbedOptions section

### MEDIUM Params overriding config unexpectedly

Wrong:

```javascript
createPlayground('#container', {
  config: {
    markup: { language: 'html', content: '<h1>A</h1>' },
  },
  params: {
    html: '<h1>B</h1>', // This overrides config.markup!
  },
});
```

Correct:

```javascript
// Use one source or understand precedence:
// params > config > import > template

createPlayground('#container', {
  params: {
    html: '<h1>B</h1>',
  },
  // No config needed for simple cases
});

// Or use config only
createPlayground('#container', {
  config: {
    markup: { language: 'html', content: '<h1>A</h1>' },
  },
});
```

When both `config` and `params` are provided, `params` takes precedence. Use one or the other for clarity.

Source: docs/docs/sdk/js-ts.mdx — Multiple Sources section

### MEDIUM Using incorrect language name

Wrong:

```javascript
const config = {
  script: { language: 'react.js', content: '...' }, // Invalid
};
```

Correct:

```javascript
// Use language name, extension, or alias
const config = {
  script: { language: 'react', content: '...' }, // Language name
  // or
  script: { language: 'jsx', content: '...' }, // Extension
  // or
  script: { language: 'react-jsx', content: '...' }, // Alias
};
```

Language names must match supported values. See languages reference for all options.

Source: src/sdk/models.ts — Language type

## Config Reference

### Project Content

| Property       | Type                              | Default                | Description                              |
| -------------- | --------------------------------- | ---------------------- | ---------------------------------------- |
| `title`        | `string`                          | `"Untitled Project"`   | Project title, used as result page title |
| `description`  | `string`                          | `""`                   | Project description, used in search      |
| `head`         | `string`                          | `"<meta charset...>"`  | Custom content for `<head>` element      |
| `htmlAttrs`    | `string \| object`                | `'lang="en" class=""'` | Attributes for `<html>` element          |
| `tags`         | `string[]`                        | `[]`                   | Project tags for filtering/search        |
| `activeEditor` | `"markup" \| "style" \| "script"` | `"markup"`             | Which editor is visible                  |
| `languages`    | `Language[]`                      | all languages          | Enabled languages in editor dropdown     |

### Editor Content (`markup`, `style`, `script`, `tests`)

Each editor config object supports:

| Property           | Type                    | Default            | Description                             |
| ------------------ | ----------------------- | ------------------ | --------------------------------------- |
| `language`         | `Language`              | (varies by editor) | Language name, extension, or alias      |
| `content`          | `string`                | `""`               | Initial code content                    |
| `contentUrl`       | `string`                | —                  | URL to load content from                |
| `hiddenContent`    | `string`                | —                  | Hidden code (evaluated but not visible) |
| `hiddenContentUrl` | `string`                | —                  | URL to load hidden content              |
| `foldedLines`      | `Array<{from, to}>`     | —                  | Lines to fold on load                   |
| `title`            | `string`                | —                  | Override editor title                   |
| `hideTitle`        | `boolean`               | —                  | Hide editor title                       |
| `order`            | `number`                | `0`                | Editor order in UI                      |
| `selector`         | `string`                | —                  | CSS selector for DOM import             |
| `position`         | `{lineNumber, column?}` | —                  | Initial cursor position                 |

### External Resources

| Property      | Type                                   | Default | Description                                      |
| ------------- | -------------------------------------- | ------- | ------------------------------------------------ |
| `stylesheets` | `string[]`                             | `[]`    | URLs for external CSS                            |
| `scripts`     | `string[]`                             | `[]`    | URLs for external JS                             |
| `cssPreset`   | `"" \| "normalize.css" \| "reset-css"` | `""`    | CSS preset to apply                              |
| `processors`  | `Processor[]`                          | `[]`    | CSS processors (tailwindcss, autoprefixer, etc.) |

### Module Resolution

| Property  | Type                               | Default | Description                             |
| --------- | ---------------------------------- | ------- | --------------------------------------- |
| `imports` | `Record<string, string>`           | `{}`    | Custom import map for module resolution |
| `types`   | `Record<string, string \| object>` | `{}`    | Custom TypeScript type declarations     |

### App Settings

| Property          | Type                                                                             | Default                                    | Description                    |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------ |
| `readonly`        | `boolean`                                                                        | `false`                                    | Read-only mode                 |
| `allowLangChange` | `boolean`                                                                        | `true`                                     | Allow changing editor language |
| `view`            | `"split" \| "editor" \| "result"`                                                | `"split"`                                  | Default view                   |
| `mode`            | `"full" \| "focus" \| "simple" \| "lite" \| "editor" \| "codeblock" \| "result"` | `"full"`                                   | Display mode                   |
| `tools`           | `object`                                                                         | `{enabled: "all", active: "", status: ""}` | Tools pane config              |
| `zoom`            | `1 \| 0.5 \| 0.25`                                                               | `1`                                        | Result page zoom level         |

### User Settings

| Property         | Type                                         | Default                | Description                                |
| ---------------- | -------------------------------------------- | ---------------------- | ------------------------------------------ |
| `autoupdate`     | `boolean`                                    | `true`                 | Auto-run result on code change             |
| `autosave`       | `boolean`                                    | `false`                | Auto-save on code change                   |
| `autotest`       | `boolean`                                    | `false`                | Auto-run tests on code change              |
| `delay`          | `number`                                     | `1500`                 | Delay before autoupdate/autosave (ms)      |
| `formatOnsave`   | `boolean`                                    | `false`                | Format code on save                        |
| `layout`         | `"horizontal" \| "vertical" \| "responsive"` | `"responsive"`         | Editor layout                              |
| `theme`          | `"light" \| "dark"`                          | `"dark"`               | App theme                                  |
| `themeColor`     | `string`                                     | `"hsl(214, 40%, 50%)"` | App theme color                            |
| `editorTheme`    | `string \| string[]`                         | —                      | Editor themes (see docs)                   |
| `appLanguage`    | `string`                                     | —                      | UI language code (e.g., `"ar"`, `"zh-CN"`) |
| `recoverUnsaved` | `boolean`                                    | `true`                 | Enable recovery of unsaved project         |
| `welcome`        | `boolean`                                    | `true`                 | Show welcome screen                        |
| `showSpacing`    | `boolean`                                    | `false`                | Show element spacing in result             |

### Editor Settings

| Property        | Type                                              | Default                    | Description                       |
| --------------- | ------------------------------------------------- | -------------------------- | --------------------------------- |
| `editor`        | `"monaco" \| "codemirror" \| "codejar" \| "auto"` | —                          | Code editor to use                |
| `fontFamily`    | `string`                                          | —                          | Editor font family                |
| `fontSize`      | `number`                                          | `14` (full) / `12` (embed) | Editor font size                  |
| `useTabs`       | `boolean`                                         | `false`                    | Use tabs instead of spaces        |
| `tabSize`       | `number`                                          | `2`                        | Spaces per indent level           |
| `lineNumbers`   | `boolean \| "relative"`                           | `true`                     | Show line numbers                 |
| `wordWrap`      | `boolean`                                         | `false`                    | Enable word wrap                  |
| `closeBrackets` | `boolean`                                         | `true`                     | Auto-close brackets/quotes        |
| `foldRegions`   | `boolean`                                         | `false`                    | Fold #region blocks on load       |
| `minimap`       | `boolean`                                         | `false`                    | Show minimap (Monaco)             |
| `emmet`         | `boolean`                                         | `true`                     | Enable Emmet                      |
| `editorMode`    | `"vim" \| "emacs"`                                | —                          | Editor key bindings               |
| `semicolons`    | `boolean`                                         | `true`                     | Use semicolons in formatting      |
| `singleQuote`   | `boolean`                                         | `true`                     | Use single quotes in formatting   |
| `trailingComma` | `boolean`                                         | `true`                     | Use trailing commas in formatting |

## EmbedOptions Reference

| Property   | Type                           | Default                   | Description                          |
| ---------- | ------------------------------ | ------------------------- | ------------------------------------ |
| `appUrl`   | `string`                       | `"https://livecodes.io/"` | URL to self-hosted LiveCodes         |
| `config`   | `Config \| string`             | `{}`                      | Project config or URL to config JSON |
| `template` | `string`                       | —                         | Starter template name                |
| `import`   | `string`                       | —                         | URL to import code from              |
| `params`   | `object`                       | `{}`                      | URL query parameters                 |
| `loading`  | `"eager" \| "lazy" \| "click"` | `"lazy"`                  | When to load playground              |
| `headless` | `boolean`                      | `false`                   | Run without UI                       |

## Query Parameters

Many config options can be set via URL parameters:

```
https://livecodes.io/?template=react&theme=light&console=open
```

| Param         | Config Equivalent                 |
| ------------- | --------------------------------- |
| `template`    | `EmbedOptions.template`           |
| `x`           | `EmbedOptions.import`             |
| `files`       | Files to import (comma-separated) |
| `raw`         | Import URL as raw language        |
| `active`      | `activeEditor`                    |
| `mode`        | `mode`                            |
| `theme`       | `theme`                           |
| `console`     | `tools.status`                    |
| `no-defaults` | Skip default template             |

Boolean params: `?lite`, `?autoupdate=false`
Array params: `?processors=tailwindcss,autoprefixer`
Custom settings: `?customSettings.template.prerender=false`
