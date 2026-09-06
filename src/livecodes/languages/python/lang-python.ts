import type { LanguageSpecs } from '../../models';
import { getLanguageCustomSettings } from '../../utils/utils';
import { brythonBaseUrl, codeMirrorBaseUrl, monacoLanguagesBaseUrl } from '../../vendors';

const brythonUrl = brythonBaseUrl + 'brython.min.js';
const stdlibUrl = brythonBaseUrl + 'brython_stdlib.js';

export const python: LanguageSpecs = {
  name: 'python',
  title: 'Python',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib } = getLanguageCustomSettings('python', config);
      const importsPattern = /^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm;
      const stdlib = autoloadStdlib !== false && compiled.match(importsPattern) ? [stdlibUrl] : [];
      return [brythonUrl, ...stdlib];
    },
    scriptType: 'text/python',
    compiledCodeLanguage: 'python',
  },
  extensions: ['py'],
  editor: 'script',
  editorSupport: {
    monaco: { languageSupport: monacoLanguagesBaseUrl + 'python.js' },
    codemirror: {
      languageSupport: async () =>
        (await import(codeMirrorBaseUrl + 'codemirror-lang-python.js')).python(),
    },
  },
};
