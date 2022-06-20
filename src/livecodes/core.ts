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
  getLanguageExtension,
} from './languages';
import {
  createSimpleStorage,
  createStorage,
  RestoreItem,
  ProjectStorage,
  SimpleStorage,
  fakeStorage,
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
} from './models';
import type { GitHubFile } from './deploy';
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
  restorePromptScreen,
} from './html';
// eslint-disable-next-line import/no-internal-modules
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
// eslint-disable-next-line import/no-internal-modules
import { isGithub } from './import/github';
import {
  copyToClipboard,
  debounce,
  getValidUrl,
  loadStylesheet,
  stringify,
  stringToValidJson,
} from './utils';
// eslint-disable-next-line import/no-internal-modules
import { compress } from './utils/compression';
import { getCompiler, getAllCompilers, cjs2esm } from './compiler';
import { createTypeLoader } from './types';
import { createResultPage } from './result';
// eslint-disable-next-line import/no-internal-modules
import * as UI from './UI/selectors';
import { createAuthService, sandboxService, shareService } from './services';
import { cacheIsValid, getCache, getCachedCode, setCache, updateCache } from './cache';
import {
  chaiTypesUrl,
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
  createPluginItem,
} from './UI';
import { customEvents } from './custom-events';
// eslint-disable-next-line import/no-internal-modules
import { populateConfig } from './import/utils';

const eventsManager = createEventsManager();
let projectStorage: ProjectStorage | undefined;
let templateStorage: ProjectStorage | undefined;
let assetsStorage: ProjectStorage | undefined;
let userConfigStorage: SimpleStorage<UserConfig> | undefined;
let restoreStorage: SimpleStorage<RestoreItem> | undefined;
const typeLoader = createTypeLoader();
const notifications = createNotifications();
const modal = createModal();
const split = createSplitPanes();
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
      iframe.setAttribute('allow', 'camera; geolocation; microphone');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allowtransparency', 'true');
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
      : config.languages?.find((lang) => getLanguageEditorId(lang) === 'markup') || 'html',
    value: languageIsEnabled(config.markup.language, config) ? config.markup.content || '' : '',
  };
  const styleOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getStyleElement(),
    editorId: 'style',
    language: languageIsEnabled(config.style.language, config)
      ? config.style.language
      : config.languages?.find((lang) => getLanguageEditorId(lang) === 'style') || 'css',
    value: languageIsEnabled(config.style.language, config) ? config.style.content || '' : '',
  };
  const scriptOptions: EditorOptions = {
    ...baseOptions,
    container: UI.getScriptElement(),
    editorId: 'script',
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
    (config.processors.postcss.tailwindcss || config.processors.postcss.windicss) &&
    (markupContent !== getCache().markup.content || scriptContent !== getCache().script.content);

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

  iframe.contentWindow.postMessage({ flush: true }, sandboxService.getOrigin());

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
    projectId = (await projectStorage?.addItem(getConfig())) || '';
  } else {
    await projectStorage?.updateItem(projectId, getConfig());
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
  setProjectRestore();

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
  userConfigStorage?.setValue(userConfig);
};

const loadUserConfig = () => {
  const userConfig = userConfigStorage?.getValue();
  if (!userConfig) {
    setUserConfig(getUserConfig(getConfig()));
    return;
  }
  setConfig({
    ...getConfig(),
    ...userConfig,
  });
};

const dispatchChangeEvent = () => {
  const changeEvent = new Event(customEvents.change);
  document.dispatchEvent(changeEvent);
  parent.dispatchEvent(changeEvent);
};

const setSavedStatus = async () => {
  if (isEmbed) return;
  updateConfig();
  const savedConfig = projectId && (await projectStorage?.getItem(projectId || ''))?.config;
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
  restoreStorage?.clear();
  if (reset || !getConfig().enableRestore) return;
  restoreStorage?.setValue({
    config: getContentConfig(getConfig()),
    lastModified: Date.now(),
  });
};

