import { cobolWasm } from '../lang-cobol-wasm';

describe('COBOL (Wasm) language spec', () => {
  it('is registered as cobol-wasm, with the wasm compiler script', () => {
    expect(cobolWasm.name).toBe('cobol-wasm');
    expect(cobolWasm.title).toBe('COBOL (Wasm)');
    expect(cobolWasm.compiler).toMatchObject({
      scriptType: 'text/cobol-wasm',
      compiledCodeLanguage: 'cobol',
      liveReload: true,
    });
  });

  it('accepts the common COBOL extensions', () => {
    expect(cobolWasm.extensions).toEqual(
      expect.arrayContaining(['cobol', 'cob', 'cbl', 'cpy', 'gnucobol']),
    );
  });

  it('warns that the first run is a large download', () => {
    // The GnuCOBOL + Clang toolchain is ~25 MB; the app shows a loading indicator for it.
    expect(cobolWasm.largeDownload).toBe(true);
  });

  it('uses the COBOL editors', () => {
    expect(cobolWasm.editor).toBe('script');
    expect(cobolWasm.editorSupport?.monaco?.language).toBe('cobol');
    expect(cobolWasm.editorSupport?.codejar?.language).toBe('cobol');
  });
});
