# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

---

## [v48](https://github.com/live-codes/livecodes/compare/v47...v48) (2026-02-08)

### Features

- **Templates:** add search functionality for user templates ([ef91608](https://github.com/live-codes/livecodes/commit/ef91608380bfa1273a8454a5a39a2d9787e1b57f))
- **Compilers:** add minizinc language support ([f3476d4](https://github.com/live-codes/livecodes/commit/f3476d4ad16c8c7ee36a4b5647a7b0d641055b95))
- **Compilers:** upgrade svelte to v5.39.12 ([43f99c2](https://github.com/live-codes/livecodes/commit/43f99c29dcc5a663a7181cd0e053c8cfef107475))
- **Compilers:** Update typescript to v5.9.3 ([d1181b8](https://github.com/live-codes/livecodes/pull/911/commits/d1181b8c6e52fbe7fcab56e78198f234e706b86b))
- **Compilers:** Update Pyodide to 0.29.0 ([079fbb0](https://github.com/live-codes/livecodes/pull/912/commits/079fbb0ec90afb154f99b6bc4772e1949c0d082f))
- **Compilers:** Updated language compilers for BBob, Jinja, MDX, React, React Native, Solid, Vento, Vue. ([619edf7](https://github.com/live-codes/livecodes/pull/914/commits/619edf786abb4cf17780615151072e729e23e50d))
- **Compilers:** Update Ruby Wasm to v2.7.2 which provides Ruby v3.4. ([57166be](https://github.com/live-codes/livecodes/pull/897/commits/57166be6f803508e213d46b263ec408418c6810c))
- **docs:** add JavaScript language documentation ([2148b87](https://github.com/live-codes/livecodes/commit/2148b87346309207291e45c66da34b1e88931cb9))
- **docs:** add Astro language documentation ([8022516](https://github.com/live-codes/livecodes/pull/905/commits/80225162f249ef70dca86b95f9867d45f465a151))
- **docs:** add tutorials section to documentation ([d8b9639](https://github.com/live-codes/livecodes/pull/908/commits/d8b9639777f37d6737d1052f987a9bee15570788))
- **i18n:** add Bengali, Indonesian and Dutch ([22adf4d](https://github.com/live-codes/livecodes/commit/22adf4ddbf18e0e4b5b9331ed908f01962202feb))
- **i18n:** Add Turkish translation ([5130cde](https://github.com/live-codes/livecodes/commit/5130cde6200dd501cac0f87eecaa5eb32aa9e7fc))
- **services:** serve local sandbox in dev ([2cbf01c](https://github.com/live-codes/livecodes/commit/2cbf01c635ae0e9640907dc8c330e690d0ff4dc4))

### Bug Fixes

- **App:** fix selecting default editor in editor settings ([2349702](https://github.com/live-codes/livecodes/commit/2349702a2edc8c31f685e63531c10e7f6d7fb110))
- **CommandMenu:** do not open command menu with Ctrl+Shift+K ([7cbb103](https://github.com/live-codes/livecodes/commit/7cbb103e7a5b74a02bf06fa1a1eb0458e9a1e907))
- **Editor:** remove AI code assistant ([cf2734d](https://github.com/live-codes/livecodes/commit/cf2734d1800c3e208eaf4531710822cbf3c6b1c9))
- **Result:** prevent frequent rerenders ([43b1f62](https://github.com/live-codes/livecodes/commit/43b1f62651ce133ce5bb82c83b5628d0c7c0b86c))

### Credits

Significant contributions and suggestions were made by:

@a0m0rajab , @BassemHalim , @HossamSaberr , @m2y11138 , @ahmed-atiah , @iamAmer, @nhussein2026 , @mtantawy , @sharno , @TutTrue

Thank you ❤️

---

## [sdk-v0.13.0](https://github.com/live-codes/livecodes/compare/v47...sdk-v0.13.0) (2026-02-08)

### Highlights for this release

- Add `minizinc` to `Language` (Minizinc language support).
- Add `bn`, `nl`, `id` and `tr` to `AppLanguage` (Bengali, Dutch, Indonesian and Turkish translations).
- Remove `enableAI` config option (see [#937](https://github.com/live-codes/livecodes/pull/937))

---

## [v47](https://github.com/live-codes/livecodes/compare/v46...v47) (2025-10-04)

### Highlights for this release

- The main feature in this release is adding a Docker setup for self-hosting LiveCodes with implementations for server-side features available in the [hosted app](https://livecodes.io), e.g. automatic HTTPS, Open Graph meta tags, oEmbed, custom headers, short-URL share, broadcast server, separate origin sandbox to run code, custom 404 page, etc. See [docs](https://livecodes.io/docs/advanced/docker) for more details.
- This release also adds support for Go language using [Yaegi](https://github.com/traefik/yaegi) compiled to WASM, and updates `python-wasm` to use Pyodide v0.28.3 (running Python 3.13.2).
- Code can now be [imported](https://livecodes.io/docs/features/import) from images using OCR.
- Unpublished npm packages can be imported from pkg.pr.new. See [docs](https://livecodes.io/docs/features/module-resolution#pkgprnew) for more details.
- Compiler errors are now shown in the integrated console.
- Added Persian language support.

In addition to many improvements and bug fixes.

### Features

- **Docs:** remove links to vercel ([8662daa](https://github.com/live-codes/livecodes/pull/884/commits/8662daa85bc24bf5b4f91c42ceec7bf3756a9b5c))
- **Compilers:** add support for Go using Yaegi compiled to WASM ([422c649](https://github.com/live-codes/livecodes/commit/422c6495ae9fe853592be568c1d532b224c65f0e))
- **Compilers:** update python-wasm to use Pyodide v0.28.3 ([4f99d6c](https://github.com/live-codes/livecodes/commit/4f99d6c2795593a4b8f9fdefeceb9408eb160483))
- **Code-to-Image:** add share url to png meta data ([58b2f26](https://github.com/live-codes/livecodes/commit/58b2f2668f895d2bdbd2be4e73fdea1f93acd332))
- **Compilers:** show compiler error messages in console ([dd3514a](https://github.com/live-codes/livecodes/commit/dd3514a31d7a6a0bb213b849c935ea000be42b82))
- **Config:** allow setting customSettings in query params ([a15492a](https://github.com/live-codes/livecodes/commit/a15492acef77bd0cc5a67c22e3d18166cc39ba54))
- **Config:** set config objects in query params ([2532f23](https://github.com/live-codes/livecodes/commit/2532f23a39a8a6389c343c7c8c3ec75c7c41a9e9))
- **i18n:** add Persian language ([940ba28](https://github.com/live-codes/livecodes/commit/940ba280649e95dbc09bf03bbfca22a5c0d80a8b))
- **Import:** allow importing code from images (OCR) ([7347299](https://github.com/live-codes/livecodes/commit/73472995e4d99cae7321a17fd79627b3485771e5))
- **Import:** extract `htmlAttrs` ([2900706](https://github.com/live-codes/livecodes/commit/290070644828453410551e2f16d4a0fbde162eae))
- **Modules:** import unpublished modules under development from pkg.pr.new ([2cd50ea](https://github.com/live-codes/livecodes/commit/2cd50eab069acb1eff5e1505a7afbb1233dc7aee))
- **self-hosting:** add broadcast server to self-host ([865e1f3](https://github.com/live-codes/livecodes/commit/865e1f31d9f416f1dd91653d9d7fba8e2117edf9))
- **self-hosting:** custom log url ([31159ea](https://github.com/live-codes/livecodes/commit/31159eacdf7e32c36c5bf0b3c22d386996e88d31))
- **self-hosting:** docker continuous deployment ([c3429f6](https://github.com/live-codes/livecodes/commit/c3429f6067931d4496a935cee138219bfacd403b))
- **self-hosting:** self-host share service ([1759b84](https://github.com/live-codes/livecodes/commit/1759b84be38331e93b2963f38b4896fec1783102))
- **UI:** show a mark when project info fields (`head` or `htmlAttrs`) are modified ([4a5917e](https://github.com/live-codes/livecodes/commit/4a5917e476e1bd1f8f06d192f8ac0e31c4edce43))
- **UI:** show loading notification when importing from UI ([cd056bb](https://github.com/live-codes/livecodes/commit/cd056bb4a6e16ac29fc9115294e0ccb76ea10361))

### Bug Fixes

- **App:** fix persistent loading message in compiled code viewer ([3076b59](https://github.com/live-codes/livecodes/commit/3076b5985d1ac7f6df7a2a06398f7a1737e19d98))
- **CommandMenu:** fix selecting languages in command menu ([43339a8](https://github.com/live-codes/livecodes/commit/43339a8d5f8e8f89a913cc61b901e8b18c6c7b8d))
- **Compilers:** do not add Tailwind compiled CSS in code blocks ([5eca80e](https://github.com/live-codes/livecodes/commit/5eca80e38c4d025c2226ab30a434cc0d0bea80cd))
- **Config:** fix changing editor config from SDK ([b717efc](https://github.com/live-codes/livecodes/commit/b717efcd10e2c3d7af3a2edf6dfd2fac373f0424))
- **Config:** fix loading user config ([533e221](https://github.com/live-codes/livecodes/commit/533e2217dd6dc5c3d0a70907478d1150bf044c6f))
- **Config:** fix updating editor config ([1f0292c](https://github.com/live-codes/livecodes/commit/1f0292c199eeb338b797ba84d6f4f195e8bbcbae))
- **docs:** correct broken links due to .mdx/.md mismatch ([5395c81](https://github.com/live-codes/livecodes/commit/5395c81d83c786d2f2fcd67f8d661945717570d9))
- **Editor:** do not show lineNumbers in console editor ([f077639](https://github.com/live-codes/livecodes/commit/f077639c0420a7eb4e4ac5ad1ae5b90547b92a9e))
- **i18n:** fix formatting / jsdoc & use unknown instead of any ([a6f5a7a](https://github.com/live-codes/livecodes/commit/a6f5a7aa0374550522bad9f747d0ca0d3c217d63))
- **i18n:** no need for extra type checking workflow, revert [#718](https://github.com/live-codes/livecodes/issues/718) ([5bd4181](https://github.com/live-codes/livecodes/commit/5bd4181275f4173c2596db5d3634d19291cbdc59))
- **i18n:** optimize i18n types performance ([2a17e3c](https://github.com/live-codes/livecodes/commit/2a17e3c662ab800d7c403cbf6bbd6cdde10567ac))
- **Result:** allow importing stylesheets in markup editor ([76a3e1c](https://github.com/live-codes/livecodes/commit/76a3e1ce4682563020edfd3f1f6ef9beb69a584e))
- **Result:** avoid rerenders on firefox (sandbox v9) ([245cdc7](https://github.com/live-codes/livecodes/commit/245cdc719933ba3db49b94401390b5e8379b4ef0))

### Credits

- @abight-devsanctuary added docker support
- @Muhammad-Ayman added support for go-wasm
- @zyf722 improved type checking for i18n files
- @sbelluzzo updated python-wasm
- @Red007Master and @seifsapagh added fixes to docs
- @Yusyuriv reported multiple re-renders in Firefox
- @MhmoudAlim , @mtantawy , @mrgb7, @MariamElansary and @aabouzaid suggested features and reviewed PRs

Thank you ❤️

---

## [sdk-v0.12.0](https://github.com/live-codes/livecodes/compare/sdk-v0.11.1...sdk-v0.12.0) (2025-10-04)

### Features

- **SDK:** allow return value of `getShareUrl()` to be used as `appUrl` ([1294cb9](https://github.com/live-codes/livecodes/commit/1294cb97a82c5c01ee6685e2c7acbdfc37f61e12))

### Bug Fixes

- **SDK:** clean-up SDK event handlers ([3c1184f](https://github.com/live-codes/livecodes/commit/3c1184f9555e609ab757ab66ba4162a2f33e4f7d))
- **SDK:** fix `height` in Vue SDK ([79b4a70](https://github.com/live-codes/livecodes/commit/79b4a70629c34497bc5cff78e0acacc90e0d5e00))
- **SDK:** force destroy playground even if stuck (e.g. in infinite loop) ([c44fe3e](https://github.com/live-codes/livecodes/commit/c44fe3ecaf069cccb7711028664bcd89a79ef824))

### Credits

- @felixhuttmann added force destroying playground even if stuck

Thank you ❤️

---

## [sdk-v0.11.1](https://github.com/live-codes/livecodes/compare/v46...sdk-v0.11.1) (2025-05-24)

### Bug Fixes

- **SDK:** fix sdk build (sdkVersion) ([c383d26](https://github.com/live-codes/livecodes/commit/c383d26b8358a374de1ebe7073d2a38a27b7ede1))

---

## [v46](https://github.com/live-codes/livecodes/compare/v45...v46) (2025-05-24)

### Highlights for this release

- This release refactors how LiveCodes loads the projects which makes it more performant, more consistent and supports loading much bigger projects.
- Support for Jinja templating language was added.
- Upgraded [React Compiler to RC](https://react.dev/blog/2025/04/21/react-compiler-rc).
- Added docs for the new [Markdown-to-LiveCodes](https://livecodes.io/docs/markdown-to-livecodes) feature.
- Allowed SDK to update editor content only with `setConfig` without reloading the project or editor language. This is useful for streaming content (e.g. from LLM). Demo: https://livecodes.io/?x=id/vya9n6jbuvq&mode=result

### Features

- **Compilers:** add Jinja template support ([9e15076](https://github.com/live-codes/livecodes/commit/9e15076da00c23250c9db90128ac3681e4353aac))
- encode minimal data in url search params and the rest in hash params to allow for longer urls while still maintaining server analytics feature ([80efa44](https://github.com/live-codes/livecodes/commit/80efa446f821ca037369053f8f51a821a50bdd68))
- **SDK:** allow sdk `setConfig` to just update editor content ([282824c](https://github.com/live-codes/livecodes/commit/282824c51d8d49beff16e3bed68aa51333da9f8f))
- **SDK:** communicate sdk and app versions ([63e7db2](https://github.com/live-codes/livecodes/commit/63e7db2f9b4ce3ea1bec89d4461352ce3992166b))
- sort imports with prettier ([7f1145c](https://github.com/live-codes/livecodes/commit/7f1145c7e5d67b57462826c8f6473c06d956bb80))

### Bug Fixes

- **Compilers:** compile asciidoc as standalone ([7ae4220](https://github.com/live-codes/livecodes/commit/7ae4220f7a4e6f45875e78c8331d409449e85612))
- **Config:** fix decoding params ([3494e58](https://github.com/live-codes/livecodes/commit/3494e587d14253284388e058a394b2492a82f252))
- **Editor:** fix loading vue & custom languages in monaco ([b7bbb80](https://github.com/live-codes/livecodes/commit/b7bbb80356b8bc019eb66cd8951b9bc91c62f122))
- fixed self-hosted deployments to GitHub Pages ([9859940](https://github.com/live-codes/livecodes/commit/9859940cd2348858f8f176deefa344942ed1e151))

### Credits

- @BassemHalim refactored the app and SDK to allow for the new project loading feature.
- @tarekwfa0110 added HTML language docs.
- @ahmadalfy , @zyf722 and @Seth0x41 reviewed the Markdown-to-LiveCodes feature.

Thank you ❤️

---

## [sdk-v0.11.0](https://github.com/live-codes/livecodes/compare/sdk-v0.10.0...sdk-v0.11.0) (2025-05-24)

- This release enables the SDK to create playgrounds and generate URLs for much bigger projects, by encoding data in URL hash instead of query params, while maintaining backwards compatibility.

- Adds support for Jinja templating engine.

### Credits

- @BassemHalim did a lot of work on this release. Thank you ❤️

---

## [v45](https://github.com/live-codes/livecodes/compare/sdk-v0.10.0...v45) (2025-04-25)

### Highlights for this release

- This release adds support for [csharp-wasm](https://livecodes.io/docs/languages/csharp-wasm) and [java](https://livecodes.io/docs/languages/java) languages.
- The SDK now compresses and encodes SDK params.
- In addition to some UI changes and bug fixes.

### Credits

- @Seth0x41 added [csharp-wasm](https://github.com/live-codes/livecodes/pull/798) and [java](https://github.com/live-codes/livecodes/pull/794) support

Thank you ❤️

### Features

- add Csharp-Wasm support ([63164e8](https://github.com/live-codes/livecodes/commit/63164e8eda6336434e2240e06f0b7fecc3cef4d8))
- add Java language support with DoppioJVM ([0ecb6b3](https://github.com/live-codes/livecodes/commit/0ecb6b378b1f302794b32b2991015013936f31b3))
- **UI:** make the script language menu wider with more columns ([2b3c2eb](https://github.com/live-codes/livecodes/commit/2b3c2eba59c43d93342a094d6e68041606367712))

### Bug Fixes

- **Editor:** fix Vue editor TS compiler options ([23b55ef](https://github.com/live-codes/livecodes/commit/23b55ef61f911b69fa056d6f9012ff0a3ddcdf07))
- **Result:** fix clearing styles ([c5957ee](https://github.com/live-codes/livecodes/commit/c5957ee699814c7d0f23edd2fa4bde1a5696fd7b))
- **ToolsPane:** fix console: copy errors, added string to variable names ([d858e4f](https://github.com/live-codes/livecodes/commit/d858e4f350766c1d653bd466d4f09f06de163d85))
- **UI:** use notifications for loading message ([c5c49a2](https://github.com/live-codes/livecodes/commit/c5c49a2441e12ae8a4bd2e92ac2e1b9abf232792))

---

## [sdk-v0.10.0](https://github.com/live-codes/livecodes/compare/sdk-v0.9.1...sdk-v0.10.0) (2025-04-25)

- encode & compress sdk params ([b49c1cb](https://github.com/live-codes/livecodes/commit/b49c1cb13642ce95f8d5a01214891b01261fc067))
- add `csharp-wasm` language ([63164e8](https://github.com/live-codes/livecodes/commit/63164e8eda6336434e2240e06f0b7fecc3cef4d8))
- add `java` language ([0ecb6b3](https://github.com/live-codes/livecodes/commit/0ecb6b378b1f302794b32b2991015013936f31b3))

---

## [v44](https://github.com/live-codes/livecodes/compare/v43...v44) (2025-04-10)

### Highlights for this release

This release adds multiple new features and fixes, including:

- Significant improvements in editor support for Vue (e.g. auto-complete, hover info, `defineProps` can now infer props from locally declared types, and more).
- Vue and Svelte single file components can import (and recursively compile) other components encoded as data URLs ([docs](https://livecodes.io/docs/languages/vue#importing-data-urls)).
- CSS processors (e.g. Tailwind CSS) can now process style blocks (e.g. `@apply`) in Vue and Svelete SFCs.
- ESM imports for full, relative and data URLs no longer show typescript error.
- React native now uses React v19 (see [starter template](https://livecodes.io/?template=react-native)).
- A new config option [`foldRegions`](https://livecodes.io/docs/configuration/configuration-object#foldregions) was added. When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.
- [Editor configurations](https://livecodes.io/docs/configuration/configuration-object#markup) (`config.markup`, `config.style`, `config.script`) have a new property `foldLines` that accepts an array of objects (e.g. `[{ from: 1, to: 5 }]`) that indicates which lines to fold. This can be useful for less relevant code in embedded playgrounds.
- [`config.editor`](https://livecodes.io/docs/configuration/configuration-object#editor) now supports the value `"auto"`, which indicates that Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings. This can be useful in `"simple"` mode.
- The loading screen now uses an animated logo.
- A new command menu action was added for selecting editor theme.
- Various UI improvements and fixes.

### Credits

- @FathyMuhamed added the [animated loading logo](https://github.com/live-codes/livecodes/pull/768) and [command menu action](https://github.com/live-codes/livecodes/pull/775) for editor theme.
- @logaretm and @ismail9k guided [Vue improvements](https://github.com/live-codes/livecodes/issues/757).

Thank you ❤️

### Features

- **Command Menu:** add editor theme option with translations ([314b97c](https://github.com/live-codes/livecodes/commit/314b97cfba7c1f04f328a68c93aa85a8b5dba829))
- **CommandMenu:** add editor theme action to command menu ([88b67e3](https://github.com/live-codes/livecodes/commit/88b67e332978b422d03076dd4dc532e6ff663525))
- **Compilers:** allow SFC to import other SFCs encoded as data URLs ([11cef05](https://github.com/live-codes/livecodes/commit/11cef058daaa907d6bb61cf1873952dd9c934e01))
- **Compilers:** run processors on SFC blocks ([7208924](https://github.com/live-codes/livecodes/commit/7208924d01130c9babbdf264fbae3612a796fa05))
- **Compilers:** vue, infer props from types ([af91b7d](https://github.com/live-codes/livecodes/commit/af91b7d2b8151b61faeaf65b337026d63c0702b6))
- **Config:** add the value `"auto"` to `config.editor` options ([0f62de8](https://github.com/live-codes/livecodes/commit/0f62de8891ca221c035a2a0e8e3cbfcc9133f2a0))
- **Editor:** add monaco-volar to improve Vue editor experience ([badaf6a](https://github.com/live-codes/livecodes/commit/badaf6a9288b8b4a8eb2eeee1a5258e780925574))
- **Editor:** allow folding lines and regions ([984c913](https://github.com/live-codes/livecodes/commit/984c913bcebcc8d0a2f872df1076311d039e65a1))
- **Loading:** replace logo with loading animation SVG in index.html ([d8254f4](https://github.com/live-codes/livecodes/commit/d8254f4aaa29463b6a5de2a1b77e75c50d1e13ff))
- **Templates:** edit Vue template to infer props from types ([9269d30](https://github.com/live-codes/livecodes/commit/9269d303853367ba2e4e8e6071e59c490e1e3b82))
- **Translations:** add editor theme translation to command menu ([04fb14a](https://github.com/live-codes/livecodes/commit/04fb14ae82f61c14d52f8d1f2e243c8a57aab190))
- **UI:** pulsating loading logo ([9c62d48](https://github.com/live-codes/livecodes/commit/9c62d48e2b25afc085aba659ef8c0f1d9c8c561f))

### Bug Fixes

- **Build:** fix incrementing release version ([b12c8f9](https://github.com/live-codes/livecodes/commit/b12c8f959c9883c3c0d6445d9a1f7b83fc81a12a))
- **Compilers:** fix react native (support react v19) ([ed3a533](https://github.com/live-codes/livecodes/commit/ed3a533db1854dc6e928fd76df509b433c8f946c))
- **Editor:** fix TS errors for data url imports ([60d9563](https://github.com/live-codes/livecodes/commit/60d9563631a2e66b93b68f93c75cf2424dfb04b8))
- **Editor:** fix TS errors for http & relative imports ([f6943cd](https://github.com/live-codes/livecodes/commit/f6943cd87cd905621a78ccaa80b26ce059138a1a))
- **UI:** fix gutter overflow ([9c48c05](https://github.com/live-codes/livecodes/commit/9c48c05a18c0d2b2de775a7e4d1b9aa3791ea41a))
- **UI:** fix hidden editor horizontal scroll bar ([f368f1b](https://github.com/live-codes/livecodes/commit/f368f1bed3ed974c1fffdde82a8e6f1c3d509d68))
- **UI:** fix modal focus in inputs ([92f9416](https://github.com/live-codes/livecodes/commit/92f94162d04bf6c3c02209752a999f02e764fab1))

---

## [sdk-v0.9.1](https://github.com/live-codes/livecodes/compare/v43...sdk-v0.9.1) (2025-04-10)

### Features

- **Editor:** allow folding lines and regions ([984c913](https://github.com/live-codes/livecodes/commit/984c913bcebcc8d0a2f872df1076311d039e65a1))

  A new config option `foldRegions` was added. When set to `true`, regions marked by `#region` and `#endregion` comments are folded when the project is loaded.

  In addition, editor configurations (`config.markup`, `config.style`, `config.script`) have a new property `foldLines` that accepts an array of objects (e.g. `[{ from: 1, to: 5 }]`) that indicates which lines to fold. This can be useful for less relevant code in embedded playgrounds.

* **Config:** add the value `"auto"` to `config.editor` options ([0f62de8](https://github.com/live-codes/livecodes/commit/0f62de8891ca221c035a2a0e8e3cbfcc9133f2a0))

  If set to `auto`, Monaco editor is used on desktop and CodeMirror is used on mobile regardless of other settings. This can be useful in `"simple"` mode.

---

## [v43](https://github.com/live-codes/livecodes/compare/sdk-v0.9.0...v43) (2025-03-15)

### Highlights for this release

This release added multiple new features and fixes, including:

- Vue and Svelte can now be used in the markup editor, in addition to the script editor. This allows having 2 components in a single project. (see [docs](https://livecodes.io/docs/languages/vue#multiple-components)).
- Vue and Svelte starter templates were updated to use multiple components.
- The editor (`markup`, `style`, `script`) order in the UI can now be set using a new `order` option in the [editor configuration](https://livecodes.io/docs/configuration/configuration-object#markup). (e.g. `config.markup.order`). This can be useful, specially after adding support for Vue and Svelte in the markup editor, for example to have components followed by the styles. (see [example](https://livecodes.io/docs/languages/vue#multiple-components)).
- Tailwind CSS plugins: In addition to allowing importing plugins from URLs, now plugins can be imported as bare modules (from npm) e.g. `@plugin "daisyui"{ /* ... */ }`.
- A new `daisyui` starter template was added (https://livecodes.io/?template=daisyui).
- Significant improvements in docs website, including a dark mode, changing the default theme color used for demo playgrounds, and adding support for [llms.txt files](https://llmstxt.org/).
- Multiple fixes, notably, avoiding autofocus in embeds, fixing preact module resolution and type fixes.

### Credits

- @logaretm suggested having multiple Vue components.
- @jcubic reported the conflicting modules in preact.

Thank you ❤️

This is the full list of changes:

### Features

- **Compilers:** add svelte to markup languages ([16e5091](https://github.com/live-codes/livecodes/commit/16e509129148106d7e272ecf4c1716bece8e4fa0))
- **Compilers:** add vue to markup languages ([70f5b33](https://github.com/live-codes/livecodes/commit/70f5b33bf59a79dea172799276e6e6795a3f7cf2))
- **Compilers:** allow bare module tailwindcss plugins ([c9e156c](https://github.com/live-codes/livecodes/commit/c9e156ce8b55dae24a906c59caa8c96ec4c27670))
- **Config:** allow re-ordering code editors ([5d73064](https://github.com/live-codes/livecodes/commit/5d730648da5061011d2150d0995e8ede94515972))
- **Import-maps:** allow using custom file names to import from script editor ([4499458](https://github.com/live-codes/livecodes/commit/44994582cba40697a314c71e4a7322084e10262b))
- **SDK:** Change SDK react component type from `JSX.Element` to `React.ReactElement<Props>` ([962d4da](https://github.com/live-codes/livecodes/commit/962d4da47f8b5ec6fd56c7ca0ede2ed40bffeb70))
- **Templates:** add daisyUI starter template ([c24fc56](https://github.com/live-codes/livecodes/commit/c24fc56978ea8f5ba6d401c0cf57d527c76e6dd8))
- **Templates:** update vue and svelte templates to use multiple SFCs ([3c42c61](https://github.com/live-codes/livecodes/commit/3c42c610f41bffe1422568d9f6a5ffaf5eca097a))

### Bug Fixes

- **App:** avoid autofocusing embeds ([cd33134](https://github.com/live-codes/livecodes/commit/cd331343ebb1344eb10677c90cf586c2f3c3da77))
- **App:** fix changing modes ([84cf763](https://github.com/live-codes/livecodes/commit/84cf763aae07ccf31821d92b088804ba027e8ea2))
- **App:** fix loading types in embeds ([d5f727c](https://github.com/live-codes/livecodes/commit/d5f727c51b126383da44ab02c4a874ee99924485))
- **ci:** update output variable for skip condition in `i18n-update-scheduled` ([dc2b625](https://github.com/live-codes/livecodes/commit/dc2b625315ea45a1cbdfd6cc481a278e5bca8b68))
- **Editor:** disable monaco mouse wheel zoom ([b1596ef](https://github.com/live-codes/livecodes/commit/b1596ef98d44cc57d440ceff7976f05953e9271c))
- **Import-maps:** fix importing duplicate instances of vue ([ceb2868](https://github.com/live-codes/livecodes/commit/ceb28688a21e1018a97a3397a7d0e44220bbfc27))
- **Import-maps:** fix preact module resolution ([198becf](https://github.com/live-codes/livecodes/commit/198becf98383d1ed205c78634a6d2a49674eb3d9)), closes [#752](https://github.com/live-codes/livecodes/issues/752)
- **Types:** fix importing react types in jsx/tsx ([db605d3](https://github.com/live-codes/livecodes/commit/db605d352f208dc9b477603bf80ea1e47d8af3e7))

---

## [sdk-v0.9.0](https://github.com/live-codes/livecodes/compare/v42...sdk-v0.9.0) (2025-03-15)

### Highlights for this release

In this release of SDK, the following changes were made:

- The React component type was changed from `JSX.Element` to `React.ReactElement<Props>` for compatibility with React 19 (which removed the `JSX` type).
- The editor (`markup`, `style`, `script`) order in the UI can now be set using a new `order` option in the [editor configuration](https://livecodes.io/docs/configuration/configuration-object#markup). (e.g. `config.markup.order`). This can be useful, specially after adding support for Vue and Svelte in the markup editor, for example to have components followed by the styles. (see [example](https://livecodes.io/docs/languages/vue#multiple-components))
- A new `daisyui` starter template was added.

### Features

- **SDK:** Change SDK react component type from `JSX.Element` to `React.ReactElement<Props>` ([962d4da](https://github.com/live-codes/livecodes/commit/962d4da47f8b5ec6fd56c7ca0ede2ed40bffeb70))
- **Config:** allow re-ordering code editors ([5d73064](https://github.com/live-codes/livecodes/commit/5d730648da5061011d2150d0995e8ede94515972))
- **Templates:** add daisyUI starter template ([c24fc56](https://github.com/live-codes/livecodes/commit/c24fc56978ea8f5ba6d401c0cf57d527c76e6dd8))

---

## [v42](https://github.com/live-codes/livecodes/compare/v41...v42) (2025-02-01)

### Highlights for this release

This release adds support for Tailwind CSS v4, while maintaining backward compatibility for v3.

Projects using the old Tailwind CSS directives (e.g. `@tailwind base; @tailwind components; @tailwind utilities;`) will use v3.
To upgrade to v4 replace the directives with the new import statement `@import "tailwindcss";` or simply remove the directives.

The [Tailwind CSS starter template](https://livecodes.io/?template=tailwindcss) was upgraded to use v4.

In addition Monaco editor intellisense for Tailwind CSS was added: autocomplete, hover for generated css, color preview, etc.

### Features

- **Compilers:** add support for tailwindcss v4 ([cc90203](https://github.com/live-codes/livecodes/commit/cc90203d62fea59bc53a02bf004963556c7c545c))
- **Editor:** add support for tailwindcss in monaco editor ([c7f166b](https://github.com/live-codes/livecodes/commit/c7f166b9672cf138b77f9908bcbc9d4419f42e29))
- **Templates:** upgrade tailwindcss starter template to v4 ([84b32f3](https://github.com/live-codes/livecodes/commit/84b32f3ca692a322cf52a789babff9d97175cb2b))

### Bug Fixes

- **CommandMenu:** allow other shortcut combinations to use ctrl+k ([2e026d0](https://github.com/live-codes/livecodes/commit/2e026d03ad6db14f86ca3a74a153f2d0f9d24e72))
- reset editor titles in shared URLs ([297cd29](https://github.com/live-codes/livecodes/commit/297cd29d8dfb2c1b706adbc5dd1e0348bf58be2a))

---

## [v41](https://github.com/live-codes/livecodes/compare/v40...v41) (2025-01-25)

This release fixes invalid cache for codemirror build and simplifies the build process.

---

## [v40](https://github.com/live-codes/livecodes/compare/v39...v40) (2025-01-24)

### Highlights for this release

This release markedly improves accessibility and keyboard support in addition to other features and fixes. The most notable include:

- A new [command menu](https://livecodes.io/docs/features/command-menu) (using the keyboard shortcut Ctrl/Cmd + K or from the help menu), that allows running a large set of commands from the UI.
- A large number of [keyboard shortcuts](https://livecodes.io/?screen=keyboard-shortcuts) are added (the list can be opened from the help menu or the command menu).
- Keyboard navigation for the app is significantly improved, including menus, tabs and modals.
- A new [starter template for shadcn/ui](https://livecodes.io/?template=shadcn-ui) is added.
- Relative [line numbers](https://livecodes.io/docs/configuration/configuration-object#linenumbers) support is added in code editors (can be configured in [editors settings](https://livecodes.io/?screen=editor-settings) screen). This can be useful in [vim mode](https://livecodes.io/docs/configuration/configuration-object#mode).
- The SDK can hide a specific editor while still running its code using the new [`hideTitle`](https://livecodes.io/docs/configuration/configuration-object#markup) option.

### Credits

@zyf722 provided significant contributions.

Many features and fixes in this release were suggested by:
@dai-shi , @sharno , @Mohmed-Refaay & @ibrahimSP

Thank you ❤️

### Features

- **Accessibility:** allow switching tabs in modals using keyboard ([9bb17cc](https://github.com/live-codes/livecodes/commit/9bb17ccd65d8561c07ad61bdf5d0d8168516f23d))
- **Accessibility:** allow toggle tab focus mode ([bf93fb6](https://github.com/live-codes/livecodes/commit/bf93fb6b723f791b7e387dd7edebab93e9804d98))
- **Accessibility:** improve focus on opening and closing modal ([992b456](https://github.com/live-codes/livecodes/commit/992b456d0c71e8eea7e05e2a08906554a621568a))
- **Accessibility:** show outline for focusable elements ([0230afe](https://github.com/live-codes/livecodes/commit/0230afea4b7f93ebaf022dac556497f15a92746f))
- **App:** add keyboard shortcuts ([2972855](https://github.com/live-codes/livecodes/commit/297285579f3b54ab72a2e9fd74a299a5d95c72e8))
- **App:** add keyboard shortcuts screen ([a4491ee](https://github.com/live-codes/livecodes/commit/a4491ee4c61590b7557afa3a86e04aa33f28c6a1))
- **Code-to-Image:** add share/copy image menu ([3b0491f](https://github.com/live-codes/livecodes/commit/3b0491ffaf358a9033a0deca0fd61148c154a239))
- **Code-to-Image:** copy image on desktop ([de60e72](https://github.com/live-codes/livecodes/commit/de60e725c640700bdd6da26c170a4aef6eab8306))
- **CommandMenu:** add command menu ([9cba67a](https://github.com/live-codes/livecodes/commit/9cba67a944d53ab9a56317b1e8ad95c028bbf7d5))
- **CommandMenu:** add command menu items ([b08aabc](https://github.com/live-codes/livecodes/commit/b08aabc2f3f681e1ff0ec2bcb7c9069ad5f8c576))
- **CommandMenu:** add keyboard shortcuts menu ([2d60494](https://github.com/live-codes/livecodes/commit/2d60494a491ee620c4955aacba1cade0baf02a53))
- **Config:** add the property `hideTitle` for editors. ([43f25b0](https://github.com/live-codes/livecodes/commit/43f25b098c865b1868f26cbb9c15d7ba8bde6d16))
- **Editor:** allow relative line numbers in code editors ([c88ad99](https://github.com/live-codes/livecodes/commit/c88ad9963d05de8137c3d54b5e8c7c3edc92687a))
- **Templates:** add shadcn-ui starter template ([ac31801](https://github.com/live-codes/livecodes/commit/ac318011d1bd8586c3f7a1c7d39fe91bf0e8be94))
- **Templates:** add themes for shadcn-ui starter template ([1a89ffb](https://github.com/live-codes/livecodes/commit/1a89ffb6fb094dce1f013e04a084ed1967010feb))
- **UI:** allow keyboard navigation for menus ([d9fad50](https://github.com/live-codes/livecodes/commit/d9fad5096571745ee737f3b266e525366ce72745))
- **UI:** show keyboard shortcuts in UI ([8860f67](https://github.com/live-codes/livecodes/commit/8860f674755ab21777690c7c435ae97eaee228aa))

### Bug Fixes

- **App:** fix copy to clipboard ([87ab701](https://github.com/live-codes/livecodes/commit/87ab701ef155181b2ec0d8edf81094a0ee6e982a))
- avoid trapping focus in tags input ([19531b6](https://github.com/live-codes/livecodes/commit/19531b6d987260b55666f94af7ddc7d0b69134bf))
- **ci:** fix false positive in lokalise json files ([df9e114](https://github.com/live-codes/livecodes/commit/df9e114dc1eacfeacc1c990b0a469f3e9844465f))
- **ci:** make locale exclusion in base tsconfig and include in full tsconfig ([4fa8db7](https://github.com/live-codes/livecodes/commit/4fa8db7378bf7ae547b92b18a84f2cbb49736a29))
- **Editor:** fix autocompleting TS generics as JSX ([81402c8](https://github.com/live-codes/livecodes/commit/81402c8d0153cfb0ac22cb23a2708dd7fa38f8f5))
- **Editor:** fix losing multicursor on pressing ctrl in monaco ([601a517](https://github.com/live-codes/livecodes/commit/601a5175cdb34f0b04ea6ba91b49d5c025f66c89))
- fix typos in CHANGELOG ([7fb3e58](https://github.com/live-codes/livecodes/commit/7fb3e58207811bf5d0080d25b06c4085b80186ed))
- **i18n:** fix i18n-export (prop indexing vs getAttribute) ([a3e83d4](https://github.com/live-codes/livecodes/commit/a3e83d408f04dedf34f5158a8407722bedee66be))
- **i18n:** rename 'lang-info' to 'language-info' for consistency ([35174d0](https://github.com/live-codes/livecodes/commit/35174d0553b65f66c5c88de36b7c66e96f249447))
- **Import-maps:** avoid duplicate react instances ([f3f0607](https://github.com/live-codes/livecodes/commit/f3f06074c6180be1e8d1df5517bc798ccbfbdc30))
- **Result:** fix result mode drawer reappearing after closure ([34fed4f](https://github.com/live-codes/livecodes/commit/34fed4f0da3d183a720a4e939ec32c1fad56ed59))
- **services:** fix auth service bug for undefined user ([9daa9a5](https://github.com/live-codes/livecodes/commit/9daa9a5b9bb070dc55e488ded244a29c5fa40dc4))
- **Templates:** fix loading diagrams template ([feb14ed](https://github.com/live-codes/livecodes/commit/feb14ed60eb4f3a40d12f82a7445d7c12b3d582d))
- **UI:** fix loading spinner colors ([7659a3f](https://github.com/live-codes/livecodes/commit/7659a3f1136463de29da709186c1aea1df009827))
- **UI:** fix styles for search box and tags ([66caeed](https://github.com/live-codes/livecodes/commit/66caeed36e4854677671dc695068a50d5efa6f14))

---

## [sdk-v0.8.0](https://github.com/live-codes/livecodes/compare/v39...sdk-v0.8.0) (2025-01-24)

This release introduces **backward-compatible** changes for the SDK. The use of the old SDK API is still supported, but a deprecation notice is shown in the console. The old API will be removed in a future release.

### SDK Changes (and deprecations)

- **SDK:** move embed option `view` to [`config.view`](https://livecodes.io/docs/configuration/configuration-object#view) ([e5f6ad3](https://github.com/live-codes/livecodes/commit/e5f6ad33d1df4c0194047520d2e5ca3f6a1e27a3))
- **SDK:** move embed option `lite` to [`config.mode:"lite"`](https://livecodes.io/docs/configuration/configuration-object#mode) ([e5f6ad3](https://github.com/live-codes/livecodes/commit/e5f6ad33d1df4c0194047520d2e5ca3f6a1e27a3))
- **SDK:** change embed option `view:"headles"` to [`headless:true`](https://livecodes.io/docs/sdk/js-ts#headless) ([e5f6ad3](https://github.com/live-codes/livecodes/commit/e5f6ad33d1df4c0194047520d2e5ca3f6a1e27a3))

### Features

- **Config:** add the property `hideTitle` for [editors](https://livecodes.io/docs/configuration/configuration-object#markup). ([43f25b0](https://github.com/live-codes/livecodes/commit/43f25b098c865b1868f26cbb9c15d7ba8bde6d16))
- **Editor:** allow [relative line numbers](https://livecodes.io/docs/configuration/configuration-object#linenumbers) in code editors ([c88ad99](https://github.com/live-codes/livecodes/commit/c88ad9963d05de8137c3d54b5e8c7c3edc92687a))
- **SDK:** add a new value `toggle-result` for SDK [`show`](https://livecodes.io/docs/sdk/js-ts#show) method ([8e7e0aa](https://github.com/live-codes/livecodes/commit/8e7e0aa426bb7f3b346c303fb857dbee8400ef16))
- **SDK:** add value `code` to SDK [`show`](https://livecodes.io/docs/sdk/js-ts#show) method to show active editor ([3069d17](https://github.com/live-codes/livecodes/commit/3069d179ed6962d31edc21a9943b4a078be40716))

### Bug Fixes

- **SDK:** fix changing result mode ([eeaab42](https://github.com/live-codes/livecodes/commit/eeaab42a3eb96aa0b7abf23624bfbd210e2ccfce))
- **SDK:** fix creating duplicate plygrounds ([fad9edd](https://github.com/live-codes/livecodes/commit/fad9edd83f7359847b36c54e5ec410aa5bcc9c4d))
- **SDK:** fix the SDK method `show` with inconsistent toolspane behaviour ([a8acfad](https://github.com/live-codes/livecodes/commit/a8acfad2de3933a2772e86ee28fa720fec05421d))
- **SDK:** fix unavailable compiler on changing mode ([224a6ba](https://github.com/live-codes/livecodes/commit/224a6baa9cf3c1bb2bd283066ee2ca147899b1b7))
- **SDK:** reload editors when sdk changes mode ([993f5cf](https://github.com/live-codes/livecodes/commit/993f5cf579d442a7613b22aa86095d52dcbd710b))

---

## [v39](https://github.com/live-codes/livecodes/compare/v38...v39) (2024-12-22)

### Bug Fixes

- **UI:** hide code to image button in embeds ([648654b](https://github.com/live-codes/livecodes/commit/648654b79cc4c3e74e2239f1d9eb38d4c743671b))

---

## [v38](https://github.com/live-codes/livecodes/compare/v37...v38) (2024-12-21)

### Highlights for this release

- This release adds the new feature "Code to Image". It allows generating nice-looking code screenshots. Many customization options are available to change the look of the generated image. In addition, many presets are available for quick selection. See [docs](https://livecodes.io/docs/features/code-to-image).
- [Catppuccin](https://catppuccin.com/) themes were added for Monaco, CodeMirror and CodeJar.
- User-defined import map in a `<script type="importmap">` tag added to markup is now supported.
- In addition to many bugs fixes and improvements.

Credits:

Many thanks to our contributors:

- @zyf722: for improving the i18n workflow and sync with Lokalise, helping with translations and reviewing the "Code to Image" feature.
- @Shlok-Bhakta: for [adding Catppuccin themes](https://github.com/live-codes/livecodes/pull/688).

### Bug Fixes

- **App:** fix changing themes in embeds ([5ad16f4](https://github.com/live-codes/livecodes/commit/5ad16f47d70e383dec17a85d8b00c1bc607380c8))
- **App:** show selected screen after importing external content ([3e473b8](https://github.com/live-codes/livecodes/commit/3e473b85603f36ac6281f58b1ef5e736754a6b40))
- **Compilers:** fix cannot find TS compiler in JS ([76a7345](https://github.com/live-codes/livecodes/commit/76a734536aee7930b1e84cf168105a63780539b8))
- **Compilers:** fix Svelte backward compatibility ([c9a7412](https://github.com/live-codes/livecodes/commit/c9a7412f398039d88a9c49750e63aed9d8a5a833))
- **Editor:** fix codejar changing cursor position on highlight ([84baf7d](https://github.com/live-codes/livecodes/commit/84baf7dd7e117ea7f8279b37525d12c679d21bd0))
- **SDK:** fix changing appLanguage from SDK ([bd23174](https://github.com/live-codes/livecodes/commit/bd23174e20cd9ca456e286a5e71b5d8bdaa567c5))
- **Templates:** fix/upgrade testing-library ([c292807](https://github.com/live-codes/livecodes/commit/c2928078a04073778770df80269b236abea810be))
- **ToolsPane:** improve console output for HTMLCollection ([d4df4ac](https://github.com/live-codes/livecodes/commit/d4df4ac0f2e37e4a823b86a38486de718c0190cc))
- **ToolsPane:** improve console output for nodelist and event objects ([e7821cf](https://github.com/live-codes/livecodes/commit/e7821cf0a166d126806a5104ffcdb14cca091e53))

### Features

- **ci:** update .lokalise.json after pulling from Lokalise ([ba305c6](https://github.com/live-codes/livecodes/commit/ba305c65c8d840e9a5e4cbde0748c6c0c6b1d3d6))
- **Code-to-Image:** add Code to Image feature ([f9a2856](https://github.com/live-codes/livecodes/commit/f9a28562425194a005e3a304919e3318582d0ead))
- **Code-to-Image:** add copy code link ([d883d4e](https://github.com/live-codes/livecodes/commit/d883d4e9733ac04a4f09f0445e4719985c351837))
- **Code-to-Image:** apply preset ([c7f1db5](https://github.com/live-codes/livecodes/commit/c7f1db51ec647e1ffc73ee863910a4eef1e7e41f))
- **Code-to-Image:** prefill empty editor ([f1fe6fa](https://github.com/live-codes/livecodes/commit/f1fe6fa39327b847ded9d26f73562f44a53ff417))
- **Code-to-Image:** re-calculate width on window resize ([7dbc1f5](https://github.com/live-codes/livecodes/commit/7dbc1f5d35105190bc5faeca0c7d8efc7e78ae3e))
- **Code-to-Image:** save custom preset ([cf1143c](https://github.com/live-codes/livecodes/commit/cf1143c7c958a7d8268cd2d60ad8c49884c1f41f))
- **Code-to-Image:** set fileName from title ([02095a2](https://github.com/live-codes/livecodes/commit/02095a2df2088129b908421fe331deae411f9d3a))
- **Code-to-Image:** share image ([d7611e3](https://github.com/live-codes/livecodes/commit/d7611e36211d9fc49b23569cd59acbef8f86c3ec))
- **Code-to-Image:** specify image file name ([b3266e2](https://github.com/live-codes/livecodes/commit/b3266e2fad15a1bb70bad9a3719ab42a031ca2bc))
- **Compilers:** upgrade Svelte to v5.12.0 ([63d2e2c](https://github.com/live-codes/livecodes/commit/63d2e2c9f162a4fa5bac029c54793845e8e90dc3))
- **Import-maps:** allow user-defined import map in `<script type="importmap">` ([d7d34d2](https://github.com/live-codes/livecodes/commit/d7d34d286e7c1e0ea8486f16824ec32a778d3ffc))
- **UI:** add accordion ([a8f37fc](https://github.com/live-codes/livecodes/commit/a8f37fc1d6e7cb7d0aacd5b47ae9633c444aaaf1))

---

## [sdk-v0.7.2](https://github.com/live-codes/livecodes/compare/v37...sdk-v0.7.2) (2024-12-21)

### Features

- **SDK:** Add Catppuccin themes for Monaco, CodeMirror and CodeJar (`catppuccin-latte`, `catppuccin-frappe`, `catppuccin-macchiato` and `catppuccin-mocha`)

---

## [v37](https://github.com/live-codes/livecodes/compare/v36...v37) (2024-12-09)

### Features

- **Compilers:** add support for React Compiler ([353ed97](https://github.com/live-codes/livecodes/commit/353ed9734b664fecaa79231d2bd573016bbc65a9)). The [React starter template](https://livecodes.io/?template=react) now uses the React compiler.
- **Compilers:** upgrade Svelte to version 5 ([db3053c](https://github.com/live-codes/livecodes/commit/db3053ce407a7996add3586e4549eceae77f72c3))

### Breaking Changes

- Svelte 5 is mostly compatible with Svelte 4, but there are some breaking changes. See [release notes](https://github.com/sveltejs/svelte/releases/tag/svelte%405.0.0)

---

## [sdk-v0.7.1](https://github.com/live-codes/livecodes/compare/v36...sdk-v0.7.1) (2024-12-09)

### Features

- Add `react` and `react-tsx` to supported languages for React compiler.

---

## [v36](https://github.com/live-codes/livecodes/compare/v35...v36) (2024-12-07)

### Highlights for this release

This is a big release, featuring:

- Total redesign of the UI to a cleaner, more modern, more consistent and more accessible design. In addition, a customizable `themeColor` allows for a lot of customization (see [livecodes.io/docs/configuration/configuration-object#themecolor](https://livecodes.io/docs/configuration/configuration-object#themecolor)).
- Internationalization (i18n) support for the entire UI. The app can be displayed in multiple languages - currently 12. The new config option `appLanguage` allows setting the app language (see [livecodes.io/docs/configuration/configuration-object#applanguage](https://livecodes.io/docs/configuration/configuration-object#applanguage)).

### Credits:

A huge shout-out to our contributors for making this release possible!

- @gigamaster for the design and implementation of the new UI.
- @zyf722 for the i18n support.

Thank you :)

### Bug Fixes

- **App:** do not clear console in style-only update ([f6ebeb5](https://github.com/live-codes/livecodes/commit/f6ebeb54e8dc62aa4bcfe21adedee30081213e21))
- **docs:** align code block for e2e tests ([751c766](https://github.com/live-codes/livecodes/commit/751c7663f9644fc31b306ab6d465aac8171cfd3c))
- **docs:** fix links to CDNs ([4150510](https://github.com/live-codes/livecodes/commit/41505101106b9005063da49fe3338851302ac6b0))
- **services:** fix CORS error in firefox when calling jsdelivr API ([d00c7e5](https://github.com/live-codes/livecodes/commit/d00c7e538a3ea54a9b6866a612558526ab6be624))
- **ToolsPane:** fix console themes ([58da00c](https://github.com/live-codes/livecodes/commit/58da00ce92d6f5b613f78175573a3527865c612a))
- **UI:** fix external resources screen styles in firefox ([ff9f347](https://github.com/live-codes/livecodes/commit/ff9f3479ee7d15eac500956bf01b5313f98805c7))
- **Templates** modify React Native template till React Native Web supports React 19.

### Features

- **Config:** add [`appLanguage`](https://livecodes.io/docs/configuration/configuration-object#applanguage) config property to set i18n language ([c682d7c](https://github.com/live-codes/livecodes/commit/c682d7c3c666e38089c3c150420406a56483a9f6))
- **Config:** add [`themeColor`](https://livecodes.io/docs/configuration/configuration-object#themecolor) config property to set theme color.

* abstract tag for innerHTML ([7c942e3](https://github.com/live-codes/livecodes/commit/7c942e3357131e2710a9bda93abab166083e1c51))
* add a script to generate English .ts and .json template from .html for i18n ([7ab9473](https://github.com/live-codes/livecodes/commit/7ab9473ba6ffd4997579cef3182f84d4e969e11e))
* add i18n integration for html pages ([e426d0f](https://github.com/live-codes/livecodes/commit/e426d0f45d519d8f0554545927b867890b578cf4))
* **App:** add console message ([c17c4ed](https://github.com/live-codes/livecodes/commit/c17c4ed0868391d485508d83d308af8b84b58760))
* export i18n keys in alphabetical order to have better diff ([7c72fda](https://github.com/live-codes/livecodes/commit/7c72fdaf4bd0bbad0be2d17f20be138e6c283aff))
* extract i18n from .ts files with translateString ([1f1f507](https://github.com/live-codes/livecodes/commit/1f1f5071135cc5f0a5875ca99b99ccc182369975))
* **i18n:** add `getLanguageDirection` to get ltr/rtl layout ([016b62c](https://github.com/live-codes/livecodes/commit/016b62cf53dc96ee75f218389139bb39a8ff9811))
* **i18n:** add `placeholder` as translatable attribute ([6c9a27c](https://github.com/live-codes/livecodes/commit/6c9a27c221b9cae0436a751b22bb8935a60e15f5))
* **i18n:** add a ci script to push source texts to lokalise ([0eaa5e7](https://github.com/live-codes/livecodes/commit/0eaa5e7fdc46269c8ea1038c464bd3b330eb1fe9))
* **i18n:** add an `overwrite` flag for `i18n-export` ([eb9ba81](https://github.com/live-codes/livecodes/commit/eb9ba816dc5622ad8e8f9a5bb642f473ca68e2bb))
* **i18n:** add app language in editor settings ([861a26b](https://github.com/live-codes/livecodes/commit/861a26b665b477c63fb40b099e38740c31cefe18))
* **i18n:** add branching and rename `i18n-push-to-lokalise` ([d304f09](https://github.com/live-codes/livecodes/commit/d304f09cfdecf6e8afe7f9681211d5c5e8ea4828))
* **i18n:** add i18n for loading screen ([1ff478d](https://github.com/live-codes/livecodes/commit/1ff478da270dbb4e72ddeb6622acd73c25c7415f))
* **i18n:** add i18n-import ([83a040a](https://github.com/live-codes/livecodes/commit/83a040a035c5d379c1e45d9de8dc42bf08437f84))
* **i18n:** add i18n-lokalise-json ([35471c7](https://github.com/live-codes/livecodes/commit/35471c7487b512f9d3fb53abc59122551523cf30))
* **i18n:** add interpolation for element-level translation ([647849a](https://github.com/live-codes/livecodes/commit/647849ad153305ee14942458435f9c155e496169))
* **i18n:** add types for translation keys ([d44159e](https://github.com/live-codes/livecodes/commit/d44159e982dc162da1064aba9f814c16c5cc2050))
* **i18n:** async lazy load i18n for language-info ([a7bc906](https://github.com/live-codes/livecodes/commit/a7bc9066c2972f5dd4cfb0f2fee0fbdaf5fc6419))
* **i18n:** change escapeValue to false to prevent HTML tag escaping ([4d3c04b](https://github.com/live-codes/livecodes/commit/4d3c04bd91ea8bf564e2dadfc32eea9019a566d6))
* **i18n:** change tag numbering to left-to-right in `abstractifyHTML` ([f995c76](https://github.com/live-codes/livecodes/commit/f995c76279cd3ca7e922ea440359d3b3405017bf))
* **i18n:** change translate to support multiple properties ([f482820](https://github.com/live-codes/livecodes/commit/f482820c361c1f69832519821d6fb1e7f4c81c70))
* **i18n:** custom event driven translation ([a6c60cf](https://github.com/live-codes/livecodes/commit/a6c60cfa5b9baa3fb3a2e4b1b9603060e10c23b5))
* **i18n:** deprecate outdated keys when importing ([2c4b49a](https://github.com/live-codes/livecodes/commit/2c4b49a2012706f84492088ba443beef438c8863))
* **i18n:** enhance type-safety and intellisense of i18n ([cb4d9d6](https://github.com/live-codes/livecodes/commit/cb4d9d678ac741734dcd2cec31d20a76fb5fb210))
* **i18n:** enhance type-safety for translateString ([12bdeea](https://github.com/live-codes/livecodes/commit/12bdeea5b7779e04560759174d7dda6cafd5c0ca))
* **i18n:** lazy-load i18n ([56411fc](https://github.com/live-codes/livecodes/commit/56411fcd8aad172322b85fd2b67fd28879cbe797))
* **i18n:** only allow supported appLanguages ([4114d98](https://github.com/live-codes/livecodes/commit/4114d98e0b57ed23acb95761dc2e8a067bad0dbf))
* **i18n:** remove empty translation entries ([5d05602](https://github.com/live-codes/livecodes/commit/5d056029101719f91d3a0b33c43f253645f156f4))
* **i18n:** set `dir` based on `appLanguage` ([cf115c1](https://github.com/live-codes/livecodes/commit/cf115c1975dc2985d57b44aa7f93c867b6a16e54))
* **i18n:** string-level i18n ([d01bab0](https://github.com/live-codes/livecodes/commit/d01bab0632366da041bf5c8a172cfa72f7a8a892))
* **i18n:** use ts to have type-safe translation ([b38e1a9](https://github.com/live-codes/livecodes/commit/b38e1a9ae488fb1fdfba7bdcf4f1cf6be4010be7))
* **i18n:** utility function to support dynamically-added elements ([fe69071](https://github.com/live-codes/livecodes/commit/fe69071084b505ce6c305d720b4e9c077a4c6da2))
* **Import:** import local files by dropping in editor ([09c69f6](https://github.com/live-codes/livecodes/commit/09c69f6015f552ab441174f99581b4fa8d090b1f))
* **Import:** improve file selection criteria on import ([c96c541](https://github.com/live-codes/livecodes/commit/c96c541ec10f180e8f9e8fd0290ca35d18c1ba00))
* load `appLanguage` in `getUserConfig` ([2e73a96](https://github.com/live-codes/livecodes/commit/2e73a963a04cfe9c88e265029ddc29d40a5eee31))
* set document language with i18n ([0149c4a](https://github.com/live-codes/livecodes/commit/0149c4affb0f081438a982a4b32f58d864f12938))
* **UI:** add fallback when css masking is not supported ([bde3df7](https://github.com/live-codes/livecodes/commit/bde3df7d0ed9b032f4ee2c6f70e047e9abc0ddb5))
* use i18next ([73d74e2](https://github.com/live-codes/livecodes/commit/73d74e263081789d1a01caa63993a432a3e55dd8))

---

## [sdk-v0.7.0](https://github.com/live-codes/livecodes/compare/v35...sdk-v0.7.0) (2024-12-07)

### Features

- **Config:** add [`appLanguage`](https://livecodes.io/docs/configuration/configuration-object#applanguage) config property to set i18n language ([c682d7c](https://github.com/live-codes/livecodes/commit/c682d7c3c666e38089c3c150420406a56483a9f6))

- **Config:** add [`themeColor`](https://livecodes.io/docs/configuration/configuration-object#themecolor) config property to set theme color.

---

## [v35](https://github.com/live-codes/livecodes/compare/v34...v35) (2024-08-01)

### Highlights for this release:

- Added starter templates for D3 and Phaser:

  - https://livecodes.io/?template=d3
  - https://livecodes.io/?template=phaser

- Fixed solid-js compiler

### Bug Fixes

- **Compilers:** fix solid-js compiler ([f96032d](https://github.com/live-codes/livecodes/commit/f96032d937c0fb617eec9e59d26eea88be8ead5f))

### Features

- **Templates:** add Phaser starter template ([3eb208b](https://github.com/live-codes/livecodes/commit/3eb208b281601477d1ecdd08a740bd43651d7eb1))
- **Templates:** restore D3 template ([56d064f](https://github.com/live-codes/livecodes/commit/56d064f2db9b4a446bffc3b00cdecd69ce704f3f))

---

## [v34](https://github.com/live-codes/livecodes/compare/sdk-v0.6.0...0.0.0) (2024-07-27)

- **Config:** allow setting custom editor title ([95287d0](https://github.com/live-codes/livecodes/commit/95287d07d88fe75ca22c69e4c2c5d3241aae4069))

- SDK v0.6.0

---

## [sdk-v0.6.0](https://github.com/live-codes/livecodes/compare/v33...sdk-v0.6.0) (2024-07-27)

### Features

- **Config:** allow setting custom editor title ([95287d0](https://github.com/live-codes/livecodes/commit/95287d07d88fe75ca22c69e4c2c5d3241aae4069))
- **SDK:** add JSDoc comments ([323ce5a](https://github.com/live-codes/livecodes/commit/323ce5ad3cf4bb38450852f7116ad8fb366d08d0))
- **SDK:** add JSDoc comments for react & vue SDKs ([cf7b46d](https://github.com/live-codes/livecodes/commit/cf7b46de438ea71f25ab404c3a1f85c791d8d2b2))
- **SDK:** change react SDK build to use `react-jsx` ([d603103](https://github.com/live-codes/livecodes/commit/d603103342b427e5d8d13db81dec4f8101d7643c))

---

## [v33](https://github.com/live-codes/livecodes/compare/v32...v33) (2024-07-13)

### Highlights for this release:

- **BREAKING**: Most compilers were upgraded to their latest versions. Some compilers _do have breaking changes_. The full list of compilers upgraded and their new versions can be [found here](https://github.com/live-codes/livecodes/commits/develop/?since=2024-07-03&until=2024-07-13).

  If your code stops working as intended, you may want to use a [permanent URL](https://livecodes.io/docs/features/permanent-url) to a previous LiveCodes version (e.g. https://v32.livecodes.io), till you upgrade your code.

- A custom build for Monaco editor is now used to allow matching the playground TypeScript version and the use of ESM bundled version of Monaco. This now makes it much faster (than previously used CDN), and avoids some bugs related to the Monaco loader.
- Fixed a bug that sometimes caused formatting to change the code in Monaco.
- Added support for [Vento](https://vento.js.org/) template engine.

### Bug Fixes

- **Editor:** destroy editors in modals onClose ([84736cb](https://github.com/live-codes/livecodes/commit/84736cb82c5672ea47a7ab8a21f32fc7c62b1bf8))
- **Editor:** fix formatting on monaco ([85cd72a](https://github.com/live-codes/livecodes/commit/85cd72a887a068d1ccc4462bbb423214a9c8d6f0))
- **Editor:** when formatting in monaco, avoid referring to editors destroyed after closing modals ([c6234bd](https://github.com/live-codes/livecodes/commit/c6234bd0df3ff05b4625fa50d77177bef5968bd0))

### Features

- **Compilers:** add vento ([cba3a35](https://github.com/live-codes/livecodes/commit/cba3a357a10889d5b3cd1a3447470dd6f6eb3f99))
- **Editor:** use custom build of monaco ([a11b23b](https://github.com/live-codes/livecodes/commit/a11b23b502e26cae78a4bf1b0ce32166b1e955d9))

---

## [v32](https://github.com/live-codes/livecodes/compare/v31...v32) (2024-06-30)

### Highlights for this release:

- Brython upgraded to v3.12.3 and fixed a bug that caused Python code to run twice.

### Bug Fixes

- **Compilers:** upgrade brython to v3.12.3 and fix bug of running code twice ([28c2922](https://github.com/live-codes/livecodes/commit/28c2922de0c438bc941ffe73121c204c516d77f3))

---

## [v31](https://github.com/live-codes/livecodes/compare/v30...v31) (2024-06-29)

### Highlights for this release:

- CodeMirror TypeScript editor support:

  This release adds TypeScript editor support for CodeMirror (the default editor on mobile).
  This includes auto-complete, type info on hover and linting (showing type errors).
  This also includes [automatically loading types](https://livecodes.io/docs/features/intellisense) for imported npm modules and the support of [custom (user-defined) types](https://livecodes.io/docs/features/intellisense#custom-types).

  All of these features (except showing type errors) are also available in JS & JSX.

- The [AI code assistant](https://livecodes.io/docs/features/ai) now works on CodeMirror editor.

### Bug Fixes

- **App:** fix race condition for AMD `define` between monaco editor and localforage ([847d567](https://github.com/live-codes/livecodes/commit/847d567278720ac58ce538bb83018d5343d8df96))
- **Editor:** fix multiple registers for twoslash completions ([2f0147e](https://github.com/live-codes/livecodes/commit/2f0147e82e4eea1dffb96c4c670a367acd175edc))
- **Types:** fix loading custom types ([33458af](https://github.com/live-codes/livecodes/commit/33458affcfd26252bf8c81105c69a4dce4b7ee34))

### Features

- **Editor:** support adding types on codemirror ([7ef6551](https://github.com/live-codes/livecodes/commit/7ef6551f489472e8be45168a7aa3b52002b7d19f))

---

## [v30](https://github.com/live-codes/livecodes/compare/v29...v30) (2024-06-21)

### Highlights for this release:

- Upgrade [typescript compiler to v5.5](https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/).
- Improvements in imports.
- Bug fixes.

Thanks to @sharno for bug reports and suggestions.

### Bug Fixes

- **App:** do not format when auto-saving ([10a3f44](https://github.com/live-codes/livecodes/commit/10a3f44ca0587fa85df4cfcc68c7f065d85b7465))
- **App:** fix loading AMD modules (for autocomplete & qrcode) ([da0f9a5](https://github.com/live-codes/livecodes/commit/da0f9a57e52aadcf3da12a0b02191531a84ef60b))
- **Deploy:** fix deploy user info ([0e67a61](https://github.com/live-codes/livecodes/commit/0e67a615315e3f198d0ad58c28d3869bf8e90f68))
- **Editor:** fix solid jsx/tsx in monaco ([0040f31](https://github.com/live-codes/livecodes/commit/0040f31795afa47c3a37ec09558cc7572e38e6d9))

### Features

- **Compilers:** upgrade typescript compiler to v5.5.2 ([14fbf52](https://github.com/live-codes/livecodes/commit/14fbf52e04ce8efc9e0ec6e58a90ac56b5dee5b4))
- **Import:** set activeEditor when importing ([7f6fcd0](https://github.com/live-codes/livecodes/commit/7f6fcd0739f775d6410163568ec4abfb72510884))
- **Import:** use `files` query param for file selection when importing ([b787e03](https://github.com/live-codes/livecodes/commit/b787e039d0c996f6d20c2c1fc6219f35c8ddcb3b))

---

## [v29](https://github.com/live-codes/livecodes/compare/v28...v29) (2024-05-15)

### Highlights for this release:

- Add [TypeScript twoslash](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ts-twoslasher) support in monaco editor. This works in JS, TS, JSX and TSX. See [docs](https://livecodes.io/docs/features/intellisense/#typescript-twoslash).
- Change the way TypeScript types are loaded using Automatic Type Acquisition (ATA) to overcome some edge cases.
- Use same typescript version for editor and compiler (currently v5.4.5).

in addition to other improvements and fixes listed below.

### Bug Fixes

- **Compilers:** add rest of official gleam modules ([903e32b](https://github.com/live-codes/livecodes/commit/903e32b3d9e3a7869ff8101462d20fc582a0d3ba))
- prevent using AMD when building (e.g. lz-string) ([f4f7154](https://github.com/live-codes/livecodes/commit/f4f71542cdb0e606ec323a01c344bcaaa9c52186))
- **ToolsPane:** fix show test results in projects with no tests ([0f1b25b](https://github.com/live-codes/livecodes/commit/0f1b25b42b588c74d32c92f567e0ec5e0040e67d))
- **ToolsPane:** fix unnecessarily changing language of compiled code editor ([4b0f023](https://github.com/live-codes/livecodes/commit/4b0f023180668aa2a055d3588822f68d3348cfc2))
- **ToolsPane:** hide loading spinner when tests complete ([db1c7fc](https://github.com/live-codes/livecodes/commit/db1c7fc444213b354f9cb12bc1a4baedca9eea7b))
- **Types:** fix type loader ([cfbdec4](https://github.com/live-codes/livecodes/commit/cfbdec408dc9ccc625a10e12ba598c8b57d33884))
- **Types:** fix types in test editor ([874f2ee](https://github.com/live-codes/livecodes/commit/874f2ee80c87242169878bd2a5d7a140aec7b33d))

### Features

- **Editor:** add twoslash support in monaco editor ([b024c84](https://github.com/live-codes/livecodes/commit/b024c841fdeec6484f30ad1d8f3bff689baf1584))
- **Editor:** use same typescript version for editor and compiler ([9d65622](https://github.com/live-codes/livecodes/commit/9d65622f97bdb24774d151060626b41091c459f3))
- **Modules:** add more CDNs ([616bae7](https://github.com/live-codes/livecodes/commit/616bae7f225e4b398ca7ebba3cdd0a5a135bf8cb))
- **Types:** enable Automatic Type Acquisition (ATA) for Monaco editor ([1f2ab60](https://github.com/live-codes/livecodes/commit/1f2ab60bb3c440f8772bda86d655dd05634dad46))

---

## [v28](https://github.com/live-codes/livecodes/compare/v27...v28) (2024-04-24)

### Highlights for this release:

- Add support for [Gleam language](https://github.com/gleam-lang/gleam): [starter template](https://livecodes.io?template=gleam) - [docs](https://livecodes.io/docs/languages/gleam)
- Enable AI code completion on mobile editor (codemirror) - (experimental)
- Upgrade monaco editor to v0.48.0, TypeScript compiler to v5.4.5, and prettier formatter to v3.2.5

### Bug Fixes

- **Types:** fix type bundler for subpaths ([f4d88e1](https://github.com/live-codes/livecodes/commit/f4d88e121a09e4c7e968749ebdf1b59ea35cefea))

### Features

- **App:** upgrade monaco editor to v0.48.0 ([88253f9](https://github.com/live-codes/livecodes/commit/88253f924498877634b1347555c1ba68aca971e0))
- **Compilers:** add support for gleam language ([a1bb21e](https://github.com/live-codes/livecodes/commit/a1bb21ee05793b5b02490383d54872493e9ab0f1))
- **Compilers:** allow gleam code to use npm modules without import maps ([52a269a](https://github.com/live-codes/livecodes/commit/52a269a904f49fd79649b5b003899d46230232ea))
- **Compilers:** allow loading custom gleam modules ([cf13102](https://github.com/live-codes/livecodes/commit/cf13102b0d739241c87aa02a3f9966c0afc75035))
- **Compilers:** dynamically load gleam stdlib ([9352da4](https://github.com/live-codes/livecodes/commit/9352da43a2c11e69182a6bd75e5cd03059bde889))
- **Compilers:** make official gleam packages available by default ([5aed5ea](https://github.com/live-codes/livecodes/commit/5aed5ea9aaca7554ce69010e061c927e628340f4))
- **Compilers:** upgrade TypeScript to v5.4.5 ([0d020ef](https://github.com/live-codes/livecodes/commit/0d020ef847aa1687e2eede0aaaae5d8d56c3ccc9))
- **Editor:** enable AI code completion for codemirror ([ac2c6f3](https://github.com/live-codes/livecodes/commit/ac2c6f37b21026309bf5aa181550e79280ccd30e))
- **Formatter:** upgrade prettier to v3.2.5 ([bf0ee4f](https://github.com/live-codes/livecodes/commit/bf0ee4ff7b78ea43e007a711325aa023a54c95a8))
- **Import-maps:** allow config imports to override auto-generated user imports ([e87018f](https://github.com/live-codes/livecodes/commit/e87018f91c260f74b6b1f1d44b2bd621df10e6bd))
- **Templates:** add gleam starter template ([cc57e38](https://github.com/live-codes/livecodes/commit/cc57e3861570a768a049b28724f389ddc253843d))

---

## [v27](https://github.com/live-codes/livecodes/compare/v26...v27) (2024-04-17)

Highlights for this release:

- Add support for PostgreSQL using [`pglite`](https://github.com/electric-sql/pglite) ([starter template](https://livecodes.io/?template=postgresql) - [docs](https://livecodes.io/docs/languages/postgresql))
- Add [focus](https://livecodes.io/docs/features/display-modes#focus) and [simple](https://livecodes.io/docs/features/display-modes#simple) modes for a cleaner and less complex layout for the app and embedded playgrounds.
- Add vertical layout.  
  Now the default layout is responsive (in small view ports, the layout is vertical if the playground height is larger than its width). This can be changed from the UI (App menu) or with the [`layout`](https://livecodes.io/docs/configuration/configuration-object#layout) config option.
- Allow loading assets when importing a file or directory from GitHub.  
  examples:
  - https://livecodes.io/?x=https://github.com/atherosai/ui/tree/main/accordion-01
  - https://livecodes.io/?x=https://github.com/atherosai/ui/blob/main/accordion-01/index.html

In addition to many other improvements and bug fixes:

### Bug Fixes

- **App:** fix `?view=result` when loading external content ([1314202](https://github.com/live-codes/livecodes/commit/131420216f28158215a5a9f4bd3390c78de2083e))
- **App:** fix popup window failing to use importmap ([52b0e48](https://github.com/live-codes/livecodes/commit/52b0e4848cbf1dc55e144060252712f578c01d81))
- **compilers:** change python-wasm default extension to `wasm.py` ([db7f5c4](https://github.com/live-codes/livecodes/commit/db7f5c40f9eadd04dbe2e6eb2042a9efe6909f91))
- **Deploy:** fix deploy for runtime languages with code in custom script block (use single file) ([6caf303](https://github.com/live-codes/livecodes/commit/6caf303f6b994222edd2dcf5fe7f2c0648a775f5))
- **Import:** fix import deployed projects ([1877959](https://github.com/live-codes/livecodes/commit/1877959fa6a923edbf65c0af8ec1e9612f6949f0))
- **Import:** fix importing for github dir name with spaces ([620898b](https://github.com/live-codes/livecodes/commit/620898ba3a88eeb660081579007531e1a8cedbce))
- **UI:** improve settings menu layout ([fd5f243](https://github.com/live-codes/livecodes/commit/fd5f2439fcd23507720cba79070e200df0db14e6))

### Features

- **Compilers:** add support for PostgreSQL ([1a49363](https://github.com/live-codes/livecodes/commit/1a49363f7afc632c5e92e47b789dff08bbf6beca))
- **compilers:** allow compiler factory to be async ([d76b351](https://github.com/live-codes/livecodes/commit/d76b351fbda65aee7f3793cd0b3cd108cdc0861d))
- **Config:** make `Config.tools` fields optional ([42342a7](https://github.com/live-codes/livecodes/commit/42342a752100c5df49970c3857c3eaf9bd981bf9))
- **Deploy:** add link to deploy status ([8c49c58](https://github.com/live-codes/livecodes/commit/8c49c586008d6096d6f6533b722bb4a6122c500a))
- **Import:** load linked assets when importing from GitHub ([bf0660d](https://github.com/live-codes/livecodes/commit/bf0660da8d7df9ad74c706e0366abdc63528138a))
- **Modes:** add focus mode ([3608df4](https://github.com/live-codes/livecodes/commit/3608df4185650b51707223729de090457c7230ff))
- **Modes:** add simple mode ([6690806](https://github.com/live-codes/livecodes/commit/66908062cca37453da9f2f76c5ec6f7f036170d4))
- **SDK:** allow the SDK `watch` method to watch for changes to external resources ([a2aabf7](https://github.com/live-codes/livecodes/commit/a2aabf7c33ae97dda0c5f65033d54821ae45ff74))
- **SDK:** allow the SDK `watch` method to watch for changes to processors ([f23c848](https://github.com/live-codes/livecodes/commit/f23c8486c496c160278c928612c5f85d7f7e7878))
- **ToolsPane:** show indicator for console output ([eaa33de](https://github.com/live-codes/livecodes/commit/eaa33defb34bebfce0214b831509ff6ba9c480fe))
- **UI:** allow changing layout horizontal/vertical ([df3796f](https://github.com/live-codes/livecodes/commit/df3796f8acd29632cde50ac85bba72703156e3f0))
- **UI:** make app menu responsive ([46b7580](https://github.com/live-codes/livecodes/commit/46b7580ba23c96511a43a04cb79b7005c33cb89a))
- **UI:** remove load buttons from screens. ([94ee5d6](https://github.com/live-codes/livecodes/commit/94ee5d6ef9fbae20f59e226e8d1758006f4f406b))

---

## [sdk-v0.5.0](https://github.com/live-codes/livecodes/compare/sdk-v0.4.0...sdk-v0.5.0) (2024-04-16)

- **Config:** make `Config.tools` fields optional ([42342a7](https://github.com/live-codes/livecodes/commit/42342a752100c5df49970c3857c3eaf9bd981bf9))
- **Modes:** add focus mode ([3608df4](https://github.com/live-codes/livecodes/commit/3608df4185650b51707223729de090457c7230ff))
- **Modes:** add simple mode ([6690806](https://github.com/live-codes/livecodes/commit/66908062cca37453da9f2f76c5ec6f7f036170d4))
- **SDK:** allow the SDK `watch` method to watch for changes to external resources ([a2aabf7](https://github.com/live-codes/livecodes/commit/a2aabf7c33ae97dda0c5f65033d54821ae45ff74))
- **SDK:** allow the SDK `watch` method to watch for changes to processors ([f23c848](https://github.com/live-codes/livecodes/commit/f23c8486c496c160278c928612c5f85d7f7e7878))
- **UI:** allow changing layout horizontal/vertical ([df3796f](https://github.com/live-codes/livecodes/commit/df3796f8acd29632cde50ac85bba72703156e3f0))

---

## [v26](https://github.com/live-codes/livecodes/compare/v25...v26) (2024-03-04)

### Bug Fixes

- **Editor:** revert css nesting workaround ([66bd226](https://github.com/live-codes/livecodes/commit/66bd226ee7559ed729d99198434d54836b40e316))
- **Embed:** fix embed UI code snippets ([e01315e](https://github.com/live-codes/livecodes/commit/e01315e2837dd22e9171100c64b8d29973454d97))
- **UI:** fix toolspane double-click ([3114e6c](https://github.com/live-codes/livecodes/commit/3114e6ca525a3c20d10dad773801f5adae41e148))

### Features

- **compilers:** upgrade markedjs ([7555c4a](https://github.com/live-codes/livecodes/commit/7555c4ac45ae2a38ef812c0b97da36e72c75189b))
- **Editor:** add Monaspace font ([434ba96](https://github.com/live-codes/livecodes/commit/434ba9669bf1e8f7cc26abe7c2bb75dd8a833414))

---

## [v25](https://github.com/live-codes/livecodes/compare/v24...v25) (2024-03-01)

Most notable changes in this release:

- Adds support for [JSR](https://jsr.io/), the new JavaScript package registry, using [esm.sh](https://esm.sh/). Use the prefix `jsr:` in imports.

  Example:

  ```js
  import { yassify } from 'jsr:@kwhinnery/yassify';

  console.log(yassify('Hello, World!'));
  ```

- Adds [BBCode](https://livecodes.io/docs/languages/bbcode) language support.

- Changes polyfill CDN to https://cdnjs.cloudflare.com/polyfill/. See [#519](https://github.com/live-codes/livecodes/issues/519) (Thanks @gapmiss).

- Adds a `noscript` block to notify users that JavaScript is required. (Thanks @saidbakr)

- Adds a temporary workaround for CSS nesting in Monaco editor. See [#515](https://github.com/live-codes/livecodes/issues/515) (Thanks @gapmiss).

### Bug Fixes

- **Editor:** monaco editor css nesting workaround ([c932c29](https://github.com/live-codes/livecodes/commit/c932c291114034a58dc7e1480eaf2ff91bce224b))
- **Templates:** fix preact template imports ([efbab86](https://github.com/live-codes/livecodes/commit/efbab86a4d0831b75ada4b6c6e03a57b2b7c2082))

### Features

- **App:** add noscript block ([e455240](https://github.com/live-codes/livecodes/commit/e455240720916623482acfdd0b27d326f4bef284))
- **App:** change polyfill CDN ([1606b3f](https://github.com/live-codes/livecodes/commit/1606b3f45935196459f0a5ea80d0ac7e6da34cc5)), closes [#519](https://github.com/live-codes/livecodes/issues/519)
- **compilers:** add support for BBCode ([2f15b95](https://github.com/live-codes/livecodes/commit/2f15b9541c21727ce136fbcd9b78020017fc4c00))
- **Modules:** add support for jsr package registry ([e574ec3](https://github.com/live-codes/livecodes/commit/e574ec3b44ebbf2d694cda7e6852a9bc9ff31592))

---

## [v24](https://github.com/live-codes/livecodes/compare/v23...v24) (2024-02-17)

This is a hotfix for embeds failing to load.

### Bug Fixes

- **Embed:** fix setting on undefined (theme toggle in embeds) ([1b845da](https://github.com/live-codes/livecodes/commit/1b845da360f2de4ad78c97b032a9c0bf26ce1f5b))

---

## [v23](https://github.com/live-codes/livecodes/compare/v22...v23) (2024-02-15)

This release allows using the AI code assistant without browser extension, with no account or API token required, totally for free, by just flipping a switch! (Powered by [codeium](https://codeium.com))

The AI code assistant can be enabled from [editor settings](https://livecodes.io?screen=editor-settings).
Also the new config property [`enableAI`](https://livecodes.io/docs/configuration/configuration-object#enableai) allows enabling it using the SDK.

In addition, new monochrome (light and dark) editor themes and the font [Astigmata](https://medium.com/codex/astigmata-my-monospace-programming-font-b28ccfa9b025) have been added.

### Bug Fixes

- **UI:** fix theme switch status ([ce0fe2c](https://github.com/live-codes/livecodes/commit/ce0fe2c8a6c45571c8175f92760ac0069c3257e3))

### Features

- **App:** AI code assistant with no accounts or browser extensions ([39916cf](https://github.com/live-codes/livecodes/commit/39916cf4fcf65374bc8cf70536d64a69e7dec4c2))
- **UI:** allow enabling/disabling AI from UI (editor settings screen) ([c422ded](https://github.com/live-codes/livecodes/commit/c422dedc05347040df68f3fc6edecaf144dc5a56))
- **Editor:** add Astigmata font ([39cd99b](https://github.com/live-codes/livecodes/commit/39cd99b28bad8c35e4367df18551295e8bf1fc78))
- **Editor:** add monochrome prism themes ([0a507d1](https://github.com/live-codes/livecodes/commit/0a507d1013b6c9f1c25bc831f7885c1abbd95ade))
- **Editor:** add monochrome themes for codemirror ([3ad8b37](https://github.com/live-codes/livecodes/commit/3ad8b3719c2a62696c59af45881f0f5c2ff3ba8e))
- **Editor:** add monochrome themes for monaco ([876294a](https://github.com/live-codes/livecodes/commit/876294ad6d9852fd52903474471b72eeed492545))
- **Editor:** use AI context from content of multiple editors ([e2066c5](https://github.com/live-codes/livecodes/commit/e2066c51517b25e2312c2e4800e289e8b9a43678))
- **Result:** load stylesheets in importmap ([b943274](https://github.com/live-codes/livecodes/commit/b943274ec0e0990d856d45d5c29886f7e76ef311))

---

## [v22](https://github.com/live-codes/livecodes/compare/v21...v22) (2024-02-03)

Add more docs, including for the [Preview in LiveCodes](https://github.com/live-codes/preview-in-livecodes) GitHub action.

### Bug Fixes

- fix importing data url stylesheet ([d57a06c](https://github.com/live-codes/livecodes/commit/d57a06c15f042946b0156a624de8b1dda34bb554))

---

## [v21](https://github.com/live-codes/livecodes/compare/v20...v21) (2024-01-27)

The major changes in this release include:

- Auto-rendering of default export from JSX/TSX: This significantly reduces the boilerplate code required in JSX (to create and render react-dom root). This is mostly backward-compatible. Manual rendering still works. See [JSX docs](https://livecodes.io/docs/languages/jsx).
- Use React new JSX transform
- Apply same changes to react-native and solid
- Change React, React-Native and Solid starter templates to use default export with auto-rendering
- Allow the use of JSX fragments in Vue SFC
- Improve fetching and bundling of types for editor intellisense. This should significantly improve code auto-completion and type info for imported modules, without the need for manual type-bundling or the use of custom types.
- Add docs for: [JSX](https://livecodes.io/docs/languages/jsx), [TSX](https://livecodes.io/docs/languages/tsx), [Solid](https://livecodes.io/docs/languages/solid), [Solid(TS)](https://livecodes.io/docs/languages/solid.tsx), [React-Native](https://livecodes.io/docs/languages/react-native), [React-Native(TSX)](https://livecodes.io/docs/languages/react-native-tsx)

Thank you @dai-shi for suggesting some of these changes.

In addition to various improvements and fixes (see below).

### Bug Fixes

- **App:** fix loading mode & view ([f982fe0](https://github.com/live-codes/livecodes/commit/f982fe0901798c723d1a62bb256692097bec78c1))
- **App:** fix result mode toolspane visibility ([cd1861a](https://github.com/live-codes/livecodes/commit/cd1861ab695485ee621836b98b371c5cd4a92998))
- **Result:** fix removing/ignoring stylesheet imports in scripts ([c77980a](https://github.com/live-codes/livecodes/commit/c77980a1079f09827c8cde44cbf38cf1c3199d58))
- **Result:** remove extra scripts added to detect classes for CSS processors ([c63a32f](https://github.com/live-codes/livecodes/commit/c63a32ff69b0e4e52a49c18aedc444d8dc3c71d7))
- **Types:** fix race condition in loading types ([a85ba31](https://github.com/live-codes/livecodes/commit/a85ba31b0c380c0d815533214615bab27b94cea4))

### Features

- **compilers:** allow using JSX fragments in Vue SFC ([32270d8](https://github.com/live-codes/livecodes/commit/32270d801683dd556412e8396de6e56f19702431))
- **compilers:** render React component if it is the default export ([6daace7](https://github.com/live-codes/livecodes/commit/6daace7f4196e05b9704adfedadedae39cd69187))
- **compilers:** render React component if it is the default export ([2ba144f](https://github.com/live-codes/livecodes/commit/2ba144f171ba4853636b306c48ef1a50dd97d414))
- **compilers:** render react-native component if it is the default export ([7db03f6](https://github.com/live-codes/livecodes/commit/7db03f6e39a05beb56d51c8d1798564b0f52536f))
- **compilers:** render Solid component if it is the default export ([4968f03](https://github.com/live-codes/livecodes/commit/4968f036b6062293d6580eab593f4a99cc83ea14))
- **compilers:** set typescript option { jsx: 'react-jsx' } ([e46450d](https://github.com/live-codes/livecodes/commit/e46450dd39919415e48896d27dd27ab66a69a417))
- **compilers:** set typescript option { jsx: 'react-jsx' } ([8793627](https://github.com/live-codes/livecodes/commit/87936277aae60e3d5d3d6ebb2f82d966eca5c709))
- **Config:** allow disabling JSX auto-render from custom settings ([20d5b5b](https://github.com/live-codes/livecodes/commit/20d5b5b768a0c60c259afb21b62c42c762cdb4d6))
- **Templates:** update react and jest-react starter templates to use the new jsx runtime ([2e5b9d1](https://github.com/live-codes/livecodes/commit/2e5b9d1d2e8af0c150426d57b249c8112477d5dc))
- **Types:** bundle types in the browser ([f9a7951](https://github.com/live-codes/livecodes/commit/f9a7951ef7b908dbe4b994f0230d30b037e41502))
- **UI:** add links to docs in language info ([0bf80a5](https://github.com/live-codes/livecodes/commit/0bf80a5d8576862ebac93c2c53471837ee1045f5))
- **UI:** add share button to toolbar ([9a1cb6d](https://github.com/live-codes/livecodes/commit/9a1cb6ded6156645ed88168ae8bb41cf5d7d516f))
- **UI:** use the new X/Twitter logo in share screen ([848db7e](https://github.com/live-codes/livecodes/commit/848db7e0db9d331f1fcb0445b5858098bb75cbe3))

---

## [v20](https://github.com/live-codes/livecodes/compare/v19...v20) (2024-01-17)

### Features

- **Editor:** support editor themes ([7eaafeb](https://github.com/live-codes/livecodes/commit/7eaafeb325164186e9c05af57ad255a554c6b909))
- **UI:** add buttons for project info and custom settings in editor toolbar ([e92a4f6](https://github.com/live-codes/livecodes/commit/e92a4f6924152730cc1294dcaf3fad3ffd628385))
- **UI:** add editor settings button to editor toolbar ([213cfc9](https://github.com/live-codes/livecodes/commit/213cfc955704a040b7bc4335e79380878804b328))

---

## [sdk-v0.4.0](https://github.com/live-codes/livecodes/compare/sdk-v0.3.0...sdk-v0.4.0) (2024-01-17)

### Features

- **SDK:** add `getPlaygroundUrl` function to SDK ([ef2105b](https://github.com/live-codes/livecodes/commit/ef2105bb773c09cf8e361a630e9b3e829256f44f))
- **SDK:** update options on changing props in react sdk ([0544540](https://github.com/live-codes/livecodes/commit/054454025d6ac9a605afc502f23120f4ba3f72da))
- **SDK:** update options on changing props in vue sdk ([04c8ae8](https://github.com/live-codes/livecodes/commit/04c8ae89e65c606c8715c53cc81cce7b4ebbcd17))

---

## [v19](https://github.com/live-codes/livecodes/compare/v18...v19) (2023-11-27)

### Bug Fixes

- **Templates:** fix solid template ([32732a0](https://github.com/live-codes/livecodes/commit/32732a0bc32a0660561d4d104379785877e755aa))

### Features

- **compilers:** upgrade Brython to v3.12.1 running Python v3.12 ([933f606](https://github.com/live-codes/livecodes/commit/933f606d960d9cea9b41534e944e6c2417902b77))
- **Types:** load types for imports from CDN URLs ([8d25463](https://github.com/live-codes/livecodes/commit/8d2546393591c49e1b698e707e731b2977ad8085))

---

## [v18](https://github.com/live-codes/livecodes/compare/v17...v18) (2023-11-26)

This release allows adding content to result page `head` (e.g. meta tags), and to set `html` element attributes using [`Config.head`](https://livecodes.io/docs/configuration/configuration-object#head) and [`Config.htmlAttrs`](https://livecodes.io/docs/configuration/configuration-object#htmlattrs).

Now shared projects preserve app config (e.g. open console).

Added [Lit starter template](https://livecodes.io/?template=lit).

Fixed rich text editor (broken CDN URL).

### Bug Fixes

- **compilers:** fix quill CDN url ([98381cc](https://github.com/live-codes/livecodes/commit/98381cc1bd5b339fb1c2a8c58e16cbca7bc9f217))

### Features

- **Config:** add `Config.head` and `Config.htmlAttrs` ([360f2fe](https://github.com/live-codes/livecodes/commit/360f2fe46151d58159b7567df0bb29b31033084e))
- **Share:** include AppConfig in shared projects ([9026101](https://github.com/live-codes/livecodes/commit/9026101c5059f3cc56c6a29d71a89e7ab4ecce53))
- **Templates:** add Lit starter template ([bc23a89](https://github.com/live-codes/livecodes/commit/bc23a899fb0fcf828ecf4d626686c98dde4fb8e6))
- **UI:** edit `head` and `htmlAttrs` from UI in Project Info screen ([394d464](https://github.com/live-codes/livecodes/commit/394d4641aeff709de3e235bca19d0a0adc699c70))

---

## [v17](https://github.com/live-codes/livecodes/compare/v16...v17) (2023-11-01)

### Bug Fixes

- **App:** fix autoupdate (if autotest is true) ([621c956](https://github.com/live-codes/livecodes/commit/621c9560dbca77c9fcb09cb03c3f5808465e0166))
- **Config:** fix setting config from SDK ([fb433f8](https://github.com/live-codes/livecodes/commit/fb433f89f0731f24d830b64f5d41a83ba4cadd5a))

### Features

- **functions:** oembed ([c2fe68d](https://github.com/live-codes/livecodes/commit/c2fe68d4b2b83bf36d0c57d02d36fdb87dc8eeca))
- **functions:** set meta tags ([561cbc7](https://github.com/live-codes/livecodes/commit/561cbc78c96c8c421a14bca66ffbbb03086e33f3))

---

## [v16](https://github.com/live-codes/livecodes/compare/v15...v16) (2023-10-27)

This release:

- Adds language support for WebAssembly versions of [Ruby](https://livecodes.io/docs/languages/ruby-wasm/), [Lua](https://livecodes.io/docs/languages/lua-wasm/) and [PHP](https://livecodes.io/docs/languages/php-wasm/).
- Allows [importing projects](https://livecodes.io/docs/features/import) from official TypeScript, Vue and Svelte playgrounds.
- Allows adding [hidden content](https://livecodes.io/docs/configuration/configuration-object#markup) to editors (code that is evaluated but not shown in the editors).
- Patches `python-wasm` (Pyodide) `input` to use browser `prompt`.
- Updates the light theme.
- Fixes a bug where the SDK method `setConfig` did not update [app settings](https://livecodes.io/docs/configuration/configuration-object#app-settings) and [user settings](https://livecodes.io/docs/configuration/configuration-object#user-settings).

In addition to various additions to documentations, and bug fixes.

### Bug Fixes

- **compilers:** do not reload pyodide if still loading ([c86d8ee](https://github.com/live-codes/livecodes/commit/c86d8eeada05031787058f0f97dc986d8e88a4c9))
- **SDK:** fix sdk prefill ([948f69e](https://github.com/live-codes/livecodes/commit/948f69e66d810dab0ae0a2dc7196f14ea897bf9e))
- **UI:** fix (copy-as-url) button colors ([9c813b2](https://github.com/live-codes/livecodes/commit/9c813b2e70b9eda9fd42f5179dce735c236f8dc5))
- **types:** fix types and pkg info for modules with CDN specifier ([7cdd9b2](https://github.com/live-codes/livecodes/commit/7cdd9b25b0c5180090a199f7156d3c2e487b775b))

### Features

- **compilers:** patch pyodide input ([4cff525](https://github.com/live-codes/livecodes/commit/4cff525d7450401a0b4500e2158d4dfa79f7f5e5))
- **Config:** allow adding hidden content ([8b1f347](https://github.com/live-codes/livecodes/commit/8b1f347ec4425b3ef75c7d5e7f9f1c4ac60380bc))
- **SDK:** apply config (app & editor configs) from SDK `setConfig` ([309ffb7](https://github.com/live-codes/livecodes/commit/309ffb794bac945e0eee7e6d85c3c419720c3839))
- **UI:** modify light theme ([eb62af7](https://github.com/live-codes/livecodes/commit/eb62af7cf1afb09b3e520c37697827aed697b857))
- **SDK:** add `flex-grow` to playground container and export type `Language` ([3de6805](https://github.com/live-codes/livecodes/commit/3de6805d3852a41b223df4a05a0784e27da03a67))
- **compilers:** add language `lua-wasm` using wasmoon ([832c8e6](https://github.com/live-codes/livecodes/commit/832c8e6ce61799766a93441f6decd809f793f16f))
- **compilers:** add support for php-wasm ([7cf8780](https://github.com/live-codes/livecodes/commit/7cf878010a1346c51f5149c995db4d68ccf532a2))
- **compilers:** add support for ruby-wasm ([0842d01](https://github.com/live-codes/livecodes/commit/0842d0150754f3aa87fc73172063d65180b710b7))
- **import:** allow importing typescript playground projects ([ced7678](https://github.com/live-codes/livecodes/commit/ced7678dfbd3417dd286920b0f540f114d91cce8))
- **import:** import from svelte playground ([a8d35e2](https://github.com/live-codes/livecodes/commit/a8d35e20727a554f9e392134ef30f0959ffa7a77))
- **import:** import from vue playground ([9406630](https://github.com/live-codes/livecodes/commit/94066306638c397781f50c0075f33e17447309a4))

---

## [sdk-v0.3.0](https://github.com/live-codes/livecodes/compare/sdk-v0.2.1...sdk-v0.3.0) (2023-10-27)

### Bug Fixes

- **compilers:** do not reload pyodide if still loading ([c86d8ee](https://github.com/live-codes/livecodes/commit/c86d8eeada05031787058f0f97dc986d8e88a4c9))
- **SDK:** fix sdk prefill ([948f69e](https://github.com/live-codes/livecodes/commit/948f69e66d810dab0ae0a2dc7196f14ea897bf9e))
- **UI:** fix (copy-as-url) button colors ([9c813b2](https://github.com/live-codes/livecodes/commit/9c813b2e70b9eda9fd42f5179dce735c236f8dc5))

### Features

- **compilers:** patch pyodide input ([4cff525](https://github.com/live-codes/livecodes/commit/4cff525d7450401a0b4500e2158d4dfa79f7f5e5))
- **Config:** allow adding hidden content ([8b1f347](https://github.com/live-codes/livecodes/commit/8b1f347ec4425b3ef75c7d5e7f9f1c4ac60380bc))
- **SDK:** apply config (app & editor configs) from SDK `setConfig` ([309ffb7](https://github.com/live-codes/livecodes/commit/309ffb794bac945e0eee7e6d85c3c419720c3839))
- **UI:** modify light theme ([eb62af7](https://github.com/live-codes/livecodes/commit/eb62af7cf1afb09b3e520c37697827aed697b857))

---

## [sdk-v0.2.1](https://github.com/live-codes/livecodes/compare/v15...sdk-v0.2.1) (2023-10-16)

This release mainly updates TypeScript type definitions.

### Bug Fixes

- **types:** fix types and pkg info for modules with CDN specifier ([7cdd9b2](https://github.com/live-codes/livecodes/commit/7cdd9b25b0c5180090a199f7156d3c2e487b775b))

### Features

- **SDK:** add `flex-grow` to playground container and export type `Language` ([3de6805](https://github.com/live-codes/livecodes/commit/3de6805d3852a41b223df4a05a0784e27da03a67))
- **compilers:** add language `lua-wasm` using wasmoon ([832c8e6](https://github.com/live-codes/livecodes/commit/832c8e6ce61799766a93441f6decd809f793f16f))
- **compilers:** add support for php-wasm ([7cf8780](https://github.com/live-codes/livecodes/commit/7cf878010a1346c51f5149c995db4d68ccf532a2))
- **compilers:** add support for ruby-wasm ([0842d01](https://github.com/live-codes/livecodes/commit/0842d0150754f3aa87fc73172063d65180b710b7))
- **import:** allow importing typescript playground projects ([ced7678](https://github.com/live-codes/livecodes/commit/ced7678dfbd3417dd286920b0f540f114d91cce8))
- **import:** import from svelte playground ([a8d35e2](https://github.com/live-codes/livecodes/commit/a8d35e20727a554f9e392134ef30f0959ffa7a77))
- **import:** import from vue playground ([9406630](https://github.com/live-codes/livecodes/commit/94066306638c397781f50c0075f33e17447309a4))

---

## [v15](https://github.com/live-codes/livecodes/compare/v14...v15) (2023-10-01)

This release improves R and Python(Pyodide) language support:

- upgrade versions
- significant performance improvements
- add docs

In addition:

- on deploy QR code is generated for the deploy URL
- QR code generated for share has LiveCodes logo
- various bug fixes

### Bug Fixes

- **export-share:** fix share screen on generating qrcode for short url ([7cbede4](https://github.com/live-codes/livecodes/commit/7cbede4de0d6a7f3efb1a9639db332581c281f66))
- **result:** avoid duplicate handlers in live reload ([bef4906](https://github.com/live-codes/livecodes/commit/bef49066931666cac9ec991c4d414f42ebfd74d5))
- **tests:** fix sending test results to SDK ([08d9bc0](https://github.com/live-codes/livecodes/commit/08d9bc0e9ba3f71f239a646177f5c4c3c85e7232))

### Features

- **compilers:** clean up pyodide state between reloads ([07fafe4](https://github.com/live-codes/livecodes/commit/07fafe4db275b63774afab3f245943c54f8a016e))
- **compilers:** expose R output and plots as `livecodes.r.output` and `livecodes.r.plots` ([707aa54](https://github.com/live-codes/livecodes/commit/707aa545810d30be7e639c971d6cfc681a9edef7))
- **compilers:** upgrade Pyodide to v0.24.0 ([ed1246d](https://github.com/live-codes/livecodes/commit/ed1246de6e7bd41cb885e97f1d141fc99cb2bee8)), closes [/pyodide.org/en/stable/project/changelog.html#version-0-24-0](https://github.com//pyodide.org/en/stable/project/changelog.html/issues/version-0-24-0)
- **compilers:** upgrade webr to v0.2.1 ([2f3b590](https://github.com/live-codes/livecodes/commit/2f3b590de629532bb24f80544a2ac7960bd1713d))
- **compilers:** use micropip in Pyodide ([2a96b0d](https://github.com/live-codes/livecodes/commit/2a96b0dbe6018a688d392dd580f8db9340705c95))
- **deploy:** generate QR code for deploy ([7391204](https://github.com/live-codes/livecodes/commit/7391204e8bc80a4d01d4292fe6a5ca9c4c2931cf))
- **export-share:** add logo to QR code and allow image download ([4fa21d9](https://github.com/live-codes/livecodes/commit/4fa21d94cd992210a3fbb80603937599f22a748b))

---

## [v14](https://github.com/live-codes/livecodes/compare/v13...v14) (2023-09-16)

This release improves running tests:

- Jest has been upgraded to latest version (v29.7). This includes support for newer Jest API features (e.g. `test.each`).
- Added `autotest` config option to allow auto-running tests on code changes.
- Show skipped tests, and mark the test result status as `skip`.

In addition, UI improvements and bug fixes have been added.

### Bug Fixes

- **sync:** fix `autosync` toggle not being saved in user data ([a52413e](https://github.com/live-codes/livecodes/commit/a52413ee3983f169396b461bc93c34549fcd1b07))
- **tools:** fix showing toolspane in result mode ([4ecfe83](https://github.com/live-codes/livecodes/commit/4ecfe83a17f600baba8961f2ec0c23dd6709bfe9))
- **tools:** show skipped tests ([5623c8e](https://github.com/live-codes/livecodes/commit/5623c8e1d3dff905070ab9ad96a77469284ff593))

### Features

- **config:** add `autotest` to `UserConfig` ([6fa16f2](https://github.com/live-codes/livecodes/commit/6fa16f2504e0f767d120d15d54f85e73d1fab2f8))
- **config:** update UI on loading new config ([0f63688](https://github.com/live-codes/livecodes/commit/0f636889953b2c8c0961b855592cdbac0983c2ad))
- **tests:** use browserJest ([d01989f](https://github.com/live-codes/livecodes/commit/d01989fc544e1249cc44be99f525917077e40909))
- **tools:** run `configureToolsPane` in `loadConfig` ([ef3aecb](https://github.com/live-codes/livecodes/commit/ef3aecba8bb0092024f406e59cc938697f03cee2))

---

## [v13](https://github.com/live-codes/livecodes/compare/sdk-v0.2.0...0.0.0) (2023-09-05)

This release adds support for [headless mode](https://livecodes.io/docs/sdk/headless). It also adds support to [watch](https://livecodes.io/docs/sdk/js-ts) for console output and test results.

AI code completion can be disallowed in embedded playgrounds using the query parameter `disableAI`.

Formatter is lazy loaded in embedded playgrounds only when used.

In addition, various bug fixes and performance improvements were made.

### Bug Fixes

- **app:** fix URL from "/app" to "/" ([09571c7](https://github.com/live-codes/livecodes/commit/09571c734067688af9f8fd360986c480e41b1956))
- fix url update on `loadConfig` e.g. recover ([3400bd7](https://github.com/live-codes/livecodes/commit/3400bd7fb694613fd1de21dac70589a143c67fe9))
- prevent using dev result for SDK code export ([6f4300e](https://github.com/live-codes/livecodes/commit/6f4300eacdf210e07807cfd51ec8e9c9d76985a9)), closes [#423](https://github.com/live-codes/livecodes/issues/423)

### Features

- **app:** allow disabling AI code completion ([c4c50f6](https://github.com/live-codes/livecodes/commit/c4c50f6aa43cca08986743a69591217093c8363c))
- **services:** use sandbox service v7 ([26cda26](https://github.com/live-codes/livecodes/commit/26cda26635ff03816a83d04e30b15288cdcbc510))

### Performance Improvements

- **formatter:** lazy load formatter ([7e73849](https://github.com/live-codes/livecodes/commit/7e738494c62b5dbd79e1484484e15d4634080522))
- mark pure utils & selector functions for tree shaking ([3fa8c91](https://github.com/live-codes/livecodes/commit/3fa8c912a8e4b4bc4175b0504e31b1326f4dfdf0))

---

## [sdk-v0.2.0](https://github.com/live-codes/livecodes/compare/v12...sdk-v0.2.0) (2023-09-05)

This release introduces [headless mode](https://livecodes.io/docs/sdk/headless). It also added support to [watch](https://livecodes.io/docs/sdk/js-ts) for various events including: playground load, console output and test results.

### DEPRECATION

- The SDK method `onChange` is deprecated in favor of the more generic `watch` method which, in addition to code changes, also supports watching for test results and console outputs.

### Bug Fixes

- **SDK:** fix race condition when calling SDK methods ([85ee589](https://github.com/live-codes/livecodes/commit/85ee589f1d475f17ffbb5021f98e2cf0725e1667))

### Features

- **SDK:** add support for headless playgrounds ([b312b88](https://github.com/live-codes/livecodes/commit/b312b881b85e24ff69f125d0a0cc8922f8352fea))
- **SDK:** allow SDK to watch for console output and test results ([69f3f04](https://github.com/live-codes/livecodes/commit/69f3f045dbc589a0ecebe17c8e2785c640f2da6b))

### Performance Improvements

- **SDK:** do not load visual features when headless ([dab8ae9](https://github.com/live-codes/livecodes/commit/dab8ae9cd7e6893ccb571540938f4be23285fad4))
- **SDK:** send data in custom SDK events only if being watched ([5810916](https://github.com/live-codes/livecodes/commit/58109167ce595cc9b87b68c7322fa30e99b290f9))

---

## [v12](https://github.com/live-codes/livecodes/compare/v11...v12) (2023-08-20)

### Bug Fixes

- **app:** fix app url ([ab0d55d](https://github.com/live-codes/livecodes/commit/ab0d55d03b22a9615b85b95ead41f8efc3d396f3))
- **docs:** fix docs links ([2114e1b](https://github.com/live-codes/livecodes/commit/2114e1b9efeff03f8d58cf096ef06512cde226b5))

---

## [v11](https://github.com/live-codes/livecodes/compare/v10...v11) (2023-08-18)

### Features

- **editor:** support codeium AI code assistant ([2949ccd](https://github.com/live-codes/livecodes/commit/2949ccd4edbfb997cbb75ed34587382c87434ab1))

---

## [v10](https://github.com/live-codes/livecodes/compare/sdk-v0.1.2...0.0.0) (2023-08-04)

### Bug Fixes

- `split.show` full on small screen ([2ce9067](https://github.com/live-codes/livecodes/commit/2ce906725159670b45a4d421e9abb73e9297f574))
- **compilers:** fix typo in julia public api ([06986df](https://github.com/live-codes/livecodes/commit/06986df4700219e3f28ef56fc7feeef17c1fd1e3))
- **editor:** fix editor position, let columns start at 1 ([47d0f90](https://github.com/live-codes/livecodes/commit/47d0f90a8ba76d82d7a89212d8c7d607dc4b6556))

### Features

- **editor:** upgrade codejar to v4.1.1 ([6d5327f](https://github.com/live-codes/livecodes/commit/6d5327f1e06a85ea6bf5220a2211172dd86197ab))

---

## [sdk-v0.1.2](https://github.com/live-codes/livecodes/compare/v9...sdk-v0.1.2) (2023-07-26)

### Bug Fixes

- **app:** update editor settings code sample to use react 18 ([fbae92a](https://github.com/live-codes/livecodes/commit/fbae92a22732f0fc851aac12042dea2e64f2483e))
- **console:** clear console silently on result page reload ([6137125](https://github.com/live-codes/livecodes/commit/61371257e1eccdcca17907b540d80c2654688867))
- **embed:** edit svelte embed snippet to clean up ([1da2b38](https://github.com/live-codes/livecodes/commit/1da2b38124a2dc11c96f55ac6e11aeb7e2f4a92a))
- **SDK:** add `type: "module"` to SDK ([2444cc5](https://github.com/live-codes/livecodes/commit/2444cc5edd46655ffb5a55c798d60489bc537d65))
- **SDK:** fix vue sdk types ([79068a3](https://github.com/live-codes/livecodes/commit/79068a39e30d018db845a7e603e78c86300e156a))

### Features

- **console:** upgrade luna console ([2a764d4](https://github.com/live-codes/livecodes/commit/2a764d4a9a85def8e385748830871c15f36aee6e))
- **editor:** upgrade codejar to v3.7.0 ([7d256eb](https://github.com/live-codes/livecodes/commit/7d256eb7cac423efe5a362da972d39c0a4f17258))
- **editor:** upgrade monaco editor to v0.40.0 ([d33aa5c](https://github.com/live-codes/livecodes/commit/d33aa5cc9e80d08cafbc28c25fa42ceaa1eb8b01))

---

## [v9](https://github.com/live-codes/livecodes/compare/sdk-v0.1.1...0.0.0) (2023-07-22)

### Bug Fixes

- **editor:** fix monaco menus overflow ([58a7f6a](https://github.com/live-codes/livecodes/commit/58a7f6accd5526dca21387f15a19d6c130d02f3c))
- **editor:** fix updating editor types ([f0576ff](https://github.com/live-codes/livecodes/commit/f0576ffd1abbdf4914094f01beba13c8c004c0e9))
- **SDK:** improve SDK types bundle ([75b919b](https://github.com/live-codes/livecodes/commit/75b919b1627b62ce2c36056e4e38d5362e9fd903))

### Features

- **app:** confirm before deleting user templates ([8176622](https://github.com/live-codes/livecodes/commit/817662295893cf5fc1bac766f6e10fe3cad68b85))
- **editor:** allow setting default types across all languages ([f60ea1a](https://github.com/live-codes/livecodes/commit/f60ea1adb413c0cc2d46703cfe2dec8b19812e23))
- **editor:** edit pkg info hover ([b728b97](https://github.com/live-codes/livecodes/commit/b728b9748d5c6e26d59199bc8d53919a21f97c91))

---

## [sdk-v0.1.1](https://github.com/live-codes/livecodes/compare/v8...sdk-v0.1.1) (2023-07-22)

### Bug Fixes

- **editor:** fix monaco menus overflow ([58a7f6a](https://github.com/live-codes/livecodes/commit/58a7f6accd5526dca21387f15a19d6c130d02f3c))
- **editor:** fix updating editor types ([f0576ff](https://github.com/live-codes/livecodes/commit/f0576ffd1abbdf4914094f01beba13c8c004c0e9))
- **SDK:** improve SDK types bundle ([75b919b](https://github.com/live-codes/livecodes/commit/75b919b1627b62ce2c36056e4e38d5362e9fd903))

### Features

- **app:** confirm before deleting user templates ([8176622](https://github.com/live-codes/livecodes/commit/817662295893cf5fc1bac766f6e10fe3cad68b85))
- **editor:** allow setting default types across all languages ([f60ea1a](https://github.com/live-codes/livecodes/commit/f60ea1adb413c0cc2d46703cfe2dec8b19812e23))
- **editor:** edit pkg info hover ([b728b97](https://github.com/live-codes/livecodes/commit/b728b9748d5c6e26d59199bc8d53919a21f97c91))

---

## [v8](https://github.com/live-codes/livecodes/compare/sdk-v0.1.0...0.0.0) (2023-07-22)

### Bug Fixes

- **import:** fix jsbin import regex ([78970e6](https://github.com/live-codes/livecodes/commit/78970e61ed5e56739cb368b6d12e5e5fc841553a))
-

### Features

- **app:** add `imports` property to custom settings editor if not added ([bf71760](https://github.com/live-codes/livecodes/commit/bf71760e9bcff64dda388303b697563641a70f4f))

---

## [sdk-v0.1.0](https://github.com/live-codes/livecodes/compare/v7...sdk-v0.1.0) (2023-07-22)

- **SDK:** fix SDK types ([d11fd8f](https://github.com/live-codes/livecodes/commit/d11fd8f171e81d1c072f7d964a5dd05db114bfe4))
- **SDK:** fix Vue SDK types ([ddf1e51](https://github.com/live-codes/livecodes/commit/ddf1e512028612c8a9717053c8d63e3f8a1c687b))

---

## [v7](https://github.com/live-codes/livecodes/compare/v6...v7) (2023-07-19)

- **CI**: fix deploy to gh-pages

---

## [v6](https://github.com/live-codes/livecodes/compare/sdk-v0.0.3...0.0.0) (2023-07-19)

- **CI**: fix deploy to gh-pages

---

## [sdk-v0.0.3](https://github.com/live-codes/livecodes/compare/v5...sdk-v0.0.3) (2023-07-19)

- **SDK:** fix race condition when loading from sdk ([bdc25f6](https://github.com/live-codes/livecodes/commit/bdc25f6ad7d85f015b3e6ccef35dcfa4ec0cf31d))
- **SDK:** fix sending config object from SDK ([457696f](https://github.com/live-codes/livecodes/commit/457696f92d99dbc1d2da13046ccda0c8aa0157f0))

---

## [v5](https://github.com/live-codes/livecodes/compare/v4...v5) (2023-07-19)

### Bug Fixes

- add `encodeURIComponent` to bookmarklet ([1171d30](https://github.com/live-codes/livecodes/commit/1171d30f58d024bc681b915e393b431a52fb74ee))
- **app:** fix a race condition ([a2da49b](https://github.com/live-codes/livecodes/commit/a2da49b919c08f5d0f35d20e55f63465f719dada))
- **app:** show formatter (enabled/disabled) in editor toolbar on changing editors ([0438deb](https://github.com/live-codes/livecodes/commit/0438deb35c45d859a9249a178f4f519937f53df2))
- **compilers:** map `svelte` import to `svelte/internal` ([bdb0d21](https://github.com/live-codes/livecodes/commit/bdb0d21a5818bd9be221a850f36f408764dd5e20))
- **compilers:** upgrade react in mdx ([5644a38](https://github.com/live-codes/livecodes/commit/5644a382a06e84c55a6663f8955f2f89299a2df4))
- **config:** fix loading user config ([b3983df](https://github.com/live-codes/livecodes/commit/b3983df79c8c89ce4727dece85029a0362546f52))
- **config:** validate config tools ([0698f9f](https://github.com/live-codes/livecodes/commit/0698f9f80636390b0142a2ce5c957f6c7d6c76ea))
- do not autorun result page if `config.autoupdate` is false ([3e1e405](https://github.com/live-codes/livecodes/commit/3e1e4054b44f34f3129f35eebae9dede118a34ed))
- do not treat safari as mobile ([f08ae93](https://github.com/live-codes/livecodes/commit/f08ae9317e5c51478e9389df7f165747b50ac3cb))
- do not use CDN for already bundled imports ([e5f3b50](https://github.com/live-codes/livecodes/commit/e5f3b50ecb62163554e967aebd9a5d0c55b024dd))
- **editor:** edit monaco `addCloseTag` regex to improve performance ([dd03a69](https://github.com/live-codes/livecodes/commit/dd03a696352b67871041758f380f7703f2f66775))
- fallback to blob url if data url is not supported as worker ([ea7ac04](https://github.com/live-codes/livecodes/commit/ea7ac0421d2a6467e2f8153e7e6e5ebc1c850631))
- **import:** show error for invalid template/import URL ([691afcf](https://github.com/live-codes/livecodes/commit/691afcfc93d36605950d7167bcad4ed46f29af7f))
- in `result` mode, hide toolspane by default ([e38128c](https://github.com/live-codes/livecodes/commit/e38128cb2322422282576bb1095074922d018ee0))
- **result:** improve console ([70106d7](https://github.com/live-codes/livecodes/commit/70106d7ee90281fe09064c1b44ca6136125f32cc))
- **UI:** do not double check saved status on new -> starter template ([8675b48](https://github.com/live-codes/livecodes/commit/8675b489510e996473c56f8be310864987f9f88f))
- **UI:** hide editors till they become active ([4d52cc7](https://github.com/live-codes/livecodes/commit/4d52cc7f6b3a65c1575cfa9cd5e07e331a09e713))
- use appCDN in result page scripts ([3d3923e](https://github.com/live-codes/livecodes/commit/3d3923e231af57878ec3a5736987dcb5f45f3466))
- use appCDN in sync worker ([9d20e4f](https://github.com/live-codes/livecodes/commit/9d20e4f062b70be4c9a9e632a7e66100b2add694))
- wait for slow e2e tests ([cb44e43](https://github.com/live-codes/livecodes/commit/cb44e4311112041f053860745ec63e99c9c1294c))
- **welcome:** improve welcome screen layout ([6b50c13](https://github.com/live-codes/livecodes/commit/6b50c1368ba0a1ab9f454e0c7c26dcdb62783e6f))

### Features

- **about:** add about screen ([a2f89b4](https://github.com/live-codes/livecodes/commit/a2f89b466764eea94427093268475a724c83dd65))
- allow `src` import in SFCs ([08189c0](https://github.com/live-codes/livecodes/commit/08189c00f2634eca9b112a82fd946c378a989898))
- allow deploying the app +/- docs to gh-pages ([0a33c8b](https://github.com/live-codes/livecodes/commit/0a33c8b3585b67eadee8f0e561306fc08e5e94e2))
- allow stylesheet import from CDNs ([1e51790](https://github.com/live-codes/livecodes/commit/1e517905825da505694835900f8dd2227f872f7e))
- allow using param `?new` as `?screen=new` ([d75f97b](https://github.com/live-codes/livecodes/commit/d75f97b9584f7b29521d94433e419069712dc5ce))
- **app:** copy code as data URL ([3ea5b04](https://github.com/live-codes/livecodes/commit/3ea5b0423870703bcc3cf79b84ce91ed69907ca5))
- **app:** if CDN is unreachable, fall back to next CDN ([6e72eb4](https://github.com/live-codes/livecodes/commit/6e72eb49fcb59fc23c13fe97af62053a49bcaaf4))
- **app:** loading spinner ([9a5385c](https://github.com/live-codes/livecodes/commit/9a5385c202fa8ebefa0230f8077d1003043807c4))
- **app:** show loading screen during recover ([6f710e3](https://github.com/live-codes/livecodes/commit/6f710e3d05d91893c4f27d7e80c16ba4b5304767))
- **compilers:** add `lang` attribute for sfc src imports ([63e4dc6](https://github.com/live-codes/livecodes/commit/63e4dc6b6ac435a97f793cc9304a0cecba8126bd))
- **compilers:** add ClojureScript support ([2a4d723](https://github.com/live-codes/livecodes/commit/2a4d723c5d4b859b9e53f23021fec8bbb9585a85))
- **compilers:** add jsx support in vue sfc ([2c76b47](https://github.com/live-codes/livecodes/commit/2c76b47906f2ddd831f634b489aa28d988f59bc7))
- **compilers:** allow generating import maps during compile ([1bba4d2](https://github.com/live-codes/livecodes/commit/1bba4d208dd4719de0eba2cf68131f1944497d85))
- **compilers:** allow importing remote vue sfc ([406c6c6](https://github.com/live-codes/livecodes/commit/406c6c60af9af0991822b9cdcc570bcfbc63aff9))
- **compilers:** allow recursive imports in vue sfc ([b438e0b](https://github.com/live-codes/livecodes/commit/b438e0b60150deebb9b362e36fbbe3b57ca9f450))
- **compilers:** allow svelte SFC to import and compile other SFCs ([9d5ca48](https://github.com/live-codes/livecodes/commit/9d5ca48ec70c32ec02dd340957f2c820f41df931))
- **compilers:** do not inline remote style imports by default ([3e38335](https://github.com/live-codes/livecodes/commit/3e38335bdd82c8d307ec9f734358ea72e570e203))
- **compilers:** retry loading rescript compiler if failed ([1e8562f](https://github.com/live-codes/livecodes/commit/1e8562f700ce76a728df9b0ca13b070205cd86d1))
- **compilers:** support css modules in vue sfc ([6169f34](https://github.com/live-codes/livecodes/commit/6169f34a4ae319911e5a133dbda4ad4dcd046a11))
- **compilers:** use official vue SFC compiler for vue 3 ([c82ef76](https://github.com/live-codes/livecodes/commit/c82ef769e1db1701a978b306c0fafeaff0be044b))
- **config:** use default language if invalid ([c2c4b22](https://github.com/live-codes/livecodes/commit/c2c4b228b776a8b36a692637deb38b66f6b80d03))
- **editor:** auto add close tag in monaco ([1cb0db7](https://github.com/live-codes/livecodes/commit/1cb0db790fc88102eef2e6db24a2223bc20f21d8))
- **embed:** allow selecting active tool in embed screen ([c66b476](https://github.com/live-codes/livecodes/commit/c66b4769b59e9347964c16823b01b2057dc98206))
- **embed:** embed as Svelte ([707f48d](https://github.com/live-codes/livecodes/commit/707f48d0ee5c5c0e319ee0038396159a37b46677))
- **embed:** use permanent url by default for embeds ([c091ef9](https://github.com/live-codes/livecodes/commit/c091ef9307e7693436b592f464fbed1eca404e48))
- **export-share:** allow using permanent url in share ([906bcc5](https://github.com/live-codes/livecodes/commit/906bcc5cef7d213351671683c0873f920982e09d))
- **formatter:** upgrade @prettier/plugin-php to v0.19.6 ([13b5d8b](https://github.com/live-codes/livecodes/commit/13b5d8bc8992b66ede144ca999de2f36616a4ced))
- **formatter:** upgrade prettier to v3.0.0 ([b06d8bd](https://github.com/live-codes/livecodes/commit/b06d8bd6ba85450b563af6dd1f5ee20722ac4f46))
- **import:** import data url ([ab84f2f](https://github.com/live-codes/livecodes/commit/ab84f2fd11988d615ed5a1650abb60409b8874fe))
- **result:** allow importing stylesheets in script editor ([9bc077f](https://github.com/live-codes/livecodes/commit/9bc077f06351c8f800ff415b9dc0275390898b93))
- **result:** maintain result page scroll position on update ([0cea826](https://github.com/live-codes/livecodes/commit/0cea8265cc929cd90c2bde9d62a692e4eb01e26b)), closes [#297](https://github.com/live-codes/livecodes/issues/297)
- **services:** allow switching default CDN ([f5203cc](https://github.com/live-codes/livecodes/commit/f5203cc4701b57d6f1cf8d3a5b454a647db26754))
- **services:** provide permanent SDK url ([fa0d76a](https://github.com/live-codes/livecodes/commit/fa0d76a3266b3755363b63735c3d3b2f004fea62))
- **UI:** 2-column style menu ([13d5702](https://github.com/live-codes/livecodes/commit/13d57024de26a6d498d66d34aa0b22e992529ad5))
- **UI:** add cookie notice to login screen ([5c23a43](https://github.com/live-codes/livecodes/commit/5c23a4319071e6f679c0b5d49ea0883dcb4a724f))
- **welcome:** show recent projects above templates ([2c7b991](https://github.com/live-codes/livecodes/commit/2c7b991b61903addf5c4d89fd77d50265fbc134d))

---

## [4](https://github.com/live-codes/livecodes/compare/v3...v4) (2023-05-13)

---

## [3](https://github.com/live-codes/livecodes/compare/v0.4.0...v3) (2023-05-13)

### Bug Fixes

- add config imports to importmap ([63090d7](https://github.com/live-codes/livecodes/commit/63090d73f6c48025de671902cf5731a7412a1558))
- **API:** allow API to set full `Config` not just `ContentConfig` ([69ff21d](https://github.com/live-codes/livecodes/commit/69ff21d9417bbfd426d99bf490a8100668c6e412))
- **app:** add `es-module-shims` to app.html ([2c27485](https://github.com/live-codes/livecodes/commit/2c274853c0104e85d1badf0b92bb5378577e923a))
- **app:** avoid unnecessary run before importing external content ([d9d0499](https://github.com/live-codes/livecodes/commit/d9d04994b2918adc7889bf1d0e6cd879c89e7b07))
- **app:** do not load defaults (template/last used language) if language is specified in query params ([1c8da65](https://github.com/live-codes/livecodes/commit/1c8da65329c5e6ae5dddc8cd21d0c9419ab3d66f))
- **app:** fix export all sorting ([bbbaef8](https://github.com/live-codes/livecodes/commit/bbbaef8f6d5a55872f0c9c6f8d807ed9cdb24df7))
- **app:** fix loading user config ([fab4976](https://github.com/live-codes/livecodes/commit/fab49764a5aa23dcb9e9fdfb318762da11fa9604))
- **app:** fix security issues and unify UI ([c6e74fe](https://github.com/live-codes/livecodes/commit/c6e74feb3e225076b4c7ddfd12fbe84f9ad95ed5))
- **app:** if mode is codeblock, set config as readonly ([b972879](https://github.com/live-codes/livecodes/commit/b972879568ce23ca96b45735d0f46127f9ccc4b6))
- **app:** import external content on loading config ([4328d53](https://github.com/live-codes/livecodes/commit/4328d533d55693857817c866c043d7aa29067211))
- **backup:** handle the case of selecting no stores to backup ([754e6b7](https://github.com/live-codes/livecodes/commit/754e6b7e3d8e1da9e5b6755acb9dd459beef9320))
- cjs2esm ([cb609f2](https://github.com/live-codes/livecodes/commit/cb609f21e092e211faf45cbeccdff20776fda005))
- clean css duplicates ([d3873ef](https://github.com/live-codes/livecodes/commit/d3873ef9e10756a72b5bc72f7a338f8b40947745))
- **compilers:** fix diagrams compiler errors ([e5449a2](https://github.com/live-codes/livecodes/commit/e5449a23c372e915dba20f6fca385f693be5cde6))
- **compilers:** fix loading rich text projects ([ce3c894](https://github.com/live-codes/livecodes/commit/ce3c894710166ca7fc93d28750efebb8c6c15046))
- **config:** remove duplicates in config properties ([89e2a22](https://github.com/live-codes/livecodes/commit/89e2a22cd566417c16c55ff571d07b62b9b9b781))
- **editor:** fix codeblock and show line numbers ([093830a](https://github.com/live-codes/livecodes/commit/093830a9302a675125c77616380dcbf539df0bf7))
- **editor:** fix losing focus on format ([cc51883](https://github.com/live-codes/livecodes/commit/cc5188344afa609a58fd759db7c6d1074c3cf72e))
- **editor:** fix losing types on language change ([cd88f67](https://github.com/live-codes/livecodes/commit/cd88f67c2ed7a305fd77ab08aad60b890fba350d))
- **editor:** fix overriding monaco autocomplete overlay style ([28be0fd](https://github.com/live-codes/livecodes/commit/28be0fd42d47b4ada6716e4b6309a0015d15faf6))
- **embed:** avoid changing browser history in embeds ([8d1e21e](https://github.com/live-codes/livecodes/commit/8d1e21e92341e92b43ff2eb45c2a03cbd7d6ce5f))
- **embed:** fix logo link in result mode ([52b9466](https://github.com/live-codes/livecodes/commit/52b94660bf8ad46cbca1763a83ec5f0be1ad88ed))
- fix type imports ([d0fbf68](https://github.com/live-codes/livecodes/commit/d0fbf686462e7c5fc584974a50d51b3d31353669))
- hide duplicate tags (from sync) ([e60f162](https://github.com/live-codes/livecodes/commit/e60f1621cbd1f8b4f6eeeadf5fe8cc95042ee60d))
- inject css to fix FOUT in index.html ([4ceaf98](https://github.com/live-codes/livecodes/commit/4ceaf98661ea04743cce01988bbd26ac4fc814cd))
- move from UserData to AppData ([2ad2dc0](https://github.com/live-codes/livecodes/commit/2ad2dc0682aa135cb46ccb6ef8c277569d071ec2))
- **npm-package:** fix loading config object ([663941c](https://github.com/live-codes/livecodes/commit/663941c89c7e68c275da21813e531d89cb55fda0))
- postMessage origin for loading default template ([23cc869](https://github.com/live-codes/livecodes/commit/23cc8695482354686eaa8cc2a47ecb397278fbc8))
- **result:** fix converting `require` if used as method ([99c587a](https://github.com/live-codes/livecodes/commit/99c587a0e8c05fe9aa0268594078d47da72f3b7d))
- **result:** fix result flush ([d74a759](https://github.com/live-codes/livecodes/commit/d74a759e1f8bfe06025d5dee5419e3a2ac587e70))
- **result:** remove messaging script from result in exports ([e7415e0](https://github.com/live-codes/livecodes/commit/e7415e0ae5655c6e7541591e2dbb1f137a9807cd))
- **SDK:** prevent react SDK from rerendering ([d265d2a](https://github.com/live-codes/livecodes/commit/d265d2a60494d5489b80fa27226af85adc712ad7))
- **services:** fix share service ([67fe70a](https://github.com/live-codes/livecodes/commit/67fe70a665a320bce977d907c841d62eba474cce))
- **sync:** do not re-download unchanged remote sync data ([1a56d48](https://github.com/live-codes/livecodes/commit/1a56d4831193cafbb4ede9d6451fc1ca4ba87c08))
- **sync:** fix sync (cache and encoding) ([feec8d5](https://github.com/live-codes/livecodes/commit/feec8d57516109f028d3e5b88a00f74e9e6a93d0))
- **templates:** fix loading starter template from unsaved project ([2f09967](https://github.com/live-codes/livecodes/commit/2f09967da223d2de9f6db8bb851edf38a305e6b6))
- **tests:** fix chai assertion messages by importing chai from jsdelivr(+esm) ([0b9cef0](https://github.com/live-codes/livecodes/commit/0b9cef0ae1d91b81f8e513264d8d209927766b90))
- **tools:** fix firing onActivate on resizing tools pane ([6e26981](https://github.com/live-codes/livecodes/commit/6e26981bb8bcc2a540cd868c9bf6b5a98e4f2c8f))
- **UI:** disable autofocus in embeds ([b009f74](https://github.com/live-codes/livecodes/commit/b009f742d91e09018fe922c02023c98c604c8232))
- **UI:** fix focus on hidden editors ([2453121](https://github.com/live-codes/livecodes/commit/24531216309ddf9a8ff93feb57f9f6d5bea55511))
- **UI:** fix logo link ([b72ce80](https://github.com/live-codes/livecodes/commit/b72ce80844b599ca36926ab96408d38f855be3a8))
- **UI:** fix logo link ([7bbebe1](https://github.com/live-codes/livecodes/commit/7bbebe13b3661e0becb4f49e71e467751f2721f0))
- **UI:** fix multi-column submenu ([70b7e05](https://github.com/live-codes/livecodes/commit/70b7e050e7807d319c080c8a89a8424879045513))
- **UI:** fix settings menu external resources handler ([9bbd933](https://github.com/live-codes/livecodes/commit/9bbd93366bd4545779c7b869b63f152c57ade6c3))
- **UI:** remove formatting on paste to project title ([198e2b8](https://github.com/live-codes/livecodes/commit/198e2b84bf718748d2fc230f2c25b38fe67bf5ca))
- **web:** fix show code styles ([b714e4f](https://github.com/live-codes/livecodes/commit/b714e4f0eb32fb95f92af323dbdd03550f12d132))

### Features

- **API:** add `params` to `EmbedOptions` ([c084b3f](https://github.com/live-codes/livecodes/commit/c084b3ff4d2a2cb3d81737298ddf163b8d4d6301))
- **API:** add API method `destroy` ([c7a0d5b](https://github.com/live-codes/livecodes/commit/c7a0d5bb9a2e7c670ad809edc508a5c6617a942c))
- **API:** add API method `onChange` ([0e39347](https://github.com/live-codes/livecodes/commit/0e393472ae7b5555aefb9565a7532304f967ca55))
- **API:** allow going to specific line and column from API ([a3740c9](https://github.com/live-codes/livecodes/commit/a3740c991b0dad2204749e9704359a15a3f93930))
- **API:** allow running tests from API ([9917095](https://github.com/live-codes/livecodes/commit/9917095546ae18525bae8b8e5a01dd145e46c342))
- **API:** API watch changes ([9488ea1](https://github.com/live-codes/livecodes/commit/9488ea12b6d6cf0e259a4777e9a14798245ac510))
- **API:** load from API ([3e18357](https://github.com/live-codes/livecodes/commit/3e18357e83d369f09dc6eb6702a24aa64c867192))
- **API:** load on scroll ([e81ee4a](https://github.com/live-codes/livecodes/commit/e81ee4aa6b0cf7396d72b26489e23fb69fbb6338))
- **API:** show panes from API ([a53da9f](https://github.com/live-codes/livecodes/commit/a53da9f09f495126987d8bda0d26364e6b39940d))
- **app:** add `detectLanguage` utility function ([251bcc7](https://github.com/live-codes/livecodes/commit/251bcc7d0baedccfa8bbc46c05a4a7f47aae0278))
- **app:** add pub/sub ([567c514](https://github.com/live-codes/livecodes/commit/567c514c12d809067b89f806db092484de13b1ab))
- **app:** allow adding local files as assets ([e12d249](https://github.com/live-codes/livecodes/commit/e12d249658ca1c5811c9a0558fd7480d6ff47789))
- **app:** allow partial matching in search ([84e3c35](https://github.com/live-codes/livecodes/commit/84e3c358e7bcf140369c60f4890c7bd1c4bebf69))
- **app:** emit change events ([8c025a9](https://github.com/live-codes/livecodes/commit/8c025a9faf67f361bd95af99fac9e4a8b00fb522))
- **app:** sandbox app iframe ([cbf2aad](https://github.com/live-codes/livecodes/commit/cbf2aad761c3cf938b3140e3067f728b33700a59))
- **app:** type-safe query params ([ccf533e](https://github.com/live-codes/livecodes/commit/ccf533edad155ea462c7e78fcbf124b8a01d31cb))
- **assets:** deploy assets to GitHub Pages ([13c833a](https://github.com/live-codes/livecodes/commit/13c833a50bab02c02a9bff4894da63bdea6b1754))
- **backup:** backup/restore UI (WIP) ([10c8f39](https://github.com/live-codes/livecodes/commit/10c8f39ff30ddd774c1971aabb7cb3aa8261a988))
- **backup:** implement backup ([1804557](https://github.com/live-codes/livecodes/commit/1804557daec3ffac022631eefadcd3442113c63c))
- **backup:** implement restore ([d71804c](https://github.com/live-codes/livecodes/commit/d71804caace1e1e3ed5c52c32ec0aec2a6ff09ac))
- **broadcast:** broadcast playground state ([4f394f4](https://github.com/live-codes/livecodes/commit/4f394f470df0d37a4f0ef8759139c8bd29bec03e))
- **broadcast:** broadcast result page and code to API ([78b1f7e](https://github.com/live-codes/livecodes/commit/78b1f7e2fbb87fd9dc50a4380e567102388fe97b))
- **broadcast:** inform the server that broadcast has stopped ([f0bfba4](https://github.com/live-codes/livecodes/commit/f0bfba4ec4cdb53d46b28f2af5216c574fba40a4))
- **broadcast:** provide a default broadcast service ([7023091](https://github.com/live-codes/livecodes/commit/7023091ae69e9dee2b6fea1c993fe3464c320665))
- **broadcast:** show broadcast status button in toolbar ([5693244](https://github.com/live-codes/livecodes/commit/5693244ec5081fd9c0788ebbb39ccf4d4d552750))
- **broadcast:** use channelToken ([9ded492](https://github.com/live-codes/livecodes/commit/9ded49279d588f29bf2505bdbf6454f45230209b))
- **compiled:** show python (brython) compiled code ([61fd514](https://github.com/live-codes/livecodes/commit/61fd5140e6aaa4deb55a2505a64dd7a239a3f358))
- **compilers:** add support for UnoCSS ([53e66d6](https://github.com/live-codes/livecodes/commit/53e66d641f45a11d28b18b66707cce91ca58cb6e))
- **compilers:** add Clang compiler for C/C++ ([040bb2e](https://github.com/live-codes/livecodes/commit/040bb2e0e457a2b0d7f350de5a9ba33c42e66073))
- **compilers:** add elkjs in diagram ([56c8630](https://github.com/live-codes/livecodes/commit/56c86305ae0f8f4cb766481ad673a4203518c410))
- **compilers:** add mjml language support ([70562b2](https://github.com/live-codes/livecodes/commit/70562b283a9b69e7247a09d2ea9cbbfd9719f66b))
- **compilers:** add R language support ([0747b71](https://github.com/live-codes/livecodes/commit/0747b71a4c2a26f85aae417a2f139907d6db0aa8))
- **compilers:** add R language support ([e3dca42](https://github.com/live-codes/livecodes/commit/e3dca42c43b5ad7e1795622342734fac4e6a7416))
- **compilers:** add support for art-template ([95da5fc](https://github.com/live-codes/livecodes/commit/95da5fcb2ed7bd6d0759a33066099fadfaadcaf0))
- **compilers:** add support for C++ ([d003ea5](https://github.com/live-codes/livecodes/commit/d003ea50472a1b0b9e7507d9e4efc5ba0cd2f1bc))
- **compilers:** add support for Clio ([8b4c4d9](https://github.com/live-codes/livecodes/commit/8b4c4d992789828144a969c4d982df0e79113b36))
- **compilers:** add support for common lisp ([f2efeb1](https://github.com/live-codes/livecodes/commit/f2efeb1174c9769f3d3973b3a67f8e8288a1c4a2))
- **compilers:** add support for cytoscape in diagram ([a9b1322](https://github.com/live-codes/livecodes/commit/a9b13224ca59f3236da40e6d5794d68d2308b490))
- **compilers:** add support for Eta ([1d1624d](https://github.com/live-codes/livecodes/commit/1d1624d3cc8a60c1031c882e34a11202a02099f1))
- **compilers:** add support for Fennel language ([764aecd](https://github.com/live-codes/livecodes/commit/764aecd7e5b06c60d19cccc1379015f022afe9d0))
- **compilers:** add support for flow ([6edbabe](https://github.com/live-codes/livecodes/commit/6edbabecc9a11d82396b72786a617239a7dc31ef))
- **compilers:** add support for Gnuplot ([e9acf92](https://github.com/live-codes/livecodes/commit/e9acf926b1135ecd3c87206ef319fc78e2ad76d9))
- **compilers:** add support for graphviz ([05da2fd](https://github.com/live-codes/livecodes/commit/05da2fd256dd3f1156d1a49e50beeadc738b4eb1))
- **compilers:** add support for imba ([f375c10](https://github.com/live-codes/livecodes/commit/f375c1076e9f079463daae78510fbbb4fe713acb))
- **compilers:** add support for Julia ([52d7ff0](https://github.com/live-codes/livecodes/commit/52d7ff020a8a65346afb4c8505431c6bb7d7848e))
- **compilers:** add support for Lightning CSS ([0d7bfe4](https://github.com/live-codes/livecodes/commit/0d7bfe445fbd17bd2a8c865c4ce19ad78a43ecf8))
- **compilers:** add support for Mustache ([ae12f3d](https://github.com/live-codes/livecodes/commit/ae12f3d063f1b13622cfe923282067d444db5bbf))
- **compilers:** add support for nomnoml ([504075f](https://github.com/live-codes/livecodes/commit/504075fb39e3de9d0f1bf405a595a04c8d495414))
- **compilers:** add support for plotly ([cb408be](https://github.com/live-codes/livecodes/commit/cb408be0e0d7b2b4ba9a09e21d306c619450f143))
- **compilers:** add support for Prolog using Tau Prolog ([8721824](https://github.com/live-codes/livecodes/commit/872182432f4ccf4a2b93b0acef912f80982b15d6))
- **compilers:** add support for Stylis ([9865f44](https://github.com/live-codes/livecodes/commit/9865f449bf0784410e8dbde79181863a95001e22))
- **compilers:** add support for Sucrase ([60b7e37](https://github.com/live-codes/livecodes/commit/60b7e37358b75606e54a75eb976bcf8fc26a3162))
- **compilers:** add support for svgbob ([6854d3b](https://github.com/live-codes/livecodes/commit/6854d3bcc74bd13f08e4dbbead8a16bd1b08cb61))
- **compilers:** add support for Tcl ([7786b8c](https://github.com/live-codes/livecodes/commit/7786b8c3f8d8e58392810796659919615c964429))
- **compilers:** add support for Token CSS ([00c8930](https://github.com/live-codes/livecodes/commit/00c89309f0b9ea6d51ea1e5573ffb3939401bf20))
- **compilers:** add support for vega and vega-lite ([fa0570f](https://github.com/live-codes/livecodes/commit/fa0570f5e5c7fb37133f307cda90d3babfdb06e6))
- **compilers:** add support for wavedrom ([3a0f3e8](https://github.com/live-codes/livecodes/commit/3a0f3e8c04896f8eb4882c7933e5ed610a291c16))
- **compilers:** add Teal language support ([82c6644](https://github.com/live-codes/livecodes/commit/82c66441c1814c1e0afbc34fb3773611e4ae23c4))
- **compilers:** allow compilers to return additional data `compileInfo` ([2ff9353](https://github.com/live-codes/livecodes/commit/2ff93530fe354c2b66791fe12c2138957b14f8b3))
- **compilers:** commonjs support ([87757d5](https://github.com/live-codes/livecodes/commit/87757d50954e8c663503652cc88d4b2d61869127))
- **compilers:** diagrams runOrContinue ([4635ece](https://github.com/live-codes/livecodes/commit/4635ecee8ac7484b36a2ddc2d62f8277731598c1))
- **compilers:** import css (including css modules) from script ([db3160f](https://github.com/live-codes/livecodes/commit/db3160fc9583cbc04df236da33efe1800fd7adea))
- **compilers:** reload the compiler sandbox page on repeated failure to load compiler ([3791fb9](https://github.com/live-codes/livecodes/commit/3791fb958ee7440928af87a372ccc7e91c7de72e))
- **compilers:** retry loading compiler on error ([c0c3dfd](https://github.com/live-codes/livecodes/commit/c0c3dfdce193ab9398d32a50dd112c338095c749))
- **compilers:** rich text editor for markup (using quill.js) ([e415f90](https://github.com/live-codes/livecodes/commit/e415f90f3abc08421355f6be64f451edf125e67f))
- **compilers:** upgrade mdx to v2.0 ([438a0da](https://github.com/live-codes/livecodes/commit/438a0dad0b39fc1893bfd265ec30522eeaf63b08))
- **compilers:** use dart-sass instead of sass.js ([313ebb3](https://github.com/live-codes/livecodes/commit/313ebb39fdcebe233520aed16b70745fea393532))
- **config:** add zoom to config ([1cd7973](https://github.com/live-codes/livecodes/commit/1cd7973df344210eaa2aba0902f4ce3ffb772d69))
- **config:** allow setting enabled tools and status from query param `tools` ([4796ba0](https://github.com/live-codes/livecodes/commit/4796ba0bce4350f20d5233c7ce566f5440c387d8))
- **config:** collect tools config under `config.tools` ([c02ef9c](https://github.com/live-codes/livecodes/commit/c02ef9cf0c1f34aefe4c8f91175e7b6f106a90c0))
- **config:** improve merging config from external content ([b5e4bf6](https://github.com/live-codes/livecodes/commit/b5e4bf6a6ae7707009327c9c1cdf36d969222f14))
- **config:** improve tools config (status) ([3a6f9e3](https://github.com/live-codes/livecodes/commit/3a6f9e363bddec6b4a7297ff5e80113b22833419))
- **console:** clear console on result update ([c7b47c0](https://github.com/live-codes/livecodes/commit/c7b47c05fe31acc91e2f7f963b39ce0796fb623a))
- **CSS Presets:** move CSS preset UI from app menu to external resources screen ([a052c8e](https://github.com/live-codes/livecodes/commit/a052c8e33e1af8b65ca8f810ff490f76b0f3f0a9))
- **CSS Presets:** remove `github-markdown-css` and `asciidoctor.css` from css presets ([88b4391](https://github.com/live-codes/livecodes/commit/88b43913158968db9aec7669f815f864e09554af))
- **deploy:** save project deploy repo ([b43126c](https://github.com/live-codes/livecodes/commit/b43126c50a532e47ed7e30e88c1a610d7b9216fe))
- **editor-settings:** add editor settings UI ([9187ad2](https://github.com/live-codes/livecodes/commit/9187ad2ab8ed411d20ed3202a4ebad0b2fa5e6b3))
- **editor-settings:** add more fonts ([ed5bd18](https://github.com/live-codes/livecodes/commit/ed5bd18feb16f4fb23473529ac8e0b947cccb5c4))
- **editor-settings:** allow changing editor fonts ([d728238](https://github.com/live-codes/livecodes/commit/d7282384590af9451f3f14759f7fc6966fee7185))
- **editor:** add `closeBrackets` to editor settings ([14008c5](https://github.com/live-codes/livecodes/commit/14008c526f044b2eb8674cfd4cbeab923b070aba))
- **editor:** add codejar key bindings ([f90bae8](https://github.com/live-codes/livecodes/commit/f90bae8c46a716106db138e3a4639945baeec3d0))
- **editor:** add codemirror-lang-vue ([cbc7e2d](https://github.com/live-codes/livecodes/commit/cbc7e2da0ed5ad2d83dc42fe48021dcb1f12c6e6))
- **editor:** add monaco support for wat ([97222be](https://github.com/live-codes/livecodes/commit/97222be398609a521d700c57d3ede1a7e2d9b1fe))
- **editor:** add vim and emacs modes to monaco ([75ad047](https://github.com/live-codes/livecodes/commit/75ad047c470429c5c892c2e91ed703b171f5af7e))
- **editor:** allow configuring editor settings ([df03806](https://github.com/live-codes/livecodes/commit/df0380666b63eff64f14a3edbdc0be5ff44ede24))
- **editor:** allow users to add custom types ([b466a73](https://github.com/live-codes/livecodes/commit/b466a73fed13a1fa593eb9637dd90c34f4d041cf))
- **editor:** create fake editor for use when `mode=result` ([478f280](https://github.com/live-codes/livecodes/commit/478f2804d0657296e91928afebb337740a037130))
- **editor:** enable custom editor commands (e.g. keyboard shortcuts) ([1ff4b9e](https://github.com/live-codes/livecodes/commit/1ff4b9ecf8f93de311c8a1e7eead3e82008949a5))
- **editor:** enable emmet for more languages ([9b2d6cc](https://github.com/live-codes/livecodes/commit/9b2d6cce8cdb9eec6083ed39482c4786ab9395b3))
- **editor:** goToLine in code editors ([f9b5ac7](https://github.com/live-codes/livecodes/commit/f9b5ac77f78d79c0f8adc39c1ebe9a83497f7a85))
- **editor:** italic comments ([d40ecdd](https://github.com/live-codes/livecodes/commit/d40ecdd1433ddbe75f18376f8b0b1580c30e39a4))
- **editor:** upgrade codemirror to v6 ([38bf731](https://github.com/live-codes/livecodes/commit/38bf7311bb8b5e5793f6135c1b32a4ca397cafe3))
- **editor:** use codejar as editor instead of prism ([acd72a6](https://github.com/live-codes/livecodes/commit/acd72a625ebe2b10e29250cbd1e3fd185889c38b))
- **editor:** use configurable codemirror basic setup ([078b7df](https://github.com/live-codes/livecodes/commit/078b7df2f245f7c169cde13e9d88815d977503d0))
- **editor:** use official emmet plugin for codemirror ([b765023](https://github.com/live-codes/livecodes/commit/b765023d864a9f7315eff03be492150a4fd835c9))
- **embed:** add embed preview ([fdf9aa0](https://github.com/live-codes/livecodes/commit/fdf9aa041592007b6450b244392b97f3e1835581))
- **embed:** add react and vue SDKs to embed screen ([2f6eef4](https://github.com/live-codes/livecodes/commit/2f6eef4fdabdb3909832c3ea4b73799e12b0ca84))
- **embed:** add UI for creating embeds ([1c6cbe8](https://github.com/live-codes/livecodes/commit/1c6cbe8be1a640473611ee9d6ecc51422c1d9137))
- **embed:** allow full screen for embeds ([5e3e54e](https://github.com/live-codes/livecodes/commit/5e3e54e8ed732332170da23606d4483bf1aac6db))
- **embed:** allow selecting active editor in embed UI ([b1e26a6](https://github.com/live-codes/livecodes/commit/b1e26a6ac4e5c3e450c200453a3609bd77e2c849))
- **embed:** change embed option `click-to-load` to `loading` ([032e1b1](https://github.com/live-codes/livecodes/commit/032e1b1e551c52493b8d9b7ca886d82a92220acd))
- **embed:** click to load embeds ([3c76ff8](https://github.com/live-codes/livecodes/commit/3c76ff815ee354228d86a5a1d2270e319a0e2735))
- **embed:** create a lite build ([50874c0](https://github.com/live-codes/livecodes/commit/50874c034810b7ada822706c9f4ebcd751a492f3))
- **embed:** do not allow access to storage and auth from embeds ([2961f70](https://github.com/live-codes/livecodes/commit/2961f70aeb443670a88074ccd85f0f43d0e1c373))
- **embed:** embed as html code in DOM ([ef70847](https://github.com/live-codes/livecodes/commit/ef70847c65da7f8ad335116241e194c3a5ccc840))
- **embed:** rename view mode `editor,result` to `split` ([4ffeeed](https://github.com/live-codes/livecodes/commit/4ffeeedaac4d5de74240150edd290af930c947da))
- **embed:** set as embed if loaded in iframe ([b60e92a](https://github.com/live-codes/livecodes/commit/b60e92a2775d3c576706c31502f5825a318ac289))
- **embed:** show embed preview ([d3fc4f1](https://github.com/live-codes/livecodes/commit/d3fc4f1dc03680e995a73cd72dde4c69e2274642))
- **embed:** use codejar in lite mode ([63d72c4](https://github.com/live-codes/livecodes/commit/63d72c4b13f46af412b20f4572714bcbb5bfc4b8))
- **export-share:** allow codepen export for unsupported languages ([957f698](https://github.com/live-codes/livecodes/commit/957f698774904c69675a5a49e89ed8ab38b9f16a))
- **export-share:** improve QR code UI ([68dd329](https://github.com/live-codes/livecodes/commit/68dd329172cc0f773d758529858a9b7e252bf52d))
- **export-share:** share using QR code ([34d1eb7](https://github.com/live-codes/livecodes/commit/34d1eb7b812cd1147d3ce20b7214989fc0dec34f))
- **formatter:** add formatter for common lisp and scheme ([a4786c9](https://github.com/live-codes/livecodes/commit/a4786c95c4c3a30e7580f46f3a5a0fc7b98be85c))
- **formatter:** add lua formatter ([84f273f](https://github.com/live-codes/livecodes/commit/84f273f5a93ef37f53af5e6e5cf5bfea8625082d))
- **formatter:** add sql formatter ([2c9b0f5](https://github.com/live-codes/livecodes/commit/2c9b0f59333bff6f96a699df7b0ae09767939f0a))
- **functions:** add server-side analytics ([3ee4fdc](https://github.com/live-codes/livecodes/commit/3ee4fdc98107534602920080da383a8a3a5bfbec))
- **import:** allow importing code from local files ([5fb211a](https://github.com/live-codes/livecodes/commit/5fb211a4c34186dc3f01f494f5dce82009eb65a0))
- **import:** allow importing code in zip file from UI ([14d8a5c](https://github.com/live-codes/livecodes/commit/14d8a5c7e7dd6dd369d3e44d79f45de5a18bcde4))
- **import:** allow importing code in zip file from url ([d528022](https://github.com/live-codes/livecodes/commit/d5280227e4bb85ac775971140631c2c2d52dbba7))
- **import:** import from CodePen ([9cc82bf](https://github.com/live-codes/livecodes/commit/9cc82bf70f796bafa6a77727d0c0a0b05d9ffbc0))
- **import:** import test file ([f166b29](https://github.com/live-codes/livecodes/commit/f166b290c1cd052e4e89f0e67f7f92cc3b9501d9))
- **import:** support esm imports for deno modules ([c062560](https://github.com/live-codes/livecodes/commit/c0625601d067a5f10f3daab45d6f0b32483b2ceb))
- **import:** support esm imports from github/gitlab/bitbucket/rawgit ([0443f14](https://github.com/live-codes/livecodes/commit/0443f14dce3f8e5913197221fbaf71e191b2a773))
- **import:** use language paramSelectors for DOM import ([aa43694](https://github.com/live-codes/livecodes/commit/aa43694ceb769618f120948f77a9bb7873dc54fe))
- **import:** use querystring `x` instead of hash for imports ([5257994](https://github.com/live-codes/livecodes/commit/5257994ad533a8d5613d775dab0a37dc0feefba8))
- **npm-package:** add `view` to `EmbedOptions` ([cc707ed](https://github.com/live-codes/livecodes/commit/cc707ed2375c5aab23ff8f5efd2e363da9fb37cc))
- **npm-package:** add library for embeds ([c94ccb2](https://github.com/live-codes/livecodes/commit/c94ccb22b74d0969b5a37326f27aa8065fa504dc))
- **npm-package:** allow using lite mode in library `EmbedOptions` ([6cb97f9](https://github.com/live-codes/livecodes/commit/6cb97f984d604cbd7fa330178967fef11ecb2323))
- **npm-package:** rename EmbedOptions['importUrl'] to EmbedOptions['import'] ([16507ec](https://github.com/live-codes/livecodes/commit/16507eca9b2b509b9ff9fac3e5a2cf1da6689066))
- **resources:** allow adding google fonts in external resources ([18c03e1](https://github.com/live-codes/livecodes/commit/18c03e167457b012e497079eb933498f7c18a8ad))
- **resources:** search packages ([20a6af6](https://github.com/live-codes/livecodes/commit/20a6af658fe408f6b20270d881cea1a7037ffa13))
- **result:** add custom settings to enable/disable mapping imports and commonjs ([4748dc9](https://github.com/live-codes/livecodes/commit/4748dc9b0dfc1557dca057cd540bd7a0e49ec3e1))
- **result:** allow adding head content and html classes to result page ([7ce6ddd](https://github.com/live-codes/livecodes/commit/7ce6dddf65d236654f90ee75c4f22f23233c93af))
- **result:** allow showing spacing in result page ([d3692ed](https://github.com/live-codes/livecodes/commit/d3692ed3625e5edb4bb87169cc3230cd4c0bb83a))
- **result:** allow users to add custom imports ([0fd471c](https://github.com/live-codes/livecodes/commit/0fd471cd3b4229685fd3910a9c6893ae2ddc5098))
- **result:** auto-update result popup ([ea6fbf1](https://github.com/live-codes/livecodes/commit/ea6fbf1079ecf3e45e8de9666868f5d318ecd766))
- **result:** import from './script' ([d538c7c](https://github.com/live-codes/livecodes/commit/d538c7cdb08d13965ab9cb9f05a2181bfbbc5202))
- **result:** import from './script' ([5e1f250](https://github.com/live-codes/livecodes/commit/5e1f2509f98309e50b88b414b299b7c5de0a3bf5))
- **result:** improve result display mode ([7bb0d59](https://github.com/live-codes/livecodes/commit/7bb0d590c239aef1434582a59cf5b31d46ddf70d))
- **result:** show result in new window ([95f26d0](https://github.com/live-codes/livecodes/commit/95f26d07a6803961958f29b57cf741ad2810611e))
- **result:** support bare modules in dynamic imports ([91ba4f6](https://github.com/live-codes/livecodes/commit/91ba4f69596b7aaa3f8e5438ff0a4579e3c81e52))
- **result:** use type="module" in module scripts ([1604082](https://github.com/live-codes/livecodes/commit/16040827863d947d62ecdf53fab6b75602b2685d))
- **SDK:** add react SDK ([a8f5822](https://github.com/live-codes/livecodes/commit/a8f5822bacf78a0911a03bffbc04a9e4f0f6b6d8))
- **SDK:** add react SDK ([ba275dd](https://github.com/live-codes/livecodes/commit/ba275ddd31834ac963f971b76bc4bd30261ad3d4))
- **SDK:** add types for vue SDK ([27a0592](https://github.com/live-codes/livecodes/commit/27a059278a455969cbd3e068672bfefa04483ac9))
- **SDK:** add types for vue SDK ([ae79a55](https://github.com/live-codes/livecodes/commit/ae79a55c2860a76b1b47a3f6b690b47f7abbeafc))
- **SDK:** add vue SDK ([eb55c90](https://github.com/live-codes/livecodes/commit/eb55c9028e14f78cbfddeb81f042bf68b7c668c8))
- **SDK:** add vue SDK ([7bcabb4](https://github.com/live-codes/livecodes/commit/7bcabb498741dc3621b7e30ae6761975c3913c89))
- **SDK:** allow accessing the Playground API from react SDK ([4495476](https://github.com/live-codes/livecodes/commit/4495476d45f3e11218ef7aed62b8c787b85017b5))
- **SDK:** allow accessing the Playground API from react SDK ([a96ad03](https://github.com/live-codes/livecodes/commit/a96ad0316bca2e37aa6fdd14c92aca248d068b75))
- **SDK:** allow accessing the Playground API from vue SDK ([8db0abc](https://github.com/live-codes/livecodes/commit/8db0abc2a9860488894420cf3c2916d38d9f5ceb))
- **SDK:** allow accessing the Playground API from vue SDK ([7e4f43f](https://github.com/live-codes/livecodes/commit/7e4f43f2471df9ee5173543f991f71184d38875d))
- **SDK:** apply default styles in JS/TS SDK ([75c7e90](https://github.com/live-codes/livecodes/commit/75c7e90e83ac2f4e3a154499684770b6c01a7f7a))
- **services:** add cors service for non-allowed origins ([b744588](https://github.com/live-codes/livecodes/commit/b744588acdfa82f1d206d5aa950d657224657d66))
- **services:** add jsdelivr package info service ([9438e04](https://github.com/live-codes/livecodes/commit/9438e043f87976219676aa35d95df8b2f5c42d4c))
- **services:** allow setting `defaultCDN` in `config.customSettings` ([5da02aa](https://github.com/live-codes/livecodes/commit/5da02aa0aaf9fb44bc0f6d8e8b0a4525812d33b2))
- **services:** support importing modules from github, gitlab and bitbucket via githack ([778b3ec](https://github.com/live-codes/livecodes/commit/778b3ec9e4ff9f92fb3a3fd2f5890946575c6f49))
- **services:** use api non-expiring share service ([f2b3593](https://github.com/live-codes/livecodes/commit/f2b35931c25ae889353f058dad670a67e5ab1a4b))
- **snippets:** add code snippets ([120dabe](https://github.com/live-codes/livecodes/commit/120dabe5d0ed44ba862c63848e827a57a4fe38a3))
- **storage:** allow subscription to changes in storage ([e824571](https://github.com/live-codes/livecodes/commit/e8245715863fcce75ca6ffc644ad8f36c02bbd9c))
- **storage:** load last used language ([e9e10eb](https://github.com/live-codes/livecodes/commit/e9e10eb952813829c5a97f4d9b7f2de551b8bd9c))
- **storage:** preserve user data across logout/login ([31856b1](https://github.com/live-codes/livecodes/commit/31856b1c2df4f0575248f76c5084de63328c3edc))
- **storage:** Request persistent storage ([88a6b19](https://github.com/live-codes/livecodes/commit/88a6b19a8701e82517709613e2a73d51293dda61))
- **storage:** user-specific stores ([e1c936e](https://github.com/live-codes/livecodes/commit/e1c936e0adcaf54a9ae5cdad981b4d3e626b553c))
- **Stories:** add storybook ([524d898](https://github.com/live-codes/livecodes/commit/524d898cef14fa02f7c47bec1290632c09befe3e))
- **Stories:** add storybook controls for config and embed options ([86799ec](https://github.com/live-codes/livecodes/commit/86799ec7d0aa8189b07b9c85b10fdb85a76e7be7))
- **sync:** communicate with SimpleStorage from web worker ([e6d9192](https://github.com/live-codes/livecodes/commit/e6d9192cabf7df4795799570b9646aa788a759df))
- **sync:** implement autosync ([2b811d3](https://github.com/live-codes/livecodes/commit/2b811d307d6679e8ac0249ae65f761fa7819bb61))
- **sync:** show sync status ([bbaf924](https://github.com/live-codes/livecodes/commit/bbaf92487d214f579ae53cab671f409afe79d03c))
- **templates:** add javascript starter template ([7b39c96](https://github.com/live-codes/livecodes/commit/7b39c96796b62b65c091fa693cafeb92824b0a5f))
- **templates:** add jest and jest/react starter templates ([43312b2](https://github.com/live-codes/livecodes/commit/43312b20939bceea2e57ebe3662a4ba0e7e51363))
- **templates:** add Julia starter template ([e3aeeae](https://github.com/live-codes/livecodes/commit/e3aeeae23a4d2676ecf7ce30adc7597aa3150f49))
- **templates:** add ocaml starter template ([f34d800](https://github.com/live-codes/livecodes/commit/f34d80077cc2f32ef770ee1d8a043d04493e5aa4))
- **templates:** add reason starter template ([426b06f](https://github.com/live-codes/livecodes/commit/426b06f36cc0c9d95a50fa41b8bbce97ecb5aeb8))
- **templates:** load default template ([4fd2925](https://github.com/live-codes/livecodes/commit/4fd2925907bcfa16460c242c154eb49a5d7400f6))
- **templates:** UI for selecting default template ([748ce28](https://github.com/live-codes/livecodes/commit/748ce283151aeee4b4cfd65125e8f3fcff7b4041))
- **templates:** upgrade react starter template to v18 ([2bbc595](https://github.com/live-codes/livecodes/commit/2bbc5955c545d7ddd1b50ba91cefe1a6a71d8d4e))
- **templates:** use signals in preact template ([4c92f7f](https://github.com/live-codes/livecodes/commit/4c92f7f9d96c2a3845503a9f472196337249c9d1))
- **tests:** add user tests to toolspane ([e54f2d8](https://github.com/live-codes/livecodes/commit/e54f2d8b573713ac225eaba60a3b2a813737a084))
- **tests:** add user tests to toolspane ([326bca1](https://github.com/live-codes/livecodes/commit/326bca11577990e5e53b1133d57eb3b935f5fe8c))
- **tests:** allow using chai assertions in tests ([dc1a630](https://github.com/live-codes/livecodes/commit/dc1a630d96810fa44f243874650a43764539a683))
- **tests:** compile user tests and map imports ([6ff5df6](https://github.com/live-codes/livecodes/commit/6ff5df6a9b09cc8dfb26848b11ef714484d3af8d))
- **tests:** compile user tests and map imports ([c7e0013](https://github.com/live-codes/livecodes/commit/c7e00135bbb4c576d06309f545fc90ef91fa27d2))
- **tests:** watch tests ([bb1823a](https://github.com/live-codes/livecodes/commit/bb1823a234e8bf3ccadf63eea4865a5ee5010c2d))
- **tests:** watch tests ([93e13fb](https://github.com/live-codes/livecodes/commit/93e13fb0593d0940f0006b3815603954fe47cc7b))
- **tools:** add zoom button ([59e3491](https://github.com/live-codes/livecodes/commit/59e349169ddecd99efdbeda8b110d59f2e14714a))
- **tools:** enable/disable tools in runtime ([a5518e4](https://github.com/live-codes/livecodes/commit/a5518e41fa3dd659f73d226240718b59039fea1f))
- **UI:** add close button for modals ([2ff3303](https://github.com/live-codes/livecodes/commit/2ff3303d55ff0543d16526dc19e92c37baaf907a))
- **UI:** add editor toolbar with buttons for common tasks ([6fed698](https://github.com/live-codes/livecodes/commit/6fed6981ee9d6c704dd750875478f03dacde110b))
- **UI:** add External Resources button to editor tools bar ([2ca095d](https://github.com/live-codes/livecodes/commit/2ca095d728acedbc66511a9a62d970f5c1ccff6b))
- **UI:** allow setting default view (via querystring `view`) to `editor` or `result` ([c54cf90](https://github.com/live-codes/livecodes/commit/c54cf90b495e9443d9c8308e919faae0b67c2e1b))
- **UI:** allow setting delay from app menu ([bf8e7c8](https://github.com/live-codes/livecodes/commit/bf8e7c833e3d8b6d2ae1922339690d5f73d934b8))
- **UI:** change 404 image ([bf89f44](https://github.com/live-codes/livecodes/commit/bf89f44e22de6d8c457abd5135743f17fa5c5507))
- **UI:** close modal on pressing `Esc` keyboard shortcut ([3a932ea](https://github.com/live-codes/livecodes/commit/3a932ea083292219889be7a31027932db97ef2c6))
- **UI:** decrease tools pane buttons padding to allow more space ([16bc167](https://github.com/live-codes/livecodes/commit/16bc167dce0b85841548cffd54a453300ecb60d8))
- **UI:** highlight selected language menu item ([83f73bb](https://github.com/live-codes/livecodes/commit/83f73bbe6262803b940b9b986aa69988190a67bd))
- **UI:** improve copy button UI ([97a8ea0](https://github.com/live-codes/livecodes/commit/97a8ea011f939b278c4f275690249d1994a27e7a))
- **UI:** improve menus layout ([0117141](https://github.com/live-codes/livecodes/commit/01171417d4fe71fbaa61b99bb64c0c3e3a62966b))
- **UI:** notify user when downloading a large compiler ([46f768c](https://github.com/live-codes/livecodes/commit/46f768cabc49cc5474e24386674c6de74078da13))
- **UI:** show backup/restore in progress message ([d13c4d3](https://github.com/live-codes/livecodes/commit/d13c4d37ab209c9f89866fd915ae34e81235877e))
- **UI:** show URL length in share screen ([35bd0d5](https://github.com/live-codes/livecodes/commit/35bd0d53161024122aa923069e01b4492bcae3ff))
- **UI:** use thin scrollbar ([6fb2d48](https://github.com/live-codes/livecodes/commit/6fb2d487e578fc367fe4b0088ed911117b45e912))
- **web:** add `OpenCode` component ([57ac7fc](https://github.com/live-codes/livecodes/commit/57ac7fc566dc88cc31838af10230a0ed35568ea2))
- **web:** add 404 page ([4cbf3ad](https://github.com/live-codes/livecodes/commit/4cbf3ad9d1da3b780e5307cb52d991c8d9875677))
- **web:** add code sample to homepage ([03d3963](https://github.com/live-codes/livecodes/commit/03d3963f20fadf3fb48f6969656030992f43472b))
- **web:** add docs website ([9cb490a](https://github.com/live-codes/livecodes/commit/9cb490a6fdaff501e9f78ae000248eeb5ea2c582))
- **web:** add Examples section ([a1f9422](https://github.com/live-codes/livecodes/commit/a1f9422200dbae06ea51457834adf121dc17fbf6))
- **web:** add link to starter templates on homepage ([4f7618c](https://github.com/live-codes/livecodes/commit/4f7618caaffdd0b7a4d804dfa7ebab01b7dea820))
- **web:** build website home page ([f07a13a](https://github.com/live-codes/livecodes/commit/f07a13a906d4564f8b840059c2cf52fb4a0e4821))
- **web:** format code samples ([168dacc](https://github.com/live-codes/livecodes/commit/168dacc3edf2dbef7f3278a6e963c056484b462f))
- **web:** show code for LiveCodes embed ([0dd9205](https://github.com/live-codes/livecodes/commit/0dd9205cabe5d57cf6976ab10497414d1eb2b024))
- **welcome:** add recent starter templates to welcome screen ([97cf8b8](https://github.com/live-codes/livecodes/commit/97cf8b8f843497c80a1a1cca20477d39391a6109))
- **welcome:** allow project recover from welcome screen ([15b6aff](https://github.com/live-codes/livecodes/commit/15b6affab5b0029761ff5fdb6a44ac97aa84d7d2))
- **welcome:** hide recover section after save or cancel ([a2c3bcc](https://github.com/live-codes/livecodes/commit/a2c3bccda55d8fdc554ead2bfc482714eb94d160))
- **welcome:** improve welcome screen UI ([391438c](https://github.com/live-codes/livecodes/commit/391438cbfdff6499b2dc7963b2e600f9499971d6))
- **welcome:** show recent projects in welcome screen ([52ee33a](https://github.com/live-codes/livecodes/commit/52ee33aa4888699c49dfa0381f259f37536156c5))
- **welcome:** show welcome screen ([1b34de9](https://github.com/live-codes/livecodes/commit/1b34de96894b92989ca6189d7b19980ec1eab0cd))

### Performance Improvements

- **app:** lazy load deploy UI ([6841e1e](https://github.com/live-codes/livecodes/commit/6841e1e811028d3c7cdbd5582a19b5ad53f80bd2))
- **app:** lazy load import UI ([02c1f23](https://github.com/live-codes/livecodes/commit/02c1f23829299cc8b4c7a2cbe97d8b02ec6e5fde))
- **app:** lazy load open (saved projects) screen ([cf6dc87](https://github.com/live-codes/livecodes/commit/cf6dc876fdb7eea8796e4f336431855c8cee8960))
- **app:** lazy load share UI ([e18559a](https://github.com/live-codes/livecodes/commit/e18559a07e7424ebd50178e2f2f7e11f1d34951f))
- **app:** lazy-load export ([404e534](https://github.com/live-codes/livecodes/commit/404e5343b10e564693bbaeb8e49d885cdcfd9a1b))
- **compilers:** improve tree-shaking ([d5e173b](https://github.com/live-codes/livecodes/commit/d5e173b1797e2e89c7d00c83e40234ccd0d9c321))
- **compilers:** lazy load assemblyscript ([77f61a3](https://github.com/live-codes/livecodes/commit/77f61a3fbec4e1bb34d46a3e5f5c74fd8015ff28))
- **compilers:** lazy load astro compiler ([fb37aee](https://github.com/live-codes/livecodes/commit/fb37aeedd3728ac82ab0071c24176a506f7dd51f))
- **compilers:** lazy load clang ([03cda20](https://github.com/live-codes/livecodes/commit/03cda204a3f4da7dd4f91129fdac3226761fc7b3))
- **compilers:** lazy load clio compiler ([3638a36](https://github.com/live-codes/livecodes/commit/3638a3684c81f5fb45e719c13a8824c28a72dd07))
- **compilers:** lazy load commonlisp ([b9a24ac](https://github.com/live-codes/livecodes/commit/b9a24ac95d6660549c02fe3b2a0c90cdf2debbb4))
- **compilers:** lazy load cpp ([a0e0852](https://github.com/live-codes/livecodes/commit/a0e08526e2bf34ea32bc39228fadb9bc07cc57cc))
- **compilers:** lazy load haml ([fdb7d0c](https://github.com/live-codes/livecodes/commit/fdb7d0c499e491fc066fd89195c14d3ab8d13a4a))
- **compilers:** lazy load handlebars ([e36dea5](https://github.com/live-codes/livecodes/commit/e36dea5a37e2bc841fc54df66d6d8f4b154bc16f))
- **compilers:** lazy load julia ([31e5ba9](https://github.com/live-codes/livecodes/commit/31e5ba9c2ff51becbee18dbb1d034687d0fc1659))
- **compilers:** lazy load liquid ([8411b6f](https://github.com/live-codes/livecodes/commit/8411b6f4aa33ca4d9c216ebef6638c7c6fd6de30))
- **compilers:** lazy load malina ([12c4601](https://github.com/live-codes/livecodes/commit/12c4601f0745c3948e8a6262e3e4bcd4dd4c0efb))
- **compilers:** lazy load mdx ([48db0b0](https://github.com/live-codes/livecodes/commit/48db0b08294516814ac3b619eacfe04f9d044fd2))
- **compilers:** lazy load mdx ([505218f](https://github.com/live-codes/livecodes/commit/505218f128eccf97adbf1dd7b49c922647a009ad))
- **compilers:** lazy load mustache ([8b93bd3](https://github.com/live-codes/livecodes/commit/8b93bd34fbbba8cd94007d0eed21bc7419dafd90))
- **compilers:** lazy load nunjucks ([88351a0](https://github.com/live-codes/livecodes/commit/88351a0141491b273350bb714910e38fc9f68cd8))
- **compilers:** lazy load perl ([bc07048](https://github.com/live-codes/livecodes/commit/bc07048ec49162270ae96262d0f05e533e11e935))
- **compilers:** lazy load processors ([09bcaaa](https://github.com/live-codes/livecodes/commit/09bcaaa72f05cee02369f85bb8b0ccf634290ea0))
- **compilers:** lazy load prolog ([01340f3](https://github.com/live-codes/livecodes/commit/01340f3f74a4b1c27d8833858b3a2b9a652554ca))
- **compilers:** lazy load pug ([f01941c](https://github.com/live-codes/livecodes/commit/f01941c3db5bdd0e2a70d8d940abbf51ac258039))
- **compilers:** lazy load pyodide ([3853603](https://github.com/live-codes/livecodes/commit/385360349751bd14725a00c76b9e66940cd2d3e9))
- **compilers:** lazy load rescript ([908eafc](https://github.com/live-codes/livecodes/commit/908eafc48d94350274321c1ffdb84e52984a9cd5))
- **compilers:** lazy load riot ([febae85](https://github.com/live-codes/livecodes/commit/febae85d4effb60d5a33d95717f48c04414e5ed8))
- **compilers:** lazy load scss ([93fbd01](https://github.com/live-codes/livecodes/commit/93fbd016c523f682b2eff558cc67012c4bdc3c89))
- **compilers:** lazy load solid ([a7a0764](https://github.com/live-codes/livecodes/commit/a7a07640de0819c485e7bab2b7526def551a11b9))
- **compilers:** lazy load sql ([ab3b613](https://github.com/live-codes/livecodes/commit/ab3b613d0ef23b70ba50bad9f21e013af17411e3))
- **compilers:** lazy load svelte ([73012d7](https://github.com/live-codes/livecodes/commit/73012d7bd852afc4908800fd60e1b5f86b08901d))
- **compilers:** lazy load tcl ([6414732](https://github.com/live-codes/livecodes/commit/641473287b4af7c1749367d12fcfed9ef973bca9))
- **compilers:** lazy load twig ([44dbf3b](https://github.com/live-codes/livecodes/commit/44dbf3bd0bacd04d49acd697195d5beac419089f))
- **compilers:** lazy load vue ([61c453a](https://github.com/live-codes/livecodes/commit/61c453a91dd15f81fb22f7dcc7bafc055109d9f8))
- **compilers:** lazy load wat ([3f88792](https://github.com/live-codes/livecodes/commit/3f88792bca4a645cb973d088034405e6e648d549))
- **compilers:** rename `graph` to `diagram` and lazy load it ([85a27f9](https://github.com/live-codes/livecodes/commit/85a27f9ea6284bf58be467b2012383555c9139a5))
- **compilers:** run Fennel compiler in web worker ([f8933ef](https://github.com/live-codes/livecodes/commit/f8933ef8050b4af70332266a69c1c04ce490bacd))
- **editor:** asynchronously highlight code in codejar ([8b3343f](https://github.com/live-codes/livecodes/commit/8b3343fd87ad349c4b6d2a605c9d68da4c6cbd39))
- **editor:** lazy-load codemirror languages and extensions ([6636b08](https://github.com/live-codes/livecodes/commit/6636b08758005b5cd36fdccffd74698c8f5d2cb0))
- **editor:** lazy-load custom monaco languages ([76369d3](https://github.com/live-codes/livecodes/commit/76369d3e43b0a0b630fca39d4ae94a7090dcecd9))
- **editor:** lazy-load prism languages ([b95c55b](https://github.com/live-codes/livecodes/commit/b95c55b6e66ec2113d54d133b2a993e0f646dad2))
- **editor:** remove language specs from editor bundles ([5f486a5](https://github.com/live-codes/livecodes/commit/5f486a512b59b665350b86ab5191c7652852cf3f))
- **editor:** use CodeJar/Prism by default when readonly ([2736a93](https://github.com/live-codes/livecodes/commit/2736a931db42a7a6b4cb63c3baa15b72669f6b32))
- **embed:** preload script ([24da929](https://github.com/live-codes/livecodes/commit/24da929304a450ce98d3cd06b84502958b000b6b))
- **functions:** cache versioned files ([b349cc5](https://github.com/live-codes/livecodes/commit/b349cc5089e246fdf5af9e7feb8070962b76ccf0))
- **sync:** compress sync files ([dc59a91](https://github.com/live-codes/livecodes/commit/dc59a91c42430372deb69920d8b681faffd96072))
- **sync:** move sync to web worker ([cad2123](https://github.com/live-codes/livecodes/commit/cad2123952cdf397d73c86286d4963bbcc8529cb))
- **templates:** load diagrams template markup from contentUrl ([827c06d](https://github.com/live-codes/livecodes/commit/827c06d354fb8e385876a7b6e2d508cfd8b14e52))

### Reverts

- Revert "build: upgrade storybook to v7" ([89b8b54](https://github.com/live-codes/livecodes/commit/89b8b540d46f12b5705145fa88d41e9cec286696))
- Revert "fix mdx" ([0c3aaae](https://github.com/live-codes/livecodes/commit/0c3aaae9d83df32a20567abed949365d6a2228cd))
- Revert "build(editor): load monaco from CDN" ([cd09133](https://github.com/live-codes/livecodes/commit/cd0913311e2d00dc134d0af0f71e498e7a314dfb))

---

## [22](https://github.com/live-codes/livecodes/compare/v0.4.0...v22) (2023-05-12)

### Bug Fixes

- add config imports to importmap ([63090d7](https://github.com/live-codes/livecodes/commit/63090d73f6c48025de671902cf5731a7412a1558))
- **API:** allow API to set full `Config` not just `ContentConfig` ([69ff21d](https://github.com/live-codes/livecodes/commit/69ff21d9417bbfd426d99bf490a8100668c6e412))
- **app:** add `es-module-shims` to app.html ([2c27485](https://github.com/live-codes/livecodes/commit/2c274853c0104e85d1badf0b92bb5378577e923a))
- **app:** avoid unnecessary run before importing external content ([d9d0499](https://github.com/live-codes/livecodes/commit/d9d04994b2918adc7889bf1d0e6cd879c89e7b07))
- **app:** do not load defaults (template/last used language) if language is specified in query params ([1c8da65](https://github.com/live-codes/livecodes/commit/1c8da65329c5e6ae5dddc8cd21d0c9419ab3d66f))
- **app:** fix export all sorting ([bbbaef8](https://github.com/live-codes/livecodes/commit/bbbaef8f6d5a55872f0c9c6f8d807ed9cdb24df7))
- **app:** fix loading user config ([fab4976](https://github.com/live-codes/livecodes/commit/fab49764a5aa23dcb9e9fdfb318762da11fa9604))
- **app:** fix security issues and unify UI ([c6e74fe](https://github.com/live-codes/livecodes/commit/c6e74feb3e225076b4c7ddfd12fbe84f9ad95ed5))
- **app:** if mode is codeblock, set config as readonly ([b972879](https://github.com/live-codes/livecodes/commit/b972879568ce23ca96b45735d0f46127f9ccc4b6))
- **app:** import external content on loading config ([4328d53](https://github.com/live-codes/livecodes/commit/4328d533d55693857817c866c043d7aa29067211))
- **backup:** handle the case of selecting no stores to backup ([754e6b7](https://github.com/live-codes/livecodes/commit/754e6b7e3d8e1da9e5b6755acb9dd459beef9320))
- cjs2esm ([cb609f2](https://github.com/live-codes/livecodes/commit/cb609f21e092e211faf45cbeccdff20776fda005))
- clean css duplicates ([d3873ef](https://github.com/live-codes/livecodes/commit/d3873ef9e10756a72b5bc72f7a338f8b40947745))
- **compilers:** fix diagrams compiler errors ([e5449a2](https://github.com/live-codes/livecodes/commit/e5449a23c372e915dba20f6fca385f693be5cde6))
- **compilers:** fix loading rich text projects ([ce3c894](https://github.com/live-codes/livecodes/commit/ce3c894710166ca7fc93d28750efebb8c6c15046))
- **config:** remove duplicates in config properties ([89e2a22](https://github.com/live-codes/livecodes/commit/89e2a22cd566417c16c55ff571d07b62b9b9b781))
- **editor:** fix codeblock and show line numbers ([093830a](https://github.com/live-codes/livecodes/commit/093830a9302a675125c77616380dcbf539df0bf7))
- **editor:** fix losing focus on format ([cc51883](https://github.com/live-codes/livecodes/commit/cc5188344afa609a58fd759db7c6d1074c3cf72e))
- **editor:** fix losing types on language change ([cd88f67](https://github.com/live-codes/livecodes/commit/cd88f67c2ed7a305fd77ab08aad60b890fba350d))
- **editor:** fix overriding monaco autocomplete overlay style ([28be0fd](https://github.com/live-codes/livecodes/commit/28be0fd42d47b4ada6716e4b6309a0015d15faf6))
- **embed:** avoid changing browser history in embeds ([8d1e21e](https://github.com/live-codes/livecodes/commit/8d1e21e92341e92b43ff2eb45c2a03cbd7d6ce5f))
- **embed:** fix logo link in result mode ([52b9466](https://github.com/live-codes/livecodes/commit/52b94660bf8ad46cbca1763a83ec5f0be1ad88ed))
- fix type imports ([d0fbf68](https://github.com/live-codes/livecodes/commit/d0fbf686462e7c5fc584974a50d51b3d31353669))
- hide duplicate tags (from sync) ([e60f162](https://github.com/live-codes/livecodes/commit/e60f1621cbd1f8b4f6eeeadf5fe8cc95042ee60d))
- inject css to fix FOUT in index.html ([4ceaf98](https://github.com/live-codes/livecodes/commit/4ceaf98661ea04743cce01988bbd26ac4fc814cd))
- move from UserData to AppData ([2ad2dc0](https://github.com/live-codes/livecodes/commit/2ad2dc0682aa135cb46ccb6ef8c277569d071ec2))
- **npm-package:** fix loading config object ([663941c](https://github.com/live-codes/livecodes/commit/663941c89c7e68c275da21813e531d89cb55fda0))
- postMessage origin for loading default template ([23cc869](https://github.com/live-codes/livecodes/commit/23cc8695482354686eaa8cc2a47ecb397278fbc8))
- **result:** fix converting `require` if used as method ([99c587a](https://github.com/live-codes/livecodes/commit/99c587a0e8c05fe9aa0268594078d47da72f3b7d))
- **result:** fix result flush ([d74a759](https://github.com/live-codes/livecodes/commit/d74a759e1f8bfe06025d5dee5419e3a2ac587e70))
- **result:** remove messaging script from result in exports ([e7415e0](https://github.com/live-codes/livecodes/commit/e7415e0ae5655c6e7541591e2dbb1f137a9807cd))
- **SDK:** prevent react SDK from rerendering ([d265d2a](https://github.com/live-codes/livecodes/commit/d265d2a60494d5489b80fa27226af85adc712ad7))
- **services:** fix share service ([67fe70a](https://github.com/live-codes/livecodes/commit/67fe70a665a320bce977d907c841d62eba474cce))
- **sync:** do not re-download unchanged remote sync data ([1a56d48](https://github.com/live-codes/livecodes/commit/1a56d4831193cafbb4ede9d6451fc1ca4ba87c08))
- **sync:** fix sync (cache and encoding) ([feec8d5](https://github.com/live-codes/livecodes/commit/feec8d57516109f028d3e5b88a00f74e9e6a93d0))
- **templates:** fix loading starter template from unsaved project ([2f09967](https://github.com/live-codes/livecodes/commit/2f09967da223d2de9f6db8bb851edf38a305e6b6))
- **tests:** fix chai assertion messages by importing chai from jsdelivr(+esm) ([0b9cef0](https://github.com/live-codes/livecodes/commit/0b9cef0ae1d91b81f8e513264d8d209927766b90))
- **tools:** fix firing onActivate on resizing tools pane ([6e26981](https://github.com/live-codes/livecodes/commit/6e26981bb8bcc2a540cd868c9bf6b5a98e4f2c8f))
- **UI:** disable autofocus in embeds ([b009f74](https://github.com/live-codes/livecodes/commit/b009f742d91e09018fe922c02023c98c604c8232))
- **UI:** fix focus on hidden editors ([2453121](https://github.com/live-codes/livecodes/commit/24531216309ddf9a8ff93feb57f9f6d5bea55511))
- **UI:** fix logo link ([b72ce80](https://github.com/live-codes/livecodes/commit/b72ce80844b599ca36926ab96408d38f855be3a8))
- **UI:** fix logo link ([7bbebe1](https://github.com/live-codes/livecodes/commit/7bbebe13b3661e0becb4f49e71e467751f2721f0))
- **UI:** fix multi-column submenu ([70b7e05](https://github.com/live-codes/livecodes/commit/70b7e050e7807d319c080c8a89a8424879045513))
- **UI:** fix settings menu external resources handler ([9bbd933](https://github.com/live-codes/livecodes/commit/9bbd93366bd4545779c7b869b63f152c57ade6c3))
- **UI:** remove formatting on paste to project title ([198e2b8](https://github.com/live-codes/livecodes/commit/198e2b84bf718748d2fc230f2c25b38fe67bf5ca))
- **web:** fix show code styles ([b714e4f](https://github.com/live-codes/livecodes/commit/b714e4f0eb32fb95f92af323dbdd03550f12d132))

### Features

- **API:** add `params` to `EmbedOptions` ([c084b3f](https://github.com/live-codes/livecodes/commit/c084b3ff4d2a2cb3d81737298ddf163b8d4d6301))
- **API:** add API method `destroy` ([c7a0d5b](https://github.com/live-codes/livecodes/commit/c7a0d5bb9a2e7c670ad809edc508a5c6617a942c))
- **API:** add API method `onChange` ([0e39347](https://github.com/live-codes/livecodes/commit/0e393472ae7b5555aefb9565a7532304f967ca55))
- **API:** allow going to specific line and column from API ([a3740c9](https://github.com/live-codes/livecodes/commit/a3740c991b0dad2204749e9704359a15a3f93930))
- **API:** allow running tests from API ([9917095](https://github.com/live-codes/livecodes/commit/9917095546ae18525bae8b8e5a01dd145e46c342))
- **API:** API watch changes ([9488ea1](https://github.com/live-codes/livecodes/commit/9488ea12b6d6cf0e259a4777e9a14798245ac510))
- **API:** load from API ([3e18357](https://github.com/live-codes/livecodes/commit/3e18357e83d369f09dc6eb6702a24aa64c867192))
- **API:** load on scroll ([e81ee4a](https://github.com/live-codes/livecodes/commit/e81ee4aa6b0cf7396d72b26489e23fb69fbb6338))
- **API:** show panes from API ([a53da9f](https://github.com/live-codes/livecodes/commit/a53da9f09f495126987d8bda0d26364e6b39940d))
- **app:** add `detectLanguage` utility function ([251bcc7](https://github.com/live-codes/livecodes/commit/251bcc7d0baedccfa8bbc46c05a4a7f47aae0278))
- **app:** add pub/sub ([567c514](https://github.com/live-codes/livecodes/commit/567c514c12d809067b89f806db092484de13b1ab))
- **app:** allow adding local files as assets ([e12d249](https://github.com/live-codes/livecodes/commit/e12d249658ca1c5811c9a0558fd7480d6ff47789))
- **app:** allow partial matching in search ([84e3c35](https://github.com/live-codes/livecodes/commit/84e3c358e7bcf140369c60f4890c7bd1c4bebf69))
- **app:** emit change events ([8c025a9](https://github.com/live-codes/livecodes/commit/8c025a9faf67f361bd95af99fac9e4a8b00fb522))
- **app:** sandbox app iframe ([cbf2aad](https://github.com/live-codes/livecodes/commit/cbf2aad761c3cf938b3140e3067f728b33700a59))
- **app:** type-safe query params ([ccf533e](https://github.com/live-codes/livecodes/commit/ccf533edad155ea462c7e78fcbf124b8a01d31cb))
- **assets:** deploy assets to GitHub Pages ([13c833a](https://github.com/live-codes/livecodes/commit/13c833a50bab02c02a9bff4894da63bdea6b1754))
- **backup:** backup/restore UI (WIP) ([10c8f39](https://github.com/live-codes/livecodes/commit/10c8f39ff30ddd774c1971aabb7cb3aa8261a988))
- **backup:** implement backup ([1804557](https://github.com/live-codes/livecodes/commit/1804557daec3ffac022631eefadcd3442113c63c))
- **backup:** implement restore ([d71804c](https://github.com/live-codes/livecodes/commit/d71804caace1e1e3ed5c52c32ec0aec2a6ff09ac))
- **broadcast:** broadcast playground state ([4f394f4](https://github.com/live-codes/livecodes/commit/4f394f470df0d37a4f0ef8759139c8bd29bec03e))
- **broadcast:** broadcast result page and code to API ([78b1f7e](https://github.com/live-codes/livecodes/commit/78b1f7e2fbb87fd9dc50a4380e567102388fe97b))
- **broadcast:** inform the server that broadcast has stopped ([f0bfba4](https://github.com/live-codes/livecodes/commit/f0bfba4ec4cdb53d46b28f2af5216c574fba40a4))
- **broadcast:** provide a default broadcast service ([7023091](https://github.com/live-codes/livecodes/commit/7023091ae69e9dee2b6fea1c993fe3464c320665))
- **broadcast:** show broadcast status button in toolbar ([5693244](https://github.com/live-codes/livecodes/commit/5693244ec5081fd9c0788ebbb39ccf4d4d552750))
- **broadcast:** use channelToken ([9ded492](https://github.com/live-codes/livecodes/commit/9ded49279d588f29bf2505bdbf6454f45230209b))
- **compiled:** show python (brython) compiled code ([61fd514](https://github.com/live-codes/livecodes/commit/61fd5140e6aaa4deb55a2505a64dd7a239a3f358))
- **compilers:** add support for UnoCSS ([53e66d6](https://github.com/live-codes/livecodes/commit/53e66d641f45a11d28b18b66707cce91ca58cb6e))
- **compilers:** add Clang compiler for C/C++ ([040bb2e](https://github.com/live-codes/livecodes/commit/040bb2e0e457a2b0d7f350de5a9ba33c42e66073))
- **compilers:** add elkjs in diagram ([56c8630](https://github.com/live-codes/livecodes/commit/56c86305ae0f8f4cb766481ad673a4203518c410))
- **compilers:** add mjml language support ([70562b2](https://github.com/live-codes/livecodes/commit/70562b283a9b69e7247a09d2ea9cbbfd9719f66b))
- **compilers:** add R language support ([0747b71](https://github.com/live-codes/livecodes/commit/0747b71a4c2a26f85aae417a2f139907d6db0aa8))
- **compilers:** add R language support ([e3dca42](https://github.com/live-codes/livecodes/commit/e3dca42c43b5ad7e1795622342734fac4e6a7416))
- **compilers:** add support for art-template ([95da5fc](https://github.com/live-codes/livecodes/commit/95da5fcb2ed7bd6d0759a33066099fadfaadcaf0))
- **compilers:** add support for C++ ([d003ea5](https://github.com/live-codes/livecodes/commit/d003ea50472a1b0b9e7507d9e4efc5ba0cd2f1bc))
- **compilers:** add support for Clio ([8b4c4d9](https://github.com/live-codes/livecodes/commit/8b4c4d992789828144a969c4d982df0e79113b36))
- **compilers:** add support for common lisp ([f2efeb1](https://github.com/live-codes/livecodes/commit/f2efeb1174c9769f3d3973b3a67f8e8288a1c4a2))
- **compilers:** add support for cytoscape in diagram ([a9b1322](https://github.com/live-codes/livecodes/commit/a9b13224ca59f3236da40e6d5794d68d2308b490))
- **compilers:** add support for Eta ([1d1624d](https://github.com/live-codes/livecodes/commit/1d1624d3cc8a60c1031c882e34a11202a02099f1))
- **compilers:** add support for Fennel language ([764aecd](https://github.com/live-codes/livecodes/commit/764aecd7e5b06c60d19cccc1379015f022afe9d0))
- **compilers:** add support for flow ([6edbabe](https://github.com/live-codes/livecodes/commit/6edbabecc9a11d82396b72786a617239a7dc31ef))
- **compilers:** add support for Gnuplot ([e9acf92](https://github.com/live-codes/livecodes/commit/e9acf926b1135ecd3c87206ef319fc78e2ad76d9))
- **compilers:** add support for graphviz ([05da2fd](https://github.com/live-codes/livecodes/commit/05da2fd256dd3f1156d1a49e50beeadc738b4eb1))
- **compilers:** add support for imba ([f375c10](https://github.com/live-codes/livecodes/commit/f375c1076e9f079463daae78510fbbb4fe713acb))
- **compilers:** add support for Julia ([52d7ff0](https://github.com/live-codes/livecodes/commit/52d7ff020a8a65346afb4c8505431c6bb7d7848e))
- **compilers:** add support for Lightning CSS ([0d7bfe4](https://github.com/live-codes/livecodes/commit/0d7bfe445fbd17bd2a8c865c4ce19ad78a43ecf8))
- **compilers:** add support for Mustache ([ae12f3d](https://github.com/live-codes/livecodes/commit/ae12f3d063f1b13622cfe923282067d444db5bbf))
- **compilers:** add support for nomnoml ([504075f](https://github.com/live-codes/livecodes/commit/504075fb39e3de9d0f1bf405a595a04c8d495414))
- **compilers:** add support for plotly ([cb408be](https://github.com/live-codes/livecodes/commit/cb408be0e0d7b2b4ba9a09e21d306c619450f143))
- **compilers:** add support for Prolog using Tau Prolog ([8721824](https://github.com/live-codes/livecodes/commit/872182432f4ccf4a2b93b0acef912f80982b15d6))
- **compilers:** add support for Stylis ([9865f44](https://github.com/live-codes/livecodes/commit/9865f449bf0784410e8dbde79181863a95001e22))
- **compilers:** add support for Sucrase ([60b7e37](https://github.com/live-codes/livecodes/commit/60b7e37358b75606e54a75eb976bcf8fc26a3162))
- **compilers:** add support for svgbob ([6854d3b](https://github.com/live-codes/livecodes/commit/6854d3bcc74bd13f08e4dbbead8a16bd1b08cb61))
- **compilers:** add support for Tcl ([7786b8c](https://github.com/live-codes/livecodes/commit/7786b8c3f8d8e58392810796659919615c964429))
- **compilers:** add support for Token CSS ([00c8930](https://github.com/live-codes/livecodes/commit/00c89309f0b9ea6d51ea1e5573ffb3939401bf20))
- **compilers:** add support for vega and vega-lite ([fa0570f](https://github.com/live-codes/livecodes/commit/fa0570f5e5c7fb37133f307cda90d3babfdb06e6))
- **compilers:** add support for wavedrom ([3a0f3e8](https://github.com/live-codes/livecodes/commit/3a0f3e8c04896f8eb4882c7933e5ed610a291c16))
- **compilers:** add Teal language support ([82c6644](https://github.com/live-codes/livecodes/commit/82c66441c1814c1e0afbc34fb3773611e4ae23c4))
- **compilers:** allow compilers to return additional data `compileInfo` ([2ff9353](https://github.com/live-codes/livecodes/commit/2ff93530fe354c2b66791fe12c2138957b14f8b3))
- **compilers:** commonjs support ([87757d5](https://github.com/live-codes/livecodes/commit/87757d50954e8c663503652cc88d4b2d61869127))
- **compilers:** diagrams runOrContinue ([4635ece](https://github.com/live-codes/livecodes/commit/4635ecee8ac7484b36a2ddc2d62f8277731598c1))
- **compilers:** import css (including css modules) from script ([db3160f](https://github.com/live-codes/livecodes/commit/db3160fc9583cbc04df236da33efe1800fd7adea))
- **compilers:** reload the compiler sandbox page on repeated failure to load compiler ([3791fb9](https://github.com/live-codes/livecodes/commit/3791fb958ee7440928af87a372ccc7e91c7de72e))
- **compilers:** retry loading compiler on error ([c0c3dfd](https://github.com/live-codes/livecodes/commit/c0c3dfdce193ab9398d32a50dd112c338095c749))
- **compilers:** rich text editor for markup (using quill.js) ([e415f90](https://github.com/live-codes/livecodes/commit/e415f90f3abc08421355f6be64f451edf125e67f))
- **compilers:** upgrade mdx to v2.0 ([438a0da](https://github.com/live-codes/livecodes/commit/438a0dad0b39fc1893bfd265ec30522eeaf63b08))
- **compilers:** use dart-sass instead of sass.js ([313ebb3](https://github.com/live-codes/livecodes/commit/313ebb39fdcebe233520aed16b70745fea393532))
- **config:** add zoom to config ([1cd7973](https://github.com/live-codes/livecodes/commit/1cd7973df344210eaa2aba0902f4ce3ffb772d69))
- **config:** allow setting enabled tools and status from query param `tools` ([4796ba0](https://github.com/live-codes/livecodes/commit/4796ba0bce4350f20d5233c7ce566f5440c387d8))
- **config:** collect tools config under `config.tools` ([c02ef9c](https://github.com/live-codes/livecodes/commit/c02ef9cf0c1f34aefe4c8f91175e7b6f106a90c0))
- **config:** improve merging config from external content ([b5e4bf6](https://github.com/live-codes/livecodes/commit/b5e4bf6a6ae7707009327c9c1cdf36d969222f14))
- **config:** improve tools config (status) ([3a6f9e3](https://github.com/live-codes/livecodes/commit/3a6f9e363bddec6b4a7297ff5e80113b22833419))
- **console:** clear console on result update ([c7b47c0](https://github.com/live-codes/livecodes/commit/c7b47c05fe31acc91e2f7f963b39ce0796fb623a))
- **CSS Presets:** move CSS preset UI from app menu to external resources screen ([a052c8e](https://github.com/live-codes/livecodes/commit/a052c8e33e1af8b65ca8f810ff490f76b0f3f0a9))
- **CSS Presets:** remove `github-markdown-css` and `asciidoctor.css` from css presets ([88b4391](https://github.com/live-codes/livecodes/commit/88b43913158968db9aec7669f815f864e09554af))
- **deploy:** save project deploy repo ([b43126c](https://github.com/live-codes/livecodes/commit/b43126c50a532e47ed7e30e88c1a610d7b9216fe))
- **editor-settings:** add editor settings UI ([9187ad2](https://github.com/live-codes/livecodes/commit/9187ad2ab8ed411d20ed3202a4ebad0b2fa5e6b3))
- **editor-settings:** add more fonts ([ed5bd18](https://github.com/live-codes/livecodes/commit/ed5bd18feb16f4fb23473529ac8e0b947cccb5c4))
- **editor-settings:** allow changing editor fonts ([d728238](https://github.com/live-codes/livecodes/commit/d7282384590af9451f3f14759f7fc6966fee7185))
- **editor:** add `closeBrackets` to editor settings ([14008c5](https://github.com/live-codes/livecodes/commit/14008c526f044b2eb8674cfd4cbeab923b070aba))
- **editor:** add codejar key bindings ([f90bae8](https://github.com/live-codes/livecodes/commit/f90bae8c46a716106db138e3a4639945baeec3d0))
- **editor:** add codemirror-lang-vue ([cbc7e2d](https://github.com/live-codes/livecodes/commit/cbc7e2da0ed5ad2d83dc42fe48021dcb1f12c6e6))
- **editor:** add monaco support for wat ([97222be](https://github.com/live-codes/livecodes/commit/97222be398609a521d700c57d3ede1a7e2d9b1fe))
- **editor:** add vim and emacs modes to monaco ([75ad047](https://github.com/live-codes/livecodes/commit/75ad047c470429c5c892c2e91ed703b171f5af7e))
- **editor:** allow configuring editor settings ([df03806](https://github.com/live-codes/livecodes/commit/df0380666b63eff64f14a3edbdc0be5ff44ede24))
- **editor:** allow users to add custom types ([b466a73](https://github.com/live-codes/livecodes/commit/b466a73fed13a1fa593eb9637dd90c34f4d041cf))
- **editor:** create fake editor for use when `mode=result` ([478f280](https://github.com/live-codes/livecodes/commit/478f2804d0657296e91928afebb337740a037130))
- **editor:** enable custom editor commands (e.g. keyboard shortcuts) ([1ff4b9e](https://github.com/live-codes/livecodes/commit/1ff4b9ecf8f93de311c8a1e7eead3e82008949a5))
- **editor:** enable emmet for more languages ([9b2d6cc](https://github.com/live-codes/livecodes/commit/9b2d6cce8cdb9eec6083ed39482c4786ab9395b3))
- **editor:** goToLine in code editors ([f9b5ac7](https://github.com/live-codes/livecodes/commit/f9b5ac77f78d79c0f8adc39c1ebe9a83497f7a85))
- **editor:** italic comments ([d40ecdd](https://github.com/live-codes/livecodes/commit/d40ecdd1433ddbe75f18376f8b0b1580c30e39a4))
- **editor:** upgrade codemirror to v6 ([38bf731](https://github.com/live-codes/livecodes/commit/38bf7311bb8b5e5793f6135c1b32a4ca397cafe3))
- **editor:** use codejar as editor instead of prism ([acd72a6](https://github.com/live-codes/livecodes/commit/acd72a625ebe2b10e29250cbd1e3fd185889c38b))
- **editor:** use configurable codemirror basic setup ([078b7df](https://github.com/live-codes/livecodes/commit/078b7df2f245f7c169cde13e9d88815d977503d0))
- **editor:** use official emmet plugin for codemirror ([b765023](https://github.com/live-codes/livecodes/commit/b765023d864a9f7315eff03be492150a4fd835c9))
- **embed:** add embed preview ([fdf9aa0](https://github.com/live-codes/livecodes/commit/fdf9aa041592007b6450b244392b97f3e1835581))
- **embed:** add react and vue SDKs to embed screen ([2f6eef4](https://github.com/live-codes/livecodes/commit/2f6eef4fdabdb3909832c3ea4b73799e12b0ca84))
- **embed:** add UI for creating embeds ([1c6cbe8](https://github.com/live-codes/livecodes/commit/1c6cbe8be1a640473611ee9d6ecc51422c1d9137))
- **embed:** allow full screen for embeds ([5e3e54e](https://github.com/live-codes/livecodes/commit/5e3e54e8ed732332170da23606d4483bf1aac6db))
- **embed:** allow selecting active editor in embed UI ([b1e26a6](https://github.com/live-codes/livecodes/commit/b1e26a6ac4e5c3e450c200453a3609bd77e2c849))
- **embed:** change embed option `click-to-load` to `loading` ([032e1b1](https://github.com/live-codes/livecodes/commit/032e1b1e551c52493b8d9b7ca886d82a92220acd))
- **embed:** click to load embeds ([3c76ff8](https://github.com/live-codes/livecodes/commit/3c76ff815ee354228d86a5a1d2270e319a0e2735))
- **embed:** create a lite build ([50874c0](https://github.com/live-codes/livecodes/commit/50874c034810b7ada822706c9f4ebcd751a492f3))
- **embed:** do not allow access to storage and auth from embeds ([2961f70](https://github.com/live-codes/livecodes/commit/2961f70aeb443670a88074ccd85f0f43d0e1c373))
- **embed:** embed as html code in DOM ([ef70847](https://github.com/live-codes/livecodes/commit/ef70847c65da7f8ad335116241e194c3a5ccc840))
- **embed:** rename view mode `editor,result` to `split` ([4ffeeed](https://github.com/live-codes/livecodes/commit/4ffeeedaac4d5de74240150edd290af930c947da))
- **embed:** set as embed if loaded in iframe ([b60e92a](https://github.com/live-codes/livecodes/commit/b60e92a2775d3c576706c31502f5825a318ac289))
- **embed:** show embed preview ([d3fc4f1](https://github.com/live-codes/livecodes/commit/d3fc4f1dc03680e995a73cd72dde4c69e2274642))
- **embed:** use codejar in lite mode ([63d72c4](https://github.com/live-codes/livecodes/commit/63d72c4b13f46af412b20f4572714bcbb5bfc4b8))
- **export-share:** allow codepen export for unsupported languages ([957f698](https://github.com/live-codes/livecodes/commit/957f698774904c69675a5a49e89ed8ab38b9f16a))
- **export-share:** improve QR code UI ([68dd329](https://github.com/live-codes/livecodes/commit/68dd329172cc0f773d758529858a9b7e252bf52d))
- **export-share:** share using QR code ([34d1eb7](https://github.com/live-codes/livecodes/commit/34d1eb7b812cd1147d3ce20b7214989fc0dec34f))
- **formatter:** add formatter for common lisp and scheme ([a4786c9](https://github.com/live-codes/livecodes/commit/a4786c95c4c3a30e7580f46f3a5a0fc7b98be85c))
- **formatter:** add lua formatter ([84f273f](https://github.com/live-codes/livecodes/commit/84f273f5a93ef37f53af5e6e5cf5bfea8625082d))
- **formatter:** add sql formatter ([2c9b0f5](https://github.com/live-codes/livecodes/commit/2c9b0f59333bff6f96a699df7b0ae09767939f0a))
- **functions:** add server-side analytics ([3ee4fdc](https://github.com/live-codes/livecodes/commit/3ee4fdc98107534602920080da383a8a3a5bfbec))
- **import:** allow importing code from local files ([5fb211a](https://github.com/live-codes/livecodes/commit/5fb211a4c34186dc3f01f494f5dce82009eb65a0))
- **import:** allow importing code in zip file from UI ([14d8a5c](https://github.com/live-codes/livecodes/commit/14d8a5c7e7dd6dd369d3e44d79f45de5a18bcde4))
- **import:** allow importing code in zip file from url ([d528022](https://github.com/live-codes/livecodes/commit/d5280227e4bb85ac775971140631c2c2d52dbba7))
- **import:** import from CodePen ([9cc82bf](https://github.com/live-codes/livecodes/commit/9cc82bf70f796bafa6a77727d0c0a0b05d9ffbc0))
- **import:** import test file ([f166b29](https://github.com/live-codes/livecodes/commit/f166b290c1cd052e4e89f0e67f7f92cc3b9501d9))
- **import:** support esm imports for deno modules ([c062560](https://github.com/live-codes/livecodes/commit/c0625601d067a5f10f3daab45d6f0b32483b2ceb))
- **import:** support esm imports from github/gitlab/bitbucket/rawgit ([0443f14](https://github.com/live-codes/livecodes/commit/0443f14dce3f8e5913197221fbaf71e191b2a773))
- **import:** use language paramSelectors for DOM import ([aa43694](https://github.com/live-codes/livecodes/commit/aa43694ceb769618f120948f77a9bb7873dc54fe))
- **import:** use querystring `x` instead of hash for imports ([5257994](https://github.com/live-codes/livecodes/commit/5257994ad533a8d5613d775dab0a37dc0feefba8))
- **npm-package:** add `view` to `EmbedOptions` ([cc707ed](https://github.com/live-codes/livecodes/commit/cc707ed2375c5aab23ff8f5efd2e363da9fb37cc))
- **npm-package:** add library for embeds ([c94ccb2](https://github.com/live-codes/livecodes/commit/c94ccb22b74d0969b5a37326f27aa8065fa504dc))
- **npm-package:** allow using lite mode in library `EmbedOptions` ([6cb97f9](https://github.com/live-codes/livecodes/commit/6cb97f984d604cbd7fa330178967fef11ecb2323))
- **npm-package:** rename EmbedOptions['importUrl'] to EmbedOptions['import'] ([16507ec](https://github.com/live-codes/livecodes/commit/16507eca9b2b509b9ff9fac3e5a2cf1da6689066))
- **resources:** allow adding google fonts in external resources ([18c03e1](https://github.com/live-codes/livecodes/commit/18c03e167457b012e497079eb933498f7c18a8ad))
- **resources:** search packages ([20a6af6](https://github.com/live-codes/livecodes/commit/20a6af658fe408f6b20270d881cea1a7037ffa13))
- **result:** add custom settings to enable/disable mapping imports and commonjs ([4748dc9](https://github.com/live-codes/livecodes/commit/4748dc9b0dfc1557dca057cd540bd7a0e49ec3e1))
- **result:** allow adding head content and html classes to result page ([7ce6ddd](https://github.com/live-codes/livecodes/commit/7ce6dddf65d236654f90ee75c4f22f23233c93af))
- **result:** allow showing spacing in result page ([d3692ed](https://github.com/live-codes/livecodes/commit/d3692ed3625e5edb4bb87169cc3230cd4c0bb83a))
- **result:** allow users to add custom imports ([0fd471c](https://github.com/live-codes/livecodes/commit/0fd471cd3b4229685fd3910a9c6893ae2ddc5098))
- **result:** auto-update result popup ([ea6fbf1](https://github.com/live-codes/livecodes/commit/ea6fbf1079ecf3e45e8de9666868f5d318ecd766))
- **result:** import from './script' ([d538c7c](https://github.com/live-codes/livecodes/commit/d538c7cdb08d13965ab9cb9f05a2181bfbbc5202))
- **result:** import from './script' ([5e1f250](https://github.com/live-codes/livecodes/commit/5e1f2509f98309e50b88b414b299b7c5de0a3bf5))
- **result:** improve result display mode ([7bb0d59](https://github.com/live-codes/livecodes/commit/7bb0d590c239aef1434582a59cf5b31d46ddf70d))
- **result:** show result in new window ([95f26d0](https://github.com/live-codes/livecodes/commit/95f26d07a6803961958f29b57cf741ad2810611e))
- **result:** support bare modules in dynamic imports ([91ba4f6](https://github.com/live-codes/livecodes/commit/91ba4f69596b7aaa3f8e5438ff0a4579e3c81e52))
- **result:** use type="module" in module scripts ([1604082](https://github.com/live-codes/livecodes/commit/16040827863d947d62ecdf53fab6b75602b2685d))
- **SDK:** add react SDK ([a8f5822](https://github.com/live-codes/livecodes/commit/a8f5822bacf78a0911a03bffbc04a9e4f0f6b6d8))
- **SDK:** add react SDK ([ba275dd](https://github.com/live-codes/livecodes/commit/ba275ddd31834ac963f971b76bc4bd30261ad3d4))
- **SDK:** add types for vue SDK ([27a0592](https://github.com/live-codes/livecodes/commit/27a059278a455969cbd3e068672bfefa04483ac9))
- **SDK:** add types for vue SDK ([ae79a55](https://github.com/live-codes/livecodes/commit/ae79a55c2860a76b1b47a3f6b690b47f7abbeafc))
- **SDK:** add vue SDK ([eb55c90](https://github.com/live-codes/livecodes/commit/eb55c9028e14f78cbfddeb81f042bf68b7c668c8))
- **SDK:** add vue SDK ([7bcabb4](https://github.com/live-codes/livecodes/commit/7bcabb498741dc3621b7e30ae6761975c3913c89))
- **SDK:** allow accessing the Playground API from react SDK ([4495476](https://github.com/live-codes/livecodes/commit/4495476d45f3e11218ef7aed62b8c787b85017b5))
- **SDK:** allow accessing the Playground API from react SDK ([a96ad03](https://github.com/live-codes/livecodes/commit/a96ad0316bca2e37aa6fdd14c92aca248d068b75))
- **SDK:** allow accessing the Playground API from vue SDK ([8db0abc](https://github.com/live-codes/livecodes/commit/8db0abc2a9860488894420cf3c2916d38d9f5ceb))
- **SDK:** allow accessing the Playground API from vue SDK ([7e4f43f](https://github.com/live-codes/livecodes/commit/7e4f43f2471df9ee5173543f991f71184d38875d))
- **SDK:** apply default styles in JS/TS SDK ([75c7e90](https://github.com/live-codes/livecodes/commit/75c7e90e83ac2f4e3a154499684770b6c01a7f7a))
- **services:** add cors service for non-allowed origins ([b744588](https://github.com/live-codes/livecodes/commit/b744588acdfa82f1d206d5aa950d657224657d66))
- **services:** add jsdelivr package info service ([9438e04](https://github.com/live-codes/livecodes/commit/9438e043f87976219676aa35d95df8b2f5c42d4c))
- **services:** allow setting `defaultCDN` in `config.customSettings` ([5da02aa](https://github.com/live-codes/livecodes/commit/5da02aa0aaf9fb44bc0f6d8e8b0a4525812d33b2))
- **services:** support importing modules from github, gitlab and bitbucket via githack ([778b3ec](https://github.com/live-codes/livecodes/commit/778b3ec9e4ff9f92fb3a3fd2f5890946575c6f49))
- **services:** use api non-expiring share service ([f2b3593](https://github.com/live-codes/livecodes/commit/f2b35931c25ae889353f058dad670a67e5ab1a4b))
- **snippets:** add code snippets ([120dabe](https://github.com/live-codes/livecodes/commit/120dabe5d0ed44ba862c63848e827a57a4fe38a3))
- **storage:** allow subscription to changes in storage ([e824571](https://github.com/live-codes/livecodes/commit/e8245715863fcce75ca6ffc644ad8f36c02bbd9c))
- **storage:** load last used language ([e9e10eb](https://github.com/live-codes/livecodes/commit/e9e10eb952813829c5a97f4d9b7f2de551b8bd9c))
- **storage:** preserve user data across logout/login ([31856b1](https://github.com/live-codes/livecodes/commit/31856b1c2df4f0575248f76c5084de63328c3edc))
- **storage:** Request persistent storage ([88a6b19](https://github.com/live-codes/livecodes/commit/88a6b19a8701e82517709613e2a73d51293dda61))
- **storage:** user-specific stores ([e1c936e](https://github.com/live-codes/livecodes/commit/e1c936e0adcaf54a9ae5cdad981b4d3e626b553c))
- **Stories:** add storybook ([524d898](https://github.com/live-codes/livecodes/commit/524d898cef14fa02f7c47bec1290632c09befe3e))
- **Stories:** add storybook controls for config and embed options ([86799ec](https://github.com/live-codes/livecodes/commit/86799ec7d0aa8189b07b9c85b10fdb85a76e7be7))
- **sync:** communicate with SimpleStorage from web worker ([e6d9192](https://github.com/live-codes/livecodes/commit/e6d9192cabf7df4795799570b9646aa788a759df))
- **sync:** implement autosync ([2b811d3](https://github.com/live-codes/livecodes/commit/2b811d307d6679e8ac0249ae65f761fa7819bb61))
- **sync:** show sync status ([bbaf924](https://github.com/live-codes/livecodes/commit/bbaf92487d214f579ae53cab671f409afe79d03c))
- **templates:** add javascript starter template ([7b39c96](https://github.com/live-codes/livecodes/commit/7b39c96796b62b65c091fa693cafeb92824b0a5f))
- **templates:** add jest and jest/react starter templates ([43312b2](https://github.com/live-codes/livecodes/commit/43312b20939bceea2e57ebe3662a4ba0e7e51363))
- **templates:** add Julia starter template ([e3aeeae](https://github.com/live-codes/livecodes/commit/e3aeeae23a4d2676ecf7ce30adc7597aa3150f49))
- **templates:** add ocaml starter template ([f34d800](https://github.com/live-codes/livecodes/commit/f34d80077cc2f32ef770ee1d8a043d04493e5aa4))
- **templates:** add reason starter template ([426b06f](https://github.com/live-codes/livecodes/commit/426b06f36cc0c9d95a50fa41b8bbce97ecb5aeb8))
- **templates:** load default template ([4fd2925](https://github.com/live-codes/livecodes/commit/4fd2925907bcfa16460c242c154eb49a5d7400f6))
- **templates:** UI for selecting default template ([748ce28](https://github.com/live-codes/livecodes/commit/748ce283151aeee4b4cfd65125e8f3fcff7b4041))
- **templates:** upgrade react starter template to v18 ([2bbc595](https://github.com/live-codes/livecodes/commit/2bbc5955c545d7ddd1b50ba91cefe1a6a71d8d4e))
- **templates:** use signals in preact template ([4c92f7f](https://github.com/live-codes/livecodes/commit/4c92f7f9d96c2a3845503a9f472196337249c9d1))
- **tests:** add user tests to toolspane ([e54f2d8](https://github.com/live-codes/livecodes/commit/e54f2d8b573713ac225eaba60a3b2a813737a084))
- **tests:** add user tests to toolspane ([326bca1](https://github.com/live-codes/livecodes/commit/326bca11577990e5e53b1133d57eb3b935f5fe8c))
- **tests:** allow using chai assertions in tests ([dc1a630](https://github.com/live-codes/livecodes/commit/dc1a630d96810fa44f243874650a43764539a683))
- **tests:** compile user tests and map imports ([6ff5df6](https://github.com/live-codes/livecodes/commit/6ff5df6a9b09cc8dfb26848b11ef714484d3af8d))
- **tests:** compile user tests and map imports ([c7e0013](https://github.com/live-codes/livecodes/commit/c7e00135bbb4c576d06309f545fc90ef91fa27d2))
- **tests:** watch tests ([bb1823a](https://github.com/live-codes/livecodes/commit/bb1823a234e8bf3ccadf63eea4865a5ee5010c2d))
- **tests:** watch tests ([93e13fb](https://github.com/live-codes/livecodes/commit/93e13fb0593d0940f0006b3815603954fe47cc7b))
- **tools:** add zoom button ([59e3491](https://github.com/live-codes/livecodes/commit/59e349169ddecd99efdbeda8b110d59f2e14714a))
- **tools:** enable/disable tools in runtime ([a5518e4](https://github.com/live-codes/livecodes/commit/a5518e41fa3dd659f73d226240718b59039fea1f))
- **UI:** add close button for modals ([2ff3303](https://github.com/live-codes/livecodes/commit/2ff3303d55ff0543d16526dc19e92c37baaf907a))
- **UI:** add editor toolbar with buttons for common tasks ([6fed698](https://github.com/live-codes/livecodes/commit/6fed6981ee9d6c704dd750875478f03dacde110b))
- **UI:** add External Resources button to editor tools bar ([2ca095d](https://github.com/live-codes/livecodes/commit/2ca095d728acedbc66511a9a62d970f5c1ccff6b))
- **UI:** allow setting default view (via querystring `view`) to `editor` or `result` ([c54cf90](https://github.com/live-codes/livecodes/commit/c54cf90b495e9443d9c8308e919faae0b67c2e1b))
- **UI:** allow setting delay from app menu ([bf8e7c8](https://github.com/live-codes/livecodes/commit/bf8e7c833e3d8b6d2ae1922339690d5f73d934b8))
- **UI:** change 404 image ([bf89f44](https://github.com/live-codes/livecodes/commit/bf89f44e22de6d8c457abd5135743f17fa5c5507))
- **UI:** close modal on pressing `Esc` keyboard shortcut ([3a932ea](https://github.com/live-codes/livecodes/commit/3a932ea083292219889be7a31027932db97ef2c6))
- **UI:** decrease tools pane buttons padding to allow more space ([16bc167](https://github.com/live-codes/livecodes/commit/16bc167dce0b85841548cffd54a453300ecb60d8))
- **UI:** highlight selected language menu item ([83f73bb](https://github.com/live-codes/livecodes/commit/83f73bbe6262803b940b9b986aa69988190a67bd))
- **UI:** improve copy button UI ([97a8ea0](https://github.com/live-codes/livecodes/commit/97a8ea011f939b278c4f275690249d1994a27e7a))
- **UI:** improve menus layout ([0117141](https://github.com/live-codes/livecodes/commit/01171417d4fe71fbaa61b99bb64c0c3e3a62966b))
- **UI:** notify user when downloading a large compiler ([46f768c](https://github.com/live-codes/livecodes/commit/46f768cabc49cc5474e24386674c6de74078da13))
- **UI:** show backup/restore in progress message ([d13c4d3](https://github.com/live-codes/livecodes/commit/d13c4d37ab209c9f89866fd915ae34e81235877e))
- **UI:** show URL length in share screen ([35bd0d5](https://github.com/live-codes/livecodes/commit/35bd0d53161024122aa923069e01b4492bcae3ff))
- **UI:** use thin scrollbar ([6fb2d48](https://github.com/live-codes/livecodes/commit/6fb2d487e578fc367fe4b0088ed911117b45e912))
- **web:** add `OpenCode` component ([57ac7fc](https://github.com/live-codes/livecodes/commit/57ac7fc566dc88cc31838af10230a0ed35568ea2))
- **web:** add 404 page ([4cbf3ad](https://github.com/live-codes/livecodes/commit/4cbf3ad9d1da3b780e5307cb52d991c8d9875677))
- **web:** add code sample to homepage ([03d3963](https://github.com/live-codes/livecodes/commit/03d3963f20fadf3fb48f6969656030992f43472b))
- **web:** add docs website ([9cb490a](https://github.com/live-codes/livecodes/commit/9cb490a6fdaff501e9f78ae000248eeb5ea2c582))
- **web:** add Examples section ([a1f9422](https://github.com/live-codes/livecodes/commit/a1f9422200dbae06ea51457834adf121dc17fbf6))
- **web:** add link to starter templates on homepage ([4f7618c](https://github.com/live-codes/livecodes/commit/4f7618caaffdd0b7a4d804dfa7ebab01b7dea820))
- **web:** build website home page ([f07a13a](https://github.com/live-codes/livecodes/commit/f07a13a906d4564f8b840059c2cf52fb4a0e4821))
- **web:** format code samples ([168dacc](https://github.com/live-codes/livecodes/commit/168dacc3edf2dbef7f3278a6e963c056484b462f))
- **web:** show code for LiveCodes embed ([0dd9205](https://github.com/live-codes/livecodes/commit/0dd9205cabe5d57cf6976ab10497414d1eb2b024))
- **welcome:** add recent starter templates to welcome screen ([97cf8b8](https://github.com/live-codes/livecodes/commit/97cf8b8f843497c80a1a1cca20477d39391a6109))
- **welcome:** allow project recover from welcome screen ([15b6aff](https://github.com/live-codes/livecodes/commit/15b6affab5b0029761ff5fdb6a44ac97aa84d7d2))
- **welcome:** hide recover section after save or cancel ([a2c3bcc](https://github.com/live-codes/livecodes/commit/a2c3bccda55d8fdc554ead2bfc482714eb94d160))
- **welcome:** improve welcome screen UI ([391438c](https://github.com/live-codes/livecodes/commit/391438cbfdff6499b2dc7963b2e600f9499971d6))
- **welcome:** show recent projects in welcome screen ([52ee33a](https://github.com/live-codes/livecodes/commit/52ee33aa4888699c49dfa0381f259f37536156c5))
- **welcome:** show welcome screen ([1b34de9](https://github.com/live-codes/livecodes/commit/1b34de96894b92989ca6189d7b19980ec1eab0cd))

### Performance Improvements

- **app:** lazy load deploy UI ([6841e1e](https://github.com/live-codes/livecodes/commit/6841e1e811028d3c7cdbd5582a19b5ad53f80bd2))
- **app:** lazy load import UI ([02c1f23](https://github.com/live-codes/livecodes/commit/02c1f23829299cc8b4c7a2cbe97d8b02ec6e5fde))
- **app:** lazy load open (saved projects) screen ([cf6dc87](https://github.com/live-codes/livecodes/commit/cf6dc876fdb7eea8796e4f336431855c8cee8960))
- **app:** lazy load share UI ([e18559a](https://github.com/live-codes/livecodes/commit/e18559a07e7424ebd50178e2f2f7e11f1d34951f))
- **app:** lazy-load export ([404e534](https://github.com/live-codes/livecodes/commit/404e5343b10e564693bbaeb8e49d885cdcfd9a1b))
- **compilers:** improve tree-shaking ([d5e173b](https://github.com/live-codes/livecodes/commit/d5e173b1797e2e89c7d00c83e40234ccd0d9c321))
- **compilers:** lazy load assemblyscript ([77f61a3](https://github.com/live-codes/livecodes/commit/77f61a3fbec4e1bb34d46a3e5f5c74fd8015ff28))
- **compilers:** lazy load astro compiler ([fb37aee](https://github.com/live-codes/livecodes/commit/fb37aeedd3728ac82ab0071c24176a506f7dd51f))
- **compilers:** lazy load clang ([03cda20](https://github.com/live-codes/livecodes/commit/03cda204a3f4da7dd4f91129fdac3226761fc7b3))
- **compilers:** lazy load clio compiler ([3638a36](https://github.com/live-codes/livecodes/commit/3638a3684c81f5fb45e719c13a8824c28a72dd07))
- **compilers:** lazy load commonlisp ([b9a24ac](https://github.com/live-codes/livecodes/commit/b9a24ac95d6660549c02fe3b2a0c90cdf2debbb4))
- **compilers:** lazy load cpp ([a0e0852](https://github.com/live-codes/livecodes/commit/a0e08526e2bf34ea32bc39228fadb9bc07cc57cc))
- **compilers:** lazy load haml ([fdb7d0c](https://github.com/live-codes/livecodes/commit/fdb7d0c499e491fc066fd89195c14d3ab8d13a4a))
- **compilers:** lazy load handlebars ([e36dea5](https://github.com/live-codes/livecodes/commit/e36dea5a37e2bc841fc54df66d6d8f4b154bc16f))
- **compilers:** lazy load julia ([31e5ba9](https://github.com/live-codes/livecodes/commit/31e5ba9c2ff51becbee18dbb1d034687d0fc1659))
- **compilers:** lazy load liquid ([8411b6f](https://github.com/live-codes/livecodes/commit/8411b6f4aa33ca4d9c216ebef6638c7c6fd6de30))
- **compilers:** lazy load malina ([12c4601](https://github.com/live-codes/livecodes/commit/12c4601f0745c3948e8a6262e3e4bcd4dd4c0efb))
- **compilers:** lazy load mdx ([48db0b0](https://github.com/live-codes/livecodes/commit/48db0b08294516814ac3b619eacfe04f9d044fd2))
- **compilers:** lazy load mdx ([505218f](https://github.com/live-codes/livecodes/commit/505218f128eccf97adbf1dd7b49c922647a009ad))
- **compilers:** lazy load mustache ([8b93bd3](https://github.com/live-codes/livecodes/commit/8b93bd34fbbba8cd94007d0eed21bc7419dafd90))
- **compilers:** lazy load nunjucks ([88351a0](https://github.com/live-codes/livecodes/commit/88351a0141491b273350bb714910e38fc9f68cd8))
- **compilers:** lazy load perl ([bc07048](https://github.com/live-codes/livecodes/commit/bc07048ec49162270ae96262d0f05e533e11e935))
- **compilers:** lazy load processors ([09bcaaa](https://github.com/live-codes/livecodes/commit/09bcaaa72f05cee02369f85bb8b0ccf634290ea0))
- **compilers:** lazy load prolog ([01340f3](https://github.com/live-codes/livecodes/commit/01340f3f74a4b1c27d8833858b3a2b9a652554ca))
- **compilers:** lazy load pug ([f01941c](https://github.com/live-codes/livecodes/commit/f01941c3db5bdd0e2a70d8d940abbf51ac258039))
- **compilers:** lazy load pyodide ([3853603](https://github.com/live-codes/livecodes/commit/385360349751bd14725a00c76b9e66940cd2d3e9))
- **compilers:** lazy load rescript ([908eafc](https://github.com/live-codes/livecodes/commit/908eafc48d94350274321c1ffdb84e52984a9cd5))
- **compilers:** lazy load riot ([febae85](https://github.com/live-codes/livecodes/commit/febae85d4effb60d5a33d95717f48c04414e5ed8))
- **compilers:** lazy load scss ([93fbd01](https://github.com/live-codes/livecodes/commit/93fbd016c523f682b2eff558cc67012c4bdc3c89))
- **compilers:** lazy load solid ([a7a0764](https://github.com/live-codes/livecodes/commit/a7a07640de0819c485e7bab2b7526def551a11b9))
- **compilers:** lazy load sql ([ab3b613](https://github.com/live-codes/livecodes/commit/ab3b613d0ef23b70ba50bad9f21e013af17411e3))
- **compilers:** lazy load svelte ([73012d7](https://github.com/live-codes/livecodes/commit/73012d7bd852afc4908800fd60e1b5f86b08901d))
- **compilers:** lazy load tcl ([6414732](https://github.com/live-codes/livecodes/commit/641473287b4af7c1749367d12fcfed9ef973bca9))
- **compilers:** lazy load twig ([44dbf3b](https://github.com/live-codes/livecodes/commit/44dbf3bd0bacd04d49acd697195d5beac419089f))
- **compilers:** lazy load vue ([61c453a](https://github.com/live-codes/livecodes/commit/61c453a91dd15f81fb22f7dcc7bafc055109d9f8))
- **compilers:** lazy load wat ([3f88792](https://github.com/live-codes/livecodes/commit/3f88792bca4a645cb973d088034405e6e648d549))
- **compilers:** rename `graph` to `diagram` and lazy load it ([85a27f9](https://github.com/live-codes/livecodes/commit/85a27f9ea6284bf58be467b2012383555c9139a5))
- **compilers:** run Fennel compiler in web worker ([f8933ef](https://github.com/live-codes/livecodes/commit/f8933ef8050b4af70332266a69c1c04ce490bacd))
- **editor:** asynchronously highlight code in codejar ([8b3343f](https://github.com/live-codes/livecodes/commit/8b3343fd87ad349c4b6d2a605c9d68da4c6cbd39))
- **editor:** lazy-load codemirror languages and extensions ([6636b08](https://github.com/live-codes/livecodes/commit/6636b08758005b5cd36fdccffd74698c8f5d2cb0))
- **editor:** lazy-load custom monaco languages ([76369d3](https://github.com/live-codes/livecodes/commit/76369d3e43b0a0b630fca39d4ae94a7090dcecd9))
- **editor:** lazy-load prism languages ([b95c55b](https://github.com/live-codes/livecodes/commit/b95c55b6e66ec2113d54d133b2a993e0f646dad2))
- **editor:** remove language specs from editor bundles ([5f486a5](https://github.com/live-codes/livecodes/commit/5f486a512b59b665350b86ab5191c7652852cf3f))
- **editor:** use CodeJar/Prism by default when readonly ([2736a93](https://github.com/live-codes/livecodes/commit/2736a931db42a7a6b4cb63c3baa15b72669f6b32))
- **embed:** preload script ([24da929](https://github.com/live-codes/livecodes/commit/24da929304a450ce98d3cd06b84502958b000b6b))
- **functions:** cache versioned files ([b349cc5](https://github.com/live-codes/livecodes/commit/b349cc5089e246fdf5af9e7feb8070962b76ccf0))
- **sync:** compress sync files ([dc59a91](https://github.com/live-codes/livecodes/commit/dc59a91c42430372deb69920d8b681faffd96072))
- **sync:** move sync to web worker ([cad2123](https://github.com/live-codes/livecodes/commit/cad2123952cdf397d73c86286d4963bbcc8529cb))
- **templates:** load diagrams template markup from contentUrl ([827c06d](https://github.com/live-codes/livecodes/commit/827c06d354fb8e385876a7b6e2d508cfd8b14e52))

### Reverts

- Revert "build: upgrade storybook to v7" ([89b8b54](https://github.com/live-codes/livecodes/commit/89b8b540d46f12b5705145fa88d41e9cec286696))
- Revert "fix mdx" ([0c3aaae](https://github.com/live-codes/livecodes/commit/0c3aaae9d83df32a20567abed949365d6a2228cd))
- Revert "build(editor): load monaco from CDN" ([cd09133](https://github.com/live-codes/livecodes/commit/cd0913311e2d00dc134d0af0f71e498e7a314dfb))

---

## [v0.7.0](https://github.com/live-codes/livecodes/compare/v0.4.0...v0.7.0) (2023-03-31)

### ⚠ BREAKING CHANGES

- **API:** rename exported method to `createPlayground`

### Features

- **API:** add `params` to `EmbedOptions` ([c084b3f](https://github.com/live-codes/livecodes/commit/c084b3ff4d2a2cb3d81737298ddf163b8d4d6301))
- **API:** add API method `destroy` ([c7a0d5b](https://github.com/live-codes/livecodes/commit/c7a0d5bb9a2e7c670ad809edc508a5c6617a942c))
- **API:** add API method `onChange` ([0e39347](https://github.com/live-codes/livecodes/commit/0e393472ae7b5555aefb9565a7532304f967ca55))
- **API:** allow going to specific line and column from API ([a3740c9](https://github.com/live-codes/livecodes/commit/a3740c991b0dad2204749e9704359a15a3f93930))
- **API:** allow running tests from API ([9917095](https://github.com/live-codes/livecodes/commit/9917095546ae18525bae8b8e5a01dd145e46c342))
- **API:** API watch changes ([9488ea1](https://github.com/live-codes/livecodes/commit/9488ea12b6d6cf0e259a4777e9a14798245ac510))
- **API:** load from API ([3e18357](https://github.com/live-codes/livecodes/commit/3e18357e83d369f09dc6eb6702a24aa64c867192))
- **API:** load on scroll ([e81ee4a](https://github.com/live-codes/livecodes/commit/e81ee4aa6b0cf7396d72b26489e23fb69fbb6338))
- **API:** show panes from API ([a53da9f](https://github.com/live-codes/livecodes/commit/a53da9f09f495126987d8bda0d26364e6b39940d))
- **app:** add `detectLanguage` utility function ([251bcc7](https://github.com/live-codes/livecodes/commit/251bcc7d0baedccfa8bbc46c05a4a7f47aae0278))
- **app:** add pub/sub ([567c514](https://github.com/live-codes/livecodes/commit/567c514c12d809067b89f806db092484de13b1ab))
- **app:** allow adding local files as assets ([e12d249](https://github.com/live-codes/livecodes/commit/e12d249658ca1c5811c9a0558fd7480d6ff47789))
- **app:** allow partial matching in search ([84e3c35](https://github.com/live-codes/livecodes/commit/84e3c358e7bcf140369c60f4890c7bd1c4bebf69))
- **app:** emit change events ([8c025a9](https://github.com/live-codes/livecodes/commit/8c025a9faf67f361bd95af99fac9e4a8b00fb522))
- **app:** sandbox app iframe ([cbf2aad](https://github.com/live-codes/livecodes/commit/cbf2aad761c3cf938b3140e3067f728b33700a59))
- **app:** type-safe query params ([ccf533e](https://github.com/live-codes/livecodes/commit/ccf533edad155ea462c7e78fcbf124b8a01d31cb))
- **assets:** deploy assets to GitHub Pages ([13c833a](https://github.com/live-codes/livecodes/commit/13c833a50bab02c02a9bff4894da63bdea6b1754))
- **backup:** backup/restore UI (WIP) ([10c8f39](https://github.com/live-codes/livecodes/commit/10c8f39ff30ddd774c1971aabb7cb3aa8261a988))
- **backup:** implement backup ([1804557](https://github.com/live-codes/livecodes/commit/1804557daec3ffac022631eefadcd3442113c63c))
- **backup:** implement restore ([d71804c](https://github.com/live-codes/livecodes/commit/d71804caace1e1e3ed5c52c32ec0aec2a6ff09ac))
- **broadcast:** broadcast playground state ([4f394f4](https://github.com/live-codes/livecodes/commit/4f394f470df0d37a4f0ef8759139c8bd29bec03e))
- **broadcast:** broadcast result page and code to API ([78b1f7e](https://github.com/live-codes/livecodes/commit/78b1f7e2fbb87fd9dc50a4380e567102388fe97b))
- **broadcast:** inform the server that broadcast has stopped ([f0bfba4](https://github.com/live-codes/livecodes/commit/f0bfba4ec4cdb53d46b28f2af5216c574fba40a4))
- **broadcast:** provide a default broadcast service ([7023091](https://github.com/live-codes/livecodes/commit/7023091ae69e9dee2b6fea1c993fe3464c320665))
- **broadcast:** show broadcast status button in toolbar ([5693244](https://github.com/live-codes/livecodes/commit/5693244ec5081fd9c0788ebbb39ccf4d4d552750))
- **broadcast:** use channelToken ([9ded492](https://github.com/live-codes/livecodes/commit/9ded49279d588f29bf2505bdbf6454f45230209b))
- **compiled:** show python (brython) compiled code ([61fd514](https://github.com/live-codes/livecodes/commit/61fd5140e6aaa4deb55a2505a64dd7a239a3f358))
- **compilers:** add support for UnoCSS ([53e66d6](https://github.com/live-codes/livecodes/commit/53e66d641f45a11d28b18b66707cce91ca58cb6e))
- **compilers:** add Clang compiler for C/C++ ([040bb2e](https://github.com/live-codes/livecodes/commit/040bb2e0e457a2b0d7f350de5a9ba33c42e66073))
- **compilers:** add elkjs in diagram ([56c8630](https://github.com/live-codes/livecodes/commit/56c86305ae0f8f4cb766481ad673a4203518c410))
- **compilers:** add R language support ([0747b71](https://github.com/live-codes/livecodes/commit/0747b71a4c2a26f85aae417a2f139907d6db0aa8))
- **compilers:** add R language support ([e3dca42](https://github.com/live-codes/livecodes/commit/e3dca42c43b5ad7e1795622342734fac4e6a7416))
- **compilers:** add support for art-template ([95da5fc](https://github.com/live-codes/livecodes/commit/95da5fcb2ed7bd6d0759a33066099fadfaadcaf0))
- **compilers:** add support for C++ ([d003ea5](https://github.com/live-codes/livecodes/commit/d003ea50472a1b0b9e7507d9e4efc5ba0cd2f1bc))
- **compilers:** add support for Clio ([8b4c4d9](https://github.com/live-codes/livecodes/commit/8b4c4d992789828144a969c4d982df0e79113b36))
- **compilers:** add support for common lisp ([f2efeb1](https://github.com/live-codes/livecodes/commit/f2efeb1174c9769f3d3973b3a67f8e8288a1c4a2))
- **compilers:** add support for cytoscape in diagram ([a9b1322](https://github.com/live-codes/livecodes/commit/a9b13224ca59f3236da40e6d5794d68d2308b490))
- **compilers:** add support for Gnuplot ([e9acf92](https://github.com/live-codes/livecodes/commit/e9acf926b1135ecd3c87206ef319fc78e2ad76d9))
- **compilers:** add support for graphviz ([05da2fd](https://github.com/live-codes/livecodes/commit/05da2fd256dd3f1156d1a49e50beeadc738b4eb1))
- **compilers:** add support for imba ([f375c10](https://github.com/live-codes/livecodes/commit/f375c1076e9f079463daae78510fbbb4fe713acb))
- **compilers:** add support for Julia ([52d7ff0](https://github.com/live-codes/livecodes/commit/52d7ff020a8a65346afb4c8505431c6bb7d7848e))
- **compilers:** add support for Lightning CSS ([0d7bfe4](https://github.com/live-codes/livecodes/commit/0d7bfe445fbd17bd2a8c865c4ce19ad78a43ecf8))
- **compilers:** add support for Mustache ([ae12f3d](https://github.com/live-codes/livecodes/commit/ae12f3d063f1b13622cfe923282067d444db5bbf))
- **compilers:** add support for nomnoml ([504075f](https://github.com/live-codes/livecodes/commit/504075fb39e3de9d0f1bf405a595a04c8d495414))
- **compilers:** add support for plotly ([cb408be](https://github.com/live-codes/livecodes/commit/cb408be0e0d7b2b4ba9a09e21d306c619450f143))
- **compilers:** add support for Prolog using Tau Prolog ([8721824](https://github.com/live-codes/livecodes/commit/872182432f4ccf4a2b93b0acef912f80982b15d6))
- **compilers:** add support for svgbob ([6854d3b](https://github.com/live-codes/livecodes/commit/6854d3bcc74bd13f08e4dbbead8a16bd1b08cb61))
- **compilers:** add support for Tcl ([7786b8c](https://github.com/live-codes/livecodes/commit/7786b8c3f8d8e58392810796659919615c964429))
- **compilers:** add support for Token CSS ([00c8930](https://github.com/live-codes/livecodes/commit/00c89309f0b9ea6d51ea1e5573ffb3939401bf20))
- **compilers:** add support for vega and vega-lite ([fa0570f](https://github.com/live-codes/livecodes/commit/fa0570f5e5c7fb37133f307cda90d3babfdb06e6))
- **compilers:** add support for wavedrom ([3a0f3e8](https://github.com/live-codes/livecodes/commit/3a0f3e8c04896f8eb4882c7933e5ed610a291c16))
- **compilers:** commonjs support ([87757d5](https://github.com/live-codes/livecodes/commit/87757d50954e8c663503652cc88d4b2d61869127))
- **compilers:** diagrams runOrContinue ([4635ece](https://github.com/live-codes/livecodes/commit/4635ecee8ac7484b36a2ddc2d62f8277731598c1))
- **compilers:** reload the compiler sandbox page on repeated failure to load compiler ([3791fb9](https://github.com/live-codes/livecodes/commit/3791fb958ee7440928af87a372ccc7e91c7de72e))
- **compilers:** retry loading compiler on error ([c0c3dfd](https://github.com/live-codes/livecodes/commit/c0c3dfdce193ab9398d32a50dd112c338095c749))
- **compilers:** rich text editor for markup (using quill.js) ([e415f90](https://github.com/live-codes/livecodes/commit/e415f90f3abc08421355f6be64f451edf125e67f))
- **compilers:** upgrade mdx to v2.0 ([438a0da](https://github.com/live-codes/livecodes/commit/438a0dad0b39fc1893bfd265ec30522eeaf63b08))
- **compilers:** use dart-sass instead of sass.js ([313ebb3](https://github.com/live-codes/livecodes/commit/313ebb39fdcebe233520aed16b70745fea393532))
- **config:** add zoom to config ([1cd7973](https://github.com/live-codes/livecodes/commit/1cd7973df344210eaa2aba0902f4ce3ffb772d69))
- **config:** allow setting enabled tools and status from query param `tools` ([4796ba0](https://github.com/live-codes/livecodes/commit/4796ba0bce4350f20d5233c7ce566f5440c387d8))
- **config:** collect tools config under `config.tools` ([c02ef9c](https://github.com/live-codes/livecodes/commit/c02ef9cf0c1f34aefe4c8f91175e7b6f106a90c0))
- **config:** improve merging config from external content ([b5e4bf6](https://github.com/live-codes/livecodes/commit/b5e4bf6a6ae7707009327c9c1cdf36d969222f14))
- **config:** improve tools config (status) ([3a6f9e3](https://github.com/live-codes/livecodes/commit/3a6f9e363bddec6b4a7297ff5e80113b22833419))
- **console:** clear console on result update ([c7b47c0](https://github.com/live-codes/livecodes/commit/c7b47c05fe31acc91e2f7f963b39ce0796fb623a))
- **CSS Presets:** move CSS preset UI from app menu to external resources screen ([a052c8e](https://github.com/live-codes/livecodes/commit/a052c8e33e1af8b65ca8f810ff490f76b0f3f0a9))
- **CSS Presets:** remove `github-markdown-css` and `asciidoctor.css` from css presets ([88b4391](https://github.com/live-codes/livecodes/commit/88b43913158968db9aec7669f815f864e09554af))
- **deploy:** save project deploy repo ([b43126c](https://github.com/live-codes/livecodes/commit/b43126c50a532e47ed7e30e88c1a610d7b9216fe))
- **editor-settings:** add editor settings UI ([9187ad2](https://github.com/live-codes/livecodes/commit/9187ad2ab8ed411d20ed3202a4ebad0b2fa5e6b3))
- **editor-settings:** add more fonts ([ed5bd18](https://github.com/live-codes/livecodes/commit/ed5bd18feb16f4fb23473529ac8e0b947cccb5c4))
- **editor-settings:** allow changing editor fonts ([d728238](https://github.com/live-codes/livecodes/commit/d7282384590af9451f3f14759f7fc6966fee7185))
- **editor:** add `closeBrackets` to editor settings ([14008c5](https://github.com/live-codes/livecodes/commit/14008c526f044b2eb8674cfd4cbeab923b070aba))
- **editor:** add codejar key bindings ([f90bae8](https://github.com/live-codes/livecodes/commit/f90bae8c46a716106db138e3a4639945baeec3d0))
- **editor:** add codemirror-lang-vue ([cbc7e2d](https://github.com/live-codes/livecodes/commit/cbc7e2da0ed5ad2d83dc42fe48021dcb1f12c6e6))
- **editor:** add monaco support for wat ([97222be](https://github.com/live-codes/livecodes/commit/97222be398609a521d700c57d3ede1a7e2d9b1fe))
- **editor:** add vim and emacs modes to monaco ([75ad047](https://github.com/live-codes/livecodes/commit/75ad047c470429c5c892c2e91ed703b171f5af7e))
- **editor:** allow configuring editor settings ([df03806](https://github.com/live-codes/livecodes/commit/df0380666b63eff64f14a3edbdc0be5ff44ede24))
- **editor:** allow users to add custom types ([b466a73](https://github.com/live-codes/livecodes/commit/b466a73fed13a1fa593eb9637dd90c34f4d041cf))
- **editor:** create fake editor for use when `mode=result` ([478f280](https://github.com/live-codes/livecodes/commit/478f2804d0657296e91928afebb337740a037130))
- **editor:** enable custom editor commands (e.g. keyboard shortcuts) ([1ff4b9e](https://github.com/live-codes/livecodes/commit/1ff4b9ecf8f93de311c8a1e7eead3e82008949a5))
- **editor:** enable emmet for more languages ([9b2d6cc](https://github.com/live-codes/livecodes/commit/9b2d6cce8cdb9eec6083ed39482c4786ab9395b3))
- **editor:** goToLine in code editors ([f9b5ac7](https://github.com/live-codes/livecodes/commit/f9b5ac77f78d79c0f8adc39c1ebe9a83497f7a85))
- **editor:** italic comments ([d40ecdd](https://github.com/live-codes/livecodes/commit/d40ecdd1433ddbe75f18376f8b0b1580c30e39a4))
- **editor:** upgrade codemirror to v6 ([38bf731](https://github.com/live-codes/livecodes/commit/38bf7311bb8b5e5793f6135c1b32a4ca397cafe3))
- **editor:** use codejar as editor instead of prism ([acd72a6](https://github.com/live-codes/livecodes/commit/acd72a625ebe2b10e29250cbd1e3fd185889c38b))
- **editor:** use configurable codemirror basic setup ([078b7df](https://github.com/live-codes/livecodes/commit/078b7df2f245f7c169cde13e9d88815d977503d0))
- **editor:** use official emmet plugin for codemirror ([b765023](https://github.com/live-codes/livecodes/commit/b765023d864a9f7315eff03be492150a4fd835c9))
- **embed:** add embed preview ([fdf9aa0](https://github.com/live-codes/livecodes/commit/fdf9aa041592007b6450b244392b97f3e1835581))
- **embed:** add react and vue SDKs to embed screen ([2f6eef4](https://github.com/live-codes/livecodes/commit/2f6eef4fdabdb3909832c3ea4b73799e12b0ca84))
- **embed:** add UI for creating embeds ([1c6cbe8](https://github.com/live-codes/livecodes/commit/1c6cbe8be1a640473611ee9d6ecc51422c1d9137))
- **embed:** allow full screen for embeds ([5e3e54e](https://github.com/live-codes/livecodes/commit/5e3e54e8ed732332170da23606d4483bf1aac6db))
- **embed:** allow selecting active editor in embed UI ([b1e26a6](https://github.com/live-codes/livecodes/commit/b1e26a6ac4e5c3e450c200453a3609bd77e2c849))
- **embed:** change embed option `click-to-load` to `loading` ([032e1b1](https://github.com/live-codes/livecodes/commit/032e1b1e551c52493b8d9b7ca886d82a92220acd))
- **embed:** click to load embeds ([3c76ff8](https://github.com/live-codes/livecodes/commit/3c76ff815ee354228d86a5a1d2270e319a0e2735))
- **embed:** create a lite build ([50874c0](https://github.com/live-codes/livecodes/commit/50874c034810b7ada822706c9f4ebcd751a492f3))
- **embed:** do not allow access to storage and auth from embeds ([2961f70](https://github.com/live-codes/livecodes/commit/2961f70aeb443670a88074ccd85f0f43d0e1c373))
- **embed:** embed as html code in DOM ([ef70847](https://github.com/live-codes/livecodes/commit/ef70847c65da7f8ad335116241e194c3a5ccc840))
- **embed:** rename view mode `editor,result` to `split` ([4ffeeed](https://github.com/live-codes/livecodes/commit/4ffeeedaac4d5de74240150edd290af930c947da))
- **embed:** set as embed if loaded in iframe ([b60e92a](https://github.com/live-codes/livecodes/commit/b60e92a2775d3c576706c31502f5825a318ac289))
- **embed:** show embed preview ([d3fc4f1](https://github.com/live-codes/livecodes/commit/d3fc4f1dc03680e995a73cd72dde4c69e2274642))
- **embed:** use codejar in lite mode ([63d72c4](https://github.com/live-codes/livecodes/commit/63d72c4b13f46af412b20f4572714bcbb5bfc4b8))
- **export-share:** allow codepen export for unsupported languages ([957f698](https://github.com/live-codes/livecodes/commit/957f698774904c69675a5a49e89ed8ab38b9f16a))
- **export-share:** improve QR code UI ([68dd329](https://github.com/live-codes/livecodes/commit/68dd329172cc0f773d758529858a9b7e252bf52d))
- **export-share:** share using QR code ([34d1eb7](https://github.com/live-codes/livecodes/commit/34d1eb7b812cd1147d3ce20b7214989fc0dec34f))
- **formatter:** add formatter for common lisp and scheme ([a4786c9](https://github.com/live-codes/livecodes/commit/a4786c95c4c3a30e7580f46f3a5a0fc7b98be85c))
- **formatter:** add lua formatter ([84f273f](https://github.com/live-codes/livecodes/commit/84f273f5a93ef37f53af5e6e5cf5bfea8625082d))
- **formatter:** add sql formatter ([2c9b0f5](https://github.com/live-codes/livecodes/commit/2c9b0f59333bff6f96a699df7b0ae09767939f0a))
- **functions:** add server-side analytics ([3ee4fdc](https://github.com/live-codes/livecodes/commit/3ee4fdc98107534602920080da383a8a3a5bfbec))
- **import:** allow importing code from local files ([5fb211a](https://github.com/live-codes/livecodes/commit/5fb211a4c34186dc3f01f494f5dce82009eb65a0))
- **import:** allow importing code in zip file from UI ([14d8a5c](https://github.com/live-codes/livecodes/commit/14d8a5c7e7dd6dd369d3e44d79f45de5a18bcde4))
- **import:** allow importing code in zip file from url ([d528022](https://github.com/live-codes/livecodes/commit/d5280227e4bb85ac775971140631c2c2d52dbba7))
- **import:** import from CodePen ([9cc82bf](https://github.com/live-codes/livecodes/commit/9cc82bf70f796bafa6a77727d0c0a0b05d9ffbc0))
- **import:** import test file ([f166b29](https://github.com/live-codes/livecodes/commit/f166b290c1cd052e4e89f0e67f7f92cc3b9501d9))
- **import:** use language paramSelectors for DOM import ([aa43694](https://github.com/live-codes/livecodes/commit/aa43694ceb769618f120948f77a9bb7873dc54fe))
- **import:** use querystring `x` instead of hash for imports ([5257994](https://github.com/live-codes/livecodes/commit/5257994ad533a8d5613d775dab0a37dc0feefba8))
- **npm-package:** add `view` to `EmbedOptions` ([cc707ed](https://github.com/live-codes/livecodes/commit/cc707ed2375c5aab23ff8f5efd2e363da9fb37cc))
- **npm-package:** add library for embeds ([c94ccb2](https://github.com/live-codes/livecodes/commit/c94ccb22b74d0969b5a37326f27aa8065fa504dc))
- **npm-package:** allow using lite mode in library `EmbedOptions` ([6cb97f9](https://github.com/live-codes/livecodes/commit/6cb97f984d604cbd7fa330178967fef11ecb2323))
- **npm-package:** rename EmbedOptions['importUrl'] to EmbedOptions['import'] ([16507ec](https://github.com/live-codes/livecodes/commit/16507eca9b2b509b9ff9fac3e5a2cf1da6689066))
- **resources:** allow adding google fonts in external resources ([18c03e1](https://github.com/live-codes/livecodes/commit/18c03e167457b012e497079eb933498f7c18a8ad))
- **resources:** search packages ([20a6af6](https://github.com/live-codes/livecodes/commit/20a6af658fe408f6b20270d881cea1a7037ffa13))
- **result:** add custom settings to enable/disable mapping imports and commonjs ([4748dc9](https://github.com/live-codes/livecodes/commit/4748dc9b0dfc1557dca057cd540bd7a0e49ec3e1))
- **result:** allow adding head content and html classes to result page ([7ce6ddd](https://github.com/live-codes/livecodes/commit/7ce6dddf65d236654f90ee75c4f22f23233c93af))
- **result:** allow showing spacing in result page ([d3692ed](https://github.com/live-codes/livecodes/commit/d3692ed3625e5edb4bb87169cc3230cd4c0bb83a))
- **result:** allow users to add custom imports ([0fd471c](https://github.com/live-codes/livecodes/commit/0fd471cd3b4229685fd3910a9c6893ae2ddc5098))
- **result:** auto-update result popup ([ea6fbf1](https://github.com/live-codes/livecodes/commit/ea6fbf1079ecf3e45e8de9666868f5d318ecd766))
- **result:** import from './script' ([d538c7c](https://github.com/live-codes/livecodes/commit/d538c7cdb08d13965ab9cb9f05a2181bfbbc5202))
- **result:** import from './script' ([5e1f250](https://github.com/live-codes/livecodes/commit/5e1f2509f98309e50b88b414b299b7c5de0a3bf5))
- **result:** improve result display mode ([7bb0d59](https://github.com/live-codes/livecodes/commit/7bb0d590c239aef1434582a59cf5b31d46ddf70d))
- **result:** show result in new window ([95f26d0](https://github.com/live-codes/livecodes/commit/95f26d07a6803961958f29b57cf741ad2810611e))
- **result:** support bare modules in dynamic imports ([91ba4f6](https://github.com/live-codes/livecodes/commit/91ba4f69596b7aaa3f8e5438ff0a4579e3c81e52))
- **result:** use type="module" in module scripts ([1604082](https://github.com/live-codes/livecodes/commit/16040827863d947d62ecdf53fab6b75602b2685d))
- **SDK:** add react SDK ([a8f5822](https://github.com/live-codes/livecodes/commit/a8f5822bacf78a0911a03bffbc04a9e4f0f6b6d8))
- **SDK:** add react SDK ([ba275dd](https://github.com/live-codes/livecodes/commit/ba275ddd31834ac963f971b76bc4bd30261ad3d4))
- **SDK:** add types for vue SDK ([27a0592](https://github.com/live-codes/livecodes/commit/27a059278a455969cbd3e068672bfefa04483ac9))
- **SDK:** add types for vue SDK ([ae79a55](https://github.com/live-codes/livecodes/commit/ae79a55c2860a76b1b47a3f6b690b47f7abbeafc))
- **SDK:** add vue SDK ([eb55c90](https://github.com/live-codes/livecodes/commit/eb55c9028e14f78cbfddeb81f042bf68b7c668c8))
- **SDK:** add vue SDK ([7bcabb4](https://github.com/live-codes/livecodes/commit/7bcabb498741dc3621b7e30ae6761975c3913c89))
- **SDK:** allow accessing the Playground API from react SDK ([4495476](https://github.com/live-codes/livecodes/commit/4495476d45f3e11218ef7aed62b8c787b85017b5))
- **SDK:** allow accessing the Playground API from react SDK ([a96ad03](https://github.com/live-codes/livecodes/commit/a96ad0316bca2e37aa6fdd14c92aca248d068b75))
- **SDK:** allow accessing the Playground API from vue SDK ([8db0abc](https://github.com/live-codes/livecodes/commit/8db0abc2a9860488894420cf3c2916d38d9f5ceb))
- **SDK:** allow accessing the Playground API from vue SDK ([7e4f43f](https://github.com/live-codes/livecodes/commit/7e4f43f2471df9ee5173543f991f71184d38875d))
- **SDK:** apply default styles in JS/TS SDK ([75c7e90](https://github.com/live-codes/livecodes/commit/75c7e90e83ac2f4e3a154499684770b6c01a7f7a))
- **services:** add cors service for non-allowed origins ([b744588](https://github.com/live-codes/livecodes/commit/b744588acdfa82f1d206d5aa950d657224657d66))
- **services:** add jsdelivr package info service ([9438e04](https://github.com/live-codes/livecodes/commit/9438e043f87976219676aa35d95df8b2f5c42d4c))
- **services:** allow setting `defaultCDN` in `config.customSettings` ([5da02aa](https://github.com/live-codes/livecodes/commit/5da02aa0aaf9fb44bc0f6d8e8b0a4525812d33b2))
- **services:** support importing modules from github, gitlab and bitbucket via githack ([778b3ec](https://github.com/live-codes/livecodes/commit/778b3ec9e4ff9f92fb3a3fd2f5890946575c6f49))
- **services:** use api non-expiring share service ([f2b3593](https://github.com/live-codes/livecodes/commit/f2b35931c25ae889353f058dad670a67e5ab1a4b))
- **snippets:** add code snippets ([120dabe](https://github.com/live-codes/livecodes/commit/120dabe5d0ed44ba862c63848e827a57a4fe38a3))
- **storage:** allow subscription to changes in storage ([e824571](https://github.com/live-codes/livecodes/commit/e8245715863fcce75ca6ffc644ad8f36c02bbd9c))
- **storage:** load last used language ([e9e10eb](https://github.com/live-codes/livecodes/commit/e9e10eb952813829c5a97f4d9b7f2de551b8bd9c))
- **storage:** preserve user data across logout/login ([31856b1](https://github.com/live-codes/livecodes/commit/31856b1c2df4f0575248f76c5084de63328c3edc))
- **storage:** Request persistent storage ([88a6b19](https://github.com/live-codes/livecodes/commit/88a6b19a8701e82517709613e2a73d51293dda61))
- **storage:** user-specific stores ([e1c936e](https://github.com/live-codes/livecodes/commit/e1c936e0adcaf54a9ae5cdad981b4d3e626b553c))
- **Stories:** add storybook ([524d898](https://github.com/live-codes/livecodes/commit/524d898cef14fa02f7c47bec1290632c09befe3e))
- **Stories:** add storybook controls for config and embed options ([86799ec](https://github.com/live-codes/livecodes/commit/86799ec7d0aa8189b07b9c85b10fdb85a76e7be7))
- **sync:** communicate with SimpleStorage from web worker ([e6d9192](https://github.com/live-codes/livecodes/commit/e6d9192cabf7df4795799570b9646aa788a759df))
- **sync:** implement autosync ([2b811d3](https://github.com/live-codes/livecodes/commit/2b811d307d6679e8ac0249ae65f761fa7819bb61))
- **sync:** show sync status ([bbaf924](https://github.com/live-codes/livecodes/commit/bbaf92487d214f579ae53cab671f409afe79d03c))
- **templates:** add javascript starter template ([7b39c96](https://github.com/live-codes/livecodes/commit/7b39c96796b62b65c091fa693cafeb92824b0a5f))
- **templates:** add jest and jest/react starter templates ([43312b2](https://github.com/live-codes/livecodes/commit/43312b20939bceea2e57ebe3662a4ba0e7e51363))
- **templates:** add Julia starter template ([e3aeeae](https://github.com/live-codes/livecodes/commit/e3aeeae23a4d2676ecf7ce30adc7597aa3150f49))
- **templates:** add ocaml starter template ([f34d800](https://github.com/live-codes/livecodes/commit/f34d80077cc2f32ef770ee1d8a043d04493e5aa4))
- **templates:** add reason starter template ([426b06f](https://github.com/live-codes/livecodes/commit/426b06f36cc0c9d95a50fa41b8bbce97ecb5aeb8))
- **templates:** load default template ([4fd2925](https://github.com/live-codes/livecodes/commit/4fd2925907bcfa16460c242c154eb49a5d7400f6))
- **templates:** UI for selecting default template ([748ce28](https://github.com/live-codes/livecodes/commit/748ce283151aeee4b4cfd65125e8f3fcff7b4041))
- **templates:** upgrade react starter template to v18 ([2bbc595](https://github.com/live-codes/livecodes/commit/2bbc5955c545d7ddd1b50ba91cefe1a6a71d8d4e))
- **templates:** use signals in preact template ([4c92f7f](https://github.com/live-codes/livecodes/commit/4c92f7f9d96c2a3845503a9f472196337249c9d1))
- **tests:** add user tests to toolspane ([e54f2d8](https://github.com/live-codes/livecodes/commit/e54f2d8b573713ac225eaba60a3b2a813737a084))
- **tests:** add user tests to toolspane ([326bca1](https://github.com/live-codes/livecodes/commit/326bca11577990e5e53b1133d57eb3b935f5fe8c))
- **tests:** allow using chai assertions in tests ([dc1a630](https://github.com/live-codes/livecodes/commit/dc1a630d96810fa44f243874650a43764539a683))
- **tests:** compile user tests and map imports ([6ff5df6](https://github.com/live-codes/livecodes/commit/6ff5df6a9b09cc8dfb26848b11ef714484d3af8d))
- **tests:** compile user tests and map imports ([c7e0013](https://github.com/live-codes/livecodes/commit/c7e00135bbb4c576d06309f545fc90ef91fa27d2))
- **tests:** watch tests ([bb1823a](https://github.com/live-codes/livecodes/commit/bb1823a234e8bf3ccadf63eea4865a5ee5010c2d))
- **tests:** watch tests ([93e13fb](https://github.com/live-codes/livecodes/commit/93e13fb0593d0940f0006b3815603954fe47cc7b))
- **tools:** add zoom button ([59e3491](https://github.com/live-codes/livecodes/commit/59e349169ddecd99efdbeda8b110d59f2e14714a))
- **tools:** enable/disable tools in runtime ([a5518e4](https://github.com/live-codes/livecodes/commit/a5518e41fa3dd659f73d226240718b59039fea1f))
- **UI:** add close button for modals ([2ff3303](https://github.com/live-codes/livecodes/commit/2ff3303d55ff0543d16526dc19e92c37baaf907a))
- **UI:** add editor toolbar with buttons for common tasks ([6fed698](https://github.com/live-codes/livecodes/commit/6fed6981ee9d6c704dd750875478f03dacde110b))
- **UI:** add External Resources button to editor tools bar ([2ca095d](https://github.com/live-codes/livecodes/commit/2ca095d728acedbc66511a9a62d970f5c1ccff6b))
- **UI:** allow setting default view (via querystring `view`) to `editor` or `result` ([c54cf90](https://github.com/live-codes/livecodes/commit/c54cf90b495e9443d9c8308e919faae0b67c2e1b))
- **UI:** allow setting delay from app menu ([bf8e7c8](https://github.com/live-codes/livecodes/commit/bf8e7c833e3d8b6d2ae1922339690d5f73d934b8))
- **UI:** change 404 image ([bf89f44](https://github.com/live-codes/livecodes/commit/bf89f44e22de6d8c457abd5135743f17fa5c5507))
- **UI:** close modal on pressing `Esc` keyboard shortcut ([3a932ea](https://github.com/live-codes/livecodes/commit/3a932ea083292219889be7a31027932db97ef2c6))
- **UI:** decrease tools pane buttons padding to allow more space ([16bc167](https://github.com/live-codes/livecodes/commit/16bc167dce0b85841548cffd54a453300ecb60d8))
- **UI:** highlight selected language menu item ([83f73bb](https://github.com/live-codes/livecodes/commit/83f73bbe6262803b940b9b986aa69988190a67bd))
- **UI:** improve copy button UI ([97a8ea0](https://github.com/live-codes/livecodes/commit/97a8ea011f939b278c4f275690249d1994a27e7a))
- **UI:** improve menus layout ([0117141](https://github.com/live-codes/livecodes/commit/01171417d4fe71fbaa61b99bb64c0c3e3a62966b))
- **UI:** notify user when downloading a large compiler ([46f768c](https://github.com/live-codes/livecodes/commit/46f768cabc49cc5474e24386674c6de74078da13))
- **UI:** show backup/restore in progress message ([d13c4d3](https://github.com/live-codes/livecodes/commit/d13c4d37ab209c9f89866fd915ae34e81235877e))
- **UI:** show URL length in share screen ([35bd0d5](https://github.com/live-codes/livecodes/commit/35bd0d53161024122aa923069e01b4492bcae3ff))
- **UI:** use thin scrollbar ([6fb2d48](https://github.com/live-codes/livecodes/commit/6fb2d487e578fc367fe4b0088ed911117b45e912))
- **web:** add `OpenCode` component ([57ac7fc](https://github.com/live-codes/livecodes/commit/57ac7fc566dc88cc31838af10230a0ed35568ea2))
- **web:** add 404 page ([4cbf3ad](https://github.com/live-codes/livecodes/commit/4cbf3ad9d1da3b780e5307cb52d991c8d9875677))
- **web:** add code sample to homepage ([03d3963](https://github.com/live-codes/livecodes/commit/03d3963f20fadf3fb48f6969656030992f43472b))
- **web:** add docs website ([9cb490a](https://github.com/live-codes/livecodes/commit/9cb490a6fdaff501e9f78ae000248eeb5ea2c582))
- **web:** add Examples section ([a1f9422](https://github.com/live-codes/livecodes/commit/a1f9422200dbae06ea51457834adf121dc17fbf6))
- **web:** add link to starter templates on homepage ([4f7618c](https://github.com/live-codes/livecodes/commit/4f7618caaffdd0b7a4d804dfa7ebab01b7dea820))
- **web:** build website home page ([f07a13a](https://github.com/live-codes/livecodes/commit/f07a13a906d4564f8b840059c2cf52fb4a0e4821))
- **web:** format code samples ([168dacc](https://github.com/live-codes/livecodes/commit/168dacc3edf2dbef7f3278a6e963c056484b462f))
- **web:** show code for LiveCodes embed ([0dd9205](https://github.com/live-codes/livecodes/commit/0dd9205cabe5d57cf6976ab10497414d1eb2b024))
- **welcome:** add recent starter templates to welcome screen ([97cf8b8](https://github.com/live-codes/livecodes/commit/97cf8b8f843497c80a1a1cca20477d39391a6109))
- **welcome:** allow project recover from welcome screen ([15b6aff](https://github.com/live-codes/livecodes/commit/15b6affab5b0029761ff5fdb6a44ac97aa84d7d2))
- **welcome:** hide recover section after save or cancel ([a2c3bcc](https://github.com/live-codes/livecodes/commit/a2c3bccda55d8fdc554ead2bfc482714eb94d160))
- **welcome:** improve welcome screen UI ([391438c](https://github.com/live-codes/livecodes/commit/391438cbfdff6499b2dc7963b2e600f9499971d6))
- **welcome:** show recent projects in welcome screen ([52ee33a](https://github.com/live-codes/livecodes/commit/52ee33aa4888699c49dfa0381f259f37536156c5))
- **welcome:** show welcome screen ([1b34de9](https://github.com/live-codes/livecodes/commit/1b34de96894b92989ca6189d7b19980ec1eab0cd))

### Bug Fixes

- **API:** allow API to set full `Config` not just `ContentConfig` ([69ff21d](https://github.com/live-codes/livecodes/commit/69ff21d9417bbfd426d99bf490a8100668c6e412))
- **app:** add `es-module-shims` to app.html ([2c27485](https://github.com/live-codes/livecodes/commit/2c274853c0104e85d1badf0b92bb5378577e923a))
- **app:** avoid unnecessary run before importing external content ([d9d0499](https://github.com/live-codes/livecodes/commit/d9d04994b2918adc7889bf1d0e6cd879c89e7b07))
- **app:** do not load defaults (template/last used language) if language is specified in query params ([1c8da65](https://github.com/live-codes/livecodes/commit/1c8da65329c5e6ae5dddc8cd21d0c9419ab3d66f))
- **app:** fix export all sorting ([bbbaef8](https://github.com/live-codes/livecodes/commit/bbbaef8f6d5a55872f0c9c6f8d807ed9cdb24df7))
- **app:** fix loading user config ([fab4976](https://github.com/live-codes/livecodes/commit/fab49764a5aa23dcb9e9fdfb318762da11fa9604))
- **app:** fix security issues and unify UI ([c6e74fe](https://github.com/live-codes/livecodes/commit/c6e74feb3e225076b4c7ddfd12fbe84f9ad95ed5))
- **app:** if mode is codeblock, set config as readonly ([b972879](https://github.com/live-codes/livecodes/commit/b972879568ce23ca96b45735d0f46127f9ccc4b6))
- **app:** import external content on loading config ([4328d53](https://github.com/live-codes/livecodes/commit/4328d533d55693857817c866c043d7aa29067211))
- **backup:** handle the case of selecting no stores to backup ([754e6b7](https://github.com/live-codes/livecodes/commit/754e6b7e3d8e1da9e5b6755acb9dd459beef9320))
- clean css duplicates ([d3873ef](https://github.com/live-codes/livecodes/commit/d3873ef9e10756a72b5bc72f7a338f8b40947745))
- **compilers:** fix diagrams compiler errors ([e5449a2](https://github.com/live-codes/livecodes/commit/e5449a23c372e915dba20f6fca385f693be5cde6))
- **compilers:** fix loading rich text projects ([ce3c894](https://github.com/live-codes/livecodes/commit/ce3c894710166ca7fc93d28750efebb8c6c15046))
- **editor:** fix codeblock and show line numbers ([093830a](https://github.com/live-codes/livecodes/commit/093830a9302a675125c77616380dcbf539df0bf7))
- **editor:** fix losing focus on format ([cc51883](https://github.com/live-codes/livecodes/commit/cc5188344afa609a58fd759db7c6d1074c3cf72e))
- **editor:** fix losing types on language change ([cd88f67](https://github.com/live-codes/livecodes/commit/cd88f67c2ed7a305fd77ab08aad60b890fba350d))
- **editor:** fix overriding monaco autocomplete overlay style ([28be0fd](https://github.com/live-codes/livecodes/commit/28be0fd42d47b4ada6716e4b6309a0015d15faf6))
- **embed:** avoid changing browser history in embeds ([8d1e21e](https://github.com/live-codes/livecodes/commit/8d1e21e92341e92b43ff2eb45c2a03cbd7d6ce5f))
- **embed:** fix logo link in result mode ([52b9466](https://github.com/live-codes/livecodes/commit/52b94660bf8ad46cbca1763a83ec5f0be1ad88ed))
- hide duplicate tags (from sync) ([e60f162](https://github.com/live-codes/livecodes/commit/e60f1621cbd1f8b4f6eeeadf5fe8cc95042ee60d))
- inject css to fix FOUT in index.html ([4ceaf98](https://github.com/live-codes/livecodes/commit/4ceaf98661ea04743cce01988bbd26ac4fc814cd))
- move from UserData to AppData ([2ad2dc0](https://github.com/live-codes/livecodes/commit/2ad2dc0682aa135cb46ccb6ef8c277569d071ec2))
- **npm-package:** fix loading config object ([663941c](https://github.com/live-codes/livecodes/commit/663941c89c7e68c275da21813e531d89cb55fda0))
- postMessage origin for loading default template ([23cc869](https://github.com/live-codes/livecodes/commit/23cc8695482354686eaa8cc2a47ecb397278fbc8))
- **result:** fix converting `require` if used as method ([99c587a](https://github.com/live-codes/livecodes/commit/99c587a0e8c05fe9aa0268594078d47da72f3b7d))
- **result:** fix result flush ([d74a759](https://github.com/live-codes/livecodes/commit/d74a759e1f8bfe06025d5dee5419e3a2ac587e70))
- **result:** remove messaging script from result in exports ([e7415e0](https://github.com/live-codes/livecodes/commit/e7415e0ae5655c6e7541591e2dbb1f137a9807cd))
- **SDK:** prevent react SDK from rerendering ([d265d2a](https://github.com/live-codes/livecodes/commit/d265d2a60494d5489b80fa27226af85adc712ad7))
- **services:** fix share service ([67fe70a](https://github.com/live-codes/livecodes/commit/67fe70a665a320bce977d907c841d62eba474cce))
- **sync:** do not re-download unchanged remote sync data ([1a56d48](https://github.com/live-codes/livecodes/commit/1a56d4831193cafbb4ede9d6451fc1ca4ba87c08))
- **sync:** fix sync (cache and encoding) ([feec8d5](https://github.com/live-codes/livecodes/commit/feec8d57516109f028d3e5b88a00f74e9e6a93d0))
- **templates:** fix loading starter template from unsaved project ([2f09967](https://github.com/live-codes/livecodes/commit/2f09967da223d2de9f6db8bb851edf38a305e6b6))
- **tests:** fix chai assertion messages by importing chai from jsdelivr(+esm) ([0b9cef0](https://github.com/live-codes/livecodes/commit/0b9cef0ae1d91b81f8e513264d8d209927766b90))
- **tools:** fix firing onActivate on resizing tools pane ([6e26981](https://github.com/live-codes/livecodes/commit/6e26981bb8bcc2a540cd868c9bf6b5a98e4f2c8f))
- **UI:** disable autofocus in embeds ([b009f74](https://github.com/live-codes/livecodes/commit/b009f742d91e09018fe922c02023c98c604c8232))
- **UI:** fix focus on hidden editors ([2453121](https://github.com/live-codes/livecodes/commit/24531216309ddf9a8ff93feb57f9f6d5bea55511))
- **UI:** fix logo link ([b72ce80](https://github.com/live-codes/livecodes/commit/b72ce80844b599ca36926ab96408d38f855be3a8))
- **UI:** fix logo link ([7bbebe1](https://github.com/live-codes/livecodes/commit/7bbebe13b3661e0becb4f49e71e467751f2721f0))
- **UI:** fix multi-column submenu ([70b7e05](https://github.com/live-codes/livecodes/commit/70b7e050e7807d319c080c8a89a8424879045513))
- **UI:** fix settings menu external resources handler ([9bbd933](https://github.com/live-codes/livecodes/commit/9bbd93366bd4545779c7b869b63f152c57ade6c3))
- **UI:** remove formatting on paste to project title ([198e2b8](https://github.com/live-codes/livecodes/commit/198e2b84bf718748d2fc230f2c25b38fe67bf5ca))
- **web:** fix show code styles ([b714e4f](https://github.com/live-codes/livecodes/commit/b714e4f0eb32fb95f92af323dbdd03550f12d132))

- **API:** rename exported method to `createPlayround` ([6e086f2](https://github.com/live-codes/livecodes/commit/6e086f26dc4469adc28a08c9d51b8c5cd0c5d22f))

---

## [v0.4.0](https://github.com/live-codes/livecodes/compare/v0.3.0...v0.4.0) (2021-11-19)

### ⚠ BREAKING CHANGES

- **config:** remove `baseUrl` config option
- **config:** `config.modules` has been replaced by `config.imports`
- **config:** use config option `activeEditor` instead of `language`
  (automatically changed in config upgrade)
- **config:** `autoprefixer` config option moved to `processors.postcss`

### Features

- **API:** expose API ([7114905](https://github.com/live-codes/livecodes/commit/7114905f6f7d6e0a132523682c672eaffd8cec00))
- **app:** allow enabling specific languages/editors ([e11d857](https://github.com/live-codes/livecodes/commit/e11d8577f8fcac9bb980a41726182fa38841fadf))
- **app:** allow to restore last unsaved project ([06bd659](https://github.com/live-codes/livecodes/commit/06bd659c67b5852da223cc61646d4801e82f2ddf))
- **app:** convert to async indexedDB storage using localforage ([28c637a](https://github.com/live-codes/livecodes/commit/28c637aad37e6b21f70585b554701794e373482d))
- **app:** organize saved projects ([4ea78f6](https://github.com/live-codes/livecodes/commit/4ea78f60e062014c95a4a6830902a6711486f702))
- **auth:** github auth ([5e1074a](https://github.com/live-codes/livecodes/commit/5e1074acea8317b319818b8fd379515470da7d68))
- **auth:** Lazy load authentication ([58c70a8](https://github.com/live-codes/livecodes/commit/58c70a8f744e38270fc4734c37109ee5965e6a05))
- **compilers:** add AssemblyScript language support ([2ada4d6](https://github.com/live-codes/livecodes/commit/2ada4d687633b0308134a78cd17d18bdaa121c19))
- **compilers:** add babel as compiler ([b545498](https://github.com/live-codes/livecodes/commit/b54549822ee4286b12fd1a3335cea2527758fc93))
- **compilers:** add blockly ([38bcd53](https://github.com/live-codes/livecodes/commit/38bcd53d110bdda26364705492a53206390d4fc6))
- **compilers:** add custom settings for brython python compiler ([20f2e1e](https://github.com/live-codes/livecodes/commit/20f2e1e9a359b22b2f037c6c9b42c5f62ccae141))
- **compilers:** add dependencies and aliases for compilers ([b2cadc2](https://github.com/live-codes/livecodes/commit/b2cadc28bcae9e6a68faa7890560afec9c0fd4f4))
- **compilers:** add doT compiler ([cee6db4](https://github.com/live-codes/livecodes/commit/cee6db4698c78a71816c093103575c0132127663))
- **compilers:** add EJS compiler ([75b8c51](https://github.com/live-codes/livecodes/commit/75b8c5137694e7f947640a9ecaf4a1edfb11601a))
- **compilers:** add haml language support ([2751fc9](https://github.com/live-codes/livecodes/commit/2751fc998a1e35a7cf883a2ae0e44b19f2557d54))
- **compilers:** add Handlebars compiler ([c8f99fb](https://github.com/live-codes/livecodes/commit/c8f99fb9ac727bce462ee11bd8c5bce4987f2b4d))
- **compilers:** add language info ([2fb3558](https://github.com/live-codes/livecodes/commit/2fb3558d55000518c89a32e5d63341435a35e1e3))
- **compilers:** add LiquidJS ([4d3348c](https://github.com/live-codes/livecodes/commit/4d3348cdedc0f2d63285e1ddd07a33e3fac32dce))
- **compilers:** add livescript language support ([2a2cafc](https://github.com/live-codes/livecodes/commit/2a2cafc1301ec147599b5d06d72e0ade805004bb))
- **compilers:** add lua language support ([2616156](https://github.com/live-codes/livecodes/commit/26161566e0068bb9cee0e49787e6f93437dd96ff))
- **compilers:** add MDX support ([68bde77](https://github.com/live-codes/livecodes/commit/68bde773849834af0459af5e0296ae8dc3fd5c0e))
- **compilers:** add Nunjucks compiler ([71bcc6a](https://github.com/live-codes/livecodes/commit/71bcc6afe7d2441ebb0e7ff96c02440376b51821))
- **compilers:** add Perl language support ([3fb78a6](https://github.com/live-codes/livecodes/commit/3fb78a6d47677e01c7b080951fc74715d33d6d69))
- **compilers:** add PHP language support via uniter ([6b585ca](https://github.com/live-codes/livecodes/commit/6b585cad71e87649c0afe57d53f08f88b676393a))
- **compilers:** add postcss plugins support ([83baa78](https://github.com/live-codes/livecodes/commit/83baa7894e24439a75e399b88f0b475fecd9ed96))
- **compilers:** add pyodide as additional python compiler ([727f654](https://github.com/live-codes/livecodes/commit/727f65476239d04a1ee68fdbcf55376f175aec09))
- **compilers:** add Python language support via Brython ([bed2e0c](https://github.com/live-codes/livecodes/commit/bed2e0c3b8dcbf2d5cc1dfd6d8a599191d40d3d3))
- **compilers:** add ReScript support ([8ab265d](https://github.com/live-codes/livecodes/commit/8ab265d0802814d0e8e2b6739fe27b5715e3c085))
- **compilers:** add Scheme language support ([39f9931](https://github.com/live-codes/livecodes/commit/39f99315229fc897173f310aaa5a8615637668c1))
- **compilers:** add solidjs support ([6ca125f](https://github.com/live-codes/livecodes/commit/6ca125fb3cdd730d5de0ccebf160d1f920102d93))
- **compilers:** add SQL language support ([8923111](https://github.com/live-codes/livecodes/commit/89231117ff30e954da43fa158818e33d36ee0fc9))
- **compilers:** add Stencil support ([b9bca2c](https://github.com/live-codes/livecodes/commit/b9bca2cd1fb0318f4425661a18b035bcc5c2ae0c))
- **compilers:** add support for Astro ([01f38d7](https://github.com/live-codes/livecodes/commit/01f38d76145ee3a03cdcde94546d1281f7a7941b))
- **compilers:** add support for Go ([f74b7b3](https://github.com/live-codes/livecodes/commit/f74b7b3ab2f5ef310e1f6b25e2e8850832bb79a1))
- **compilers:** add support for malinajs ([18b7da2](https://github.com/live-codes/livecodes/commit/18b7da21b56fb997c5c14897a58e624f37e0e325))
- **compilers:** add support for React Native ([d72b5dd](https://github.com/live-codes/livecodes/commit/d72b5dd8b3c90e0e64bd35701b004ed0735a6231))
- **compilers:** add support for Reason and OCaml ([0d21867](https://github.com/live-codes/livecodes/commit/0d21867be062f45233cfe7250da1f9585d38544e))
- **compilers:** add support for Riot.js ([0e01bf4](https://github.com/live-codes/livecodes/commit/0e01bf4a4c347bb1191958a34b3d5aaffe040c2a))
- **compilers:** add support for Twig templating engine ([3b6f214](https://github.com/live-codes/livecodes/commit/3b6f214757abaf254987137e497ed2ec76b6c586))
- **compilers:** add Svelte support ([fdb1e17](https://github.com/live-codes/livecodes/commit/fdb1e17758b696f4b5c4eddb99d7d52a004a2659))
- **compilers:** add tailwindcss JIT compiler ([4336916](https://github.com/live-codes/livecodes/commit/433691684ae161a50aceaf0201535f1dc2a58a95))
- **compilers:** add TSX support, with intellisense for react ([d706f56](https://github.com/live-codes/livecodes/commit/d706f564348071b3fdebe0666e21127f2ca69abd))
- **compilers:** add Vue 2 SFC support ([71bb81d](https://github.com/live-codes/livecodes/commit/71bb81d1000e4e8abab1886c967e7ccdbf544f4b))
- **compilers:** add Vue 3 SFC support ([2173eac](https://github.com/live-codes/livecodes/commit/2173eacd0b10c4272382ae8d54f58d923111f53f))
- **compilers:** add WebAssembly Text Format ([aaea694](https://github.com/live-codes/livecodes/commit/aaea6945f549436d5d33099f9228219f23f85054))
- **compilers:** add windicss ([cab11f6](https://github.com/live-codes/livecodes/commit/cab11f6303295cd061b46b45a428e9f4fc4e0689))
- **compilers:** allow compiler to use other compilers ([2719fed](https://github.com/live-codes/livecodes/commit/2719fedef3a24a3038875ae46bcd8e2b8189b969))
- **compilers:** allow compilers to live reload ([3cbee30](https://github.com/live-codes/livecodes/commit/3cbee30610b2b0fd7545b08ce40994e1782b05aa))
- **compilers:** allow compiling in the sandboxed iframe outside the web worker ([5d356fa](https://github.com/live-codes/livecodes/commit/5d356fa6ca274fa080508d4d792c9c65684697ce))
- **compilers:** allow dynamically adding scripts to result page during compile ([2b19ae1](https://github.com/live-codes/livecodes/commit/2b19ae14573633c357297c85d35cc141596049fc))
- **compilers:** allow importing CSS from URL and from CDN ([5fb6b58](https://github.com/live-codes/livecodes/commit/5fb6b58817288baccf9c24653e54c6e53fecb6fc))
- **compilers:** allow importing python modules from external URL by setting pythonpath ([4b5f960](https://github.com/live-codes/livecodes/commit/4b5f960a13f45f138daf29f1c4a813a2fcb6e33a))
- **compilers:** allow loading db file or sql scripts from URL ([57c54d8](https://github.com/live-codes/livecodes/commit/57c54d82fceb70cc9e5e8610acd09ef5f22df520))
- **compilers:** allow using processors (compilers) for SFC blocks ([866cd40](https://github.com/live-codes/livecodes/commit/866cd405879fe1838208dec76d91116760e26204))
- **compilers:** dom manipulation using blockly ([c2ec045](https://github.com/live-codes/livecodes/commit/c2ec0452e02b96b672a19f373904730ab9414655))
- **compilers:** enable style import in vue SFC ([ece3bf2](https://github.com/live-codes/livecodes/commit/ece3bf27ccb9c17c0f82f34527c61cf0e6a76b0b))
- **compilers:** enable users to configure compilers via custom config scripts in markup ([67c6cdf](https://github.com/live-codes/livecodes/commit/67c6cdf58074681f3126957b04edaebd7827aa20))
- **compilers:** haml dynamic evaluation ([8587a17](https://github.com/live-codes/livecodes/commit/8587a173d7344f25ea74047e6537217a9c21f47e))
- **compilers:** prerender markup templating engines by default ([083be37](https://github.com/live-codes/livecodes/commit/083be37d89e484c9f6dcda9329b068f19b91d007))
- **compilers:** Pug templates load as prerendered or dynamic ([40892a5](https://github.com/live-codes/livecodes/commit/40892a5eb6149d3efadce17ad5a18371c4eada93))
- **compilers:** run compilers in sandboxed iframe ([163db41](https://github.com/live-codes/livecodes/commit/163db41303b95ae8fd83d72ea5280ce001bdbcf2))
- **compilers:** send compiler messages to console ([c67ea42](https://github.com/live-codes/livecodes/commit/c67ea42d05977cffdfd0550ae2df7941cd73fb7b))
- **compilers:** support processors in riotjs components ([2e3f55d](https://github.com/live-codes/livecodes/commit/2e3f55dd7a17b67a2bc933a578d9a24ae77a35d4))
- **config:** add version to config ([0b3c050](https://github.com/live-codes/livecodes/commit/0b3c0506ed0dfa5653675f9923399ebd582e90e0))
- **config:** store user config ([45de26b](https://github.com/live-codes/livecodes/commit/45de26b12dd984281dded89f4ab00417c6754d0b))
- **config:** upgrade config from previous versions ([237c137](https://github.com/live-codes/livecodes/commit/237c13737398864ee8bb75108b792a47647e32ec))
- **config:** validate config before load ([e2f82bf](https://github.com/live-codes/livecodes/commit/e2f82bf6f7c818626f5cb0bff1ba8e7a8963ae1a))
- **deploy:** allow committing source code and result as separate files ([a183ede](https://github.com/live-codes/livecodes/commit/a183edecc64b789aa447c593e5b298370b854a28))
- **deploy:** allow deploy to github pages ([997ab39](https://github.com/live-codes/livecodes/commit/997ab398994ad61bab93c6fccb4bea74db103073))
- **editor:** add codemirror emmet support ([f4c2c0f](https://github.com/live-codes/livecodes/commit/f4c2c0ff1218fc5cb501836b2de5a8207518e002))
- **editor:** add prismjs as readonly code editor ([5c0b6c2](https://github.com/live-codes/livecodes/commit/5c0b6c2fe0acc616d61042e1aafbeefca75c5c94))
- **editor:** allow defining custom types for languages ([bae28f3](https://github.com/live-codes/livecodes/commit/bae28f322115f4f683a66e58048456cd29bd9fc6))
- **editor:** autoload typescript types ([777a96f](https://github.com/live-codes/livecodes/commit/777a96fa3ca36e8923c9bfd4b638437e76ae67da))
- **editor:** create CodeEditor interface ([f788857](https://github.com/live-codes/livecodes/commit/f7888578d623d69a2c074533672a9f26d20372bf))
- **editor:** dynamically load monaco-editor or codemirror ([24d8143](https://github.com/live-codes/livecodes/commit/24d814384bd18b03f593690c67b4f15f55991824))
- **editor:** fallback to codemirror on-error loading the editor ([e151b2c](https://github.com/live-codes/livecodes/commit/e151b2cdec184c067b9cd7af719a291151926f4c))
- **editor:** show npm package info on hover (in monaco) ([7de356c](https://github.com/live-codes/livecodes/commit/7de356c1e1fefff972b99023315533f9f2c130e4))
- **embed:** add "edit in LocalPen" link ([3d83d97](https://github.com/live-codes/livecodes/commit/3d83d97fc5439a4dd814ab6efee991fb1941eff2))
- **export-share:** allow sharing project by URL ([f929c7a](https://github.com/live-codes/livecodes/commit/f929c7ae105c2de2a99e9528df9e4023537e2784))
- **export-share:** enable social share ([bd5ea08](https://github.com/live-codes/livecodes/commit/bd5ea08cbc694303dc48da69ec6f436fc6ccaacd))
- **export-share:** export all saved projects ([38c6589](https://github.com/live-codes/livecodes/commit/38c6589aa5a824b6624bc4058620c3133a661aa4))
- **export-share:** export to github gist ([23d30f4](https://github.com/live-codes/livecodes/commit/23d30f4e55929250f401adfa3aa4ab80ebcc6aa5))
- **export-share:** share permanent or short url ([8cc7b78](https://github.com/live-codes/livecodes/commit/8cc7b78dee29057f44ccea5ee4830f8f6b6230ff))
- **export-share:** show share url ([e36ede8](https://github.com/live-codes/livecodes/commit/e36ede87ae4c7c862d108dc637fbc709230f4e0b))
- **export-share:** use dpaste.com for share service ([c57f72b](https://github.com/live-codes/livecodes/commit/c57f72ba8368ba71b5a2e4e3ecec980b9eea198f))
- **formatter:** add Go formatter ([a47d073](https://github.com/live-codes/livecodes/commit/a47d073ebd9f42ef8f3f93e8037d1ab7313df754))
- **import:** allow logged in user to import from private github repos ([4a23f7a](https://github.com/live-codes/livecodes/commit/4a23f7aeb7a89d879f3eec38a3aaa7d6dfa92b0a))
- **import:** bulk import projects ([859cad1](https://github.com/live-codes/livecodes/commit/859cad185c413187f2322a1d287c4b5b40cbcd05))
- **import:** import from JS Bin ([2b1a559](https://github.com/live-codes/livecodes/commit/2b1a559df9c7d9cce1f2b36027a35a6d86bc31e9))
- **import:** improve auto identification of raw code on import ([3b08cbe](https://github.com/live-codes/livecodes/commit/3b08cbeb8139c72bee42e47df35c40c57f7eb657))
- **import:** use cors service for url import ([42c25c6](https://github.com/live-codes/livecodes/commit/42c25c6dd155826178b324d6e6c7aaabee5d159f))
- **import:** use cors service to import from JS Bin ([2c1ae89](https://github.com/live-codes/livecodes/commit/2c1ae8998ec2a7c67a64914f74de41a99cc9fdbb))
- **result:** move result page to a separate subdomain ([a4a0186](https://github.com/live-codes/livecodes/commit/a4a0186addbcde10f0f7169ace515240831c2dc2))
- **result:** use the standard import-maps instead of custom modules ([1a50ac5](https://github.com/live-codes/livecodes/commit/1a50ac52fc3b53e429be0f6990e15f81ae87d9d8))
- **services:** add cors service ([0fc2230](https://github.com/live-codes/livecodes/commit/0fc2230f863bc4760a62cf46dd94433a27149cea))
- **services:** add services for API access ([e5e831b](https://github.com/live-codes/livecodes/commit/e5e831bce4deb23014b7ac6a3402beda273ad879))
- **services:** allow specifying CDN service to use for bare modules import ([aaef9f1](https://github.com/live-codes/livecodes/commit/aaef9f1a275ea93ca8b367ee8b03c6aa189145ca))
- **services:** create result service ([d36cc39](https://github.com/live-codes/livecodes/commit/d36cc39882889dd1976431a3245fac2741e167c1))
- **services:** use domain alias for result page ([7cfbf80](https://github.com/live-codes/livecodes/commit/7cfbf803f4ce0a4fa3e57fb4eddeb8edcb684270))
- **templates:** add backbone starter template ([48de466](https://github.com/live-codes/livecodes/commit/48de466a0105969b203ac1d847d1a5b6f99f5d56))
- **templates:** add coffeescript starter template ([02b6e32](https://github.com/live-codes/livecodes/commit/02b6e321025b1728bdca3600bbcd22dc93e0a216))
- **templates:** add Go starter template ([bceeca5](https://github.com/live-codes/livecodes/commit/bceeca55079bfef53420f28acf2db281797b3d4c))
- **templates:** add knockout starter template ([37287b1](https://github.com/live-codes/livecodes/commit/37287b1b8a89bc71cce69b8de0ed76d617743cfb))
- **templates:** add Polymer starter template and improve baseUrl mapping in templates ([a946a26](https://github.com/live-codes/livecodes/commit/a946a26821efe30f3e1818b070ac45ab11c430b4))
- **templates:** add ReScript starter template ([a69bd74](https://github.com/live-codes/livecodes/commit/a69bd74630500f866f983215780f4f7e428e8727))
- **templates:** add Riot.js starter template ([fd9717b](https://github.com/live-codes/livecodes/commit/fd9717bff05f0e656f304a2969af080958472be0))
- **templates:** add solid starter template and typescript support ([5b80f9b](https://github.com/live-codes/livecodes/commit/5b80f9bfc9bc9318419dd61228a22c33d9294660))
- **templates:** allow loading starter template by name from query string param ([38f3587](https://github.com/live-codes/livecodes/commit/38f3587ffc742dd7b5e64c951ab3f4bd1a980ee2))
- **UI:** add light theme ([d24953d](https://github.com/live-codes/livecodes/commit/d24953d3183d9ab41676033948432a50c5c858fa))
- **UI:** add project info screen ([5d35416](https://github.com/live-codes/livecodes/commit/5d354163f3b093816acc5c264286fd19eb91f121))
- **UI:** add project info screen ([a691e71](https://github.com/live-codes/livecodes/commit/a691e7140a613f3f4427b7028324bd3478f1596c))
- **UI:** add result button ([9aa2f3e](https://github.com/live-codes/livecodes/commit/9aa2f3e7f74a2bd66d3e74c3e9836c7c4c11dbd1))
- **UI:** add tags in project info ([7509d10](https://github.com/live-codes/livecodes/commit/7509d10e928ca7e589340745f7ef74633154adf3))
- **UI:** add tooltips ([be6b5e3](https://github.com/live-codes/livecodes/commit/be6b5e39ad63a25dc3a92739bee62e29a92a5fc8))
- **UI:** allow adding language info ([3d4484e](https://github.com/live-codes/livecodes/commit/3d4484ec1de10a013ff3dc94648d91934b29cec3))
- **UI:** allow adding language info ([a3422cb](https://github.com/live-codes/livecodes/commit/a3422cb868177053a7b00dcb5bce06b78bf3a43e))
- **UI:** allow language menus to scroll ([12a9f98](https://github.com/live-codes/livecodes/commit/12a9f98d0edcf20e221a79c5e4b9a435852b243a))
- **UI:** allow showing UI screens from query string ([a698adb](https://github.com/live-codes/livecodes/commit/a698adb275128c72b86c976a933e5e037662f00e))
- **UI:** modify UI for postcss plugins ([aa0f12b](https://github.com/live-codes/livecodes/commit/aa0f12b8aaf296f9ac760e51021c6bf8752fb5ac))
- **UI:** multi-column language menu ([edf3df8](https://github.com/live-codes/livecodes/commit/edf3df87379c28425ab919e17bac877c6e06932d))
- **UI:** multi-column settings menu ([761e809](https://github.com/live-codes/livecodes/commit/761e80903364a6568d4babccb190963544258bcb))
- **UI:** set window title to reflect project title ([a191718](https://github.com/live-codes/livecodes/commit/a191718a470af1eb635b2f5b7df40b8e1c112f29))
- **UI:** show code/output on button click when the pane is closed ([f7f05f0](https://github.com/live-codes/livecodes/commit/f7f05f059b1ce306eebecbb3ecd0840354b8d963))
- **UI:** show loading screen when opening a saved project ([3304641](https://github.com/live-codes/livecodes/commit/3304641fdc41c12529619bdd4cde0446c7c391ee))
- **UI:** style scrollbars ([514883e](https://github.com/live-codes/livecodes/commit/514883e49e10cf1b0007733c62ec9ed12b9d8772))
- **UI:** updateUrl on save ([07c3ad5](https://github.com/live-codes/livecodes/commit/07c3ad5849369bd5280d603120487374eeb3a6a8))
- **UI:** use code editors for custom settings UI screen ([511caea](https://github.com/live-codes/livecodes/commit/511caea62684bb918bc10a256bf6e3776cec96d1))
- **UI:** use snackbar for notifications ([b5b5c9d](https://github.com/live-codes/livecodes/commit/b5b5c9d6cfeb33f1afe657f35d2a101d85e679f0))
- add config option to show version and git commit in console ([e700235](https://github.com/live-codes/livecodes/commit/e70023583db4a068cfd3d7cb3557a6c35b821725))

### Bug Fixes

- **app:** do not skip initial page load ([9769fd2](https://github.com/live-codes/livecodes/commit/9769fd2617dfe27e96aa332ca55875005438d1ff))
- **app:** fix detecting style-only changes ([b91a392](https://github.com/live-codes/livecodes/commit/b91a392ebcc02e1d3015205345cc733c61cf7d7d))
- **app:** fix saved status ([687c575](https://github.com/live-codes/livecodes/commit/687c575c08ac44093c1070d966587e4cd10721d0))
- **compilers:** compile and replace imports astro frontmatter ([408735e](https://github.com/live-codes/livecodes/commit/408735e2f6b010a381ae823b27afcf86758abcf3))
- **compilers:** do not add DOM element if svelete customElement is enabled ([8c3f330](https://github.com/live-codes/livecodes/commit/8c3f330b5df98e89543e1d26716dcb8f0c4a377b))
- **compilers:** fix cannot use import outside module ([e58cd28](https://github.com/live-codes/livecodes/commit/e58cd28179cca2e6935c539c6b925ef037fa8700))
- **compilers:** fix imports not being replaced in javascript ([87d733a](https://github.com/live-codes/livecodes/commit/87d733ac9abfe1eab065fc1418c8dbc817b55caa))
- **compilers:** fix Sass on safari ([9480361](https://github.com/live-codes/livecodes/commit/9480361d5827194520801b2e2ad233ba56c9bb36))
- **compilers:** use pyodide new API ([67a627b](https://github.com/live-codes/livecodes/commit/67a627b98af3dc02598be61a9d5d947d8fa46fee))
- **config:** remove `baseUrl` config options and always use the loaded module url ([14b7968](https://github.com/live-codes/livecodes/commit/14b7968c79b353408f7b59c4fb7bb6f4d65c3080))
- **editor:** editor.getLanguage() should return the actual language not the mapped one ([ecf5cba](https://github.com/live-codes/livecodes/commit/ecf5cbae354ef9472235238358b2ae212810eaed))
- **editor:** fix duplicate emmet suggestions ([0a930c9](https://github.com/live-codes/livecodes/commit/0a930c92e558fd117a9b5fb4599505586c14e985))
- **editor:** fix duplicate identifier in typescript ([27397fd](https://github.com/live-codes/livecodes/commit/27397fdb830ae1875c779bb8e8c6121750bd2622))
- **result:** escape closing script tags in script content ([77db4d9](https://github.com/live-codes/livecodes/commit/77db4d9d63936cc290274740d89f65ffc8a7b463))
- improve restore state ([57a9b0a](https://github.com/live-codes/livecodes/commit/57a9b0a5df3d85a3ae8f3d966e8e9da5850396b7))
- race on monaco dispose ([59c48c2](https://github.com/live-codes/livecodes/commit/59c48c2f236c5d8e55c1ab4235cd429b5a4b9819))
- **compiled:** fix compiled code viewer going out of sync ([9493224](https://github.com/live-codes/livecodes/commit/9493224becf40d80735ceb8fdfa50f9b0d0f2fee))
- **compilers:** fix rescript compiler ([a7ad75c](https://github.com/live-codes/livecodes/commit/a7ad75c7af6694d81c7841df7df993a1c6d21be1))
- **console:** fix console (message source check) ([dfd3fd7](https://github.com/live-codes/livecodes/commit/dfd3fd7db5ed97fb53d21f8f3781b4ef24a0dc99))
- **editor:** fix autofocus active editor ([cf5b11c](https://github.com/live-codes/livecodes/commit/cf5b11c4c807017554baff3beb0bdbe59e7d86c2))
- **editor:** fix editor inconsistencies on changing languages ([3fb51a6](https://github.com/live-codes/livecodes/commit/3fb51a6afaf1f0fcbe659b95b4ac910fd8ee4205))
- **editor:** fix emmet multiple invocations ([f407d75](https://github.com/live-codes/livecodes/commit/f407d756890db1f2f897845d7a98e72cd25d66e0))
- **editor:** fix monaco duplicate types ([fdb4d33](https://github.com/live-codes/livecodes/commit/fdb4d335b97baa1aee816f0ae46c0e69399aadbc))
- **editor:** fix monaco language highlight for rescript, reason, and wat ([77f0956](https://github.com/live-codes/livecodes/commit/77f09566a5f870d7cdb321f2ad04d64dac2f8ee8))
- **editor:** fix monaco unhandled 'Canceled' promise rejection ([8e172b4](https://github.com/live-codes/livecodes/commit/8e172b4d4ef7295f81a10ed19f75f6ac25a4af11))
- **editor:** re-activate fixed test ([0e13c85](https://github.com/live-codes/livecodes/commit/0e13c859ef05b9c5a12fcbe12cee2bb9e238aea4))
- **import:** fix not selecting pug editor when importing github gist ([e123c42](https://github.com/live-codes/livecodes/commit/e123c42741e1770d3195d35f455f4307529412ad))
- **result:** move all styles and scripts to result head (only keep markup and editor script) ([40ebd85](https://github.com/live-codes/livecodes/commit/40ebd859621a747bb075e85d62c2e690841bf816))
- **UI:** fix allowLangChange ([1d78659](https://github.com/live-codes/livecodes/commit/1d7865927a421c5665ef21dae512a7f716d58d5f))
- **UI:** fix autocomplete error on closing deploy screen before fetching results ([118a58d](https://github.com/live-codes/livecodes/commit/118a58d3bcca3f4a0ceea09993ed67163e9d1700))
- **UI:** fix displayName null ([99e335f](https://github.com/live-codes/livecodes/commit/99e335f68dc0636fd2519d2d2f356dd1c647e311))
- **UI:** fix menus on safari ([5799560](https://github.com/live-codes/livecodes/commit/5799560bb91889bcc6b41067e16134e8a65f8d0b))
- **UI:** fix mobile layout ([ae0bb2d](https://github.com/live-codes/livecodes/commit/ae0bb2dd53fb26c5de024678a596cb692386e598))
- **UI:** fix modal click outside ([9b55b68](https://github.com/live-codes/livecodes/commit/9b55b68ace8d1fd0b3aa61e2400b1556d136be4a))
- **UI:** fix modal click outside ([c3ecf28](https://github.com/live-codes/livecodes/commit/c3ecf288e5f57ed7eba5993ec0c719c5c9840a71))
- **UI:** fix modal click outside to close ([5c27d62](https://github.com/live-codes/livecodes/commit/5c27d62b2e86c4543b5382436ddb55838598815f))
- **UI:** fix modal event listeners ([5f0c9ee](https://github.com/live-codes/livecodes/commit/5f0c9ee0fe525f955109be9df258078630430c86))
- **UI:** fix modes showing tools pane ([0a6da7e](https://github.com/live-codes/livecodes/commit/0a6da7e38deeb620219b7d20a43c2d4f40c70e58))
- **UI:** fix project title ([7f1411d](https://github.com/live-codes/livecodes/commit/7f1411d158e1759be0d659ef4f66b80a69f7e8c0))
- **UI:** fix safari ([31cea26](https://github.com/live-codes/livecodes/commit/31cea26fa57419210808ee324d75a045c972d19b))
- **UI:** fix settings menu container preventing interaction ([7517845](https://github.com/live-codes/livecodes/commit/7517845b7df80f2a31038c39aa6ef01d9af7860b))

- **config:** use config option `activeEditor` instead of `language` ([f951f79](https://github.com/live-codes/livecodes/commit/f951f794302e3255d39c16c98675916f886648ac))

---

## [v0.3.0](https://github.com/live-codes/livecodes/compare/v0.2.0...v.0.3.0) (2021-02-11)

### Bug Fixes

- **app:** await async functions ([3e647b7](https://github.com/live-codes/livecodes/commit/3e647b74db9a2568a45bd56213cffd24a4af7fc7))
- **console:** fix changed variable names ([c514815](https://github.com/live-codes/livecodes/commit/c5148152395099d3f2916e5b7c901ebe578f7700))
- **CSS Presets:** fix selecting CSS preset none ([8382605](https://github.com/live-codes/livecodes/commit/838260553c45373ceecf68ded67385f5fe80e6ee))
- **import:** fix importing github and gitlab repos root directory ([ba55e3d](https://github.com/live-codes/livecodes/commit/ba55e3d786d08cba38b37863d950f49fc914f6d5))
- **result:** use postMessage to send code to result page ([636acad](https://github.com/live-codes/livecodes/commit/636acada7782e0706a9912e1f4710ef6d1dfecb3))
- **UI:** fix settings menu too wide on small screens ([18f1159](https://github.com/live-codes/livecodes/commit/18f11597a061fcfa1015bd6c66f37488328cceb7))

### Features

- **compiled:** view compiled code ([f93e2ce](https://github.com/live-codes/livecodes/commit/f93e2cecf2909b25fb9f22fcb3bdd24a9b1a7ed3))
- **console:** add console input auto-complete for user code ([1115331](https://github.com/live-codes/livecodes/commit/1115331c672d1b9ac9dd3ba2a1f0251f344e4410))
- **console:** add JS console ([36a24e9](https://github.com/live-codes/livecodes/commit/36a24e9d1c8c060cc656e0dc9480efdc96c1539e))
- **console:** add tools pane ([aeefcb3](https://github.com/live-codes/livecodes/commit/aeefcb3b7940c58570d9a8f89c9185aaef92b89c))
- **console:** handle logging different data types ([9c59aad](https://github.com/live-codes/livecodes/commit/9c59aad4f5b40d337a03f7f1e705a3a45ee09965))
- **import:** load imports without page refresh ([cce9539](https://github.com/live-codes/livecodes/commit/cce9539d488056f87d7826da87dfb30587006032))
- **loading:** use animating logo as loading indicator ([f65753a](https://github.com/live-codes/livecodes/commit/f65753a22b37ca1a7602fbc7ed874ceb5502579a))
- **result:** show result page size on resize ([a48107e](https://github.com/live-codes/livecodes/commit/a48107e1e1edf2464d16c1ab9100a726b87db64f))
- **UI:** add loading indicator on tools pane ([8b8ea41](https://github.com/live-codes/livecodes/commit/8b8ea410fc440950c48bb4c9f509cf29fa3e2192))
- **UI:** scroll settings menu when longer than view port ([b706274](https://github.com/live-codes/livecodes/commit/b706274cc7e9a9908c5af9200da743211ea7a83b))

---

## [v0.2.0](https://github.com/live-codes/livecodes/compare/v0.1.0...v0.2.0) (2021-01-22)

### Bug Fixes

- **compilers:** fix baseUrl for sass worker ([25320a1](https://github.com/live-codes/livecodes/commit/25320a1c3700d72acf4821b6cc70bb703ba2ace5))
- **compilers:** fix Less transpiler ([d3e4174](https://github.com/live-codes/livecodes/commit/d3e4174c09c905761a24bc75abdccae790b103f2))
- display active editor on loadConfig ([737bce5](https://github.com/live-codes/livecodes/commit/737bce5f6d7f1be595b9e824636f3e9ee2610504))
- set active language on changing editor ([1e884d8](https://github.com/live-codes/livecodes/commit/1e884d8f95b1b49fbd939ad1d2c8303f10418d6d))

### Code Refactoring

- **result**: use blob URL as src for result iframe ([c7c61c8](https://github.com/live-codes/livecodes/commit/c7c61c8e3ccf329756f9751350f99a4564ff70e8))
- **config:** rename snakecase config params to camelcase ([6cc9c99](https://github.com/live-codes/livecodes/commit/6cc9c994c889d3dbcf19e8a1f856bc0b9b33c629))

### Features

- **result:** add iframe sandbox ([217d7ee](https://github.com/live-codes/livecodes/commit/217d7eefbfa51e3e7f80b038b2a54fadfbf97a93))
- **templates**: start new projects from templates ([d2fcdc5](https://github.com/live-codes/livecodes/commit/d2fcdc5d55e2ce5ba54047e05b480b476caf8f3d))
- **CSS Presets**: Add CSS Presets ([347fed8](https://github.com/live-codes/livecodes/commit/347fed8dd7c66a834e3df388ebfe95cde7714757))
- **formatter:** add prettier parser for pug ([b153098](https://github.com/live-codes/livecodes/commit/b15309809231abca546c1418f3260e0c2ed9f196))

### BREAKING CHANGES

- **config:** rename snakecase config params to camelcase

---

## v0.1.0 (2021-01-10)

- Initial public release
