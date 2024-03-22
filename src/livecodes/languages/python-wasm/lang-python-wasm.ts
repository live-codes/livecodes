import type { LanguageSpecs } from '../../models';

export const pythonWasm: LanguageSpecs = {
  name: 'python-wasm',
  title: 'Py (Wasm)',
  longTitle: 'Python (Wasm)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-python-wasm-script.js}}'],
    liveReload: true,
    scriptType: 'text/python',
    compiledCodeLanguage: 'python',
  },
  extensions: ['wasm.py', 'py3', 'pyodide', 'py-wasm', 'pythonwasm', 'pywasm'],
  editor: 'script',
  editorLanguage: 'python',
  largeDownload: true,
};
