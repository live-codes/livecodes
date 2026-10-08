# Dart + Flutter in LiveCodes — handover

Scratch file for a fresh session. Delete when done. Written at the point where the package
works standalone and the LiveCodes integration is wired but **never seen running**.

---

## 1. Goal

Add two languages to LiveCodes: **Dart** and **Flutter**. Compile Dart to JavaScript in the
compiler worker (like `go`/GopherJS and `svelte`), and run the compiled JS in the result page so
it has the pad's DOM, HTML and CSS.

## 2. Where things are

| Repo | Path | Branch | State |
| --- | --- | --- | --- |
| Package | `D:\DevWork\live-codes\browser-dart` | `main` | committed, **published** |
| App | `D:\DevWork\live-codes\livecodes` | `dart` | **uncommitted**, typechecks, never run |

Package commits, newest first: `d4a8f6f` (loadRuntime) → `0b80447` (compiler/runner split) →
`1d11450` (2 cross-origin bug fixes) → `8526244` (gzip assets) → `6bf023e` (packaged) →
`e132ef4` (Flutter support).

npm: `@live-codes/dart-wasm`, **0.3.0 is latest and published**. jsDelivr serves it (verified 200,
18,660 B).

---

## 3. THE BLOCKER — start here

**Symptom (user's):** in the LiveCodes demo, the compile worker throws

```
Uncaught (in promise) NetworkError: Failed to execute 'importScripts' on 'WorkerGlobalScope':
The script at 'https://cdn.jsdelivr.net/npm/@live-codes/dart-wasm@0.3.0/dist/dart-wasm.iife.js' failed to load.
```

**What I measured, from the LiveCodes page**, creating a blob worker and `importScripts`-ing each
URL, vs `fetch`-ing the same URL from the page:

| URL | page `fetch` | worker `importScripts` |
| --- | --- | --- |
| `@live-codes/dart-wasm@0.3.0/dist/dart-wasm.iife.js` (jsDelivr) | 200 `application/javascript` | **NetworkError** |
| `@live-codes/dart-wasm@0.2.0/dist/dart-wasm.iife.js` (jsDelivr) | – | **NetworkError** |
| `codemirror@5.65.16/lib/codemirror.js` (jsDelivr) | – | **NetworkError** |
| `codemirror@5.65.16/lib/codemirror.js` (unpkg) | – | **NetworkError** |

And again from **`about:blank`** (no CSP, no LiveCodes) with the unpkg codemirror URL:
**NetworkError**.

**Conclusion:** in the sandbox browser, cross-origin `importScripts` fails for *every* URL from
*every* page, while page `fetch` succeeds. So it is **not the package, not jsDelivr, and not
LiveCodes' CSP**. It looks like an environment/network artifact — the same host produced
`A connection attempt failed … (os error 10060)` repeatedly during the session.

**Therefore: retest in a normal browser before believing anything below about the live behaviour.**
`importScripts` is the single path that could not be exercised, and it is the one the compiler
depends on.

### Two claims I made that are WRONG — do not act on them

- "`liveReload: true` causes a reload loop." Unverified. The compile worker could never load the
  compiler here, so the loop I saw was a symptom of this failure.
- "jsDelivr caught up / the CDN problem went away." Wrong — the failure was present the whole time,
  it just stopped surfacing as a page error.

### If it reproduces on a real browser

`createWorkerFromContent` in `src/livecodes/utils/utils.ts` — check the compile worker's own CSP
(worker CSP is enforced separately from the document's), and the headers LiveCodes' dev server
(`npm start`, port 8080) sends for `/`.

### Workaround that sidesteps `importScripts` entirely

The package's ESM entry is `dist/dart-wasm.mjs`. A **module** worker can `import` it instead of
`importScripts`-ing the IIFE:

```ts
compiler: {
  factory: async () => {
    const { createCompiler } = await import(dartWasmBaseUrl + 'dart-wasm.mjs');
    return createDartCompiler({ createCompiler, engine: 'dart' });
  },
}
```

Untested. Worth trying first if `importScripts` is genuinely blocked.

---

## 4. The package (`@live-codes/dart-wasm`)

Run the Dart team's **client-side** toolchain — the `dartpad` pub package's `web/dart` and
`web/flutter` asset trees, vendored verbatim — so Dart and Flutter compile and run with no server.

### API (`src/`, built to `dist/dart-wasm.mjs` + `dist/dart-wasm.iife.js`, global `DartWasm`)

| Export | What it is |
| --- | --- |
| `createCompiler({ engine, baseUrl })` | worker + a **stub sandbox**; **no DOM**, runs in a Web Worker |
| `compiler.compile(code, { dependencies, pubspec, file, mode })` | → `Program { engine, mode, modules[{name,code,map}], libraryUri, log }` |
| `createRunner({ engine, baseUrl, container \| iframe })` | drives the SDK's `sandbox.js` in a document (own iframe, or one you pass) |
| `loadRuntime({ engine, baseUrl, document })` | **the run half for the current document** — no iframe, no `sandbox.js` |
| `createDartpad({ engine, baseUrl, container })` | compiler + runner wired together (unchanged API) |
| helpers | `ENGINES`, `ENGINE_IDS`, `buildPubspec`, `dependencyLines`, `parseSourceMap` |

`runtime.run(program)` = `loadModule` for each module, then `runMain(libraryUri)`.

**`loadRuntime` is the piece LiveCodes needs** and it works: verified end to end (compile in a
compiler, run in the page, no iframe) — it saw the page's real `document.title` and wrote a div
into it.

### Hard-won findings about the DartPad SDK

- **There is no compile RPC.** The worker registers `createWorkspace`, `workspace/*` and
  `workspace/sandbox/*` only. `workspace/sandbox/run` compiles and then *pushes* the result to a
  sandbox over an internal port (`loadModule`), and returns only `{log}`.
- **The compiler is therefore the sandbox**: `Compiler` connects a `MessageChannel`, hands one end
  to `workspace/connectSandbox`, and answers `loadModule` / `run` / `hotRestart` / … itself. That
  is what makes it DOM-free. (Verified in a `Worker`: `hasDocument === "undefined"`.)
- **A sandbox runs one entrypoint.** `runMain` must not be called twice on one runtime
  (`createDartpad` starts a fresh sandbox per run for this reason).
- **The compiled module is not standalone** — a DDC `ddcLibraryBundle` binding `dartDevEmbedder` /
  `importLibrary` against `dart_sdk.js`. The result page must load `ddc_module_loader.js`,
  `dart_stack_trace_mapper.js`, `dart_sdk.js` (plus `flutter.js`, `flutter_web.js` for Flutter).
- **Source maps work** (dartpad ≥0.7): DDC registers one in a trailing
  `setSourceMap("<module>", '<json>')`. `parseSourceMap` reads it (`sources` are
  `workspace/pad_N/main.dart`). Sync throws from `main()` are *not* mapped; async ones are.
- **Flutter's wrapper**: `flutter` mode compiles `main.dart.flutter-wrapper.dart`, which calls
  `ui_web.bootstrapEngine(runApp: () => entrypoint.main())`. The SDK's sandbox used to drive
  `flutter.js`'s loader around it (`runflutter`); **`runMain` alone may not be enough** — this is
  the most likely reason Flutter will not work first try.
- **Packages**: `pub get` hits pub.dev (needs network) for Dart; Flutter resolves from the
  `/pub-cache` in `sdk.tar` (offline). DDC does **no tree shaking** — `http` pulls all of
  `package:web` (4.6 MB module, 273 sources).

### Assets, size and gzip

`dist/dart` 6.9 MB, `dist/flutter` 37.2 MB — **46.3 MB unpacked**, 42.8 MB tarball. Committed to
git, and `src` + `poc` are in `files`.

Uncompressed they are 265 MB, and **jsDelivr refuses a package over 150 MB** (it fails the whole
package). `sdk.lock.json` lists what ships as `.gz`; `scripts/fetch-sdk.mjs` does the gzipping.
Each is inflated just before use:

| asset | inflated by |
| --- | --- |
| `worker.wasm`, `sdk.tar` | `fetch` shim in the worker (`src/inflate.js`) |
| `dart_sdk.js`, `flutter_web.js` | accessor over `$dartpadSandboxScripts` (the Flutter `sandbox.js` assigns that list unconditionally and reads it once, via `.map`) |
| later DDC modules | wrapper around `$dartLoader.forceLoadScript` |
| the two `.map` files | nothing — inert until devtools asks |

**No SDK file is modified.** `dart_wasi.js`/`ddc_module_loader.js`/`sandbox.js`/`flutter.js` stay raw
precisely because nothing can hook how they load.

Commands: `npm run fetch` (`:dart` for 6.9 MB), `npm run build`, `npm run serve` (port 8138,
PoC at `/poc/`), `npm run check-package`. `npm run build` deliberately does **not** clear `dist/`.

---

## 5. LiveCodes changes — written, typecheck clean, NEVER RUN

`npx tsc --noEmit -p tsconfig.json` passes. Nothing has been executed.

**New files**

```
src/livecodes/languages/dart/index.ts                 re-export
src/livecodes/languages/dart/lang-dart.ts             LanguageSpecs
src/livecodes/languages/dart/lang-dart-compiler.ts    self.createDartCompiler — runs in the compile worker
src/livecodes/languages/dart/lang-dart-runtime.ts     setupDartRuntime(engine) — result page
src/livecodes/languages/dart/lang-dart-script.ts      setupDartRuntime('dart')
src/livecodes/languages/flutter/index.ts
src/livecodes/languages/flutter/lang-flutter.ts       LanguageSpecs, engine 'flutter'
src/livecodes/languages/flutter/lang-flutter-script.ts setupDartRuntime('flutter')
```

**Modified**

| File | Change |
| --- | --- |
| `src/livecodes/vendors.ts` | `dartWasmBaseUrl = getUrl('@live-codes/dart-wasm@0.3.0/dist/')` |
| `src/livecodes/languages/languages.ts` | imports + `dart,` `flutter,` in the compiled-language cluster |
| `src/sdk/models.ts` | `Language` union: `'dart' \| 'dartlang' \| 'flutter'` |
| `scripts/build.js` | `lang-dart-compiler.ts`, `lang-dart-script.ts`, `lang-flutter-script.ts` in `iifeBuild().entryPoints` |

**How it is meant to work**

- `compiler.url` = our IIFE, importScripts'd into the compile worker; `factory` importScripts
  `lang-dart-compiler.js` and returns `createDartCompiler({ engine, assetBaseUrl })`.
- The compiler returns `livecodes.<engine>.run({ libraryUri, mode, modules })` as the compiled
  code, with modules embedded as JSON and `</` escaped.
- `compiler.scripts` loads our IIFE **then** `lang-dart-script.js`; the latter sets
  `livecodes.<engine>.run`, which awaits `DartWasm.loadRuntime` and calls `runtime.run(program)`.
- The compiled code **polls** for `livecodes.dart` before calling it (a hedge against script-order
  races — I never read `result-page.ts` to confirm the ordering guarantee; if it holds, the polling
  is dead weight).

### Suspects, in order

1. **`liveReload: true` on `lang-dart.ts`.** Our runtime cannot re-run `runMain` on the same
   document, and `loadRuntime` caches per `engine@assetBaseUrl`, so a live-reload re-run would
   reuse a spent runtime. Flutter already has `liveReload: false`. Set `false`.
2. **Flutter's engine bootstrap** (see §4). Expect it not to work.
3. **`monacoLanguagesBaseUrl + 'dart.js'`** and **`codemirror-lang-clike.js`'s `.dart`** are
   unverified — both packages are CDN-only, not in `node_modules`. If Dart is not in the clike
   bundle it needs its own module, like `java` has (`codemirror-lang-java.js`).
4. Whether `compiler.scripts` are guaranteed to execute before the compiled script.

---

## 6. Remaining checklist (`docs/docs/contribution/adding-languages.mdx`)

Untouched: starter templates (`src/livecodes/templates/starter/{dart,flutter}-starter.ts` +
`starter/index.ts` + `docs/src/components/TemplateList.tsx` + `UI/command-menu-actions.ts` +
`storybook/_stories/EmbedOptions/template.ts`), `html/language-info.html` +
`i18n/locales/*/language-info.ts`, `i18n/locales/*/translation.ts` (`templates.starter`),
`functions/vendors/templates.js`, `server/php/inc/starter-templates.json`, e2e tests
(`e2e/specs/starter.spec.ts` — `swift-wasm Starter` is the model), `docs/docs/languages/{dart,flutter}.mdx`
(`go-wasm.mdx` is the model; `docs/sidebars.ts` is auto-generated), `docs/src/components/LanguageSliders.tsx`
(script list, after `d-wasm`), `vendor-licenses.md` (Dart + Flutter are BSD-3-Clause),
`README.md` badge 119 → 121.

---

## 7. Environment gotchas

- **`NODE_ENV=production` is set**, so `npm install` skips devDependencies silently. Use
  `npm install --include=dev` (needed for esbuild in the package repo).
- The sandbox browser (agent-browser) is slow to launch and **times out on the first command of a
  session**; retry. It also **cannot `importScripts` cross-origin** (§3), and hit `os error 10060`
  repeatedly.
- Both servers I used are stopped: package PoC on **8138** (`node scripts/serve.mjs` in
  `browser-dart`), LiveCodes demo on **8080**.
- `read_file`/`write_file` work in the sibling `livecodes` repo even though it is outside the
  workspace root.

## 8. How to verify, in order

1. `cd D:\DevWork\live-codes\browser-dart && node scripts/serve.mjs` → `http://localhost:8138/poc/`.
   The PoC loads our IIFE with a plain `<script>` and runs Dart and Flutter. **This works** and is
   independent of LiveCodes' worker setup. Use it to sanity-check the package.
2. In `livecodes`: `npm start`, then load a Dart pad. Watch the console for the compile worker.
   If `importScripts` succeeds there, the integration can finally be judged.
3. Flutter last.
