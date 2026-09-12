import type { LanguageSpecs } from '../../models';
import { wasmFmtRuffBaseUrl } from '../../vendors';

export const pythonFormatter: LanguageSpecs['formatter'] = {
  factory: async () => {
    const formatter = await import(wasmFmtRuffBaseUrl + 'ruff_fmt_web.js');
    await formatter.default();
    return async (code) => ({ formatted: await formatter.format(code, 'main.py') });
  },
};

export const pythonWasm: LanguageSpecs = {
  name: 'python-wasm',
  title: 'Py (Wasm)',
  longTitle: 'Python (Wasm)',
  formatter: pythonFormatter,
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
