import { basicLanguages, createEditor, selectedEditor, createCustomEditors } from './editor';
import {
  languages,
  getLanguageEditorId,
  getLanguageCompiler,
  languageIsEnabled,
  pluginSpecs,
  PluginName,
  processorIsEnabled,
  getLanguageByAlias,
  mapLanguage,
  createLanguageMenus,
  getLanguageTitle,
  getLanguageSpecs,
} from './languages';
import {
  createSimpleStorage,
  createStorage,
  StorageItem,
  RestoreItem,
  ProjectStorage,
} from './storage';
import {
  API,
  Cache,
  CodeEditor,
  CssPresetId,
  EditorId,
  EditorLanguages,
  EditorOptions,
  Editors,
  GithubScope,
  Language,
  Config,
  Screen,
  ShareData,
  Template,
  User,
  ContentConfig,
  Theme,
  UserConfig,
  Await,
  Code,
  CustomEditors,
  BlocklyContent,
} from './models';
import { getFormatter } from './formatter';
import { createNotifications } from './notifications';
import { createModal } from './modal';
import {
  settingsMenuHTML,
  resultTemplate,
  customSettingsScreen,
  resourcesScreen,
  savePromptScreen,
  restorePromptScreen,
} from './html';
import { exportConfig } from './export';
import { createEventsManager } from './events';
import { getStarterTemplates, getTemplate } from './templates';
import {
  buildConfig,
  defaultConfig,
  getConfig,
  getContentConfig,
  getParams,
  getUserConfig,
  setConfig,
  upgradeAndValidate,
} from './config';
import { importCode, isGithub } from './import';
import {
  compress,
  copyToClipboard,
  debounce,
  fetchWithHandler,
  loadStylesheet,
  stringify,
  stringToValidJson,
} from './utils';
import { getCompiler, getAllCompilers, cjs2esm } from './compiler';
import { createTypeLoader } from './types';
import { createResultPage } from './result';
import * as UI from './UI';
import { createAuthService, sandboxService, shareService } from './services';
import { deploy, deployedConfirmation, deployFile, getUserPublicRepos, GitHubFile } from './deploy';
import { cacheIsValid, getCache, getCachedCode, setCache, updateCache } from './cache';
import {
  autoCompleteUrl,
  hintCssUrl,
  lunaConsoleStylesUrl,
  lunaObjViewerStylesUrl,
  snackbarUrl,
} from './vendors';
import { configureEmbed } from './embeds';
import { createToolsPane } from './toolspane';
import { createOpenItem } from './UI';

const eventsManager = createEventsManager();
let projectStorage: ProjectStorage;
let templateStorage: ProjectStorage;
let assetsStorage: ProjectStorage;
const userConfigStorage = createSimpleStorage<UserConfig>('__livecodes_user_config__');
const restoreStorage = createSimpleStorage<RestoreItem>('__livecodes_project_restore__');
const typeLoader = createTypeLoader();
const notifications = createNotifications();
const modal = createModal();
const split = UI.createSplitPanes();
const screens: Screen[] = [];

let baseUrl: string;
let isEmbed: boolean;
let compiler: Await<ReturnType<typeof getCompiler>>;
let formatter: ReturnType<typeof getFormatter>;
let editors: Editors;
let customEditors: CustomEditors;
let toolsPane: any;
let authService: ReturnType<typeof createAuthService> | undefined;
let editorLanguages: EditorLanguages | undefined;
let resultLanguages: Language[] = [];
let projectId: string;
let isSaved = true;
let changingContent = false;
let consoleInputCodeCompletion: any;
let starterTemplates: Template[];
let editorBuild: EditorOptions['editorBuild'] = 'basic';

const getEditorLanguage = (editorId: EditorId = 'markup') => editorLanguages?.[editorId];
const getEditorLanguages = () => Object.values(editorLanguages || {});
const getActiveEditor = () => editors[getConfig().activeEditor || 'markup'];
const setActiveEditor = async (config: Config) => showEditor(config.activeEditor);
const isBasicLanguage = (lang: Language) => basicLanguages.includes(lang);

const loadStyles = () =>
  Promise.all(
    [snackbarUrl, hintCssUrl, lunaObjViewerStylesUrl, lunaConsoleStylesUrl].map((url) =>
      loadStylesheet(url, undefined, '#app-styles'),
    ),
  );

const createIframe = (container: HTMLElement, result?: string, service = sandboxService) =>
  new Promise((resolve, reject) => {
    if (!container) {
      reject('Result container not found');
      return;
    }

    let iframe = document.querySelector('iframe#result-frame') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = 'result';
      iframe.id = 'result-frame';
      iframe.setAttribute('allow', 'camera; geolocation; microphone');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
      container.appendChild(iframe);
    }

    if (['codeblock', 'editor'].includes(getConfig().mode)) {
      result = '';
    }

    const scriptLang = getEditorLanguage('script') || 'javascript';
    const compilers = getAllCompilers(languages, getConfig(), baseUrl);
    const editorsText = `${getConfig().markup.content}
      ${getConfig().style.content}
      ${getConfig().script.content}
      `;
    const liveReload =
      compilers[scriptLang]?.liveReload &&
      resultLanguages.includes(scriptLang) &&
      !editorsText.includes('__livecodes_reload__');

    if (result && getCache().styleOnlyUpdate) {
      // load the updated styles only
      const domParser = new DOMParser();
      const dom = domParser.parseFromString(result, 'text/html');
      const stylesElement = dom.querySelector('#__livecodes_styles__');
      if (stylesElement) {
        const styles = stylesElement.innerHTML;
        iframe.contentWindow?.postMessage({ styles }, service.getOrigin());
      } else {
        iframe.contentWindow?.postMessage({ result }, service.getOrigin());
      }
      resolve('loaded');
    } else if (liveReload) {
      // allows only sending the updated code to the iframe without full page reload
      iframe.contentWindow?.postMessage({ result }, service.getOrigin());
      resolve('loaded');
    } else {
      // full page reload
      let loaded = false;
      eventsManager.addEventListener(iframe, 'load', () => {
        if (!result || loaded) {
          resolve('loaded');
          return; // prevent infinite loop
        }

        iframe.contentWindow?.postMessage({ result }, service.getOrigin());
        loaded = true;
        resolve('loaded');
      });

      const { markup, style, script } = getConfig();
      const query = `?markup=${markup.language}&style=${style.language}&script=${script.language}&isembed=${isEmbed}`;
      iframe.src = service.getResultUrl() + query;
    }

    resultLanguages = getEditorLanguages();

    parent.dispatchEvent(
      new CustomEvent('livecodes-change', {
        detail: {
          config: getContentConfig(getConfig()),
          code: JSON.parse(JSON.stringify(getCachedCode())),
        },
      }),
    );
  });

const loadModuleTypes = async (editors: Editors, config: Config) => {
  const scriptLanguage = config.script.language;
  if (
    editors.script &&
    ['typescript', 'javascript'].includes(mapLanguage(scriptLanguage)) &&
    typeof editors.script.addTypes === 'function'
  ) {
    const configTypes = {
      ...getLanguageCompiler(scriptLanguage)?.types,
      ...config.types,
    };
    const libs = await typeLoader.load(getConfig().script.content || '', configTypes);
    libs.forEach((lib) => editors.script.addTypes?.(lib));
  }
};

const setEditorTitle = (editorId: EditorId, title: string) => {
  const editorTitle = document.querySelector(`#${editorId}-selector span`);
  if (!editorTitle) return;
  editorTitle.innerHTML =
    languages.find((language) => language.name === getLanguageByAlias(title))?.title || '';
};

const createCopyButtons = () => {
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  editorIds.forEach((editorId) => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = 'copy';
    copyButton.classList.add('copy-button');
    document.getElementById(editorId)?.appendChild(copyButton);
    eventsManager.addEventListener(copyButton, 'click', () => {
      if (copyToClipboard(editors?.[editorId]?.getValue())) {
        copyButton.innerHTML = 'copied';
        setTimeout(() => {
          copyButton.innerHTML = 'copy';
        }, 2000);
      }
    });
  });
};

const shouldUpdateEditorBuild = (langs?: Language[]) => {
  const editor = selectedEditor(getConfig());
  if (editor === 'monaco') return false;
  if (editorBuild === 'full') return false;
  if (
    langs?.some((lang) => !isBasicLanguage(lang)) ||
    (editor === 'codemirror' && getConfig().emmet)
  ) {
    editorBuild = 'full';
    return true;
  }
  return false;
};

