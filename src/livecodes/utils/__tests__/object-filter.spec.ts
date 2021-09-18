import { objectFilter } from '../utils';

describe('ObjectFilter', () => {
  test('filter values', () => {
    const obj = {
      a: 'value a',
      b: 'value b',
      c: 'value c',
    };

    const filteredByKey = {
      a: 'value a',
      c: 'value c',
    };

    const filteredByValue = {
      a: 'value a',
    };

    expect(filteredByKey).toEqual(objectFilter(obj, (_value, key) => key !== 'b'));
    expect(filteredByValue).toEqual(objectFilter(obj, (value) => value === 'value a'));
    expect({}).toEqual(objectFilter({}, (value) => value === 'value a'));
  });
});
