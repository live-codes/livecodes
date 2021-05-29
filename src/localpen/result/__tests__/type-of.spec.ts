import { typeOf } from '../result-utils';

describe('typeOf', () => {
  test('typeOf', () => {
    expect(typeOf(window)).toBe('window');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(() => ({}))).toBe('function');
    expect(typeOf({})).toBe('object');
    expect(typeOf(3)).toBe('number');
    expect(typeOf(NaN)).toBe('nan');
  });
});
