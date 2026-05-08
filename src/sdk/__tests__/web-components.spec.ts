import type { Playground } from '../models';

// ---------------------------------------------------------------------------
// Mock createPlayground
// ---------------------------------------------------------------------------

const mockDestroy = jest.fn(() => Promise.resolve());
const mockSetConfig = jest.fn(() => Promise.resolve());

function createMockSdk(): Playground {
  return {
    load: jest.fn(),
    run: jest.fn(),
    format: jest.fn(),
    getShareUrl: jest.fn(),
    getConfig: jest.fn(),
    setConfig: mockSetConfig,
    getCode: jest.fn(),
    show: jest.fn(),
    runTests: jest.fn(),
    onChange: jest.fn(),
    watch: jest.fn(),
    exec: jest.fn(),
    destroy: mockDestroy,
  } as unknown as Playground;
}

let mockSdk: Playground;
let createPlaygroundMock: jest.Mock;

jest.mock('../index', () => ({
  createPlayground: (...args: any[]) => createPlaygroundMock(...args),
}));

// Import web-components AFTER the mock is in place.
// This triggers `customElements.define('live-codes', ...)`.
beforeAll(async () => {
  await import('../web-components');
});

beforeEach(() => {
  mockSdk = createMockSdk();
  createPlaygroundMock = jest.fn().mockResolvedValue(mockSdk);
  mockDestroy.mockClear();
  mockSetConfig.mockClear();
});

afterEach(() => {
  document.body.innerHTML = '';
});

function flushMicrotasks() {
  return new Promise<void>((r) => setTimeout(r, 50));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('<live-codes> – registration', () => {
  test('is registered as a custom element', () => {
    expect(customElements.get('live-codes')).toBeTruthy();
  });

  test('creates an instance via document.createElement', () => {
    const el = document.createElement('live-codes');
    expect(el).toBeInstanceOf(HTMLElement);
  });
});

describe('<live-codes> – lifecycle', () => {
  test('calls createPlayground when connected to DOM', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    // First arg is the element itself (used as container)
    expect(createPlaygroundMock.mock.calls[0][0]).toBe(el);
  });

  test('sets display:block when connected', () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);

    expect(el.style.display).toBe('block');
  });

  test('destroys playground when disconnected', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.remove();
    expect(mockDestroy).toHaveBeenCalled();
  });

  test('does not call createPlayground before connecting', async () => {
    document.createElement('live-codes');
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();
  });
});

describe('<live-codes> – attributes', () => {
  test('maps template attribute to EmbedOptions', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.template).toBe('react');
  });

  test('maps app-url attribute to appUrl option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('app-url', 'https://example.com');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.appUrl).toBe('https://example.com');
  });

  test('maps import attribute to import option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('import', 'https://gist.github.com/abc');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.import).toBe('https://gist.github.com/abc');
  });

  test('maps loading attribute to loading option', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('loading', 'eager');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.loading).toBe('eager');
  });

  test('headless attribute sets headless to true', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('headless', '');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.headless).toBe(true);
  });

  test('lite attribute sets lite to true', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('lite', '');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.lite).toBe(true);
  });

  test('height attribute sets element height and data-height', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('height', '500');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.style.height).toBe('500px');
    expect(el.dataset.height).toBe('500px');
  });

  test('non-numeric height is applied as-is', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('height', '50vh');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.style.height).toBe('50vh');
    expect(el.dataset.height).toBe('50vh');
  });
});

describe('<live-codes> – attribute changes', () => {
  test('changing template recreates playground', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.setAttribute('template', 'vue');
    await flushMicrotasks();

    expect(mockDestroy).toHaveBeenCalled();
    expect(createPlaygroundMock).toHaveBeenCalledTimes(2);
    expect(createPlaygroundMock.mock.calls[1][1].template).toBe('vue');
  });

  test('setting same attribute value does not trigger update', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    createPlaygroundMock.mockClear();
    el.setAttribute('template', 'react');
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();
  });

  test('multiple attribute changes in same tick are batched', async () => {
    const el = document.createElement('live-codes');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    createPlaygroundMock.mockClear();
    mockDestroy.mockClear();

    // Change multiple attributes synchronously
    el.setAttribute('template', 'vue');
    el.setAttribute('loading', 'eager');
    await flushMicrotasks();

    // Should only have created one new playground (batched)
    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.template).toBe('vue');
    expect(options.loading).toBe('eager');
  });
});

