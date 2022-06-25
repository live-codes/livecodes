import { getLanguageByAlias, getLanguageEditorId, languages } from '../languages';
import { EditorId, Language, Config } from '../models';
import { decodeHTML } from '../utils';

export const isDom = (url: string) => url.startsWith('dom/');

type Selectors = {
  [key in EditorId]: {
    language: Language;
    selector: string;
  };
};

export const getLanguageSelectors = (params: { [key: string]: string }) =>
  Object.keys(params).reduce((selectors: Partial<Selectors>, key) => {
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
  }, {} as Partial<Selectors>);

const extractCodeFromHTML = (dom: Document, selector: string) => {
  try {
    const codeContainer = dom.querySelector(selector);
    if (!codeContainer) return;
    return decodeHTML(codeContainer.innerHTML.trim() + '\n' || '');
  } catch {
    // invalid selector
    return;
  }
};

export const importFromDom = async (
  html: string,
  params: { [key: string]: string },
  config: Config,
): Promise<Partial<Config>> => {
  if (html.startsWith('dom/')) {
    html = html.slice(4);
  }

  const domparser = new DOMParser();
  const dom = domparser.parseFromString(html, 'text/html');
  const activeEditor = config.activeEditor;

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

  const defaultSelectors = getLanguageSelectors(defaultParams);
  const paramSelectors = getLanguageSelectors(params);
  const languageSelectors: Selectors = {
    ...defaultSelectors,
    ...configSelectors,
    ...paramSelectors,
  };

  const selectedCode = (Object.keys(languageSelectors) as EditorId[]).reduce(
    (selectedCodeConfig: Partial<Config>, editorId) => {
      let code = extractCodeFromHTML(dom, languageSelectors[editorId].selector);
      if (code === undefined) {
        const paramValue: string | undefined = paramSelectors[editorId]?.selector;
        if (paramValue) {
          // assume it is raw code supplied in param
          // e.g. ?js=console.log('hi')
          code = paramValue;
        } else {
          return selectedCodeConfig;
        }
      }
      return {
        ...selectedCodeConfig,
        [editorId]: {
          language: languageSelectors[editorId].language,
          content: code,
        },
      };
    },
    { activeEditor },
  );

  if (Object.keys(selectedCode).length === 3) {
    return selectedCode;
  }

  // if not all editors are filled, check for default selectors for other languages
  const defaults = Object.keys(defaultParams).reduce(
    (defaultsConfig: Partial<Config>, language: string) => {
      const editorId = getLanguageEditorId(language as Language);
      if (!editorId || selectedCode[editorId]) return defaultsConfig;
      const code = extractCodeFromHTML(dom, defaultParams[language]);
      if (code === undefined) return defaultsConfig;

      return {
        ...defaultsConfig,
        [editorId]: {
          language,
          content: code,
        },
      };
    },
    { activeEditor },
  );

  return {
    ...defaults,
    ...selectedCode,
  };
};
