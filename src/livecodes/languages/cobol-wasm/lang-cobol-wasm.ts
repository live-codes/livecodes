import { codemirrorLegacy } from '../../editor/codemirror/utils';
import type { Config, LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils';
import { codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

/**
 * The runtime reads its settings from `config.customSettings['cobol-wasm']` on every run, so a
 * setting edited in the playground applies to the warm worker without relaunching it. The script
 * is emitted even when there are no settings, so a setting removed in the editor does not linger.
 */
const getSettingsScript = (config: Config) => {
  const settings = getLanguageCustomSettings('cobol-wasm', config);
  // `\u003c` keeps a `</script>` in a setting (e.g. a compile argument) from closing the tag.
  const serialized = JSON.stringify(settings).replace(/</g, '\\u003c');
  return `window.livecodes = window.livecodes || {};
window.livecodes.cobol = window.livecodes.cobol || {};
window.livecodes.cobol.settings = ${serialized};`;
};

export const cobolWasm: LanguageSpecs = {
  name: 'cobol-wasm',
  title: 'COBOL (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-cobol-wasm-script.js}}'],
    inlineScript: ({ config }) => getSettingsScript(config),
    scriptType: 'text/cobol-wasm',
    compiledCodeLanguage: 'cobol',
    liveReload: true,
  },
  extensions: ['cobol', 'cob', 'cbl', 'cpy', 'gnucobol', 'wasm.cobol'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'cobol.js', language: 'cobol' },
    codemirror: {
      languageSupport: async () =>
        codemirrorLegacy((await import(codeMirrorBaseUrl + 'codemirror-lang-cobol.js')).cobol),
    },
    codejar: { language: 'cobol' },
  },
  largeDownload: true,
};
