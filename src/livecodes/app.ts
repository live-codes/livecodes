import { createEditor } from './editor';
import {
  languages,
  getLanguageEditorId,
  getLanguageCompiler,
  createLanguageMenus,
  languageIsEnabled,
  pluginSpecs,
  PluginName,
  processorIsEnabled,
  getLanguageByAlias,
  mapLanguage,
} from './languages';
import { createStorage, Item } from './storage';
import {
  API,
  Cache,
  Code,
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
  ToolList,
  User,
  ContentConfig,
  Theme,
  UserConfig,
} from './models';
import { getFormatter } from './formatter';
import { createNotifications } from './notifications';
import { createModal } from './modal';
import {
  resultTemplate,
  customSettingsScreen,
  resourcesScreen,
  savePromptScreen,
  openScreen,
  restorePromptScreen,
} from './html';
import { downloadFile, exportConfig } from './export';
import { createEventsManager } from './events';
import { getStarterTemplates } from './templates';
import {
  buildConfig,
  defaultConfig,
  getConfig,
  getContentConfig,
  getUserConfig,
  setConfig,
  upgradeAndValidate,
} from './config';
import { createToolsPane, createConsole, createCompiledCodeViewer } from './toolspane';
import { importCode } from './import';
import {
  compress,
  copyToClipboard,
  debounce,
  fetchWithHandler,
  getDate,
  stringify,
  stringToValidJson,
} from './utils';
import { getCompiler, getAllCompilers } from './compiler';
import { createTypeLoader } from './types';
import { createResultPage } from './result';
import * as UI from './UI';
import { createAuthService, sandboxService, shareService } from './services';
import { deploy, deployedConfirmation, getUserPublicRepos } from './deploy';
import { cacheIsValid, getCache, getCachedCode, setCache, updateCache } from './cache';
import { configureEmbed } from './embed';
import { autoCompleteUrl } from './vendors';