const createEditors = async (config: Config) => {
  if (editors) {
    Object.values(editors).forEach((editor: CodeEditor) => editor.destroy());
  }

  const baseOptions = {
    baseUrl,
    mode: config.mode,
    readonly: config.readonly,
    editor: config.editor,
    editorType: 'code' as EditorOptions['editorType'],
    theme: config.theme,
    isEmbed,
  };
  const markupOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getMarkupElement(),
    language: languageIsEnabled(config.markup.language, config)
      ? config.markup.language
      : config.languages?.find((lang) => getLanguageEditorId(lang) === 'markup') || 'html',
    value: languageIsEnabled(config.markup.language, config) ? config.markup.content || '' : '',
  };
  const styleOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getStyleElement(),
    language: languageIsEnabled(config.style.language, config)
      ? config.style.language
      : config.languages?.find((lang) => getLanguageEditorId(lang) === 'style') || 'css',
    value: languageIsEnabled(config.style.language, config) ? config.style.content || '' : '',
  };
  const scriptOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getScriptElement(),
    language: languageIsEnabled(config.script.language, config)
      ? config.script.language
      : config.languages?.find((lang) => getLanguageEditorId(lang) === 'script') || 'javascript',
    value: languageIsEnabled(config.script.language, config) ? config.script.content || '' : '',
  };

  shouldUpdateEditorBuild([markupOptions.language, styleOptions.language, scriptOptions.language]);

  const markupEditor = await createEditor({ ...markupOptions, editorBuild });
  const styleEditor = await createEditor({ ...styleOptions, editorBuild });
  const scriptEditor = await createEditor({ ...scriptOptions, editorBuild });

  setEditorTitle('markup', markupOptions.language);
  setEditorTitle('style', styleOptions.language);
  setEditorTitle('script', scriptOptions.language);

  editorLanguages = {
    markup: markupOptions.language,
    style: styleOptions.language,
    script: scriptOptions.language,
  };

  editors = {
    markup: markupEditor,
    style: styleEditor,
    script: scriptEditor,
  };

  (Object.keys(editors) as EditorId[]).forEach(async (editorId) => {
    const language = editorLanguages?.[editorId] || 'html';
    applyLanguageConfigs(language);
    editors[editorId].registerFormatter(await formatter.getFormatFn(language));
    registerRun(editorId, editors);
  });

  if (config.mode === 'codeblock') {
    createCopyButtons();
  }
};

const reloadEditors = async (config: Config) => {
  await createEditors(config);
  await toolsPane?.compiled.reloadEditor();
  updateCompiledCode();
  handleChangeContent();
};

const updateEditors = async (editors: Editors, config: Config) => {
  const editorIds = Object.keys(editors) as Array<keyof Editors>;
  for (const editorId of editorIds) {
    const language = getLanguageByAlias(config[editorId].language);
    if (language) {
      await changeLanguage(language, config[editorId].content, true);
    }
  }
};

const showMode = (config: Config) => {
  const modes = {
    full: '111',
    editor: '110',
    codeblock: '010',
    result: '001',
  };
  const modeConfig = modes[config.mode] || '111';

  const toolbarElement = UI.getToolbarElement();
  const editorContainerElement = UI.getEditorContainerElement();
  const editorsElement = UI.getEditorsElement();
  const outputElement = UI.getOutputElement();
  const resultElement = UI.getResultElement();
  const gutterElement = UI.getGutterElement();
  const runButton = UI.getRunButton();
  const codeRunButton = UI.getCodeRunButton();
  const editorTools = UI.getEditorToolbar();

  const showToolbar = modeConfig[0] === '1';
  const showEditor = modeConfig[1] === '1';
  const showResult = modeConfig[2] === '1';

  toolbarElement.style.display = 'flex';
  editorsElement.style.display = 'flex';
  resultElement.style.display = 'flex';
  outputElement.style.display = 'block';
  gutterElement.style.display = 'block';
  runButton.style.visibility = 'visible';
  codeRunButton.style.visibility = 'visible';

  if (!showToolbar) {
    toolbarElement.style.display = 'none';
    editorContainerElement.style.height = '100%';
  }
  if (!showEditor) {
    outputElement.style.flexBasis = '100%';
    editorsElement.style.display = 'none';
    split?.destroy(true);
  }
  if (!showResult) {
    editorsElement.style.flexBasis = '100%';
    outputElement.style.display = 'none';
    resultElement.style.display = 'none';
    codeRunButton.style.display = 'none';
    split?.destroy(true);
  }
  if (config.mode === 'editor' || config.mode === 'codeblock') {
    runButton.style.visibility = 'hidden';
    codeRunButton.style.visibility = 'hidden';
  }
  if (config.mode === 'codeblock') {
    editorTools.style.display = 'none';
  }
  if (config.mode === 'result') {
    if (!['full', 'open'].includes(toolsPane.getStatus())) {
      toolsPane?.hide();
    }
  }
  window.dispatchEvent(new Event('editor-resize'));
};

const showEditor = (editorId: EditorId = 'markup', isUpdate = false) => {
  const titles = UI.getEditorTitles();
  const editorIsVisible = () =>
    Array.from(titles)
      .map((title) => title.dataset.editor)
      .includes(editorId);
  if (!editorIsVisible()) {
    // select first visible editor instead
    editorId = (titles[0].dataset.editor as EditorId) || 'markup';
  }
  titles.forEach((selector) => selector.classList.remove('active'));
  const activeTitle = document.getElementById(editorId + '-selector');
  activeTitle?.classList.add('active');
  const editorDivs = UI.getEditorDivs();
  editorDivs.forEach((editor) => (editor.style.display = 'none'));
  const activeEditor = document.getElementById(editorId) as HTMLElement;
  activeEditor.style.display = 'block';
  if (!isEmbed) {
    editors[editorId]?.focus();
  }
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId,
    });
  }
  updateCompiledCode();
  split.show('code');
};

const addConsoleInputCodeCompletion = () => {
  if (consoleInputCodeCompletion) {
    consoleInputCodeCompletion.dispose();
  }
  if (
    editorLanguages?.script &&
    ['javascript', 'typescript'].includes(mapLanguage(editorLanguages.script))
  ) {
    if (editors.script && typeof editors.script.addTypes === 'function') {
      consoleInputCodeCompletion = editors.script.addTypes({
        content: getConfig().script.content + '\n{}',
        filename: 'script.js',
      });
    }
  }
};

const configureEditorTools = (language: Language) => {
  if (
    getConfig().readonly ||
    getActiveEditor().prism ||
    language === 'blockly' ||
    language === 'richtext'
  ) {
    UI.getEditorToolbar().classList.add('hidden');
    return false;
  }
  UI.getEditorToolbar().classList.remove('hidden');

  const langSpecs = getLanguageSpecs(language);
  if (langSpecs?.formatter || langSpecs?.parser) {
    UI.getFormatButton().classList.remove('disabled');
  } else {
    UI.getFormatButton().classList.add('disabled');
  }
  return true;
};

const phpHelper = ({ editor, code }: { editor?: CodeEditor; code?: string }) => {
  const addToken = (code: string) => (code.trim().startsWith('<?php') ? code : '<?php\n' + code);
  if (code) {
    return addToken(code);
  }
  if (editor?.getLanguage() === 'php') {
    editor.setValue(addToken(editor.getValue()));
  }
  return;
};

const applyLanguageConfigs = async (language: Language) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId || !language || !languageIsEnabled(language, getConfig())) return;

  configureEditorTools(language);

  (Object.keys(customEditors) as Language[]).forEach(async (lang) => {
    await customEditors[lang]?.show(Object.values(editorLanguages || []).includes(lang), {
      baseUrl,
      editors,
      config: getConfig(),
      html: getCache().markup.compiled || getConfig().markup.content || '',
      eventsManager,
    });
  });
};

const changeLanguage = async (language: Language, value?: string, isUpdate = false) => {
  const editorId = getLanguageEditorId(language);
  if (!editorId || !language || !languageIsEnabled(language, getConfig())) return;
  if (getLanguageSpecs(language)?.largeDownload) {
    notifications.info(`Loading ${getLanguageTitle(language)}. This may take a while!`);
  }
  if (shouldUpdateEditorBuild([language])) {
    await reloadEditors(getConfig());
  }
  const editor = editors[editorId];
  editor.setLanguage(language, value ?? (getConfig()[editorId].content || ''));
  if (editorLanguages) {
    editorLanguages[editorId] = language;
  }
  setEditorTitle(editorId, language);
  showEditor(editorId, isUpdate);
  phpHelper({ editor: editors.script });
  if (!isEmbed) {
    setTimeout(() => editor.focus());
  }
  await compiler.load([language], getConfig());
  editor.registerFormatter(await formatter.getFormatFn(language));
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId,
    });
    await run();
  }
  await setSavedStatus();
  addConsoleInputCodeCompletion();
  loadModuleTypes(editors, getConfig());
  await applyLanguageConfigs(language);
};

// Ctrl/Cmd + Enter triggers run
const registerRun = (editorId: EditorId, editors: Editors) => {
  const editor = editors[editorId];
  editor.addKeyBinding('run', editor.keyCodes.CtrlEnter, async () => {
    await run();
  });
};

