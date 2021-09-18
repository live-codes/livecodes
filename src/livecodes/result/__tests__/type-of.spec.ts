import { typeOf } from '../utils';

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
