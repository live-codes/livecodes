import { getUnclosedTag } from '../tag-utils';

describe('getUnclosedTag', () => {
  test('matches unclosed tags', () => {
    expect(getUnclosedTag('<div')).toBe('div');
    expect(getUnclosedTag('<div class="container"')).toBe('div');
    expect(getUnclosedTag('  <my-element data-id="1"')).toBe('my-element');
    expect(getUnclosedTag('const el = <Component')).toBe('Component');
    expect(getUnclosedTag('<div>some text <span')).toBe('span');
  });

  test('matches tags adjacent to text', () => {
    expect(getUnclosedTag('<p>Hello<b')).toBe('b');
    expect(getUnclosedTag('<div>text<span')).toBe('span');
    expect(getUnclosedTag('1<sup')).toBe('sup');
    expect(getUnclosedTag('item (1)<div')).toBe('div');
  });

  test('matches tags spanning multiple lines', () => {
    expect(getUnclosedTag('<div\n  class="container"\n  id="foo"')).toBe('div');
    expect(getUnclosedTag('<Component\n  prop={x}\n')).toBe('Component');
  });

  test('ignores closed and self-closing tags', () => {
    expect(getUnclosedTag('<div>')).toBeUndefined();
    expect(getUnclosedTag('<div>text')).toBeUndefined();
    expect(getUnclosedTag('<div />')).toBeUndefined();
    expect(getUnclosedTag('<div/')).toBeUndefined();
    expect(getUnclosedTag('<br /')).toBeUndefined();
    expect(getUnclosedTag('</div')).toBeUndefined();
    expect(getUnclosedTag('<!-- comment')).toBeUndefined();
  });

  test('ignores a `<` inside an attribute value', () => {
    expect(getUnclosedTag('<div title="a <b"')).toBe('div');
  });

  test('ignores invalid tag names', () => {
    expect(getUnclosedTag('if (i')).toBeUndefined();
    expect(getUnclosedTag('if (i<0')).toBeUndefined();
    expect(getUnclosedTag('a < b')).toBeUndefined();
  });

  test('ignores comparison operators in jsx', () => {
    expect(getUnclosedTag('if (i<j', true)).toBeUndefined();
    expect(getUnclosedTag('const sum = a+b<c', true)).toBeUndefined();
    expect(getUnclosedTag('foo(x)<y', true)).toBeUndefined();
    expect(getUnclosedTag('if (a<b) { return <div', true)).toBe('div');
    expect(getUnclosedTag('for (let i = 0; i<0; i++) {\n\n}\nif (i', true)).toBeUndefined();
  });
});
