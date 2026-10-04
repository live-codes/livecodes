import type { CompileOptions, Compiler, Config } from '../../../models';
import { blazorWasm } from '../lang-blazor-wasm';

describe('blazor-wasm', () => {
  const compiler = blazorWasm.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(blazorWasm.name).toBe('blazor-wasm');
    expect(blazorWasm.title).toBe('Blazor (Wasm)');
    expect(blazorWasm.extensions).toEqual(
      expect.arrayContaining(['razor', 'blazor', 'razor-wasm', 'wasm.razor']),
    );
  });

  test('uses the script editor with the text/razor script type', () => {
    expect(blazorWasm.editor).toBe('script');
    expect(compiler.scriptType).toBe('text/razor');
    expect(compiler.compiledCodeLanguage).toBe('blazor-wasm');
  });

  test('loads only the runner script on the page (compilation happens in the result page)', () => {
    const scripts =
      typeof compiler.scripts === 'function'
        ? compiler.scripts({ baseUrl: 'base/', config: {} as Config, compiled: '' })
        : compiler.scripts;
    expect(scripts).toEqual(['base/{{hash:lang-blazor-wasm-script.js}}']);
  });

  test('compiler factory is the identity (Razor compiles in the result page)', async () => {
    const fn = await compiler.factory({} as Config, '');
    const code = '<h1>Hello, @name!</h1>';
    expect(await fn(code, {} as CompileOptions as any)).toBe(code);
  });

  test('advertises editor support for Razor', () => {
    expect(blazorWasm.editorSupport?.monaco?.language).toBe('razor');
    expect(blazorWasm.editorSupport?.monaco?.languageSupport).toMatch(/razor\.js$/);
    expect(blazorWasm.editorSupport?.codejar?.language).toBe('razor');
  });
});
