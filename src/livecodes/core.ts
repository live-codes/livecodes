/* eslint-disable import/no-internal-modules */
import { createEditor, createCustomEditors, getFontFamily } from './editor';
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
  fakeStorage,
  createStores,
  initializeStores,
  type Stores,
  type StorageItem,
} from './storage';
import type {
  API,
  Cache,
  CodeEditor,
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
  APICommands,
  CompileInfo,
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
  savePromptScreen,
  recoverPromptScreen,
  resultPopupHTML,
  welcomeScreen,
  aboutScreen,
} from './html';
import { exportJSON } from './export/export-json';
import { createEventsManager } from './events';
import { getStarterTemplates, getTemplate } from './templates';
import {
  buildConfig,
  defaultConfig,
  getConfig,
  getContentConfig,
  getEditorConfig,
  getFormatterConfig,
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
  toDataUrl,
} from './utils';
import { compress } from './utils/compression';
import { getCompiler, getAllCompilers, cjs2esm, getCompileResult } from './compiler';
import { createTypeLoader, getDefaultTypes } from './types';
import { createResultPage } from './result';
import * as UI from './UI/selectors';
import { createAuthService, getAppCDN, sandboxService, shareService } from './services';
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
import { permanentUrlService } from './services/permanent-url';

const stores: Stores = createStores();
const eventsManager = createEventsManager();
const notifications = createNotifications();
const modal = createModal();
let split: ReturnType<typeof createSplitPanes> | null = createSplitPanes();
const typeLoader = createTypeLoader();
const screens: Screen[] = [];
const params = getParams(); // query string params
const iframeScrollPosition = { x: 0, y: 0 };

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
      }&isEmbed=${isEmbed}&isLoggedIn=${Boolean(authService?.isLoggedIn())}&appCDN=${getAppCDN()}`;
      const scrollPosition =
        params.scrollPosition === false ||
        (iframeScrollPosition.x === 0 && iframeScrollPosition.y === 0)
          ? ''
          : `#livecodes-scroll-position:${iframeScrollPosition.x},${iframeScrollPosition.y}`;
      iframe.src = service.getResultUrl() + query + scrollPosition;
      container.appendChild(iframe);
    }

    resultLanguages = getEditorLanguages();
  });

const loadModuleTypes = async (editors: Editors, config: Config, force = false) => {
  if (typeof editors?.script?.addTypes !== 'function') return;
  const scriptLanguage = config.script.language;
  if (['typescript', 'javascript'].includes(mapLanguage(scriptLanguage)) || force) {
    const configTypes = {
      ...getLanguageCompiler(config.markup.language)?.types,
      ...getLanguageCompiler(config.script.language)?.types,
      ...getDefaultTypes(),
      ...config.types,
      ...config.customSettings.types,
    };
    const libs = await typeLoader.load(
      getConfig().script.content + '\n' + getConfig().markup.content,
      configTypes,
      force,
    );
    libs.forEach((lib) => editors.script.addTypes?.(lib, force));
  }
};

const highlightSelectedLanguage = (editorId: EditorId, language: Language) => {
  const menuItems = document.querySelectorAll<HTMLElement>(
    `.dropdown-menu-${editorId} .language-item a`,
  );
  menuItems.forEach((item) => {
    if (item.dataset.lang === language) {
      item.parentElement?.classList.add('active');
    } else {
      item.parentElement?.classList.remove('active');
    }
  });
};

const setEditorTitle = (editorId: EditorId, title: string) => {
  const editorTitle = document.querySelector(`#${editorId}-selector span`);
  const language = getLanguageByAlias(title);
  if (!editorTitle || !language) return;
  editorTitle.innerHTML = languages.find((lang) => lang.name === language)?.title || '';
  highlightSelectedLanguage(editorId, language);
};

const createCopyButtons = () => {
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const copyImgHtml = `<span><img src="${baseUrl}assets/images/copy.svg" alt="copy"></span>`;
  editorIds.forEach((editorId) => {
    const copyButton = document.createElement('div');
    copyButton.innerHTML = copyImgHtml;
    copyButton.classList.add('copy-button', 'tool-buttons');
    copyButton.title = 'Copy';
    document.getElementById(editorId)?.appendChild(copyButton);
    eventsManager.addEventListener(copyButton, 'click', () => {
      if (copyToClipboard(editors?.[editorId]?.getValue())) {
        copyButton.innerHTML = `<span><img src="${baseUrl}assets/images/tick.svg" alt="copied"></span>`;
        copyButton.classList.add('hint--left', 'visible');
        copyButton.dataset.hint = 'Copied!';
        copyButton.title = '';
        setTimeout(() => {
          copyButton.innerHTML = copyImgHtml;
          copyButton.classList.remove('hint--left', 'visible');
          copyButton.dataset.hint = '';
          copyButton.title = 'Copy';
        }, 2000);
      }
    });
  });
};

