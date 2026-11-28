// @ts-nocheck
/**
 * Runs typst.ts (compiler + SVG renderer) in a module worker.
 *
 * The result page is served from a different origin than the app, so a worker
 * script from the app origin cannot be constructed there. The worker source is
 * therefore embedded as a string and started from a Blob URL.
 */

// The typst.ts all-in-one bundle assigns the shared instance to `window`, which
// does not exist in a worker. Point it at the worker global before importing it.
self.window = self;

let typst = null;
let initPromise = null;
let queue = Promise.resolve();

const post = (message) => self.postMessage(message);

const formatError = (error) => {
  const text = String((error && error.message) || error);
  // typst.ts throws a Rust debug representation of the diagnostics, e.g.
  // `[SourceDiagnostic { severity: Error, span: Span(123), message: "expected expression", ... }]`.
  const messages = [...text.matchAll(/message:\s*"((?:[^"\\]|\\.)*)"/g)].map((match) =>
    match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
  );
  return messages.length > 0 ? messages.join('\n') : text;
};

const init = async (message) => {
  const bundle = await import(message.bundleUrl);
  typst = bundle.$typst ?? self.$typst;
  if (!typst) throw new Error('Failed to load the Typst compiler.');
  typst.setCompilerInitOptions({ getModule: () => message.compilerWasmUrl });
  typst.setRendererInitOptions({ getModule: () => message.rendererWasmUrl });
  // Warm up the compiler and renderer (downloading the wasm modules and fonts)
  // so the large first download is covered by the boot timeout, not the run timeout.
  await typst.svg({ mainContent: '' });
};

const run = async (message) => {
  try {
    await initPromise;
    if (!typst) throw new Error('The Typst compiler is not initialized.');
    const svg = await typst.svg({ mainContent: message.code });
    post({ id: message.id, result: { svg } });
  } catch (error) {
    post({ id: message.id, error: formatError(error) });
  }
};

self.onmessage = (event) => {
  const message = event.data;
  if (message.type === 'init') {
    initPromise = init(message);
    initPromise.then(
      () => post({ type: 'ready' }),
      (error) => {
        initPromise = null;
        post({ type: 'error', message: String((error && error.message) || error) });
      },
    );
    return;
  }
  // Run requests have no `type`: `{ id, code, input, options }`.
  // typst.ts keeps mutable compiler state, so runs must not overlap.
  queue = queue.then(
    () => run(message),
    () => run(message),
  );
};
