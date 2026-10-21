import { javaWasm } from '../lang-java-wasm';

describe('Java (Wasm) language spec', () => {
  test('is registered as java-wasm, with the wasm runner script', () => {
    expect(javaWasm.name).toBe('java-wasm');
    expect(javaWasm.title).toBe('Java (Wasm)');
    expect(javaWasm.compiler).toMatchObject({
      scriptType: 'text/java-wasm',
      compiledCodeLanguage: 'java-wasm',
      liveReload: true,
    });
  });

  test('accepts the java extensions', () => {
    expect(javaWasm.extensions).toEqual(expect.arrayContaining(['java', 'java-wasm']));
  });

  test('passes the code through unchanged', async () => {
    const compiler = javaWasm.compiler as unknown as {
      factory: () => (code: string) => Promise<string>;
    };
    const compile = compiler.factory();
    await expect(compile('class Main {}')).resolves.toBe('class Main {}');
  });

  test('loads the runtime and the build script', () => {
    const compiler = javaWasm.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    const scripts = compiler.scripts({ baseUrl: '/' });
    expect(scripts).toHaveLength(2);
    expect(scripts[1]).toBe('/{{hash:lang-java-wasm-script.js}}');
  });

  test('warns that the first run is a large download', () => {
    expect(javaWasm.largeDownload).toBe(true);
  });

  test('highlights with the Java grammars', () => {
    expect(javaWasm.editorLanguage).toBe('java');
    expect(javaWasm.editorSupport?.monaco).toMatchObject({ language: 'java' });
    expect(javaWasm.editorSupport?.codemirror).toMatchObject({
      languageSupport: expect.any(Function),
    });
    expect(javaWasm.editorSupport?.codejar).toEqual({ language: 'java' });
  });
});
