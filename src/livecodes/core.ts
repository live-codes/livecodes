/* eslint-disable import/no-internal-modules */
import { basicLanguages, createEditor, selectedEditor, createCustomEditors } from './editor';
import {
  languages,
  getLanguageEditorId,
  getLanguageCompiler,
  languageIsEnabled,
  processors,
  processorIsEnabled,
  getLanguageByAlias,
  mapLanguage,
  createLanguageMenus,
  createProcessorItem,
  getLanguageTitle,
  getLanguageSpecs,
  getLanguageExtension,
} from './languages';
import {
  createSimpleStorage,
  createStorage,
  fakeStorage,
  Stores,
  createProjectStorage,
} from './storage';
import type {
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
  CustomSettings,
  Types,
  TestResult,
  ToolsPane,
  UserData,
  AppData,
  Processor,
} from './models';
import type { GitHubFile } from './services/github';
import type {
  BroadcastData,
  BroadcastInfo,
  BroadcastResponseData,
  BroadcastResponseError,
} from './UI/broadcast';
import { getFormatter } from './formatter';
import { createNotifications } from './notifications';
import { createModal } from './modal';
import {
  settingsMenuHTML,
  resultTemplate,
  customSettingsScreen,
  testEditorScreen,
  resourcesScreen,
  savePromptScreen,
  recoverPromptScreen,
  resultPopupHTML,
} from './html';
import { exportJSON } from './export/export-json';
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
import { isGithub } from './import/github';
import {
  copyToClipboard,
  debounce,
  getValidUrl,
  loadStylesheet,
  stringify,
  stringToValidJson,
} from './utils';
import { compress } from './utils/compression';
import { getCompiler, getAllCompilers, cjs2esm } from './compiler';
import { createTypeLoader } from './types';
import { createResultPage } from './result';
import * as UI from './UI/selectors';
import { createAuthService, sandboxService, shareService } from './services';
import { cacheIsValid, getCache, getCachedCode, setCache, updateCache } from './cache';
import {
  chaiTypesUrl,
  fscreenUrl,
  hintCssUrl,
  jestTypesUrl,
  lunaConsoleStylesUrl,
  lunaObjViewerStylesUrl,
  snackbarUrl,
} from './vendors';
import { createToolsPane } from './toolspane';
import {
  createOpenItem,
  createProjectInfoUI,
  createSplitPanes,
  createStarterTemplateLink,
  displayLoggedIn,
  displayLoggedOut,
  getResultElement,
  loadingMessage,
  noUserTemplates,
  createLoginContainer,
  createTemplatesContainer,
  getFullscreenButton,
} from './UI';
import { customEvents } from './events/custom-events';
import { populateConfig } from './import/utils';

const stores: Stores = {
  projects: undefined,
  templates: undefined,
  assets: undefined,
  snippets: undefined,
  recover: undefined,
  userConfig: undefined,
  userData: undefined,
  appData: undefined,
  sync: undefined,
};
const eventsManager = createEventsManager();
const notifications = createNotifications();
const modal = createModal();
const split = createSplitPanes();
const typeLoader = createTypeLoader();
const screens: Screen[] = [];
const params = getParams(); // query string params

let baseUrl: string;
let isEmbed: boolean;
let isLite: boolean;
let compiler: Await<ReturnType<typeof getCompiler>>;
let formatter: ReturnType<typeof getFormatter>;
let editors: Editors;
let customEditors: CustomEditors;
let toolsPane: ToolsPane | undefined;
let authService: ReturnType<typeof createAuthService> | undefined;
let editorLanguages: EditorLanguages | undefined;
let resultLanguages: Language[] = [];
let projectId: string;
let isSaved = true;
let changingContent = false;
let consoleInputCodeCompletion: any;
let starterTemplates: Template[];
let editorBuild: EditorOptions['editorBuild'] = 'basic';
let watchTests = false;
let initialized = false;
let isDestroyed = false;
const broadcastInfo: BroadcastInfo = {
  isBroadcasting: false,
  channel: '',
  channelUrl: '',
  channelToken: '',
  broadcastSource: false,
};
let resultPopup: Window | null = null;

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

const createIframe = (container: HTMLElement, result = '', service = sandboxService) =>
  new Promise((resolve, reject) => {
    if (!container) {
      reject('Result container not found');
      return;
    }

    let iframe = UI.getResultIFrameElement();
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = 'result';
      iframe.id = 'result-frame';
      iframe.setAttribute(
        'allow',
        'accelerometer; camera; encrypted-media; display-capture; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write; web-share',
      );
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute('allowpaymentrequest', 'true');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );
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
    const iframeIsPlaced = iframe.parentElement === container;
    const styleOnlyUpdate = iframeIsPlaced && getCache().styleOnlyUpdate;
    const liveReload =
      iframeIsPlaced &&
      compilers[scriptLang]?.liveReload &&
      resultLanguages.includes(scriptLang) &&
      !editorsText.includes('__livecodes_reload__');

    if (styleOnlyUpdate) {
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
      eventsManager.addEventListener(iframe, 'load', function onload() {
        eventsManager.removeEventListener(iframe, 'load', onload);

        if (!result || loaded) {
          resolve('loaded');
          return; // prevent infinite loop
        }

        iframe.contentWindow?.postMessage({ result }, service.getOrigin());
        loaded = true;
        resolve('loaded');
      });

      iframe.remove(); // avoid changing browser history
      const { markup, style, script } = getConfig();
      const query = `?markup=${markup.language}&style=${style.language}&script=${
        script.language
      }&isEmbed=${isEmbed}&isLoggedIn=${Boolean(authService?.isLoggedIn())}`;
      iframe.src = service.getResultUrl() + query;
      container.appendChild(iframe);
    }

    resultLanguages = getEditorLanguages();
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
      ...config.customSettings.types,
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
  const editor = selectedEditor({ editor: getConfig().editor, mode: getConfig().mode });
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
    theme: config.theme,
    isEmbed,
    mapLanguage,
    getLanguageExtension,
  };
  const markupOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getMarkupElement(),
    editorId: 'markup',
    language: languageIsEnabled(config.markup.language, config)
      ? config.markup.language
      : (config.languages?.find((lang) => getLanguageEditorId(lang) === 'markup') as Language) ||
        'html',
    value: languageIsEnabled(config.markup.language, config) ? config.markup.content || '' : '',
  };
  const styleOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getStyleElement(),
    editorId: 'style',
    language: languageIsEnabled(config.style.language, config)
      ? config.style.language
      : (config.languages?.find((lang) => getLanguageEditorId(lang) === 'style') as Language) ||
        'css',
    value: languageIsEnabled(config.style.language, config) ? config.style.content || '' : '',
  };
  const scriptOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getScriptElement(),
    editorId: 'script',
    language: languageIsEnabled(config.script.language, config)
      ? config.script.language
      : (config.languages?.find((lang) => getLanguageEditorId(lang) === 'script') as Language) ||
        'javascript',
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
  await toolsPane?.compiled?.reloadEditor();
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
    if (!['full', 'open', 'closed'].includes(toolsPane?.getStatus() || '')) {
      toolsPane?.hide();
    }
  }
  window.dispatchEvent(new Event(customEvents.resizeEditor));
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
  if (!isEmbed && !isUpdate) {
    editors[editorId]?.focus();
  }
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId,
    });
  }
  updateCompiledCode();
  if (initialized || params.view !== 'result') {
    split.show('code');
  }
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
  if (getConfig().readonly || language === 'blockly' || language === 'richtext') {
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
  if (!isEmbed && !isUpdate) {
    setTimeout(() => editor.focus());
  }
  await compiler.load([language], getConfig());
  formatter.getFormatFn(language).then((fn) => editor.registerFormatter(fn));
  if (!isUpdate) {
    setConfig({
      ...getConfig(),
      activeEditor: editorId,
    });
    await run();
  }
  await setSavedStatus();
  dispatchChangeEvent();
  addConsoleInputCodeCompletion();
  loadModuleTypes(editors, getConfig());
  await applyLanguageConfigs(language);
};

