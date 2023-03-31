import type { LanguageSpecs } from '../../models';
import { brythonBaseUrl } from '../../vendors';
import { escapeCode, getLanguageCustomSettings } from '../../utils';

const brythonUrl = brythonBaseUrl + 'brython.min.js';
const stdlibUrl = brythonBaseUrl + 'brython_stdlib.js';

export const python: LanguageSpecs = {
  name: 'python',
  title: 'Python',
  compiler: {
    factory: () => async (code) => code,
    scripts: ({ compiled, config }) => {
      const { autoloadStdlib, ...options } = getLanguageCustomSettings('python', config);
      const importsPattern = /^(?:from[ ]+(\S+)[ ]+)?import[ ]+(\S+)(?:[ ]+as[ ]+\S+)?[ ]*$/gm;
      const stdlib = autoloadStdlib !== false && compiled.match(importsPattern) ? [stdlibUrl] : [];
      const loader = `window.addEventListener("load", () => {brython(${JSON.stringify(options)})})`;
      const loaderUrl = 'data:text/plain;base64,' + btoa(loader);
      const compiledCode = `window.addEventListener("load", () => {
        const content = __BRYTHON__.python_to_js(\`${escapeCode(compiled)}\`);
        parent.postMessage({type: "compiled", payload: {language: "python", content}}, "*");
      });`;
      const compiledCodeUrl = 'data:text/plain;base64,' + btoa(compiledCode);
      return [brythonUrl, ...stdlib, loaderUrl, compiledCodeUrl];
    },
    scriptType: 'text/python',
  },
  extensions: ['py'],
  editor: 'script',
};
