import { importCode } from '../import';
import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { EditorId, Language, Pen } from '../models';
import { getTemplate } from '../templates';
import { decodeHTML } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeAndValidate } from '.';

export const loadConfig = async (appConfig: Partial<Pen>, baseUrl: string) => {
  if (!appConfig) return { ...defaultConfig };
  if (!baseUrl) {
    baseUrl = '/localpen/';
  }

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

  // load config from file
  const configUrl = params.config || './localpen.json';
  const fileConfig = configUrl
    ? upgradeAndValidate(
        await fetch(configUrl)
          .then((res) => res.json())
          .catch(() => ({})),
      )
    : {};

  let config: Pen = {
    ...defaultConfig,
    ...fileConfig,
    ...userConfig,
  };

  const paramsConfig = upgradeAndValidate(loadParamConfig(config, params));

  config = {
    ...config,
    ...paramsConfig,
  };

  const externalContent = upgradeAndValidate(await loadExternalContent(config, baseUrl, params));

  const activeEditor =
    paramsConfig.activeEditor || externalContent.activeEditor || config.activeEditor || 'markup';

  config = {
    ...config,
    ...externalContent,
    activeEditor,
  };

  return config;
};

const loadExternalContent = async (
  config: Pen,
  baseUrl: string,
  params: { [key: string]: string },
) => {
  // load a starter template
  const templateName = params.template;
  const templateConfig = templateName
    ? await getTemplate(templateName, config, baseUrl)
    : undefined;
  if (templateConfig) {
    return templateConfig;
  }

  // import code from hash: code / github / github gist / url html / ...etc
  const url = window.location.hash.substring(1);
  if (url) {
    return importCode(url, params, config);
  }

  // load content from config contentUrl
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const editors = await Promise.all(
    editorIds.map((editorId) => {
      const contentUrl = config[editorId].contentUrl;
      if (contentUrl && !config[editorId].content) {
        return fetch(contentUrl)
          .then((res) => res.text())
          .then((content) => ({
            ...config[editorId],
            content,
          }));
      } else {
        return Promise.resolve(config[editorId]);
      }
    }),
  );
  return {
    markup: editors[0],
    style: editors[1],
    script: editors[2],
  };
};

const loadParamConfig = (config: Pen, params: { [key: string]: string }) => {
  // ?js
  // ?lang=js
  // ?language=js
  // ?css&js&md
  // ?html=hi&scss&ls
  // ?html=hi&scss=body{}&ts=//hi&lang=scss
  // ?languages=html,md,css,scss,ts

  // initialize paramsConfig with defaultConfig keys and params values
  const paramsConfig = (Object.keys(defaultConfig) as Array<keyof Pen>)
    .filter((key) => key !== 'version')
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: params[key],
      }),
      {} as Partial<Pen>,
    );

  // populate params config from query string params

  // ?html=hi&scss&ts
  Object.keys(params).forEach((key) => {
    const language = getLanguageByAlias(key);
    if (!language) return;
    const editorId = getLanguageEditorId(language);
    if (editorId && !paramsConfig[editorId]) {
      const content =
        typeof params[key] === 'string' ? decodeHTML(decodeURIComponent(params[key])) : '';
      paramsConfig[editorId] = { language, content };
      if (!paramsConfig.activeEditor) {
        paramsConfig.activeEditor = editorId;
      }
    }
  });

  // ?lang=js
  const lang: any = getLanguageByAlias(params.language || params.lang);
  const editorId = getLanguageEditorId(lang);
  if (editorId) {
    if (paramsConfig[editorId]?.language === lang) {
      paramsConfig.activeEditor = editorId;
    } else if (!paramsConfig[editorId]?.content && config[editorId]?.language === lang) {
      paramsConfig[editorId] = {
        ...config[editorId],
      };
      paramsConfig.activeEditor = editorId;
    } else if (!config[editorId]?.content) {
      paramsConfig[editorId] = {
        language: lang,
        content: '',
      };
      paramsConfig.activeEditor = editorId;
    }
  }

  const editorIds: EditorId[] = ['markup', 'style', 'script'];

  // ?activeEditor=style
  // ?active=1  (same as: ?activeEditor=style)
  const paramsActiveEditor: any = params.activeEditor;
  const paramsActive: any = params.active;
  paramsConfig.activeEditor = editorIds.includes(paramsActiveEditor) // ?activeEditor=style
    ? paramsActiveEditor
    : paramsActiveEditor in editorIds // ?activeEditor=1
    ? editorIds[paramsActiveEditor]
    : editorIds.includes(paramsActive) // ?active=style
    ? paramsActive
    : paramsActive in editorIds // ?active=1
    ? editorIds[paramsActive]
    : paramsConfig.activeEditor;

  // ?languages=html,md,css,ts
  if (typeof params.languages === 'string') {
    paramsConfig.languages = params.languages
      .split(',')
      .map(getLanguageByAlias)
      .filter(Boolean) as Language[];
  }

  return paramsConfig;
};
