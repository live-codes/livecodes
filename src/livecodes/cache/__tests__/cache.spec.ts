import { defaultConfig, getContentConfig } from '../../config';
import { getCache } from '../cache';
import { cacheIsValid } from '../utils';

test('cacheIsValid', () => {
  expect(cacheIsValid(getCache(), getContentConfig(defaultConfig))).toBe(true);

  const cache = getCache();
  cache.markup.content = 'hello';

  expect(cacheIsValid(cache, getContentConfig(defaultConfig))).toBe(false);
});
