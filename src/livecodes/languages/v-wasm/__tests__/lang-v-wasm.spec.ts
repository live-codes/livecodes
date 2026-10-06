import { vWasm } from '../lang-v-wasm';

describe('V (Wasm) language spec', () => {
  test('is registered as v-wasm, with the wasm compiler script', () => {
    expect(vWasm.name).toBe('v-wasm');
    expect(vWasm.title).toBe('V (Wasm)');
    expect(vWasm.compiler).toMatchObject({
      scriptType: 'text/v-wasm',
      compiledCodeLanguage: 'v',
      liveReload: true,
    });
  });

  test('accepts the common V extensions', () => {
    expect(vWasm.extensions).toEqual(
      expect.arrayContaining(['v', 'vlang', 'v-wasm', 'wasm.v', 'vsh']),
    );
  });

  test('warns that the first run is a large download', () => {
    // The V compiler and the Clang toolchain together are tens of megabytes.
    expect(vWasm.largeDownload).toBe(true);
  });

  test('uses a code editor with V support', () => {
    expect(vWasm.editor).toBe('script');
    // There is no dedicated V mode, so the Go mode stands in for the editors that lack one.
    expect(vWasm.editorSupport?.monaco?.language).toBe('go');
    // Prism does ship a V grammar, so CodeJar uses the real one.
    expect(vWasm.editorSupport?.codejar?.language).toBe('v');
  });
});