// Shift + Enter triggers run
const registerRun = (editorId: EditorId, editors: Editors) => {
  const editor = editors[editorId];
  editor.addKeyBinding('run', editor.keyCodes.ShiftEnter, async () => {
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
      toolsPane?.compiled?.update(
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
  runTests = false,
}) => {
  updateConfig();
  const config = getConfig();
  const contentConfig = getContentConfig(config);

  const markupContent = config.markup.content || '';
  const styleContent = config.style.content || '';
  const scriptContent = config.script.content || '';
  const testsContent = config.tests?.content || '';
  const markupLanguage = config.markup.language;
  const styleLanguage = config.style.language;
  const scriptLanguage = config.script.language;
  const testsLanguage = config.tests?.language || 'typescript';

  const forceCompileStyles =
    config.processors.find((name) => processors.find((p) => name === p.name && p.needsHTML)) &&
    (markupContent !== getCache().markup.content ||
      scriptContent !== getCache().script.content); /* e.g. jsx */

  const testsNotChanged =
    config.tests?.language === getCache().tests?.language &&
    config.tests?.content === getCache().tests?.content &&
    getCache().tests?.compiled;

  const compiledMarkup = await compiler.compile(markupContent, markupLanguage, config, {});
  const [compiledStyle, compiledScript, compiledTests] = await Promise.all([
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
    runTests
      ? testsNotChanged
        ? Promise.resolve(getCache().tests?.compiled || '')
        : compiler.compile(testsContent, testsLanguage, config, {})
      : Promise.resolve(getCache().tests?.compiled || ''),
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
      compiled:
        config.customSettings.convertCommonjs === false ? compiledScript : cjs2esm(compiledScript),
    },
    tests: {
      language: testsLanguage,
      ...contentConfig.tests,
      compiled: compiledTests,
    },
  };

  const result = await createResultPage({
    code: compiledCode,
    config,
    forExport,
    template,
    baseUrl,
    singleFile,
    runTests,
  });

  const styleOnlyUpdate = sourceEditor === 'style';
  setCache({
    ...getCache(),
    ...compiledCode,
    result,
    styleOnlyUpdate,
  });

  if (singleFile) {
    if (broadcastInfo.isBroadcasting) {
      broadcast();
    }
    if (resultPopup && !resultPopup.closed) {
      resultPopup?.postMessage({ result }, location.origin);
    }
  }

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

const flushResult = () => {
  const iframe = UI.getResultIFrameElement();
  if (!iframe?.contentWindow) return;

  setLoading(true);

  iframe.contentWindow.postMessage({ flush: true }, '*');

  const compiledLanguages = {
    markup: getLanguageCompiler(getConfig().markup.language)?.compiledCodeLanguage || 'html',
    style: getLanguageCompiler(getConfig().style.language)?.compiledCodeLanguage || 'css',
    script: getLanguageCompiler(getConfig().script.language)?.compiledCodeLanguage || 'javascript',
  };

  const loadingComments: Partial<Record<Language, string>> = {
    html: '<!-- loading -->',
    css: '/* loading */',
    javascript: '// loading',
    wat: ';; loading',
  };

  updateCache(
    'markup',
    compiledLanguages.markup,
    loadingComments[compiledLanguages.markup] || 'html',
  );
  updateCache('style', compiledLanguages.style, loadingComments[compiledLanguages.style] || 'css');
  updateCache(
    'script',
    compiledLanguages.script,
    loadingComments[compiledLanguages.script] || 'javascript',
  );
  setCache({
    ...getCache(),
    tests: {
      language: 'javascript',
      content: '',
      compiled: '',
    },
  });

  updateCompiledCode();
  toolsPane?.tests?.clearTests();
};

const setProjectTitle = (setDefault = false) => {
  const projectTitle = UI.getProjectTitleElement();
  if (!projectTitle) return;
  const defaultTitle = defaultConfig.title;
  if (setDefault && projectTitle.textContent?.trim() === '') {
    projectTitle.textContent = defaultTitle;
  }
  const title = projectTitle.textContent || defaultTitle;
  if (title === getConfig().title) return;

  setConfig({ ...getConfig(), title });
  if (getConfig().autosave) {
    save(!projectId, false);
  }
  setWindowTitle();
  setSavedStatus();
  dispatchChangeEvent();
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
  const btn = UI.getExternalResourcesBtn();
  if (getConfig().scripts.length > 0 || getConfig().stylesheets.length > 0) {
    btn.classList.add('active');
    btn.style.display = 'unset';
  } else {
    btn.classList.remove('active');
    if (isEmbed) {
      btn.style.display = 'none';
    }
  }
};

const run = async (editorId?: EditorId, runTests = false) => {
  setLoading(true);
  const result = await getResultPage({ sourceEditor: editorId, runTests });
  await createIframe(UI.getResultElement(), result);
  toolsPane?.console?.clear();
  updateCompiledCode();
};

const runTests = () => run(undefined, true);

const updateUrl = (url: string, push = false) => {
  if (push && !isEmbed) {
    parent.history.pushState(null, '', url);
  } else {
    parent.history.replaceState(null, '', url);
  }
};

const format = async (allEditors = true) => {
  if (allEditors) {
    await Promise.all([editors.markup.format(), editors.style.format(), editors.script.format()]);
  } else {
    const activeEditor = getActiveEditor();
    await activeEditor.format();
    activeEditor.focus();
  }
  updateConfig();
};

const save = async (notify = false, setTitle = true) => {
  if (setTitle) {
    setProjectTitle(true);
  }

  if (editors && getConfig().formatOnsave) {
    await format(true);
  }

  if (!projectId) {
    projectId = (await stores.projects?.addItem(getConfig())) || '';
  } else {
    await stores.projects?.updateItem(projectId, getConfig());
  }
  await setSavedStatus();

  if (notify) {
    notifications.success('Project locally saved to device!');
  }
  await share(false);
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
  includeResult = false,
): Promise<ShareData> => {
  const content = contentOnly ? getContentConfig(getConfig()) : getConfig();
  const contentParam = shortUrl
    ? '?x=id/' +
      (await shareService.shareProject({
        ...content,
        result: includeResult ? getCache().result : undefined,
      }))
    : '?x=code/' + compress(JSON.stringify(content));
  const url = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';
  const shareURL = url + contentParam;
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

const loadConfig = async (
  newConfig: Partial<Config | ContentConfig>,
  url?: string,
  flush = true,
) => {
  changingContent = true;

  const content = getContentConfig({
    ...defaultConfig,
    ...upgradeAndValidate(newConfig),
  });
  setConfig({
    ...getConfig(),
    ...content,
  });
  await importExternalContent({
    config: getConfig(),
  });
  setProjectRecover();

  if (flush) {
    flushResult();
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
  stores.userConfig?.setValue(userConfig);
};

const loadUserConfig = () => {
  const userConfig = stores.userConfig?.getValue();
  if (!userConfig) {
    setUserConfig(getUserConfig(getConfig()));
    return;
  }
  setConfig({
    ...getConfig(),
    ...userConfig,
  });

  loadSettings(getConfig());
  setTheme(getConfig().theme);
  showSyncStatus(true);
};

const dispatchChangeEvent = () => {
  const changeEvent = new Event(customEvents.change);
  document.dispatchEvent(changeEvent);
  parent.dispatchEvent(changeEvent);
};

const setSavedStatus = async () => {
  if (isEmbed) return;
  updateConfig();
  const savedConfig = projectId && (await stores.projects?.getItem(projectId || ''))?.config;
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
    setProjectRecover();
  } else {
    projectTitle.classList.remove('unsaved');
    setProjectRecover(true);
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

const setProjectRecover = (reset = false) => {
  if (isEmbed) return;
  stores.recover?.clear();
  if (reset || !getConfig().recoverUnsaved) return;
  stores.recover?.setValue({
    config: getContentConfig(getConfig()),
    lastModified: Date.now(),
  });
};

const checkRecoverStatus = () => {
  if (!getConfig().recoverUnsaved || isEmbed) {
    return Promise.resolve('recover disabled');
  }
  const unsavedItem = stores.recover?.getValue();
  const unsavedProject = unsavedItem?.config;
  if (!unsavedItem || !unsavedProject) {
    return Promise.resolve('no unsaved project');
  }
  const projectName = unsavedProject.title;
  return new Promise((resolve) => {
    const div = document.createElement('div');
    div.innerHTML = recoverPromptScreen;
    modal.show(div.firstChild as HTMLElement, { size: 'small', isAsync: true });
    UI.getModalUnsavedName().innerHTML = projectName;
    UI.getModalUnsavedLastModified().innerHTML = new Date(
      unsavedItem.lastModified,
    ).toLocaleString();
    const disableRecoverCheckbox = UI.getModalDisableRecoverCheckbox();

    const setRecoverConfig = (recoverUnsaved: boolean) => {
      setUserConfig({ recoverUnsaved });
      loadSettings(getConfig());
    };

    eventsManager.addEventListener(UI.getModalRecoverButton(), 'click', async () => {
      await loadConfig(unsavedProject);
      await setSavedStatus();
      setRecoverConfig(!disableRecoverCheckbox.checked);
      modal.close();
      resolve('recover');
    });
    eventsManager.addEventListener(UI.getModalSavePreviousButton(), 'click', async () => {
      if (stores.projects) {
        await stores.projects.addItem(unsavedProject);
        notifications.success(`Project "${projectName}" saved to device.`);
        setRecoverConfig(!disableRecoverCheckbox.checked);
      }
      modal.close();
      setProjectRecover(true);
      resolve('save and continue');
    });
    eventsManager.addEventListener(UI.getModalCancelRecoverButton(), 'click', () => {
      setRecoverConfig(!disableRecoverCheckbox.checked);
      modal.close();
      setProjectRecover(true);
      resolve('cancel recover');
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
  authService = createAuthService(isEmbed);
  const user = await authService.getUser();
  if (user) {
    displayLoggedIn(user);
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
              manageStoredUserData(user, 'restore');

              const displayName = user.displayName || user.username;
              const loginSuccessMessage = displayName
                ? 'Logged in as: ' + displayName
                : 'Logged in successfully';
              notifications.success(loginSuccessMessage);
              displayLoggedIn(user);
              resolve(user);
            }
          })
          .catch(() => {
            notifications.error('Login error!');
          });
      }
      modal.close();
    };

    const loginContainer = createLoginContainer(eventsManager, loginHandler);
    modal.show(loginContainer, { size: 'small' });
  }).catch(() => {
    notifications.error('Login error!');
  });

const logout = () => {
  if (!authService) return;
  authService
    ?.getUser()
    .then(async (user) => {
      if (!user) return;
      await manageStoredUserData(user, 'clear');
    })
    .then(() =>
      authService
        ?.signOut()
        .then(() => {
          notifications.success('Logged out successfully');
          displayLoggedOut();
        })
        .catch(() => {
          notifications.error('Logout error!');
        }),
    );
};

const getUser = async (fn?: () => void) => {
  await initializeAuth();
  let user = await authService?.getUser();
  if (!user) {
    user = await login();
    if (typeof fn === 'function') {
      fn();
    }
  }
  return user;
};

const getUserData = async (): Promise<UserData['data'] | null> => {
  const user = await authService?.getUser();
  if (!user || !stores.userData) return null;
  const id = user.username || user.uid;
  return (await stores.userData.getItem(id))?.data || null;
};

const setUserData = async (data: UserData['data']) => {
  const user = await authService?.getUser();
  if (!user || !stores.userData) return null;
  const id = user.username || user.uid;
  const oldData = (await stores.userData.getItem(id))?.data;
  const key = await stores.userData?.updateItem(id, {
    id,
    data: {
      ...oldData,
      ...data,
    },
  });
  return key;
};

const getAppData = () => stores.appData?.getValue() || null;

const setAppData = (data: AppData) => {
  stores.appData?.setValue({
    ...stores.appData.getValue(),
    ...data,
  });
};

const manageStoredUserData = async (user: User, action: 'clear' | 'restore') => {
  const storeKeys = (Object.keys(stores) as Array<keyof Stores>).filter(
    (k) => !['recover', 'sync'].includes(k),
  );
  const syncModule: typeof import('./sync/sync') = await import(baseUrl + '{{hash:sync.js}}');

  for (const storeKey of storeKeys) {
    if (action === 'clear') {
      await syncModule.exportToLocalSync({ user, stores, storeKey });
      stores[storeKey]?.clear();
    } else {
      await syncModule.restoreFromLocalSync({ user, stores, storeKey });
    }
  }

  if (action === 'clear') {
    setUserConfig(defaultConfig);
    broadcastInfo.isBroadcasting = false;
    broadcastInfo.channel = '';
    broadcastInfo.channelUrl = '';
    broadcastInfo.channelToken = '';
    broadcastInfo.broadcastSource = false;
  }

  loadUserConfig();
};

const showSyncStatus = async (force = false) => {
  if (isEmbed) return;
  const lastSync = (await getUserData())?.sync?.lastSync;
  if (lastSync || force) {
    const syncUIModule: typeof import('./UI/sync-ui') = await import(
      baseUrl + '{{hash:sync-ui.js}}'
    );
    syncUIModule.updateSyncStatus({ lastSync });
  }
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
    new URLSearchParams(parent.location.search) as unknown as Iterable<any>,
  );
  const screen = params.screen;
  if (screen) {
    showScreen(screen);
  }
};

const getAllEditors = (): CodeEditor[] => [
  ...Object.values(editors),
  ...[toolsPane?.console?.getEditor?.()],
  ...[toolsPane?.compiled?.getEditor?.()],
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
    const processor = toggle.dataset.processor as Processor;
    if (!processor) return;
    toggle.checked = config.processors.includes(processor);
  });

  if (isEmbed) return;

  const autoupdateToggle = UI.getAutoupdateToggle();
  autoupdateToggle.checked = config.autoupdate;

  const autosaveToggle = UI.getAutosaveToggle();
  autosaveToggle.checked = config.autosave;

  const autosyncToggle = UI.getAutosyncToggle();
  getUserData().then((userData) => {
    autosyncToggle.checked = userData?.sync?.autosync || false;
  });

  const formatOnsaveToggle = UI.getFormatOnsaveToggle();
  formatOnsaveToggle.checked = config.formatOnsave;

  const emmetToggle = UI.getEmmetToggle();
  emmetToggle.checked = config.emmet;

  const themeToggle = UI.getThemeToggle();
  themeToggle.checked = config.theme === 'dark';

  const recoverToggle = UI.getRecoverToggle();
  recoverToggle.checked = config.recoverUnsaved;

  const spacingToggle = UI.getSpacingToggle();
  spacingToggle.checked = config.showSpacing;

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

const getPlaygroundState = (): Config & Code => {
  const config = getConfig();
  const cachedCode = getCachedCode();
  return {
    ...config,
    ...cachedCode,
    markup: {
      ...config.markup,
      ...cachedCode.markup,
      position: editors.markup.getPosition(),
    },
    style: {
      ...config.style,
      ...cachedCode.style,
      position: editors.style.getPosition(),
    },
    script: {
      ...config.script,
      ...cachedCode.script,
      position: editors.script.getPosition(),
    },
    tools: {
      enabled: config.tools.enabled,
      active: toolsPane?.getActiveTool() ?? '',
      status: toolsPane?.getStatus() ?? '',
    },
  };
};

const broadcast = async ({
  serverUrl,
  channel,
  channelToken,
  broadcastSource,
}: Partial<BroadcastData> = {}): Promise<
  BroadcastResponseData | BroadcastResponseError | undefined
> => {
  if (isEmbed) return;
  const broadcastData = getAppData()?.broadcast;
  if (!serverUrl) {
    serverUrl = broadcastData?.serverUrl;
  }
  if (!serverUrl) return;
  if (broadcastSource == null) {
    broadcastSource = broadcastInfo.broadcastSource;
  }
  if (channel == null) {
    channel = broadcastInfo.channel;
  }
  if (channelToken == null) {
    channelToken = broadcastInfo.channelToken;
  }
  const userToken = broadcastData?.userToken;
  const { result, ...data } = getPlaygroundState();
  try {
    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        result,
        ...(broadcastSource ? { data } : {}),
        ...(channel ? { channel } : {}),
        ...(channelToken ? { channelToken } : {}),
        ...(userToken ? { userToken } : {}),
      }),
    });
    if (!res.ok) return;
    return res.json();
  } catch {
    return;
  }
};

