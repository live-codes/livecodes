import { defaultConfig, getContentConfig } from '../config';
import { Cache, Code, EditorId, Editors, Language } from '../models';

const initialCache: Cache = {
  ...getContentConfig(defaultConfig),
  markup: { language: 'html', content: '', compiled: '', modified: '' },
  style: { language: 'css', content: '', compiled: '', modified: '' },
  script: { language: 'javascript', content: '', compiled: '', modified: '' },
  result: '',
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
    result: newCache.result || '',
  };
};

export const updateCache = (editorId: EditorId, language: Language, modified: string) => {
  if (cache[editorId].language === language) {
    cache[editorId].modified = modified;
  }
};

export const cacheIsValid = (editors: Editors) =>
  cache.markup.language === editors.markup.getLanguage() &&
  cache.markup.content === editors.markup.getValue() &&
  cache.style.language === editors.style.getLanguage() &&
  cache.style.content === editors.style.getValue() &&
  cache.script.language === editors.script.getLanguage() &&
  cache.script.content === editors.script.getValue();

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