export const app = async (appConfig: Readonly<Config>, baseUrl: string): Promise<API> => {
  setConfig(appConfig);

  const storage = createStorage();
  const templates = createStorage('__livecodes_templates__');
  const userConfigStore = createStorage('__livecodes_user_config__');
  const projectRestore = createStorage('__livecodes_project_restore__');
  const formatter = getFormatter(getConfig(), baseUrl);
  const notifications = createNotifications();
  const modal = createModal();
  const eventsManager = createEventsManager();
  let authService: ReturnType<typeof createAuthService> | undefined;
  const split = UI.createSplitPanes();
  let penId: string;
  let editors: Editors;
  let editorLanguages: EditorLanguages | undefined;
  let resultLanguages: Language[] = [];
  let isSaved = true;
  let changingContent = false;
  let toolsPane: any;
  let consoleInputCodeCompletion: any;
  let starterTemplates: Template[];
  const screens: Screen[] = [];

  const getEditorLanguage = (editorId: EditorId = 'markup') => editorLanguages?.[editorId];
  const getEditorLanguages = () => Object.values(editorLanguages || {});
  const getActiveEditor = () => editors[getConfig().activeEditor || 'markup'];
  const setActiveEditor = async (config: Config) => showEditor(config.activeEditor);

  const createIframe = (container: HTMLElement, result?: string, service = sandboxService) =>
    new Promise((resolve, reject) => {
      if (!container) {
        reject('Result container not found');
        return;
      }
      let iframe: HTMLIFrameElement;

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
        iframe = document.querySelector('iframe#result-frame') as HTMLIFrameElement;
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
        iframe = document.querySelector('iframe#result-frame') as HTMLIFrameElement;
        iframe.contentWindow?.postMessage({ result }, service.getOrigin());
        resolve('loaded');
      } else {
        // full page reload
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

        const { mode } = getConfig();
        if (mode !== 'codeblock' && mode !== 'editor') {
          iframe.src = service.getResultUrl();
        }

        container.innerHTML = '';
        container.appendChild(iframe);

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
      }

      resultLanguages = getEditorLanguages();
    });

  const compiler = await getCompiler(getConfig(), baseUrl);

  const typeLoader = createTypeLoader();
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

  const createEditors = async (config: Config) => {
    const baseOptions = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editor: config.editor,
      editorType: 'code' as EditorOptions['editorType'],
      theme: config.theme,
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

    const editors = {
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

    return editors;
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

    const showToolbar = modeConfig[0] === '1';
    const showEditor = modeConfig[1] === '1';
    const showResult = modeConfig[2] === '1';

    toolbarElement.style.display = 'flex';
    editorsElement.style.display = 'flex';
    resultElement.style.display = 'flex';
    outputElement.style.display = 'block';
    gutterElement.style.display = 'block';
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
      split.destroy(true);
    }
    if (!showResult) {
      editorsElement.style.flexBasis = '100%';
      outputElement.style.display = 'none';
      resultElement.style.display = 'none';
      codeRunButton.style.display = 'none';
      split.destroy(true);
    }
    if (config.mode === 'editor' || config.mode === 'codeblock') {
      runButton.style.visibility = 'hidden';
      codeRunButton.style.visibility = 'hidden';
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
    editors[editorId].focus();
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
          content: getConfig().script.content + '\nexport {}',
          filename: 'script.js',
        });
      }
    }
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

  const applyLanguageConfigs = (language: Language) => {
    const editorId = getLanguageEditorId(language);
    if (!editorId || !language || !languageIsEnabled(language, getConfig())) return;
    // apply config
  };

  const changeLanguage = async (language: Language, value?: string, isUpdate = false) => {
    const editorId = getLanguageEditorId(language);
    if (!editorId || !language || !languageIsEnabled(language, getConfig())) return;
    const editor = editors[editorId];
    editor.setLanguage(language, value ?? (getConfig()[editorId].content || ''));
    if (editorLanguages) {
      editorLanguages[editorId] = language;
    }
    setEditorTitle(editorId, language);
    showEditor(editorId, isUpdate);
    phpHelper({ editor: editors.script });
    setTimeout(() => editor.focus());
    await compiler.load([language], getConfig());
    editor.registerFormatter(await formatter.getFormatFn(language));
    if (!isUpdate) {
      setConfig({
        ...getConfig(),
        activeEditor: editorId,
      });
      await run();
    }
    setSavedStatus();
    addConsoleInputCodeCompletion();
    loadModuleTypes(editors, getConfig());
    applyLanguageConfigs(language);
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

    const compiledMarkup = await compiler.compile(markupContent, markupLanguage, config);
    const [compiledStyle, compiledScript] = await Promise.all([
      compiler.compile(styleContent, styleLanguage, config, { html: compiledMarkup }),
      compiler.compile(scriptContent, scriptLanguage, config),
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
        compiled: compiledScript,
      },
    };

    const result = createResultPage(compiledCode, config, forExport, template, baseUrl, singleFile);

    const styleOnlyUpdate = sourceEditor === 'style';

    setCache({
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
    setSavedStatus();
    if (getConfig().autosave) {
      save(!penId, false);
    }
    setWindowTitle();
  };

  const setWindowTitle = () => {
    const title = getConfig().title;
    parent.document.title =
      (title && title !== 'Untitled Project' ? title + ' - ' : '') + 'LiveCodes';
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

    if (!penId) {
      penId = storage.addItem(getConfig());
    } else {
      storage.updateItem(penId, getConfig());
    }
    setSavedStatus();

    if (notify) {
      notifications.success('Project locally saved to device!');
    }
    await share();
  };

  const fork = async () => {
    penId = '';
    loadConfig({ ...getConfig(), title: getConfig().title + ' (fork)' });
    await save();
    notifications.success('Forked as a new project');
  };

  const share = async (shortUrl = false, contentOnly = true): Promise<ShareData> => {
    const content = contentOnly ? getContentConfig(getConfig()) : getConfig();
    const contentHash = shortUrl
      ? '#id/' + (await shareService.shareProject(content))
      : '#code/' + compress(JSON.stringify(content));
    const url = (location.origin + location.pathname).split('/').slice(0, -1).join('/') + '/';
    const shareURL = url + contentHash;
    updateUrl(shareURL, true);
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

  const loadConfig = async (newConfig: Config | ContentConfig, url?: string) => {
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
    userConfigStore.clear();
    userConfigStore.addItem(userConfig as Config);
  };

  const loadUserConfig = () => {
    const userConfig = userConfigStore.getAllData()?.pop()?.pen;
    if (!userConfig) {
      setUserConfig(getUserConfig(getConfig()));
      return;
    }
    setConfig({
      ...getConfig(),
      ...userConfig,
    });
  };

  const setSavedStatus = () => {
    updateConfig();
    const savedConfig = storage.getItem(penId)?.pen;
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
    if (isSaved) {
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
    projectRestore.clear();
    if (reset || !getConfig().enableRestore) return;
    projectRestore.addItem(getContentConfig(getConfig()));
  };

  const checkRestoreStatus = () => {
    if (!getConfig().enableRestore) {
      return Promise.resolve('restore disabled');
    }
    const unsavedItem = projectRestore.getAllData().pop();
    const unsavedProject = unsavedItem?.pen;
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
        setSavedStatus();
        setRestoreConfig(!disableRestoreCheckbox.checked);
        modal.close();
        resolve('restore');
      });
      eventsManager.addEventListener(UI.getModalSavePreviousButton(), 'click', () => {
        storage.addItem(unsavedProject);
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

  const configureEmmet = (config: Config) => {
    const editor = editors.markup;
    if (typeof editor?.configureEmmet === 'function') {
      editor.configureEmmet(config.emmet);
    } else {
      const emmetSetting = document.querySelector('#settings-menu #emmet')?.closest('li');
      if (emmetSetting) {
        emmetSetting.style.display = 'none';
      }
    }
  };

  const getTemplates = async (): Promise<Template[]> => {
    if (starterTemplates) {
      return starterTemplates;
    }
    starterTemplates = await getStarterTemplates(getConfig(), baseUrl);
    return starterTemplates;
  };

  /** Lazy load authentication */
  const initializeAuth = async () => {
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

  const registerScreen = (screen: Screen['screen'], fn: Screen['show']) => {
    const registered = screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase());
    if (registered) {
      registered.show = fn;
    } else {
      screens.push({ screen: screen.toLowerCase() as Screen['screen'], show: fn });
    }
  };

  const showScreen = async (screen: Screen['screen']) => {
    await screens.find((s) => s.screen.toLowerCase() === screen.toLowerCase())?.show();
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
    getAllEditors().forEach((editor) => editor?.setTheme(theme));
  };

  const attachEventListeners = () => {
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
      const resizeEditors = () => {
        Object.values(editors).forEach((editor: CodeEditor) => {
          setTimeout(() => {
            if (editor.layout) {
              editor.layout(); // resize monaco editor
            }
          });
        });
      };
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
      eventsManager.addEventListener(UI.getResultButton(), 'click', () =>
        split.show('output', true),
      );
    };

    const handleProcessors = () => {
      const styleMenu = UI.getstyleMenu();
      const pluginList = pluginSpecs.map((plugin) => ({ name: plugin.name, title: plugin.title }));
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
            configureEmmet(getConfig());
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

    const handleSettingsMenu = () => {
      // This fixes the behaviour where :
      // clicking outside the settings menu but inside settings menu container,
      // hides the settings menu but not the container
      // on small screens the conatiner covers most of the screen
      // which gives the effect of a non-responsive app

      const menuScroller = UI.getSettingsMenuScroller();
      const settingsButton = UI.getSettingsButton();
      if (!menuScroller || !settingsButton) return;

      eventsManager.addEventListener(menuScroller, 'mousedown', (event) => {
        if (event.target === menuScroller) {
          menuScroller.classList.add('hidden');
        }
      });
      eventsManager.addEventListener(settingsButton, 'mousedown', () => {
        menuScroller.classList.remove('hidden');
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
      const createTemplatesUI = () => {
        const templatesContainer = UI.createTemplatesContainer(eventsManager);
        const noDataMessage = templatesContainer.querySelector('.no-data');
        const starterTemplatesList = UI.getStarterTemplatesList(templatesContainer);
        const loadingText = starterTemplatesList?.firstElementChild;
        getTemplates()
          .then((starterTemplates) => {
            loadingText?.remove();

            starterTemplates.forEach((template) => {
              const link = UI.createStarterTemplateLink(template, starterTemplatesList, baseUrl);
              eventsManager.addEventListener(
                link,
                'click',
                (event) => {
                  event.preventDefault();
                  const { title, thumbnail, ...templateConfig } = template;
                  penId = '';
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

        const userTemplatesScreen = UI.getUserTemplatesScreen(templatesContainer);
        const userTemplates = templates.getList();

        if (userTemplates.length > 0) {
          userTemplatesScreen.innerHTML = '';
        }
        const list = document.createElement('ul') as HTMLElement;
        list.classList.add('open-list');
        userTemplatesScreen.appendChild(list);

        userTemplates.forEach((item) => {
          const li = document.createElement('li');
          list.appendChild(li);

          const link = document.createElement('a');
          link.href = '#';
          link.dataset.id = item.id;
          link.classList.add('open-project-link');
          link.innerHTML = `
            <div class="open-title">${item.title}</div>
            <div class="modified-date"><span>Last modified: </span>${new Date(
              item.lastModified,
            ).toLocaleString()}</div>
          `;
          li.appendChild(link);
          eventsManager.addEventListener(
            link,
            'click',
            async (event) => {
              event.preventDefault();
              const itemId = (link as HTMLElement).dataset.id || '';
              const template = templates.getItem(itemId)?.pen;
              if (template) {
                await loadConfig({
                  ...template,
                  title: defaultConfig.title,
                });
                penId = '';
              }
              modal.close();
            },
            false,
          );

          const deleteButton = document.createElement('button');
          deleteButton.classList.add('delete-button');
          li.appendChild(deleteButton);
          eventsManager.addEventListener(
            deleteButton,
            'click',
            () => {
              templates.deleteItem(item.id);
              li.classList.add('hidden');
              setTimeout(() => {
                li.style.display = 'none';
                if (templates.getList().length === 0 && noDataMessage) {
                  list.remove();
                  userTemplatesScreen.appendChild(noDataMessage);
                }
              }, 500);
            },
            false,
          );
        });

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
      eventsManager.addEventListener(UI.getSaveAsTemplateLink(), 'click', (event) => {
        (event as Event).preventDefault();
        templates.addItem(getConfig());
        notifications.success('Saved as a new template');
      });
    };

    const handleOpen = () => {
      const createList = () => {
        const div = document.createElement('div');
        div.innerHTML = openScreen;
        const listContainer = div.firstChild as HTMLElement;
        const noDataMessage = listContainer.querySelector('.no-data');
        const list = document.createElement('ul') as HTMLElement;
        list.classList.add('open-list');

        const bulkImportButton = UI.getBulkImportButton(listContainer);
        const exportAllButton = UI.getExportAllButton(listContainer);
        const deleteAllButton = UI.getDeleteAllButton(listContainer);

        eventsManager.addEventListener(
          bulkImportButton,
          'click',
          () => {
            showScreen('import');
          },
          false,
        );

        eventsManager.addEventListener(
          exportAllButton,
          'click',
          () => {
            const data = storage.getAllData().map((item) => ({
              ...item,
              pen: getContentConfig(item.pen),
            }));
            const filename = 'livecodes_export_' + getDate();
            const content =
              'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
            downloadFile(filename, 'json', content);
          },
          false,
        );

        eventsManager.addEventListener(
          deleteAllButton,
          'click',
          () => {
            notifications.confirm('Delete all saved projects?', () => {
              storage.clear();
              penId = '';
              if (list) list.remove();
              if (noDataMessage) listContainer.appendChild(noDataMessage);
              deleteAllButton.classList.add('hidden');
              exportAllButton.classList.add('hidden');
            });
          },
          false,
        );

        listContainer.appendChild(list);
        const userPens = storage.getList();

        userPens.forEach((item) => {
          const { link, deleteButton } = UI.createOpenItem(item, list);

          eventsManager.addEventListener(
            link,
            'click',
            async (event) => {
              event.preventDefault();

              const loading = UI.createItemLoader(item);
              modal.show(loading, { size: 'small' });

              const itemId = (link as HTMLElement).dataset.id || '';
              const savedPen = storage.getItem(itemId)?.pen;
              if (savedPen) {
                await loadConfig(savedPen);
                penId = itemId;
              }
              modal.close();
              loading.remove();
            },
            false,
          );

          eventsManager.addEventListener(
            deleteButton,
            'click',
            () => {
              if (item.id === penId) {
                penId = '';
              }
              storage.deleteItem(item.id);
              const li = deleteButton.parentElement as HTMLElement;
              li.classList.add('hidden');
              setTimeout(() => {
                li.style.display = 'none';
                if (storage.getList().length === 0 && noDataMessage) {
                  list.remove();
                  listContainer.appendChild(noDataMessage);
                  deleteAllButton.classList.add('hidden');
                }
              }, 500);
            },
            false,
          );
        });

        if (userPens.length === 0) {
          list.remove();
          deleteAllButton.remove();
          exportAllButton.remove();
        } else {
          noDataMessage?.remove();
        }

        modal.show(listContainer, { isAsync: true });
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
          const imported = await importCode(url, {}, defaultConfig);
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

        const insertItems = (items: Item[]) => {
          if (Array.isArray(items) && items.every((item) => item.pen)) {
            storage.bulkInsert(items);
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
          loadFile<Item[]>(bulkFileInput)
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
        let user = await authService?.getUser();
        if (!user) {
          user = await login();
        }
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
        save(!penId, true);
      };
      const createProjectInfoUI = () =>
        UI.createProjectInfoUI(getConfig(), storage, modal, eventsManager, onSave);

      eventsManager.addEventListener(UI.getProjectInfoLink(), 'click', createProjectInfoUI, false);
      registerScreen('info', createProjectInfoUI);
    };

    const handleExternalResources = () => {
      const createExrenalResourcesUI = () => {
        const div = document.createElement('div');
        div.innerHTML = resourcesScreen;
        const resourcesContainer = div.firstChild as HTMLElement;
        modal.show(resourcesContainer);

        const externalResources = UI.getExternalResourcesTextareas();
        externalResources.forEach((textarea) => {
          const resourceContent = getConfig()[
            textarea.dataset.resource as 'stylesheets' | 'scripts'
          ];
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
          setSavedStatus();
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
          container: UI.getCustomSettingsEditor(),
          language: 'json' as Language,
          value: stringify(getConfig().customSettings, true),
          theme: config.theme,
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
            setConfig({
              ...getConfig(),
              customSettings,
            });
            setSavedStatus();
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

    handleTitleEdit();
    handleResize();
    handleIframeResize();
    handleSelectEditor();
    handlechangeLanguage();
    handleChangeContent();
    handleHotKeys();
    handleRunButton();
    handleResultButton();
    handleProcessors();
    handleSettings();
    handleSettingsMenu();
    handleProjectInfo();
    handleExternalResources();
    handleCustomSettings();
    handleLogin();
    handleLogout();
    handleNew();
    handleSave();
    handleFork();
    handleSaveAsTemplate();
    handleOpen();
    handleImport();
    handleExport();
    handleShare();
    handleDeploy();
    handleResultLoading();
    handleUnload();
  };

  const loadSettings = (config: Config) => {
    const autoupdateToggle = UI.getAutoupdateToggle();
    autoupdateToggle.checked = config.autoupdate;

    const autosaveToggle = UI.getAutosaveToggle();
    autosaveToggle.checked = config.autosave;

    const formatOnsaveToggle = UI.getFormatOnsaveToggle();
    formatOnsaveToggle.checked = config.formatOnsave;

    const processorToggles = UI.getProcessorToggles();
    processorToggles.forEach((toggle) => {
      const plugin = toggle.dataset.plugin as PluginName;
      if (!plugin) return;
      toggle.checked = config.processors.postcss[plugin];
    });

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

  async function bootstrap(reload = false) {
    configureEmbed(eventsManager, share);
    await createIframe(UI.getResultElement());

    if (!reload) {
      loadUserConfig();
      createLanguageMenus(
        getConfig(),
        baseUrl,
        eventsManager,
        showLanguageInfo,
        loadStarterTemplate,
      );
      editors = await createEditors(getConfig());

      const toolList: ToolList = [
        {
          name: 'console',
          factory: createConsole,
        },
        {
          name: 'compiled',
          factory: createCompiledCodeViewer,
        },
      ];
      toolsPane = createToolsPane(toolList, getConfig(), baseUrl, editors, eventsManager);
      attachEventListeners();
      setTheme(getConfig().theme);
    } else {
      await updateEditors(editors, getConfig());
    }
    phpHelper({ editor: editors.script });
    setLoading(true);
    await setActiveEditor(getConfig());
    loadSettings(getConfig());
    configureEmmet(getConfig());
    showMode(getConfig());
    setTimeout(() => getActiveEditor().focus());
    await toolsPane?.load();
    updateCompiledCode();
    loadModuleTypes(editors, getConfig());

    compiler.load(Object.values(editorLanguages || {}), getConfig()).then(async () => {
      await run();
    });
    formatter.load(getEditorLanguages());
    initializeAuth();
    if (!reload) {
      loadSelectedScreen();
    }
  }
  await bootstrap();
  checkRestoreStatus();

  return {
    run: async () => {
      await run();
    },
    format: async () => format(),
    getShareUrl: async (shortUrl = false) => (await share(shortUrl)).url,
    getConfig: (contentOnly = false): Config => {
      updateConfig();
      const config = contentOnly ? getContentConfig(getConfig()) : getConfig();
      return JSON.parse(JSON.stringify(config));
    },
    setConfig: async (newConfig: Config): Promise<Config> => {
      const newAppConfig = await buildConfig(newConfig, baseUrl);
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
  };
};
