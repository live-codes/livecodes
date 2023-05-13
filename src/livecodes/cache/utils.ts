import type { ContentConfig, Cache, EditorCache } from '../models';

const removeExtra = <T>(editor: T, keys: Array<keyof T>) => {
  const contentEditor = { ...editor };
  keys.forEach((key) => delete contentEditor[key]);
  return contentEditor;
};
export const cacheIsValid = (cache: Cache, config: ContentConfig) => {
  const excludedKeys: Array<keyof ContentConfig> = [
    'activeEditor',
    'title',
    'description',
    'tests',
  ];
  const extraCache: Array<keyof EditorCache> = ['compiled', 'modified'];

  const contentCache = {
    ...removeExtra(cache, ['result', 'styleOnlyUpdate', ...excludedKeys]),
    markup: removeExtra(cache.markup, extraCache),
    style: removeExtra(cache.style, extraCache),
    script: removeExtra(cache.script, extraCache),
  };
  const contentConfig = removeExtra(config, excludedKeys);

  return JSON.stringify(contentCache) === JSON.stringify(contentConfig);
};
