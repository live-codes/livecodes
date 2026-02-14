import { getPlaygroundUrl } from '../sdk';
import {
  addTemplateToIndex,
  createLoginContainer,
  createOpenItem,
  createProjectInfoUI,
  createSplitPanes,
  createStarterTemplateLink,
  createTemplatesContainer,
  displayLoggedIn,
  displayLoggedOut,
  getFullscreenButton,
  getResultElement,
  initTemplatesSearchIndex,
  loadingMessage,
  noUserTemplates,
} from './UI';
import type {
  BroadcastData,
  BroadcastInfo,
  BroadcastResponseData,
  BroadcastResponseError,
} from './UI/broadcast';
import { getCommandMenuActions } from './UI/command-menu-actions';
import { createLanguageMenus, createProcessorItem } from './UI/create-language-menus';
import { createModal } from './UI/modal';
import * as UI from './UI/selectors';
import { themeColors } from './UI/theme-colors';
import { cacheIsValid, getCache, getCachedCode, setCache, updateCache } from './cache';
import { cjs2esm, getAllCompilers, getCompileResult, getCompiler } from './compiler';
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
import { createCustomEditors, createEditor, getFontFamily } from './editor';
import { hasJsx } from './editor/ts-compiler-options';
import { createEventsManager, createPub } from './events';
import { customEvents } from './events/custom-events';
import { exportJSON } from './export/export-json';
import { getFormatter } from './formatter';
import type { Formatter } from './formatter/models';
import { handleKeyboardShortcuts } from './handlers';
import {
  aboutScreen,
  customSettingsScreen,
  keyboardShortcutsScreen,
  menuHelpHTML,
  menuProjectHTML,
  menuSettingsHTML,
  recoverPromptScreen,
  resultPopupHTML,
  resultTemplate,
  savePromptScreen,
  testEditorScreen,
  welcomeScreen,
} from './html';
import type {
  I18nInterpolationType,
  I18nKeyType,
  I18nTranslationTemplate,
  I18nValueType,
} from './i18n';
import { appLanguages } from './i18n/app-languages';
import { isGithub } from './import/check-src';
import { importCompressedCode } from './import/code';
import { importFromFiles } from './import/files';
import { populateConfig } from './import/utils';
import {
  getLanguageByAlias,
  getLanguageCompiler,
  getLanguageEditorId,
  getLanguageExtension,
  getLanguageSpecs,
  getLanguageTitle,
  languageIsEnabled,
  languages,
  mapLanguage,
  processorIsEnabled,
  processors,
} from './languages';
import type {
  API,
  APICommands,
  AppData,
  AppLanguage,
  Await,
  BlocklyContent,
  Cache,
  Code,
  CodeEditor,
  CompileInfo,
  Config,
  ContentConfig,
  CustomEditors,
  CustomSettings,
  Editor,
  EditorConfig,
  EditorId,
  EditorLanguages,
  EditorOptions,
  Editors,
  EventsManager,
  GithubScope,
  Language,
  Modal,
  Notifications,
  Processor,
  SDKEvent,
  Screen,
  ShareData,
  Template,
  TestResult,
  Theme,
  ToolsPane,
  Types,
  User,
  UserConfig,
  UserData,
} from './models';
import { createNotifications } from './notifications';
import { cleanResultFromDev, createResultPage } from './result';
import { createAuthService, getAppCDN, sandboxService, shareService } from './services';
import type { GitHubFile } from './services/github';
import { permanentUrlService } from './services/permanent-url';
import {
  createStores,
  fakeStorage,
  initializeStores,
  type StorageItem,
  type Stores,
} from './storage';
import { getStarterTemplates, getTemplate } from './templates';
import { createToolsPane } from './toolspane';
import { createTypeLoader, getDefaultTypes } from './types';
import {
  capitalize,
  colorToHex,
  colorToHsla,
  compareObjects,
  copyToClipboard,
  ctrl,
  debounce,
  getValidUrl,
  isMac,
  loadStylesheet,
  predefinedValues,
  safeName,
  stringToValidJson,
  stringify,
  toDataUrl,
} from './utils';
import {
  fontInterUrl,
  fontMaterialIconsUrl,
  fscreenUrl,
  jestTypesUrl,
  lunaConsoleStylesUrl,
  lunaDataGridStylesUrl,
  lunaDomViewerStylesUrl,
  lunaObjViewerStylesUrl,
  ninjaKeysUrl,
  snackbarUrl,
} from './vendors';

// declare global dependencies
declare global {
  interface Window {
    deps: {
      showMode: typeof showMode;
      /**
       * String-level i18n helper function.
       * @param key The key of the translation.
       * @param value The default value to translate.
       * @param args The interpolation object.
       * @returns The translated string.
       */
      translateString: <Key extends I18nKeyType, Value extends string>(
        key: Key,
        value: I18nValueType<Key, Value>,
        ...args: I18nInterpolationType<I18nValueType<Key, Value>>
      ) => string;
      languages: typeof languages;
      processors: typeof processors;
    };
  }
}

const stores: Stores = createStores();
const eventsManager = createEventsManager();
let notifications: Notifications;
let modal: Modal;
let i18n: Await<ReturnType<typeof import('./i18n').init>> | undefined;
let split: ReturnType<typeof createSplitPanes> | null = null;
let typeLoader: ReturnType<typeof createTypeLoader>;
const screens: Screen[] = [];
const params = getParams(); // query string params
const iframeScrollPosition = { x: 0, y: 0 };
const editorIds: EditorId[] = ['markup', 'style', 'script'];

let baseUrl: string;
let isEmbed: boolean;
let isLite: boolean;
let isHeadless: boolean;
let compiler: Await<ReturnType<typeof getCompiler>>;
let formatter: Formatter;
let editors: Editors;
let customEditors: CustomEditors;
let currentEditorConfig: EditorConfig;
let toolsPane: ToolsPane | undefined;
export let authService: ReturnType<typeof createAuthService> | undefined;
let editorLanguages: EditorLanguages | undefined;
let resultLanguages: Language[] = [];
let projectId: string;
let isSaved = true;
let changingContent = false;
let consoleInputCodeCompletion: any;
let starterTemplates: Template[];
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
const sdkWatchers = {
  load: createPub<void>(),
  ready: createPub<void>(),
  code: createPub<{ code: Code; config: Config }>(),
  tests: createPub<{ results: TestResult[]; error?: string }>(),
  console: createPub<{ method: string; args: any[] }>(),
  destroy: createPub<void>(),
} as const satisfies Record<SDKEvent, ReturnType<typeof createPub<any>>>;

const getEditorLanguage = (editorId: EditorId = 'markup') => editorLanguages?.[editorId];
const getEditorLanguages = () => Object.values(editorLanguages || {});
const getActiveEditor = () => editors[getConfig().activeEditor || 'markup'];
const setActiveEditor = async (config: Config) => showEditor(config.activeEditor);

const loadStyles = () =>
  isHeadless
    ? Promise.resolve()
    : Promise.all(
        [
          snackbarUrl,
          ...(isLite
            ? []
            : [
                lunaObjViewerStylesUrl,
                lunaDataGridStylesUrl,
                lunaDomViewerStylesUrl,
                lunaConsoleStylesUrl,
              ]),
        ].map((url) => loadStylesheet(url, undefined, '#app-styles')),
      );