const setBroadcastStatus = (info: BroadcastInfo) => {
  broadcastInfo.isBroadcasting = info.isBroadcasting;
  broadcastInfo.channel = info.channel;
  broadcastInfo.channelUrl = info.channelUrl;
  broadcastInfo.channelToken = info.channelToken;
  broadcastInfo.broadcastSource = info.broadcastSource;

  const broadcastStatusBtn = UI.getBroadcastStatusBtn();
  if (!broadcastStatusBtn) return;
  if (info.isBroadcasting) {
    broadcastStatusBtn.firstElementChild?.classList.add('active');
    broadcastStatusBtn.dataset.hint = 'Broadcasting...';
  } else {
    broadcastStatusBtn.firstElementChild?.classList.remove('active');
    broadcastStatusBtn.dataset.hint = 'Broadcast';
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

  const blurOnEnter = (e: KeyboardEvent) => {
    if (e.which === 13) {
      /* Enter */
      e.preventDefault();
      projectTitle.blur();
    }
  };

  const removeFormatting = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };

  eventsManager.addEventListener(projectTitle, 'input', () => setProjectTitle(), false);
  eventsManager.addEventListener(projectTitle, 'blur', () => setProjectTitle(true), false);
  eventsManager.addEventListener(projectTitle, 'keypress', blurOnEnter as any, false);
  eventsManager.addEventListener(projectTitle, 'paste', removeFormatting, false);
};