const createEditors = async (config: Config) => {
  if (editors) {
    Object.values(editors).forEach((editor: CodeEditor) => editor.destroy());
    resetEditorModeStatus();
  }

  const baseOptions = {
    baseUrl,
    mode: config.mode,
    readonly: config.readonly,
    theme: config.theme,
    ...getEditorConfig(config),
    isEmbed,
    mapLanguage,
    getLanguageExtension,
    getFormatterConfig: () => getFormatterConfig(getConfig()),
    getFontFamily,
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

  const markupEditor = await createEditor(markupOptions);
  const styleEditor = await createEditor(styleOptions);
  const scriptEditor = await createEditor(scriptOptions);

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
  await toolsPane?.console?.reloadEditor(config);
  await toolsPane?.compiled?.reloadEditor(config);
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
    split = null;
  }
  if (!showResult) {
    editorsElement.style.flexBasis = '100%';
    outputElement.style.display = 'none';
    resultElement.style.display = 'none';
    codeRunButton.style.display = 'none';
    split?.destroy(true);
    split = null;
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
  if (config.mode === 'full' && !split) {
    split = createSplitPanes();
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
  activeEditor.style.visibility = 'visible';
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
    split?.show('code');
  }
  configureEditorTools(getActiveEditor().getLanguage());
  showEditorModeStatus(editorId);
};

const showEditorModeStatus = (editorId: EditorId) => {
  const editorStatusNodes = document.querySelectorAll<HTMLElement>(
    '#editor-status > span[data-status]',
  );
  editorStatusNodes.forEach((node) => {
    if (node.dataset.status === editorId) {
      // node.style.display = 'block';
      node.style.position = 'unset';
      node.style.width = 'unset';
      node.style.overflow = 'unset';
    } else {
      // node.style.display = 'none';
      node.style.position = 'absolute';
      node.style.width = '0';
      node.style.overflow = 'hidden';
    }
  });
};

const resetEditorModeStatus = () => {
  const editorModeNode = UI.getEditorModeNode();
  if (editorModeNode) {
    editorModeNode.textContent = '';
  }
  const editorStatusNodes = document.querySelectorAll<HTMLElement>(
    '#editor-status > span[data-status]',
  );
  editorStatusNodes.forEach((node) => {
    node.innerHTML = '';
  });
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
    if (getConfig().autoupdate) {
      await run();
    }
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
  const scriptType = getLanguageCompiler(scriptLanguage)?.scriptType;

  const forceCompileStyles =
    [...config.processors, ...getCache().processors].find((name) =>
      processors.find((p) => name === p.name && p.needsHTML),
    ) &&
    (config.processors.join(',') !== getCache().processors.join(',') ||
      markupContent !== getCache().markup.content ||
      scriptContent !== getCache().script.content); /* e.g. jsx/sfc */

  const testsNotChanged =
    config.tests?.language === getCache().tests?.language &&
    config.tests?.content === getCache().tests?.content &&
    getCache().tests?.compiled;

  const markupCompileResult = await compiler.compile(markupContent, markupLanguage, config, {});
  let compiledMarkup = markupCompileResult.code;

  const scriptCompileResult = await compiler.compile(scriptContent, scriptLanguage, config, {
    forceCompile: forceCompileStyles,
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
  });
  const compiledScript = scriptCompileResult.code;

  let compileInfo: CompileInfo = {
    ...markupCompileResult.info,
    ...scriptCompileResult.info,
    importedContent:
      (markupCompileResult.info.importedContent || '') +
      (scriptCompileResult.info.importedContent || ''),
    imports: {
      ...scriptCompileResult.info.imports,
      ...markupCompileResult.info.imports,
    },
  };

  const compileResults = await Promise.all([
    compiler.compile(styleContent, styleLanguage, config, {
      html: `${compiledMarkup}<script>${compiledScript}</script><script>${compileInfo.importedContent}</script>`,
      forceCompile: forceCompileStyles,
    }),
    runTests
      ? testsNotChanged
        ? Promise.resolve(getCache().tests?.compiled || '')
        : compiler.compile(testsContent, testsLanguage, config, {})
      : Promise.resolve(getCompileResult(getCache().tests?.compiled || '')),
  ]);

  const [compiledStyle, compiledTests] = compileResults.map((result) => {
    const { code, info } = getCompileResult(result);
    compileInfo = {
      ...compileInfo,
      ...info,
    };
    return code;
  });

  if (compileInfo.modifiedHTML) {
    compiledMarkup = compileInfo.modifiedHTML;
  }

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
        config.customSettings.convertCommonjs === false || (scriptType && scriptType !== 'module')
          ? compiledScript
          : cjs2esm(compiledScript),
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
    compileInfo,
  });

  const styleOnlyUpdate = sourceEditor === 'style' && !compileInfo.cssModules;
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
  const config = getConfig();
  if (config.scripts.length > 0 || config.stylesheets.length > 0 || config.cssPreset) {
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
  const projectConfig = buildConfig(getConfig());
  if (!projectId) {
    projectId = (await stores.projects?.addItem(projectConfig)) || '';
  } else {
    await stores.projects?.updateItem(projectId, projectConfig);
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
  permanentUrl = false,
): Promise<ShareData> => {
  const content = contentOnly ? getContentConfig(getConfig()) : getConfig();

  const contentParam = shortUrl
    ? '?x=id/' +
      (await shareService.shareProject({
        ...content,
        result: includeResult ? getCache().result : undefined,
      }))
    : '?x=code/' + compress(JSON.stringify(content));

  const currentUrl = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';

  const url = permanentUrl ? permanentUrlService.getAppUrl() : currentUrl;

  const shareURL = url + contentParam;

  if (urlUpdate) {
    updateUrl(currentUrl + contentParam, true);
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

  // reset iframe scroll position
  iframeScrollPosition.x = 0;
  iframeScrollPosition.y = 0;

  // load config
  await bootstrap(true);

  changingContent = false;
};

const setUserConfig = (newConfig: Partial<UserConfig> | null, save = true) => {
  const userConfig = getUserConfig({
    ...getConfig(),
    ...(newConfig == null ? getUserConfig(defaultConfig) : newConfig),
  });

  setConfig({
    ...getConfig(),
    ...userConfig,
  });
  if (save) {
    stores.userConfig?.setValue({
      ...stores.userConfig.getValue(),
      ...newConfig,
    } as UserConfig);
  }
};

const loadUserConfig = (updateUI = true) => {
  if (isEmbed) return;
  const userConfig = stores.userConfig?.getValue();
  setConfig(
    buildConfig({
      ...getConfig(),
      ...userConfig,
    }),
  );
  if (!updateUI) return;
  loadSettings(getConfig());
  setTheme(getConfig().theme);
  showSyncStatus(true);
};

const loadTemplate = async (templateId: string) => {
  const templateConfig = (await stores.templates?.getItem(templateId))?.config;
  if (templateConfig) {
    await loadConfig(templateConfig);
  }
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

const checkSavedStatus = (doNotCloseModal = false): Promise<boolean> => {
  if (isSaved || isEmbed) {
    return Promise.resolve(true);
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
      resolve(true);
    });
    eventsManager.addEventListener(UI.getModalDoNotSaveButton(), 'click', () => {
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve(true);
    });
    eventsManager.addEventListener(UI.getModalCancelButton(), 'click', () => {
      if (!doNotCloseModal) {
        modal.close();
      }
      resolve(false);
    });
  });
};

