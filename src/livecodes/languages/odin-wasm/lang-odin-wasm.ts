import type { Config, LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

const getSettingsScript = (config: Config) => {
  const settings = getLanguageCustomSettings('odin-wasm', config);
  // `\u003c` keeps a `</script>` in a setting (e.g. a compile argument) from closing the tag.
  const serialized = JSON.stringify(settings).replace(/</g, '\\u003c');
  return `window.livecodes = window.livecodes || {};
window.livecodes.odinWasm = window.livecodes.odinWasm || {};
window.livecodes.odinWasm.settings = { "odin-wasm": ${serialized} };`;
};

export const odinWasm: LanguageSpecs = {
  name: 'odin-wasm',
  title: 'Odin (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-odin-wasm-script.js}}'],
    inlineScript: ({ config }) => getSettingsScript(config),
    scriptType: 'text/odin-wasm',
    compiledCodeLanguage: 'odin-wasm',
    liveReload: true,
  },
  extensions: ['odin'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'odin.js', language: 'odin' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-odin.js')).odin(),
    },
    codejar: { language: 'odin' },
  },
  largeDownload: true,
};
