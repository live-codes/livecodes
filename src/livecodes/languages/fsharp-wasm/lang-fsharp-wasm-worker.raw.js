(async function () {
  let ready = false;
  /** @type {{ FSharpRunner: { RunFsharp: (arg0: any, arg1: any) => any; }; } | null} */
  let exportsObj = null;
  /** @type {any[]} */
  const queue = [];

  self.onmessage = function (e) {
    const data = e.data || {};
    if (data.type !== 'compile') return;
    if (!ready || !exportsObj) queue.push(data);
    else compile(data);
  };

  /** @param {{ source: any; stdin: any; id: any; }} msg */
  async function compile(msg) {
    try {
      const json = await exportsObj?.FSharpRunner.RunFsharp(msg.source, msg.stdin ?? '');
      self.postMessage({ type: 'result', id: msg.id, json });
    } catch (err) {
      self.postMessage({
        type: 'error',
        id: msg.id,
        // @ts-ignore
        message: String((err && err.stack) || err),
      });
    }
  }

  try {
    // see https://github.com/dotnet/runtime/issues/114918
    // and https://github.com/dotnet/runtime/pull/92280
    // @ts-ignore
    self.dotnetSidecar = true;
    // @ts-ignore
    const dotnetModule = await import(self.baseUrl + '_framework/dotnet.js');
    const runtime = await dotnetModule.dotnet.withDiagnosticTracing(false).create();
    const config = runtime.getConfig();
    exportsObj = await runtime.getAssemblyExports(config.mainAssemblyName);
    // runMain() runs the app's Main() but keeps the runtime alive.
    await runtime.runMain();
    ready = true;
    queue.splice(0).forEach(compile);
    self.postMessage({ type: 'ready' });
  } catch (err) {
    self.postMessage({
      type: 'fatal',
      // @ts-ignore
      message: String((err && err.stack) || err),
    });
  }
})();
