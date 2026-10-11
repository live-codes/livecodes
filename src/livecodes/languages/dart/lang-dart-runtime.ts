import { dartWasmBaseUrl } from '../../vendors';

declare const window: any;
declare const parent: any;

// The result page is served without a UTF-8 charset, so the browser falls back to its default
// (windows-1252). The Dart/Flutter SDK loads its large, non-ASCII runtime scripts as
// `text/javascript` blobs, and a blob script with no charset inherits the document's encoding,
// which corrupts the SDK's data tables — an `Uri.parse` then throws
// `RangeError (index): Index out of range`. Tagging those JS blobs with UTF-8 keeps the SDK
// decoding correctly however the page is served. Both engines load through the same blob path.
const forceUtf8ScriptBlobs = () => {
  const scope = globalThis as any;
  const OriginalBlob = scope.Blob;
  if (typeof OriginalBlob !== 'function' || OriginalBlob.livecodesUtf8) return;

  const Utf8Blob = function (parts: any, options: any) {
    if (
      options &&
      typeof options.type === 'string' &&
      /^(text|application)\/(java|ecma)script$/.test(options.type)
    ) {
      options = { ...options, type: `${options.type};charset=utf-8` };
    }
    return new OriginalBlob(parts, options);
  };
  Utf8Blob.prototype = OriginalBlob.prototype;
  Utf8Blob.livecodesUtf8 = true;
  scope.Blob = Utf8Blob;
};

export const setupDartRuntime = (engine: 'dart' | 'flutter') => {
  forceUtf8ScriptBlobs();
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
