import { javaDoppio } from '../lang-java-doppio';

describe('Java (Doppio) language spec', () => {
  test('is registered as java-doppio, with the Doppio runner script', () => {
    expect(javaDoppio.name).toBe('java-doppio');
    expect(javaDoppio.title).toBe('Java (Doppio)');
    expect(javaDoppio.compiler).toMatchObject({
      scriptType: 'text/java',
      compiledCodeLanguage: 'java',
      liveReload: true,
    });
  });

  test('accepts the Doppio extensions', () => {
    expect(javaDoppio.extensions).toEqual(
      expect.arrayContaining(['java-doppio', 'java8', 'doppio']),
    );
  });

  test('passes the code through unchanged', async () => {
    const compiler = javaDoppio.compiler as unknown as {
      factory: () => (code: string) => Promise<string>;
    };
    const compile = compiler.factory();
    await expect(compile('class Main {}')).resolves.toBe('class Main {}');
  });

  test('loads the Doppio build script', () => {
    const compiler = javaDoppio.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    expect(compiler.scripts({ baseUrl: '/' })).toEqual(['/{{hash:lang-java-doppio-script.js}}']);
  });

  test('highlights with the Java grammars', () => {
    expect(javaDoppio.editorSupport?.monaco).toMatchObject({ language: 'java' });
    expect(javaDoppio.editorSupport?.codemirror).toMatchObject({
      languageSupport: expect.any(Function),
    });
    expect(javaDoppio.editorSupport?.codejar).toEqual({ language: 'java' });
  });
});
