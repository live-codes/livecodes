import { createPlayground } from '../index';
import type { Playground } from '../models';

// ---------------------------------------------------------------------------
// Helpers – simulate the postMessage protocol the LiveCodes app uses
// ---------------------------------------------------------------------------

const appUrl = 'https://livecodes.io';

/**
 * Finds the LiveCodes iframe inside a container, stubs its contentWindow, and
 * fires the `onload` callback so `createPlayground` can proceed. Returns the
 * fake `contentWindow` so tests can assert on what was posted.
 */
function findIframeAndLoad(container: HTMLElement) {
  const iframe = container.querySelector('iframe.livecodes') as HTMLIFrameElement;
  if (!iframe) throw new Error('iframe not found');

  const posted: Array<{ type?: string; method?: string; id?: string; args?: any[] }> = [];

  // Stub contentWindow – jsdom iframes have a real contentWindow but its
  // `postMessage` does not trigger `window.addEventListener('message', ...)`
  // on the *parent* window. We override it so we can intercept outgoing
  // messages and simulate replies.
  const fakeContentWindow = {
    postMessage: jest.fn((data: any, _origin: string) => {
      posted.push(data);
    }),
  };

  Object.defineProperty(iframe, 'contentWindow', {
    get: () => fakeContentWindow,
    configurable: true,
  });

  // Trigger the iframe's onload handler
  iframe.onload?.(new Event('load') as any);

  return { iframe, fakeContentWindow, posted };
}

/**
 * Dispatches a MessageEvent on the parent `window` that looks like it came
 * from the given iframe's contentWindow.
 */
function postFromIframe(fakeContentWindow: { postMessage: jest.Mock }, data: Record<string, any>) {
  const event = new MessageEvent('message', {
    data,
    origin: appUrl,
    source: fakeContentWindow as any,
  });
  window.dispatchEvent(event);
}

/**
 * Creates a playground, loads the iframe, fires 'livecodes-ready', and returns
 * everything needed for further interaction.
 */
async function createReadyPlayground(container: HTMLElement, options: Record<string, any> = {}) {
  const promise = createPlayground(container, { loading: 'eager', ...options } as any);

  // Allow the iframe to be inserted
  await flushMicrotasks();

  const { iframe, fakeContentWindow, posted } = findIframeAndLoad(container);

  // After firing onload, createPlayground resumes asynchronously and registers
  // the readyHandler. We need to wait for that registration before dispatching
  // events.
  await flushMicrotasks();

  // Fire the init event
  postFromIframe(fakeContentWindow, {
    type: 'livecodes-init',
    payload: { appVersion: 'v50' },
  });

  // Fire the ready event
  postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

  const playground = await promise;

  return { playground, iframe, fakeContentWindow, posted };
}

function flushMicrotasks() {
  // Flush both microtask queue and one macrotask tick, allowing nested
  // async chains (e.g. `callAPI -> await loadLivecodes -> postMessage`)
  // to fully settle.
  return new Promise<void>((r) => setTimeout(r, 50));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

afterEach(() => {
  document.body.innerHTML = '';
  jest.restoreAllMocks();
});

// ---- Container resolution ---------------------------------------------------

describe('createPlayground – container resolution', () => {
  test('accepts an HTMLElement as container', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, iframe } = await createReadyPlayground(container);

    expect(iframe).toBeTruthy();
    expect(iframe.parentElement).toBe(container);
    await playground.destroy();
  });

  test('accepts a CSS selector string as container', async () => {
    const container = document.createElement('div');
    container.id = 'my-playground';
    document.body.appendChild(container);

    const promise = createPlayground('#my-playground', { loading: 'eager' });
    await flushMicrotasks();

    const { fakeContentWindow } = findIframeAndLoad(container);
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-init',
      payload: { appVersion: 'v50' },
    });
    postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

    const playground = await promise;
    expect(container.querySelector('iframe.livecodes')).toBeTruthy();
    await playground.destroy();
  });

  test('throws when container selector does not match any element', async () => {
    await expect(createPlayground('#nonexistent', { loading: 'eager' })).rejects.toThrow(
      'Cannot find element',
    );
  });

  test('throws when container is not valid and not headless', async () => {
    await expect(createPlayground(42 as any, { loading: 'eager' })).rejects.toThrow(
      'A valid container element is required.',
    );
  });
});

