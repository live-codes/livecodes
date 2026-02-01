import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import type {
  Config,
  EditorId,
  Language,
  Processor,
  Tool,
  ToolsPaneStatus,
  UrlQueryParams,
} from '../models';
import { addProp, cloneObject, decodeHTML, removeDuplicates, stringToValidJson } from '../utils';
import { decompress } from '../utils/compression';
import { upgradeAndValidate } from './config';
import { defaultConfig } from './default-config';
import { getMainFile, isEditorId } from './utils';

/**
 * Builds and validates a configuration object by merging default config with user config and URL params
 *
 * @param appConfig - Partial configuration object provided by user
 * @returns Complete validated configuration object
 *
 * The function:
 * 1. Merges default config with user provided config
 * 2. Handles special case for 'result' mode tools
 * 3. Processes URL query parameters
 * 4. Sets active editor
 * 5. Fixes language names in final config
 */
export const buildConfig = (appConfig: Partial<Config>): Config => {
  if (!appConfig) return { ...defaultConfig };
  const userConfig = upgradeAndValidate(appConfig);

  let config: Config = {
    ...defaultConfig,
    ...userConfig,
    ...(userConfig.mode === 'result' && userConfig.tools == null
      ? { tools: { enabled: [], active: '', status: 'none' } }
      : {}),
  };

  // get query string params
  const params = getParams();

  const { version, ...paramsConfig } = upgradeAndValidate(loadParamConfig(config, params));

  config = {
    ...config,
    ...paramsConfig,
  };

  const activeEditor = config.activeEditor || config.files[0]?.filename || 'markup';
  const mainFile = getMainFile(config);

  config = fixLanguageNames({
    ...config,
    activeEditor,
    mainFile,
  });
  return config;
};

const fixLanguageNames = (config: Config): Config => ({
  ...config,
  markup: {
    ...config.markup,
    language: getLanguageByAlias(config.markup.language) || defaultConfig.markup.language,
  },
  style: {
    ...config.style,
    language: getLanguageByAlias(config.style.language) || defaultConfig.style.language,
  },
  script: {
    ...config.script,
    language: getLanguageByAlias(config.script.language) || defaultConfig.script.language,
  },
  ...(config.tests?.language
    ? {
        tests: {
          ...config.tests,
          language:
            getLanguageByAlias(config.tests.language) ||
            defaultConfig.tests?.language ||
            'typescript',
        },
      }
    : {}),
  ...(config.languages
    ? {
        languages: removeDuplicates(
          config.languages.map((lang) => getLanguageByAlias(lang)).filter(Boolean) as Language[],
        ),
      }
    : {}),
});

/**
 * Extracts and processes URL query parameters and hash parameters, converting them into a structured object
 *
 * @param queryParams - The URL search query string. Defaults to parent.location.search
 * @param hashParams - The URL hash string. Defaults to parent.location.hash
 * @returns {UrlQueryParams} An object containing processed URL parameters where:
 *
 * - Values 'true' and 'false' are converted to boolean
 * - Empty string values are converted to true
 * - URL encoded values are decoded
 * - Special 'params' key content is decompressed and parsed as JSON
 * - Hash parameters take precedence over query parameters with the same key
 *
 * @example
 * // For URL: http://example.com?foo=bar&empty=&isTrue=true#param=value
 * getParams() // Returns: { foo: "bar", empty: true, isTrue: true, param: "value" }
 */
export const getParams = (
  queryParams = parent.location.search,
  hashParams = parent.location.hash,
): UrlQueryParams => {
  let params: { [key: string]: string | boolean } = Object.fromEntries(
    new URLSearchParams(queryParams),
  );
  if (hashParams) {
    // overwrite params with hash params if they exist
    hashParams = hashParams.replace('#', '?');
    params = {
      ...params,
      ...Object.fromEntries(new URLSearchParams(hashParams)),
    };
  }
  let encodedParams = {};
  Object.keys(params).forEach((key) => {
    try {
      const value = params[key] as string;
      if (key === 'params') {
        encodedParams = JSON.parse(decompress(value) || '{}');
        if (!encodedParams || typeof encodedParams !== 'object') encodedParams = {};
      } else {
        params[key] = decodeURIComponent(value);
      }
    } catch {
      //
    }
    params = { ...encodedParams, ...params };
    if (params[key] === '') params[key] = true;
    if (params[key] === 'true') params[key] = true;
    if (params[key] === 'false') params[key] = false;
  });
  params.x ??= params.import;
  return params;
};