const handleResize = () => {
  resizeEditors();
  eventsManager.addEventListener(window, 'resize', resizeEditors, false);
  eventsManager.addEventListener(window, customEvents.resizeEditor, resizeEditors, false);
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
        setAppData({ language: getEditorLanguage(title.dataset.editor as EditorId) });
        setProjectRecover();
      },
      false,
    );
  });
};

const handleChangeLanguage = () => {
  if (getConfig().allowLangChange) {
    UI.getLanguageMenuLinks().forEach((menuItem) => {
      eventsManager.addEventListener(
        menuItem,
        'mousedown', // fire this event before unhover
        async () => {
          await changeLanguage(menuItem.dataset.lang as Language);
          setAppData({ language: menuItem.dataset.lang as Language });
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

    const shouldRunTests = Boolean(watchTests && getConfig().tests?.content);
    if ((getConfig().autoupdate || shouldRunTests) && !loading) {
      await run(editorId, shouldRunTests);
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

    dispatchChangeEvent();
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

    // Ctrl + p opens the command palette
    const activeEditor = getActiveEditor();
    if (ctrl(e) && e.key.toLowerCase() === 'p' && activeEditor.monaco) {
      e.preventDefault();
      activeEditor.monaco.trigger('anyString', 'editor.action.quickCommand');
      return;
    }

    // Ctrl + d prevents browser bookmark dialog
    if (ctrl(e) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      return;
    }

    if (isEmbed) return;

    // Ctrl + Shift + S forks the project (save as...)
    if (ctrl(e) && e.shiftKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      await fork();
      return;
    }

    // Ctrl + S saves the project
    if (ctrl(e) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      await save(true);
      return;
    }

    // Ctrl + Alt + T runs tests
    if (ctrl(e) && e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      split.show('output');
      toolsPane?.setActiveTool('tests');
      if (toolsPane?.getStatus() === 'closed') {
        toolsPane?.open();
      }
      await runTests();
      return;
    }

    // Ctrl + Enter triggers run
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      split.show('output');
      await run();
      return;
    }
  };

  eventsManager.addEventListener(window, 'keydown', hotKeys as any, true);
};

const handleLogoLink = () => {
  if (isEmbed) return;
  const logoLink = UI.getLogoLink();
  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    parent.postMessage({ args: 'home' }, location.origin);
  });
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
    const activeEditor = getActiveEditor();
    activeEditor.undo();
    activeEditor.focus();
  });

  eventsManager.addEventListener(UI.getRedoButton(), 'click', () => {
    const activeEditor = getActiveEditor();
    activeEditor.redo();
    activeEditor.focus();
  });

  eventsManager.addEventListener(UI.getFormatButton(), 'click', async () => {
    await format(false);
  });
};