// ---- Headless mode ----------------------------------------------------------

describe('createPlayground – headless mode', () => {
  test('creates a hidden container when headless is true and no container given', async () => {
    const promise = createPlayground({ headless: true, loading: 'eager' } as any);
    await flushMicrotasks();

    // The SDK should have appended a hidden div to body
    const hiddenDiv = document.body.querySelector('div');
    expect(hiddenDiv).toBeTruthy();
    expect(hiddenDiv!.style.visibility).toBe('hidden');

    const { fakeContentWindow } = findIframeAndLoad(hiddenDiv!);
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-init',
      payload: { appVersion: 'v50' },
    });
    postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

    const playground = await promise;
    expect(playground).toBeTruthy();
    await playground.destroy();
  });

  test('headless via view: "headless" creates a hidden container', async () => {
    const promise = createPlayground({ view: 'headless', loading: 'eager' } as any);
    await flushMicrotasks();

    const hiddenDiv = document.body.querySelector('div');
    expect(hiddenDiv).toBeTruthy();
    expect(hiddenDiv!.style.visibility).toBe('hidden');

    const { fakeContentWindow } = findIframeAndLoad(hiddenDiv!);
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-init',
      payload: { appVersion: 'v50' },
    });
    postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

    const playground = await promise;
    await playground.destroy();
  });

  test('headless iframe is hidden', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container, { headless: true });

    expect(iframe.style.visibility).toBe('hidden');
    expect(iframe.style.opacity).toBe('0');
    await playground.destroy();
  });
});

// ---- Iframe creation --------------------------------------------------------

describe('createPlayground – iframe creation', () => {
  test('creates an iframe with correct sandbox attributes', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container);

    expect(iframe.getAttribute('sandbox')).toBe(
      'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
    );
    await playground.destroy();
  });

  test('creates an iframe with default allow attributes', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container);

    const allow = iframe.getAttribute('allow')!;
    // jsdom userAgent does not match Chrome or Firefox, so defaults are used
    expect(allow).toContain('camera');
    expect(allow).toContain('microphone');
    expect(allow).toContain('geolocation');
    expect(allow).toContain('display-capture');
    expect(allow).toContain('web-share');
    expect(allow).toContain('encrypted-media');
    expect(allow).toContain('accelerometer');
    expect(allow).toContain('gyroscope');
    expect(allow).toContain('midi');
    expect(allow).toContain('serial');
    expect(allow).toContain('ambient-light-sensor');
    expect(allow).toContain('payment');
    expect(allow).toContain('vr');
    expect(allow).toContain('xr-spatial-tracking');
    expect(iframe.getAttribute('allowfullscreen')).toBe('true');
    await playground.destroy();
  });

  test('creates an iframe with Chrome allow attributes when Chrome UA is detected', async () => {
    const originalUA = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      configurable: true,
    });

    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container);

    const allow = iframe.getAttribute('allow')!;
    expect(allow).toContain('clipboard-read');
    expect(allow).toContain('clipboard-write');
    expect(allow).toContain('bluetooth');
    expect(allow).toContain('language-model');
    expect(allow).toContain('translator');
    expect(allow).toContain('summarizer');
    expect(allow).toContain('writer');
    expect(allow).toContain('rewriter');
    expect(allow).toContain('language-detector');
    // Should not contain Firefox/default-only attributes
    expect(allow).not.toContain('ambient-light-sensor');
    expect(allow).not.toContain('payment');
    expect(allow).not.toContain('vr');

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true,
    });
    await playground.destroy();
  });

  test('creates an iframe with Firefox allow attributes when Firefox UA is detected', async () => {
    const originalUA = navigator.userAgent;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      configurable: true,
    });

    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container);

    const allow = iframe.getAttribute('allow')!;
    expect(allow).toBe('camera; display-capture; geolocation; microphone; web-share');
    // Should not contain Chrome/default-only attributes
    expect(allow).not.toContain('accelerometer');
    expect(allow).not.toContain('encrypted-media');
    expect(allow).not.toContain('gyroscope');
    expect(allow).not.toContain('midi');
    expect(allow).not.toContain('clipboard-read');

    Object.defineProperty(navigator, 'userAgent', {
      value: originalUA,
      configurable: true,
    });
    await playground.destroy();
  });

  test('iframe src contains embed=true and sdkVersion', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container);

    const url = new URL(iframe.src);
    expect(url.searchParams.get('embed')).toBe('true');
    expect(url.searchParams.has('sdkVersion')).toBe(true);
    await playground.destroy();
  });

  test('iframe src includes loading param', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container, {
      loading: 'click',
    });

    const url = new URL(iframe.src);
    expect(url.searchParams.get('loading')).toBe('click');
    await playground.destroy();
  });

  test('headless forces eager loading in iframe src', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { iframe, playground } = await createReadyPlayground(container, {
      headless: true,
    });

    const url = new URL(iframe.src);
    expect(url.searchParams.get('loading')).toBe('eager');
    await playground.destroy();
  });

  test('reuses pre-existing iframe if present', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const existingIframe = document.createElement('iframe');
    existingIframe.classList.add('livecodes');
    container.appendChild(existingIframe);

    const promise = createPlayground(container, { loading: 'eager' });
    await flushMicrotasks();

    // Should reuse the existing iframe, not create a new one
    const iframes = container.querySelectorAll('iframe.livecodes');
    expect(iframes.length).toBe(1);

    const { fakeContentWindow } = findIframeAndLoad(container);
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-init',
      payload: { appVersion: 'v50' },
    });
    postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

    const playground = await promise;
    await playground.destroy();
  });
});

