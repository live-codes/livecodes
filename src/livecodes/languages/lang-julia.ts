import { LanguageSpecs } from '../models';

const cdnBaselUrl = 'https://cdn.jsdelivr.net/npm/@chriskoch/julia-wasm@1.0.4';

const workerSrc = `
var window = self;
let isCompilerloaded = false;
let outputBuffer = '';
let url = '${cdnBaselUrl}';
let errCalls = 0;
let ignoredErrors = [
  'still waiting on run dependencies:',
  'dependency: fp /sys.ji',
  'dependency: datafile_/julia.data',
  'dependency: wasm-instantiate',
  '(end of list)',
  'file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)',
];
window.Module = {
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
      window.Module._jl_initialize();
      let input = 'Base.load_InteractiveUtils()';
      let ptr = window.Module._malloc(input.length + 1);
      window.Module.stringToUTF8(input, ptr, input.length + 1);
      window.Module._jl_eval_string(ptr);
      if (window.Module.initialize_jscall_runtime)
        window.Module.initialize_jscall_runtime();
      isCompilerloaded = true;
    },
  ],
};

importScripts(url + '/julia.min.js');

let runCode = (code) => {
  let output = '';
  if (code) {
    let ptr = window.Module._malloc(code.length + 1);
    window.Module.stringToUTF8(code, ptr, code.length + 1);
    window.Module._jl_eval_and_print(ptr);
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
  const output = code.trim() ? runCode(code) : '';
  postMessage({ output });
});
`;

export const julia: LanguageSpecs = {
  name: 'julia',
  title: 'Julia',
  compiler: {
    factory: () => async (code) => code,
    scripts: [],
    liveReload: true,
    inlineScript: `
livecodes.julia = livecodes.julia || {};
window.addEventListener('load', async () => {
  parent.postMessage({ type: 'loading', payload: true }, '*');
  const init = () => {
    if (livecodes.julia.worker) return;
    console.log('Loading Julia compiler...');
    const workerSrc = \`${workerSrc.replace(/\\/g, '\\\\')}\`;
    livecodes.julia.worker = new Worker('data:text/javascript;base64,' + btoa(workerSrc));
  };
  const evaluateCode = () => new Promise((resolve) => {
    let code = '';
    const scripts = document.querySelectorAll('script[type="text/julia"]');
    scripts.forEach(script => code += script.innerHTML + '\\n');
    livecodes.julia.worker.onmessage = function (e) {
      if (e.data.loaded) {
        console.log('Julia compiler loaded!');
        return;
      }
      const output = e.data.output;
      if (output != null) {
        if (output !== '') {
          console.log(output);
        }
        resolve(output);
      }
    };
    livecodes.julia.worker.postMessage({ code });
  });
  init();
  await evaluateCode();
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
`,
    scriptType: 'text/julia',
    compiledCodeLanguage: 'julia',
  },
  extensions: ['jl'],
  editor: 'script',
};
