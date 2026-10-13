import { odinWasm } from '../lang-odin-wasm';

describe('Odin (Wasm) language spec', () => {
  test('is registered as odin-wasm, with the wasm compiler script', () => {
    expect(odinWasm.name).toBe('odin-wasm');
    expect(odinWasm.title).toBe('Odin (Wasm)');
    expect(odinWasm.compiler).toMatchObject({
      scriptType: 'text/odin-wasm',
      compiledCodeLanguage: 'odin-wasm',
      liveReload: true,
    });
  });

  test('accepts the Odin extension', () => {
    expect(odinWasm.extensions).toEqual(expect.arrayContaining(['odin']));
  });

  test('warns that the first run is a large download', () => {
    // The compiler and the standard library are ~6 MB compressed; the app shows a loading
    // indicator while they arrive.
    expect(odinWasm.largeDownload).toBe(true);
  });

  test('loads the compiler script the build produces', () => {
    const compiler = odinWasm.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    expect(compiler.scripts({ baseUrl: '/' })).toEqual(['/{{hash:lang-odin-wasm-script.js}}']);
  });

  test('highlights with the Odin grammars', () => {
    expect(odinWasm.editorSupport?.monaco).toMatchObject({ language: 'odin' });
    expect(odinWasm.editorSupport?.codemirror).toMatchObject({
      languageSupport: expect.any(Function),
    });
    expect(odinWasm.editorSupport?.codejar).toEqual({ language: 'odin' });
  });
});