// ---- Default styles ---------------------------------------------------------

describe('createPlayground – default styles', () => {
  test('applies default styles to container', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.style.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(container.style.borderRadius).toBe('8px');
    expect(container.style.width).toBe('100%');
    expect(container.style.minHeight).toBe('200px');
    expect(container.style.overflow).toBe('hidden');
    expect(container.style.resize).toBe('vertical');
    await playground.destroy();
  });

  test('does not override existing container styles', async () => {
    const container = document.createElement('div');
    container.style.backgroundColor = 'red';
    container.style.width = '500px';
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.style.backgroundColor).toBe('red');
    expect(container.style.width).toBe('500px');
    await playground.destroy();
  });

  test('skips default styles when data-default-styles="false"', async () => {
    const container = document.createElement('div');
    container.dataset.defaultStyles = 'false';
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.style.backgroundColor).toBe('');
    expect(container.style.border).toBe('');
    await playground.destroy();
  });

  test('applies data-height to container', async () => {
    const container = document.createElement('div');
    container.dataset.height = '500';
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.style.height).toBe('500px');
    await playground.destroy();
  });

  test('applies non-numeric data-height as-is', async () => {
    const container = document.createElement('div');
    container.dataset.height = '50vh';
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.style.height).toBe('50vh');
    await playground.destroy();
  });

  test('does not apply default styles in headless mode', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container, { headless: true });

    // In headless mode, default styles like border should not be applied
    expect(container.style.borderRadius).toBe('');
    expect(container.style.resize).toBe('');
    await playground.destroy();
  });
});

// ---- SDK methods (postMessage API) ------------------------------------------