const checkSavedAndExecute = (fn: () => void, cancelFn?: () => void) => () =>
  checkSavedStatus(true).then((confirmed) => {
    if (confirmed) {
      setTimeout(fn);
    } else if (typeof cancelFn === 'function') {
      setTimeout(cancelFn);
    } else {
      setTimeout(() => {
        modal.close();
      });
    }
  });

const setProjectRecover = (reset = false) => {
  if (isEmbed) return;
  stores.recover?.clear();
  if (reset || !getConfig().recoverUnsaved) return;
  stores.recover?.setValue({
    config: getContentConfig(getConfig()),
    lastModified: Date.now(),
  });
};

const checkRecoverStatus = (isWelcomeScreen = false) => {
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
    const welcomeRecover = UI.getModalWelcomeRecover();
    if (isWelcomeScreen) {
      welcomeRecover.style.display = 'unset';
    } else {
      const div = document.createElement('div');
      div.innerHTML = recoverPromptScreen;
      modal.show(div.firstChild as HTMLElement, { size: 'small', isAsync: true });
    }

    UI.getModalUnsavedName().textContent = projectName;
    UI.getModalUnsavedName().title = projectName;
    UI.getModalUnsavedLastModified().textContent = new Date(
      unsavedItem.lastModified,
    ).toLocaleString();
    const disableRecoverCheckbox = UI.getModalDisableRecoverCheckbox();

    eventsManager.addEventListener(UI.getModalRecoverButton(), 'click', async () => {
      modal.show(loadingMessage(), { size: 'small' });
      await loadConfig(unsavedProject);
      await setSavedStatus();
      modal.close();
      resolve('recover');
    });
    eventsManager.addEventListener(UI.getModalSavePreviousButton(), 'click', async () => {
      if (stores.projects) {
        await stores.projects.addItem(unsavedProject);
        notifications.success(`Project "${projectName}" saved to device.`);
      }
      if (isWelcomeScreen) {
        welcomeRecover.style.maxHeight = '0';
      } else {
        modal.close();
      }
      setProjectRecover(true);
      resolve('save and continue');
    });
    eventsManager.addEventListener(UI.getModalCancelRecoverButton(), 'click', () => {
      if (isWelcomeScreen) {
        welcomeRecover.style.maxHeight = '0';
      } else {
        modal.close();
      }
      setProjectRecover(true);
      resolve('cancel recover');
    });
    eventsManager.addEventListener(disableRecoverCheckbox, 'change', () => {
      setUserConfig({ recoverUnsaved: !disableRecoverCheckbox.checked });
      loadSettings(getConfig());
    });
  });
};