const handleProcessors = () => {
  const styleMenu = UI.getstyleMenu();
  const processorList = processors
    .filter((p) => processorIsEnabled(p.name, getConfig()))
    .filter((p) => !p.hidden)
    .map((p) => ({ name: p.name, title: p.title }));

  if (!styleMenu || processorList.length === 0) {
    return;
  }

  processorList.forEach((processor) => {
    const processorItem = createProcessorItem(processor);
    styleMenu.append(processorItem);
    eventsManager.addEventListener(
      processorItem,
      'mousedown',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const toggle = processorItem.querySelector<HTMLInputElement>('input');
        if (!toggle) return;
        toggle.checked = !toggle.checked;

        const processorName = toggle.dataset.processor as Processor;
        if (!processorName || !processorList.find((p) => p.name === processorName)) return;

        setConfig({
          ...getConfig(),
          processors: [
            ...(toggle.checked
              ? [...getConfig().processors, processorName]
              : getConfig().processors.filter((p) => p !== processorName)),
          ],
        });
        await run();
      },
      false,
    );

    eventsManager.addEventListener(processorItem, 'click', async (event) => {
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
      } else if (configKey === 'autosync') {
        const syncData = (await getUserData())?.sync;
        if (syncData?.repo) {
          await setUserData({
            sync: {
              ...syncData,
              autosync: toggle.checked,
            },
          });
        }
        if (toggle.checked && !syncData?.repo) {
          toggle.checked = false;
          await showScreen('sync');
        }
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
      if (configKey === 'recoverUnsaved') {
        setUserConfig({
          recoverUnsaved: toggle.checked,
        });
        setProjectRecover();
      }
      if (configKey === 'showSpacing') {
        setUserConfig({
          showSpacing: toggle.checked,
        });
        await run();
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
  const templatesContainer = createTemplatesContainer(eventsManager, () => loadUserTemplates());
  const userTemplatesScreen = UI.getUserTemplatesScreen(templatesContainer);
  const noDataMessage = templatesContainer.querySelector('.no-data');

  const loadUserTemplates = async () => {
    const defaultTemplate = getAppData()?.defaultTemplate;
    const userTemplates = ((await stores.templates?.getList()) || []).sort((a, b) =>
      a.id === defaultTemplate ? -1 : b.id === defaultTemplate ? 1 : 0,
    );

    if (userTemplates.length === 0) {
      userTemplatesScreen.innerHTML = noUserTemplates;
      return;
    }
    userTemplatesScreen.innerHTML = '';

    const list = document.createElement('ul') as HTMLElement;
    list.classList.add('open-list');
    userTemplatesScreen.appendChild(list);

    userTemplates.forEach((item) => {
      const { link, deleteButton, setAsDefaultLink, removeDefaultLink } = createOpenItem(
        item,
        list,
        getLanguageTitle,
        getLanguageByAlias,
        true,
      );

      if (defaultTemplate === item.id) {
        link.parentElement?.classList.add('selected');
      }

      eventsManager.addEventListener(
        link,
        'click',
        async (event) => {
          event.preventDefault();
          const itemId = (link as HTMLElement).dataset.id || '';
          const template = (await stores.templates?.getItem(itemId))?.config;
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
          if (!stores.templates) return;
          if (getAppData()?.defaultTemplate === item.id) {
            setAppData({ defaultTemplate: null });
          }
          await stores.templates.deleteItem(item.id);
          const li = deleteButton.parentElement as HTMLElement;
          li.classList.add('hidden');
          setTimeout(async () => {
            li.style.display = 'none';
            if (
              stores.templates &&
              (await stores.templates.getList()).length === 0 &&
              noDataMessage
            ) {
              list.remove();
              userTemplatesScreen.appendChild(noDataMessage);
            }
          }, 500);
        },
        false,
      );

      eventsManager.addEventListener(
        setAsDefaultLink,
        'click',
        (ev) => {
          ev.stopPropagation();
          setAppData({ defaultTemplate: item.id });
          [...list.children].forEach((li) => {
            li.classList.remove('selected');
          });
          link.parentElement?.classList.add('selected');
        },
        false,
      );

      eventsManager.addEventListener(
        removeDefaultLink,
        'click',
        (ev) => {
          ev.stopPropagation();
          setAppData({ defaultTemplate: null });
          link.parentElement?.classList.remove('selected');
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
            const link = createStarterTemplateLink(template, starterTemplatesList, baseUrl);
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
    if (stores.templates) {
      await stores.templates.addItem(getConfig());
      notifications.success('Saved as a new template');
    }
  });
};

const handleOpen = () => {
  const createList = async () => {
    modal.show(loadingMessage());
    const openModule: typeof import('./UI/open') = await import(baseUrl + '{{hash:open.js}}');
    await openModule.createSavedProjectsList({
      eventsManager,
      getContentConfig,
      getProjectId: () => projectId,
      loadConfig,
      modal,
      notifications,
      projectStorage: stores.projects || fakeStorage,
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
  const createImportUI = async () => {
    modal.show(loadingMessage());
    const importModule: typeof import('./UI/import') = await import(baseUrl + '{{hash:import.js}}');
    importModule.createImportUI({
      baseUrl,
      modal,
      notifications,
      eventsManager,
      getUser: authService?.getUser,
      loadConfig,
      populateConfig,
      projectStorage: stores.projects,
      showScreen,
    });
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
  let exportModule: typeof import('./export/export');
  const loadModule = async () => {
    exportModule = exportModule || (await import(baseUrl + '{{hash:export.js}}'));
  };

  eventsManager.addEventListener(
    UI.getExportJSONLink(),
    'click',
    (event: Event) => {
      event.preventDefault();
      updateConfig();
      exportJSON(getConfig());
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportResultLink(),
    'click',
    async (event: Event) => {
      event.preventDefault();
      updateConfig();
      await loadModule();
      exportModule.exportConfig(
        getConfig(),
        baseUrl,
        'html',
        await getResultPage({ forExport: true }),
      );
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportSourceLink(),
    'click',
    async (event: Event) => {
      event.preventDefault();
      updateConfig();
      const html = await getResultPage({ forExport: true });
      await loadModule();
      exportModule.exportConfig(getConfig(), baseUrl, 'src', {
        html,
        deps: { getLanguageExtension },
      });
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportCodepenLink(),
    'click',
    async () => {
      updateConfig();
      if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
        await getResultPage({});
      }
      const cache = getCachedCode();
      const compiled = {
        markup: cache.markup.compiled,
        style: cache.style.compiled,
        script: cache.script.compiled,
      };
      await loadModule();
      exportModule.exportConfig(getConfig(), baseUrl, 'codepen', {
        baseUrl,
        compiled,
        deps: {
          getLanguageExtension,
          getLanguageCompiler,
        },
      });
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportJsfiddleLink(),
    'click',
    async () => {
      updateConfig();
      if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
        await getResultPage({});
      }
      const cache = getCachedCode();
      const compiled = {
        markup: cache.markup.compiled,
        style: cache.style.compiled,
        script: cache.script.compiled,
      };
      await loadModule();
      exportModule.exportConfig(getConfig(), baseUrl, 'jsfiddle', {
        baseUrl,
        compiled,
        deps: {
          getLanguageExtension,
          getLanguageCompiler,
        },
      });
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getExportGithubGistLink(),
    'click',
    async () => {
      updateConfig();
      const user = await getUser();
      if (!user) return;
      notifications.info('Creating a public GitHub gist...');
      await loadModule();
      exportModule.exportConfig(getConfig(), baseUrl, 'githubGist', {
        user,
        deps: { getLanguageExtension },
      });
    },
    false,
  );
};

const handleShare = () => {
  const createShareUI = async () => {
    modal.show(loadingMessage(), { size: 'small' });
    const importModule: typeof import('./UI/share') = await import(baseUrl + '{{hash:share.js}}');
    const shareContainer = await importModule.createShareContainer(share, baseUrl, eventsManager);
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
    modal.show(loadingMessage());

    const getProjectDeployRepo = async () => {
      if (!projectId) return;
      return (await getUserData())?.deploys?.[projectId];
    };

    const setProjectDeployRepo = async (repo: string) => {
      if (!projectId) return;
      await setUserData({
        deploys: {
          ...(await getUserData())?.deploys,
          [projectId]: repo,
        },
      });
    };

    const deployModule: typeof import('./UI/deploy') = await import(baseUrl + '{{hash:deploy.js}}');
    deployModule.createDeployUI({
      modal,
      notifications,
      eventsManager,
      user,
      deployRepo: await getProjectDeployRepo(),
      deps: {
        getResultPage,
        getCache,
        getConfig,
        getContentConfig,
        getLanguageExtension,
        setProjectDeployRepo,
      },
    });
  };

  eventsManager.addEventListener(UI.getDeployLink(), 'click', createDeployUI, false);
  registerScreen('deploy', createDeployUI);
};

const handleSync = () => {
  if (isEmbed) return;

  const createSyncUI = async () => {
    const user = await getUser();
    if (!user) {
      notifications.error('Authentication error!');
      return;
    }
    modal.show(loadingMessage());

    const syncUIModule: typeof import('./UI/sync-ui') = await import(
      baseUrl + '{{hash:sync-ui.js}}'
    );
    syncUIModule.createSyncUI({
      baseUrl,
      modal,
      notifications,
      eventsManager,
      user,
      stores,
      deps: {
        getSyncData: async () => (await getUserData())?.sync || null,
        setSyncData: async (syncData: UserData['data']['sync']) => {
          await setUserData({ sync: syncData });
          loadSettings(getConfig());
        },
      },
    });
  };

  eventsManager.addEventListener(UI.getSyncLink(), 'click', createSyncUI, false);
  registerScreen('sync', createSyncUI);
};

const handleAutosync = async () => {
  if (isEmbed) return;

  let syncInterval: number;
  const sync = async () => {
    if (isDestroyed) {
      clearInterval(syncInterval);
      return;
    }

    const syncData = (await getUserData())?.sync;
    if (!syncData?.autosync) return;
    const user = await authService?.getUser();
    const repo = syncData.repo;
    if (!user || !repo) return;

    const syncModule: typeof import('./sync/sync') = await import(baseUrl + '{{hash:sync.js}}');
    const syncResult = await syncModule.sync({
      user,
      repo,
      newRepo: false,
      stores,
    });
    if (syncResult) {
      setUserData({
        sync: {
          ...syncData,
          lastSync: Date.now(),
        },
      });
    }
  };

  const minute = 1000 * 60;
  const triggerSync = () => {
    setTimeout(() => {
      sync();
      syncInterval = window.setInterval(sync, 5 * minute);
    }, minute);
  };

  triggerSync();
};

const handlePersistantStorage = async () => {
  if (isEmbed) return;

  let alreadyRequested = false;

  const unsubscribe = () => {
    projectSubscription?.unsubscribe();
    templateSubscription?.unsubscribe();
    assetSubscription?.unsubscribe();
  };

  const requestPersistance = () => {
    if (alreadyRequested) return unsubscribe();
    setTimeout(async () => {
      alreadyRequested = true;
      if (navigator.storage && navigator.storage.persist) {
        await navigator.storage.persist();
      }
    }, 2000);
  };

  const projectSubscription = stores.projects?.subscribe(requestPersistance);
  const templateSubscription = stores.templates?.subscribe(requestPersistance);
  const assetSubscription = stores.assets?.subscribe(requestPersistance);
};

const handleBackup = () => {
  const createBackupUI = async () => {
    modal.show(loadingMessage());
    const backupModule: typeof import('./UI/backup') = await import(baseUrl + '{{hash:backup.js}}');
    backupModule.createBackupUI({
      baseUrl,
      modal,
      notifications,
      eventsManager,
      stores,
      deps: {
        loadUserConfig,
      },
    });
  };

  eventsManager.addEventListener(UI.getBackupLink(), 'click', createBackupUI, false);
  registerScreen('backup', createBackupUI);
};

const handleBroadcast = () => {
  if (isEmbed) return;

  const createBroadcastUI = async () => {
    modal.show(loadingMessage());

    const syncUIModule: typeof import('./UI/broadcast') = await import(
      baseUrl + '{{hash:broadcast.js}}'
    );
    syncUIModule.createBroadcastUI({
      modal,
      notifications,
      eventsManager,
      deps: {
        getBroadcastData: () => ({
          ...broadcastInfo,
          serverUrl: getAppData()?.broadcast?.serverUrl || '',
        }),
        setBroadcastData: (broadcastData) => {
          setBroadcastStatus(broadcastData);
          setAppData({
            broadcast: {
              ...getAppData()?.broadcast,
              serverUrl: broadcastData.serverUrl,
            },
          });
        },
        broadcast,
      },
    });
  };

  eventsManager.addEventListener(UI.getBroadcastLink(), 'click', createBroadcastUI, false);
  registerScreen('broadcast', createBroadcastUI);
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
  const createProjectInfo = () =>
    createProjectInfoUI(getConfig(), stores.projects || fakeStorage, modal, eventsManager, onSave);

  eventsManager.addEventListener(UI.getProjectInfoLink(), 'click', createProjectInfo, false);
  registerScreen('info', createProjectInfo);
};

const handleEmbed = () => {
  const getUrlFn = async () => (await share(true, true, false, true)).url;
  const createEditorFn = async (container: HTMLElement) =>
    createEditor({
      baseUrl,
      container,
      editor: 'codejar',
      editorId: 'embed',
      getLanguageExtension,
      isEmbed,
      language: 'html',
      mapLanguage,
      readonly: true,
      theme: getConfig().theme,
      value: '',
    });
  const createEmbedUI = async () => {
    modal.show(loadingMessage());

    const embedModule: typeof import('./UI/embed-ui') = await import(
      baseUrl + '{{hash:embed-ui.js}}'
    );
    await embedModule.createEmbedUI({
      baseUrl,
      config: getContentConfig(getConfig()),
      editorLanguages: {
        markup: getLanguageTitle(getConfig().markup.language),
        style: getLanguageTitle(getConfig().style.language),
        script: getLanguageTitle(getConfig().script.language),
      },
      modal,
      notifications,
      eventsManager,
      createEditorFn,
      getUrlFn,
    });
  };

  eventsManager.addEventListener(UI.getEmbedLink(), 'click', createEmbedUI, false);
  registerScreen('embed', createEmbedUI);
};

const handleAssets = () => {
  let assetsModule: typeof import('./UI/assets');
  const loadModule = async () => {
    modal.show(loadingMessage());
    assetsModule = assetsModule || (await import(baseUrl + '{{hash:assets.js}}'));
  };

  const createList = async () => {
    await loadModule();
    await assetsModule.createAssetsList({
      eventsManager,
      modal,
      notifications,
      assetsStorage: stores.assets || fakeStorage,
      showScreen,
      baseUrl,
    });
  };

  const createAddAsset = async (activeTab: number) => {
    await loadModule();

    const deployModule: typeof import('./UI/deploy') = await import(baseUrl + '{{hash:deploy.js}}');
    const deployAsset = async (user: User, file: GitHubFile) =>
      deployModule.deployFile({
        file,
        user,
        repo: 'livecodes-assets',
        branch: 'gh-pages',
        message: 'add ' + file.path,
        description: 'LiveCodes assets',
        readmeContent: '#LiveCodes assets',
      });
    modal.show(
      assetsModule.createAddAssetContainer({
        eventsManager,
        notifications,
        assetsStorage: stores.assets || fakeStorage,
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

const handleSnippets = () => {
  let snippetsModule: typeof import('./UI/snippets');
  const loadModule = async () => {
    modal.show(loadingMessage());
    snippetsModule = snippetsModule || (await import(baseUrl + '{{hash:snippets.js}}'));
  };

  const createEditorFn = async (options: Partial<EditorOptions>) =>
    createEditor({
      baseUrl,
      editorId: 'snippet',
      getLanguageExtension,
      isEmbed,
      language: 'html',
      mapLanguage,
      theme: getConfig().theme,
      value: '',
      ...options,
    } as EditorOptions);

  const createList = async () => {
    await loadModule();
    await snippetsModule.createSnippetsList({
      eventsManager,
      modal,
      notifications,
      snippetsStorage: stores.snippets || fakeStorage,
      deps: { createEditorFn, showScreen },
    });
  };

  const createAddSnippet = async (snippetId?: string) => {
    await loadModule();
    const snippetContainer = await snippetsModule.createAddSnippetContainer({
      snippetId,
      eventsManager,
      notifications,
      snippetsStorage: stores.snippets || fakeStorage,
      showScreen,
      deps: {
        createEditorFn,
        getAppData,
        setAppData,
      },
    });

    modal.show(snippetContainer, {
      isAsync: true,
    });
  };

  eventsManager.addEventListener(UI.getSnippetsLink(), 'click', createList, false);
  registerScreen('snippets', createList);
  registerScreen('add-snippet', (snippetId?: string) => {
    setTimeout(() => createAddSnippet(snippetId));
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

    const options: EditorOptions = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editor: config.editor,
      editorId: 'customSettings',
      editorBuild,
      container: UI.getCustomSettingsEditor(),
      language: 'json' as Language,
      value: stringify(getConfig().customSettings, true),
      theme: config.theme,
      isEmbed,
      mapLanguage,
      getLanguageExtension,
    };
    customSettingsEditor = await createEditor(options);
    customSettingsEditor?.focus();

    eventsManager.addEventListener(UI.getLoadCustomSettingsButton(), 'click', async () => {
      let customSettings: CustomSettings = {};
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
        if (customSettings.types) {
          loadModuleTypes(editors, getConfig());
        }
      }
      customSettingsEditor?.destroy();
      modal.close();
      await run();
      dispatchChangeEvent();
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

const handleTests = () => {
  eventsManager.addEventListener(window, 'message', (ev: any) => {
    if (ev.origin !== sandboxService.getOrigin()) return;
    if (ev.data.type !== 'testResults') return;
    toolsPane?.tests?.showResults(ev.data.payload);
    const resultEvent = new CustomEvent<{ results: TestResult[]; error?: string }>(
      customEvents.testResults,
      {
        detail: JSON.parse(JSON.stringify(ev.data.payload)),
      },
    );
    document.dispatchEvent(resultEvent);
  });

  eventsManager.addEventListener(
    UI.getRunTestsButton(),
    'click',
    (ev: Event) => {
      ev.preventDefault();
      runTests();
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getWatchTestsButton(),
    'click',
    (ev: Event) => {
      ev.preventDefault();
      watchTests = !watchTests;
      if (watchTests) {
        UI.getWatchTestsButton()?.classList.remove('disabled');
        runTests();
      } else {
        UI.getWatchTestsButton()?.classList.add('disabled');
      }
    },
    false,
  );
};

const handleTestEditor = () => {
  const createTestEditorUI = async () => {
    const config = getConfig();
    // eslint-disable-next-line prefer-const
    let testEditor: CodeEditor | undefined;
    const div = document.createElement('div');
    div.innerHTML = testEditorScreen;
    const testEditorContainer = div.firstChild as HTMLElement;
    modal.show(testEditorContainer, {
      onClose: () => {
        testEditor?.destroy();

        // fix monaco mixing up model of script with test editors
        if (editors.script.monaco) {
          formatter
            .getFormatFn(getConfig().script.language)
            .then((fn) => editors.script.registerFormatter(fn));
        }
      },
    });

    const testLanguage: Language = config.tests?.language || 'tsx';
    const editorLanguage: Language = 'jsx';
    const options: EditorOptions = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editor: config.editor,
      editorId: 'tests',
      editorBuild,
      container: UI.getTestEditor(),
      language: editorLanguage,
      value: getConfig().tests?.content || '',
      theme: config.theme,
      isEmbed,
      mapLanguage,
      getLanguageExtension,
    };
    testEditor = await createEditor(options);
    formatter.getFormatFn(editorLanguage).then((fn) => testEditor?.registerFormatter(fn));
    testEditor?.focus();

    if (typeof testEditor?.addTypes === 'function') {
      const testTypes: Types = {
        jest: {
          url: jestTypesUrl,
          autoload: true,
        },
        chai: {
          url: chaiTypesUrl,
          autoload: true,
        },
      };
      typeLoader.load('', testTypes, true).then((libs) => {
        libs.forEach((lib) => testEditor?.addTypes?.(lib));
      });
    }

    eventsManager.addEventListener(UI.getLoadTestsButton(), 'click', async () => {
      const editorContent = testEditor?.getValue() || '';
      if (editorContent !== getConfig().tests?.content) {
        compiler.clearCache();
        setConfig({
          ...getConfig(),
          tests: {
            language: testLanguage,
            content: editorContent,
          },
        });
        await setSavedStatus();
      }
      modal.close();
      toolsPane?.tests?.resetTests();
      await runTests();
      dispatchChangeEvent();
    });
  };

  eventsManager.addEventListener(
    UI.getEditTestsButton(),
    'click',
    (ev: Event) => {
      ev.preventDefault();
      createTestEditorUI();
    },
    false,
  );

  registerScreen('test-editor', createTestEditorUI);
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

const handleResultPopup = () => {
  const popupBtn = document.createElement('div');
  popupBtn.classList.add('tool-buttons', 'hint--top');
  popupBtn.dataset.hint = 'Show result in new window';
  popupBtn.style.pointerEvents = 'all'; //  override setting to 'none' on toolspane bar
  const imgUrl = baseUrl + 'assets/images/new-window.svg';
  popupBtn.innerHTML = `<span id="show-result"><img src="${imgUrl}" /></span>`;
  let url: string | undefined;
  const openWindow = async () => {
    if (resultPopup && !resultPopup.closed) {
      resultPopup.focus();
      return;
    }
    popupBtn.classList.add('loading');
    const result = await getResultPage({ forExport: true, singleFile: true });
    url = url || URL.createObjectURL(new Blob([resultPopupHTML], { type: 'text/html' }));
    // add a notice to URL that it is a temporary URL to prevent users from sharing it.
    // revoking the URL after opening the window prevents viewing the page source.
    const notice = '#---TEMPORARY-URL---';
    resultPopup = window.open(url + notice, 'livecodes-result', `width=800,height=400`);
    eventsManager.addEventListener(
      resultPopup,
      'load',
      () => {
        resultPopup?.postMessage({ result }, location.origin);
      },
      { once: true },
    );
    popupBtn.classList.remove('loading');
  };
  eventsManager.addEventListener(popupBtn, 'click', openWindow);
  eventsManager.addEventListener(popupBtn, 'touchstart', openWindow);
  UI.getToolspaneTitles()?.appendChild(popupBtn);
};

const handleResultZoom = () => {
  const zoomBtn = document.createElement('div');
  zoomBtn.classList.add('tool-buttons', 'hint--top');
  zoomBtn.dataset.hint = 'Zoom';
  zoomBtn.style.pointerEvents = 'all'; //  override setting to 'none' on toolspane bar
  const zoomLevels = {
    x100: '1&times;',
    x50: '0.5&times;',
    x25: '0.25&times;',
  };
  const zoomBtnText = document.createElement('span');
  zoomBtnText.classList.add('text');
  zoomBtnText.innerHTML = zoomLevels.x100;
  zoomBtn.appendChild(zoomBtnText);
  const zoom = () => {
    const iframe = UI.getResultIFrameElement();
    const zoom = iframe.classList.contains('zoom50')
      ? zoomLevels.x50
      : iframe.classList.contains('zoom25')
      ? zoomLevels.x25
      : zoomLevels.x100;

    if (zoom === zoomLevels.x100) {
      iframe.classList.add('zoom50');
      zoomBtnText.innerHTML = zoomLevels.x50;
    }

    if (zoom === zoomLevels.x50) {
      iframe.classList.remove('zoom50');
      iframe.classList.add('zoom25');
      zoomBtnText.innerHTML = zoomLevels.x25;
    }

    if (zoom === zoomLevels.x25) {
      iframe.classList.remove('zoom25');
      zoomBtnText.innerHTML = zoomLevels.x100;
    }
  };
  eventsManager.addEventListener(zoomBtn, 'click', zoom);
  eventsManager.addEventListener(zoomBtn, 'touchstart', zoom);
  UI.getToolspaneTitles()?.appendChild(zoomBtn);
};

const handleBroadcastStatus = () => {
  const broadcastStatusBtn = document.createElement('div');
  broadcastStatusBtn.id = 'broadcast-status-btn';
  broadcastStatusBtn.classList.add('tool-buttons', 'hint--top');
  broadcastStatusBtn.dataset.hint = 'Broadcast';
  broadcastStatusBtn.style.pointerEvents = 'all'; //  override setting to 'none' on toolspane bar
  const imgUrl = baseUrl + 'assets/images/broadcast.svg';
  broadcastStatusBtn.innerHTML = `
  <span id="broadcast-status">
    <img src="${imgUrl}" />
    <span class="mark"></span>
  </span>`;
  const showBroadcast = () => {
    showScreen('broadcast');
  };
  eventsManager.addEventListener(broadcastStatusBtn, 'click', showBroadcast);
  eventsManager.addEventListener(broadcastStatusBtn, 'touchstart', showBroadcast);
  UI.getToolspaneTitles()?.appendChild(broadcastStatusBtn);
};

const handleFullscreen = async () => {
  if (!isEmbed) return;
  const fullscreenButton = getFullscreenButton();
  const buttonImg = fullscreenButton.querySelector('img')!;
  const fscreen = (await import(fscreenUrl)).default;
  if (!fscreen.fullscreenEnabled) {
    fullscreenButton.style.visibility = 'hidden';
    return;
  }

  eventsManager.addEventListener(fscreen, 'fullscreenchange', async () => {
    if (!fscreen.fullscreenElement) {
      buttonImg.src = buttonImg.src.replace('collapse.svg', 'expand.svg');
      fullscreenButton.dataset.hint = 'Full Screen';
      return;
    }
    buttonImg.src = buttonImg.src.replace('expand.svg', 'collapse.svg');
    fullscreenButton.dataset.hint = 'Exit Full Screen';
  });

  eventsManager.addEventListener(fullscreenButton, 'click', async () => {
    if (fscreen.fullscreenElement) {
      await fscreen.exitFullscreen();
      return;
    }
    await fscreen.requestFullscreen(document.body);
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

const loadToolsPane = async () => {
  toolsPane = createToolsPane(getConfig(), baseUrl, editors, eventsManager, isEmbed, runTests);
  await toolsPane.load();
  handleResultZoom();
  getResultElement().classList.remove('full');
};

const basicHandlers = () => {
  handleLogoLink();
  handleResize();
  handleIframeResize();
  handleSelectEditor();
  handleChangeLanguage();
  handleChangeContent();
  handleHotKeys();
  handleRunButton();
  handleResultButton();
  handleEditorTools();
  handleProcessors();
  handleResultLoading();
  handleTests();
  if (isEmbed) {
    handleExternalResources();
    handleFullscreen();
  }
};

const extraHandlers = async () => {
  stores.projects = await createProjectStorage('__livecodes_data__', isEmbed);
  stores.templates = await createProjectStorage('__livecodes_templates__', isEmbed);
  stores.assets = await createStorage('__livecodes_assets__', isEmbed);
  stores.snippets = await createStorage('__livecodes_snippets__', isEmbed);
  stores.recover = createSimpleStorage('__livecodes_project_recover__', isEmbed);
  stores.userConfig = createSimpleStorage('__livecodes_user_config__', isEmbed);
  stores.userData = await createStorage('__livecodes_user_data__', isEmbed);
  stores.appData = createSimpleStorage('__livecodes_app_data__', isEmbed);
  stores.sync = await createStorage('__livecodes_sync_data__', isEmbed);

  handleTitleEdit();
  handleSettingsMenu();
  handleSettings();
  handleProjectInfo();
  handleCustomSettings();
  handleTestEditor();
  handleLogin();
  handleLogout();
  handleNew();
  handleSave();
  handleFork();
  handleSaveAsTemplate();
  handleOpen();
  handleShare();
  handleEmbed();
  handleImport();
  handleExport();
  handleDeploy();
  handleAssets();
  handleSnippets();
  handleSync();
  handleAutosync();
  handlePersistantStorage();
  handleExternalResources();
  handleBackup();
  handleBroadcast();
  handleResultPopup();
  handleBroadcastStatus();
  handleUnload();
};

const configureEmbed = (config: Config, eventsManager: ReturnType<typeof createEventsManager>) => {
  document.body.classList.add('embed');
  if (config.mode === 'result') {
    document.body.classList.add('result');
  }
  if (config.mode === 'editor' || config.mode === 'codeblock') {
    document.body.classList.add('no-result');
  }

  const logoLink = UI.getLogoLink();
  logoLink.classList.add('hint--bottom-left');
  logoLink.dataset.hint = 'Edit in LiveCodes 🡕';
  logoLink.title = '';

  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open((await share(false, true, false)).url, '_blank');
  });
};

const configureLite = () => {
  setConfig({
    ...getConfig(),
    editor: 'codejar',
    emmet: false,
    tools: {
      enabled: [],
      active: '',
      status: 'none',
    },
  });
  UI.getFormatButton().style.display = 'none';
};

const configureModes = ({
  config,
  isEmbed,
  isLite,
}: {
  config: Config;
  isEmbed: boolean;
  isLite: boolean;
}) => {
  if (config.mode === 'full') {
    if (params.view === 'editor') {
      split.show('code', true);
    }
    if (params.view === 'result') {
      split.show('output', true);
    }
  }
  if (config.mode === 'codeblock') {
    setConfig({ ...config, readonly: true });
  }
  if (config.mode === 'editor' || config.mode === 'codeblock' || config.mode === 'result') {
    split.show = () => undefined;
  }
  if (isLite) {
    configureLite();
  }
  if (isEmbed || config.mode === 'result') {
    configureEmbed(config, eventsManager);
  }
};

const importExternalContent = async (options: {
  config?: Config;
  configUrl?: string;
  template?: string;
  url?: string;
}): Promise<boolean> => {
  const { config = defaultConfig, configUrl, template, url } = options;
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const hasContentUrls = (conf: Partial<Config>) =>
    editorIds.filter((editorId) => conf[editorId]?.contentUrl && !conf[editorId]?.content).length >
    0;

  if (!configUrl && !template && !url && !hasContentUrls(config)) return false;

  const loadingMessage = document.createElement('div');
  loadingMessage.classList.add('modal-message');
  loadingMessage.innerHTML = 'Loading Project...';
  modal.show(loadingMessage, { size: 'small', isAsync: true });

  let templateConfig: Partial<Config> = {};
  let urlConfig: Partial<Config> = {};
  let contentUrlConfig: Partial<Config> = {};
  let configUrlConfig: Partial<Config> = {};

  if (template) {
    templateConfig = upgradeAndValidate(await getTemplate(template, config, baseUrl));
  }

  if (url) {
    let validUrl = url;
    if (url.startsWith('http') || url.startsWith('data')) {
      try {
        validUrl = new URL(url).href;
      } catch {
        validUrl = decodeURIComponent(url);
      }
    }
    // import code from hash: code / github / github gist / url html / ...etc
    let user;
    if (isGithub(validUrl) && !isEmbed) {
      await initializeAuth();
      user = await authService?.getUser();
    }

    const importModule: typeof import('./UI/import') = await import(baseUrl + '{{hash:import.js}}');
    urlConfig = await importModule.importCode(validUrl, getParams(), getConfig(), user);
  }

  if (hasContentUrls(config)) {
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
    contentUrlConfig = {
      markup: editorsContent[0],
      style: editorsContent[1],
      script: editorsContent[2],
    };
  }

  const validConfigUrl = getValidUrl(configUrl);
  if (validConfigUrl) {
    configUrlConfig = upgradeAndValidate(
      await fetch(validConfigUrl)
        .then((res) => res.json())
        .catch(() => ({})),
    );
    if (hasContentUrls(configUrlConfig)) {
      return importExternalContent({ config: { ...config, ...configUrlConfig } });
    }
  }

  await loadConfig(
    buildConfig({
      ...config,
      ...templateConfig,
      ...urlConfig,
      ...contentUrlConfig,
      ...configUrlConfig,
    }),
    parent.location.href,
    false,
  );

  modal.close();
  return true;
};

const loadDefaults = async () => {
  if (isEmbed || params['no-defaults']) return;
  for (const param of Object.keys(params)) {
    if (getLanguageByAlias(param)) return;
  }

  const defaultTemplateId = getAppData()?.defaultTemplate;
  if (defaultTemplateId) {
    notifications.info('Loading default template');

    const getDefaultTemplate = () => {
      if (!stores.templates) return;
      return stores.templates?.getItem(defaultTemplateId);
    };
    const defaultTemplate = (await getDefaultTemplate())?.config;

    if (defaultTemplate) {
      await loadConfig(defaultTemplate);
    }
    return;
  }

  const lastUsedLanguage = getAppData()?.language;
  if (lastUsedLanguage) {
    changingContent = true;
    await changeLanguage(lastUsedLanguage);
    changingContent = false;
  }
  setProjectRecover(/* reset = */ true);
};

const bootstrap = async (reload = false) => {
  if (reload) {
    await updateEditors(editors, getConfig());
  }
  phpHelper({ editor: editors.script });
  setLoading(true);
  await setActiveEditor(getConfig());
  loadSettings(getConfig());
  // TODO: Fix
  toolsPane?.console?.clear();
  if (!isEmbed) {
    setTimeout(() => getActiveEditor().focus());
  }
  setExternalResourcesMark();
  updateCompiledCode();
  loadModuleTypes(editors, getConfig());
  compiler.load(Object.values(editorLanguages || {}), getConfig()).then(() => {
    setTimeout(() => {
      if (
        toolsPane?.getActiveTool() === 'tests' &&
        ['open', 'full'].includes(toolsPane?.getStatus())
      ) {
        run(undefined, true);
      } else {
        run();
      }
    });
  });
  formatter.load(getEditorLanguages());
  if (isEmbed && !getConfig().tests?.content?.trim()) {
    toolsPane?.disableTool('tests');
  }
};

const initializeApp = async (
  options?: {
    config?: Partial<Config>;
    baseUrl?: string;
    isEmbed?: boolean;
    isLite?: boolean;
  },
  initializeFn?: () => void | Promise<void>,
) => {
  const appConfig = options?.config ?? {};
  baseUrl = options?.baseUrl ?? '/livecodes/';
  isLite = options?.isLite ?? false;
  isEmbed = isLite || (options?.isEmbed ?? false);

  setConfig(buildConfig(appConfig));
  configureModes({ config: getConfig(), isEmbed, isLite });

  compiler = await getCompiler({ config: getConfig(), baseUrl, eventsManager });
  formatter = getFormatter(getConfig(), baseUrl, isLite);
  customEditors = createCustomEditors({ baseUrl, eventsManager });
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
  basicHandlers();
  await initializeFn?.();
  loadUserConfig();
  loadStyles();
  await createIframe(UI.getResultElement());
  showMode(getConfig());
  loadSelectedScreen();
  setTheme(getConfig().theme);
  if (!isEmbed) {
    initializeAuth().then(() => showSyncStatus());
    checkRecoverStatus();
  }
  importExternalContent({
    config: getConfig(),
    configUrl: params.config,
    template: params.template,
    url: params.x || parent.location.hash.substring(1),
  }).then(async (contentImported) => {
    if (!contentImported) {
      await bootstrap();
      await loadDefaults();
    }
    if (isEmbed) {
      parent.dispatchEvent(new Event(customEvents.ready));
    }
    initialized = true;
  });
  configureEmmet(getConfig());
  showVersion();
};

const createApi = (): API => {
  const apiGetShareUrl = async (shortUrl = false) => (await share(shortUrl, true, false)).url;

  const apiGetConfig = async (contentOnly = false): Promise<Config> => {
    updateConfig();
    const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
    return JSON.parse(JSON.stringify(config));
  };

  const apiSetConfig = async (newConfig: Partial<Config>): Promise<Config> => {
    const newAppConfig = buildConfig(newConfig);
    await loadConfig(newAppConfig);
    return newAppConfig;
  };

  const apiGetCode = async (): Promise<Code> => {
    updateConfig();
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({});
    }
    return JSON.parse(JSON.stringify(getCachedCode()));
  };

  const apiShow: API['show'] = async (panel, { full = false, line, column } = {}) => {
    if (panel === 'result') {
      split.show('output', full);
      toolsPane?.close();
    } else if (panel === 'console' || panel === 'compiled' || panel === 'tests') {
      split.show('output');
      toolsPane?.setActiveTool(panel);
      if (full) {
        toolsPane?.maximize();
      } else {
        toolsPane?.open();
      }
    } else if (Object.keys(editors).includes(panel)) {
      showEditor(panel);
      split.show('code', full);
      if (typeof line === 'number' && line > 0) {
        const col = typeof column === 'number' && column > -1 ? column : 0;
        getActiveEditor().setPosition({ lineNumber: line, column: col });
        getActiveEditor().focus();
      }
    } else {
      throw new Error('Invalid panel id');
    }
  };

  const apiRunTests: API['runTests'] = () =>
    new Promise((resolve) => {
      eventsManager.addEventListener(
        document,
        customEvents.testResults,
        ((ev: CustomEventInit<{ results: TestResult[] }>) => {
          resolve({ results: ev.detail?.results || [] });
        }) as any,
        { once: true },
      );
      runTests();
    });

  const apiOnChange: API['onChange'] = (fn) => {
    const handler = async function () {
      fn({
        code: await apiGetCode(),
        config: await apiGetConfig(),
      });
    };
    eventsManager.addEventListener(document, customEvents.change, handler);
    return {
      remove: () => {
        eventsManager.removeEventListener(document, customEvents.change, handler);
      },
    };
  };

  const apiExec: API['exec'] = async (command: string, ...args: any[]) => {
    if (command === 'setBroadcastToken') {
      if (isEmbed) return { error: 'Command unavailable for embeds' };
      const broadcastData = getAppData()?.broadcast;
      if (!broadcastData) return { error: 'Command unavailable' };
      const token = args[0];
      if (typeof token !== 'string') return { error: 'Invalid token!' };
      setAppData({
        broadcast: {
          ...broadcastData,
          userToken: token,
        },
      });
      return { output: 'Broadcast user token set successfully' };
    }
    return { error: 'Invalid command!' };
  };

  const apiDestroy = async () => {
    getAllEditors().forEach((editor) => editor?.destroy());
    eventsManager.removeEventListeners();
    Object.values(stores).forEach((store) => store?.unsubscribeAll?.());
    parent.dispatchEvent(new Event(customEvents.destroy));
    formatter?.destroy();
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    isDestroyed = true;
  };

  const alreadyDestroyedMessage = 'Cannot call API methods after calling `destroy()`.';
  const reject = () => Promise.reject(alreadyDestroyedMessage);
  const throwError = () => {
    throw new Error(alreadyDestroyedMessage);
  };
  const call = <T>(fn: () => Promise<T>) => (!isDestroyed ? fn() : reject());
  const callSync = <T>(fn: () => T) => (!isDestroyed ? fn() : throwError());
  return {
    run: () => call(() => run()),
    format: (allEditors) => call(() => format(allEditors)),
    getShareUrl: (shortUrl) => call(() => apiGetShareUrl(shortUrl)),
    getConfig: (contentOnly) => call(() => apiGetConfig(contentOnly)),
    setConfig: (config) => call(() => apiSetConfig(config)),
    getCode: () => call(() => apiGetCode()),
    show: (pane, options) => call(() => apiShow(pane, options)),
    runTests: () => call(() => apiRunTests()),
    onChange: (fn) => callSync(() => apiOnChange(fn)),
    exec: (command, ...args) => call(() => apiExec(command, ...args)),
    destroy: () => call(() => apiDestroy()),
  };
};

export { createApi, initializeApp, loadToolsPane, extraHandlers };