describe('createPlayground – SDK methods', () => {
  /**
   * Helper: simulate the app responding to an API call.
   * Looks at the most recent message posted to the iframe and sends back a
   * matching `livecodes-api-response`.
   */
  function respondToAPI(
    fakeContentWindow: { postMessage: jest.Mock },
    posted: Array<{ method?: string; id?: string }>,
    payload: any = undefined,
  ) {
    // Find the last API call (has a `method` and `id`)
    const call = [...posted].reverse().find((m) => m.method && m.id);
    if (!call) throw new Error('No pending API call found in posted messages');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: call.method,
      id: call.id,
      payload,
    });
  }

  test('run() sends a postMessage with method "run"', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const runPromise = playground.run();
    await flushMicrotasks();

    const runCall = posted.find((m) => m.method === 'run');
    expect(runCall).toBeTruthy();
    expect(runCall!.id).toBeTruthy();

    respondToAPI(fakeContentWindow, posted);
    await runPromise;
    await playground.destroy();
  });

  test('getConfig() resolves with the payload from the iframe', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const configPromise = playground.getConfig();
    await flushMicrotasks();

    const mockConfig = { markup: { language: 'html', content: '<h1>Hi</h1>' } };
    respondToAPI(fakeContentWindow, posted, mockConfig);

    const result = await configPromise;
    expect(result).toEqual(mockConfig);
    await playground.destroy();
  });

  test('setConfig() sends config as args', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const newConfig = { markup: { language: 'markdown' as const, content: '# Hello' } };
    const setPromise = playground.setConfig(newConfig);
    await flushMicrotasks();

    const setCall = posted.find((m) => m.method === 'setConfig');
    expect(setCall).toBeTruthy();
    expect(setCall!.args).toEqual([newConfig]);

    respondToAPI(fakeContentWindow, posted);
    await setPromise;
    await playground.destroy();
  });

  test('getCode() resolves with code from the iframe', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const codePromise = playground.getCode();
    await flushMicrotasks();

    const mockCode = {
      markup: { language: 'html', content: '<p>hi</p>' },
      style: { language: 'css', content: '' },
      script: { language: 'javascript', content: '' },
    };
    respondToAPI(fakeContentWindow, posted, mockCode);

    const result = await codePromise;
    expect(result).toEqual(mockCode);
    await playground.destroy();
  });

  test('format() passes allEditors argument', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const formatPromise = playground.format(true);
    await flushMicrotasks();

    const formatCall = posted.find((m) => m.method === 'format');
    expect(formatCall).toBeTruthy();
    expect(formatCall!.args).toEqual([true]);

    respondToAPI(fakeContentWindow, posted);
    await formatPromise;
    await playground.destroy();
  });

  test('getShareUrl() passes shortUrl argument', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const sharePromise = playground.getShareUrl(true);
    await flushMicrotasks();

    const shareCall = posted.find((m) => m.method === 'getShareUrl');
    expect(shareCall!.args).toEqual([true]);

    respondToAPI(fakeContentWindow, posted, 'https://livecodes.io/?x=abc');
    const result = await sharePromise;
    expect(result).toBe('https://livecodes.io/?x=abc');
    await playground.destroy();
  });

  test('show() passes pane and options arguments', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const showPromise = playground.show('result', { full: true });
    await flushMicrotasks();

    const showCall = posted.find((m) => m.method === 'show');
    expect(showCall!.args).toEqual(['result', { full: true }]);

    respondToAPI(fakeContentWindow, posted);
    await showPromise;
    await playground.destroy();
  });

  test('exec() passes command and extra args', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const execPromise = playground.exec('showVersion');
    await flushMicrotasks();

    const execCall = posted.find((m) => m.method === 'exec');
    expect(execCall!.args).toEqual(['showVersion']);

    respondToAPI(fakeContentWindow, posted);
    await execPromise;
    await playground.destroy();
  });

  test('API call rejects when response contains error payload', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const runPromise = playground.run();
    await flushMicrotasks();

    const call = [...posted].reverse().find((m) => m.method === 'run');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: call!.method,
      id: call!.id,
      payload: { error: 'Something went wrong' },
    });

    await expect(runPromise).rejects.toBe('Something went wrong');
    await playground.destroy();
  });

  test('API methods reject after destroy()', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    await playground.destroy();

    await expect(playground.run()).rejects.toMatch(/destroy/);
    await expect(playground.getConfig()).rejects.toMatch(/destroy/);
    await expect(playground.getCode()).rejects.toMatch(/destroy/);
    await expect(playground.setConfig({})).rejects.toMatch(/destroy/);
  });

  test('calling destroy() twice rejects the second time', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    await playground.destroy();
    await expect(playground.destroy()).rejects.toMatch(/destroy/);
  });

  test('multiple concurrent API calls each get their own response', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const runPromise = playground.run();
    const formatPromise = playground.format(false);
    await flushMicrotasks();

    // Both calls should have been posted
    const runCall = posted.find((m) => m.method === 'run');
    const formatCall = posted.find((m) => m.method === 'format');
    expect(runCall).toBeTruthy();
    expect(formatCall).toBeTruthy();
    expect(runCall!.id).not.toBe(formatCall!.id);

    // Respond to format first, then run (out of order)
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'format',
      id: formatCall!.id,
      payload: undefined,
    });
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'run',
      id: runCall!.id,
      payload: undefined,
    });

    await runPromise;
    await formatPromise;
    await playground.destroy();
  });
});

