/* eslint-disable import/no-internal-modules */
/* eslint-disable no-console */
import { createWorkerFromContent } from '../../utils/utils';
import { cppWasmBaseUrl } from '../../vendors';

const getWorkerSrc = async (baseUrl: string) => {
  try {
    const sharedScriptUrl = baseUrl + 'shared.js';
    const res = await fetch(sharedScriptUrl);
    if (!res.ok) throw new Error();
    const content = await res.text();
    const patchedContent = content
      .replace('https://cdn.jsdelivr.net/npm/@chriskoch/cpp-wasm@1.0.1/', baseUrl)
      .replace('https://cdn.jsdelivr.net/npm/@chriskoch/cpp-wasm/memfs', baseUrl + 'memfs');

    return `
var window = self;

${patchedContent};

addEventListener('message', async (e) => {
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
  };

  await window.CPP_READY;
  const code = e.data.code;
  const input = e.data.input;
  const result = code.trim() ? await runCode(code, input) : {};
  postMessage(result);
});

window.CPP_READY.then(() => postMessage({ loaded: true }));
`;
  } catch {
    throw new Error('failed loading C++/Clang compiler');
  }
};

livecodes.cpp = livecodes.cpp || {};
livecodes.cpp.run =
  livecodes.cpp.run ||
  ((input: string) =>
    new Promise((resolve) => {
      let code = '';
      livecodes.cpp.input = input;
      livecodes.cpp.output = null;
      const scripts = document.querySelectorAll('script[type="text/cpp"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));
      livecodes.cpp.worker.onmessage = function (e: MessageEvent) {
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

      livecodes.cpp.worker.postMessage({ code, input: `${String(input ?? '')}` });
    }));
livecodes.cpp.loaded = new Promise<void>(async function (resolve) {
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
  const workerSrc = await getWorkerSrc(cppWasmBaseUrl);
  const init = () => {
    if (livecodes.cpp.worker) return;
    console.log('Loading Clang compiler...');
    livecodes.cpp.worker = createWorkerFromContent(workerSrc);
  };
  init();
  await livecodes.cpp.run(livecodes.cpp.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
