import { compress, debounce, decodeHTML, decompress, encodeHTML, safeName, typeOf } from '../utils';

describe('utils', () => {
  test('debounce', async () => {
    let num = 0;
    const increment = debounce(() => (num += 1), 50);
    increment();
    increment();
    increment();
    increment();
    await new Promise((resolve) => {
      setTimeout(() => {
        expect(num).toBe(1);
        resolve('done');
      }, 70);
    });
  });

  test('encodeHTML', () => {
    const html = '<div class="bold">hello & world!</div>';
    const encoded = encodeHTML(html);
    expect(encoded).toBe('&lt;div class=&#34;bold&#34;&gt;hello &amp; world!&lt;/div&gt;');
  });

  test('decodeHTML', () => {
    const encoded = '&lt;div class=&#34;bold&#34;&gt;hello &amp; world!&lt;/div&gt;';
    const decoded = decodeHTML(encoded);
    expect(decoded).toBe('<div class="bold">hello & world!</div>');
  });

  test('safeName', () => {
    const unsafe = 'some unsafe/text?here"';
    const safe = safeName(unsafe);
    expect(safe).toBe('some_unsafe_text_here_');
  });

  test('typeOf', () => {
    expect(typeOf(window)).toBe('window');
    // expect(typeOf(document)).toBe('document');
    expect(typeOf(document.createElement('div'))).toBe('element');
    expect(typeOf(document.createTextNode('hi'))).toBe('node');
    expect(typeOf({})).toBe('object');
    expect(typeOf([])).toBe('array');
    expect(typeOf(() => undefined)).toBe('function');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(3)).toBe('number');
    expect(typeOf(NaN)).toBe('nan');
    expect(typeOf('hi')).toBe('string');
    expect(typeOf(true)).toBe('boolean');
  });

  test('compress/decompress', () => {
    const str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      `;
    const compressed = compress(str);
    const decompressed = decompress(compressed);
    expect(decompressed).toBe(str);
    expect(compressed.length).toBeLessThan(str.length);
  });
});