// ---- Destroy and cleanup ----------------------------------------------------

describe('createPlayground – destroy', () => {
  test('destroy removes the iframe from DOM', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    expect(container.querySelector('iframe.livecodes')).toBeTruthy();
    await playground.destroy();
    expect(container.querySelector('iframe.livecodes')).toBeFalsy();
  });

  test('destroy removes window message event listeners', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { playground } = await createReadyPlayground(container);

    await playground.destroy();

    // At least the watchHandler listener should be removed
    const messageCalls = removeSpy.mock.calls.filter(([type]) => type === 'message');
    expect(messageCalls.length).toBeGreaterThan(0);
  });

  test('load() rejects after destroy()', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);
    await playground.destroy();

    await expect(playground.load()).rejects.toMatch(/destroy/);
  });
});

// ---- Watch / onChange --------------------------------------------------------

describe('createPlayground – watch and onChange', () => {
  test('watch("code") receives code change events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    const watcher = playground.watch('code', (data) => {
      received.push(data);
    });
    await flushMicrotasks();

    // The SDK should have called callAPI('watch', ['code']) to notify the app
    const watchCall = posted.find((m) => m.method === 'watch');
    expect(watchCall).toBeTruthy();
    expect(watchCall!.args).toEqual(['code']);

    // Respond to the watch subscription call
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    // Simulate a code change event from the iframe
    const codePayload = { markup: { language: 'html', content: '<p>test</p>' } };
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: codePayload,
    });

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(codePayload);

    watcher.remove();
    await playground.destroy();
  });

  test('onChange is an alias for watch("code")', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    const watcher = playground.onChange((data) => {
      received.push(data);
    });
    await flushMicrotasks();

    // Respond to the watch call
    const watchCall = posted.find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    // Simulate change event
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: { some: 'data' },
    });

    expect(received).toHaveLength(1);
    watcher.remove();
    await playground.destroy();
  });

  test('watch("load") receives app loaded events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    let loadCount = 0;
    playground.watch('load', () => {
      loadCount++;
    });
    await flushMicrotasks();

    // Respond to the watch subscription
    const watchCall = posted.find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    // Simulate app loaded event
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-app-loaded',
      payload: undefined,
    });

    expect(loadCount).toBe(1);
    await playground.destroy();
  });

  test('watch("console") receives console events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    playground.watch('console', (data) => {
      received.push(data);
    });
    await flushMicrotasks();

    const watchCall = posted.find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    const consolePayload = { method: 'log', args: ['hello'] };
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-console',
      payload: consolePayload,
    });

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(consolePayload);
    await playground.destroy();
  });

  test('watch("tests") receives test result events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    playground.watch('tests', (data) => {
      received.push(data);
    });
    await flushMicrotasks();

    const watchCall = posted.find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    const testsPayload = { results: [{ status: 'pass', testPath: ['test 1'] }] };
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-test-results',
      payload: testsPayload,
    });

    expect(received).toHaveLength(1);
    expect(received[0]).toEqual(testsPayload);
    await playground.destroy();
  });

  test('watcher.remove() stops receiving events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    const watcher = playground.watch('code', (data) => {
      received.push(data);
    });
    await flushMicrotasks();

    // Respond to the first watch subscription
    const watchCall = posted.find((m) => m.method === 'watch' && m.args?.[0] === 'code');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    // First event should be received
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: { first: true },
    });
    expect(received).toHaveLength(1);

    // Remove watcher
    watcher.remove();

    // Respond to the unsubscribe call
    await flushMicrotasks();
    const unsubCall = [...posted]
      .reverse()
      .find((m) => m.method === 'watch' && m.args?.[1] === 'unsubscribe');
    if (unsubCall) {
      postFromIframe(fakeContentWindow, {
        type: 'livecodes-api-response',
        method: 'watch',
        id: unsubCall.id,
        payload: undefined,
      });
    }

    // Second event should NOT be received
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: { second: true },
    });
    expect(received).toHaveLength(1);

    await playground.destroy();
  });

  test('multiple watchers on same event all receive events', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received1: any[] = [];
    const received2: any[] = [];

    playground.watch('code', (data) => received1.push(data));
    await flushMicrotasks();
    // Respond to first subscription
    const call1 = [...posted].reverse().find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: call1!.id,
      payload: undefined,
    });

    playground.watch('code', (data) => received2.push(data));
    await flushMicrotasks();
    // Respond to second subscription
    const call2 = [...posted].reverse().find((m) => m.method === 'watch' && m.id !== call1!.id);
    if (call2) {
      postFromIframe(fakeContentWindow, {
        type: 'livecodes-api-response',
        method: 'watch',
        id: call2.id,
        payload: undefined,
      });
    }

    // Fire one event – both watchers should get it
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: { val: 1 },
    });

    expect(received1).toHaveLength(1);
    expect(received2).toHaveLength(1);
    await playground.destroy();
  });

  test('watching an invalid event returns a no-op remover', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    const watcher = playground.watch('invalid-event' as any, () => undefined);
    expect(watcher).toHaveProperty('remove');
    expect(typeof watcher.remove).toBe('function');
    // Should not throw
    watcher.remove();

    await playground.destroy();
  });

  test('watch throws after destroy', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);
    await playground.destroy();

    expect(() => playground.watch('code', () => undefined)).toThrow(/destroy/);
  });

  test('destroy clears all watchers', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const received: any[] = [];
    playground.watch('code', (data) => received.push(data));
    await flushMicrotasks();

    const watchCall = posted.find((m) => m.method === 'watch');
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'watch',
      id: watchCall!.id,
      payload: undefined,
    });

    await playground.destroy();

    // Events after destroy should not be received
    // (the event listener was removed, so this is really testing the cleanup)
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-change',
      payload: { after: 'destroy' },
    });
    expect(received).toHaveLength(0);
  });
});

