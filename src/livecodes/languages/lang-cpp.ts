import { LanguageSpecs } from '../models';
import { vendorsBaseUrl } from '../vendors';

const cdnUrl = vendorsBaseUrl + 'jscpp/JSCPP.es5.min.js';

export const cpp: LanguageSpecs = {
  name: 'cpp',
  title: 'C++',
  compiler: {
    factory: () => async (code) => code,
    scripts: [cdnUrl],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
    inlineScript: `
(() => {
  function getWorkerURL() {
    const content = \`importScripts("${cdnUrl}");\`;
    return URL.createObjectURL(new Blob([content], {type: "text/javascript"}));
  }
  const workerUrl = getWorkerURL();
  const worker = new JSCPP.AsyncWebWorkerHelper(workerUrl);
  URL.revokeObjectURL(workerUrl);
  let loaded = false;
  livecodes.cpp = {
    source: '',
    input: '',
    output: '',
    exitCode: null,
    error: null,
    run: async (input) => {
      livecodes.cpp.input = input ?? '';
      livecodes.cpp.output = '';
      livecodes.cpp.exitCode = null;
      livecodes.cpp.error = null;
      try {
        livecodes.cpp.exitCode = await worker.run(livecodes.cpp.source, livecodes.cpp.input, {
          stdio: {
            write: function(s) {
              livecodes.cpp.output += s;
            }
          },
          unsigned_overflow: "warn"
        });
        console.log(livecodes.cpp.output);
      } catch (err) {
        livecodes.cpp.error = err.message || err;
        livecodes.cpp.exitCode = 1;
        console.error(livecodes.cpp.error);
      }
      loaded = true;
      return {
        input: livecodes.cpp.input,
        output: livecodes.cpp.output,
        exitCode: livecodes.cpp.exitCode,
        error: livecodes.cpp.error,
      }
    },
    loaded: new Promise(async function (resolve) {
      const i = setInterval(() => {
        if (loaded) {
          clearInterval(i);
          return resolve();
        }
      }, 5);
    })
  };
  window.addEventListener('load', async () => {
    var script = document.querySelector('script[type="text/cpp"]');
    var source = script?.innerHTML;
    livecodes.cpp.source = source;
    if (source?.trim()) {
      await livecodes.cpp.run(livecodes.cpp.input);
    }
  });
})();
    `,
  },
  extensions: ['cpp', 'c', 'C', 'cp', 'cxx', 'c++', 'cppm', 'ixx', 'ii', 'hpp', 'h'],
  editor: 'script',
};
