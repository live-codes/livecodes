import type { Cache, ContentConfig } from '../models';

const removeExtra = <T>(obj: T, keys: Array<keyof T>) => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};
export const cacheIsValid = (cache: Cache, config: ContentConfig) => {
  const excludedKeys: Array<keyof ContentConfig> = [
    'activeEditor',
    'title',
    'description',
    'tests',
  ];
  const extraCache: Array<'compiled' | 'modified'> = ['compiled', 'modified'];

  const contentCache = {
    ...removeExtra(cache, ['result', 'styleOnlyUpdate', ...excludedKeys]),
    markup: removeExtra(cache.markup, extraCache),
    style: removeExtra(cache.style, extraCache),
    script: removeExtra(cache.script, extraCache),
    files: cache.files.map((f) => removeExtra(f, extraCache)),
  };
  const contentConfig = removeExtra(config, excludedKeys);

  return JSON.stringify(contentCache) === JSON.stringify(contentConfig);
};
