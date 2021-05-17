import { importCode } from '../import';
import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { Pen } from '../models';
import { getTemplate } from '../templates';
import { decodeHTML } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeAndValidate } from '.';

export const loadConfig = async (userConfig: Partial<Pen> = {}) => {
  const url = window.location.hash.substring(1);

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
    ? await fetch(configUrl)
        .then((res) => res.json())
        .catch(() => ({}))
    : {};

  // initialize params config with default keys
  const paramsConfig = (Object.keys(defaultConfig) as Array<keyof Omit<Pen, 'version'>>).reduce(
    (acc, key) => {
      acc[key] = params[key];
      return acc;
    },
    {} as Partial<Pen>,
  );

  // populate params config from query string params
  Object.keys(params).forEach((key) => {
    const language = getLanguageByAlias(key);
    if (!language) return;
    const editorId = getLanguageEditorId(language);

    if (editorId && !paramsConfig[editorId]) {
      // query param >> user defined config object >> config file >> default config >> empty string
      const content =
        typeof params[key] === 'string'
          ? decodeHTML(decodeURIComponent(params[key]))
          : language === userConfig[editorId]?.language
          ? userConfig[editorId]?.content
          : language === fileConfig[editorId]?.language
          ? fileConfig[editorId]?.content
          : language === defaultConfig[editorId]?.language
          ? defaultConfig[editorId]?.content
          : '';
      paramsConfig[editorId] = { language, content };
      paramsConfig.language = paramsConfig.language || language;
    }
  });

  // clean unused params config keys
  Object.keys(paramsConfig).forEach((key) => {
    if (paramsConfig[key as keyof Pen] === undefined) {
      delete paramsConfig[key as keyof Pen];
    }
  });

  let config: Pen = {
    ...defaultConfig,
    ...upgradeAndValidate(fileConfig),
    ...upgradeAndValidate(userConfig),
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

  // import code from github / github gist / url html
  const importedcode = await importCode(url, params, config);

  config = {
    ...config,
    ...upgradeAndValidate(importedcode),
  };

  // TODO: adding this prevents selecting the files to load
  // if (
  //   ![config.markup.language, config.style.language, config.script.language].includes(
  //     config.language,
  //   )
  // ) {
  //   config.language = config.markup.language;
  // }

  return config;
};
