# LiveCodes — Skill Spec

LiveCodes is a feature-rich, open-source, client-side code playground that runs in the browser. It supports 90+ languages/frameworks, provides powerful SDK for embedding, and requires no server or build step.

## Domains

| Domain                     | Description                                                                        | Skills                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| SDK and Embedding          | Creating, configuring, and communicating with embedded playgrounds                 | sdk-embedding, sdk-methods, framework-wrappers, headless-mode |
| Configuration              | Configuring playground behavior through config objects and query params            | configuration, display-modes                                  |
| Languages and Compilation  | Working with 90+ supported languages, compilers, processors, and module resolution | language-support, module-resolution, testing                  |
| Integration and Deployment | Integrating with documentation sites, frameworks, and self-hosting                 | markdown-integration, self-hosting, import-export             |

## Skill Inventory

| Skill                | Type        | Domain        | What it covers                                                               | Failure modes |
| -------------------- | ----------- | ------------- | ---------------------------------------------------------------------------- | ------------- |
| livecodes            | core        | -             | Overview, quick start, decision tree, key concepts, minimal examples         | 3             |
| sdk-embedding        | core        | sdk-embedding | createPlayground, getPlaygroundUrl, compress, decompress, EmbedOptions, container setup, loading modes, appUrl | 4             |
| sdk-methods          | core        | sdk-embedding | run, getCode, setConfig, watch, runTests, format, getShareUrl, show, destroy | 3             |
| framework-wrappers   | framework   | sdk-embedding | React, Vue, Svelte, Solid, Preact, Web Components SDK usage                  | 2             |
| headless-mode        | core        | sdk-embedding | Creating playgrounds without UI, load() requirement, compiled output         | 1             |
| configuration        | core        | configuration | Config object, EmbedOptions, query params, editor/app/user config            | 3             |
| display-modes        | core        | configuration | full, focus, simple, lite, editor, codeblock, result modes                   | 0             |
| language-support     | core        | languages     | Language names/aliases, compilers, CSS processors, WASM languages            | 2             |
| module-resolution    | core        | languages     | npm/deno/jsr/GitHub imports, CDN providers, import maps, #nobundle           | 3             |
| testing              | core        | languages     | Jest, Testing Library, watch mode, running tests programmatically            | 0             |
| markdown-integration | composition | integration   | remark-livecodes, markdown-it-livecodes, Docusaurus, Astro, VitePress        | 0             |
| self-hosting         | composition | integration   | Deploying to static servers, Docker, BASE_URL, SDK appUrl config             | 1             |
| gh-action            | composition | integration   | Preview in LiveCodes GitHub Action, PR comments, workflow setup              | 3             |
| import-export        | core        | configuration | GitHub/GitLab imports, URL imports, DOM imports, export formats              | 0             |
| getting-started      | lifecycle   | -             | Quick start for standalone, embedding, and self-hosting                      | 0             |

## Failure Mode Inventory

### livecodes (3 failure modes)

| #   | Mistake                                  | Priority | Source                       | Cross-skill   |
| --- | ---------------------------------------- | -------- | ---------------------------- | ------------- |
| 1   | SDK methods not awaited                  | HIGH     | Documentation: sdk/js-ts.mdx | sdk-methods   |
| 2   | Container element not found throws error | HIGH     | Source code: sdk/index.ts    | sdk-embedding |
| 3   | Config vs EmbedOptions confusion         | HIGH     | Documentation: sdk/js-ts.mdx | configuration |

### sdk-embedding (4 failure modes)

| #   | Mistake                                          | Priority | Source                            | Cross-skill   |
| --- | ------------------------------------------------ | -------- | --------------------------------- | ------------- |
| 1   | Container element not found throws error         | HIGH     | Source code: sdk/index.ts         | sdk-methods   |
| 2   | Invalid appUrl throws error                      | MEDIUM   | Source code: sdk/index.ts         | sdk-embedding |
| 3   | Calling SDK methods after destroy() throws error | HIGH     | Source code: sdk/index.ts         | sdk-methods   |
| 4   | SDK method timeout after 60 seconds              | MEDIUM   | Source code: API_TIMEOUT constant | sdk-methods   |

