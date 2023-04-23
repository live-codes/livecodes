import { defaultConfig, getContentConfig } from '../config';
import type { Cache, Code, EditorId, Language } from '../models';

const defaultContentConfig = getContentConfig(defaultConfig);
const initialCache: Cache = {
  ...defaultContentConfig,
  markup: { ...defaultContentConfig.markup, compiled: '', modified: '' },
  style: { ...defaultContentConfig.style, compiled: '', modified: '' },
  script: { ...defaultContentConfig.script, compiled: '', modified: '' },
  tests: { language: 'javascript', ...defaultContentConfig.tests, compiled: '' },
  result: '',
  styleOnlyUpdate: false,
};

let cache = initialCache;

export const getCache = (): Cache => ({ ...cache });

export const setCache = (newCache = initialCache) => {
  cache = {
    ...newCache,
    markup: {
      modified: newCache.markup.compiled === cache.markup.compiled ? cache.markup.modified : '',
      ...newCache.markup,
    },
    style: {
      modified: newCache.style.compiled === cache.style.compiled ? cache.style.modified : '',
      ...newCache.style,
    },
    script: {
      modified: newCache.script.compiled === cache.script.compiled ? cache.script.modified : '',
      ...newCache.script,
    },
    tests: {
      language: 'javascript',
      compiled: '',
      ...newCache.tests,
    },
    result: newCache.result || '',
  };
};

export const updateCache = (editorId: EditorId, language: Language, modified: string) => {
  if (cache[editorId].language === language) {
    cache[editorId].modified = modified;
  }
};

export const getCachedCode = (): Code => ({
  markup: {
    language: cache.markup.language,
    content: cache.markup.content || '',
    compiled: cache.markup.modified || cache.markup.compiled || '',
  },
  style: {
    language: cache.style.language,
    content: cache.style.content || '',
    compiled: cache.style.modified || cache.style.compiled || '',
  },
  script: {
    language: cache.script.language,
    content: cache.script.content || '',
    compiled: cache.script.modified || cache.script.compiled || '',
  },
  result: cache.result || '',
});
