import { janetWasm } from '../lang-janet-wasm';

describe('Janet (Wasm) language spec', () => {
  test('is registered as janet-wasm, with the wasm runner script', () => {
    expect(janetWasm.name).toBe('janet-wasm');
    expect(janetWasm.title).toBe('Janet (Wasm)');
    expect(janetWasm.compiler).toMatchObject({
      scriptType: 'text/janet-wasm',
      compiledCodeLanguage: 'janet-wasm',
      liveReload: true,
    });
  });

  test('accepts the Janet extensions', () => {
    expect(janetWasm.extensions).toEqual(expect.arrayContaining(['janet', 'wasm.janet']));
  });

  test('uses the script editor', () => {
    expect(janetWasm.editor).toBe('script');
  });
});