const updateCompiledCode = () => {
  const getCompiledLanguage = (editorId: EditorId) => {
    const defaultLang: { [key in EditorId]: Language } = {
      markup: 'html',
      style: 'css',
      script: 'javascript',
    };
    const lang = getLanguageCompiler(getConfig()[editorId].language)?.compiledCodeLanguage;
    return {
      language: lang || defaultLang[editorId],
      label: lang === 'json' ? 'JSON' : getLanguageByAlias(lang) || lang || defaultLang[editorId],
    };
  };
  const compiledLanguages: { [key in EditorId]: { language: Language; label: string } } = {
    markup: getCompiledLanguage('markup'),
    style: getCompiledLanguage('style'),
    script: getCompiledLanguage('script'),
  };
  if (toolsPane && toolsPane.compiled) {
    const cache = getCache();
    Object.keys(cache).forEach((editorId) => {
      if (editorId !== getConfig().activeEditor) return;
      let compiledCode = cache[editorId].modified || cache[editorId].compiled || '';
      if (editorId === 'script' && getConfig().script.language === 'php') {
        compiledCode = phpHelper({ code: compiledCode }) || '<?php\n';
      }
      toolsPane.compiled.update(
        compiledLanguages[editorId].language,
        compiledCode,
        compiledLanguages[editorId].label,
      );
    });
  }
};

const getResultPage = async ({
  sourceEditor = undefined as EditorId | undefined,
  forExport = false,
  template = resultTemplate,
  singleFile = true,
}) => {
  updateConfig();
  const config = getConfig();
  const contentConfig = getContentConfig(config);

  const markupContent = config.markup.content || '';
  const styleContent = config.style.content || '';
  const scriptContent = config.script.content || '';
  const markupLanguage = config.markup.language;
  const styleLanguage = config.style.language;
  const scriptLanguage = config.script.language;

  const forceCompileStyles =
    (config.processors.postcss.tailwindcss || config.processors.postcss.windicss) &&
    (markupContent !== getCache().markup.content || scriptContent !== getCache().script.content);

  const compiledMarkup = await compiler.compile(markupContent, markupLanguage, config, {});
  const [compiledStyle, compiledScript] = await Promise.all([
    compiler.compile(styleContent, styleLanguage, config, {
      html: compiledMarkup,
      forceCompile: forceCompileStyles,
    }),
    compiler.compile(scriptContent, scriptLanguage, config, {
      blockly:
        scriptLanguage === 'blockly'
          ? ((await customEditors.blockly?.getContent({
              baseUrl,
              editors,
              config: getConfig(),
              html: compiledMarkup,
              eventsManager,
            })) as BlocklyContent)
          : {},
    }),
  ]);

  const compiledCode: Cache = {
    ...contentConfig,
    markup: {
      ...contentConfig.markup,
      compiled: compiledMarkup,
    },
    style: {
      ...contentConfig.style,
      compiled: compiledStyle,
    },
    script: {
      ...contentConfig.script,
      compiled: cjs2esm(compiledScript),
    },
  };

  const result = createResultPage(compiledCode, config, forExport, template, baseUrl, singleFile);

  const styleOnlyUpdate = sourceEditor === 'style';
  setCache({
    ...getCache(),
    ...compiledCode,
    result,
    styleOnlyUpdate,
  });

  return result;
};

const setLoading = (status: boolean) => {
  const loading = UI.getToolspaneLoader();
  if (!loading) return;
  if (status === true) {
    loading.style.display = 'unset';
  } else {
    loading.style.display = 'none';
  }
};

const setProjectTitle = (setDefault = false) => {
  const projectTitle = UI.getProjectTitleElement();
  if (!projectTitle) return;
  const defaultTitle = defaultConfig.title;
  if (setDefault && projectTitle.textContent?.trim() === '') {
    projectTitle.textContent = defaultTitle;
  }
  const title = projectTitle.textContent || defaultTitle;
  setConfig({ ...getConfig(), title });
  if (getConfig().autosave) {
    save(!projectId, false);
  }
  setWindowTitle();
  setSavedStatus();
};

const setWindowTitle = () => {
  const title = getConfig().title;
  const hostLabel = location.hostname.startsWith('dev.livecodes.io')
    ? '(dev) '
    : location.hostname.startsWith('127.0.0.1') || location.hostname.startsWith('localhost')
    ? '(local) '
    : '';
  parent.document.title =
    hostLabel + (title && title !== 'Untitled Project' ? title + ' - ' : '') + 'LiveCodes';
};

const setExternalResourcesMark = () => {
  const mark = UI.getExternalResourcesMark();
  const btn = UI.getExternalResourcesBtn();
  if (getConfig().scripts.length > 0 || getConfig().stylesheets.length > 0) {
    mark.classList.add('active');
    btn.style.display = 'unset';
  } else {
    mark.classList.remove('active');
    if (isEmbed) {
      btn.style.display = 'none';
    }
  }
};

const run = async (editorId?: EditorId) => {
  setLoading(true);
  const result = await getResultPage({ sourceEditor: editorId });
  await createIframe(UI.getResultElement(), result);
  updateCompiledCode();
};

const updateUrl = (url: string, push = false) => {
  if (push) {
    parent.history.pushState(null, '', url);
  } else {
    parent.history.replaceState(null, '', url);
  }
};

const format = async () => {
  await Promise.all([editors.markup.format(), editors.style.format(), editors.script.format()]);
  updateConfig();
};

const save = async (notify = false, setTitle = true) => {
  if (setTitle) {
    setProjectTitle(true);
  }

  if (editors && getConfig().formatOnsave) {
    await format();
  }

  if (!projectId) {
    projectId = await projectStorage.addItem(getConfig());
  } else {
    await projectStorage.updateItem(projectId, getConfig());
  }
  await setSavedStatus();

  if (notify) {
    notifications.success('Project locally saved to device!');
  }
  await share();
};

const fork = async () => {
  projectId = '';
  loadConfig({ ...getConfig(), title: getConfig().title + ' (fork)' });
  await save();
  notifications.success('Forked as a new project');
};

const share = async (
  shortUrl = false,
  contentOnly = true,
  urlUpdate = true,
): Promise<ShareData> => {
  const content = contentOnly ? getContentConfig(getConfig()) : getConfig();
  const contentHash = shortUrl
    ? '#id/' + (await shareService.shareProject(content))
    : '#code/' + compress(JSON.stringify(content));
  const url = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';
  const shareURL = url + contentHash;
  if (urlUpdate) {
    updateUrl(shareURL, true);
  }
  const projectTitle = content.title !== defaultConfig.title ? content.title + ' - ' : '';
  return {
    title: projectTitle + 'LiveCodes',
    url: shareURL,
  };
};

const updateConfig = () => {
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  editorIds.forEach((editorId) => {
    setConfig({
      ...getConfig(),
      [editorId]: {
        ...getConfig()[editorId],
        language: getEditorLanguage(editorId),
        content: editors[editorId].getValue(),
      },
    });
  });
};

const loadConfig = async (newConfig: Config | ContentConfig, url?: string, flush = true) => {
  changingContent = true;

  const content = getContentConfig({
    ...defaultConfig,
    ...upgradeAndValidate(newConfig),
  });
  setConfig({
    ...getConfig(),
    ...content,
  });
  setProjectRestore();

  // flush result page
  if (flush) {
    createIframe(UI.getResultElement(), '<!-- flush -->');
  }

  // load title
  const projectTitle = UI.getProjectTitleElement();
  projectTitle.textContent = getConfig().title;
  setWindowTitle();

  // reset url params
  updateUrl(url || location.origin + location.pathname, true);

  // load config
  await bootstrap(true);

  changingContent = false;
};

const setUserConfig = (newConfig: Partial<UserConfig> | null) => {
  const userConfig = getUserConfig({
    ...getConfig(),
    ...(newConfig == null ? getUserConfig(defaultConfig) : newConfig),
  });

  setConfig({
    ...getConfig(),
    ...userConfig,
  });
  userConfigStorage.setValue(userConfig);
};

const loadUserConfig = () => {
  const userConfig = userConfigStorage.getValue();
  if (!userConfig) {
    setUserConfig(getUserConfig(getConfig()));
    return;
  }
  setConfig({
    ...getConfig(),
    ...userConfig,
  });
};

const setSavedStatus = async () => {
  if (isEmbed) return;
  updateConfig();
  const savedConfig = projectId && (await projectStorage.getItem(projectId || ''))?.config;
  isSaved =
    changingContent ||
    !!(
      savedConfig &&
      JSON.stringify(getContentConfig(savedConfig)) ===
        JSON.stringify(getContentConfig(getConfig()))
    );

  const projectTitle = UI.getProjectTitleElement();
  if (!isSaved) {
    projectTitle.classList.add('unsaved');
    setProjectRestore();
  } else {
    projectTitle.classList.remove('unsaved');
    setProjectRestore(true);
  }
};

const checkSavedStatus = (doNotCloseModal = false) => {
  if (isSaved || isEmbed) {
    return Promise.resolve('is saved');
  }
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.innerHTML = savePromptScreen;
    modal.show(div.firstChild as HTMLElement, { size: 'small' });
    eventsManager.addEventListener(UI.getModalSaveButton(), 'click', async () => {
      await save(true);
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve('save');
    });
    eventsManager.addEventListener(UI.getModalDoNotSaveButton(), 'click', () => {
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve('do not save');
    });
    eventsManager.addEventListener(UI.getModalCancelButton(), 'click', () => {
      modal.close();
      resolve('cancel');
    });
  });
};

