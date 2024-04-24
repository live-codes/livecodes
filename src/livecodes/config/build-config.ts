import type {
  EditorId,
  Language,
  Config,
  Tool,
  ToolsPaneStatus,
  UrlQueryParams,
  Processor,
} from '../models';
import { getLanguageByAlias, getLanguageEditorId } from '../languages';
import { cloneObject, decodeHTML, removeDuplicates } from '../utils';
import { defaultConfig } from './default-config';
import { upgradeAndValidate } from '.';

export const buildConfig = (appConfig: Partial<Config>) => {
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

  const activeEditor = config.activeEditor || 'markup';

  config = fixLanguageNames({
    ...config,
    activeEditor,
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

export const getParams = (queryParams = parent.location.search): UrlQueryParams => {
  const params = Object.fromEntries(new URLSearchParams(queryParams) as unknown as Iterable<any>);
  Object.keys(params).forEach((key) => {
    try {
      params[key] = decodeURIComponent(params[key]);
    } catch {
      //
    }
    if (params[key] === '') params[key] = true;
    if (params[key] === 'true') params[key] = true;
    if (params[key] === 'false') params[key] = false;
  });
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

  // initialize paramsConfig with defaultConfig keys and params values
  const paramsConfig = ([...Object.keys(defaultConfig), ...[]] as Array<keyof Config>)
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
    if (editorId && !paramsConfig[editorId]) {
      const value = params[key];
      const content = typeof value === 'string' ? decodeHTML(decodeURIComponent(value)) : '';
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

  return paramsConfig;
};
