import { dartWasmBaseUrl } from '../../vendors';

declare const window: any;
declare const parent: any;

export const setupDartRuntime = (engine: 'dart' | 'flutter') => {
  window.livecodes = window.livecodes || {};
  const ns = (window.livecodes[engine] = window.livecodes[engine] || {});

  const postLoading = (payload: boolean) => parent.postMessage({ type: 'loading', payload }, '*'); // NOSONAR - the parent validates the source.

  // Flutter draws its own UI, so the engine needs an element to draw into. LiveCodes' convention is
  // a `#livecodes-app` element from the HTML tab when there is one, otherwise a `div` added to the
  // page. The Dart engine runs in the page itself and needs no container.
  const flutterContainer = () => {
    const existing = document.querySelector<HTMLElement>('#livecodes-app');
    if (existing) return existing;
    const container = document.createElement('div');
    // The engine sizes to the host element, so it has to fill the result pane the way the engine's
    // own full-page host would have.
    Object.assign(container.style, {
      position: 'fixed',
      inset: '0',
      overflow: 'hidden',
    });
    return document.body.appendChild(container);
  };

  // Created on the first run, not while this script is parsed: the result page's markup (and so
  // `#livecodes-app`) does not exist yet when the head scripts run.
  const ready = () =>
    (ns.ready ??= (async () => {
      ns.runtime = await window.DartWasm.loadRuntime({
        engine,
        baseUrl: dartWasmBaseUrl,
        ...(engine === 'flutter' ? { container: flutterContainer() } : {}),
      });
      return ns.runtime;
    })());

  ns.run ??= async (program: {
    libraryUri: string;
    modules: Array<{ name: string; code: string }>;
  }) => {
    postLoading(true);
    try {
      const runtime = await ready();
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