let lastRun = { time: 0, result: '' };
const createIframe = (container: HTMLElement, result = '', service = sandboxService) =>
  new Promise((resolve, reject) => {
    if (!container) {
      reject(
        window.deps.translateString('core.error.noResultContainer', 'Result container not found'),
      );
      return;
    }

    let iframe = UI.getResultIFrameElement();
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.name = 'result';
      iframe.id = 'result-frame';
      if (isHeadless) {
        iframe.setAttribute('sandbox', 'allow-same-origin allow-forms allow-scripts');
      } else {
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
    }
    iframe.tabIndex = 1;

    // if (['codeblock', 'editor'].includes(getConfig().mode)) {
    //   result = '';
    // }

    const scriptLang = getEditorLanguage('script') || 'javascript';
    const compilers = getAllCompilers(languages, getConfig(), baseUrl);
    const editorsText = `
      ${getConfig().markup.hiddenContent || ''}
      ${getConfig().markup.content}
      ${getConfig().style.hiddenContent || ''}
      ${getConfig().style.content}
      ${getConfig().script.hiddenContent || ''}
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

        if (!result || loaded || (lastRun.result === result && Date.now() - lastRun.time < 500)) {
          resolve('loaded');
          return; // prevent infinite loop
        }

        iframe.contentWindow?.postMessage({ result }, service.getOrigin());
        lastRun = { time: Date.now(), result };
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

const loadModuleTypes = async (
  editors: Editors,
  config: Config,
  loadAll = false,
  force = false,
) => {
  if (typeof editors?.script?.addTypes !== 'function') return;
  const scriptLanguage = config.script.language;
  if (['typescript', 'javascript'].includes(mapLanguage(scriptLanguage)) || force) {
    if (compiler.isFake) {
      // we need the real compiler for types
      await reloadCompiler({ ...config, mode: 'full' });
    }
    const configTypes = {
      ...getLanguageCompiler(config.markup.language)?.types,
      ...getLanguageCompiler(config.script.language)?.types,
      ...getDefaultTypes(),
      ...config.types,
      ...config.customSettings.types,
    };
    const reactImport = hasJsx.includes(scriptLanguage) ? `import React from 'react';\n` : '';
    const libs = await typeLoader.load(
      reactImport + getConfig().script.content + '\n' + getConfig().markup.content,
      configTypes,
      loadAll,
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
  const editorTitle = document.querySelector(`#${editorId}-selector span`) as HTMLElement;
  const editorTitleContainer = document.querySelector(`#${editorId}-selector`) as HTMLElement;
  const language = getLanguageByAlias(title);
  if (!editorTitle || !language) return;
  const config = getConfig();
  if (config[editorId].hideTitle) {
    editorTitleContainer.style.display = 'none';
    return;
  }
  editorTitleContainer.style.display = '';
  editorTitleContainer.style.order = String(config[editorId].order ?? 0);
  highlightSelectedLanguage(editorId, language);
  const shortcut = ` (Ctrl/⌘ + Alt + ${editorIds.indexOf(editorId) + 1})`;
  const customTitle = config[editorId].title;
  if (customTitle) {
    editorTitle.textContent = customTitle;
    if (!isEmbed) {
      editorTitle.title = `${capitalize(editorId)}: ${customTitle}${shortcut}`;
    }
    return;
  }
  const lang = languages.find((lang) => lang.name === language);
  editorTitle.textContent = lang?.title ?? '';
  if (!isEmbed) {
    editorTitle.title = `${capitalize(editorId)}: ${lang?.longTitle ?? lang?.title ?? ''}${shortcut}`;
  }
};

const createCopyButtons = () => {
  const copyImgHtml = `<span><i class="icon-copy" alt="copy"></i></span>`;
  editorIds.forEach((editorId) => {
    const copyButton = document.createElement('div');
    copyButton.innerHTML = copyImgHtml;
    copyButton.classList.add('copy-button', 'tool-buttons');
    copyButton.title = window.deps.translateString('core.copy.title', 'Copy');
    document.getElementById(editorId)?.appendChild(copyButton);
    eventsManager.addEventListener(copyButton, 'click', () => {
      if (copyToClipboard(editors?.[editorId]?.getValue())) {
        copyButton.innerHTML = `<span><img src="${baseUrl}assets/images/tick.svg" alt="copied"></span>`;
        copyButton.classList.add('visible');
        copyButton.title = window.deps.translateString('core.copy.hint', 'Copied!');
        setTimeout(() => {
          copyButton.innerHTML = copyImgHtml;
          copyButton.classList.remove('visible');
          copyButton.title = window.deps.translateString('core.copy.title', 'Copy');
        }, 2000);
      }
    });
  });
};

const createEditors = async (config: Config) => {
  let isReload = false;
  if (editors) {
    isReload = true;
    Object.values(editors).forEach((editor: CodeEditor) => editor.destroy());
    resetEditorModeStatus();
  }

  const findActiveEditor = () =>
    config.activeEditor ||
    (config.languages?.length && getLanguageEditorId(config.languages[0])) ||
    (config.markup.content
      ? 'markup'
      : config.style.content
        ? 'style'
        : config.script.content
          ? 'script'
          : 'markup');

  const baseOptions = {
    baseUrl,
    mode: config.mode,
    readonly: config.readonly,
    ...getEditorConfig(config),
    activeEditor: findActiveEditor(),
    isEmbed,
    isLite,
    isHeadless,
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

  currentEditorConfig = { ...getEditorConfig(config), ...getFormatterConfig(config) };

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

  (Object.keys(editors) as EditorId[]).forEach((editorId) => {
    const language = editorLanguages?.[editorId] || 'html';
    applyLanguageConfigs(language);
    formatter.getFormatFn(language).then((fn) => editors[editorId].registerFormatter(fn));
    registerRun(editorId, editors);
  });

  if (config.mode === 'codeblock') {
    createCopyButtons();
  }

  if (isReload) {
    loadModuleTypes(editors, config, /* loadAll = */ true);
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
    const editor = editors[editorId];
    if (config.foldRegions) {
      await editor.foldRegions?.();
    }
    const foldedLines = config[editorId].foldedLines;
    if (foldedLines?.length) {
      await editor.foldLines?.(foldedLines);
    }
  }
};

const showMode = (mode?: Config['mode'], view?: Config['view']) => {
  if (!mode) {
    mode = getConfig().mode;
  }
  if (!view) {
    view = getConfig().view;
  }

  if (mode === 'editor' || mode === 'codeblock' || mode === 'result') {
    split?.destroy();
    split = null;
  } else {
    if (view === 'editor') {
      split?.show('code', true);
    }
    if (view === 'result') {
      split?.show('output', true);
    }
  }

  // toolbar-editor-result
  const modes = {
    full: '111',
    focus: '111',
    simple: '111',
    lite: '111',
    editor: '110',
    codeblock: '010',
    result: '001',
  };
  const modeConfig = modes[mode] || '111';

  const toolbarElement = UI.getToolbarElement();
  const editorContainerElement = UI.getEditorContainerElement();
  const editorsElement = UI.getEditorsElement();
  const outputElement = UI.getOutputElement();
  const resultElement = UI.getResultElement();
  const gutterElement = UI.getGutterElement();
  const runButton = UI.getRunButton();
  const resultButton = UI.getResultButton();
  const editorTools = UI.getEditorToolbar();

  const showToolbar = modeConfig[0] === '1';
  const showEditor = modeConfig[1] === '1';
  const showResult = modeConfig[2] === '1';

  toolbarElement.style.display = '';
  editorContainerElement.style.height = '';
  editorsElement.style.display = '';
  resultElement.style.display = '';
  outputElement.style.display = '';
  editorTools.style.display = '';
  runButton.style.visibility = '';
  resultButton.style.visibility = '';

  if (gutterElement) {
    gutterElement.style.display = 'block';
  }

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
    split?.destroy(true);
    split = null;
  }
  if (mode === 'editor') {
    runButton.style.visibility = 'hidden';
    resultButton.style.visibility = 'hidden';
  }
  if (mode === 'codeblock') {
    editorTools.style.display = 'none';
  }
  if (mode === 'result') {
    if (!['full', 'open'].includes(toolsPane?.getStatus() || '')) {
      toolsPane?.hide();
    }
  }
  document.body.classList.toggle('simple-mode', mode === 'simple');
  document.body.classList.toggle('focus-mode', mode === 'focus');
  document.body.classList.toggle('lite-mode', mode === 'lite');
  document.body.classList.toggle('result', mode === 'result');
  document.body.classList.toggle('no-result', mode === 'editor' || mode === 'codeblock');
  if ((mode === 'full' || mode === 'simple') && !split) {
    split = createSplitPanes();
  }
  if (mode === 'focus') {
    toolsPane?.setActiveTool('console');
  }
  window.dispatchEvent(new Event(customEvents.resizeEditor));
};

const showEditor = (editorId: EditorId = 'markup', isUpdate = false) => {
  const config = getConfig();
  const allHidden = editorIds.every((editor) => config[editor].hideTitle);
  if (config[editorId].hideTitle && !allHidden) return;
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
  if (initialized || config.view !== 'result') {
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

const addPhpToken = (code: string) =>
  code.includes('<?php') || code.includes('<?=') ? code : '<?php\n' + code;

const phpHelper = ({ editor, code }: { editor?: CodeEditor; code?: string }) => {
  if (code?.trim()) {
    return addPhpToken(code);
  }
  if (editor?.getLanguage().startsWith('php')) {
    editor.setValue(addPhpToken(editor.getValue()));
    editor.setPosition({ lineNumber: 2, column: 0 });
  }
  return '<?php\n';
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
    notifications.info(
      window.deps.translateString(
        'core.changeLanguage.message',
        'Loading {{lang}}. This may take a while!',
        {
          lang: getLanguageTitle(language),
        },
      ),
    );
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
  loadModuleTypes(editors, getConfig(), /* loadAll = */ true);
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
      if (editorId === 'script' && getConfig().script.language.startsWith('php')) {
        compiledCode = phpHelper({ code: compiledCode });
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

  const getContent = (editor: Partial<Editor> | undefined) => {
    const editorContent = editor?.content ?? '';
    const hiddenContent = editor?.hiddenContent ?? '';
    if (!hiddenContent) {
      return editorContent;
    }
    const placeholder = '{{__livecodes_editor_content__}}';
    return hiddenContent.includes(placeholder)
      ? hiddenContent.replace(placeholder, editorContent)
      : `${hiddenContent}\n${editorContent}`;
  };

  const markupContent = getContent(config.markup);
  const styleContent = getContent(config.style);
  const scriptContent = getContent(config.script);
  const testsContent = getContent(config.tests);
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
      markupContent !== getContent(getCache().markup) ||
      scriptContent !== getContent(getCache().script)); /* e.g. jsx/sfc */

  const testsNotChanged =
    (!config.tests?.content && !getCache().tests?.content) ||
    (config.tests?.language === getCache().tests?.language &&
      config.tests?.content === getCache().tests?.content &&
      getCache().tests?.compiled);

  if (testsNotChanged && !config.tests?.content) {
    toolsPane?.tests?.showResults({ results: [] });
  }

  const forceCompileSFC =
    (config.markup.language === config.script.language + '-app' ||
      getCache().markup.language === getCache().script.language + '-app') &&
    (config.markup.language !== getCache().markup.language ||
      config.script.language !== getCache().script.language);

  const markupCompileResult = await compiler.compile(markupContent, markupLanguage, config, {
    forceCompile: forceCompileSFC,
  });
  let compiledMarkup = markupCompileResult.code;

  const scriptCompileResult = await compiler.compile(scriptContent, scriptLanguage, config, {
    forceCompile: forceCompileStyles || forceCompileSFC,
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

  const [styleCompileResult, testsCompileResult] = await Promise.all([
    compiler.compile(styleContent, styleLanguage, config, {
      html: `${compiledMarkup}<script type="script-for-styles">${compiledScript}</script>
        <script type="script-for-styles">${compileInfo.importedContent}</script>`,
      forceCompile: forceCompileStyles,
    }),
    runTests
      ? testsNotChanged
        ? Promise.resolve(getCache().tests?.compiled || '')
        : compiler.compile(testsContent, testsLanguage, config, {})
      : Promise.resolve(getCompileResult(getCache().tests?.compiled || '')),
  ]);
  const [compiledStyle, compiledTests] = [styleCompileResult, testsCompileResult].map((result) => {
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
      modified: compiledMarkup,
    },
    style: {
      ...contentConfig.style,
      compiled: compiledStyle,
      modified: compiledStyle,
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
  compiledCode.script.modified = compiledCode.script.compiled;

  if (scriptType != null && scriptType !== 'module') {
    singleFile = true;
  }

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

  const logError = (language: Language, errors: string[] = []) => {
    errors.forEach((err) => toolsPane?.console?.error(`[${getLanguageTitle(language)}] ${err}`));
  };
  logError(markupLanguage, markupCompileResult.info?.errors);
  logError(styleLanguage, styleCompileResult.info?.errors);
  logError(scriptLanguage, scriptCompileResult.info?.errors);
  logError(testsLanguage, getCompileResult(testsCompileResult).info?.errors);

  if (singleFile) {
    setCache({
      ...getCache(),
      ...compiledCode,
      result: cleanResultFromDev(result),
      styleOnlyUpdate,
    });

    if (broadcastInfo.isBroadcasting) {
      broadcast();
    }
    if (resultPopup && !resultPopup.closed) {
      resultPopup?.postMessage({ result }, location.origin);
    }
  }

  return result;
};

const reloadCompiler = async (config: Config, force = false) => {
  if (!compiler.isFake && !force) return;
  compiler = (window as any).compiler = await getCompiler({
    config,
    baseUrl,
    eventsManager,
  });
  setCache();
  await getResultPage({});
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

  updateCache('markup', compiledLanguages.markup, loadingComments[compiledLanguages.markup] ?? '');
  updateCache('style', compiledLanguages.style, loadingComments[compiledLanguages.style] ?? '');
  updateCache('script', compiledLanguages.script, loadingComments[compiledLanguages.script] ?? '');
  setCache({
    ...getCache(),
    tests: {
      language: 'javascript',
      content: '',
      compiled: '',
    },
  });

  updateCompiledCode();
  toolsPane?.console?.clear(/* silent= */ true);
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

const setProjectInfoMark = () => {
  const btn = UI.getProjectInfoBtn();
  const config = getConfig();
  if (
    (typeof config.htmlAttrs === 'string' &&
      config.htmlAttrs !== defaultConfig.htmlAttrs &&
      config.htmlAttrs.trim().length > 0) ||
    (typeof config.htmlAttrs === 'object' &&
      config.htmlAttrs &&
      Object.entries(config.htmlAttrs).length > 0) ||
    (config.head !== defaultConfig.head && config.head.trim().length > 0)
  ) {
    btn.classList.add('active');
    btn.style.display = 'unset';
  } else {
    btn.classList.remove('active');
    if (isEmbed) {
      btn.style.display = 'none';
    }
  }
};

const setCustomSettingsMark = () => {
  const btn = UI.getCustomSettingsBtn();
  if (isEmbed) {
    btn.hidden = true;
    return;
  }
  const config = getConfig();
  const customSettings = JSON.stringify(config.customSettings);
  if (!customSettings || customSettings === '{}' || customSettings === '{"imports":{}}') {
    btn.classList.remove('active');
  } else {
    btn.classList.add('active');
  }
};

const run = async (editorId?: EditorId, runTests?: boolean) => {
  setLoading(true);
  if (editorId !== 'style') {
    toolsPane?.console?.clear(/* silent= */ true);
  }
  const config = getConfig();
  const shouldRunTests = (runTests ?? config.autotest) && Boolean(config.tests?.content?.trim());
  const result = await getResultPage({ sourceEditor: editorId, runTests: shouldRunTests });
  await createIframe(UI.getResultElement(), result);
  updateCompiledCode();
};

const runTests = () => run(/* editorId= */ undefined, /* runTests= */ true);

const updateUrl = (url: string, push = false) => {
  if (push && !isEmbed) {
    parent.history.pushState(null, '', url);
  } else {
    parent.history.replaceState(null, '', url);
  }
};

const format = async (allEditors = true) => {
  if (allEditors) {
    await Promise.all(
      (Object.values(editors) as CodeEditor[]).map(async (editor) => {
        await editor.format();
        if (getConfig().foldRegions) {
          await editor.foldRegions?.();
        }
      }),
    );
  } else {
    const activeEditor = getActiveEditor();
    await activeEditor.format();
    if (getConfig().foldRegions) {
      await activeEditor.foldRegions?.();
    }
    activeEditor.focus();
  }
  updateConfig();
};

const save = async (notify = false, setTitle = true, isAutoSave = false) => {
  if (setTitle) {
    setProjectTitle(true);
  }

  if (editors && getConfig().formatOnsave && !isAutoSave) {
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
    notifications.success(
      window.deps.translateString('core.save.success', 'Project locally saved to device!'),
    );
  }

  await share(false);
};

const fork = async () => {
  projectId = '';
  loadConfig({ ...getConfig(), title: getConfig().title + ' (fork)' });
  await save();
  notifications.success(
    window.deps.translateString('core.fork.success', 'Forked as a new project'),
  );
};

const share = async (
  shortUrl = false,
  contentOnly = true,
  urlUpdate = true,
  includeResult = false,
  permanentUrl = false,
): Promise<ShareData> => {
  const config = getConfig();
  const content = contentOnly
    ? {
        ...getContentConfig(config),
        markup: {
          ...config.markup,
          title: undefined,
          hideTitle: undefined,
        },
        style: {
          ...config.style,
          title: undefined,
          hideTitle: undefined,
        },
        script: {
          ...config.script,
          title: undefined,
          hideTitle: undefined,
        },
        tools: {
          ...config.tools,
          enabled: defaultConfig.tools.enabled,
          status: config.tools.status === 'none' ? defaultConfig.tools.status : config.tools.status,
        },
      }
    : config;

  const currentUrl = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';
  const appUrl = permanentUrl ? permanentUrlService.getAppUrl() : currentUrl;
  let shareURL = new URL(appUrl);
  if (shortUrl) {
    shareURL.search =
      'x=id/' +
      (await shareService.shareProject({
        ...content,
        result: includeResult ? getCache().result : undefined,
      }));
  } else {
    const playgroundUrl = getPlaygroundUrl({ appUrl, config: content });
    shareURL = new URL(playgroundUrl);
  }

  if (urlUpdate) {
    updateUrl(shareURL.href, true);
  }

  const projectTitle = content.title !== defaultConfig.title ? content.title + ' - ' : '';

  return {
    title: projectTitle + 'LiveCodes',
    url: shareURL.href,
  };
};

const updateConfig = () => {
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
  const validConfig = upgradeAndValidate(newConfig);
  const content = getContentConfig({
    ...defaultConfig,
    ...validConfig,
  });
  const config = {
    ...getConfig(),
    ...(validConfig.autotest != null ? { autotest: validConfig.autotest } : {}),
    ...(validConfig.mode != null ? { mode: validConfig.mode } : {}),
    ...(validConfig.tools != null ? { tools: validConfig.tools } : {}),
    ...content,
  };
  setConfig(config);
  await importExternalContent({ config });
  setProjectRecover();

  if (flush) {
    flushResult();
  }

  // load title
  const projectTitle = UI.getProjectTitleElement();
  projectTitle.textContent = getConfig().title;
  setWindowTitle();

  // reset url params
  const currentUrl = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';
  updateUrl(url ?? currentUrl, true);

  // reset iframe scroll position
  iframeScrollPosition.x = 0;
  iframeScrollPosition.y = 0;

  await applyConfig(config, /* reload= */ true);

  changingContent = false;
};

const applyConfig = async (newConfig: Partial<Config>, reload = false, oldConfig?: Config) => {
  const currentConfig = oldConfig || getConfig();
  const combinedConfig: Config = { ...currentConfig, ...newConfig };
  if (reload) {
    await updateEditors(editors, getConfig());
  }
  phpHelper({ editor: editors.script });
  setLoading(true);
  await setActiveEditor(combinedConfig);

  if (!isEmbed) {
    loadSettings(combinedConfig);
  }
  if (newConfig.mode || newConfig.view) {
    window.deps?.showMode?.(combinedConfig.mode, combinedConfig.view);
  }
  if (newConfig.tools) {
    configureToolsPane(newConfig.tools, combinedConfig.mode);
  }
  if (newConfig.zoom) {
    zoom(newConfig.zoom);
  }
  if (newConfig.theme || newConfig.editorTheme || newConfig.themeColor || newConfig.fontSize) {
    setTheme(combinedConfig.theme, combinedConfig.editorTheme);
  }
  if (newConfig.autotest) {
    UI.getWatchTestsButton()?.classList.remove('disabled');
  }
  toolsPane?.console?.clear(/* silent= */ true);

  setConfig(combinedConfig);

  if (!isEmbed) {
    setTimeout(() => getActiveEditor().focus());
  }
  setExternalResourcesMark();
  setProjectInfoMark();
  setCustomSettingsMark();
  updateCompiledCode();
  loadModuleTypes(editors, combinedConfig, /* loadAll = */ true);
  compiler.load(getEditorLanguages(), combinedConfig).then(() => {
    if (!combinedConfig.autoupdate) {
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
  if (!isEmbed) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          formatter.load(getEditorLanguages());
        },
        { timeout: 15_000 },
      );
    } else {
      setTimeout(() => {
        formatter.load(getEditorLanguages());
      }, 10_000);
    }
  }
  if (isEmbed && !combinedConfig.tests?.content?.trim()) {
    toolsPane?.disableTool('tests');
  } else {
    toolsPane?.enableTool('tests');
  }

  if (!reload) {
    await loadDefaults();

    // re-run changing theme color after the UI is ready
    // in case the previous one failed (e.g. in firefox)
    requestAnimationFrame(() => {
      changeThemeColor();
    });
  }

  const editorConfig = {
    ...getEditorConfig(newConfig as Config),
    ...getFormatterConfig(newConfig as Config),
  };

  const hasEditorConfig = Object.keys(editorConfig).some((k) => k in newConfig);
  let shouldReloadEditors = (() => {
    if (newConfig.editor != null && !(newConfig.editor in editors.markup)) return true;
    if (newConfig.mode != null) {
      if (newConfig.mode !== 'result' && editors.markup.isFake) return true;
      if (newConfig.mode !== 'codeblock' && editors.markup.codejar) return true;
    }
    return false;
  })();
  if ('configureTailwindcss' in editors.markup) {
    if (newConfig.processors?.includes('tailwindcss')) {
      editors.markup.configureTailwindcss?.(true);
    }
    if (
      currentConfig.processors?.includes('tailwindcss') &&
      !newConfig.processors?.includes('tailwindcss')
    ) {
      editors.markup.configureTailwindcss?.(false);
      shouldReloadEditors = true;
    }
  }
  if (shouldReloadEditors) {
    await reloadEditors(combinedConfig);
  } else if (hasEditorConfig) {
    currentEditorConfig = {
      ...getEditorConfig(combinedConfig),
      ...getFormatterConfig(combinedConfig),
    };
    getAllEditors().forEach((editor) => editor.changeSettings(currentEditorConfig));
  }

  parent.dispatchEvent(new Event(customEvents.ready));
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
  const currentConfig = getConfig();
  setConfig(
    buildConfig({
      ...currentConfig,
      ...getUserConfig(userConfig || currentConfig),
    }),
  );
  if (!updateUI) return;
  const newConfig = getConfig();
  loadSettings(newConfig);
  setTheme(newConfig.theme, newConfig.editorTheme);
  showSyncStatus(true);
};

const loadTemplate = async (templateId: string) => {
  const templateConfig = (await stores.templates?.getItem(templateId))?.config;
  if (templateConfig) {
    await loadConfig(templateConfig);
  }
};

const dispatchChangeEvent = debounce(async () => {
  let changeEvent: CustomEvent<{ code: Code; config: Config } | void>;
  if (sdkWatchers.code.hasSubscribers()) {
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({ forExport: true });
    }
    changeEvent = new CustomEvent(customEvents.change, {
      detail: {
        code: getCachedCode(),
        config: getConfig(),
      },
    });
  } else {
    changeEvent = new CustomEvent(customEvents.change, { detail: undefined });
  }
  document.dispatchEvent(changeEvent);
  parent.dispatchEvent(changeEvent);
}, 50);

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
    UI.getModalSaveButton().focus();
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
  const config = getConfig();
  if (!config.recoverUnsaved || isEmbed || config.mode !== 'full' || config.readonly) {
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
      welcomeRecover.style.display = 'block';
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
        notifications.success(
          window.deps.translateString(
            'core.save.successWithName',
            'Project "{{name}}" saved to device.',
            {
              name: projectName,
            },
          ),
        );
      }
      if (isWelcomeScreen) {
        welcomeRecover.classList.add('cancelled');
      } else {
        modal.close();
      }
      setProjectRecover(true);
      resolve('save and continue');
    });
    eventsManager.addEventListener(UI.getModalCancelRecoverButton(), 'click', () => {
      if (isWelcomeScreen) {
        welcomeRecover.classList.add('cancelled');
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
  if (isLite) return;
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
        reject(window.deps.translateString('core.error.login', 'Login error!'));
      } else {
        authService
          .signIn(scopes)
          .then((user) => {
            if (!user) {
              reject(window.deps.translateString('core.error.login', 'Login error!'));
            } else {
              manageStoredUserData(user, 'restore');

              const displayName = user.displayName || user.username;
              const loginSuccessMessage = displayName
                ? window.deps.translateString(
                    'core.login.successWithName',
                    'Logged in as: {{name}}',
                    {
                      name: displayName,
                    },
                  )
                : window.deps.translateString('core.login.success', 'Logged in successfully');
              notifications.success(loginSuccessMessage);
              displayLoggedIn(user);
              resolve(user);
            }
          })
          .catch(() => {
            notifications.error(window.deps.translateString('core.error.login', 'Login error!'));
          });
      }
      modal.close();
    };

    const loginContainer = createLoginContainer(eventsManager, loginHandler);
    modal.show(loginContainer, { size: 'small' });
  }).catch(() => {
    notifications.error(window.deps.translateString('core.error.login', 'Login error!'));
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
          notifications.success(
            window.deps.translateString('core.logout.success', 'Logged out successfully'),
          );
          displayLoggedOut();
        })
        .catch(() => {
          notifications.error(window.deps.translateString('core.error.logout', 'Logout error!'));
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
    return true;
  }
  return false;
};

const getAllEditors = (): CodeEditor[] =>
  [
    ...Object.values(editors),
    toolsPane?.console?.getEditor?.(),
    toolsPane?.compiled?.getEditor?.(),
  ].filter((x) => x != null);

const runViewTransition = (fn: () => void | Promise<void>) => {
  if ((document as any).startViewTransition) {
    return (document as any).startViewTransition(() => {
      fn();
    });
  } else {
    fn();
    return null;
  }
};

const setTheme = (theme: Theme, editorTheme: Config['editorTheme']) => {
  const themes = ['light', 'dark'];
  const root = document.documentElement;
  root?.classList.remove(...themes);
  root?.classList.add(theme);
  changeThemeColor();
  setFontSize();
  const themeToggle = UI.getThemeToggle();
  if (themeToggle) {
    themeToggle.checked = theme === 'dark';
  }
  const darkThemeButton = UI.getDarkThemeButton();
  if (darkThemeButton && !isEmbed) {
    if (theme === 'dark') {
      darkThemeButton.style.display = 'inherit';
    } else {
      darkThemeButton.style.display = 'none';
    }
  }
  const lightThemeButton = UI.getLightThemeButton();
  if (lightThemeButton && !isEmbed) {
    if (theme === 'light') {
      lightThemeButton.style.display = 'inherit';
    } else {
      lightThemeButton.style.display = 'none';
    }
  }
  getAllEditors().forEach((editor) => {
    editor?.setTheme(theme, editorTheme);
    customEditors[editor?.getLanguage()]?.setTheme(theme);
  });
  toolsPane?.console?.setTheme?.(theme);
  UI.getNinjaKeys()?.classList.toggle('dark', theme === 'dark');
};

const transitionTheme = (theme: Theme, editorTheme: Config['editorTheme']) => {
  const root = document.documentElement;
  const activeElement = document.activeElement;
  if (activeElement) {
    const position = activeElement.getBoundingClientRect();
    root.style.setProperty('--active-element-x', position.x + position.width / 2 + 'px');
    root.style.setProperty('--active-element-y', position.y + position.height / 2 + 'px');
    setTimeout(() => {
      root.style.removeProperty('--active-element-x');
      root.style.removeProperty('--active-element-y');
    }, 1000);
  }
  runViewTransition(() => {
    setTheme(theme, editorTheme);
  });
};

const changeThemeColor = () => {
  const { themeColor, theme } = getConfig();
  const color = themeColor || getDefaultColor();
  const { h, s, l } = colorToHsla(color);
  const root = document.documentElement;
  root.style.setProperty('--hue', `${h}`);
  root.style.setProperty('--st', `${s}%`);
  root.style.setProperty('--lt', `${theme === 'light' ? 100 : l}%`);

  const customColorInput = UI.getThemeColorSelector()?.querySelector(
    'input[type="color"]',
  ) as HTMLInputElement;
  if (customColorInput) {
    customColorInput.value = colorToHex(color);
  }
};

const getDefaultColor = () => `hsl(214, 40%, 50%)`;

const setFontSize = () => {
  const fontSize = getConfig().fontSize || (isEmbed ? 12 : 14);
  const root = document.documentElement;
  root.style.setProperty('--font-size', `${fontSize + 2}px`);
};

const setLayout = (layout: Config['layout']) => {
  if (layout === 'responsive') {
    layout = undefined;
  }
  const newLayout =
    layout ??
    (window.innerWidth < 768 && window.innerHeight > window.innerWidth ? 'vertical' : 'horizontal');
  split?.setLayout(newLayout);
  const layoutToggle = UI.getLayoutToggle();
  if (layoutToggle) {
    const layoutSwitch = layoutToggle.closest('.switch') as HTMLElement;
    if (layout === undefined) {
      layoutToggle.readOnly = layoutToggle.indeterminate = true;
      layoutSwitch.title = window.deps.translateString(
        'core.layout.responsive',
        'Responsive layout',
      );
    } else {
      layoutToggle.checked = layout === 'vertical';
      layoutToggle.readOnly = layoutToggle.indeterminate = false;
      layoutSwitch.title =
        layout === 'vertical'
          ? window.deps.translateString('core.layout.vertical', 'Vertical layout')
          : window.deps.translateString('core.layout.horizontal', 'Horizontal layout');
    }
  }
  handleIframeResize();
};

const changeAndSaveLayout = (layout: Config['layout']) => {
  setUserConfig({ layout });
  setLayout(layout);
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

  const layoutToggle = UI.getLayoutToggle();
  layoutToggle.checked = config.layout === 'vertical';

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

const showLanguageInfo = async (languageInfo: HTMLElement) => {
  const showModal = () => modal.show(languageInfo, { size: 'small' });
  if (i18n) {
    i18n.loadNamespaces(['language-info'], showModal);
  } else {
    showModal();
  }
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
    (checkSaved ? checkSavedAndExecute : doNotCheckAndExecute)(async () => {
      projectId = '';
      const newConfig = { ...defaultConfig, ...templateConfig };
      return (
        (await importExternalContent({ config: newConfig })) ||
        loadConfig(newConfig, '?template=' + templateName)
      );
    })().finally(() => {
      modal.close();
    });
  } else {
    notifications.error(
      window.deps.translateString('core.error.failedToLoadTemplate', 'Failed loading template'),
    );
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
    broadcastStatusBtn.title = window.deps.translateString(
      'broadcast.broadcasting',
      'Broadcasting...',
    );
  } else {
    broadcastStatusBtn.firstElementChild?.classList.remove('active');
    broadcastStatusBtn.title = window.deps.translateString('core.broadcast.heading', 'Broadcast');
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

const showConsoleMessage = () => {
  if (isEmbed) return;
  const docsBaseUrl = predefinedValues.DOCS_BASE_URL || 'docs';
  const docsUrl = docsBaseUrl?.startsWith('http')
    ? docsBaseUrl
    : new URL(docsBaseUrl, location.href).href;

  const items = [
    {
      content: ' ',
      style:
        'padding-left: 2.5em; line-height: 4em; background-size: 2.5em; background-repeat: no-repeat; background-position: left center; background-image: url("data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MzciIGhlaWdodD0iNDg4IiAgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHN0eWxlPjwhW0NEQVRBWy5Ce3N0cm9rZTpub25lfS5De2ZpbGw6dXJsKCNDKX0uRHtmaWxsOiM5NmJmM2R9LkV7ZmlsbC1ydWxlOm5vbnplcm99XV0+PC9zdHlsZT48ZGVmcz48ZmlsdGVyIGlkPSJBIiB4PSItMS44MTgyJSIgeT0iLTIuNzIyOSUiIHdpZHRoPSIxMDQuMDU1OSUiIGhlaWdodD0iMTA2LjA3NDElIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjUiLz48ZmVPZmZzZXQgZHg9IjMiIGR5PSIzIiByZXN1bHQ9IkIiLz48ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAwMCIgZmxvb2Qtb3BhY2l0eT0iLjUiLz48ZmVDb21wb3NpdGUgaW4yPSJCIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iQyIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0iQyIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48ZmlsdGVyIGlkPSJCIiB4PSItNC40MDY4JSIgeT0iLTMuNjExMSUiIHdpZHRoPSIxMDkuODMwNSUiIGhlaWdodD0iMTA4LjA1NTYlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjUiLz48ZmVPZmZzZXQgZHg9IjMiIGR5PSIzIiByZXN1bHQ9IkIiLz48ZmVGbG9vZCBmbG9vZC1jb2xvcj0iIzAwMCIgZmxvb2Qtb3BhY2l0eT0iLjUiLz48ZmVDb21wb3NpdGUgaW4yPSJCIiBvcGVyYXRvcj0iaW4iIHJlc3VsdD0iQyIvPjxmZU1lcmdlPjxmZU1lcmdlTm9kZSBpbj0iQyIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9IkMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkN2Q3ZDciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2MjYyNjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWx0ZXI9InVybCgjQSkiIGZpbGw9IiNjMWMxYzEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkuNSA0LjUpIiBjbGFzcz0iQiBFIj48cGF0aCBkPSJNMTYuNzUyNSAyODYuNzI5OEM2LjcwNjYgMjc1Ljc0NTUgMCAyNTMuODA5NyAwIDIzNC41OTA5YzAtMTkuMjA2MSA1LjAyNjYtMzcuMDMyIDE3LjU4OTEtNDYuNjMzNmgtLjgzNTdMMjE0LjQyOTIgMHYxMjcuNTk2NGMtMjEuNzc4NCAyMC41NzYyLTUxLjA5MzkgNDMuOTA1Ny0xMjQuODAyOCAxMDguMzg5MWwuODM1NyAxLjM1NTJjMzkuMzY3MyAyOC44MjIgODQuNTk4OCA3Mi43MTYzIDEyMy45NjYyIDExMS4xMjk3djEyOC45NjZ6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTAwLjU3MTYgLjAwMTcpIj48cGF0aCBkPSJNMTk3LjY3NjEgMTkwLjY5NTZjMTAuMDM4NSAxMC45ODUgMTYuNzUyMyAzMi45MzE3IDE2Ljc1MjMgNTIuMTM5NnMtNS4wMjY4IDM3LjAzMDgtMTcuNTk2MiA0Ni42MzM2aC44NDQzTDAgNDc3LjQyNjZWMzQ5LjgyOTdjMjEuNzc5My0yMC41NjQ4IDUxLjA5NC00My44OTM3IDEyNC44MDM0LTEwOC4zNzc3bC0uODM1Ny0xLjM1NTNDODQuNjA3IDIxMS4yNzQ3IDM5LjM2OTIgMTY3LjM3OTkuMDAwOSAxMjguOTY3NlYweiIvPjwvZz48L2c+PGcgZmlsdGVyPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTkuNSA1OS41KSIgY2xhc3M9IkIiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0Ny4yMjkgOTIuNTk1MSkiPjxwYXRoIGQ9Ik0wIDI2MS45MjM4bDE0My4xNjk4LTg3LjQ1MzRWMEwwIDg3LjIxMDl2MTc0LjcxMjl6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMzMwMiA5Mi43NDA1KSI+PHBhdGggZD0iTTAgMTc0LjI3NjRsMTQyLjk4OTQgODcuMzA4MVY4Ny4xMTQyTDAgMHYxNzQuMjc2NHoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4yMzI1IDYuMDE0NykiPjxwYXRoIGQ9Ik0yODQuMTc0MyA4Ni41ODA1TDE0Mi4wODcyIDAgMCA4Ni41ODA1bDE0Mi4wODcyIDg2LjcyNTcgMTQyLjA4NzEtODYuNzI1N3oiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjMxOTYgOTIuNTk1MSkiPjxwYXRoIGQ9Ik0wIDgxLjU4NDVMMTMzLjgzMjcuMDk2NyAxMzMuNjk3NCAwIDAgODEuNTg0NXoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMuNDg3IDkyLjU5NTEpIj48cGF0aCBkPSJNLjEzNTMgMEwwIC4wOTY3bDEzMy44MzI3IDgxLjQ4NzhMLjEzNTMgMHoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjMxOTYgMTc0LjE3OTIpIj48cGF0aCBkPSJNMCAweiIvPjwvZz48cGF0aCBkPSJNMjkwLjEyODcgODcuMDE3TDE0Ny4zMTk2IDAgNC41MTA2IDg3LjAxNyAwIDg5Ljg3ODl2MTgwLjA0ODJMMTQ3LjUgMzYwbDQuNTEwNi0yLjc2NDhMMjk1IDI2OS45MjcxVjg5LjgzMDN6bS00LjUxMSAxNzcuMjgzN2wtMTMzLjc4NzUgODEuNzc4NlYxODIuNjE5NGwxMzMuOTY3OS04MS42MzMxem0tMTQyLjgwOSA4MS43Nzg2TDguODQwNyAyNjQuMjUyMVYxMDAuOTg2M2wxMzMuOTY4IDgxLjYzMzF6TTEzLjYyMjMgOTIuNjkxOWwxMzMuNjk3My04MS41MzYgMTMzLjY5NzQgODEuNTM2LTEzMy42OTc0IDgxLjQ4NzNMMTMuNDg3IDkyLjY5MTl6IiBmaWxsPSIjNDQ0Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3LjkwNTggMTMzLjQ4NDQpIiBjbGFzcz0iQyI+PHBhdGggZD0iTTAgMTQwLjU2Nmw3Ni45MDczLTQ2LjkwMzlWMEwwIDQ2Ljg1NTN2OTMuNzEwN3oiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjkuODI1NyAxMzMuNDg0NCkiIGNsYXNzPSJDIj48cGF0aCBkPSJNMCA5My42NjIxbDc2LjkwNzMgNDYuOTAzOVY0Ni44NTUzTDAgMHY5My42NjIxeiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MC42MzczIDg1LjUxMykiIGNsYXNzPSJDIj48cGF0aCBkPSJNMTUzLjM2MzggNDYuNzFMNzYuNjgxOSAwIDAgNDYuNzFsNzYuNjgxOSA0Ni44NTU0TDE1My4zNjM4IDQ2LjcxeiIvPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDcuMzE5NiAxMzIuMjIzKSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0wIDQyLjEwMkw2OC45Njg1LjA5NjggNjguODc4NyAwIDAgNDIuMDUzNHYuMDQ4NnoiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzguMzUwNyAxMzIuMjIzKSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0uMDkwMiAwTDAgLjA5NjggNjguOTY4NSA0Mi4xMDJ2LS4wNDg2TC4wOTAyIDB6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0Ny4zMTk2IDE3NC4yNzY0KSIgY2xhc3M9IkQiPjxwYXRoIGQ9Ik0wIDB6Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0Ljc3MzYgNzkuMTU5KSI+PHBhdGggZD0iTTE2MC41ODExIDQ3LjQ4NThMODIuNTQ1NiAwIDQuNTEwNiA0Ny40ODU4IDAgNTAuMjk5MnYxMDAuOTM3N2w4Mi41NDU2IDUwLjQ0NDYgNC41MTEtMi43NjQ4IDc4LjEyNTMtNDcuNjc5OFY1MC4yOTkyem0tNC41MTA5IDk4LjA3NjJsLTY5LjAxMzYgNDIuMTk4N3YtODQuMjAzNWw2OS4xMDQyLTQyLjEwMnptLTc4LjAzNTEgNDIuMTk4N0w4LjkzMDkgMTQ1LjU2MlY2MS40NTUybDY5LjEwNDIgNDIuMTAyek0xMy42Njc0IDUzLjA2NGw2OC44NzgyLTQxLjkwOCA2OC44Nzg3IDQxLjk1NjYtNjguODc4NyA0Mi4wMDQ4LTY4Ljk2ODQtNDEuOTU2NnoiLz48L2c+PC9nPjwvc3ZnPg==");',
    },
    { content: 'LiveCodes', style: 'font-weight: bold; font-size: 1.2em;' },
    { content: ' - ', style: 'font-size: 1.2em;' },
    {
      content:
        window.deps.translateString('generic.tagline', 'A Code Playground That Just Works!') + '\n',
      style: 'font-style: italic; font-size: 1.2em;',
    },
    {
      content: window.deps.translateString(
        'app.consoleMessage.appVersion',
        'App version: {{APP_VERSION}}',
        {
          APP_VERSION: predefinedValues.APP_VERSION,
        },
      ),
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: ' ', style: '' },
    {
      content: window.deps.translateString(
        'app.consoleMessage.sdkVersion',
        'SDK version: {{SDK_VERSION}}',
        {
          SDK_VERSION: predefinedValues.SDK_VERSION,
        },
      ),
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: ' ', style: '' },
    {
      content: window.deps.translateString(
        'app.consoleMessage.commit',
        'Git commit: {{COMMIT_SHA}}',
        {
          COMMIT_SHA: predefinedValues.COMMIT_SHA,
        },
      ),
      style: 'padding: 0.2em 0.4em; border-radius: 0.5em; background: hsl(0,0%,40%); color: white;',
    },
    { content: '\n\n', style: '' },
    {
      content: window.deps.translateString(
        'app.consoleMessage.learnMore',
        'Learn more! {{docsUrl}} 🚀',
        { docsUrl },
      ),
      style: 'padding: 0.2em 0.4em; font-size: 1.1em;',
    },
  ];

  const message = items.reduce(
    (acc, item) => {
      acc[0] += `%c${item.content}`;
      acc.push(item.style);
      return acc;
    },
    [''],
  );

  parent.postMessage({ args: 'console-message', payload: message }, location.origin);
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
  setLayout(getConfig().layout);

  eventsManager.addEventListener(window, 'resize', () => setLayout(getConfig().layout), false);
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
      (ev) => {
        ev.preventDefault();
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
        'click',
        async () => {
          menuItem.closest('.menu-scroller')?.classList.add('hidden');
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
    const config = getConfig();
    addConsoleInputCodeCompletion();

    if (config.autoupdate && !loading) {
      await run(editorId);
    }

    if (config.markup.content !== getCache().markup.content) {
      await getResultPage({ sourceEditor: editorId });
    }

    for (const key of Object.keys(customEditors)) {
      if (config[editorId].language === key) {
        await customEditors[key]?.show(true, {
          baseUrl,
          editors,
          config,
          html: getCache().markup.compiled || config.markup.content || '',
          eventsManager,
        });
      }
    }

    if (config.autosave) {
      await save(/* notify = */ false, /* setTitle = */ true, /* isAutoSave = */ true);
    }

    dispatchChangeEvent();
    loadModuleTypes(editors, config);
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

const handleKeyboardShortcutsScreen = () => {
  if (isEmbed) return;

  const { keyboardShortcuts } = getCommandMenuActions({
    deps: {
      getConfig,
      loadStarterTemplate,
      changeEditorSettings,
      changeLayout: changeAndSaveLayout,
      showScreen,
    },
  });

  const createShortcutsUI = async () => {
    const div = document.createElement('div');
    div.innerHTML = keyboardShortcutsScreen;
    const shortcutsContainer = div.firstChild as HTMLElement;
    const rows = keyboardShortcuts
      .map(
        (item) => `
      <tr>
        <td>${item.title}</td>
        <td>${item.hotkey
          ?.split('+')
          .map((key) => `<kbd>${capitalize(key)}</kbd>`)
          .join(' ')}</td>
      </tr>
    `,
      )
      .join('');
    shortcutsContainer.querySelector('tbody')!.innerHTML = rows;
    modal.show(shortcutsContainer as HTMLElement);
  };

  eventsManager.addEventListener(
    UI.getKeyboardShortcutsMenuLink(),
    'click',
    createShortcutsUI,
    false,
  );
  registerScreen('keyboard-shortcuts', createShortcutsUI);
};

const handleCommandMenu = async () => {
  if (isEmbed) return;

  const loadNinjaKeys = () => import(ninjaKeysUrl);
  loadStylesheet(fontInterUrl, 'font-inter');
  loadStylesheet(fontMaterialIconsUrl, 'material-icons');
  await loadNinjaKeys();

  const ninja = UI.getNinjaKeys() as any;
  if (!ninja) return;

  const header = ninja.shadowRoot.querySelector('ninja-header');
  const HomeBreadcrumb = header?.shadowRoot.querySelector('.breadcrumb-list .breadcrumb');

  const closeBtn = header?.shadowRoot.querySelector('.breadcrumb-list .breadcrumb--close');
  if (closeBtn) {
    closeBtn.hidden = true;
  }

  const footer = ninja.shadowRoot.querySelector('.modal-footer');
  if (footer) {
    footer.innerHTML = footer.innerHTML
      .replace('to select', window.deps.translateString('commandMenu.toSelect', 'to select'))
      .replace('to navigate', window.deps.translateString('commandMenu.toNavigate', 'to navigate'))
      .replace('to close', window.deps.translateString('commandMenu.toClose', 'to close'))
      .replace(
        'move to parent',
        window.deps.translateString('commandMenu.moveToParent', 'move to parent'),
      );
  }

  const openCommandMenu = () => {
    modal.close();
    ninja.close();
    UI.getAppMenuHelpScroller()?.classList.add('hidden');
    const { actions, loginAction, logoutAction } = getCommandMenuActions({
      deps: {
        getConfig,
        loadStarterTemplate,
        changeEditorSettings,
        changeLayout: changeAndSaveLayout,
        showScreen,
      },
    });
    const authAction = authService?.isLoggedIn() ? logoutAction : loginAction;
    ninja.data = [...actions, authAction];
    if (HomeBreadcrumb) {
      HomeBreadcrumb.innerText = window.deps.translateString('commandMenu.home', 'Home');
    }
    requestAnimationFrame(() => ninja.open());
  };

  let anotherShortcut = false;
  const onHotkey = async (e: KeyboardEvent) => {
    // Ctrl+K opens the command menu
    // do not open the menu if shortcut is Ctrl+Shift+K
    // wait for 500ms to allow other shortcuts like Ctrl+K Ctrl+0
    if (!ctrl(e) || e.shiftKey || e.altKey) {
      anotherShortcut = false;
      return;
    }
    if (e.code !== 'KeyK') {
      anotherShortcut = true;
      return;
    }
    e.preventDefault();
    anotherShortcut = false;
    setTimeout(async () => {
      if (anotherShortcut) return;
      // eslint-disable-next-line no-underscore-dangle
      if (ninja?.__visible === false || ninja?.data?.length === 0) {
        ninja.focus();
        requestAnimationFrame(() => openCommandMenu());
      }
    }, 500);
  };

  eventsManager.addEventListener(window, 'keydown', onHotkey, true);
  eventsManager.addEventListener(UI.getCommandMenuLink(), 'click', () => openCommandMenu(), true);
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
};

const handleResultButton = () => {
  eventsManager.addEventListener(UI.getResultButton(), 'click', () => split?.show('toggle', true));
};

const handleShareButton = () => {
  eventsManager.addEventListener(UI.getShareButton(), 'click', () => showScreen('share'));
};

const handleI18nMenu = () => {
  const menuContainer = UI.getI18nMenuContainer();
  const i18nMenu = document.createElement('ul');
  i18nMenu.id = 'app-menu-i18n';
  i18nMenu.className = 'dropdown-menu';
  Object.entries(appLanguages).forEach(([langCode, langLabel]) => {
    const li = document.createElement('li');
    li.classList.toggle('active', langCode === getConfig().appLanguage);
    const link = document.createElement('a');
    link.href = `#`;
    link.textContent = langLabel;
    link.dataset.lang = langCode;
    eventsManager.addEventListener(link, 'click', (ev) => {
      ev.preventDefault();
      if (langCode === getConfig().appLanguage) return;
      setUserConfig({ appLanguage: langCode as AppLanguage });
      changeAppLanguage(langCode as AppLanguage);
    });
    li.appendChild(link);
    i18nMenu.appendChild(li);
  });
  const sep = document.createElement('li');
  sep.role = 'separator';
  i18nMenu.appendChild(sep);
  const contributeLi = document.createElement('li');
  const contributeSpan = document.createElement('span');
  const contributeLink = document.createElement('a');
  contributeLink.href =
    'https://github.com/live-codes/livecodes/blob/develop/docs/docs/contribution/i18n.mdx';
  contributeLink.textContent = window.deps.translateString(
    'app.i18nMenu.helpTranslate',
    'Help Us Translate',
  );
  contributeLink.target = '_blank';
  contributeLink.rel = 'noopener noreferrer';
  contributeSpan.appendChild(contributeLink);
  contributeLi.appendChild(contributeSpan);
  i18nMenu.appendChild(contributeLi);

  const docsLi = document.createElement('li');
  const docsLink = document.createElement('a');
  docsLink.href = `${process.env.DOCS_BASE_URL}features/i18n`;
  docsLink.textContent = window.deps.translateString('app.i18nMenu.docs', 'i18n Documentation');
  docsLink.target = '_blank';
  docsLink.rel = 'noopener noreferrer';
  docsLi.appendChild(docsLink);
  i18nMenu.appendChild(docsLi);
  menuContainer.appendChild(i18nMenu);
  adjustFontSize(menuContainer);
  registerMenuButton(menuContainer, UI.getI18nMenuButton());
};

const handleEditorTools = () => {
  if (!configureEditorTools(getActiveEditor().getLanguage())) return;
  const originalMode = getConfig().mode;
  eventsManager.addEventListener(UI.getFocusButton(), 'click', () => {
    const config = getConfig();
    const currentMode = config.mode;
    const newMode = currentMode === originalMode ? 'focus' : originalMode;
    setConfig({
      ...config,
      mode: newMode,
    });
    const consoleIsEnabled =
      config.tools.enabled?.includes('console') ||
      config.tools.enabled === 'all' ||
      config.tools.enabled == null;
    if (newMode === 'focus' && consoleIsEnabled) {
      toolsPane?.setActiveTool('console');
    }
    window.deps?.showMode?.(newMode, config.view);
  });

  eventsManager.addEventListener(UI.getCopyButton(), 'click', () => {
    if (copyToClipboard(getActiveEditor().getValue())) {
      notifications.success(
        window.deps.translateString('core.copy.copied', 'Code copied to clipboard'),
      );
    } else {
      notifications.error(
        window.deps.translateString('core.error.failedToCopyCode', 'Failed to copy code'),
      );
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
      notifications.success(
        window.deps.translateString('core.copy.copiedAsDataURL', 'Code copied as data URL'),
      );
    } else {
      notifications.error(
        window.deps.translateString('core.error.failedToCopyCode', 'Failed to copy code'),
      );
    }
  });

  eventsManager.addEventListener(UI.getCodeToImageButton(), 'click', () => {
    showScreen('code-to-image');
  });

  eventsManager.addEventListener(UI.getEditorStatus(), 'click', () => {
    showScreen('editor-settings', { scrollToSelector: 'label[data-name="editorMode"]' });
  });

  eventsManager.addEventListener(UI.getExternalResourcesBtn(), 'click', () => {
    showScreen('resources');
  });

  eventsManager.addEventListener(UI.getProjectInfoBtn(), 'click', () => {
    showScreen('info');
  });

  eventsManager.addEventListener(UI.getCustomSettingsBtn(), 'click', () => {
    showScreen('custom-settings');
  });

  eventsManager.addEventListener(UI.getEditorSettingsBtn(), 'click', () => {
    showScreen('editor-settings');
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
      processorItem.firstElementChild as HTMLElement,
      'click',
      async (event) => {
        event.preventDefault();
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
        if (processorName === 'tailwindcss' && 'configureTailwindcss' in editors.markup) {
          if (toggle.checked) {
            editors.markup.configureTailwindcss?.(true);
          } else {
            editors.markup.configureTailwindcss?.(false);
            await reloadEditors(getConfig());
          }
        }
        if (getConfig().autoupdate) {
          await run();
        }
        dispatchChangeEvent();
      },
      false,
    );
  });
};

const registerMenuButton = (menu: HTMLElement, button: HTMLElement) => {
  menu.classList.add('hidden');
  // onclick outside
  const onClickOutside = (event: MouseEvent) => {
    if (
      !button.contains(event.target as Node) &&
      !menu.firstElementChild?.contains(event.target as Node)
    ) {
      menu.classList.add('hidden');
    }
  };

  const onIframeClicked = (event: MessageEvent) => {
    if (event.data.type !== 'clicked') return;
    menu.classList.add('hidden');
  };

  eventsManager.addEventListener(window, 'click', onClickOutside);
  eventsManager.addEventListener(window, 'message', onIframeClicked);

  eventsManager.addEventListener(button, 'click', () => {
    document.querySelectorAll('.menu-scroller').forEach((el) => {
      if (el === menu) {
        menu.classList.toggle('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  });
};

const handleAppMenuProject = () => {
  setupAppMenu(UI.getAppMenuProjectScroller(), UI.getAppMenuProjectButton(), menuProjectHTML);
};

const handleAppMenuSettings = () => {
  setupAppMenu(
    UI.getAppMenuSettingsScroller(),
    UI.getAppMenuSettingsButton(),
    menuSettingsHTML,
    true,
  );
};

const handleAppMenuHelp = () => {
  setupAppMenu(UI.getAppMenuHelpScroller(), UI.getAppMenuHelpButton(), menuHelpHTML);
};

const setupAppMenu = (
  container: HTMLElement | null,
  button: HTMLElement | null,
  menuHTML: string,
  shouldAdjustFontSize = false,
) => {
  if (!container || !button) return;

  const html = isMac() ? menuHTML.replaceAll('<kbd>Ctrl</kbd>', '<kbd>⌘</kbd>') : menuHTML;

  container.innerHTML = html;
  translateElement(container);

  if (shouldAdjustFontSize) {
    adjustFontSize(container);
  }

  registerMenuButton(container, button);
};

/**
 * decrease font size in menus when text is too wide (for different languages)
 */
const adjustFontSize = (container: HTMLElement) => {
  if (!i18n || i18n.getLanguage() === 'en') return;

  const adjustFont = (el: HTMLElement) =>
    new Promise<void>((resolve) => {
      const fontSize = Number(getComputedStyle(el).getPropertyValue('font-size').replace('px', ''));
      const maxWidth =
        Number(getComputedStyle(el).getPropertyValue('--label-max-width').replace('px', '')) || 188;
      if (el.clientWidth <= maxWidth || fontSize <= 0) return resolve();
      el.style.fontSize = fontSize - 1 + 'px';
      requestAnimationFrame(async () => {
        await adjustFont(el);
        resolve();
      });
    });

  const startAdjustment = async () => {
    container.style.display = 'block';
    container.style.visibility = 'hidden';
    (container.children[0] as HTMLElement).style.display = 'block';
    for (const el of container.querySelectorAll<HTMLElement>('span')) {
      await adjustFont(el);
    }
    container.style.display = '';
    container.style.visibility = '';
    (container.children[0] as HTMLElement).style.display = '';
  };

  setTimeout(startAdjustment, 1000);
  setTimeout(startAdjustment, 2000);
  setTimeout(startAdjustment, 3000);
};

const handleAppMenuButtonFocus = () => {
  // workaround for safari where click does not maintain focus!
  document.querySelectorAll<HTMLElement>('.app-menu-button').forEach((button) => {
    eventsManager.addEventListener(button, 'click', () => {
      button.focus();
    });
  });
};

const handleSettings = () => {
  const toggles = UI.getSettingToggles();
  toggles.forEach((toggle) => {
    eventsManager.addEventListener(toggle, 'change', async () => {
      const configKey = toggle.dataset.config as keyof Config | 'autosync';
      if (!configKey || (!(configKey in getConfig()) && configKey !== 'autosync')) return;

      if (configKey === 'theme') {
        setConfig({ ...getConfig(), theme: toggle.checked ? 'dark' : 'light' });
        transitionTheme(getConfig().theme, getConfig().editorTheme);
      } else if (configKey === 'layout') {
        const newLayout = toggle.readOnly ? 'vertical' : !toggle.checked ? 'horizontal' : undefined;
        setConfig({
          ...getConfig(),
          layout: newLayout,
        });
        setLayout(newLayout);
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

  const themeColorSelector = UI.getThemeColorSelector()!;
  themeColors.forEach((colorItem) => {
    const customColor = colorItem.name === 'custom';
    const label = document.createElement('label');
    label.htmlFor = 'theme-color-' + colorItem.name;
    if (customColor) {
      label.title = window.deps.translateString('app.themeColors.custom', 'Custom');
    }
    if (colorItem.themeColor) {
      label.style.backgroundColor = colorItem.themeColor;
    }

    const input = document.createElement('input');
    input.type = customColor ? 'color' : 'radio';
    input.id = 'theme-color-' + colorItem.name;
    input.name = 'theme-color';

    label.appendChild(input);
    themeColorSelector.appendChild(label);

    eventsManager.addEventListener(input, 'input', () => {
      setUserConfig({ themeColor: customColor ? input.value : colorItem.themeColor });
      changeThemeColor();
    });
  });
};

const handleChangeTheme = () => {
  const lightThemeButton = UI.getLightThemeButton();
  const darkThemeButton = UI.getDarkThemeButton();
  if (lightThemeButton) {
    eventsManager.addEventListener(lightThemeButton, 'click', () => {
      setUserConfig({ theme: 'dark' });
      transitionTheme('dark', getConfig().editorTheme);
    });
  }
  if (darkThemeButton) {
    eventsManager.addEventListener(darkThemeButton, 'click', () => {
      setUserConfig({ theme: 'light' });
      transitionTheme('light', getConfig().editorTheme);
    });
  }
};

const handleLogin = () => {
  eventsManager.addEventListener(UI.getLoginLink(), 'click', login, false);
  registerScreen('login', login);
};

const handleLogout = () => {
  eventsManager.addEventListener(UI.getLogoutLink(), 'click', logout, false);
};

const handleNew = () => {
  const templatesContainer = createTemplatesContainer(eventsManager);

  const loadUserTemplates = async () => {
    const userTemplatesScreen = UI.getUserTemplatesScreen(templatesContainer);
    const defaultTemplate = getAppData()?.defaultTemplate;
    const userTemplates = ((await stores.templates?.getList()) || []).sort((a, b) =>
      a.id === defaultTemplate ? -1 : b.id === defaultTemplate ? 1 : 0,
    );

    if (userTemplates.length === 0) {
      userTemplatesScreen.innerHTML = noUserTemplates();
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
      addTemplateToIndex(item);

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
          notifications.confirm(
            window.deps.translateString('core.template.delete', 'Delete template "{{item}}"?', {
              item: item.title,
            }),
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
                  userTemplatesScreen.innerHTML = noUserTemplates();
                }
              }, 500);
            },
          );
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

  const createTemplatesUI = async () => {
    initTemplatesSearchIndex();
    const starterTemplatesList = UI.getStarterTemplatesList(templatesContainer);
    if (!starterTemplatesList) return;
    starterTemplatesList.innerHTML = '';
    const searchInput = UI.getTemplatesSearchInput(templatesContainer);
    if (searchInput) {
      searchInput.value = '';
    }
    const loadingText = starterTemplatesList?.firstElementChild;
    getTemplates()
      .then((starterTemplates) => {
        loadingText?.remove();
        starterTemplates.forEach((template, id) => {
          const link = createStarterTemplateLink(
            { id: String(id), ...template },
            starterTemplatesList,
            baseUrl,
          );
          addTemplateToIndex({ id: String(id), ...template });
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
        notifications.error(
          window.deps.translateString(
            'core.error.failedToLoadTemplates',
            'Failed loading starter templates',
          ),
        );
      });

    loadUserTemplates();
    requestAnimationFrame(() => UI.getStarterTemplatesTab(templatesContainer)?.click());
    modal.show(templatesContainer, { isAsync: true, size: 'large-fixed' });
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
      notifications.success(
        window.deps.translateString('core.template.saved', 'Saved as a new template'),
      );
    }
  });
};

const handleOpen = () => {
  const createList = async () => {
    modal.show(loadingMessage(), { size: 'small' });
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
    modal.show(loadingMessage(), { size: 'small', autoFocus: false });
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
      notifications.info(
        window.deps.translateString('core.export.gist', 'Creating a public GitHub gist...'),
      );
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
      notifications.error(
        window.deps.translateString('generic.error.authentication', 'Authentication error!'),
      );
      return;
    }
    modal.show(loadingMessage(), { size: 'small', autoFocus: false });

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
        getLanguageCompiler,
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
      notifications.error(
        window.deps.translateString('generic.error.authentication', 'Authentication error!'),
      );
      return;
    }
    modal.show(loadingMessage(), { size: 'small', autoFocus: false });

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

const handlePersistentStorage = async () => {
  if (isEmbed) return;

  let alreadyRequested = false;

  const unsubscribe = () => {
    projectSubscription?.unsubscribe();
    templateSubscription?.unsubscribe();
    assetSubscription?.unsubscribe();
  };

  const requestPersistence = () => {
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

  const projectSubscription = stores.projects?.subscribe(requestPersistence);
  const templateSubscription = stores.templates?.subscribe(requestPersistence);
  const assetSubscription = stores.assets?.subscribe(requestPersistence);

  stores.projects?.subscribe(updateRecentProjects);
};

const handleBackup = () => {
  const createBackupUI = async () => {
    modal.show(loadingMessage(), { size: 'small' });
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
    modal.show(loadingMessage(), { size: 'small' });

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
    modal.show(loadingMessage(), { size: 'small' });

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
      UI.getWelcomeLinkNoDefaultTemplate(welcomeContainer).style.display = 'inline-block';
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
      loadTemplateLink.style.display = 'inline-block';
    }
    UI.getWelcomeLinkDefaultTemplateLi(welcomeContainer).style.visibility = 'visible';

    const defaultTemplates: Array<{ name: Template['name']; title: string }> = [
      {
        name: 'blank',
        title: window.deps.translateString('core.template.blank', 'Blank Project'),
      },
      {
        name: 'javascript',
        title: window.deps.translateString('core.template.javascript', 'JavaScript Starter'),
      },
      {
        name: 'typescript',
        title: window.deps.translateString('core.template.typescript', 'TypeScript Starter'),
      },
      {
        name: 'react',
        title: window.deps.translateString('core.template.react', 'React Starter'),
      },
      {
        name: 'vue',
        title: window.deps.translateString('core.template.vue', 'Vue 3 Starter'),
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
    const versions = getVersion(/* log= */ false);
    const repoUrl = process.env.REPO_URL || '';
    const div = document.createElement('div');
    div.innerHTML = aboutScreen
      .replace(/{{COMMIT_URL}}/g, `${repoUrl}/commit/${versions.commitSHA}`)
      .replace(/{{APP_URL}}/g, versions.appUrl)
      .replace(/{{SDK_URL}}/g, versions.sdkUrl)
      .replace('livecodes-text-logo-nowrap.svg', () =>
        getConfig().theme === 'dark'
          ? 'livecodes-text-logo-nowrap-light.svg'
          : 'livecodes-text-logo-nowrap.svg',
      );
    const aboutContainer = div.firstChild as HTMLElement;
    modal.show(aboutContainer);
  };

  eventsManager.addEventListener(UI.getAboutLink(), 'click', createAboutUI);
  registerScreen('about', createAboutUI);
};

const handleProjectInfo = () => {
  const onUpdate = async (
    title: string,
    description: string,
    head: string,
    htmlAttrs: string,
    tags: string[],
  ) => {
    let attrs = '';
    try {
      attrs = JSON.parse(stringToValidJson(htmlAttrs));
    } catch {
      attrs = htmlAttrs;
    }
    setConfig({
      ...getConfig(),
      title,
      description,
      head,
      htmlAttrs: attrs,
      tags,
    });
    setProjectInfoMark();
    if (getConfig().autoupdate) {
      await run();
    }
    dispatchChangeEvent();
  };
  const createProjectInfo = () =>
    createProjectInfoUI(getConfig(), stores.projects || fakeStorage, modal, onUpdate);

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
      isLite,
      isHeadless,
      language: 'html',
      mapLanguage,
      readonly: true,
      value: '',
      ...getEditorConfig(config),
      editor: 'codejar',
      getFormatterConfig: () => getFormatterConfig(getConfig()),
      getFontFamily,
    });
  const createEmbedUI = async () => {
    modal.show(loadingMessage(), { size: 'small' });

    const embedModule: typeof import('./UI/embed-ui') = await import(
      baseUrl + '{{hash:embed-ui.js}}'
    );
    await embedModule.createEmbedUI({
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

const changeEditorSettings = (newConfig: Partial<UserConfig> | null) => {
  if (!newConfig) return;
  const shouldReload =
    newConfig.editor !== getConfig().editor && !((newConfig.editor || '') in getActiveEditor());

  setUserConfig(newConfig);
  const updatedConfig = getConfig();
  transitionTheme(updatedConfig.theme, updatedConfig.editorTheme);
  if (shouldReload) {
    reloadEditors(updatedConfig);
  } else {
    getAllEditors().forEach((editor) => {
      editor.changeSettings(updatedConfig);
    });
  }
  showEditorModeStatus(updatedConfig.activeEditor || 'markup');
  getActiveEditor().focus();
};

const handleEditorSettings = () => {
  const createEditorSettingsUI = async ({
    scrollToSelector = '',
  }: { scrollToSelector?: string } = {}) => {
    modal.show(loadingMessage(), { size: 'small' });

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
        loadTypes: async (code: string) => typeLoader.load(code, {}),
        getFormatFn: () => formatter.getFormatFn('jsx'),
        changeSettings: changeEditorSettings,
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

const handleCodeToImage = () => {
  const getSavedPreset = () => getAppData()?.codeToImagePreset;

  const savePreset = (preset: AppData['codeToImagePreset']) => {
    setAppData({ codeToImagePreset: preset });
  };

  const createCodeToImageUI = async () => {
    modal.show(loadingMessage());

    const activeEditor = getActiveEditor();

    const createPreviewEditor = (
      options: Pick<
        EditorOptions,
        'container' | 'editorTheme' | 'fontFamily' | 'fontSize' | 'lineNumbers'
      >,
    ) =>
      createEditor({
        ...getEditorConfig(getConfig()),
        baseUrl,
        editor: 'codejar',
        theme: 'dark',
        wordWrap: true,
        language: activeEditor.getLanguage(),
        value: activeEditor.getValue(),
        readonly: false,
        editorId: 'codeToImage',
        isEmbed: false,
        isLite,
        isHeadless: false,
        getLanguageExtension,
        mapLanguage,
        getFormatterConfig: () => getFormatterConfig(getConfig()),
        getFontFamily,
        ...options,
      });

    const currentUrl = (location.origin + location.pathname).split('/').slice(0, -1).join('/');

    const getShareUrl = async (config: Partial<Config>, shortUrl = true) => {
      if (shortUrl) {
        const param = '/?x=id/' + (await shareService.shareProject(config));
        return currentUrl + param;
      }
      return getPlaygroundUrl({ appUrl: currentUrl, config });
    };

    const codeToImageModule: typeof import('./UI/code-to-image') = await import(
      baseUrl + '{{hash:code-to-image.js}}'
    );
    const title = getConfig().title;
    const fileName = title.trim() !== '' && title !== defaultConfig.title ? title : 'code-to-image';
    await codeToImageModule.createCodeToImageUI({
      baseUrl,
      currentUrl,
      fileName: safeName(fileName, '-').toLowerCase(),
      editorId: getLanguageEditorId(activeEditor.getLanguage()) || 'script',
      modal,
      notifications,
      eventsManager,
      deps: {
        createEditor: createPreviewEditor,
        getFormatFn: () => formatter.getFormatFn(activeEditor.getLanguage()),
        getShareUrl,
        getSavedPreset,
        savePreset,
      },
    });
  };

  registerScreen('code-to-image', createCodeToImageUI);
};

const handleAssets = () => {
  let assetsModule: typeof import('./UI/assets');
  const loadModule = async () => {
    modal.show(loadingMessage(), { size: 'small' });
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
    modal.show(loadingMessage(), { size: 'small' });
    snippetsModule = snippetsModule || (await import(baseUrl + '{{hash:snippets.js}}'));
  };

  const createEditorFn = async (options: Partial<EditorOptions>) =>
    createEditor({
      baseUrl,
      container: null,
      editorId: 'snippet',
      getLanguageExtension,
      isEmbed,
      isLite,
      isHeadless,
      language: 'html',
      value: '',
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
      if (getConfig().autoupdate) {
        await run();
      }
      dispatchChangeEvent();
    };

    modal.show(loadingMessage(), { size: 'small', autoFocus: false });
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
      onClose: () => customSettingsEditor?.destroy(),
      autoFocus: false,
    });

    const options: EditorOptions = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editorId: 'customSettings',
      container: UI.getCustomSettingsEditor(),
      language: 'json' as Language,
      value: stringify({ imports: {}, ...config.customSettings }, true),
      isEmbed,
      isLite,
      isHeadless,
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
          notifications.error(
            window.deps.translateString(
              'core.error.failedToParseSettings',
              'Failed parsing settings as JSON',
            ),
          );
          return;
        }
      }
      if (JSON.stringify(customSettings) !== JSON.stringify(getConfig().customSettings)) {
        compiler.clearCache();
        setConfig({
          ...getConfig(),
          customSettings,
        });
        setCustomSettingsMark();
        await setSavedStatus();
        if (customSettings.types) {
          loadModuleTypes(editors, getConfig(), /* loadAll = */ true, /* force */ true);
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
  registerScreen('custom-settings', async () => setTimeout(createCustomSettingsUI));
};

const handleConsole = () => {
  eventsManager.addEventListener(window, 'message', (event: any) => {
    if (event.origin !== sandboxService.getOrigin() || event.data.type !== 'console') {
      return;
    }

    let consoleEvent: CustomEvent<{ method: string; args: any[] } | void>;
    if (sdkWatchers.console.hasSubscribers()) {
      const message = event.data;
      const args: any[] =
        message.method === 'clear'
          ? []
          : message.args?.map?.((arg: any) => arg.content ?? '') ?? [];
      consoleEvent = new CustomEvent(customEvents.console, {
        detail: { method: message.method, args },
      });
    } else {
      consoleEvent = new CustomEvent(customEvents.console);
    }

    document.dispatchEvent(consoleEvent);
    parent.dispatchEvent(consoleEvent);
  });
};

const handleTestResults = () => {
  eventsManager.addEventListener(window, 'message', (ev: any) => {
    if (ev.origin !== sandboxService.getOrigin()) return;
    if (ev.data.type !== 'testResults') return;

    let results = ev.data.payload?.results;
    const error = ev.data.payload?.error;
    if (Array.isArray(results)) {
      results = results.map((result) => {
        if (result.status === 'done') {
          result.status = result.errors?.length === 0 ? 'pass' : 'fail';
        }
        return result;
      });
    }

    toolsPane?.tests?.showResults({ results, error });
    sdkWatchers.tests.notify({ results, error });

    let testResultsEvent: CustomEvent<{ results: TestResult[]; error?: string } | void>;
    if (sdkWatchers.tests.hasSubscribers()) {
      testResultsEvent = new CustomEvent(customEvents.testResults, {
        detail: JSON.parse(JSON.stringify({ results, error })),
      });
    } else {
      testResultsEvent = new CustomEvent(customEvents.testResults);
    }

    document.dispatchEvent(testResultsEvent);
    parent.dispatchEvent(testResultsEvent);
    setLoading(false);
  });
};

const handleTests = () => {
  if (getConfig().autotest) {
    UI.getWatchTestsButton()?.classList.remove('disabled');
  }

  eventsManager.addEventListener(
    UI.getRunTestsButton(),
    'click',
    (ev: Event) => {
      ev.preventDefault();
      if (!toolsPane?.tests) return;
      // in case it is triggered by keyboard shortcut or command menu
      split?.show('output');
      toolsPane.setActiveTool('tests');
      if (toolsPane.getStatus() === 'closed') {
        toolsPane.open();
      }
      runTests();
    },
    false,
  );

  eventsManager.addEventListener(
    UI.getWatchTestsButton(),
    'click',
    (ev: Event) => {
      ev.preventDefault();
      setUserConfig({ autotest: !getConfig().autotest });
      if (getConfig().autotest) {
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
    modal.show(testEditorContainer, { onClose: () => testEditor?.destroy() });

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
      isEmbed,
      isLite,
      isHeadless,
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
          declareAsGlobal: true,
        },
      };
      let forceLoadTypes = true;
      const loadTestTypes = () => {
        typeLoader.load(testEditor?.getValue() || '', testTypes, forceLoadTypes).then((libs) => {
          libs.forEach((lib) => testEditor?.addTypes?.(lib));
        });
        forceLoadTypes = false;
      };
      testEditor.onContentChanged(
        debounce(loadTestTypes, () => getConfig().delay ?? defaultConfig.delay),
      );
      loadTestTypes();
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

  const showResultModeDrawer = (event: MessageEvent) => {
    const iframe = UI.getResultIFrameElement();
    if (
      !iframe ||
      event.source !== iframe.contentWindow ||
      event.data.type !== 'loading' ||
      event.data.payload !== false ||
      getConfig().mode !== 'result'
    ) {
      return;
    }
    const drawer = UI.getResultModeDrawer();
    drawer.classList.remove('hidden');
    eventsManager.removeEventListener(window, 'message', showResultModeDrawer);
  };
  eventsManager.addEventListener(window, 'message', showResultModeDrawer);
};

const createToolButton = (id: string, title: string, innerHTML: string) => {
  const btn = document.createElement('div');
  btn.id = id;
  btn.classList.add('tool-buttons');
  btn.title = title;
  btn.style.pointerEvents = 'all'; // override setting to 'none' on toolspane bar
  btn.innerHTML = innerHTML;
  UI.getToolspaneTitles()?.appendChild(btn);
  return btn;
};

const handleResultPopup = () => {
  const popupBtn = createToolButton(
    'result-popup-btn',
    window.deps.translateString('core.result.hint', 'Show result in new window'),
    `<button id="show-result"><i class="icon-window-new"></i></button>`,
  );
  let url: string | undefined;
  const openWindow = async () => {
    if (resultPopup && !resultPopup.closed) {
      resultPopup.focus();
      return;
    }
    popupBtn.classList.add('loading');
    url = url || URL.createObjectURL(new Blob([resultPopupHTML], { type: 'text/html' }));
    // add a notice to URL that it is a temporary URL to prevent users from sharing it.
    // revoking the URL after opening the window prevents viewing the page source.
    const notice = '#---TEMPORARY-URL---';
    resultPopup = window.open(url + notice, 'livecodes-result', `width=800,height=400`);
    eventsManager.addEventListener(window, 'message', async (ev: MessageEvent) => {
      if (ev.source !== resultPopup) return;
      if (ev.data.type === 'loaded') {
        resultPopup?.postMessage({ url: sandboxService.getResultUrl() }, location.origin);
      }
      if (ev.data.type === 'ready') {
        resultPopup?.postMessage(
          { result: await getResultPage({ singleFile: true }) },
          location.origin,
        );
      }
    });
    popupBtn.classList.remove('loading');
  };
  eventsManager.addEventListener(popupBtn, 'click', openWindow);
  eventsManager.addEventListener(popupBtn, 'touchstart', openWindow);
  UI.getToolspaneTitles()?.appendChild(popupBtn);
};

const handleResultZoom = () => {
  const zoomBtn = createToolButton(
    'zoom-button',
    window.deps.translateString('core.zoom.hint', 'Zoom') + ' (Ctrl/Cmd + Alt + Z)',
    `<button class="text">
      <span id="zoom-value">${String(Number(getConfig().zoom))}</span>
      &times;
    </button>`,
  );
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
  const broadcastStatusBtn = createToolButton(
    'broadcast-status-btn',
    window.deps.translateString('core.broadcast.heading', 'Broadcast'),
    `<button id="broadcast-status"><i class="icon-broadcast"></i><span class="mark"></span></button>`,
  );

  const showBroadcast = () => {
    showScreen('broadcast');
  };
  eventsManager.addEventListener(broadcastStatusBtn, 'click', showBroadcast);
  eventsManager.addEventListener(broadcastStatusBtn, 'touchstart', showBroadcast);
  UI.getToolspaneTitles()?.appendChild(broadcastStatusBtn);
};

const handleFullscreen = async () => {
  const fullscreenButton = getFullscreenButton();
  const buttonImg = fullscreenButton.querySelector('img');
  const fscreen = (await import(fscreenUrl)).default;
  if (!fscreen.fullscreenEnabled) {
    fullscreenButton.style.visibility = 'hidden';
    return;
  }

  eventsManager.addEventListener(fscreen, 'fullscreenchange', async () => {
    if (!buttonImg) return;
    if (!fscreen.fullscreenElement) {
      buttonImg.src = buttonImg.src.replace('collapse.svg', 'expand.svg');
      fullscreenButton.title = window.deps.translateString('core.fullScreen.enter', 'Full Screen');
      return;
    }
    buttonImg.src = buttonImg.src.replace('expand.svg', 'collapse.svg');
    fullscreenButton.title = window.deps.translateString(
      'core.fullScreen.exit',
      'Exit Full Screen',
    );
  });

  eventsManager.addEventListener(fullscreenButton, 'click', async () => {
    if (fscreen.fullscreenElement) {
      await fscreen.exitFullscreen();
      return;
    }
    await fscreen.requestFullscreen(document.body);
  });
};

const handleDropFiles = () => {
  if (isEmbed) return;

  eventsManager.addEventListener(document, 'drop', (event: DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (!files?.length) return;

    importFromFiles(files, populateConfig, eventsManager)
      .then(loadConfig)
      .catch((message) => {
        notifications.error(message);
      });
  });

  eventsManager.addEventListener(document, 'dragover', (event: DragEvent) => {
    event.preventDefault();
  });
};

const handleResultModeDrawer = () => {
  const drawer = UI.getResultModeDrawer();
  const drawerLink = drawer.querySelector('a') as HTMLAnchorElement;
  const closeBtn = drawer.querySelector('#drawer-close') as HTMLButtonElement;

  eventsManager.addEventListener(drawerLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open(
      (await share(/* shortUrl= */ false, /* contentOnly= */ true, /* urlUpdate= */ false)).url,
      '_blank',
    );
  });

  eventsManager.addEventListener(closeBtn, 'click', async () => {
    drawer.classList.add('hidden');
  });
};

const handleUnload = () => {
  window.onbeforeunload = () => {
    if (!isSaved) {
      return window.deps.translateString(
        'core.unload.notSaved',
        'Changes you made may not be saved.',
      );
    } else {
      return;
    }
  };
};

const loadToolsPane = async () => {
  if (isLite) return;
  const updateConfigTools = debounce((tools: Config['tools']) => {
    setConfig({
      ...getConfig(),
      tools,
    });
  }, 100);
  toolsPane = createToolsPane(
    getConfig(),
    baseUrl,
    editors,
    eventsManager,
    isEmbed,
    runTests,
    updateConfigTools,
  );
  await toolsPane.load();
  handleTests();
  handleResultZoom();
  getResultElement().classList.remove('full');
};

const configureToolsPane = (
  tools: Config['tools'] | undefined,
  mode: Config['mode'] | undefined,
) => {
  if (!toolsPane) return;
  if (mode === 'result' && (!tools || tools.status === '' || tools.status === 'none')) {
    toolsPane.hide();
    return;
  }
  if (tools?.active) {
    toolsPane.setActiveTool(tools.active);
  }
  if (!tools) {
    toolsPane.close();
    return;
  }
  if (tools.status === 'none') {
    toolsPane.hide();
    return;
  }
  if (tools.status === 'full') {
    toolsPane.maximize();
  }
  if (tools.status === 'open') {
    toolsPane.open();
  }
  if (tools.status === 'closed' || tools.status === '') {
    toolsPane.close();
  }
  // TODO: handle tools.enabled
};

const loadI18n = async (appLanguage: AppLanguage | undefined) => {
  const userLang =
    appLanguage && appLanguage !== 'auto' ? appLanguage : (navigator.language as AppLanguage);
  if (
    isHeadless ||
    (isEmbed && !appLanguage) ||
    !userLang ||
    userLang.startsWith('en') ||
    !Object.keys(appLanguages).find((lang) => lang.startsWith(userLang))
  ) {
    return;
  }
  setConfig({ ...getConfig(), appLanguage: userLang });
  const i18nModule: typeof import('./i18n') = await import(baseUrl + '{{hash:i18n.js}}');
  i18n = await i18nModule.init(userLang, baseUrl);
  window.deps.translateString = i18n.translateString;
};

const handleI18n = () => {
  if (!i18n) return;
  eventsManager.addEventListener(document.body, customEvents.i18n, (e) => {
    const elem = e.target as HTMLElement;
    i18n?.translate(elem);
  });
  translateElement(document.body);
};

/**
 * Dispatch a translation event to the given element.
 * @param elem The element to dispatch the event to.
 */
const translateElement = (elem: HTMLElement) => {
  elem.dispatchEvent(new CustomEvent(customEvents.i18n, { bubbles: true }));
};

const translateStringMock = <Key extends I18nKeyType, Value extends string>(
  _key: Key,
  value: I18nValueType<Key, Value>,
  ...args: I18nInterpolationType<I18nValueType<Key, Value>>
) => {
  const rawInterpolation = args[0];
  const { isHTML, ...interpolation } = rawInterpolation ?? {};
  if (!interpolation) return value as string;
  let result: string = value as string;
  for (const [k, v] of Object.entries({ ...interpolation, ...predefinedValues })) {
    result = result.replaceAll(`{{${k}}}`, v as string);
  }
  return result;
};

const setAppLanguage = ({
  appLanguage,
  reload = false,
  url,
}: {
  appLanguage?: AppLanguage;
  reload?: boolean;
  url?: string;
} = {}) => {
  const lang = (appLanguage ?? i18n?.getLanguage() ?? 'en') as AppLanguage;
  document.documentElement.lang = lang;
  document.documentElement.dir = i18n?.getLanguageDirection() ?? 'ltr';
  if (!reload && (isEmbed || params.appLanguage)) return;

  const flatten = (obj: I18nTranslationTemplate, prefix = ''): { [k: string]: string } =>
    Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      if (typeof value === 'object') {
        return { ...acc, ...flatten(value, `${prefix}${key}.`) };
      }
      return { ...acc, [`${prefix}${key}`]: value };
    }, {});

  const i18nSplashData =
    !isEmbed && i18n ? flatten(i18n.translateKey('splash', { returnObjects: true })) : {};

  parent.postMessage(
    {
      args: 'i18n',
      payload: {
        data: i18nSplashData,
        reload,
        lang,
        url,
      },
    },
    location.origin,
  );
};

const changeAppLanguage = async (appLanguage: AppLanguage) => {
  if (!i18n && appLanguage !== 'en') {
    modal.show(loadingMessage(), { size: 'small' });
    await loadI18n(appLanguage);
  }
  await i18n?.changeLanguage(appLanguage);
  const url = (await share(/* shortUrl = */ false, /* contentOnly = */ false)).url;
  isSaved = true;
  setAppLanguage({ appLanguage, reload: true, url });
};

const basicHandlers = () => {
  notifications = createNotifications();
  modal = createModal({
    translate: translateElement,
    isEmbed,
    onClose: () => {
      if (!isEmbed) {
        getActiveEditor().focus();
      }
    },
  });
  split = createSplitPanes();
  typeLoader = createTypeLoader(baseUrl);

  handleLogoLink();
  handleResize();
  handleIframeResize();
  handleIframeScroll();
  handleSelectEditor();
  handleChangeLanguage();
  handleChangeContent();
  // Setup keyboard shortcuts with dependency injection
  handleKeyboardShortcuts({
    eventsManager,
    getActiveEditor,
    getConfig,
    showEditor,
    run,
    toolsPane,
    split,
    isEmbed,
  });
  handleRunButton();
  handleResultButton();
  handleShareButton();
  handleEditorTools();
  handleProcessors();
  handleResultLoading();
  handleTestResults();
  handleConsole();
  handleI18n();
  handleFullscreen();
  if (isEmbed) {
    handleExternalResources();
  }
};

const extraHandlers = async () => {
  handleTitleEdit();
  handleAppMenuProject();
  handleAppMenuSettings();
  handleAppMenuHelp();
  handleSettings();
  handleI18nMenu();
  handleAppMenuButtonFocus();
  handleChangeTheme();
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
  handleCodeToImage();
  handleSync();
  handleAutosync();
  handlePersistentStorage();
  handleExternalResources();
  handleBackup();
  handleBroadcast();
  handleWelcome();
  handleAbout();
  handleResultPopup();
  handleBroadcastStatus();
  handleDropFiles();
  handleCommandMenu();
  handleKeyboardShortcutsScreen();
  handleUnload();
  showConsoleMessage();
};

const configureEmbed = (eventsManager: EventsManager) => {
  document.body.classList.add('embed');
  handleResultModeDrawer();

  const logoLink = UI.getLogoLink();
  logoLink.title = window.deps.translateString('generic.embed.logoHint', 'Edit on LiveCodes 🡕');

  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open(
      (await share(/* shortUrl= */ false, /* contentOnly= */ true, /* urlUpdate= */ false)).url,
      '_blank',
    );
  });
};

const configureLite = () => {
  setConfig({
    ...getConfig(),
    emmet: false,
    tools: {
      enabled: [],
      active: '',
      status: 'none',
    },
  });
  UI.getFormatButton().style.display = 'none';
};

const configureSimpleMode = (config: Config) => {
  setConfig({
    ...config,
    tools: {
      enabled: ['console'],
      active: 'console',
      status: config.tools?.status || 'closed',
    },
  });
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
  if (config.mode === 'codeblock') {
    setConfig({ ...config, readonly: true });
  }
  if (isLite) {
    configureLite();
  }
  if (isEmbed || config.mode === 'result') {
    configureEmbed(eventsManager);
  }
  if (config.mode === 'simple') {
    configureSimpleMode(config);
  }
};

const importExternalContent = async (options: {
  config?: Config;
  sdkConfig?: Partial<Config>;
  configUrl?: string;
  template?: string;
  importUrl?: string;
}): Promise<boolean> => {
  const { config = defaultConfig, sdkConfig, configUrl, template } = options;
  let importUrl = options.importUrl;
  const hasContentUrls = (conf: Partial<Config>) =>
    editorIds.filter(
      (editorId) =>
        (conf[editorId]?.contentUrl && !conf[editorId]?.content) ||
        (conf[editorId]?.hiddenContentUrl && !conf[editorId]?.hiddenContent),
    ).length > 0;
  const validConfigUrl = getValidUrl(configUrl);
  if (importUrl?.startsWith('config') || importUrl?.startsWith('params')) {
    importUrl = ''; // ignore hash params
  }

  if (!validConfigUrl && !template && !importUrl && !hasContentUrls(config)) return false;

  const loadingMessage = window.deps.translateString('core.import.loading', 'Loading Project...');
  notifications.info(loadingMessage);

  let templateConfig: Partial<Config> = {};
  let importUrlConfig: Partial<Config> = {};
  let contentUrlConfig: Partial<Config> = {};
  let configUrlConfig: Partial<Config> = {};

  if (template) {
    const templateObj = await getTemplate(template, config, baseUrl);
    if (templateObj) {
      templateConfig = upgradeAndValidate(templateObj);
    } else {
      notifications.error(
        window.deps.translateString(
          'core.error.couldNotLoadTemplate',
          'Could not load template: {{template}}',
          {
            template,
          },
        ),
      );
    }
  }
  if (importUrl) {
    let validImportUrl = importUrl;
    if (importUrl.startsWith('http') || importUrl.startsWith('data')) {
      try {
        validImportUrl = new URL(importUrl).href;
      } catch {
        validImportUrl = decodeURIComponent(importUrl);
      }
    }
    // import code from hash: github / github gist / url html / ...etc
    let user;
    if (isGithub(validImportUrl) && !isEmbed) {
      await initializeAuth();
      user = await authService?.getUser();
    }

    const importModule: typeof import('./UI/import') = await import(baseUrl + '{{hash:import.js}}');
    importUrlConfig = await importModule.importCode(validImportUrl, params, config, user, baseUrl);

    if (Object.keys(importUrlConfig).length === 0) {
      notifications.error(
        window.deps.translateString('core.error.invalidImport', 'Invalid import URL'),
      );
    }
  }

  if (hasContentUrls(config)) {
    // load content from config contentUrl
    const editorsContent = await Promise.all(
      editorIds.map(async (editorId) => {
        const contentUrl = config[editorId].contentUrl;
        const hiddenContentUrl = config[editorId].hiddenContentUrl;
        const [content, hiddenContent] = await Promise.all([
          contentUrl && getValidUrl(contentUrl) && !config[editorId].content
            ? fetch(contentUrl).then((res) => res.text())
            : Promise.resolve(''),
          hiddenContentUrl && getValidUrl(hiddenContentUrl) && !config[editorId].hiddenContent
            ? fetch(hiddenContentUrl).then((res) => res.text())
            : Promise.resolve(''),
        ]);
        return {
          ...config[editorId],
          ...(content ? { content } : {}),
          ...(hiddenContent ? { hiddenContent } : {}),
        };
      }),
    );
    contentUrlConfig = {
      markup: editorsContent[0],
      style: editorsContent[1],
      script: editorsContent[2],
    };
  }

  if (validConfigUrl) {
    configUrlConfig = upgradeAndValidate(
      await fetch(validConfigUrl)
        .then((res) => res.json())
        .catch(() => ({})),
    );
    if (hasContentUrls(configUrlConfig)) {
      return importExternalContent({ ...options, config: { ...config, ...configUrlConfig } });
    }
  }

  await loadConfig(
    buildConfig({
      ...config,
      ...templateConfig,
      ...importUrlConfig,
      ...configUrlConfig,
      ...sdkConfig,
      ...contentUrlConfig,
    }),
    parent.location.href,
    false,
  );

  loadSelectedScreen();

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

  if (
    (getConfig().welcome && !params.screen && getConfig().mode === 'full') ||
    params.screen === 'welcome'
  ) {
    showScreen('welcome');
    return;
  }

  const defaultTemplateId = getAppData()?.defaultTemplate;
  if (defaultTemplateId) {
    notifications.info(
      window.deps.translateString('core.loadDefaults.template', 'Loading default template'),
    );
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

const initializePlayground = async (
  options?: {
    config?: Partial<Config>;
    baseUrl?: string;
    isEmbed?: boolean;
    isHeadless?: boolean;
  },
  initializeFn?: () => void | Promise<void>,
) => {
  const importUrl = params.x || parent.location.hash.substring(1); // for backward compatibility
  const appConfig = options?.config ?? {};
  const codeImportConfig = importCompressedCode(importUrl);
  const sdkConfig = importCompressedCode(params.config ?? '');
  const initialConfig = { ...codeImportConfig, ...appConfig, ...sdkConfig };
  baseUrl = options?.baseUrl ?? '/livecodes/';
  isHeadless = options?.isHeadless ?? false;
  isLite =
    params.mode === 'lite' ||
    (params.lite != null && params.lite !== false) || // for backward compatibility
    initialConfig.mode === 'lite' ||
    false;
  isEmbed =
    isHeadless ||
    isLite ||
    (options?.isEmbed ?? false) ||
    initialConfig.mode === 'simple' ||
    params.mode === 'simple';

  window.history.replaceState(null, '', './'); // fix URL from "/app" to "/"
  await initializeStores(stores, isEmbed);
  const userConfig = stores.userConfig?.getValue() ?? {};
  setConfig(buildConfig({ ...getConfig(), ...userConfig, ...initialConfig }));
  configureModes({ config: getConfig(), isEmbed, isLite });
  compiler = (window as any).compiler = await getCompiler({
    config: getConfig(),
    baseUrl,
    eventsManager,
  });
  formatter = getFormatter(getConfig(), baseUrl, isEmbed);
  customEditors = createCustomEditors({ baseUrl, eventsManager });
  await loadI18n(getConfig().appLanguage);
  createLanguageMenus(
    getConfig(),
    baseUrl,
    eventsManager,
    showLanguageInfo,
    loadStarterTemplate,
    importExternalContent,
    registerMenuButton,
  );
  await createEditors(getConfig());
  await initializeFn?.();
  loadUserConfig(/* updateUI = */ true);
  loadStyles();
  await createIframe(UI.getResultElement());
  setTheme(getConfig().theme, getConfig().editorTheme);
  if (!isEmbed) {
    initializeAuth().then(() => showSyncStatus());
    checkRecoverStatus();
  }
  importExternalContent({
    config: getConfig(),
    sdkConfig,
    configUrl: params.config,
    template: params.template,
    importUrl: Object.keys(codeImportConfig).length > 0 ? '' : importUrl, // do not re-import compressed code
  }).then(async (contentImported) => {
    if (!contentImported) {
      loadSelectedScreen();
      await applyConfig(getConfig(), /* reload = */ false);
    }
    initialized = true;
  });
  configureEmmet(getConfig());
  setAppLanguage();
};

const createApi = (): API => {
  const apiGetShareUrl = async (shortUrl = false) => (await share(shortUrl, true, false)).url;

  const apiGetConfig = async (contentOnly = false): Promise<Config> => {
    updateConfig();
    const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
    return JSON.parse(JSON.stringify(config));
  };

  const apiSetConfig = async (newConfig: Partial<Config>): Promise<Config> => {
    const currentConfig = getConfig();
    const newAppConfig = buildConfig({ ...currentConfig, ...newConfig });
    const hasNewAppLanguage =
      newConfig.appLanguage && newConfig.appLanguage !== i18n?.getLanguage();
    const shouldRun =
      newConfig.mode != null && newConfig.mode !== 'editor' && newConfig.mode !== 'codeblock';
    const shouldReloadCompiler = shouldRun && compiler.isFake;
    const isContentOnlyChange = compareObjects(
      newConfig,
      currentConfig as Record<string, any>,
    ).every((k) => ['markup.content', 'style.content', 'script.content'].includes(k));

    setConfig(newAppConfig);

    if (isContentOnlyChange) {
      for (const key of ['markup', 'style', 'script'] as const) {
        const content = newConfig[key]?.content;
        if (content != null) {
          editors[key].setValue(content);
        }
      }
      return newAppConfig;
    }

    if (hasNewAppLanguage) {
      changeAppLanguage(newConfig.appLanguage!);
      return newAppConfig;
    }
    if (shouldReloadCompiler) {
      await reloadCompiler(newAppConfig);
    }
    await applyConfig(newConfig, /* reload = */ true, currentConfig);
    return newAppConfig;
  };

  const apiGetCode = async (): Promise<Code> => {
    updateConfig();
    if (!cacheIsValid(getCache(), getContentConfig(getConfig()))) {
      await getResultPage({ forExport: true });
    }
    return JSON.parse(JSON.stringify(getCachedCode()));
  };

  const apiShow: API['show'] = async (
    panel,
    { full = false, line, column, zoom: zoomLevel } = {},
  ) => {
    if (panel === 'toggle-result') {
      UI.getResultButton()?.click();
      if (zoomLevel) {
        zoom(zoomLevel);
      }
    } else if (panel === 'result') {
      split?.show('output', full);
      if (getConfig().tools.status !== 'none') {
        setTimeout(() => toolsPane?.close(), 350);
      }
      if (zoomLevel) {
        zoom(zoomLevel);
      }
    } else if (panel === 'editor') {
      split?.show('code', full);
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
      throw new Error(window.deps.translateString('core.error.invalidPanelId', 'Invalid panel id'));
    }
  };

  const apiRunTests: API['runTests'] = () =>
    new Promise((resolve) => {
      const watcher = sdkWatchers.tests.subscribe((testResults) => {
        resolve(testResults);
        watcher.unsubscribe();
      });
      runTests();
    });

  const apiWatch: API['watch'] = (sdkEvent: SDKEvent, fn: any) => {
    if (!(sdkEvent in sdkWatchers)) return { remove: () => undefined };
    if (fn === 'unsubscribe') {
      sdkWatchers[sdkEvent].unsubscribeAll();
      return { remove: () => undefined };
    }
    const callback = typeof fn === 'function' ? fn : () => undefined;
    const sub = sdkWatchers[sdkEvent].subscribe(callback);
    return { remove: sub.unsubscribe };
  };

  const apiExec: API['exec'] = async (command: APICommands, ...args: any[]) => {
    if (command === 'setBroadcastToken') {
      if (isEmbed) {
        return {
          error: window.deps.translateString(
            'core.error.unavailableForEmbeds',
            'Command unavailable for embeds',
          ),
        };
      }
      const broadcastData = getAppData()?.broadcast;
      if (!broadcastData) {
        return {
          error: window.deps.translateString('core.error.unavailable', 'Command unavailable'),
        };
      }
      const token = args[0];
      if (typeof token !== 'string') {
        return { error: window.deps.translateString('core.error.invalidToken', 'Invalid token!') };
      }
      setAppData({
        broadcast: {
          ...broadcastData,
          userToken: token,
        },
      });
      return {
        output: window.deps.translateString(
          'core.broadcast.successSetToken',
          'Broadcast user token set successfully',
        ),
      };
    }
    if (command === 'showVersion') {
      const output = getVersion();
      return { output };
    }
    return { error: window.deps.translateString('core.error.invalidCommand', 'Invalid command!') };
  };

  const apiDestroy = async () => {
    getAllEditors().forEach((editor) => editor?.destroy());
    eventsManager.removeEventListeners();
    Object.values(stores).forEach((store) => store?.unsubscribeAll?.());
    Object.values(sdkWatchers).forEach((watcher) => watcher?.unsubscribeAll?.());
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
    onChange: (fn) => callSync(() => apiWatch('code', fn)),
    watch: (sdkEvent, fn) => callSync(() => apiWatch(sdkEvent as any, fn as any)),
    exec: (command, ...args) => call(() => apiExec(command, ...args)),
    destroy: () => call(() => apiDestroy()),
  };
};

const initApp = async (config: Partial<Config>, baseUrl: string) => {
  window.deps = {
    showMode,
    translateString: translateStringMock,
    languages,
    processors,
  };
  await initializePlayground({ config, baseUrl }, async () => {
    basicHandlers();
    await loadToolsPane();
    await extraHandlers();
  });
  return createApi();
};

const initEmbed = async (config: Partial<Config>, baseUrl: string) => {
  window.deps = {
    showMode,
    translateString: translateStringMock,
    languages,
    processors,
  };
  await initializePlayground({ config, baseUrl, isEmbed: true }, async () => {
    basicHandlers();
    if (config.mode !== 'lite') {
      await loadToolsPane();
    }
  });
  return createApi();
};

const initHeadless = async (config: Partial<Config>, baseUrl: string) => {
  window.deps = {
    showMode: () => undefined,
    translateString: translateStringMock,
    languages,
    processors,
  };
  await initializePlayground({ config, baseUrl, isEmbed: true, isHeadless: true }, () => {
    notifications = {
      info: () => undefined,
      success: () => undefined,
      warning: () => undefined,
      error: () => undefined,
      confirm: () => undefined,
    };
    modal = { show: () => undefined, close: () => undefined };
    typeLoader = { load: async () => [] };
    handleConsole();
    handleTestResults();
  });
  return createApi();
};

export { initApp, initEmbed, initHeadless };
