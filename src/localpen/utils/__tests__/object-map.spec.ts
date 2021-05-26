import { objectMap } from '../utils';

describe('ObjectMap', () => {
  test('map values', () => {
    const obj = {
      a: 'value a',
      b: 'value b',
      c: 'value c',
    };

    const mapped = {
      a: 'value a mapped',
      b: 'value b mapped',
      c: 'value c mapped',
    };

    const mappingFn = (value: any) => value + ' mapped';

    expect(mapped).toEqual(objectMap(obj, mappingFn));
    expect({}).toEqual(objectMap({}, mappingFn));
  });
  test('map values with keys and index', () => {
    const obj = {
      a: 'value a',
      b: 'value b',
      c: 'value c',
    };

    const mapped = {
      a: 'value a mapped (a - 0)',
      b: 'value b mapped (b - 1)',
      c: 'value c mapped (c - 2)',
    };

    const mappingFn = (value: any, key: string, index: number) =>
      value + ` mapped (${key} - ${index})`;

    expect(mapped).toEqual(objectMap(obj, mappingFn));
    expect({}).toEqual(objectMap({}, mappingFn));
  });
});