const checkSavedAndExecute = (fn: () => void) => async () => {
  checkSavedStatus(true).then(() => setTimeout(fn));
};

const setProjectRestore = (reset = false) => {
  if (isEmbed) return;
  restoreStorage.clear();
  if (reset || !getConfig().enableRestore) return;
  restoreStorage.setValue({
    config: getContentConfig(getConfig()),
    lastModified: Date.now(),
  });
};

const checkRestoreStatus = () => {
  if (!getConfig().enableRestore || isEmbed) {
    return Promise.resolve('restore disabled');
  }
  const unsavedItem = restoreStorage.getValue();
  const unsavedProject = unsavedItem?.config;
  if (!unsavedItem || !unsavedProject) {
    return Promise.resolve('no unsaved project');
  }
  const projectName = unsavedProject.title;
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.innerHTML = restorePromptScreen;
    modal.show(div.firstChild as HTMLElement, { size: 'small', isAsync: true });
    UI.getModalUnsavedName().innerHTML = projectName;
    UI.getModalUnsavedLastModified().innerHTML = new Date(
      unsavedItem.lastModified,
    ).toLocaleString();
    const disableRestoreCheckbox = UI.getModalDisableRestoreCheckbox();

    const setRestoreConfig = (enableRestore: boolean) => {
      setUserConfig({ enableRestore });
      loadSettings(getConfig());
    };

    eventsManager.addEventListener(UI.getModalRestoreButton(), 'click', async () => {
      await loadConfig(unsavedProject);
      await setSavedStatus();
      setRestoreConfig(!disableRestoreCheckbox.checked);
      modal.close();
      resolve('restore');
    });
    eventsManager.addEventListener(UI.getModalSavePreviousButton(), 'click', async () => {
      await projectStorage.addItem(unsavedProject);
      notifications.success(`Project "${projectName}" saved to device.`);
      setRestoreConfig(!disableRestoreCheckbox.checked);
      modal.close();
      setProjectRestore(true);
      resolve('save and continue');
    });
    eventsManager.addEventListener(UI.getModalCancelRestoreButton(), 'click', () => {
      setRestoreConfig(!disableRestoreCheckbox.checked);
      modal.close();
      setProjectRestore(true);
      resolve('cancel restore');
    });
  });
};

const configureEmmet = async (config: Config) => {
  if (shouldUpdateEditorBuild()) {
    await reloadEditors(getConfig());
  }
  [editors.markup, editors.style].forEach((editor, editorIndex) => {
    if (editor.monaco && editorIndex > 0) return; // emmet configuration for monaco is global
    editor.configureEmmet?.(config.emmet);
  });
};

const getTemplates = async (): Promise<Template[]> => {
  if (starterTemplates) {
    return starterTemplates;
  }
  starterTemplates = await getStarterTemplates(getConfig(), baseUrl);
  return starterTemplates;
};

const initializeAuth = async () => {
  /** Lazy load authentication */
  if (authService) return;
  authService = createAuthService();
  const user = await authService.getUser();
  if (user) {
    UI.displayLoggedIn(user);
  }
};

const login = async () =>
  new Promise<User | void>((resolve, reject) => {
    const loginHandler = (scopes: GithubScope[]) => {
      if (!authService) {
        reject('Login error!');
      } else {
        authService
          .signIn(scopes)
          .then((user) => {
            if (!user) {
              reject('Login error!');
            } else {
              const displayName = user.displayName || user.username;
              const loginSuccessMessage = displayName
                ? 'Logged in as: ' + displayName
                : 'Logged in successfully';
              notifications.success(loginSuccessMessage);
              UI.displayLoggedIn(user);
              resolve(user);
            }
          })
          .catch(() => {
            notifications.error('Login error!');
          });
      }
      modal.close();
    };

    const loginContainer = UI.createLoginContainer(eventsManager, loginHandler);
    modal.show(loginContainer, { size: 'small' });
  }).catch(() => {
    notifications.error('Login error!');
  });

const logout = () => {
  if (!authService) return;
  authService
    .signOut()
    .then(() => {
      notifications.success('Logged out successfully');
      UI.displayLoggedOut();
    })
    .catch(() => {
      notifications.error('Logout error!');
    });
};

const getUser = async (fn?: () => void) => {
  let user = await authService?.getUser();
  if (!user) {
    user = await login();
    if (typeof fn === 'function') {
      fn();
    }
  }
  return user;
};

const registerScreen = (screen: Screen['screen'], fn: Screen['show']) => {
  const registered = screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase());
  if (registered) {
    registered.show = fn;
  } else {
    screens.push({ screen: screen.toLowerCase() as Screen['screen'], show: fn });
  }
};

const showScreen = async (screen: Screen['screen'], options?: any) => {
  await screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase())?.show(options);
  const modalElement = document.querySelector('#modal') as HTMLElement;
  (modalElement.firstElementChild as HTMLElement)?.click();
};

const loadSelectedScreen = () => {
  const params = Object.fromEntries(
    (new URLSearchParams(parent.location.search) as unknown) as Iterable<any>,
  );
  const screen = params.screen;
  if (screen) {
    showScreen(screen);
  }
};

const getAllEditors = (): CodeEditor[] => [
  ...Object.values(editors),
  ...[toolsPane?.console.getEditor()],
  ...[toolsPane?.compiled.getEditor()],
];

const setTheme = (theme: Theme) => {
  const themes = ['light', 'dark'];
  const root = document.querySelector(':root');
  root?.classList.remove(...themes);
  root?.classList.add(theme);
  getAllEditors().forEach((editor) => {
    editor?.setTheme(theme);
    customEditors[editor?.getLanguage()]?.setTheme(theme);
  });
};

const loadSettings = (config: Config) => {
  const processorToggles = UI.getProcessorToggles();
  processorToggles.forEach((toggle) => {
    const plugin = toggle.dataset.plugin as PluginName;
    if (!plugin) return;
    toggle.checked = config.processors.postcss[plugin] || false;
  });

  if (isEmbed) return;

  const autoupdateToggle = UI.getAutoupdateToggle();
  autoupdateToggle.checked = config.autoupdate;

  const autosaveToggle = UI.getAutosaveToggle();
  autosaveToggle.checked = config.autosave;

  const formatOnsaveToggle = UI.getFormatOnsaveToggle();
  formatOnsaveToggle.checked = config.formatOnsave;

  const emmetToggle = UI.getEmmetToggle();
  emmetToggle.checked = config.emmet;

  const themeToggle = UI.getThemeToggle();
  themeToggle.checked = config.theme === 'dark';

  const restoreToggle = UI.getRestoreToggle();
  restoreToggle.checked = config.enableRestore;

  UI.getCSSPresetLinks().forEach((link) => {
    link.classList.remove('active');
    if (config.cssPreset === link.dataset.preset) {
      link.classList.add('active');
    }
    if (!config.cssPreset && link.dataset.preset === 'none') {
      link.classList.add('active');
    }
  });
};

const showLanguageInfo = (languageInfo: HTMLElement) => {
  modal.show(languageInfo, { size: 'small' });
};

const loadStarterTemplate = async (templateName: string) => {
  const templates = await getTemplates();
  const template = templates.filter((template) => template.name === templateName)?.[0];
  if (template) {
    checkSavedAndExecute(() => {
      loadConfig(
        {
          ...defaultConfig,
          ...template,
        },
        '?template=' + templateName,
      );
    })().finally(() => {
      modal.close();
    });
  } else {
    notifications.error('Failed loading template');
  }
};

const showVersion = () => {
  if (getConfig().showVersion) {
    // variables added in scripts/build.js
    const version = process.env.VERSION || '';
    const commitSHA = process.env.GIT_COMMIT || '';
    const repoUrl = process.env.REPO_URL || '';

    // eslint-disable-next-line no-console
    console.log(`Version: ${version} (${repoUrl}/releases/tag/v${version})`);
    // eslint-disable-next-line no-console
    console.log(`Git commit: ${commitSHA} (${repoUrl}/commit/${commitSHA})`);
  }
};

const resizeEditors = () => {
  Object.values(editors).forEach((editor: CodeEditor) => {
    setTimeout(() => {
      if (editor.layout) {
        editor.layout(); // resize monaco editor
      }
    });
  });
};

const handleTitleEdit = () => {
  const projectTitle = UI.getProjectTitleElement();
  if (!projectTitle) return;
  projectTitle.textContent = getConfig().title || defaultConfig.title;

  setWindowTitle();

  eventsManager.addEventListener(projectTitle, 'input', () => setProjectTitle(), false);
  eventsManager.addEventListener(projectTitle, 'blur', () => setProjectTitle(true), false);
  eventsManager.addEventListener(
    projectTitle,
    'keypress',
    ((e: KeyboardEvent) => {
      if ((e as KeyboardEvent).which === 13) {
        /* Enter */
        (e as KeyboardEvent).preventDefault();
        projectTitle.blur();
      }
    }) as any,
    false,
  );
};

const handleResize = () => {
  resizeEditors();
  eventsManager.addEventListener(window, 'resize', resizeEditors, false);
  eventsManager.addEventListener(window, 'editor-resize', resizeEditors, false);
};

