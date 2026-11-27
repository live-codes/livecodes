/**
 * The result-page runtime for the wasm target.
 *
 * This file runs in the result page, so it is exercised here with a jsdom-like
 * global: the parts worth testing are the ones that were easy to get wrong — that
 * capturing output does not recurse through LiveCodes' console Proxy, that output
 * still reaches the console, and that a failed run reports an error.
 */

interface Counter {
  captured: string[];
  forwarded: string[];
}

const loadRuntime = async (): Promise<{ counter: Counter; api: any }> => {
  // LiveCodes installs a Proxy over the native console; reproduce that shape so a
  // capture wrapper that assigns to console methods would recurse here too.
  const captured: string[] = [];
  const forwarded: string[] = [];
  const native = {
    log: (...args: unknown[]) => captured.push(args.map(String).join(' ')),
    info: (...args: unknown[]) => captured.push(args.map(String).join(' ')),
    debug: (...args: unknown[]) => captured.push(args.map(String).join(' ')),
    warn: () => undefined,
    error: () => undefined,
  } as unknown as Console;

  const proxied = new Proxy(native, {
    get(target, method) {
      return (...args: unknown[]) => {
        forwarded.push(String(method) + ': ' + args.map(String).join(' '));
        return (target as any)[method](...args);
      };
    },
  });

  (globalThis as any).window ??= globalThis;
  (globalThis as any).window.console = proxied;
  (globalThis as any).window.livecodes = {};
  (globalThis as any).window.addEventListener ??= () => undefined;
  (globalThis as any).window.parent = { postMessage: () => undefined };

  await import('../lang-kotlin-wasm-script');
  return { counter: { captured, forwarded }, api: (globalThis as any).window.livecodes.kotlin };
};

describe('kotlin wasm result-page runtime', () => {
  afterEach(() => {
    jest.resetModules();
    const w = (globalThis as any).window;
    if (w) {
      delete w.livecodes;
      delete w.console;
    }
  });

  test('exposes run and an input property, like the other wasm languages', async () => {
    const { api } = await loadRuntime();
    expect(typeof api.run).toBe('function');
    expect('input' in api).toBe(true);
  });

  test('an empty program returns output null rather than throwing', async () => {
    const { api } = await loadRuntime();
    // No payload script in the document, which is what an empty program compiles to.
    await expect(api.run('')).resolves.toEqual({ output: null, error: null, exitCode: 0 });
  });

  test('run reports an error and a non-zero exit code when the program fails', async () => {
    const { api } = await loadRuntime();
    // A payload with a missing file: rebuilding it must fail rather than run.
    const script = document.createElement('script');
    script.type = 'text/kotlin-wasm';
    script.textContent = JSON.stringify([{ name: 'main.mjs', content: '', encoding: 'utf8' }]);
    document.body.appendChild(script);

    const result = await api.run('');
    expect(result.error).toMatch(/incomplete/);
    expect(result.exitCode).toBe(1);
    script.remove();
  });

  test('joins print with the next println and forwards the line to the console', async () => {
    const { counter, api } = await loadRuntime();
    const script = document.createElement('script');
    script.type = 'text/kotlin-wasm';
    script.textContent = JSON.stringify([
      { name: 'main.mjs', content: 'export const _start = 1;', encoding: 'utf8' },
      { name: 'main.import-object.mjs', content: 'export const x = 1;', encoding: 'utf8' },
      { name: 'main.js-builtins.mjs', content: 'export const y = 1;', encoding: 'utf8' },
      { name: 'main.wasm', content: '', encoding: 'base64' },
    ]);
    document.body.appendChild(script);

    // A Blob-URL operation emitting output and then failing exercises capture
    // without running a real Wasm program.
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    let emitted = false;
    URL.createObjectURL = () => {
      if (!emitted) {
        emitted = true;
        const w = (globalThis as any).window;
        w.write('a');
        w.write('b');
        w.console.log('c');
      }
      return 'blob:stub';
    };
    URL.revokeObjectURL = () => undefined;

    try {
      const result = await api.run('');
      // `print` does not end the line; the following `println` does.
      expect(result.output).toBe('abc');
      expect(counter.captured).toContain('abc');
      expect(counter.forwarded).toContain('log: abc');
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
      script.remove();
    }
  });
});
