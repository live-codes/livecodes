import { kotlin } from '../lang-kotlin';

const compiler = kotlin.compiler as any;

describe('Kotlin language spec', () => {
  test('is registered as kotlin, with the compile worker script', () => {
    expect(kotlin.name).toBe('kotlin');
    expect(kotlin.title).toBe('Kotlin');
    expect(typeof compiler).toBe('object');
  });

  test('compiles to JavaScript, so it declares no wasm script type', () => {
    // Kotlin/JS output is a plain script; the result page runs it directly.
    expect(compiler.scriptType).toBeUndefined();
    expect(compiler.compiledCodeLanguage).toBeUndefined();
    expect(compiler.scripts).toBeUndefined();
    expect(compiler.liveReload).toBeUndefined();
  });

  test('loads the compiler script in the compile worker', () => {
    // The factory runs inside the compiler worker, where importScripts exists.
    expect(typeof compiler.factory).toBe('function');
  });

  test('accepts the Kotlin extensions', () => {
    expect(kotlin.extensions).toEqual(expect.arrayContaining(['kt', 'kts', 'kotlin']));
  });

  test('warns that the first run is a large download', () => {
    // The K2 compiler image is ~32 MB gzipped.
    expect(kotlin.largeDownload).toBe(true);
  });

  test('provides Kotlin editor support in all editors', () => {
    expect(kotlin.editor).toBe('script');
    expect(kotlin.editorSupport?.monaco?.language).toBe('kotlin');
    expect(kotlin.editorSupport?.codejar?.language).toBe('kotlin');
    expect(kotlin.editorSupport?.codemirror?.languageSupport).toBeInstanceOf(Function);
  });
});
