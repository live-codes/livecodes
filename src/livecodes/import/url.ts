import { getLanguageByAlias, getLanguageEditorId, languages } from '../languages';
import { EditorId, Language, Config } from '../models';
import { corsService } from '../services';
import { decodeHTML } from '../utils';
import { importFromZip } from './zip';

type Selectors = {
  [key in EditorId]: {
    language: Language;
    selector: string;
  };
};
export const getLanguageSelectors = (params: { [key: string]: string }) =>
  Object.keys(params).reduce((selectors: Selectors, key) => {
    const language = getLanguageByAlias(key);
    if (!language) return selectors;

    const editorId = getLanguageEditorId(language);
    if (!editorId || selectors[editorId]) return selectors;

    return {
      ...selectors,
      [editorId]: {
        language,
        selector: params[key],
      },
    };
  }, {} as Selectors);

const extractCodeFromHTML = (dom: Document, selector: string) => {
  const codeContainer = dom.querySelector(selector);
  if (!codeContainer) return;
  return decodeHTML(codeContainer.innerHTML.trim() + '\n' || '');
};

const getRawCode = (content: string, lang: string): Partial<Config> => {
  const language = getLanguageByAlias(lang) || 'html';
  const editorId = getLanguageEditorId(language) || 'markup';
  return {
    [editorId]: {
      language,
      content,
    },
    activeEditor: editorId,
  };
};

export const importFromUrl = async (
  url: string,
  params: { [key: string]: string },
  config: Config,
): Promise<Partial<Config>> => {
  let res: Response;
  try {
    res = await corsService.fetch(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching ' + url);
    return {};
  }

  // zip file
  if (
    url.endsWith('.zip') ||
    ['application/zip', 'application/octet-stream'].includes(
      res.headers.get('Content-Type') || '',
    ) ||
    url.startsWith('data:application/zip') ||
    url.startsWith('data:application/octet-stream')
  ) {
    const zip = await res.blob();
    return importFromZip(zip);
  }

  const fetchedContent = await res.text();

  if (params.raw) {
    return getRawCode(fetchedContent, params.raw);
  }

  const domparser = new DOMParser();
  const dom = domparser.parseFromString(fetchedContent, 'text/html');

  const defaultParams = languages
    .map((lang) => lang.name)
    .reduce(
      (acc, langName) => ({
        ...acc,
        [langName]: `.livecodes [data-lang="${langName}"]`,
      }),
      {} as { [key: string]: string },
    );

  const configSelectors = (['markup', 'style', 'script'] as EditorId[]).reduce(
    (selectors: Selectors, editorId) => {
      if (config[editorId].language && config[editorId].selector) {
        return {
          ...selectors,
          [editorId]: {
            language: config[editorId].language,
            selector: config[editorId].selector,
          },
        };
      } else {
        return selectors;
      }
    },
    {} as Selectors,
  );

  const languageSelectors: Selectors = {
    ...getLanguageSelectors(defaultParams),
    ...configSelectors,
    ...getLanguageSelectors(params),
  };

  const selectedCode = (Object.keys(languageSelectors) as EditorId[]).reduce(
    (config: Partial<Config>, editorId) => {
      const code = extractCodeFromHTML(dom, languageSelectors[editorId].selector);
      if (code === undefined) return config;
      return {
        ...config,
        [editorId]: {
          language: languageSelectors[editorId].language,
          content: code,
        },
      };
    },
    {},
  );
  if (Object.keys(selectedCode).length === 3) {
    return selectedCode;
  }

  // if not all editors are filled, check for default selectors for other languages
  const defaults = Object.keys(defaultParams).reduce(
    (config: Partial<Config>, language: string) => {
      const editorId = getLanguageEditorId(language as Language);
      if (!editorId || selectedCode[editorId]) return config;
      const code = extractCodeFromHTML(dom, defaultParams[language]);
      if (code === undefined) return config;

      return {
        ...config,
        [editorId]: {
          language,
          content: code,
        },
      };
    },
    {},
  );
  const selectedWithDefaults = {
    ...defaults,
    ...selectedCode,
  };

  if (Object.keys(selectedWithDefaults).length > 0) {
    return selectedWithDefaults;
  } else {
    // if no code was extracted, assume it is raw code
    // if there is a file extension use it else assume it is html
    const extension = url.slice(url.lastIndexOf('.') + 1);
    const language = getLanguageByAlias(extension) || 'html';
    const editorId = getLanguageEditorId(language) || 'markup';
    return {
      [editorId]: {
        language,
        content: fetchedContent || '',
      },
      activeEditor: editorId,
    };
  }
};
