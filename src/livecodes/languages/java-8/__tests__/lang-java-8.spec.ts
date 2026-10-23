import { java8 } from '../lang-java-8';

describe('Java 8 language spec', () => {
  test('is registered as java-8, with the Java 8 runner script', () => {
    expect(java8.name).toBe('java-8');
    expect(java8.title).toBe('Java 8');
    expect(java8.compiler).toMatchObject({
      scriptType: 'text/java',
      compiledCodeLanguage: 'java',
      liveReload: true,
    });
  });

  test('accepts the Java 8 extensions', () => {
    expect(java8.extensions).toEqual(expect.arrayContaining(['java-8', 'java8']));
  });

  test('passes the code through unchanged', async () => {
    const compiler = java8.compiler as unknown as {
      factory: () => (code: string) => Promise<string>;
    };
    const compile = compiler.factory();
    await expect(compile('class Main {}')).resolves.toBe('class Main {}');
  });

  test('loads the Java 8 runner script', () => {
    const compiler = java8.compiler as unknown as {
      scripts: (options: { baseUrl: string }) => string[];
    };
    expect(compiler.scripts({ baseUrl: '/' })).toEqual(['/{{hash:lang-java-8-script.js}}']);
  });

  test('highlights with the Java grammars', () => {
    expect(java8.editorSupport?.monaco).toMatchObject({ language: 'java' });
    expect(java8.editorSupport?.codemirror).toMatchObject({
      languageSupport: expect.any(Function),
    });
    expect(java8.editorSupport?.codejar).toEqual({ language: 'java' });
  });
});
