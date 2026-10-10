import { crystalWasm } from '../lang-crystal-wasm';

describe('Crystal (Wasm) language spec', () => {
  test('is registered as crystal-wasm, with the wasm compiler script', () => {
    expect(crystalWasm.name).toBe('crystal-wasm');
    expect(crystalWasm.title).toBe('Crystal (Wasm)');
    expect(crystalWasm.compiler).toMatchObject({
      scriptType: 'text/crystal-wasm',
      compiledCodeLanguage: 'crystal-wasm',
      liveReload: true,
    });
  });

  test('accepts the Crystal extensions', () => {
    expect(crystalWasm.extensions).toEqual(expect.arrayContaining(['cr', 'crystal']));
  });

  test('warns that the first run is a large download', () => {
    // The compiler, the linker and the sysroot are ~22 MB compressed (68 MB inflated); the app
    // shows a loading indicator while they arrive.
    expect(crystalWasm.largeDownload).toBe(true);
  });

  test('loads the compiler script the build produces', () => {
    const compiler = crystalWasm.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    expect(compiler.scripts({ baseUrl: '/' })).toEqual(['/{{hash:lang-crystal-wasm-script.js}}']);
  });

  test('highlights with the Prism Crystal grammar', () => {
    expect(crystalWasm.editorSupport?.codejar).toEqual({ language: 'crystal' });
  });
});
