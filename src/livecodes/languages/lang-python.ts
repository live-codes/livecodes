import { LanguageSpecs } from '../models';
import { brythonBaseUrl } from '../vendors';
import { getLanguageCustomSettings } from './utils';

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
      const compiledCode = `window.addEventListener("load", async () => {
        const script = document.createElement('script');
        script.type = 'text/python';
        script.innerHTML = \`
from javascript import py2js
from browser import window
window.livecodes.compiled = py2js("""${compiled.replace(/\"\"\"/gm, '\\\\"\\\\"\\\\"')}""")
        \`;
        document.body.append(script);

        const send = () => {
          parent.postMessage({type: "compiled", payload: {language: "python", content: window.livecodes.compiled}}, "*");
          window.livecodes.compiled = '';
        }
        const delay = (duration) => new Promise((resolve) => {
          setTimeout(resolve, duration);
        });
        while (!window.livecodes.compiled) {
          await delay(100);
        }
        send();
      });`;
      const compiledCodeUrl = 'data:text/plain;base64,' + btoa(compiledCode);
      const loader = `window.addEventListener("load", () => {brython(${JSON.stringify(options)})})`;
      const loaderUrl = 'data:text/plain;base64,' + btoa(loader);
      return [brythonUrl, ...stdlib, compiledCodeUrl, loaderUrl];
    },
    scriptType: 'text/python',
  },
  extensions: ['py'],
  editor: 'script',
};