describe('<live-codes> – properties', () => {
  test('config property triggers update', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.config = { title: 'new config' };
    await flushMicrotasks();

    // Config-only change should call setConfig, not recreate
    expect(mockSetConfig).toHaveBeenCalledWith({ title: 'new config' });
  });

  test('config property getter returns the set value', () => {
    const el = document.createElement('live-codes') as any;
    const config = { title: 'test' };
    el.config = config;
    expect(el.config).toBe(config);
  });

  test('params property triggers update', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    mockDestroy.mockClear();

    el.params = { js: 'console.log("hi")' };
    await flushMicrotasks();

    // Params change is an "otherOptions" change, triggers recreation
    expect(mockDestroy).toHaveBeenCalled();
    expect(createPlaygroundMock).toHaveBeenCalledTimes(2);
  });

  test('params property getter returns the set value', () => {
    const el = document.createElement('live-codes') as any;
    const params = { js: 'test' };
    el.params = params;
    expect(el.params).toBe(params);
  });

  test('sdk property is read-only and returns the playground', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(el.sdk).toBe(mockSdk);
  });

  test('sdk is undefined before initialization', () => {
    const el = document.createElement('live-codes') as any;
    expect(el.sdk).toBeUndefined();
  });

  test('setting config before connecting does not trigger update', async () => {
    const el = document.createElement('live-codes') as any;
    el.config = { title: 'pre-connect' };
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();

    // Connect – should use the pre-set config
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config).toEqual({ title: 'pre-connect' });
  });
});

describe('<live-codes> – sdkready event', () => {
  test('dispatches sdkready event with sdk in detail', async () => {
    const el = document.createElement('live-codes');
    const handler = jest.fn();
    el.addEventListener('sdkready', handler);

    document.body.appendChild(el);
    await flushMicrotasks();

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.detail.sdk).toBe(mockSdk);
  });

  test('sdkready event bubbles and is composed', async () => {
    const el = document.createElement('live-codes');
    const handler = jest.fn();
    document.body.addEventListener('sdkready', handler);

    document.body.appendChild(el);
    await flushMicrotasks();

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);

    document.body.removeEventListener('sdkready', handler);
  });
});

describe('<live-codes> – destroy method', () => {
  test('destroy() cleans up the playground', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    el.destroy();
    expect(mockDestroy).toHaveBeenCalled();
    expect(el.sdk).toBeUndefined();
  });

  test('destroy() invalidates pending async creation', async () => {
    let resolvePlayground: (sdk: Playground) => void;
    createPlaygroundMock.mockReturnValue(
      new Promise<Playground>((resolve) => {
        resolvePlayground = resolve;
      }),
    );

    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    // Destroy before playground creation resolves
    el.destroy();

    // Now resolve the pending creation
    const lateSdk = createMockSdk();
    resolvePlayground!(lateSdk);
    await flushMicrotasks();

    // The late SDK should be destroyed since generation changed
    expect(lateSdk.destroy as jest.Mock).toHaveBeenCalled();
    expect(el.sdk).toBeUndefined();
  });
});

describe('<live-codes> – generation-based staleness', () => {
  test('rapid attribute changes only keep the last playground', async () => {
    const resolvers: Array<(sdk: Playground) => void> = [];

    createPlaygroundMock.mockImplementation(
      () =>
        new Promise<Playground>((resolve) => {
          resolvers.push(resolve);
        }),
    );

    const el = document.createElement('live-codes');
    el.setAttribute('template', 'react');
    document.body.appendChild(el);
    await flushMicrotasks();

    // First creation is pending
    expect(resolvers).toHaveLength(1);

    // Change attribute while first is still pending
    el.setAttribute('template', 'vue');
    await flushMicrotasks();

    expect(resolvers).toHaveLength(2);

    // Give each SDK its own destroy mock to track independently
    const staleDestroy = jest.fn();
    const staleSdk = { ...createMockSdk(), destroy: staleDestroy } as unknown as Playground;

    const currentDestroy = jest.fn();
    const currentSdk = { ...createMockSdk(), destroy: currentDestroy } as unknown as Playground;

    // Resolve the first (stale) creation
    resolvers[0](staleSdk);
    await flushMicrotasks();

    // The stale SDK should be destroyed
    expect(staleDestroy).toHaveBeenCalled();

    // Resolve the second (current) creation
    resolvers[1](currentSdk);
    await flushMicrotasks();

    // The current SDK should NOT be destroyed and should be accessible
    expect(currentDestroy).not.toHaveBeenCalled();
    expect((el as any).sdk).toBe(currentSdk);
  });
});