const configureEmmet = async (config: Config) => {
  [editors.markup, editors.style].forEach((editor, editorIndex) => {
    if (editor.monaco && editorIndex > 0) return; // emmet configuration for monaco is global
    editor.changeSettings(getEditorConfig(config));
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
  syncModule.init(baseUrl);

  for (const storeKey of storeKeys) {
    if (action === 'clear') {
      await syncModule.exportToLocalSync({ user, storeKey });
      stores[storeKey]?.clear();
    } else {
      await syncModule.restoreFromLocalSync({ user, storeKey });
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
  const foundScreen = screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase());
  if (!foundScreen) return;
  await foundScreen.show(options);
  const modalElement = document.querySelector('#modal') as HTMLElement;
  (modalElement.firstElementChild as HTMLElement)?.click();
};

const loadSelectedScreen = () => {
  const params = Object.fromEntries(
    new URLSearchParams(parent.location.search) as unknown as Iterable<any>,
  );
  // ?new or ?screen=<screen_name>
  const screen = params.new === '' ? 'new' : params.screen;
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

  const delayValue = UI.getDelayValue();
  const delayRange = UI.getDelayRange();
  delayRange.value = String(config.delay);
  delayValue.textContent = String(config.delay / 1000);

  const autosaveToggle = UI.getAutosaveToggle();
  autosaveToggle.checked = config.autosave;

  const autosyncToggle = UI.getAutosyncToggle();
  getUserData().then((userData) => {
    autosyncToggle.checked = userData?.sync?.autosync || false;
  });

  const formatOnsaveToggle = UI.getFormatOnsaveToggle();
  formatOnsaveToggle.checked = config.formatOnsave;

  const themeToggle = UI.getThemeToggle();
  themeToggle.checked = config.theme === 'dark';

  const recoverToggle = UI.getRecoverToggle();
  recoverToggle.checked = config.recoverUnsaved;

  const showWelcomeToggle = UI.getShowWelcomeToggle();
  showWelcomeToggle.checked = config.welcome;

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

const loadStarterTemplate = async (templateName: Template['name'], checkSaved = true) => {
  const templates = await getTemplates();
  const { title, thumbnail, ...templateConfig } =
    templates.filter((template) => template.name === templateName)?.[0] || {};
  if (templateConfig) {
    setAppData({
      recentTemplates: [
        { name: templateName, title },
        ...(getAppData()?.recentTemplates?.filter((t) => t.name !== templateName) || []),
      ].slice(0, 5),
    });
    const doNotCheckAndExecute = (fn: () => void) => async () => fn();
    (checkSaved ? checkSavedAndExecute : doNotCheckAndExecute)(() => {
      projectId = '';
      loadConfig(
        {
          ...defaultConfig,
          ...templateConfig,
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

const zoom = (level: Config['zoom'] = 1) => {
  const iframe = UI.getResultIFrameElement();
  const zoomBtnValue = UI.getZoomButtonValue();
  if (!iframe || !zoomBtnValue) return;

  iframe.classList.remove('zoom25');
  iframe.classList.remove('zoom50');

  if (level === 0.5) {
    iframe.classList.add('zoom50');
  }

  if (level === 0.25) {
    iframe.classList.add('zoom25');
  }

  zoomBtnValue.textContent = String(level);
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

const getVersion = (log = true) => {
  // variables added in scripts/build.js
  const appVersion = process.env.VERSION || '';
  const sdkVersion = process.env.SDK_VERSION || '';
  const commitSHA = process.env.GIT_COMMIT || '';
  const repoUrl = process.env.REPO_URL || '';
  const appUrl = permanentUrlService.getAppUrl();
  const sdkUrl = permanentUrlService.getSDKUrl();

  if (log) {
    // eslint-disable-next-line no-console
    console.log(`App Version: ${appVersion} (${repoUrl}/releases/tag/v${appVersion})`);
    // eslint-disable-next-line no-console
    console.log(
      `SDK Version: ${sdkVersion} (https://www.npmjs.com/package/livecodes/v/${sdkVersion})`,
    );
    // eslint-disable-next-line no-console
    console.log(`Git commit: ${commitSHA} (${repoUrl}/commit/${commitSHA})`);
    // eslint-disable-next-line no-console
    console.log(`App Permanent URL: ${appUrl}`);
    // eslint-disable-next-line no-console
    console.log(`SDK Permanent URL: ${sdkUrl}`);
  }

  return {
    appVersion,
    sdkVersion,
    commitSHA,
    appUrl,
    sdkUrl,
  };
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
  if (!gutter) return;

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

const handleIframeScroll = () => {
  eventsManager.addEventListener(window, 'message', (event: any) => {
    const iframe = UI.getResultIFrameElement();
    if (!iframe || event.source !== iframe.contentWindow || event.data.type !== 'scroll') {
      return;
    }

    const position = event.data.position;
    iframeScrollPosition.x = Number(position.x) || 0;
    iframeScrollPosition.y = Number(position.y) || 0;
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
    debounce(
      async () => {
        await contentChanged(editorId, changingContent);
      },
      () => getConfig().delay ?? defaultConfig.delay,
    );

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
      split?.show('output');
      toolsPane?.setActiveTool('tests');
      if (toolsPane?.getStatus() === 'closed') {
        toolsPane?.open();
      }
      await runTests();
      return;
    }

    // Shift + Enter triggers run
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      split?.show('output');
      await run();
      return;
    }
  };

  eventsManager.addEventListener(window, 'keydown', hotKeys as any, true);
};

const handleLogoLink = () => {
  if (isEmbed || getConfig().mode === 'result') return;
  const logoLink = UI.getLogoLink();
  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    parent.postMessage({ args: 'home' }, location.origin);
  });
};

const handleRunButton = () => {
  const handleRun = async () => {
    split?.show('output');
    await run();
  };
  eventsManager.addEventListener(UI.getRunButton(), 'click', handleRun);
  eventsManager.addEventListener(UI.getCodeRunButton(), 'click', handleRun);
};

const handleResultButton = () => {
  eventsManager.addEventListener(UI.getResultButton(), 'click', () => split?.show('output', true));
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

  eventsManager.addEventListener(UI.getCopyAsUrlButton(), 'click', () => {
    const currentEditor = getActiveEditor();
    const mimeType = 'text/' + currentEditor.getLanguage();
    const dataUrl = toDataUrl(currentEditor.getValue(), mimeType);
    if (copyToClipboard(dataUrl)) {
      notifications.success('Code copied as data URL');
    } else {
      notifications.error('Failed to copy code');
    }
  });

  eventsManager.addEventListener(UI.getEditorStatus(), 'click', () => {
    showScreen('editor-settings', { scrollToSelector: 'label[data-name="editorMode"]' });
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
        if (getConfig().autoupdate) {
          await run();
        }
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
      if (configKey === 'welcome') {
        setUserConfig({
          welcome: toggle.checked,
        });
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
        if (getConfig().autoupdate) {
          await run();
        }
      }
    });
  });

  const delayRange = UI.getDelayRange();
  eventsManager.addEventListener(delayRange, 'input', () => {
    const delayValue = UI.getDelayValue();
    const value = Number(delayRange.value);
    delayValue.textContent = String(value / 1000);
    setConfig({ ...getConfig(), delay: value });
    setUserConfig(getUserConfig(getConfig()));
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
            if (stores.templates && (await stores.templates.getList()).length === 0) {
              list.remove();
              userTemplatesScreen.innerHTML = noUserTemplates;
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
                loadStarterTemplate(template.name, /* checkSaved= */ false);
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
    const shareFn = (shortUrl = false, permanentUrl = false): Promise<ShareData> =>
      share(
        shortUrl,
        /* contentOnly= */ true,
        /* urlUpdate= */ false,
        /* includeResult= */ true,
        permanentUrl,
      );
    const shareContainer = await importModule.createShareContainer(shareFn, baseUrl, eventsManager);
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

  const minute = 1000 * 60;
  const syncFrequency = 30 * minute;
  let syncInterval: number;
  const sync = async () => {
    if (isDestroyed) {
      clearInterval(syncInterval);
      return;
    }

    const syncData = (await getUserData())?.sync;
    if (!syncData?.autosync) return;
    if (Date.now() - syncData.lastSync < syncFrequency) return;
    const user = await authService?.getUser();
    const repo = syncData.repo;
    if (!user || !repo) return;

    const syncModule: typeof import('./sync/sync') = await import(baseUrl + '{{hash:sync.js}}');
    syncModule.init(baseUrl);

    const syncResult = await syncModule.sync({
      user,
      repo,
      newRepo: false,
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

  const triggerSync = () => {
    setTimeout(() => {
      sync();
      syncInterval = window.setInterval(sync, syncFrequency);
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

  const updateRecentProjects = (allProjects: StorageItem[]) => {
    const recentProjects =
      allProjects
        ?.slice(0, 5)
        .map((p) => ({ id: p.id, title: p.config.title, description: p.config.description })) || [];
    setAppData({ recentProjects });
  };

  const projectSubscription = stores.projects?.subscribe(requestPersistance);
  const templateSubscription = stores.templates?.subscribe(requestPersistance);
  const assetSubscription = stores.assets?.subscribe(requestPersistance);

  stores.projects?.subscribe(updateRecentProjects);
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

const handleWelcome = () => {
  if (isEmbed) return;

  const createWelcomeUI = async () => {
    modal.show(loadingMessage());

    const div = document.createElement('div');
    div.innerHTML = welcomeScreen.replace(/{{baseUrl}}/g, baseUrl);
    const welcomeContainer = div.firstChild as HTMLElement;
    modal.show(welcomeContainer);

    const showWelcomeCheckbox = UI.getModalShowWelcomeCheckbox(welcomeContainer);
    showWelcomeCheckbox.checked = getConfig().welcome;

    eventsManager.addEventListener(UI.getWelcomeLinkNew(welcomeContainer), 'click', () => {
      showScreen('new');
    });
    eventsManager.addEventListener(UI.getWelcomeLinkOpen(welcomeContainer), 'click', () => {
      showScreen('open');
    });
    eventsManager.addEventListener(UI.getWelcomeLinkImport(welcomeContainer), 'click', () => {
      showScreen('import');
    });
    eventsManager.addEventListener(UI.getWelcomeLinkRecentOpen(welcomeContainer), 'click', () => {
      showScreen('open');
    });
    eventsManager.addEventListener(UI.getWelcomeLinkTemplates(welcomeContainer), 'click', () => {
      showScreen('new');
    });
    eventsManager.addEventListener(showWelcomeCheckbox, 'change', () => {
      setUserConfig({ welcome: showWelcomeCheckbox.checked });
      loadSettings(getConfig());
    });

    if (!initialized) {
      checkRecoverStatus(/* isWelcomeScreen= */ true);
    }

    const loadRecentProject = async (pId: string) => {
      modal.show(loadingMessage(), { size: 'small' });
      const savedProject = (await stores.projects?.getItem(pId))?.config;
      if (savedProject) {
        await loadConfig(savedProject);
        projectId = pId;
      }
      modal.close();
    };

    const recentProjects = getAppData()?.recentProjects?.slice(0, 5).reverse() || [];

    const welcomeModalScreen = UI.getModalWelcomeScreen(welcomeContainer);
    const welcomeRecent = UI.getModalWelcomeRecent(welcomeContainer);

    if (recentProjects.length === 0 && welcomeModalScreen && welcomeRecent) {
      welcomeRecent.style.display = 'none';
      welcomeModalScreen.classList.add('no-recent');
    } else {
      const list = UI.getModalWelcomeRecentList(welcomeContainer);
      recentProjects.forEach((p) => {
        const item = document.createElement('li');
        item.classList.add('overflow-ellipsis');

        const link = document.createElement('a');
        link.textContent = p.title;
        link.title = p.description.trim() || p.title;
        link.href = '#';

        item.appendChild(link);
        list?.prepend(item);

        eventsManager.addEventListener(link, 'click', () =>
          checkSavedStatus().then((confirmed) => {
            if (confirmed) {
              loadRecentProject(p.id);
            }
          }),
        );
      });
    }

    const defaultTemplateId = getAppData()?.defaultTemplate;
    if (!defaultTemplateId) {
      UI.getWelcomeLinkNoDefaultTemplate(welcomeContainer).style.display = 'unset';
    } else {
      const loadTemplateLink = UI.getWelcomeLinkLoadDefault(welcomeContainer);
      eventsManager.addEventListener(
        loadTemplateLink,
        'click',
        async (event) => {
          event.preventDefault();
          modal.show(loadingMessage(), { size: 'small' });
          await loadTemplate(defaultTemplateId);
          modal.close();
        },
        false,
      );
      loadTemplateLink.style.display = 'unset';
    }
    UI.getWelcomeLinkDefaultTemplateLi(welcomeContainer).style.visibility = 'visible';

    const defaultTemplates: Array<{ name: Template['name']; title: string }> = [
      {
        name: 'blank',
        title: 'Blank Project',
      },
      {
        name: 'javascript',
        title: 'JavaScript Starter',
      },
      {
        name: 'typescript',
        title: 'TypeScript Starter',
      },
      {
        name: 'react',
        title: 'React Starter',
      },
      {
        name: 'vue',
        title: 'Vue 3 Starter',
      },
    ];
    const savedRecentTemplates = getAppData()?.recentTemplates || [];
    const recentTemplates = [
      ...savedRecentTemplates,
      ...defaultTemplates.filter((t) => !savedRecentTemplates.map((r) => r.name).includes(t.name)),
    ]
      .slice(0, 5)
      .reverse();

    const templateList = UI.getModalWelcomeTemplateList(welcomeContainer);
    recentTemplates.forEach((t) => {
      const item = document.createElement('li');

      const link = document.createElement('a');
      link.textContent = t.title;
      link.href = '#';

      item.appendChild(link);
      templateList?.prepend(item);

      eventsManager.addEventListener(link, 'click', () =>
        checkSavedStatus().then((confirmed) => {
          if (confirmed) {
            loadStarterTemplate(t.name);
          }
        }),
      );
    });
  };

  eventsManager.addEventListener(UI.getWelcomeLink(), 'click', createWelcomeUI);
  registerScreen('welcome', createWelcomeUI);
};

const handleAbout = () => {
  if (isEmbed) return;

  const createAboutUI = async () => {
    const versions = getVersion();
    const repoUrl = process.env.REPO_URL || '';
    const div = document.createElement('div');
    div.innerHTML = aboutScreen
      .replace(/{{COMMIT_URL}}/g, `${repoUrl}/commit/${versions.commitSHA}`)
      .replace(/{{APP_URL}}/g, versions.appUrl)
      .replace(/{{SDK_URL}}/g, versions.sdkUrl);
    const aboutContainer = div.firstChild as HTMLElement;
    modal.show(aboutContainer);
  };

  eventsManager.addEventListener(UI.getAboutLink(), 'click', createAboutUI);
  registerScreen('about', createAboutUI);
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
  const getUrlFn = async (permanentUrl = false) =>
    (
      await share(
        /* shortUrl= */ true,
        /* contentOnly= */ true,
        /* urlUpdate= */ false,
        /* includeResult= */ false,
        permanentUrl,
      )
    ).url;
  const config = getConfig();

  const createEditorFn = async (container: HTMLElement) =>
    createEditor({
      baseUrl,
      container,
      editorId: 'embed',
      getLanguageExtension,
      isEmbed,
      language: 'html',
      mapLanguage,
      readonly: true,
      theme: config.theme,
      value: '',
      ...getEditorConfig(config),
      editor: 'codejar',
      getFormatterConfig: () => getFormatterConfig(getConfig()),
      getFontFamily,
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

const handleEditorSettings = () => {
  const changeSettings = (newConfig: Partial<UserConfig> | null) => {
    if (!newConfig) return;
    const shouldReload = newConfig.editor !== getConfig().editor;
    setUserConfig(newConfig);
    if (shouldReload) {
      reloadEditors(getConfig());
    } else {
      getAllEditors().forEach((editor) => editor.changeSettings(newConfig as UserConfig));
    }
    showEditorModeStatus(getConfig().activeEditor || 'markup');
  };
  const createEditorSettingsUI = async ({
    scrollToSelector = '',
  }: { scrollToSelector?: string } = {}) => {
    modal.show(loadingMessage());

    const editorSettingsModule: typeof import('./UI/editor-settings') = await import(
      baseUrl + '{{hash:editor-settings.js}}'
    );
    await editorSettingsModule.createEditorSettingsUI({
      baseUrl,
      modal,
      eventsManager,
      scrollToSelector,
      deps: {
        getUserConfig: () => getUserConfig(getConfig()),
        createEditor,
        getFormatFn: () => formatter.getFormatFn('jsx'),
        changeSettings,
      },
    });
  };

  eventsManager.addEventListener(
    UI.getEditorSettingsLink(),
    'click',
    () => createEditorSettingsUI(),
    false,
  );
  registerScreen('editor-settings', createEditorSettingsUI);
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
      container: null,
      editorId: 'snippet',
      getLanguageExtension,
      isEmbed,
      language: 'html',
      value: '',
      theme: getConfig().theme,
      readonly: getConfig().readonly,
      mapLanguage,
      getFormatterConfig: () => getFormatterConfig(getConfig()),
      getFontFamily,
      ...getEditorConfig(getConfig()),
      ...options,
    });

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
  const createExrenalResourcesUI = async () => {
    const loadResources = async () => {
      setExternalResourcesMark();
      await setSavedStatus();
      modal.close();
      if (getConfig().autoupdate) {
        await run();
      }
    };

    modal.show(loadingMessage());
    const resourcesModule: typeof import('./UI/resources') = await import(
      baseUrl + '{{hash:resources.js}}'
    );
    resourcesModule.createExternalResourcesUI({
      baseUrl,
      modal,
      eventsManager,
      deps: {
        getConfig,
        setConfig,
        loadResources,
      },
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
  registerScreen('resources', createExrenalResourcesUI);
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
      editorId: 'customSettings',
      container: UI.getCustomSettingsEditor(),
      language: 'json' as Language,
      value: stringify({ imports: {}, ...config.customSettings }, true),
      theme: config.theme,
      isEmbed,
      mapLanguage,
      getLanguageExtension,
      getFormatterConfig: () => getFormatterConfig(getConfig()),
      getFontFamily,
      ...getEditorConfig(config),
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
      if (JSON.stringify(customSettings) !== JSON.stringify(getConfig().customSettings)) {
        compiler.clearCache();
        setConfig({
          ...getConfig(),
          customSettings,
        });
        await setSavedStatus();
        if (customSettings.types) {
          loadModuleTypes(editors, getConfig(), /* force */ true);
        }
      }
      customSettingsEditor?.destroy();
      modal.close();
      if (getConfig().autoupdate) {
        await run();
      }
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
      editorId: 'tests',
      container: UI.getTestEditor(),
      language: editorLanguage,
      value: config.tests?.content || '',
      theme: config.theme,
      isEmbed,
      mapLanguage,
      getLanguageExtension,
      getFormatterConfig: () => getFormatterConfig(getConfig()),
      getFontFamily,
      ...getEditorConfig(config),
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
  zoomBtn.id = 'zoom-button';
  zoomBtn.classList.add('tool-buttons', 'hint--top');
  zoomBtn.dataset.hint = 'Zoom';
  zoomBtn.style.pointerEvents = 'all'; //  override setting to 'none' on toolspane bar
  zoomBtn.innerHTML = `
  <span class="text">
    <span id="zoom-value">${String(Number(getConfig().zoom))}</span>
    &times;
  </span>`;

  const toggleZoom = () => {
    const config = getConfig();
    const currentZoom = config.zoom;
    const newZoom = currentZoom === 1 ? 0.5 : currentZoom === 0.5 ? 0.25 : 1;
    setConfig({
      ...config,
      zoom: newZoom,
    });
    zoom(newZoom);
  };

  eventsManager.addEventListener(zoomBtn, 'click', toggleZoom);
  eventsManager.addEventListener(zoomBtn, 'touchstart', toggleZoom);
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
  handleTests();
  handleResultZoom();
  getResultElement().classList.remove('full');
};

const basicHandlers = () => {
  handleLogoLink();
  handleResize();
  handleIframeResize();
  handleIframeScroll();
  handleSelectEditor();
  handleChangeLanguage();
  handleChangeContent();
  handleHotKeys();
  handleRunButton();
  handleResultButton();
  handleEditorTools();
  handleProcessors();
  handleResultLoading();
  if (isEmbed) {
    handleExternalResources();
    handleFullscreen();
  }
};

const extraHandlers = async () => {
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
  handleEditorSettings();
  handleSync();
  handleAutosync();
  handlePersistantStorage();
  handleExternalResources();
  handleBackup();
  handleBroadcast();
  handleWelcome();
  handleAbout();
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
      split?.show('code', true);
    }
    if (params.view === 'result') {
      split?.show('output', true);
    }
  }
  if (config.mode === 'codeblock') {
    setConfig({ ...config, readonly: true });
  }
  if (config.mode === 'editor' || config.mode === 'codeblock' || config.mode === 'result') {
    split?.destroy();
    split = null;
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
    const templateObj = await getTemplate(template, config, baseUrl);
    if (templateObj) {
      templateConfig = upgradeAndValidate(templateObj);
    } else {
      notifications.error('Could not load template: ' + template);
    }
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

    if (Object.keys(urlConfig).length === 0) {
      notifications.error('Invalid import URL');
    }
  }

  if (hasContentUrls(config)) {
    // load content from config contentUrl
    const editorsContent = await Promise.all(
      editorIds.map((editorId) => {
        const contentUrl = config[editorId].contentUrl;
        if (contentUrl && getValidUrl(contentUrl) && !config[editorId].content) {
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
  if (
    isEmbed ||
    params['no-defaults'] ||
    params.languages ||
    params.template ||
    params.config ||
    params.active ||
    params.activeEditor ||
    getLanguageByAlias(params.lang) ||
    getLanguageByAlias(params.language)
  ) {
    return;
  }

  for (const param of Object.keys(params)) {
    if (getLanguageByAlias(param)) return;
  }

  if ((getConfig().welcome && !params.screen) || params.screen === 'welcome') {
    showScreen('welcome');
    return;
  }

  const defaultTemplateId = getAppData()?.defaultTemplate;
  if (defaultTemplateId) {
    notifications.info('Loading default template');
    await loadTemplate(defaultTemplateId);
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
  zoom(getConfig().zoom);
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
    if (!getConfig().autoupdate) {
      setLoading(false);
      return;
    }
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

  await initializeStores(stores, isEmbed);
  loadUserConfig(/* updateUI = */ false);
  setConfig(buildConfig({ ...getConfig(), ...appConfig }));
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
  await createEditors(getConfig());
  basicHandlers();
  await initializeFn?.();
  loadUserConfig(/* updateUI = */ true);
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
};

const createApi = (): API => {
  const apiGetShareUrl = async (shortUrl = false) => (await share(shortUrl, true, false)).url;

  const apiGetConfig = async (contentOnly = false): Promise<Config> => {
    updateConfig();
    const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
    return JSON.parse(JSON.stringify(config));
  };

  const apiSetConfig = async (newConfig: Partial<Config>): Promise<Config> => {
    const newAppConfig = {
      ...getConfig(),
      ...buildConfig(newConfig),
    };

    // TODO: apply changes in App AppConfig, UserConfig & EditorConfig
    if (newAppConfig.mode !== getConfig().mode) {
      showMode(newAppConfig);
    }

    setConfig(newAppConfig);
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

  const apiShow: API['show'] = async (
    panel,
    { full = false, line, column, zoom: zoomLevel } = {},
  ) => {
    if (panel === 'result') {
      split?.show('output', full);
      toolsPane?.close();
      if (zoomLevel) {
        zoom(zoomLevel);
      }
    } else if (panel === 'console' || panel === 'compiled' || panel === 'tests') {
      split?.show('output');
      toolsPane?.setActiveTool(panel);
      if (full) {
        toolsPane?.maximize();
      } else {
        toolsPane?.open();
      }
    } else if (Object.keys(editors).includes(panel)) {
      showEditor(panel);
      split?.show('code', full);
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

  const apiExec: API['exec'] = async (command: APICommands, ...args: any[]) => {
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
    if (command === 'showVersion') {
      const output = getVersion();
      return { output };
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