### sdk-methods (3 failure modes)

| #   | Mistake                                            | Priority | Source                       | Cross-skill |
| --- | -------------------------------------------------- | -------- | ---------------------------- | ----------- |
| 1   | Not awaiting async SDK methods                     | HIGH     | Documentation: sdk/js-ts.mdx | sdk-methods |
| 2   | watch() callback receives undefined/malformed data | MEDIUM   | Documentation: sdk/js-ts.mdx | sdk-methods |
| 3   | Using deprecated onChange instead of watch         | LOW      | Source code: sdk/index.ts    | sdk-methods |

### configuration (3 failure modes)

| #   | Mistake                                                    | Priority | Source                               | Cross-skill      |
| --- | ---------------------------------------------------------- | -------- | ------------------------------------ | ---------------- |
| 1   | Confusion between Config and EmbedOptions                  | HIGH     | Documentation: sdk/js-ts.mdx         | sdk-embedding    |
| 2   | Overriding Config with params creates precedence confusion | MEDIUM   | Documentation: sdk/js-ts.mdx         | configuration    |
| 3   | Incorrect editor language name or alias                    | MEDIUM   | Source code: models.ts Language type | language-support |

### framework-wrappers (2 failure modes)

| #   | Mistake                                           | Priority | Source                                        | Cross-skill        |
| --- | ------------------------------------------------- | -------- | --------------------------------------------- | ------------------ |
| 1   | Not using sdkReady callback to access SDK methods | HIGH     | Documentation: sdk/react.mdx, sdk/vue.mdx     | sdk-methods        |
| 2   | Changing non-config props causes full reload      | MEDIUM   | Documentation: sdk/react.mdx - Reactive Props | framework-wrappers |

### headless-mode (1 failure mode)

| #   | Mistake                                                  | Priority | Source                          | Cross-skill |
| --- | -------------------------------------------------------- | -------- | ------------------------------- | ----------- |
| 1   | Not calling load() before other methods in headless mode | HIGH     | Documentation: sdk/headless.mdx | sdk-methods |

### language-support (2 failure modes)

| #   | Mistake                               | Priority | Source                               | Cross-skill      |
| --- | ------------------------------------- | -------- | ------------------------------------ | ---------------- |
| 1   | CSS processors applied in wrong order | MEDIUM   | Documentation: features/css.mdx      | language-support |
| 2   | WASM language first load is slow      | LOW      | Documentation: languages/\*-wasm.mdx | language-support |

### module-resolution (3 failure modes)

| #   | Mistake                                                    | Priority | Source                               | Cross-skill       |
| --- | ---------------------------------------------------------- | -------- | ------------------------------------ | ----------------- |
| 1   | Importing same module from different CDNs causes conflicts | HIGH     | Documentation: module-resolution.mdx | module-resolution |
| 2   | CommonJS require not converted to ESM properly             | LOW      | Documentation: module-resolution.mdx | module-resolution |
| 3   | Not using #nobundle for pre-bundled imports                | LOW      | Documentation: module-resolution.mdx | module-resolution |

### self-hosting (1 failure mode)

| #   | Mistake                                           | Priority | Source                                   | Cross-skill  |
| --- | ------------------------------------------------- | -------- | ---------------------------------------- | ------------ |
| 1   | Not configuring BASE_URL for subdirectory hosting | MEDIUM   | Documentation: features/self-hosting.mdx | self-hosting |

### gh-action (3 failure modes)

