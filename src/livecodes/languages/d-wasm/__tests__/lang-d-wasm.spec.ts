import { dWasm } from '../lang-d-wasm';

describe('D (Wasm) language spec', () => {
  test('is registered as d-wasm, with the wasm compiler script', () => {
    expect(dWasm.name).toBe('d-wasm');
    expect(dWasm.title).toBe('D (Wasm)');
    expect(dWasm.compiler).toMatchObject({
      scriptType: 'text/d-wasm',
      compiledCodeLanguage: 'd-wasm',
      liveReload: true,
    });
  });

  test('accepts the common D extensions', () => {
    expect(dWasm.extensions).toEqual(expect.arrayContaining(['d', 'di', 'dlang', 'dmd']));
  });

  test('warns that the first run is a large download', () => {
    // The DMD runtime is ~5.5 MB compressed (25 MB inflated); the app shows a loading indicator.
    expect(dWasm.largeDownload).toBe(true);
  });

  test('uses the C++ editor, since Monaco has no D language', () => {
    expect(dWasm.editor).toBe('script');
    expect(dWasm.editorSupport?.monaco?.language).toBe('cpp');
    expect(dWasm.editorSupport?.codejar?.language).toBe('d');
  });
});
