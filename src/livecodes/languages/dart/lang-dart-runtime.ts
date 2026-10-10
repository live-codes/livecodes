import { dartWasmBaseUrl } from '../../vendors';

declare const window: any;
declare const parent: any;

export const setupDartRuntime = (engine: 'dart' | 'flutter') => {
  window.livecodes = window.livecodes || {};
  const ns = (window.livecodes[engine] = window.livecodes[engine] || {});

  const postLoading = (payload: boolean) => parent.postMessage({ type: 'loading', payload }, '*'); // NOSONAR - the parent validates the source.

  ns.ready ??= (async () => {
    ns.runtime = await window.DartWasm.loadRuntime({ engine, baseUrl: dartWasmBaseUrl });
    return ns.runtime;
  })();

  ns.run ??= async (program: {
    libraryUri: string;
    modules: Array<{ name: string; code: string }>;
  }) => {
    postLoading(true);
    try {
      const runtime = await ns.ready;
      await runtime.run(program);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error((error as Error)?.message ?? String(error));
    } finally {
      postLoading(false);
    }
  };

  return ns;
};
