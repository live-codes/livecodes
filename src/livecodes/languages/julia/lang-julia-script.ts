/* eslint-disable import/no-internal-modules */
/* eslint-disable no-console */
import { createWorkerFromContent } from '../../utils/utils';
import { juliaWasmBaseUrl } from '../../vendors';

const workerSrc = `
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${juliaWasmBaseUrl}';
let errCalls = 0;
let ignoredErrors = [
  'still waiting on run dependencies:',
  'dependency: fp /sys.ji',
  'dependency: datafile_/julia.data',
  'dependency: wasm-instantiate',
  '(end of list)',
  'file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)',
];

self.Module = {
  locateFile: (path) =>
    path === 'julia-wasm/julia.wasm'
      ? url + '/julia.wasm'
      : url + '/julia.data',
  preRun: [],
  noInitialRun: true,
  print: (stdout) => (outputBuffer += stdout + '\\n'),
  printErr: function (text) {
    errCalls++;
    if (errCalls == 1) return;
    if (arguments.length > 1) {
      text = Array.prototype.slice.call(arguments).join(' ');
    }
    if (ignoredErrors.includes(text)) return;
    console.warn(text);
  },
  postRun: [
    function () {
      self.Module._jl_initialize();
      let input = 'Base.load_InteractiveUtils()';
      let ptr = self.Module._malloc(input.length + 1);
      self.Module.stringToUTF8(input, ptr, input.length + 1);
      self.Module._jl_eval_string(ptr);
      if (self.Module.initialize_jscall_runtime)
        self.Module.initialize_jscall_runtime();
      isCompilerloaded = true;
    },
  ],
};

importScripts(url + '/julia.js');

let runCode = (code, input) => {
  let output = '';
  if (code) {
    if (input) {
      code = 'livecodesInput = ' + input + '\\n' + code;
    }
    let ptr = self.Module._malloc(code.length + 1);
    self.Module.stringToUTF8(code, ptr, code.length + 1);
    self.Module._jl_eval_and_print(ptr);
    output = getOutput();
  }
  outputBuffer = '';
  return output;
};

function getOutput() {
  if (outputBuffer.endsWith('nothing\\n')) {
    outputBuffer = outputBuffer.slice(0, outputBuffer.length - 8);
    outputBuffer += '\\nReturn Type: nothing';
  } else {
    outputBuffer = outputBuffer.split('typeof(').join('\\nReturn Type: typeof(');
  }
  return outputBuffer;
}

const waitForCompiler = () =>
  new Promise((resolve, reject) => {
    const i = setInterval(() => {
      if (isCompilerloaded) {
        clearInterval(i);
        return resolve();
      }
    }, 50);
  });

waitForCompiler().then(() => postMessage({ loaded: true }));

addEventListener('message', async (e) => {
  await waitForCompiler();
  const code = e.data.code;
  const input = e.data.input;
  const output = code.trim() ? runCode(code, input) : null;
  postMessage({ output });
});
`;

livecodes.julia = livecodes.julia || {};
livecodes.julia.run =
  livecodes.julia.run ||
  ((input: string) =>
    new Promise((resolve) => {
      let code = '';
      livecodes.julia.input = input;
      livecodes.julia.output = '';
      const scripts = document.querySelectorAll('script[type="text/julia"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));
      livecodes.julia.worker.onmessage = function (e: MessageEvent) {
        if (e.data.loaded) {
          console.log('Julia compiler loaded!');
          livecodes.julia.worker.loaded = true;
          return;
        }
        const output = e.data.output;
        if (output != null) {
          console.log(output);
        }
        livecodes.julia.output = output;
        livecodes.julia.ready = true;
        resolve(output);
      };

      livecodes.julia.worker.postMessage({ code, input: `"${String(input ?? '')}"` });
    }));
livecodes.julia.loaded = new Promise<void>(async function (resolve) {
  const i = setInterval(() => {
    if (livecodes.julia.ready) {
      clearInterval(i);
      return resolve();
    }
  }, 50);
});
window.addEventListener('load', async () => {
  livecodes.julia.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const init = () => {
    if (livecodes.julia.worker) return;
    console.log('Loading Julia compiler...');
    livecodes.julia.worker = createWorkerFromContent(workerSrc);
  };
  init();
  await livecodes.julia.run(livecodes.julia.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
