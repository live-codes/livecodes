import { kotlin } from '../lang-kotlin';

const compiler = kotlin.compiler as any;

const wasmConfig = { customSettings: { kotlin: { target: 'wasm' } } } as any;
const jsConfig = { customSettings: {} } as any;
const jsExplicit = { customSettings: { kotlin: { target: 'js' } } } as any;

const evaluate = (value: unknown, config: any) =>
  typeof value === 'function' ? (value as any)({ config, baseUrl: 'BASE/' }) : value;

describe('Kotlin language spec', () => {
  test('is registered as kotlin, with the compile worker script', () => {
    expect(kotlin.name).toBe('kotlin');
    expect(kotlin.title).toBe('Kotlin');
    expect(typeof compiler).toBe('object');
  });

  test('defaults to the js target: no wasm script type, no runtime script', () => {
    // Existing projects do not set a target, so they must keep compiling to JS.
    expect(evaluate(compiler.scriptType, jsConfig)).toBeUndefined();
    expect(evaluate(compiler.compiledCodeLanguage, jsConfig)).toBeUndefined();
    expect(evaluate(compiler.scripts, jsConfig)).toEqual([]);
  });

  test('target: js behaves the same as the default', () => {
    expect(evaluate(compiler.scriptType, jsExplicit)).toBeUndefined();
    expect(evaluate(compiler.scripts, jsExplicit)).toEqual([]);
  });

  test('target: wasm declares the typed script and its result-page runtime', () => {
    expect(evaluate(compiler.scriptType, wasmConfig)).toBe('text/kotlin-wasm');
    expect(evaluate(compiler.scripts, wasmConfig)).toHaveLength(1);
  });

  test('the wasm runtime script is a separate build entry', () => {
    // `{{hash:...}}` is rewritten at build time, so the name must match build.js.
    expect(evaluate(compiler.scripts, wasmConfig)[0]).toContain('lang-kotlin-wasm-script.js');
  });

  test('the compiled tab shows the emitted files as JSON for wasm', () => {
    expect(evaluate(compiler.compiledCodeLanguage, wasmConfig)).toBe('json');
  });

  test('does not use live reload', () => {
    // The live-reload path posts the result into the existing iframe and resolves
    // without any loading->false message, so the tools-pane spinner never hides.
    // Every run therefore replaces the result page.
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