const handleIframeResize = () => {
  const gutter = UI.getGutterElement();
  const sizeLabel = document.createElement('div');
  sizeLabel.id = 'size-label';
  gutter.appendChild(sizeLabel);

  const hideLabel = debounce(() => {
    setTimeout(() => {
      sizeLabel.classList.remove('visible');
      setTimeout(() => {
        sizeLabel.style.display = 'none';
      }, 100);
    }, 1000);
  }, 1000);

  eventsManager.addEventListener(window, 'message', (event: any) => {
    const iframe = UI.getResultIFrameElement();
    if (
      !sizeLabel ||
      !iframe ||
      event.source !== iframe.contentWindow ||
      event.data.type !== 'resize'
    ) {
      return;
    }

    const sizes = event.data.sizes;
    sizeLabel.innerHTML = `${sizes.width} x ${sizes.height}`;
    sizeLabel.style.display = 'block';
    sizeLabel.classList.add('visible');
    hideLabel();
  });
};

const handleSelectEditor = () => {
  UI.getEditorTitles().forEach((title) => {
    eventsManager.addEventListener(
      title,
      'click',
      () => {
        showEditor(title.dataset.editor as EditorId);
        setProjectRestore();
      },
      false,
    );
  });
};

const handlechangeLanguage = () => {
  if (getConfig().allowLangChange) {
    UI.getLanguageMenuLinks().forEach((menuItem) => {
      eventsManager.addEventListener(
        menuItem,
        'mousedown', // fire this event before unhover
        async () => {
          await changeLanguage(menuItem.dataset.lang as Language);
        },
        false,
      );
    });
  } else {
    UI.getLanguageMenuButtons().forEach((menuButton) => {
      menuButton.style.display = 'none';
    });
  }
};

const handleChangeContent = () => {
  const contentChanged = async (editorId: EditorId, loading: boolean) => {
    updateConfig();
    addConsoleInputCodeCompletion();

    if (getConfig().autoupdate && !loading) {
      await run(editorId);
    }

    if (getConfig().markup.content !== getCache().markup.content) {
      await getResultPage({ sourceEditor: editorId });
    }

    for (const key of Object.keys(customEditors)) {
      if (getConfig()[editorId].language === key) {
        await customEditors[key]?.show(true, {
          baseUrl,
          editors,
          config: getConfig(),
          html: getCache().markup.compiled || getConfig().markup.content || '',
          eventsManager,
        });
      }
    }

    if (getConfig().autosave) {
      await save();
    }

    loadModuleTypes(editors, getConfig());
  };
  const debouncecontentChanged = (editorId: EditorId) =>
    debounce(async () => {
      await contentChanged(editorId, changingContent);
    }, getConfig().delay ?? defaultConfig.delay);

  (Object.keys(editors) as EditorId[]).forEach((editorId) => {
    editors[editorId].onContentChanged(debouncecontentChanged(editorId));
    editors[editorId].onContentChanged(setSavedStatus);
  });
};

const handleHotKeys = () => {
  const ctrl = (e: KeyboardEvent) => (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey);
  const hotKeys = async (e: KeyboardEvent) => {
    if (!e) return;

    // Cmd + p opens the command palette
    const activeEditor = getActiveEditor();
    if (ctrl(e) && e.keyCode === 80 && activeEditor.monaco) {
      e.preventDefault();
      activeEditor.monaco.trigger('anyString', 'editor.action.quickCommand');
      return;
    }

    // Cmd + d prevents browser bookmark dialog
    if (ctrl(e) && e.keyCode === 68) {
      e.preventDefault();
      return;
    }

    if (isEmbed) return;

    // Cmd + Shift + S forks the project (save as...)
    if (ctrl(e) && e.shiftKey && e.keyCode === 83) {
      e.preventDefault();
      await fork();
      return;
    }

    // Cmd + S saves the project
    if (ctrl(e) && e.keyCode === 83) {
      e.preventDefault();
      await save(true);
      return;
    }
  };

  eventsManager.addEventListener(window, 'keydown', hotKeys as any, true);
};

const handleRunButton = () => {
  const handleRun = async () => {
    split.show('output');
    await run();
  };
  eventsManager.addEventListener(UI.getRunButton(), 'click', handleRun);
  eventsManager.addEventListener(UI.getCodeRunButton(), 'click', handleRun);
};

const handleResultButton = () => {
  eventsManager.addEventListener(UI.getResultButton(), 'click', () => split.show('output', true));
};

const handleEditorTools = () => {
  if (!configureEditorTools(getActiveEditor().getLanguage())) return;

  eventsManager.addEventListener(UI.getCopyButton(), 'click', () => {
    if (copyToClipboard(getActiveEditor().getValue())) {
      notifications.success('Code copied to clipboard');
    } else {
      notifications.error('Failed to copy code');
    }
  });

  eventsManager.addEventListener(UI.getUndoButton(), 'click', () => {
    getActiveEditor().undo();
  });

  eventsManager.addEventListener(UI.getRedoButton(), 'click', () => {
    getActiveEditor().redo();
  });

  eventsManager.addEventListener(UI.getFormatButton(), 'click', () => {
    getActiveEditor().format();
  });
};