// ---- Event handler cleanup (eventHandlers leak fix) -------------------------

describe('createPlayground – event handler cleanup', () => {
  test('eventHandlers do not leak after API calls complete', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const addSpy = jest.spyOn(window, 'addEventListener');
    const removeSpy = jest.spyOn(window, 'removeEventListener');

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    // Count message listeners added so far (init, config, ready, watchHandler)
    const addedBefore = addSpy.mock.calls.filter(([t]) => t === 'message').length;
    const removedBefore = removeSpy.mock.calls.filter(([t]) => t === 'message').length;

    // Make several API calls
    for (let i = 0; i < 5; i++) {
      const p = playground.run();
      await flushMicrotasks();
      const call = [...posted].reverse().find((m) => m.method === 'run');
      postFromIframe(fakeContentWindow, {
        type: 'livecodes-api-response',
        method: 'run',
        id: call!.id,
        payload: undefined,
      });
      await p;
    }

    const addedAfter = addSpy.mock.calls.filter(([t]) => t === 'message').length;
    const removedAfter = removeSpy.mock.calls.filter(([t]) => t === 'message').length;

    // Each API call adds one handler and removes one handler
    const addedByAPICalls = addedAfter - addedBefore;
    const removedByAPICalls = removedAfter - removedBefore;
    expect(addedByAPICalls).toBe(5);
    expect(removedByAPICalls).toBe(5);

    await playground.destroy();
  });

  test('messages from wrong origin are ignored', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const runPromise = playground.run();
    await flushMicrotasks();

    const call = [...posted].reverse().find((m) => m.method === 'run');

    // Send response from wrong origin
    const event = new MessageEvent('message', {
      data: {
        type: 'livecodes-api-response',
        method: 'run',
        id: call!.id,
        payload: undefined,
      },
      origin: 'https://evil.com',
      source: fakeContentWindow as any,
    });
    window.dispatchEvent(event);

    // The promise should still be pending (not resolved)
    // Resolve it properly
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'run',
      id: call!.id,
      payload: 'correct',
    });

    const result = await runPromise;
    expect(result).toBe('correct');
    await playground.destroy();
  });

  test('messages from wrong source window are ignored', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground, fakeContentWindow, posted } = await createReadyPlayground(container);

    const runPromise = playground.run();
    await flushMicrotasks();

    const call = [...posted].reverse().find((m) => m.method === 'run');

    // Send response with correct origin but wrong source
    const wrongSource = { postMessage: jest.fn() };
    const event = new MessageEvent('message', {
      data: {
        type: 'livecodes-api-response',
        method: 'run',
        id: call!.id,
        payload: 'from-wrong-source',
      },
      origin: appUrl,
      source: wrongSource as any,
    });
    window.dispatchEvent(event);

    // Now send the correct response
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-api-response',
      method: 'run',
      id: call!.id,
      payload: 'from-correct-source',
    });

    const result = await runPromise;
    expect(result).toBe('from-correct-source');
    await playground.destroy();
  });
});

