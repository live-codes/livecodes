import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { Config, LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

const getSettingsScript = (config: Config) => {
  const settings = getLanguageCustomSettings('crystal-wasm', config);
  // `\u003c` keeps a `</script>` in a setting (e.g. a compile argument) from closing the tag.
  const serialized = JSON.stringify(settings).replace(/</g, '\\u003c');
  return `window.livecodes = window.livecodes || {};
window.livecodes.crystalWasm = window.livecodes.crystalWasm || {};
window.livecodes.crystalWasm.settings = { "crystal-wasm": ${serialized} };`;
};

export const crystalWasm: LanguageSpecs = {
  name: 'crystal-wasm',
  title: 'Crystal (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-crystal-wasm-script.js}}'],
    inlineScript: ({ config }) => getSettingsScript(config),
    scriptType: 'text/crystal-wasm',
    compiledCodeLanguage: 'crystal-wasm',
    liveReload: true,
  },
  extensions: ['cr', 'crystal'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'crystal.js', language: 'crystal' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-crystal.js')).crystal),
    },
    codejar: { language: 'crystal' },
  },
  largeDownload: true,
};
