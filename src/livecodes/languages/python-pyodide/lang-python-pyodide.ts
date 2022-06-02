import type { LanguageSpecs } from '../../models';

export const pyodide: LanguageSpecs = {
  name: 'pyodide',
  title: 'Pyodide',
  longTitle: 'Python (Pyodide)',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ baseUrl }) => [baseUrl + '{{hash:lang-python-pyodide-script.js}}'],
    liveReload: true,
    scriptType: 'text/python',
    compiledCodeLanguage: 'python',
  },
  extensions: ['py3'],
  editor: 'script',
  editorLanguage: 'python',
  largeDownload: true,
};
