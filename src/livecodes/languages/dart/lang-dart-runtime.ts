import { dartWasmBaseUrl } from '../../vendors';

declare const window: any;
declare const parent: any;

/**
 * The Dart runtime, in the result page.
 *
 * The compiled JavaScript is not self-contained: it is a DDC library bundle that binds against the
 * precompiled SDK runtime, so the runtime has to be in place first. `loadRuntime` puts it there —
 * inflating whatever ships compressed — and this exposes it to the compiled code as
 * `livecodes.dart.run(program)`.
 *
 * The result page is where the code runs, so a Dart program has the page, its DOM and the markup
 * and styles from the other editors. Flutter uses the same setup with its own engine.
 */
export const setupDartRuntime = (engine: 'dart' | 'flutter') => {
  window.livecodes = window.livecodes || {};
  const ns = (window.livecodes[engine] = window.livecodes[engine] || {});

  const postLoading = (payload: boolean) =>
    parent.postMessage({ type: 'loading', payload }, '*'); // NOSONAR - the parent validates the source.

  ns.ready ??= (async () => {
    ns.runtime = await window.DartWasm.loadRuntime({ engine, baseUrl: dartWasmBaseUrl });
    return ns.runtime;
  })();

  ns.run ??= async (program: { libraryUri: string; modules: { name: string; code: string }[] }) => {
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
