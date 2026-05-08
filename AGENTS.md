# AGENTS.md

Guidance for AI coding agents working in the LiveCodes repository.

## Project Overview

LiveCodes is a code playground that works in the browser. It's a TypeScript/JavaScript project that uses esbuild for bundling.

## Documentation for AI Agents

- **[skills/](./skills/)** — Intent skills for LiveCodes SDK. Start with [.agents/skills/livecodes/SKILL.md](./.agents/skills/livecodes/SKILL.md) for an overview and decision tree linking to all sub-skills.
- **[docs/docs/contribution/](./docs/docs/contribution/)** — Internal architecture and system documentation for contributors (build system, compiler, config, editor, etc.)
- **[llms-full.txt](./build/docs/llms-full.txt)** ([livecodes.io/docs/llms-full.txt](https://livecodes.io/docs/llms-full.txt)) — Generated list of all LiveCodes features and their descriptions.

## Build / Lint / Test Commands

```bash
npm run build             # Full production build (app + docs + storybook)
npm run build:app         # Build app only
npm run start             # Dev server with watch (http://127.0.0.1:8080)
npm run docs              # Start documentation server (http://localhost:3000/docs)
npm run storybook         # Start storybook (http://localhost:6006)

npm run test              # Run everything (typecheck + lint + unit tests)
npm run test:unit         # All Jest unit tests
npm run test:unit -- --testPathPattern="utils.spec"           # Single test file by path pattern
npm run test:unit -- --testNamePattern="debounce"             # Single test by name
npm run test:unit -- src/livecodes/config/__tests__/build-config.spec.ts  # Exact file
npm run e2e               # Playwright end-to-end tests

npm run typecheck:app     # TypeScript type check (tsc --noEmit)
npm run lint:eslint       # ESLint check
npm run lint:prettier     # Prettier format check
npm run lint:stylelint    # Check styles with Stylelint
npm run fix               # Auto-fix all (prettier + eslint + stylelint)
npm run fix:prettier      # Auto-fix formatting only
npm run fix:eslint        # Auto-fix lint only
npm run fix:stylelint     # Auto-fix stylelint only
```

## Project Structure

```
src/
  livecodes/            # Top-level directory for the LiveCodes app
    core.ts             # Main application logic
    models.ts           # Central type definitions. Can import/re-export from `sdk/models.ts`.
    vendors.ts          # CDN URLs for third-party assets
    config/             # Configuration (build, default, validate, upgrade)
    compiler/           # Compilation pipeline
    editor/             # Code editor integration (Monaco, CodeMirror, CodeJar)
    languages/          # Language specs (~90 languages)
    i18n/               # Internationalization (17+ locales)
    UI/                 # User interface controllers
    html/               # User interface views
    styles/             # User interface styles
    utils/              # Shared utility functions
    storage/            # IndexedDB/localStorage persistence
    services/           # Backend services (auth, GitHub, share, CDN)
    events/             # Event system (pub/sub, custom events)
    notifications/      # Notification system
    toolspane/          # Bottom panel (console, compiled code, tests)
    result/             # Result page rendering
    templates/          # Starter templates
    types/              # Providing types for code editors
    export/ import/ deploy/ sync/ ...

  sdk/                  # SDK for embedding LiveCodes (npm/jsr package). Avoid build-time dependencies.
    index.ts            # SDK entry point
    models.ts           # SDK type definitions. Should not import from any other modules.
    internal/           # Internal utilities. Should not be exported by SDK.
    preact.ts react.tsx solid.ts svelte.ts vue.ts web-components.ts # Framework wrappers.
```

Each feature directory typically contains: `index.ts` (barrel), `models.ts` (local types),
`__tests__/*.spec.ts` (co-located tests), and implementation files.

## Code Style

### Formatting (Prettier)

- Semicolons: always
- Single quotes
- Trailing commas: all (objects, arrays, function params)
- Print width: 100
- Imports auto-sorted by `prettier-plugin-organize-imports`

### Imports

Use `import type` for type-only imports (enforced by eslint):

```typescript
import type { Config, Language } from '../models';
import { someFunction } from '../utils';
```

Inline type keyword when mixing value and type imports from the same module:

```typescript
import { createStores, type Stores } from './storage';
```

Type-only re-exports in barrel files:

```typescript
export type * from '../sdk/models';
export type { ProjectStorage } from './models';
```

Import ordering is automatic (external packages first, then internal/relative).
Never import from `**/_modules` (restricted by eslint).

### Naming Conventions

- **Files/directories:** kebab-case (`build-config.ts`, `import-map.ts`)
- **Functions/variables:** camelCase (`createEventsManager`, `getLanguageTitle`)
- **Types/interfaces:** PascalCase (`CompileResult`, `LanguageSpecs`, `EditorOptions`)
- **No enums:** use string union types instead (`type ParserName = 'babel' | 'html' | ...`)
- **Test files:** `<feature>.spec.ts` inside `__tests__/` directories
- Avoid underscore-prefixed names (`no-underscore-dangle` enforced)

### Functions and Exports

- **Arrow function constants** are the dominant style (not `function` declarations)
- **Named exports only** -- no default exports (except i18n locale files)
- **No classes** in application code -- use factory functions returning plain objects
  (`createEventsManager()`, `createNotifications()`, `createToolsPane()`)
- One variable declaration per statement (`one-var: never`)
- Use `prefer-const` and `no-var`
- Use concise arrow bodies where possible (`arrow-body-style` enforced)
- Use object shorthand (`object-shorthand` enforced)

### `/* @__PURE__ */` Annotations

Mark exported pure utility functions for tree-shaking:

```typescript
export const debounce = /* @__PURE__ */ (fn: (...x: any[]) => any, delay: number) => {
  // ...
};
```

Use on side-effect-free functions in utility modules. Not needed on factory functions
that create mutable state or functions with DOM/network side effects.

### Types

- `interface` for object shapes; `type` for unions, mapped types, and function signatures
- Explicit class member accessibility required (`public`, `private`, `protected`)
- Array types: `T[]` for simple, `Array<T>` for complex types
- `any` is permitted (`no-explicit-any` is off)
- Use `for...of` over indexed `for` loops when index is not needed
- Use `as const satisfies` for typed constant objects
- Strict mode with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`

### Error Handling

- Must throw `Error` objects, not literals (`no-throw-literal` enforced)
- Use `getErrorMessage(err)` utility from `utils/` for safe error message extraction
- Silent catch blocks are acceptable for expected failures: `catch { return ''; }`
- Empty catch blocks use a `//` comment: `catch { // }`
- `no-console` is enforced -- use `// eslint-disable-next-line no-console` when needed
- Fetch errors: use `handleFetchError(res)` which rejects on non-ok responses

### Testing

```typescript
import { debounce, encodeHTML } from '..'; // import from barrel file

describe('utils', () => {
  test('debounce', async () => {
    // arrange, act
    expect(num).toBe(1);
  });

  test('encodeHTML', () => {
    expect(encodeHTML('<div>')).toBe('&lt;div&gt;');
  });
});
```

- Use `describe` / `test` (not `it`)
- Tests are co-located in `__tests__/` dirs next to source
- Import from barrel files (parent `index.ts`) when available
- `// @ts-nocheck` is acceptable at top of test files for partial type testing
- Never commit `.only` on tests (`no-only-tests` enforced)

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, etc.
Branch from `develop` (not `main`) for feature work.

### Other Key Rules

- Smart equality: use `===`/`!==` (`eqeqeq: smart`)
- Curly braces required for multi-line blocks only (`curly: multi-line`)
- Guard `for...in` with `hasOwnProperty` check (`guard-for-in`)
- No bitwise operators (`no-bitwise`)
- No `eval` (`no-eval`)
- Max one class per file
- JSDoc alignment/indentation enforced when present (not required on all functions)
- Text strings are exported for internationalization. Run `npm run i18n-export` after adding new user-facing text. See `./docs/docs/contribution/i18n.mdx` for details.