const checkRestoreStatus = () => {
  if (!getConfig().enableRestore || isEmbed) {
    return Promise.resolve('restore disabled');
  }
  const unsavedItem = restoreStorage?.getValue();
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
      if (projectStorage) {
        await projectStorage.addItem(unsavedProject);
        notifications.success(`Project "${projectName}" saved to device.`);
        setRestoreConfig(!disableRestoreCheckbox.checked);
      }
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
    .signOut()
    .then(() => {
      notifications.success('Logged out successfully');
      displayLoggedOut();
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
        setProjectRestore();
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
  const pluginList = pluginSpecs
    .filter((plugin) => !plugin.hidden)
    .map((plugin) => ({ name: plugin.name, title: plugin.title }));
  if (!styleMenu || pluginList.length === 0 || !processorIsEnabled('postcss', getConfig())) {
    return;
  }

  pluginList.forEach((plugin) => {
    const pluginItem = createPluginItem(plugin);
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
    const userTemplates = (await templateStorage?.getList()) || [];

    if (userTemplates.length === 0) {
      userTemplatesScreen.innerHTML = noUserTemplates;
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
          const template = (await templateStorage?.getItem(itemId))?.config;
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
          if (!templateStorage) return;
          await templateStorage.deleteItem(item.id);
          const li = deleteButton.parentElement as HTMLElement;
          li.classList.add('hidden');
          setTimeout(async () => {
            li.style.display = 'none';
            if (
              templateStorage &&
              (await templateStorage.getList()).length === 0 &&
              noDataMessage
            ) {
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
    if (templateStorage) {
      await templateStorage.addItem(getConfig());
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
      projectStorage: projectStorage || fakeStorage,
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
      projectStorage,
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
      let user = await authService?.getUser();
      if (!user) {
        user = await login();
      }
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
    const deployModule: typeof import('./UI/deploy') = await import(baseUrl + '{{hash:deploy.js}}');
    deployModule.createDeployUI({
      modal,
      notifications,
      eventsManager,
      user,
      deps: {
        getResultPage,
        getCache,
        getConfig,
        getContentConfig,
        getLanguageExtension,
      },
    });
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
  const createProjectInfo = () =>
    createProjectInfoUI(getConfig(), projectStorage || fakeStorage, modal, eventsManager, onSave);

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
      title: getConfig().title,
      editors: {
        markup: getLanguageTitle(getConfig().markup.language),
        style: getLanguageTitle(getConfig().style.language),
        script: getLanguageTitle(getConfig().script.language),
      },
      activeEditor: getConfig().activeEditor || 'markup',
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
      assetsStorage: assetsStorage || fakeStorage,
      showScreen,
      baseUrl,
    });
  };

  const createAddAsset = async (activeTab: number) => {
    await loadModule();

    const deployModule: typeof import('./UI/deploy') = await import(baseUrl + '{{hash:deploy.js}}');
    const deployAsset = async (user: User, file: GitHubFile) =>
      deployModule.deployFile({ user, file });
    modal.show(
      assetsModule.createAddAssetContainer({
        eventsManager,
        notifications,
        assetsStorage: assetsStorage || fakeStorage,
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
  const openWindow = async () => {
    popupBtn.classList.add('loading');
    const html = await getResultPage({ forExport: true, singleFile: true });
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    // add a notice to URL that it is a temporary URL to prevent users from sharing it.
    // revoking the URL after opening the window prevents viewing the page source.
    const notice = '#---TEMPORARY-URL---';
    window.open(url + notice, 'result-popup', `width=800,height=400,noopener,noreferrer`);
    popupBtn.classList.remove('loading');
  };
  eventsManager.addEventListener(popupBtn, 'click', openWindow);
  eventsManager.addEventListener(popupBtn, 'touchstart', openWindow);
  UI.getToolspaneTitles()?.appendChild(popupBtn);
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
  }
};

const extraHandlers = async () => {
  projectStorage = await createStorage('__livecodes_data__', isEmbed);
  templateStorage = await createStorage('__livecodes_templates__', isEmbed);
  assetsStorage = await createStorage('__livecodes_assets__', isEmbed);
  userConfigStorage = createSimpleStorage<UserConfig>('__livecodes_user_config__', isEmbed);
  restoreStorage = createSimpleStorage<RestoreItem>('__livecodes_project_restore__', isEmbed);

  handleTitleEdit();
  handleResultPopup();
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
  handleUnload();
  handleExternalResources();
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
    {
      ...config,
      ...templateConfig,
      ...urlConfig,
      ...contentUrlConfig,
      ...configUrlConfig,
    },
    parent.location.href,
    false,
  );

  modal.close();
  return true;
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

  setConfig(buildConfig(appConfig, baseUrl));
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
    initializeAuth();
    checkRestoreStatus();
  }
  importExternalContent({
    config: getConfig(),
    configUrl: params.config,
    template: params.template,
    url: params.x || parent.location.hash.substring(1),
  }).then(async (contentImported) => {
    if (!contentImported) {
      await bootstrap();
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
    const newAppConfig = buildConfig(newConfig, baseUrl);
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

  const apiShow: API['show'] = async (panel, { full = false, line, column }) => {
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
        getActiveEditor().goToLine(line, col);
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

  let isDestroyed = false;
  const apiDestroy = async () => {
    getAllEditors().forEach((editor) => editor.destroy());
    eventsManager.removeEventListeners();
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
    destroy: () => call(() => apiDestroy()),
  };
};

export { createApi, initializeApp, loadToolsPane, extraHandlers };
