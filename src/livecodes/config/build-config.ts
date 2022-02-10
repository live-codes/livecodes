import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { EditorId, Language, Config } from '../models';
import { decodeHTML } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeAndValidate } from '.';

export const buildConfig = (appConfig: Partial<Config>, baseUrl: string) => {
  if (!appConfig) return { ...defaultConfig };
  if (!baseUrl) {
    baseUrl = '/livecodes/';
  }

  const userConfig = upgradeAndValidate(appConfig);

  // get query string params
  const params = getParams();

  let config: Config = {
    ...defaultConfig,
    ...userConfig,
  };

  const paramsConfig = upgradeAndValidate(loadParamConfig(config, params));

  config = {
    ...config,
    ...paramsConfig,
  };

  const activeEditor = config.activeEditor || 'markup';

  config = {
    ...config,
    processors: {
      ...defaultConfig.processors,
      ...config.processors,
      postcss: {
        ...defaultConfig.processors.postcss,
        ...config.processors.postcss,
      },
    },
    activeEditor,
  };

  return config;
};

export const getParams = (queryParams = parent.location.search) => {
  const params = Object.fromEntries(new URLSearchParams(queryParams) as unknown as Iterable<any>);

  Object.keys(params).forEach((key) => {
    if (params[key] === '') params[key] = true;
    if (params[key] === 'true') params[key] = true;
    if (params[key] === 'false') params[key] = false;
  });
  return params;
};

const loadParamConfig = (config: Config, params: { [key: string]: string }) => {
  // ?js
  // ?lang=js
  // ?language=js
  // ?css&js&md
  // ?html=hi&scss&ls
  // ?html=hi&scss=body{}&ts=//hi&lang=scss
  // ?languages=html,md,css,scss,ts

  // initialize paramsConfig with defaultConfig keys and params values
  const paramsConfig = (Object.keys(defaultConfig) as Array<keyof Config>)
    .filter((key) => key !== 'version')
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: params[key],
      }),
      {} as Partial<Config>,
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

  // ?tags=js,advanced,proof-of-concept
  if (typeof params.tags === 'string') {
    paramsConfig.tags = params.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return paramsConfig;
};