| #   | Mistake                              | Priority | Source                             | Cross-skill |
| --- | ------------------------------------ | -------- | ---------------------------------- | ----------- |
| 1   | Workflow files not on default branch | HIGH     | GitHub Actions: workflow_run event | gh-action   |
| 2   | Missing permissions for PR comments  | MEDIUM   | GitHub Actions: permissions        | gh-action   |
| 3   | Using data URLs for large files      | MEDIUM   | Action: dpaste.com limits          | gh-action   |

## Tensions

| Tension                                            | Skills                              | Agent implication                                                                               |
| -------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| SDK embedding vs Markdown integration              | sdk-embedding, markdown-integration | Agents may mix up createPlayground with markdown-it-livecodes; need to clarify when to use each |
| Configuration complexity vs Quick start simplicity | configuration, getting-started      | Agents should start with templates/params, then graduate to full Config objects                 |
| Self-hosted appUrl vs CDN-hosted app               | self-hosting, module-resolution     | App URL affects share URLs, short URLs, and module resolution behavior                          |

## Cross-References

| From               | To               | Reason                                                                   |
| ------------------ | ---------------- | ------------------------------------------------------------------------ |
| sdk-embedding      | sdk-methods      | Creating a playground is prerequisite to using SDK methods               |
| sdk-methods        | configuration    | setConfig and getConfig require understanding Config object structure    |
| framework-wrappers | sdk-methods      | sdkReady callback provides access to SDK methods in framework components |
| module-resolution  | language-support | CDN resolution behaves differently for different language types          |
| headless-mode      | sdk-methods      | Headless mode relies entirely on SDK methods; no UI available            |
| getting-started    | sdk-embedding    | Quick start leads directly to embedding basics                           |
| display-modes      | configuration    | Mode is a config option; understand alongside other config               |

## Subsystems & Reference Candidates

| Skill             | Subsystems                                             | Reference candidates                            |
| ----------------- | ------------------------------------------------------ | ----------------------------------------------- |
| configuration     | Content Config, Editor Config, App Config, User Config | —                                               |
| language-support  | —                                                      | Language aliases (90+), Processor configuration |
| sdk-methods       | —                                                      | Method signatures (10+ SDK methods)             |
| module-resolution | —                                                      | CDN providers (10+), Import map format          |

## Remaining Gaps

| Skill              | Question                                                                     | Status |
| ------------------ | ---------------------------------------------------------------------------- | ------ |
| sdk-methods        | What are the most common SDK method errors users encounter?                  | open   |
| language-support   | Are there language-specific quirks that frequently confuse users?            | open   |
| framework-wrappers | Do any frameworks have specific reactivity or lifecycle issues with the SDK? | open   |

## Recommended Skill File Structure

- **Core skills:** sdk-embedding, sdk-methods, configuration, language-support, module-resolution, testing
- **Framework skills:** framework-wrappers
- **Lifecycle skills:** getting-started
- **Composition skills:** markdown-integration, self-hosting, import-export
- **Specialized skills:** headless-mode, display-modes
- **Reference candidates needed:** Languages reference (90+ language names, aliases, extensions), CDN Providers reference

## Composition Opportunities

| Library        | Integration points           | Composition skill needed |
| -------------- | ---------------------------- | ------------------------ |
| React          | React SDK wrapper component  | framework-wrappers       |
| Vue            | Vue SDK wrapper component    | framework-wrappers       |
| Svelte         | Svelte SDK wrapper component | framework-wrappers       |
| Solid          | Solid SDK wrapper component  | framework-wrappers       |
| Preact         | Preact SDK wrapper component | framework-wrappers       |
| Docusaurus     | remark-livecodes plugin      | markdown-integration     |
| Astro          | remark-livecodes plugin      | markdown-integration     |
| VitePress      | markdown-it-livecodes plugin | markdown-integration     |
| Next.js        | remark-livecodes plugin      | markdown-integration     |
| Storybook      | remark-livecodes plugin      | markdown-integration     |
| react-markdown | remark-livecodes plugin      | markdown-integration     |
