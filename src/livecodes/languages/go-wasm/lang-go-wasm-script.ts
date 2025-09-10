/* eslint-disable no-console */
import { createWorkerFromContent } from '../../utils/utils';
import { yaegiWasmBaseUrl } from '../../vendors';

const workerSrc = `
(async () => {
  importScripts('${yaegiWasmBaseUrl}wasm_exec.js');

  const wasmUrl = '${yaegiWasmBaseUrl}yaegi-browser.wasm';
  const wasmResponse = await fetch(wasmUrl);

  const initYaegi = async () => {
    try {
      let instance;
      const go = new Go();
      try {
        const streaming = await WebAssembly.instantiateStreaming(wasmResponse.clone(), go.importObject);
        instance = streaming.instance;
      } catch {
        const resp = await wasmResponse.clone();
        if (!resp.ok)
          throw new Error('Failed to fetch yaegi-browser.wasm: ' + resp.status);
        const bytes = await resp.arrayBuffer();
        const res = await WebAssembly.instantiate(bytes, go.importObject);
        instance = res.instance;
      }
      go.run(instance);
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

      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      let capturedOutput = '';
      let capturedError = '';

      try {
        await initYaegi();

        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\\n';
        };

        console.error = (...args) => {
          capturedError += args.join(' ') + '\\n';
        };

        // Set up stdin if input is provided
        if (input && globalThis.setStdin) {
          globalThis.setStdin(input);
        }

        if (self.yaegi) {
          try {
            const result = await self.yaegi.eval(code);
          } catch (err) {
            console.error('Yaegi execution error:', err);
            throw err;
          }
        } else {
          throw new Error(
            'Yaegi not found on window. Make sure yaegi-browser.wasm is loaded correctly.',
          );
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

      return { input, output, error, exitCode };
    };

    const code = e.data.code;
    const input = e.data.input;
    const result = code.trim() ? await runCode(code, input) : {};
    postMessage(result);
  });

  // Initialize Yaegi when worker starts
  initYaegi()
    .then(() => {
      postMessage({ loaded: true });
    })
    .catch((err) => {
      console.error('Failed to initialize Yaegi:', err);
      postMessage({ error: err.message });
    });
})();
`;

livecodes.goWasm = livecodes.goWasm || {};

livecodes.goWasm.worker = livecodes.goWasm.worker || createWorkerFromContent(workerSrc);
const worker: Worker = livecodes.goWasm.worker;

const initialized = new Promise<void>((resolve) => {
  const onload = (e: MessageEvent) => {
    console.log('Loading Yaegi WebAssembly...');
    if (e.data.loaded) {
      worker.removeEventListener('message', onload);
      console.log('Yaegi WebAssembly loaded successfully.');
      livecodes.goWasm.worker.loaded = true;
      resolve();
    }
  };
  if (!livecodes.goWasm.worker.loaded) {
    worker.addEventListener('message', onload);
  } else {
    resolve();
  }
});

livecodes.goWasm.run =
  livecodes.goWasm.run ||
  ((input: string) =>
    new Promise((resolve) => {
      let code = '';
      livecodes.goWasm.input = input;
      livecodes.goWasm.output = null;
      const scripts = document.querySelectorAll('script[type="text/go-wasm"]');
      scripts.forEach((script) => (code += (script.textContent ?? '') + '\n'));
      worker.onmessage = function (e: MessageEvent) {
        if (e.data.loaded) return;
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

      worker.postMessage({ code, input: `${String(input ?? '')}` });
    }));

livecodes.goWasm.loaded = new Promise<void>(async (resolve) => {
  const i = setInterval(() => {
    if (livecodes.goWasm.ready) {
      clearInterval(i);
      return resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  livecodes.goWasm.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await initialized;
  await livecodes.goWasm.run(livecodes.goWasm.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
