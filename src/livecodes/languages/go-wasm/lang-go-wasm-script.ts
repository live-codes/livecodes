/* eslint-disable no-console */
import { createWorkerFromContent } from '../../utils/utils';
import { yaegiWasmBaseUrl } from '../../vendors';

const getWorkerSrc = async (baseUrl: string) => {
  try {
    // Load the Go WebAssembly support script
    const wasmExecUrl = baseUrl + 'wasm_exec.js';
    const wasmExecRes = await fetch(wasmExecUrl);
    if (!wasmExecRes.ok) throw new Error('Failed to load wasm_exec.js');
    const wasmExecContent = await wasmExecRes.text();

    return `
var window = self;

// Load Go WebAssembly support
${wasmExecContent};

// Initialize Yaegi
let yaegiInstance = null;
let yaegiReady = false;

const initYaegi = async () => {
  if (yaegiReady) return;
  
  try {
    // Load the Yaegi WASM file
    const wasmUrl = '${baseUrl}yaegi-browser.wasm';
    const go = new Go();
    const wasmResponse = await fetch(wasmUrl);
    const wasmBytes = await wasmResponse.arrayBuffer();
    
    const { instance } = await WebAssembly.instantiate(wasmBytes, go.importObject);
    go.run(instance);
    
    // Wait for Yaegi to be ready
    yaegiInstance = instance;
    yaegiReady = true;
    console.log('Yaegi WebAssembly loaded successfully!');
  } catch (err) {
    console.error('Failed to load Yaegi:', err);
    throw err;
  }
};

addEventListener('message', async (e) => {
  const runCode = async (code, input) => {
    let output = null;
    let error = null;
    let exitCode = 0;
    
         // Set up input/output capture
     const originalConsoleLog = console.log;
     const originalConsoleError = console.error;
     let capturedOutput = '';
     let capturedError = '';
     
     try {
       // Initialize Yaegi if not ready
       if (!yaegiReady) {
         await initYaegi();
       }
       
       console.log = (...args) => {
         capturedOutput += args.join(' ') + '\\n';
         originalConsoleLog.apply(console, args);
       };
       
       console.error = (...args) => {
         capturedError += args.join(' ') + '\\n';
         originalConsoleError.apply(console, args);
       };
      
      // Set up stdin if input is provided
      if (input) {
        // This would need to be implemented based on how Yaegi handles stdin
        // For now, we'll just log the input
        console.log('Input:', input);
      }
      
                    // Execute the Go code using Yaegi
       if (window.yaegi) {
         try {
           const result = await window.yaegi.eval(code);
         } catch (err) {
           console.error('Yaegi execution error:', err);
           throw err;
         }
       } else {
         throw new Error('Yaegi not found on window. Make sure yaegi-browser.wasm is loaded correctly.');
       }
      
      output = capturedOutput.trim();
      if (capturedError) {
        error = capturedError.trim();
        exitCode = 1;
      }
      
    } catch (err) {
      error = err.message || err.toString();
      exitCode = 1;
    } finally {
      // Restore console functions
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    }
    
    return {input, output, error, exitCode};
  };

  const code = e.data.code;
  const input = e.data.input;
  const result = code.trim() ? await runCode(code, input) : {};
  postMessage(result);
});

// Initialize Yaegi when worker starts
initYaegi().then(() => {
  postMessage({ loaded: true });
}).catch((err) => {
  console.error('Failed to initialize Yaegi:', err);
  postMessage({ error: err.message });
});
`;
  } catch (err) {
    throw new Error(
      'Failed to load Yaegi WebAssembly: ' + (err instanceof Error ? err.message : String(err)),
    );
  }
};

livecodes.goWasm = livecodes.goWasm || {};
livecodes.goWasm.run =
  livecodes.goWasm.run ||
  ((input: string) =>
    new Promise((resolve) => {
      let code = '';
      livecodes.goWasm.input = input;
      livecodes.goWasm.output = null;
      const scripts = document.querySelectorAll('script[type="text/go-wasm"]');
      scripts.forEach((script) => (code += script.innerHTML + '\n'));
      livecodes.goWasm.worker.onmessage = function (e: MessageEvent) {
        if (e.data.loaded) {
          console.log('Yaegi WebAssembly loaded!');
          livecodes.goWasm.worker.loaded = true;
          return;
        }
        if (e.data.error) {
          console.error('Yaegi initialization error:', e.data.error);
          return;
        }
        const result = e.data;
        if (result.error != null) {
          console.error(result.error);
        } else if (result.output != null) {
          console.log(result.output);
        }
        livecodes.goWasm.input = result.input;
        livecodes.goWasm.output = result.output;
        livecodes.goWasm.error = result.error;
        livecodes.goWasm.exitCode = result.exitCode;
        livecodes.goWasm.ready = true;
        resolve(result);
      };

      livecodes.goWasm.worker.postMessage({ code, input: `${String(input ?? '')}` });
    }));

livecodes.goWasm.loaded = new Promise<void>(function (resolve) {
  const i = setInterval(() => {
    if (livecodes.goWasm.ready) {
      clearInterval(i);
      return resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  livecodes.goWasm.ready = false;
  const getParentOrigin = (): string => {
    try {
      const referrer = document.referrer;
      if (referrer) {
        const url = new URL(referrer);
        if (url.origin && url.origin !== 'null') return url.origin;
      }
    } catch (e) {
      // ignore parsing errors and fall back
    }
    return window.location.origin;
  };
  const targetOrigin = getParentOrigin();
  parent.postMessage({ type: 'loading', payload: true }, targetOrigin);
  const workerSrc = await getWorkerSrc(yaegiWasmBaseUrl);
  const init = () => {
    if (livecodes.goWasm.worker) return;
    console.log('Loading Yaegi WebAssembly...');
    livecodes.goWasm.worker = createWorkerFromContent(workerSrc);
  };
  init();
  await livecodes.goWasm.run(livecodes.goWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, targetOrigin);
});
