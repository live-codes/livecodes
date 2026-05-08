import type { Playground } from '../models';
import { createUsePlayground } from '../use-playground';

// ---------------------------------------------------------------------------
// Mock createPlayground – we test the hook logic, not the core SDK
// ---------------------------------------------------------------------------

const mockDestroy = jest.fn(() => Promise.resolve());
const mockSetConfig = jest.fn(() => Promise.resolve());
const mockSdk: Playground = {
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

let createPlaygroundMock: jest.Mock;

jest.mock('../index', () => ({
  createPlayground: (...args: any[]) => createPlaygroundMock(...args),
}));

beforeEach(() => {
  createPlaygroundMock = jest.fn().mockResolvedValue(mockSdk);
  mockDestroy.mockClear();
  mockSetConfig.mockClear();
  (Object.values(mockSdk) as jest.Mock[]).forEach((fn) => {
    if (typeof fn.mockClear === 'function') fn.mockClear();
  });
});

// ---------------------------------------------------------------------------
// Fake hooks – simulate React-like useEffect / useRef without React
// ---------------------------------------------------------------------------

type EffectFn = () => void | (() => void);
interface EffectEntry {
  effect: EffectFn;
  deps: unknown[] | undefined;
  cleanup?: () => void;
}

function createFakeHooks() {
  const refs = new Map<number, { current: any }>();
  let refCounter = 0;

  const effects: EffectEntry[] = [];

  function useRef<T>(initial: T) {
    const id = refCounter++;
    if (!refs.has(id)) {
      refs.set(id, { current: initial });
    }
    return refs.get(id)!;
  }

  function useEffect(effect: EffectFn, deps?: unknown[]) {
    effects.push({ effect, deps });
  }

  /** Run all pending effects (simulates a React render commit). */
  function flushEffects() {
    const pending = effects.splice(0);
    for (const entry of pending) {
      entry.cleanup = entry.effect() as (() => void) | undefined;
    }
    return pending;
  }

  /** Run cleanup functions of all flushed effects (simulates unmount). */
  function runCleanups(entries: EffectEntry[]) {
    for (const entry of entries) {
      entry.cleanup?.();
    }
  }

  /** Reset ref counter so the next render call re-uses the same refs. */
  function resetRefCounter() {
    refCounter = 0;
  }

  return { useRef, useEffect, flushEffects, runCleanups, resetRefCounter, refs };
}

function flushMicrotasks() {
  return new Promise<void>((r) => setTimeout(r, 50));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('createUsePlayground', () => {
  test('returns a usePlayground hook function', () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);
    expect(typeof usePlayground).toBe('function');
  });
});

describe('usePlayground – basic behavior', () => {
  test('returns containerRef, className, style, and height', () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const handle = usePlayground({
      className: 'my-class',
      style: { color: 'red' },
      height: '400',
    });

    expect(handle.containerRef).toHaveProperty('current');
    expect(handle.className).toBe('my-class');
    expect(handle.style).toEqual({ color: 'red' });
    expect(handle.height).toBe('400px');
  });

  test('height with non-numeric value is passed through as-is', () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const handle = usePlayground({ height: '50vh' });
    expect(handle.height).toBe('50vh');
  });

  test('undefined height remains undefined', () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const handle = usePlayground({});
    expect(handle.height).toBeUndefined();
  });

  test('defaults className to empty string and style to empty object', () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const handle = usePlayground({});
    expect(handle.className).toBe('');
    expect(handle.style).toEqual({});
  });
});