export const loadParamConfig = (config: Config, params: UrlQueryParams): Partial<Config> => {
  // ?js
  // ?lang=js
  // ?language=js
  // ?css&js&md
  // ?html=hi&scss&ls
  // ?html=hi&scss=body{}&ts=//hi&lang=scss
  // ?languages=html,md,css,scss,ts
  // ?console
  // ?tests=full
  // ?lite

  // initialize paramsConfig with defaultConfig keys and params values
  const paramsConfig = ([...Object.keys(defaultConfig)] as Array<keyof Config>)
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
  (Object.keys(params) as Array<keyof UrlQueryParams>).forEach((key) => {
    const language = getLanguageByAlias(key);
    if (!language) return;
    const editorId = getLanguageEditorId(language);
    if (editorId && isEditorId(editorId) && !paramsConfig[editorId]) {
      const value = params[key];
      const content = typeof value === 'string' ? decodeHTML(value) : '';
      paramsConfig[editorId] = { language, content };
      if (!paramsConfig.activeEditor) {
        paramsConfig.activeEditor = editorId;
      }
    }
  });

  // ?lang=js
  const lang: any = getLanguageByAlias(params.language || params.lang);
  const editorId = getLanguageEditorId(lang);
  if (editorId && isEditorId(editorId)) {
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
          : paramsActiveEditor || paramsActive || paramsConfig.activeEditor;

  // ?languages=html,md,css,ts
  if (typeof params.languages === 'string') {
    paramsConfig.languages = params.languages
      .split(',')
      .map((lang) => lang.trim())
      .map(getLanguageByAlias)
      .filter(Boolean) as Language[];
  }

  // ?processors=tailwindcss,autoprefixer
  if (typeof params.processors === 'string') {
    paramsConfig.processors = params.processors
      .split(',')
      .map((processor) => processor.trim())
      .filter(Boolean) as Processor[];
  }

  // ?tags=js,advanced,proof-of-concept
  if (typeof params.tags === 'string') {
    paramsConfig.tags = params.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  // ?stylesheets
  if (typeof params.stylesheets === 'string') {
    paramsConfig.stylesheets = params.stylesheets
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);
  }

  // ?scripts
  if (typeof params.scripts === 'string') {
    paramsConfig.scripts = params.scripts
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean);
  }

  // ?tools=none
  // ?tools=open
  // ?console=open
  // ?console (same as ?console=open)
  // ?compiled=open&console=open
  // ?console=none&compiled=open
  // ?tools=tests,console|open
  const allTools: Array<Tool['name']> = ['console', 'compiled', 'tests'];
  const toolsNotSpecified =
    !params.tools && allTools.map((t) => params[t]).filter(Boolean).length === 0;
  const isToolsDisabled =
    params.tools === 'none' ||
    (params.tools as any) === false ||
    params.mode === 'editor' ||
    params.mode === 'codeblock' ||
    (params.mode === 'result' && toolsNotSpecified);
  if (isToolsDisabled) {
    paramsConfig.tools = { enabled: [], active: '', status: 'none' };
  } else if (toolsNotSpecified) {
    // do not add
  } else {
    paramsConfig.tools = cloneObject(defaultConfig.tools);
    let status: ToolsPaneStatus | undefined;

    const [paramToolsList, paramToolsStatus] = params.tools?.split('|') || ['', ''];
    const paramTools = paramToolsList
      .split(',')
      .map((t) => t.trim())
      .filter((t) => allTools.includes(t as Tool['name'])) as Array<Tool['name']>;

    if (paramTools.length > 0) {
      paramsConfig.tools!.enabled = paramTools;
      paramsConfig.tools!.active = paramTools[0];
    }

    const tools = Object.keys(params).filter((k) => allTools.includes(k as Tool['name'])) as Array<
      Tool['name']
    >;

    tools.forEach((tool) => {
      if (!paramsConfig.tools) return;

      if ((params[tool] as any) === true) {
        params[tool] = 'open';
      }

      if ((params[tool] as any) === false) {
        params[tool] = 'none';
      }

      if (!status && ['open', 'full', 'closed'].includes(params[tool]!)) {
        if (
          paramsConfig.tools.enabled &&
          paramsConfig.tools.enabled !== 'all' &&
          !paramsConfig.tools.enabled.includes(tool)
        ) {
          paramsConfig.tools.enabled.push(tool);
        }
        paramsConfig.tools.active = tool;
        paramsConfig.tools.status = params[tool] as ToolsPaneStatus;
        status = paramsConfig.tools.status;
      }

      if (params[tool] === 'none') {
        if (paramsConfig.tools.enabled === 'all') {
          paramsConfig.tools.enabled = [...allTools];
        }
        paramsConfig.tools.enabled = paramsConfig.tools.enabled?.filter((t) => t !== tool) || [];
        if (paramsConfig.tools.active === tool) {
          paramsConfig.tools.active = paramsConfig.tools.enabled?.[0] || '';
        }
      }
    });

    if (['open', 'full', 'closed'].includes(params.tools!)) {
      paramsConfig.tools!.status = params.tools as ToolsPaneStatus;
    } else if (['open', 'full', 'closed'].includes(paramToolsStatus)) {
      paramsConfig.tools!.status = paramToolsStatus as ToolsPaneStatus;
    } else if (
      !paramsConfig.tools?.status &&
      ['editor', 'codeblock', 'result'].includes(paramsConfig.mode || '')
    ) {
      paramsConfig.tools = { enabled: [], active: '', status: 'none' };
    } else if (!paramsConfig.tools!.status) {
      paramsConfig.tools!.status = 'closed';
    }
  }

  // ?lite
  if (params.lite) {
    paramsConfig.mode = 'lite';
  }

  // ?customSettings={template:{prerender:false}}
  if (
    typeof params.customSettings === 'string' &&
    (params.customSettings as string).trim().startsWith('{')
  ) {
    try {
      paramsConfig.customSettings = JSON.parse(stringToValidJson(params.customSettings));
    } catch {
      // ignore
    }
  }

  // ?markup.hidden=true&script.title=App.jsx
  // ?customSettings.template.prerender=false
  Object.keys(params).forEach((k) => {
    if (
      k.startsWith('markup.') ||
      k.startsWith('style.') ||
      k.startsWith('script.') ||
      k.startsWith('tests.') ||
      k.startsWith('customSettings.') ||
      k.startsWith('imports.') ||
      k.startsWith('types.') ||
      k.startsWith('tools.')
    ) {
      addProp(paramsConfig, k, (params as any)[k]);
    }
  });

  return paramsConfig;
};
