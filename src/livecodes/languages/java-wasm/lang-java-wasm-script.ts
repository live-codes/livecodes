// @ts-nocheck
/* eslint-disable no-console */

import { javaWasmBaseUrl } from '../../vendors';

const javaWasmDistUrl = javaWasmBaseUrl + 'dist/';

livecodes.java = livecodes.java || {};
livecodes.java.ready = false;

let runtime;

// The runner is a separate <script>; dynamically inserted scripts are async, so it may not have
// executed yet when this file runs.
const waitForJavaWasm = async (timeoutMs = 120_000) => {
  const deadline = Date.now() + timeoutMs;
  while (!window.JavaWasm) {
    if (Date.now() > deadline) {
      throw new Error('the JavaWasm runtime script did not load');
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return window.JavaWasm;
};

const getRuntime = async () => {
  runtime ??= await (await waitForJavaWasm()).createRuntime({
    baseUrl: javaWasmDistUrl,
    // each run starts with an empty file system
    persistFiles: false,
  });
  return runtime;
};

const getCode = () => {
  let code = '';
  document
    .querySelectorAll('script[type="text/java-wasm"]')
    .forEach((script) => (code += script.innerHTML + '\n'));
  return code;
};

const getMainClass = (code) =>
  code.match(/public\s+(?:final\s+|abstract\s+)?class\s+(\w+)/)?.[1] ?? 'Main';

const toStdin = (input) => {
  const value = String(input ?? '');
  if (!value) return '';
  return value.endsWith('\n') ? value : value + '\n';
};

livecodes.java.run = async (input = '') => {
  const code = getCode();
  livecodes.java.input = input;
  livecodes.java.output = null;
  livecodes.java.ready = false;

  if (!code.trim()) {
    livecodes.java.ready = true;
    return { input, output: null, error: null, exitCode: 0 };
  }

  try {
    const result = await (
      await getRuntime()
    ).run(code, { input: toStdin(input), mainClass: getMainClass(code) });

    const error = result.ok ? null : result.error;
    // stdout and stderr are separate streams in Java; show both.
    if (result.stdout) {
      console.log(result.stdout);
    }
    const diagnostics = result.ok ? result.stderr : result.error || result.stderr;
    if (diagnostics) {
      console.error(diagnostics);
    }

    livecodes.java.output = result.stdout;
    livecodes.java.error = error;
    livecodes.java.exitCode = result.exitCode;
    return { input, output: result.stdout, error, exitCode: result.exitCode };
  } catch (err) {
    const error = err?.message ?? err;
    console.error(error);
    livecodes.java.error = error;
    livecodes.java.exitCode = 1;
    return { input, output: null, error, exitCode: 1 };
  } finally {
    livecodes.java.ready = true;
  }
};

livecodes.java.loaded = new Promise<void>((resolve) => {
  const interval = setInterval(() => {
    if (livecodes.java.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  livecodes.java.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.java.run(livecodes.java.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