describe('usePlayground – playground creation', () => {
  test('calls createPlayground when effect runs with a container', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');
    const handle = usePlayground({ template: 'react' });
    handle.containerRef.current = container;

    hooks.flushEffects();
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    expect(createPlaygroundMock).toHaveBeenCalledWith(container, { template: 'react' });
  });

  test('does not call createPlayground when containerRef is null', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    usePlayground({});
    // containerRef.current is null by default

    hooks.flushEffects();
    await flushMicrotasks();

    expect(createPlaygroundMock).not.toHaveBeenCalled();
  });

  test('calls sdkReady callback after playground is created', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const sdkReady = jest.fn();
    const container = document.createElement('div');
    const handle = usePlayground({ sdkReady });
    handle.containerRef.current = container;

    hooks.flushEffects();
    await flushMicrotasks();

    expect(sdkReady).toHaveBeenCalledTimes(1);
    expect(sdkReady).toHaveBeenCalledWith(mockSdk);
  });

  test('strips className, style, height, sdkReady from options passed to createPlayground', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');
    const handle = usePlayground({
      className: 'my-class',
      style: { color: 'red' },
      height: '400',
      sdkReady: jest.fn(),
      template: 'react',
      loading: 'eager',
    });
    handle.containerRef.current = container;

    hooks.flushEffects();
    await flushMicrotasks();

    const callArgs = createPlaygroundMock.mock.calls[0];
    expect(callArgs[1]).toEqual({ template: 'react', loading: 'eager' });
    expect(callArgs[1]).not.toHaveProperty('className');
    expect(callArgs[1]).not.toHaveProperty('style');
    expect(callArgs[1]).not.toHaveProperty('height');
    expect(callArgs[1]).not.toHaveProperty('sdkReady');
  });
});

describe('usePlayground – config changes', () => {
  test('config-only change calls setConfig instead of recreating', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');

    // First render – creates playground
    const handle = usePlayground({ config: { title: 'v1' } });
    handle.containerRef.current = container;
    hooks.flushEffects();
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    // Second render – config change only
    hooks.resetRefCounter();
    usePlayground({ config: { title: 'v2' } });
    hooks.flushEffects();
    await flushMicrotasks();

    // Should NOT recreate, should call setConfig
    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);
    expect(mockSetConfig).toHaveBeenCalledWith({ title: 'v2' });
  });

  test('same config does not trigger setConfig', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');
    const config = { title: 'same' };

    // First render
    const handle = usePlayground({ config });
    handle.containerRef.current = container;
    hooks.flushEffects();
    await flushMicrotasks();

    // Second render – same config
    hooks.resetRefCounter();
    usePlayground({ config: { title: 'same' } });
    hooks.flushEffects();
    await flushMicrotasks();

    expect(mockSetConfig).not.toHaveBeenCalled();
  });

  test('otherOptions change destroys and recreates playground', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');

    // First render
    const handle = usePlayground({ template: 'react' });
    handle.containerRef.current = container;
    hooks.flushEffects();
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    // Second render – different template
    hooks.resetRefCounter();
    usePlayground({ template: 'vue' });
    hooks.flushEffects();
    await flushMicrotasks();

    expect(mockDestroy).toHaveBeenCalled();
    expect(createPlaygroundMock).toHaveBeenCalledTimes(2);
  });

  test('config as URL string calls setConfig', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');

    // First render – creates playground with no config
    const handle = usePlayground({});
    handle.containerRef.current = container;
    hooks.flushEffects();
    await flushMicrotasks();

    hooks.resetRefCounter();
    usePlayground({ config: 'https://example.com/config.json' });
    hooks.flushEffects();
    await flushMicrotasks();

    expect(mockSetConfig).toHaveBeenCalledWith('https://example.com/config.json');
  });
});

describe('usePlayground – unmount cleanup', () => {
  test('cleanup effect destroys the playground', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    const container = document.createElement('div');
    const handle = usePlayground({});
    handle.containerRef.current = container;

    const flushed = hooks.flushEffects();
    await flushMicrotasks();

    expect(createPlaygroundMock).toHaveBeenCalledTimes(1);

    // Simulate unmount
    hooks.runCleanups(flushed);

    expect(mockDestroy).toHaveBeenCalled();
  });

  test('stale playground creation is destroyed after unmount', async () => {
    const hooks = createFakeHooks();
    const usePlayground = createUsePlayground(hooks);

    // Make createPlayground resolve later
    let resolvePlayground: (sdk: Playground) => void;
    createPlaygroundMock.mockReturnValue(
      new Promise<Playground>((resolve) => {
        resolvePlayground = resolve;
      }),
    );

    const container = document.createElement('div');
    const handle = usePlayground({});
    handle.containerRef.current = container;

    const flushed = hooks.flushEffects();

    // Unmount before playground resolves
    hooks.runCleanups(flushed);

    // Now resolve the playground
    resolvePlayground!(mockSdk);
    await flushMicrotasks();

    // The SDK should be destroyed because it was stale
    expect(mockDestroy).toHaveBeenCalled();
  });
});
