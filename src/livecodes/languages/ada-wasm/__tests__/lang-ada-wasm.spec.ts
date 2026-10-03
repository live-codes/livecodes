import type { CompileOptions, Compiler, Config } from '../../../models';
import { adaWasm } from '../lang-ada-wasm';

describe('ada-wasm', () => {
  const compiler = adaWasm.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(adaWasm.name).toBe('ada-wasm');
    expect(adaWasm.title).toBe('Ada (Wasm)');
    expect(adaWasm.extensions).toEqual(
      expect.arrayContaining(['ada', 'adb', 'ads', 'hac', 'wasm.ada']),
    );
  });

  test('uses the script editor with the ada-wasm script type', () => {
    expect(adaWasm.editor).toBe('script');
    expect(compiler.scriptType).toBe('text/ada-wasm');
    expect(compiler.compiledCodeLanguage).toBe('ada-wasm');
  });

  test('loads only the runner script on the page (the runtime lives in a worker)', () => {
    const scripts =
      typeof compiler.scripts === 'function'
        ? compiler.scripts({ baseUrl: 'base/', config: {} as Config, compiled: '' })
        : compiler.scripts;
    expect(scripts).toEqual(['base/{{hash:lang-ada-wasm-script.js}}']);
  });

  test('compiler factory is the identity (compilation happens in the runner)', async () => {
    const fn = await compiler.factory({} as Config, '');
    const code = 'procedure H is begin null; end H;';
    expect(await fn(code, {} as CompileOptions as any)).toBe(code);
  });
});
