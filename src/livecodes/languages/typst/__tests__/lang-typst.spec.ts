import type { CompileOptions, Compiler, Config } from '../../../models';
import { typst } from '../lang-typst';

describe('typst', () => {
  const compiler = typst.compiler as Compiler;

  test('has the expected name, title and extensions', () => {
    expect(typst.name).toBe('typst');
    expect(typst.title).toBe('Typst');
    expect(typst.extensions).toEqual(expect.arrayContaining(['typ']));
  });

  test('uses the script editor with the typst script type', () => {
    expect(typst.editor).toBe('script');
    expect(typst.editorLanguage).toBe('markdown');
    expect(compiler.scriptType).toBe('text/typst');
    expect(compiler.compiledCodeLanguage).toBe('typst');
    expect(compiler.liveReload).toBe(true);
    expect(typst.largeDownload).toBe(true);
  });

  test('loads only the ESM runner on the page, with an identity compiler factory', async () => {
    const scripts =
      typeof compiler.scripts === 'function'
        ? compiler.scripts({ baseUrl: 'base/', config: {} as Config, compiled: '' })
        : compiler.scripts;
    expect(scripts).toEqual(['base/{{hash:lang-typst-script-esm.js}}']);

    const fn = await compiler.factory({} as Config, '');
    const code = '= Hello\n\nThis is *Typst*!';
    expect(await fn(code, {} as CompileOptions as any)).toBe(code);
  });
});
