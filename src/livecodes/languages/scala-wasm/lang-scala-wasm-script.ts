// @ts-nocheck
/* eslint-disable no-console */

import { scalaWasmBaseUrl } from '../../vendors';

const scalaWasmDistUrl = scalaWasmBaseUrl + 'dist/';

livecodes.scala = livecodes.scala || {};
livecodes.scala.ready = false;
livecodes.scala.failed = false;

// The runner is a separate <script>; dynamically inserted scripts are async, so it may not have
// executed yet when this file runs.
const waitForScalaWasm = async (timeoutMs = 120_000) => {
  const deadline = Date.now() + timeoutMs;
  while (!window.ScalaWasm) {
    if (Date.now() > deadline) {
      throw new Error('the ScalaWasm runtime script did not load');
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return window.ScalaWasm;
};

// Park the runtime on the persistent `livecodes.scala` namespace. With live reload the result page
// rewrites the document and this script re-executes, so a module-scoped runtime would be lost and
// re-created (leaking its worker) on every edit. Sharing a single init promise also makes
// concurrent runs await the same boot.
const getRuntime = async () => {
  livecodes.scala.init ??= (async () => {
    const ScalaWasm = await waitForScalaWasm();
    livecodes.scala.runtime = await ScalaWasm.createRuntime({
      baseUrl: scalaWasmDistUrl,
    });
  })().catch((err) => {
    // Allow a later run to retry the download/boot instead of awaiting a rejected promise forever.
    livecodes.scala.init = null;
    throw err;
  });
  await livecodes.scala.init;
  return livecodes.scala.runtime;
};

const getCode = () => {
  let code = '';
  document
    .querySelectorAll('script[type="text/scala-wasm"]')
    .forEach((script) => (code += script.innerHTML + '\n'));
  return code;
};

const toStdin = (input) => {
  const value = String(input ?? '');
  if (!value) return '';
  return value.endsWith('\n') ? value : value + '\n';
};

const formatDiagnostics = (diagnostics) =>
  (Array.isArray(diagnostics) ? diagnostics : [])
    .map((diagnostic) => {
      const location = [diagnostic.file, diagnostic.line, diagnostic.column]
        .filter((part) => part !== null && part !== undefined && part !== '')
        .join(':');
      const message = `${diagnostic.severity ?? 'error'}: ${diagnostic.message ?? ''}`;
      return location ? `${location}: ${message}` : message;
    })
    .join('\n');

livecodes.scala.run = async (input = '') => {
  const code = getCode();
  livecodes.scala.input = input;
  livecodes.scala.output = null;
  livecodes.scala.ready = false;
  livecodes.scala.failed = false;

  if (!code.trim()) {
    livecodes.scala.ready = true;
    return { input, output: null, error: null, exitCode: 0 };
  }

  try {
    const result = await (await getRuntime()).run(code, { input: toStdin(input) });

    if (result.output) {
      console.log(result.output);
    }

    const diagnostics = formatDiagnostics(result.diagnostics);
    const error = result.ok
      ? null
      : diagnostics || result.error || `Exited with code ${result.exitCode}`;
    if (error) {
      console.error(error);
    } else if (diagnostics) {
      console.warn(diagnostics);
    }

    livecodes.scala.output = result.output;
    livecodes.scala.error = error;
    livecodes.scala.exitCode = result.exitCode;
    return { input, output: result.output, error, exitCode: result.exitCode };
  } catch (err) {
    const error = err?.message ?? err;
    console.error(error);
    livecodes.scala.error = error;
    livecodes.scala.exitCode = 1;
    // A thrown error means the runtime failed to boot or could not wrap the entry point for
    // stdin (a program error is returned via `result.ok`), so reject `loaded` rather than
    // leaving the starter stuck on "Loading...".
    livecodes.scala.failed = true;
    return { input, output: null, error, exitCode: 1 };
  } finally {
    livecodes.scala.ready = true;
  }
};

livecodes.scala.loaded = new Promise<void>((resolve, reject) => {
  const interval = setInterval(() => {
    if (livecodes.scala.failed) {
      clearInterval(interval);
      reject(new Error(livecodes.scala.error || 'Failed to initialize the Scala environment'));
    } else if (livecodes.scala.ready) {
      clearInterval(interval);
      resolve();
    }
  }, 50);
});

window.addEventListener('load', async () => {
  livecodes.scala.ready = false;
  parent.postMessage({ type: 'loading', payload: true }, '*');
  await livecodes.scala.run(livecodes.scala.input);
  parent.postMessage({ type: 'loading', payload: false }, '*');
});