const handleProcessors = () => {
  const styleMenu = UI.getstyleMenu();
  const pluginList = pluginSpecs
    .filter((plugin) => !plugin.hidden)
    .map((plugin) => ({ name: plugin.name, title: plugin.title }));
  if (!styleMenu || pluginList.length === 0 || !processorIsEnabled('postcss', getConfig())) {
    return;
  }

  pluginList.forEach((plugin) => {
    const pluginItem = UI.createPluginItem(plugin);
    styleMenu.append(pluginItem);
    eventsManager.addEventListener(
      pluginItem,
      'mousedown',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const toggle = pluginItem.querySelector<HTMLInputElement>('input');
        if (!toggle) return;
        toggle.checked = !toggle.checked;

        const pluginName = toggle.dataset.plugin;
        if (!pluginName || !(pluginName in getConfig().processors.postcss)) return;
        setConfig({
          ...getConfig(),
          processors: {
            ...getConfig().processors,
            postcss: {
              ...getConfig().processors.postcss,
              [pluginName]: toggle.checked,
            },
          },
        });
        await run();
      },
      false,
    );

    eventsManager.addEventListener(pluginItem, 'click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });
};

const handleSettingsMenu = () => {
  const menuContainer = UI.getSettingsMenuScroller();
  const settingsButton = UI.getSettingsButton();
  if (!menuContainer || !settingsButton) return;
  menuContainer.innerHTML = settingsMenuHTML;

  // This fixes the behaviour where :
  // clicking outside the settings menu but inside settings menu container,
  // hides the settings menu but not the container
  // on small screens the conatiner covers most of the screen
  // which gives the effect of a non-responsive app
  eventsManager.addEventListener(menuContainer, 'mousedown', (event) => {
    if (event.target === menuContainer) {
      menuContainer.classList.add('hidden');
    }
  });
  eventsManager.addEventListener(settingsButton, 'mousedown', () => {
    menuContainer.classList.remove('hidden');
  });
};

const handleSettings = () => {
  const toggles = UI.getSettingToggles();
  toggles.forEach((toggle) => {
    eventsManager.addEventListener(toggle, 'change', async () => {
      const configKey = toggle.dataset.config;
      if (!configKey || !(configKey in getConfig())) return;

      if (configKey === 'theme') {
        setConfig({ ...getConfig(), theme: toggle.checked ? 'dark' : 'light' });
        setTheme(getConfig().theme);
      } else {
        setConfig({ ...getConfig(), [configKey]: toggle.checked });
      }
      setUserConfig(getUserConfig(getConfig()));

      if (configKey === 'autoupdate' && getConfig()[configKey]) {
        await run();
      }
      if (configKey === 'emmet') {
        await configureEmmet(getConfig());
      }
      if (configKey === 'enableRestore') {
        setUserConfig({
          enableRestore: toggle.checked,
        });
        setProjectRestore();
      }
    });
  });

  const cssPresets = UI.getCssPresetLinks();
  cssPresets.forEach((link) => {
    eventsManager.addEventListener(
      link,
      'click',
      async (event: Event) => {
        event.preventDefault();
        setConfig({
          ...getConfig(),
          cssPreset: link.dataset.preset as CssPresetId,
        });
        cssPresets.forEach((preset) => {
          preset.classList.remove('active');
        });
        link.classList.add('active');
        await run();
      },
      false,
    );
  });
};

const handleLogin = () => {
  eventsManager.addEventListener(UI.getLoginLink(), 'click', login, false);
  registerScreen('login', login);
};

const handleLogout = () => {
  eventsManager.addEventListener(UI.getLogoutLink(), 'click', logout, false);
};

const handleNew = () => {
  const templatesContainer = UI.createTemplatesContainer(eventsManager, () => loadUserTemplates());
  const userTemplatesScreen = UI.getUserTemplatesScreen(templatesContainer);
  const noDataMessage = templatesContainer.querySelector('.no-data');

  const loadUserTemplates = async () => {
    const userTemplates = await templateStorage.getList();

    if (userTemplates.length === 0) {
      userTemplatesScreen.innerHTML = UI.noUserTemplates;
      return;
    }
    userTemplatesScreen.innerHTML = '';

    const list = document.createElement('ul') as HTMLElement;
    list.classList.add('open-list');
    userTemplatesScreen.appendChild(list);

    userTemplates.forEach((item) => {
      const { link, deleteButton } = createOpenItem(
        item,
        list,
        getLanguageTitle,
        getLanguageByAlias,
        true,
      );

      eventsManager.addEventListener(
        link,
        'click',
        async (event) => {
          event.preventDefault();
          const itemId = (link as HTMLElement).dataset.id || '';
          const template = (await templateStorage.getItem(itemId))?.config;
          if (template) {
            await loadConfig({
              ...template,
              title: defaultConfig.title,
            });
            projectId = '';
          }
          modal.close();
        },
        false,
      );

      eventsManager.addEventListener(
        deleteButton,
        'click',
        async () => {
          await templateStorage.deleteItem(item.id);
          const li = deleteButton.parentElement as HTMLElement;
          li.classList.add('hidden');
          setTimeout(async () => {
            li.style.display = 'none';
            if ((await templateStorage.getList()).length === 0 && noDataMessage) {
              list.remove();
              userTemplatesScreen.appendChild(noDataMessage);
            }
          }, 500);
        },
        false,
      );
    });
  };

  let starterTemplatesCache: Template[];
  const createTemplatesUI = async () => {
    const starterTemplatesList = UI.getStarterTemplatesList(templatesContainer);
    const loadingText = starterTemplatesList?.firstElementChild;
    if (!starterTemplatesCache) {
      getTemplates()
        .then((starterTemplates) => {
          starterTemplatesCache = starterTemplates;
          loadingText?.remove();
          starterTemplates.forEach((template) => {
            const link = UI.createStarterTemplateLink(template, starterTemplatesList, baseUrl);
            eventsManager.addEventListener(
              link,
              'click',
              (event) => {
                event.preventDefault();
                const { title, thumbnail, ...templateConfig } = template;
                projectId = '';
                loadConfig(
                  {
                    ...defaultConfig,
                    ...templateConfig,
                  },
                  location.origin + location.pathname + '?template=' + template.name,
                );
                modal.close();
              },
              false,
            );
          });
        })
        .catch(() => {
          loadingText?.remove();
          notifications.error('Failed loading starter templates');
        });
    }

    setTimeout(() => UI.getStarterTemplatesTab(templatesContainer)?.click());
    modal.show(templatesContainer, { isAsync: true });
  };

  eventsManager.addEventListener(
    UI.getNewLink(),
    'click',
    checkSavedAndExecute(createTemplatesUI),
    false,
  );

  registerScreen('new', checkSavedAndExecute(createTemplatesUI));
};

const handleSave = () => {
  eventsManager.addEventListener(UI.getSaveLink(), 'click', async (event) => {
    (event as Event).preventDefault();
    await save(true);
  });
};

const handleFork = () => {
  eventsManager.addEventListener(UI.getForkLink(), 'click', async (event) => {
    (event as Event).preventDefault();
    await fork();
  });
};

const handleSaveAsTemplate = () => {
  eventsManager.addEventListener(UI.getSaveAsTemplateLink(), 'click', async (event) => {
    (event as Event).preventDefault();
    await templateStorage.addItem(getConfig());
    notifications.success('Saved as a new template');
  });
};

const handleOpen = () => {
  const createList = async () => {
    modal.show(UI.loadingMessage());

    const openModule: typeof import('./UI/open') = await import(baseUrl + 'open.js');
    await openModule.createSavedProjectsList({
      eventsManager,
      getContentConfig,
      getProjectId: () => projectId,
      loadConfig,
      modal,
      notifications,
      projectStorage,
      setProjectId: (id: string) => (projectId = id),
      showScreen,
      languages,
      getLanguageTitle,
      getLanguageByAlias,
    });
  };

  eventsManager.addEventListener(
    UI.getOpenLink(),
    'click',
    checkSavedAndExecute(createList),
    false,
  );
  registerScreen('open', checkSavedAndExecute(createList));
};

const handleImport = () => {
  const createImportUI = () => {
    const importContainer = UI.createImportContainer(eventsManager);

    const importForm = UI.getUrlImportForm(importContainer);
    const importButton = UI.getUrlImportButton(importContainer);
    eventsManager.addEventListener(importForm, 'submit', async (e) => {
      e.preventDefault();
      const buttonText = importButton.innerHTML;
      importButton.innerHTML = 'Loading...';
      importButton.disabled = true;
      const importInput = UI.getUrlImportInput(importContainer);
      const url = importInput.value;
      const imported = await importCode(url, {}, defaultConfig, await authService?.getUser());
      if (imported && Object.keys(imported).length > 0) {
        await loadConfig(
          {
            ...defaultConfig,
            ...imported,
          },
          location.origin + location.pathname + '#' + url,
        );
        modal.close();
      } else {
        importButton.innerHTML = buttonText;
        importButton.disabled = false;
        notifications.error('failed to load URL');
        importInput.focus();
      }
    });

    const importJsonUrlForm = UI.getImportJsonUrlForm(importContainer);
    const importJsonUrlButton = UI.getImportJsonUrlButton(importContainer);
    eventsManager.addEventListener(importJsonUrlForm, 'submit', async (e) => {
      e.preventDefault();
      const buttonText = importJsonUrlButton.innerHTML;
      importJsonUrlButton.innerHTML = 'Loading...';
      importJsonUrlButton.disabled = true;
      const importInput = UI.getImportJsonUrlInput(importContainer);
      const url = importInput.value;
      fetchWithHandler(url)
        .then((res) => res.json())
        .then((fileConfig) =>
          loadConfig(fileConfig, location.origin + location.pathname + '?config=' + url),
        )
        .then(() => modal.close())
        .catch(() => {
          importJsonUrlButton.innerHTML = buttonText;
          importJsonUrlButton.disabled = false;
          notifications.error('Error: failed to load URL');
          importInput.focus();
        });
    });

    const bulkImportJsonUrlForm = UI.getBulkImportJsonUrlForm(importContainer);
    const bulkimportJsonUrlButton = UI.getBulkImportJsonUrlButton(importContainer);
    eventsManager.addEventListener(bulkImportJsonUrlForm, 'submit', async (e) => {
      e.preventDefault();
      const buttonText = bulkimportJsonUrlButton.innerHTML;
      bulkimportJsonUrlButton.innerHTML = 'Loading...';
      bulkimportJsonUrlButton.disabled = true;
      const importInput = UI.getBulkImportJsonUrlInput(importContainer);
      const url = importInput.value;
      fetchWithHandler(url)
        .then((res) => res.json())
        .then(insertItems)
        .catch(() => {
          bulkimportJsonUrlButton.innerHTML = buttonText;
          bulkimportJsonUrlButton.disabled = false;
          notifications.error('Error: failed to load URL');
          importInput.focus();
        });
    });

    const loadFile = <T>(input: HTMLInputElement) =>
      new Promise<T>((resolve, reject) => {
        if (input.files?.length === 0) return;

        const file = (input.files as FileList)[0];

        const allowedTypes = ['application/json', 'text/plain'];
        if (allowedTypes.indexOf(file.type) === -1) {
          reject('Error: Incorrect file type');
          return;
        }

        // Max 2 MB allowed
        const maxSizeAllowed = 2 * 1024 * 1024;
        if (file.size > maxSizeAllowed) {
          reject('Error: Exceeded size 2MB');
          return;
        }

        const reader = new FileReader();
        eventsManager.addEventListener(reader, 'load', async (event: any) => {
          const text = (event.target?.result as string) || '';
          try {
            resolve(JSON.parse(text));
          } catch (error) {
            reject('Invalid configuration file');
          }
        });

        eventsManager.addEventListener(reader, 'error', () => {
          reject('Error: Failed to read file');
        });

        reader.readAsText(file);
      });

    const insertItems = async (items: StorageItem[]) => {
      const getItemConfig = (item: StorageItem) => item.config || (item as any).pen; // for backward compatibility
      if (Array.isArray(items) && items.every(getItemConfig)) {
        await projectStorage.bulkInsert(items.map(getItemConfig));
        notifications.success('Import Successful!');
        showScreen('open');
        return;
      }
      return Promise.reject('Error: Invalid file');
    };

    const fileInput = UI.getImportFileInput(importContainer);
    eventsManager.addEventListener(fileInput, 'change', () => {
      loadFile<Config>(fileInput)
        .then(loadConfig)
        .then(modal.close)
        .catch((message) => {
          notifications.error(message);
        });
    });

    const bulkFileInput = UI.getBulkImportFileInput(importContainer);
    eventsManager.addEventListener(bulkFileInput, 'change', () => {
      loadFile<StorageItem[]>(bulkFileInput)
        .then(insertItems)
        .catch((message) => {
          notifications.error(message);
        });
    });

    const linkToSavedProjects = UI.getLinkToSavedProjects(importContainer);
    eventsManager.addEventListener(linkToSavedProjects, 'click', (e) => {
      e.preventDefault();
      showScreen('open');
    });

    modal.show(importContainer, { isAsync: true });
    UI.getUrlImportInput(importContainer).focus();
  };

  eventsManager.addEventListener(
    UI.getImportLink(),
    'click',
    checkSavedAndExecute(createImportUI),
    false,
  );
  registerScreen('import', checkSavedAndExecute(createImportUI));
};

const handleExport = () => {
  eventsManager.addEventListener(
    UI.getExportJSONLink(),
    'click',
    (event: Event) => {
      event.preventDefault();
      updateConfig();
      exportConfig(getConfig(), baseUrl, 'json');
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportResultLink(),
    'click',
    async (event: Event) => {
      event.preventDefault();
      updateConfig();
      exportConfig(getConfig(), baseUrl, 'html', await getResultPage({ forExport: true }));
    },
    false,
  );

  let JSZip: any;
  eventsManager.addEventListener(
    UI.getExportSourceLink(),
    'click',
    async (event: Event) => {
      event.preventDefault();
      updateConfig();
      const html = await getResultPage({ forExport: true });
      exportConfig(getConfig(), baseUrl, 'src', { JSZip, html });
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportCodepenLink(),
    'click',
    () => {
      updateConfig();
      exportConfig(getConfig(), baseUrl, 'codepen');
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportJsfiddleLink(),
    'click',
    () => {
      updateConfig();
      exportConfig(getConfig(), baseUrl, 'jsfiddle');
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportGithubGistLink(),
    'click',
    async () => {
      updateConfig();
      let user = await authService?.getUser();
      if (!user) {
        user = await login();
      }
      if (!user) return;
      notifications.info('Creating a public GitHub gist...');
      exportConfig(getConfig(), baseUrl, 'githubGist', { user });
    },
    false,
  );
};

const handleShare = () => {
  const createShareUI = async () => {
    const shareContainer = await UI.createShareContainer(share, baseUrl, eventsManager);
    modal.show(shareContainer, { size: 'small' });
  };
  eventsManager.addEventListener(
    UI.getShareLink(),
    'click',
    async (event: Event) => {
      event.preventDefault();
      await createShareUI();
    },
    false,
  );
  registerScreen('share', createShareUI);
};

const handleDeploy = () => {
  const createDeployUI = async () => {
    const user = await getUser();
    if (!user) {
      notifications.error('Authentication error!');
      return;
    }

    const deployContainer = UI.createDeployContainer(eventsManager);

    const newRepoForm = UI.getNewRepoForm(deployContainer);
    const newRepoButton = UI.getNewRepoButton(deployContainer);
    const newRepoNameInput = UI.getNewRepoNameInput(deployContainer);
    const newRepoNameError = UI.getNewRepoNameError(deployContainer);
    const newRepoMessageInput = UI.getNewRepoMessageInput(deployContainer);
    const newRepoCommitSource = UI.getNewRepoCommitSource(deployContainer);
    const existingRepoForm = UI.getExistingRepoForm(deployContainer);
    const existingRepoButton = UI.getExistingRepoButton(deployContainer);
    const existingRepoNameInput = UI.getExistingRepoNameInput(deployContainer);
    const existingRepoMessageInput = UI.getExistingRepoMessageInput(deployContainer);
    const existingRepoCommitSource = UI.getExistingRepoCommitSource(deployContainer);

    const publish = async (
      user: User,
      repo: string,
      message: string,
      commitSource: boolean,
      newRepo: boolean,
    ) => {
      const forExport = true;
      const singleFile = false;
      newRepoNameError.innerHTML = '';

      const resultHtml = await getResultPage({
        forExport,
        template: resultTemplate,
        singleFile,
      });
      const cache = getCache();
      const deployResult = await deploy({
        user,
        repo,
        config: getContentConfig(getConfig()),
        content: {
          resultPage: resultHtml,
          style: cache.style.compiled || '',
          script: cache.script.compiled || '',
        },
        message,
        commitSource,
        singleFile,
        newRepo,
      }).catch((error) => {
        if (error.message === 'Repo name already exists') {
          newRepoNameError.innerHTML = error.message;
        }
      });

      if (newRepoNameError.innerHTML !== '') {
        return false;
      } else if (deployResult) {
        const confirmationContianer = deployedConfirmation(deployResult, commitSource);
        modal.show(confirmationContianer, { size: 'small', closeButton: true });
        return true;
      } else {
        modal.close();
        notifications.error('Deployment failed!');
        return true;
      }
    };

    eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
      e.preventDefault();
      if (!user) return;

      const name = newRepoNameInput.value;
      const message = newRepoMessageInput.value;
      const commitSource = newRepoCommitSource.checked;
      const newRepo = true;
      if (!name) {
        notifications.error('Repo name is required');
        return;
      }

      newRepoButton.innerHTML = 'Deploying...';
      newRepoButton.disabled = true;

      const result = await publish(user, name, message, commitSource, newRepo);
      if (!result) {
        newRepoButton.innerHTML = 'Deploy';
        newRepoButton.disabled = false;
      }
    });

    eventsManager.addEventListener(existingRepoForm, 'submit', async (e) => {
      e.preventDefault();
      if (!user) return;

      const name = existingRepoNameInput.value;
      const message = existingRepoMessageInput.value;
      const commitSource = existingRepoCommitSource.checked;
      const newRepo = false;
      if (!name) {
        notifications.error('Repo name is required');
        return;
      }

      existingRepoButton.innerHTML = 'Deploying...';
      existingRepoButton.disabled = true;

      await publish(user, name, message, commitSource, newRepo);
    });

    let autoComplete: any;
    import(autoCompleteUrl).then(async () => {
      autoComplete = (globalThis as any).autoComplete;

      if (!user) return;
      const publicRepos = await getUserPublicRepos(user);

      eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
        existingRepoNameInput.focus();
      });

      const inputSelector = '#' + existingRepoNameInput.id;
      if (!document.querySelector(inputSelector)) return;
      const autoCompleteJS = new autoComplete({
        selector: inputSelector,
        placeHolder: 'Search your public repos...',
        data: {
          src: publicRepos,
        },
        resultItem: {
          highlight: {
            render: true,
          },
        },
      });

      eventsManager.addEventListener(autoCompleteJS.input, 'selection', function (event: any) {
        const feedback = event.detail;
        autoCompleteJS.input.blur();
        const selection = feedback.selection.value;
        autoCompleteJS.input.value = selection;
      });
    });

    modal.show(deployContainer);
    newRepoNameInput.focus();
  };

  eventsManager.addEventListener(UI.getDeployLink(), 'click', createDeployUI, false);
  registerScreen('deploy', createDeployUI);
};

const handleProjectInfo = () => {
  const onSave = (title: string, description: string, tags: string[]) => {
    setConfig({
      ...getConfig(),
      title,
      description,
      tags,
    });
    save(!projectId, true);
  };
  const createProjectInfoUI = () =>
    UI.createProjectInfoUI(getConfig(), projectStorage, modal, eventsManager, onSave);

  eventsManager.addEventListener(UI.getProjectInfoLink(), 'click', createProjectInfoUI, false);
  registerScreen('info', createProjectInfoUI);
};

const handleAssets = () => {
  let assetsModule: typeof import('./UI/assets');
  const loadModule = async () => {
    modal.show(UI.loadingMessage());
    assetsModule = assetsModule || (await import(baseUrl + 'assets.js'));
  };

  const createList = async () => {
    await loadModule();
    await assetsModule.createAssetsList({
      eventsManager,
      modal,
      notifications,
      assetsStorage,
      showScreen,
      baseUrl,
    });
  };

  const createAddAsset = async (activeTab: number) => {
    await loadModule();
    const deployAsset = async (user: User, file: GitHubFile) => deployFile({ user, file });
    modal.show(
      assetsModule.createAddAssetContainer({
        eventsManager,
        notifications,
        assetsStorage,
        showScreen,
        deployAsset,
        getUser,
        baseUrl,
        activeTab,
      }),
      {
        isAsync: true,
      },
    );
  };

  eventsManager.addEventListener(UI.getAssetsLink(), 'click', createList, false);
  registerScreen('assets', createList);
  registerScreen('add-asset', (tab: number) => {
    setTimeout(() => createAddAsset(tab));
  });
};

const handleExternalResources = () => {
  const createExrenalResourcesUI = () => {
    const div = document.createElement('div');
    div.innerHTML = resourcesScreen;
    const resourcesContainer = div.firstChild as HTMLElement;
    modal.show(resourcesContainer);

    const externalResources = UI.getExternalResourcesTextareas();
    externalResources.forEach((textarea) => {
      const resourceContent = getConfig()[textarea.dataset.resource as 'stylesheets' | 'scripts'];
      textarea.value = resourceContent.length !== 0 ? resourceContent.join('\n') + '\n' : '';
    });

    externalResources[0]?.focus();

    eventsManager.addEventListener(UI.getLoadResourcesButton(), 'click', async () => {
      externalResources.forEach((textarea) => {
        const resource = textarea.dataset.resource as 'stylesheets' | 'scripts';
        setConfig({
          ...getConfig(),
          [resource]:
            textarea.value
              ?.split('\n')
              .map((x) => x.trim())
              .filter((x) => x !== '') || [],
        });
      });
      setExternalResourcesMark();
      await setSavedStatus();
      modal.close();
      await run();
    });
  };
  eventsManager.addEventListener(
    UI.getExternalResourcesLink(),
    'click',
    createExrenalResourcesUI,
    false,
  );
  eventsManager.addEventListener(
    UI.getExternalResourcesBtn(),
    'click',
    createExrenalResourcesUI,
    false,
  );
  registerScreen('external', createExrenalResourcesUI);
};

const handleCustomSettings = () => {
  const createCustomSettingsUI = async () => {
    const config = getConfig();
    // eslint-disable-next-line prefer-const
    let customSettingsEditor: CodeEditor | undefined;
    const div = document.createElement('div');
    div.innerHTML = customSettingsScreen;
    const customSettingsContainer = div.firstChild as HTMLElement;
    modal.show(customSettingsContainer, {
      onClose: () => {
        customSettingsEditor?.destroy();
      },
    });

    const options = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editor: config.editor,
      editorType: 'code' as EditorOptions['editorType'],
      editorBuild,
      container: UI.getCustomSettingsEditor(),
      language: 'json' as Language,
      value: stringify(getConfig().customSettings, true),
      theme: config.theme,
      isEmbed,
    };
    customSettingsEditor = await createEditor(options);
    customSettingsEditor.focus();

    eventsManager.addEventListener(UI.getLoadCustomSettingsButton(), 'click', async () => {
      let customSettings: any = {};
      const editorContent = customSettingsEditor?.getValue() || '{}';
      try {
        customSettings = JSON.parse(editorContent);
      } catch {
        try {
          customSettings = JSON.parse(stringToValidJson(editorContent));
        } catch {
          notifications.error('Failed parsing settings as JSON');
          return;
        }
      }
      if (customSettings !== getConfig().customSettings) {
        compiler.clearCache();
        setConfig({
          ...getConfig(),
          customSettings,
        });
        await setSavedStatus();
      }
      customSettingsEditor?.destroy();
      modal.close();
      await run();
    });
  };
  eventsManager.addEventListener(
    UI.getCustomSettingsLink(),
    'click',
    createCustomSettingsUI,
    false,
  );
  registerScreen('custom-settings', createCustomSettingsUI);
};

const handleResultLoading = () => {
  eventsManager.addEventListener(window, 'message', (event: any) => {
    const iframe = UI.getResultIFrameElement();
    if (!iframe || event.source !== iframe.contentWindow) {
      return;
    }
    if (event.data.type === 'loading') {
      setLoading(event.data.payload);
    }
    const language = event.data.payload?.language;
    if (event.data.type === 'compiled' && language && getEditorLanguages().includes(language)) {
      const editorId = getLanguageEditorId(language);
      if (!editorId) return;
      updateCache(editorId, language, event.data.payload.content || '');
      updateCompiledCode();
    }
  });
};

const handleUnload = () => {
  window.onbeforeunload = () => {
    if (!isSaved) {
      return 'Changes you made may not be saved.';
    } else {
      return;
    }
  };
};

const basicHandlers = () => {
  handleResize();
  handleIframeResize();
  handleSelectEditor();
  handlechangeLanguage();
  handleChangeContent();
  handleHotKeys();
  handleRunButton();
  handleResultButton();
  handleEditorTools();
  handleProcessors();
  handleResultLoading();
  handleExternalResources();
};

const extraHandlers = async () => {
  projectStorage = await createStorage('__livecodes_data__');
  templateStorage = await createStorage('__livecodes_templates__');
  assetsStorage = await createStorage('__livecodes_assets__');

  handleTitleEdit();
  handleSettingsMenu();
  handleSettings();
  handleProjectInfo();
  handleCustomSettings();
  handleLogin();
  handleLogout();
  handleNew();
  handleSave();
  handleFork();
  handleSaveAsTemplate();
  handleOpen();
  handleShare();
  handleImport();
  handleExport();
  handleDeploy();
  handleAssets();
  handleUnload();
};

const importExternalContent = async (options: {
  config?: Config;
  configUrl?: string;
  template?: string;
  url?: string;
}) => {
  const { config = defaultConfig, configUrl, template, url } = options;
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const hasContentUrls = (conf: Partial<Config>) =>
    editorIds.filter((editorId) => conf[editorId]?.contentUrl && !conf[editorId]?.content).length >
    0;

  if (!configUrl && !template && !url && !hasContentUrls(config)) return;

  const loadingMessage = document.createElement('div');
  loadingMessage.classList.add('modal-message');
  loadingMessage.innerHTML = 'Loading Project...';
  modal.show(loadingMessage, { size: 'small', isAsync: true });

  let importedConfig: Partial<Config> = {};

  if (configUrl) {
    importedConfig = upgradeAndValidate(
      await fetch(configUrl)
        .then((res) => res.json())
        .catch(() => ({})),
    );
    if (hasContentUrls(importedConfig)) {
      await importExternalContent({ config: { ...config, ...importedConfig } });
      return;
    }
  } else if (template) {
    importedConfig = upgradeAndValidate(await getTemplate(template, config, baseUrl));
  } else if (url) {
    // import code from hash: code / github / github gist / url html / ...etc
    let user;
    if (isGithub(url) && !isEmbed) {
      await initializeAuth();
      user = await authService?.getUser();
    }
    importedConfig = await importCode(url, getParams(), getConfig(), user);
  } else if (hasContentUrls(config)) {
    // load content from config contentUrl
    const editorsContent = await Promise.all(
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
    importedConfig = {
      markup: editorsContent[0],
      style: editorsContent[1],
      script: editorsContent[2],
    };
  }
  await loadConfig(
    {
      ...config,
      ...importedConfig,
    },
    parent.location.href,
    false,
  );

  modal.close();
};

const bootstrap = async (reload = false) => {
  if (reload) {
    await updateEditors(editors, getConfig());
  }
  phpHelper({ editor: editors.script });
  setLoading(true);
  await setActiveEditor(getConfig());
  loadSettings(getConfig());
  await configureEmmet(getConfig());
  if (!isEmbed) {
    setTimeout(() => getActiveEditor().focus());
  }
  setExternalResourcesMark();
  await toolsPane?.load();
  showMode(getConfig());
  updateCompiledCode();
  loadModuleTypes(editors, getConfig());
  compiler.load(Object.values(editorLanguages || {}), getConfig()).then(() => {
    setTimeout(run);
  });
  formatter.load(getEditorLanguages());
};

const initializeApp = async (
  options?: {
    config?: Partial<Config>;
    baseUrl?: string;
    isEmbed?: boolean;
  },
  initializeFn?: () => void | Promise<void>,
) => {
  const appConfig = options?.config ?? {};
  baseUrl = options?.baseUrl ?? '/livecodes/';
  isEmbed = options?.isEmbed ?? false;

  setConfig(buildConfig(appConfig, baseUrl));
  compiler = await getCompiler(getConfig(), baseUrl);
  formatter = getFormatter(getConfig(), baseUrl);
  customEditors = createCustomEditors(baseUrl);
  if (isEmbed || getConfig().mode === 'result') {
    configureEmbed(getConfig(), () => share(false, true, false), eventsManager);
  }
  loadUserConfig();
  createLanguageMenus(
    getConfig(),
    baseUrl,
    eventsManager,
    showLanguageInfo,
    loadStarterTemplate,
    importExternalContent,
  );
  shouldUpdateEditorBuild();
  await createEditors(getConfig());
  toolsPane = createToolsPane(getConfig(), baseUrl, editors, eventsManager, isEmbed);
  basicHandlers();

  await initializeFn?.();
  loadStyles();
  await createIframe(UI.getResultElement());
  await bootstrap();
  loadSelectedScreen();
  setTheme(getConfig().theme);
  if (!isEmbed) {
    initializeAuth();
    checkRestoreStatus();
  }
  const params = getParams(); // query string params
  importExternalContent({
    config: getConfig(),
    configUrl: params.config,
    template: params.template,
    url: parent.location.hash.substring(1),
  }).then(() => {
    if (isEmbed) {
      parent.dispatchEvent(new Event('livecodes-ready'));
    }
  });
  showVersion();
};

const createApi = (): API => ({
  run: async () => {
    await run();
  },
  format: async () => format(),
  getShareUrl: async (shortUrl = false) => (await share(shortUrl, true, false)).url,
  getConfig: async (contentOnly = false): Promise<Config> => {
    updateConfig();
    const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
    return JSON.parse(JSON.stringify(config));
  },
  setConfig: async (newConfig: Config): Promise<Config> => {
    const newAppConfig = buildConfig(newConfig, baseUrl);
    await loadConfig(newAppConfig);
    return newAppConfig;
  },
  getCode: async (): Promise<Code> => {
    updateConfig();
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({});
    }
    return JSON.parse(JSON.stringify(getCachedCode()));
  },
});

export { createApi, initializeApp, extraHandlers };
