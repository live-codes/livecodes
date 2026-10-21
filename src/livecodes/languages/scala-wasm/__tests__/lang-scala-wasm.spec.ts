import { scalaWasm } from '../lang-scala-wasm';

describe('Scala (Wasm) language spec', () => {
  test('is registered as scala-wasm, with the wasm runner script', () => {
    expect(scalaWasm.name).toBe('scala-wasm');
    expect(scalaWasm.title).toBe('Scala (Wasm)');
    expect(scalaWasm.compiler).toMatchObject({
      scriptType: 'text/scala-wasm',
      compiledCodeLanguage: 'scala',
      liveReload: true,
    });
  });

  test('accepts the scala extensions', () => {
    expect(scalaWasm.extensions).toEqual(
      expect.arrayContaining(['scala', 'scala-wasm', 'wasm.scala']),
    );
  });

  test('passes the code through unchanged', async () => {
    const compiler = scalaWasm.compiler as unknown as {
      factory: () => (code: string) => Promise<string>;
    };
    const compile = compiler.factory();
    await expect(compile('@main def hello() = println("hi")')).resolves.toBe(
      '@main def hello() = println("hi")',
    );
  });

  test('loads the runtime and the build script', () => {
    const compiler = scalaWasm.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    const scripts = compiler.scripts({ baseUrl: '/' });
    expect(scripts).toHaveLength(2);
    expect(scripts[1]).toBe('/{{hash:lang-scala-wasm-script.js}}');
  });

  test('warns that the first run is a large download', () => {
    expect(scalaWasm.largeDownload).toBe(true);
  });

  test('highlights with the Scala grammars', () => {
    expect(scalaWasm.editorLanguage).toBe('scala');
    expect(scalaWasm.editorSupport?.monaco).toMatchObject({ language: 'scala' });
    expect(scalaWasm.editorSupport?.codemirror).toMatchObject({
      languageSupport: expect.any(Function),
    });
    expect(scalaWasm.editorSupport?.codejar).toEqual({ language: 'scala' });
  });
});
