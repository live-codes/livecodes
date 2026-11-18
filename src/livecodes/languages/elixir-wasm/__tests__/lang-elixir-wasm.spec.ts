import { readFileSync } from 'fs';
import { resolve } from 'path';
import { elixirWasm } from '../lang-elixir-wasm';

const readSource = (file: string) =>
  readFileSync(resolve(__dirname, '..', '..', 'beam-wasm', file), 'utf8');
const readLanguageSource = (file: string) => readFileSync(resolve(__dirname, '..', file), 'utf8');

describe('Elixir (Wasm) language spec', () => {
  test('is registered as elixir-wasm, with the wasm compiler script', () => {
    expect(elixirWasm.name).toBe('elixir-wasm');
    expect(elixirWasm.title).toBe('Elixir (Wasm)');
    expect(elixirWasm.compiler).toMatchObject({
      scriptType: 'text/elixir-wasm',
      compiledCodeLanguage: 'elixir',
      liveReload: true,
    });
  });

  test('accepts the common Elixir extensions', () => {
    expect(elixirWasm.extensions).toEqual(
      expect.arrayContaining(['ex', 'exs', 'elixir', 'elixir-wasm', 'wasm.ex']),
    );
  });

  test('warns that the first run is a large download', () => {
    expect(elixirWasm.largeDownload).toBe(true);
  });

  test('uses a code editor with Elixir support', () => {
    expect(elixirWasm.editor).toBe('script');
    expect(elixirWasm.editorSupport?.monaco?.language).toBe('elixir');
    expect(elixirWasm.editorSupport?.codejar?.language).toBe('elixir');
  });
});

describe('Elixir (Wasm) bridge', () => {
  const bridge = readSource('runtime.ts');
  const worker = readSource('lang-beam-wasm-worker.raw.js');
  const script = readLanguageSource('lang-elixir-wasm-script.ts');

  test('keeps the VM in a module worker instead of an iframe', () => {
    expect(bridge).toContain("new Worker(url, { type: 'module' })");
    expect(bridge).toContain('worker.terminate()');
    expect(bridge).not.toContain("createElement('iframe')");
  });

  test('uses tagged results for values, errors, and exits', () => {
    expect(bridge).toContain("OK_TAG = '__LC_OK__'");
    expect(bridge).toContain("ERROR_TAG = '__LC_ERROR__'");
    expect(bridge).toContain("EXIT_TAG = '__LC_EXIT__'");
    expect(script).toContain('Base.encode64');
  });

  test('bounds calls and supersedes a blocked run', () => {
    expect(bridge).toContain('EVAL_TIMEOUT_MS = 60_000');
    expect(bridge).toContain('SUPERSEDE_TIMEOUT_MS = 10_000');
    expect(bridge).toContain("mark('run-supersede-timeout'");
    expect(bridge).toContain('const latest = isLatest()');
  });

  test('boots AtomVM in a worker with the required interop shim', () => {
    expect(worker).toContain("INIT: 'popcorn-init'");
    expect(worker).toContain("CALL: 'popcorn-call'");
    expect(worker).toContain('globalThis.window = globalThis');
    expect(worker).toContain('noInitialRun: true');
    expect(worker).toContain("Module.callMain(['/data/bundle.avm'])");
    expect(worker).toContain('Module.onElixirReady');
    expect(worker).toContain('self.postMessage');
    expect(worker).not.toContain('window.parent.postMessage');
  });
});
