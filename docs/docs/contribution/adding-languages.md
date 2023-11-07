# Adding Languages

## Criteria for a new language

- Has a syntax that needs to be compiled/transpiled to work in browsers (e.g. not a JS library).
- A compiler/runtime that runs [client-side](../why.md#client-side) in the browser (not on a remote server).
- Its output can be represented in a web page.
- Relatively popular (e.g. at least hundreds of GitHub stars/thousands of weekly downloads).
- Not [esoteric](https://en.wikipedia.org/wiki/Esoteric_programming_language) (otherwise, [convince me](https://github.com/live-codes/livecodes/discussions) if you have a good use case).
- The compiler/runtime is still reasonably maintained.
- The compiler/runtime has a permissive license compatible with MIT license.

If you still have doubts if the language qualifies, [let's discuss it](https://github.com/live-codes/livecodes/discussions).

## Checklist when adding

- [ ] Add [language specs](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/languages) and include that in the list of [languages](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/languages/languages.ts) or [processors](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/languages/processors.ts).
- [ ] The compiler +/- formatter should be lazy-loaded.
- [ ] If the compiler needs a separate build, add it to the [build script](https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/scripts/build.js#L207).
- [ ] If the compiler/formatter require installing new packages or adding static files (e.g. wasm) add them to the [browser compilers repo](https://github.com/live-codes/browser-compilers/) and load them from [CDN](https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/src/livecodes/vendors.ts#L1).
- [ ] Any links to CDN hosted assets should be referenced from [list of vendors](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/vendors.ts).
- [ ] Add language name and aliases to [models](https://github.com/live-codes/livecodes/blob/3a2617850f09487b9af92de862093f082942b8a9/src/sdk/models.ts#L129).
- [ ] Add editor support (e.g. syntax highlighting) for [Monaco](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/editor/monaco), [CodeMirror](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/editor/codemirror) and [Prismjs](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/editor/codejar/codejar.ts) (if not auto-loaded).
- [ ] Add [language info](https://github.com/live-codes/livecodes/blob/develop/src/livecodes/html/language-info.html).
- [ ] Consider adding a [starter template](https://github.com/live-codes/livecodes/tree/develop/src/livecodes/templates/starter). If you do, add it to the [list of starter templates](https://github.com/live-codes/livecodes/blob/develop/docs/src/components/TemplateList.tsx) in docs.
- [ ] Add [end-to-ends tests](https://github.com/live-codes/livecodes/tree/develop/e2e/specs).
- [ ] Add language [documentation](https://github.com/live-codes/livecodes/tree/develop/docs/docs/languages).
- [ ] Add language to documentation website [slider](https://github.com/live-codes/livecodes/blob/develop/docs/src/components/LanguageSliders.tsx).
- [ ] Add compiler/formatter [license(s)](https://github.com/live-codes/livecodes/blob/develop/vendor-licenses.md).
- [ ] Update language count badge in [README](https://github.com/live-codes/livecodes/blob/develop/README.md).
