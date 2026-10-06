import type { Config, LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { nimEditorSupport } from './nim-editor';

// Nim's WebAssembly target compiles to C and then through the Clang toolchain, so it runs like the
// Clang languages: the compiler here is a pass-through and the source reaches the result page as a
// `text/nim-wasm` tag, where `lang-nim-wasm-script.ts` compiles and runs it in a worker.
const getSettingsScript = (config: Config) => {
  const settings = getLanguageCustomSettings('nim-wasm', config);
  // `\u003c` keeps a `</script>` in a setting (e.g. a compile argument) from closing the tag.
  const serialized = JSON.stringify(settings).replace(/</g, '\\u003c');
  return `window.livecodes = window.livecodes || {};
window.livecodes.nimWasm = window.livecodes.nimWasm || {};
window.livecodes.nimWasm.settings = { "nim-wasm": ${serialized} };`;
};

export const nimWasm: LanguageSpecs = {
  name: 'nim-wasm',
  title: 'Nim (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-nim-wasm-script.js}}'],
    inlineScript: ({ config }) => getSettingsScript(config),
    scriptType: 'text/nim-wasm',
    compiledCodeLanguage: 'nim-wasm',
    liveReload: true,
  },
  extensions: ['nimwasm', 'nim-wasm', 'wasm.nim'],
  editor: 'script',
  editorSupport: nimEditorSupport,
  largeDownload: true,
};
