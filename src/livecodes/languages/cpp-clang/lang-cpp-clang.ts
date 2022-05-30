import { LanguageSpecs } from '../../models';
import { cppWasmBaseUrl } from '../../vendors';

const workerSrc = `
var window = self;
const url = '${cppWasmBaseUrl}';
importScripts(url + '/shared.min.js');

window.CPP_READY.then(() => postMessage({ loaded: true }));

const runCode = async (code, input) => {
  let output = null;
  let error = null;
  let exitCode = 0;
  try {
    window.CPP.memfs.setStdinStr(input ?? "");
    await window.CPP.compileLinkRun(code);
    output = window.CPP_OUTPUT;
  } catch (err) {
    error = err.message ?? err;
    exitCode = err.code ?? 1;
  } finally {
    window.CPP.memfs.setStdinStr("");
    window.CPP_OUTPUT = "";
  }
  return {input, output, error, exitCode};
}

addEventListener('message', async (e) => {
  await window.CPP_READY;
  const code = e.data.code;
  const input = e.data.input;
  const result = code.trim() ? await runCode(code, input) : {};
  postMessage(result);
});
`;

export const clang: LanguageSpecs = {
  name: 'clang',
  title: 'Clang',
  longTitle: 'C/C++ (Clang)',
  compiler: {
    factory: () => async (code) => code,
    scripts: [],
    scriptType: 'text/cpp',
    compiledCodeLanguage: 'cpp',
    liveReload: true,
    inlineScript: `
livecodes.cpp = livecodes.cpp || {};
livecodes.cpp.run = livecodes.cpp.run || ((input) => new Promise((resolve) => {
  let code = '';
  livecodes.cpp.input = input;
  livecodes.cpp.output = null;
  const scripts = document.querySelectorAll('script[type="text/cpp"]');
  scripts.forEach(script => code += script.innerHTML + '\\n');
  livecodes.cpp.worker.onmessage = function (e) {
    if (e.data.loaded) {
      console.log('Clang compiler loaded!');
      livecodes.cpp.worker.loaded = true;
      return;
    }
    const result = e.data;
    if (result.error != null) {
      console.error(result.error);
    } else if (result.output != null) {
      console.log(result.output);
    }
    livecodes.cpp.input = result.input;
    livecodes.cpp.output = result.output;
    livecodes.cpp.error = result.error;
    livecodes.cpp.exitCode = result.exitCode;
    livecodes.cpp.ready = true;
    resolve(result);
  };

  livecodes.cpp.worker.postMessage({ code, input: \`\${String(input ?? '')}\` });
}));
livecodes.cpp.loaded = new Promise(async function (resolve) {
  const i = setInterval(() => {
    if (livecodes.cpp.ready) {
      clearInterval(i);
      return resolve();
    }
  }, 50);
});
window.addEventListener('load', async () => {
  livecodes.cpp.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const init = () => {
    if (livecodes.cpp.worker) return;
    console.log('Loading Clang compiler...');
    const workerSrc = \`${workerSrc.replace(/\\/g, '\\\\')}\`;
    livecodes.cpp.worker = new Worker('data:text/javascript;base64,' + btoa(workerSrc));
  };
  init();
  await livecodes.cpp.run(livecodes.cpp.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
`,
  },
  extensions: [
    'clang.cpp',
    'clang',
    'cpp',
    'c',
    'C',
    'cp',
    'cxx',
    'c++',
    'cppm',
    'ixx',
    'ii',
    'hpp',
    'h',
  ],
  editor: 'script',
  editorLanguage: 'cpp',
  largeDownload: true,
};
