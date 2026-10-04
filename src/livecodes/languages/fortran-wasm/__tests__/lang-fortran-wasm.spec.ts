import { fortranWasm } from '../lang-fortran-wasm';

describe('Fortran (Wasm) language spec', () => {
  it('is registered as fortran, with the wasm compiler script', () => {
    expect(fortranWasm.name).toBe('fortran');
    expect(fortranWasm.title).toBe('Fortran');
    expect(fortranWasm.compiler).toMatchObject({
      scriptType: 'text/fortran-wasm',
      compiledCodeLanguage: 'fortran',
      liveReload: true,
    });
  });

  it('accepts the common Fortran extensions', () => {
    expect(fortranWasm.extensions).toEqual(
      expect.arrayContaining(['fortran', 'f90', 'f95', 'f03', 'f08', 'f', 'for', 'ftn']),
    );
  });

  it('warns that the first run is a large download', () => {
    // The compiler is ~19 MB compressed; the app shows a loading indicator for it.
    expect(fortranWasm.largeDownload).toBe(true);
  });

  it('uses the Fortran editors', () => {
    expect(fortranWasm.editor).toBe('script');
    expect(fortranWasm.editorSupport?.monaco?.language).toBe('fortran');
    expect(fortranWasm.editorSupport?.codejar?.language).toBe('fortran');
  });
});
