import { io } from '../lang-io';

describe('Io language spec', () => {
  test('is registered as io, with the wasm runner script', () => {
    expect(io.name).toBe('io');
    expect(io.title).toBe('Io');
    expect(io.compiler).toMatchObject({
      scriptType: 'text/io',
      compiledCodeLanguage: 'io',
    });
  });

  test('accepts the Io extensions', () => {
    expect(io.extensions).toEqual(expect.arrayContaining(['io', 'iolang']));
  });

  test('uses the script editor', () => {
    expect(io.editor).toBe('script');
  });

  test('is marked as a large download', () => {
    expect(io.largeDownload).toBe(true);
  });
});
