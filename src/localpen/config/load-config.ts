import { importCode } from '../import';
import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { EditorId, Pen } from '../models';
import { getTemplate } from '../templates';
import { decodeHTML } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeAndValidate } from '.';

export const loadConfig = async (appConfig: Partial<Pen> = {}) => {
  const userConfig = upgradeAndValidate(appConfig);

  // get query string params
  const params = Object.fromEntries(
    (new URLSearchParams(location.search) as unknown) as Iterable<any>,
  );

  Object.keys(params).forEach((key) => {
    if (params[key] === '') params[key] = true;
    if (params[key] === 'true') params[key] = true;
    if (params[key] === 'false') params[key] = false;
  });

  // get template name from query string param
  const templateName = params.template;

  // load config from file
  const configUrl = params.config || './localpen.json';
  const fileConfig = configUrl
    ? upgradeAndValidate(
        await fetch(configUrl)
          .then((res) => res.json())
          .catch(() => ({})),
      )
    : {};

  // initialize params config with default keys
  let paramsConfig = (Object.keys(defaultConfig) as Array<keyof Omit<Pen, 'version'>>).reduce(
    (acc, key) => {
      acc[key] = params[key];
      return acc;
    },
    {} as Partial<Pen>,
  );

  // populate params config from query string params

  // ?html=hi
  const languageAliases = ['language', 'lang'];
  Object.keys(params).forEach((key) => {
    const language = getLanguageByAlias(key);
    if (!language) return;
    const editorId = getLanguageEditorId(language);

    if (editorId && !paramsConfig[editorId]) {
      // >> query param
      // >> user defined config object
      // >> config file
      // >> default config
      // >> empty string
      const content =
        typeof params[key] === 'string' && !languageAliases.includes(key)
          ? decodeHTML(decodeURIComponent(params[key]))
          : language === userConfig[editorId]?.language
          ? userConfig[editorId]?.content
          : language === fileConfig[editorId]?.language
          ? fileConfig[editorId]?.content
          : language === defaultConfig[editorId]?.language
          ? defaultConfig[editorId]?.content
          : '';
      paramsConfig[editorId] = { language, content };
      paramsConfig.activeEditor = paramsConfig.activeEditor || editorId;
    }
  });

  // ?lang=scss
  (() => {
    if ('language' in params || 'lang' in params) {
      const language = getLanguageByAlias(params.language || params.lang);
      if (!language) return;
      const editorId = getLanguageEditorId(language);
      if (!editorId) return;

      if (paramsConfig[editorId]?.language === getLanguageByAlias(language)) {
        paramsConfig.activeEditor = editorId;
      } else if (!paramsConfig[editorId]?.content) {
        paramsConfig[editorId] = { language, content: '' };
        paramsConfig.activeEditor = editorId;
      }
    }
  })();

  // ?activeEditor=style
  if ('activeEditor' in params || 'active' in params) {
    paramsConfig.activeEditor = params.activeEditor || params.active;
  }
  // ?active=1  (same as: ?activeEditor=style)
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  if (editorIds[paramsConfig.activeEditor as any]) {
    paramsConfig.activeEditor = editorIds[paramsConfig.activeEditor as any];
  }

  // convert params config to a valid config object
  paramsConfig = upgradeAndValidate(paramsConfig);

  let config: Pen = {
    ...defaultConfig,
    ...fileConfig,
    ...userConfig,
    ...paramsConfig,
  };

  // if a template is chosen, return its content (avoid loading external content)
  if (templateName) {
    const template = await getTemplate(templateName, config);
    if (template) {
      return {
        ...config,
        ...template,
      };
    }
  }

  // load content from url
  const contents = await Promise.all(
    [config.markup, config.style, config.script].map((editor) => {
      if (editor.contentUrl && !editor.content) {
        return fetch(editor.contentUrl).then((res) => res.text());
      } else {
        return Promise.resolve(editor.content);
      }
    }),
  );
  config.markup.content = contents[0];
  config.style.content = contents[1];
  config.script.content = contents[2];

  // import code from hash code / github / github gist / url html / ...etc
  const url = window.location.hash.substring(1);
  if (url) {
    const importedcode = upgradeAndValidate(await importCode(url, params, config));
    config = {
      ...config,
      ...importedcode,
    };
  }

  // if activeEditor is not set, default to 'markup'
  config = {
    ...config,
    ...(config.activeEditor ? { activeEditor: config.activeEditor } : { activeEditor: 'markup' }),
  };

  return config;
};
