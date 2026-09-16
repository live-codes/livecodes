/*
 * Runs inside a Web Worker that `lang-vb-wasm-script.ts` creates from a data: URL.
 * The script sets `self.baseUrl` to the CDN URL of the compiler bundle first.
 *
 * Boots the .NET WebAssembly runtime together with the Roslyn VB compiler and
 * compiles/runs VB.NET source on request, so the main thread never blocks.
 *
 * Protocol (main -> worker): { type: 'compile', id, source, stdin }
 * Protocol (worker -> main):
 *   { type: 'ready' }               the runtime is up, compiles can start
 *   { type: 'fatal', message }      boot failed; the worker is useless
 *   { type: 'result', id, json }    JSON result of VbRunner.RunVb
 *   { type: 'error', id, message }  the interop call itself threw
 */
(async function () {
  /** @type {any} */
  let runner = null;
  /** @type {any[]} */
  const queue = [];

  /** @param {any} value */
  const text = (value) => (value == null ? '' : String(value));

  /** @param {any} err */
  const errorMessage = (err) => String((err && err.stack) || err);

  /** @param {{ source: any; stdin: any; id: any }} msg */
  const compile = (msg) => {
    try {
      runner.RunVb(text(msg.source), text(msg.stdin)).then(
        /** @param {any} json */
        (json) => self.postMessage({ type: 'result', id: msg.id, json }),
        /** @param {any} err */
        (err) => {
          self.postMessage({ type: 'error', id: msg.id, message: errorMessage(err) });
        },
      );
    } catch (err) {
      self.postMessage({ type: 'error', id: msg.id, message: errorMessage(err) });
    }
  };

  self.onmessage = (event) => {
    const message = event.data || {};
    if (message.type !== 'compile') return;
    if (runner) compile(message);
    else queue.push(message);
  };

  try {
    // dotnet.js decides whether this worker owns the runtime ("sidecar") or is
    // just a .NET worker thread. It only infers sidecar mode when no `onmessage`
    // handler exists yet (and one is assigned above), so declare it up front.
    // see https://github.com/dotnet/runtime/issues/114918
    // @ts-ignore
    self.dotnetSidecar = true;

    // resolved at runtime against the CDN, so there is nothing to bundle here
    // @ts-ignore
    const dotnetModule = await import(self.baseUrl + '_framework/dotnet.js');
    const runtime = await dotnetModule.dotnet.withDiagnosticTracing(false).create();
    const config = runtime.getConfig();
    const dotnetExports = await runtime.getAssemblyExports(config.mainAssemblyName);
    // runMain() invokes VbRunner.Main(), which loads the reference assemblies
    // embedded in the app assembly, but (unlike dotnet.run()) leaves the
    // runtime alive so that later compiles work.
    await runtime.runMain();
    runner = dotnetExports.VbRunner;
    self.postMessage({ type: 'ready' });
    queue.splice(0).forEach(compile);
  } catch (err) {
    self.postMessage({ type: 'fatal', message: errorMessage(err) });
  }
})();