// ---- Backward compatibility -------------------------------------------------

describe('createPlayground – backward compatibility', () => {
  test('responds to livecodes-get-config for older app versions', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const config = { markup: { language: 'html' as const, content: '<p>test</p>' } };
    const promise = createPlayground(container, { loading: 'eager', config } as any);
    await flushMicrotasks();

    const { fakeContentWindow } = findIframeAndLoad(container);

    // Simulate older app requesting config
    postFromIframe(fakeContentWindow, { type: 'livecodes-get-config' });

    // The SDK should have responded with the config
    const configResponse = fakeContentWindow.postMessage.mock.calls.find(
      (args: any[]) => args[0]?.type === 'livecodes-config',
    );
    expect(configResponse).toBeTruthy();
    expect(configResponse![0].payload).toEqual(config);

    // Now fire init and ready to complete setup
    postFromIframe(fakeContentWindow, {
      type: 'livecodes-init',
      payload: { appVersion: 'v50' },
    });
    postFromIframe(fakeContentWindow, { type: 'livecodes-ready' });

    const playground = await promise;
    await playground.destroy();
  });

  test('iframe src includes config=sdk when config object is provided', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const config = { markup: { language: 'html' as const, content: '<p>Hi</p>' } };
    const { iframe, playground } = await createReadyPlayground(container, { config });

    const url = new URL(iframe.src);
    expect(url.searchParams.get('config')).toBe('sdk');
    await playground.destroy();
  });

  test('iframe src includes params in search params when small enough', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const params = { js: 'console.log("hi")' };
    const { iframe, playground } = await createReadyPlayground(container, { params });

    const url = new URL(iframe.src);
    expect(url.searchParams.get('js')).toBe(encodeURIComponent('console.log("hi")'));
    await playground.destroy();
  });
});

// ---- Returned Playground object shape ---------------------------------------

describe('createPlayground – returned object', () => {
  test('returns all expected SDK methods', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const { playground } = await createReadyPlayground(container);

    const expectedMethods: Array<keyof Playground> = [
      'load',
      'run',
      'format',
      'getShareUrl',
      'getConfig',
      'setConfig',
      'getCode',
      'show',
      'runTests',
      'onChange',
      'watch',
      'exec',
      'destroy',
    ];

    for (const method of expectedMethods) {
      expect(typeof playground[method]).toBe('function');
    }

    await playground.destroy();
  });
});
