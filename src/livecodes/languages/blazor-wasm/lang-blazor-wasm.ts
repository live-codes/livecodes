import type { LanguageSpecs } from '../../models';
import { monacoLanguagesBaseUrl } from '../../vendors';

/**
 * Blazor WebAssembly. Razor markup (and C#) is compiled and rendered in the result page by
 * `@live-codes/blazor-wasm`, which loads the .NET WebAssembly runtime, Roslyn and the Razor
 * compiler into the page. The source is not transformed at compile time: it is handed to the
 * result page in a `text/razor` script tag and rendered there by `lang-blazor-wasm-script.ts`.
 */
export const blazorWasm: LanguageSpecs = {
  name: 'blazor-wasm',
  title: 'Blazor (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-blazor-wasm-script.js}}'],
    scriptType: 'text/razor',
    compiledCodeLanguage: 'blazor-wasm',
  },
  extensions: ['razor', 'blazor', 'razor-wasm', 'wasm.razor'],
  editor: 'script',
  // Razor is markup with embedded C#. The HTML editor language is the closest fallback for
  // CodeMirror, which has no Razor mode.
  editorLanguage: 'html',
  editorSupport: {
    // Monaco's Razor grammar (Razor markup + embedded C#) from the monaco-languages package.
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'razor.js', language: 'razor' },
    // Prism's `razor` grammar is an alias of its `cshtml` component (Razor C#).
    codejar: { language: 'razor' },
  },
  largeDownload: true,
};