describe('<live-codes> – config URL fetch', () => {
  test('config set to URL string calls setConfig', async () => {
    const el = document.createElement('live-codes') as any;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.config = 'https://example.com/config.json';
    await flushMicrotasks();

    expect(mockSetConfig).toHaveBeenCalledWith('https://example.com/config.json');
  });
});

// ---------------------------------------------------------------------------
// Declarative children
// ---------------------------------------------------------------------------

describe('<live-codes> – declarative children (single-editor mode)', () => {
  test('parses template/style/script children into config', async () => {
    const el = document.createElement('live-codes');
    el.innerHTML = `
      <template>
        <template lang="html"><h1>Hello</h1></template>
        <style lang="scss">body { color: blue; }</style>
        <script lang="ts">console.log('hi');</script>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config).toEqual(
      expect.objectContaining({
        markup: { language: 'html', content: '<h1>Hello</h1>' },
        style: { language: 'scss', content: 'body { color: blue; }' },
        script: { language: 'ts', content: "console.log('hi');" },
      }),
    );
  });

  test('children config is used when no config property is set', async () => {
    const el = document.createElement('live-codes');
    el.innerHTML = `
      <template>
        <style lang="css">h1 { color: red; }</style>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.style).toEqual({ language: 'css', content: 'h1 { color: red; }' });
  });

  test('active attribute sets activeEditor', async () => {
    const el = document.createElement('live-codes');
    el.innerHTML = `
      <template>
        <template lang="html"><h1>Hello</h1></template>
        <script lang="ts" active>console.log('hi');</script>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.activeEditor).toBe('script');
  });
});

describe('<live-codes> – declarative children (multi-file mode)', () => {
  test('parses elements with filename into files array', async () => {
    const el = document.createElement('live-codes');
    el.innerHTML = `
      <template>
        <template filename="index.html"><h1>Hello</h1></template>
        <style filename="styles.css">body { color: blue; }</style>
        <script filename="app.ts">console.log('hi');</script>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.files).toEqual([
      { filename: 'index.html', content: '<h1>Hello</h1>', language: 'html' },
      { filename: 'styles.css', content: 'body { color: blue; }', language: 'css' },
      { filename: 'app.ts', content: "console.log('hi');", language: 'ts' },
    ]);
  });

  test('active attribute in multi-file sets activeEditor to filename', async () => {
    const el = document.createElement('live-codes');
    el.innerHTML = `
      <template>
        <template filename="index.html"><h1>Hello</h1></template>
        <script filename="app.ts" active>console.log('hi');</script>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.activeEditor).toBe('app.ts');
  });
});

describe('<live-codes> – config merge precedence', () => {
  test('config property overrides children for matching editors', async () => {
    const el = document.createElement('live-codes') as any;
    el.config = {
      markup: { language: 'html', content: 'from config prop' },
      script: { language: 'js', content: 'from config prop' },
    };
    el.innerHTML = `
      <template>
        <template lang="html"><h1>from children</h1></template>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // Config property wins for markup (explicit override)
    expect(options.config.markup).toEqual({
      language: 'html',
      content: 'from config prop',
    });
    // Config property is used for script (no child for it either way)
    expect(options.config.script).toEqual({
      language: 'js',
      content: 'from config prop',
    });
  });

  test('children override config attribute for matching editors', async () => {
    const el = document.createElement('live-codes') as any;
    el.setAttribute(
      'config',
      JSON.stringify({
        markup: { language: 'html', content: 'from attr' },
        processors: ['tailwindcss'],
      }),
    );
    el.innerHTML = `
      <template>
        <template lang="html"><h1>from children</h1></template>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // Children win over config attribute for markup
    expect(options.config.markup).toEqual({
      language: 'html',
      content: '<h1>from children</h1>',
    });
    // Non-content settings from config attribute are preserved
    expect(options.config.processors).toEqual(['tailwindcss']);
  });

  test('children provide defaults that config property overrides', async () => {
    const el = document.createElement('live-codes') as any;
    el.innerHTML = `
      <template>
        <template lang="html"><h1>from children</h1></template>
        <style lang="css">body { color: blue; }</style>
      </template>
    `;
    el.config = {
      markup: { language: 'html', content: '<h1>from prop</h1>' },
    };
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // Config property wins for markup
    expect(options.config.markup).toEqual({
      language: 'html',
      content: '<h1>from prop</h1>',
    });
    // Children still provide style (no conflict)
    expect(options.config.style).toEqual({
      language: 'css',
      content: 'body { color: blue; }',
    });
  });
});

// ---------------------------------------------------------------------------
// config / params attributes (JSON)
// ---------------------------------------------------------------------------

describe('<live-codes> – config attribute (JSON)', () => {
  test('config attribute is parsed as JSON and used', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('config', '{"processors": ["tailwindcss"], "title": "Test"}');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.processors).toEqual(['tailwindcss']);
    expect(options.config.title).toBe('Test');
  });

  test('invalid JSON in config attribute is ignored', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('config', '{invalid json}');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // Should not crash, config should be empty or undefined
    expect(options.config).toBeUndefined();
  });

  test('config property takes precedence over config attribute', async () => {
    const el = document.createElement('live-codes') as any;
    el.setAttribute('config', '{"title": "from attr", "processors": ["tailwindcss"]}');
    el.config = { title: 'from prop' };
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.config.title).toBe('from prop');
    // Attribute's non-overlapping props are still present
    expect(options.config.processors).toEqual(['tailwindcss']);
  });

  test('config property as URL string is used as-is (not merged)', async () => {
    const el = document.createElement('live-codes') as any;
    el.setAttribute('config', '{"title": "from attr"}');
    el.config = 'https://example.com/config.json';
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // URL string wins over everything
    expect(options.config).toBe('https://example.com/config.json');
  });

  test('changing config attribute triggers update', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('config', '{"title": "first"}');
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    el.setAttribute('config', '{"title": "second"}');
    await flushMicrotasks();

    // Config-only change should call setConfig
    expect(mockSetConfig).toHaveBeenCalledWith(expect.objectContaining({ title: 'second' }));
  });
});

describe('<live-codes> – params attribute (JSON)', () => {
  test('params attribute is parsed as JSON and used', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('params', '{"console": "open"}');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.params).toEqual({ console: 'open' });
  });

  test('params property overrides matching keys from params attribute', async () => {
    const el = document.createElement('live-codes') as any;
    el.setAttribute('params', '{"console": "open", "js": "from attr"}');
    el.params = { js: 'console.log("hi")' };
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    // Property wins for overlapping key
    expect(options.params.js).toBe('console.log("hi")');
    // Attribute's non-overlapping key is preserved
    expect(options.params.console).toBe('open');
  });

  test('invalid JSON in params attribute is ignored', async () => {
    const el = document.createElement('live-codes');
    el.setAttribute('params', 'not json');
    document.body.appendChild(el);
    await flushMicrotasks();

    const options = createPlaygroundMock.mock.calls[0][1];
    expect(options.params).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// MutationObserver reactivity for children
// ---------------------------------------------------------------------------

describe('<live-codes> – children reactivity via MutationObserver', () => {
  test('changing child content calls setConfig', async () => {
    const el = document.createElement('live-codes') as any;
    el.innerHTML = `
      <template>
        <style lang="css">h1 { color: blue; }</style>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    mockSetConfig.mockClear();

    // Mutate the content inside the wrapper template
    const wrapper = el.querySelector(':scope > template') as HTMLTemplateElement;
    const style = wrapper.content.querySelector('style')!;
    style.textContent = 'h1 { color: red; }';

    // MutationObserver fires asynchronously
    await flushMicrotasks();

    expect(mockSetConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        style: { language: 'css', content: 'h1 { color: red; }' },
      }),
    );
  });

  test('observer is disconnected when element is removed', async () => {
    const el = document.createElement('live-codes') as any;
    el.innerHTML = `
      <template>
        <style lang="css">h1 { color: blue; }</style>
      </template>
    `;
    document.body.appendChild(el);
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    mockSetConfig.mockClear();

    el.remove();
    await flushMicrotasks();

    // Should not crash or call setConfig after disconnection
    expect(mockSetConfig).not.toHaveBeenCalled();
  });
});
