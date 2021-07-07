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
} from './languages';
import { createStorage } from './storage';
import {
  CodeEditor,
  ContentPen,
  CssPresetId,
  EditorId,
  EditorLanguages,
  EditorOptions,
  Editors,
  GithubScope,
  Language,
  Pen,
  ShareData,
  Template,
  ToolList,
  User,
} from './models';
import { getFormatter } from './formatter';
import { createNotifications } from './notifications';
import { createModal } from './modal';
import { resultTemplate, resourcesScreen, savePromptScreen, openScreen } from './html';
import { exportPen } from './export';
import { createEventsManager } from './events';
import { getStarterTemplates } from './templates';
import { defaultConfig, getConfig, setConfig, upgradeAndValidate } from './config';
import { createToolsPane, createConsole, createCompiledCodeViewer } from './toolspane';
import { importCode } from './import';
import { compress, copyToClipboard, debounce } from './utils';
import { getCompiler } from './compiler';
import { createTypeLoader } from './types';
import { createResultPage } from './result';
import * as UI from './UI';
import { createAuthService, shareService } from './services';
import { deploy, deployedConfirmation, getUserPublicRepos } from './deploy';

export const app = async (config: Readonly<Pen>, baseUrl: string) => {
  setConfig(config);

  const storage = createStorage();
  const templates = createStorage('__localpen_templates__');
  const formatter = getFormatter(getConfig(), baseUrl);
  let editors: Editors;
  let penId: string;
  let editorLanguages: EditorLanguages;
  const notifications = createNotifications();
  const modal = createModal();
  const eventsManager = createEventsManager();
  let isSaved = true;
  let changingContent = false;
  let toolsPane: any;
  let lastCompiled: { [key in EditorId]: string };
  let consoleInputCodeCompletion: any;
  let starterTemplates: Template[];
  let authService: ReturnType<typeof createAuthService> | undefined;

  const resultPage = {
    url: 'https://result.localpen.io/v1/result',
    origin: 'https://result.localpen.io',
  };
  const split = UI.createSplitPanes();

  function createIframe(container: HTMLElement, result?: string) {
    return new Promise((resolve) => {
      if (!container) return;

      const iframe = document.createElement('iframe');
      iframe.name = 'result';
      iframe.setAttribute('allow', 'camera; geolocation; microphone');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute(
        'sandbox',
        'allow-same-origin allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts',
      );

      const { mode } = getConfig();
      if (mode !== 'codeblock' && mode !== 'editor') {
        iframe.src = resultPage.url;
      }

      let loaded = false;
      eventsManager.addEventListener(iframe, 'load', () => {
        if (!result || loaded) {
          resolve('loaded');
          return; // prevent infinite loop
        }

        iframe.contentWindow?.postMessage({ result }, resultPage.origin);
        loaded = true;
        resolve('loaded');
      });

      container.innerHTML = '';
      container.appendChild(iframe);
    });
  }

  const compiler = getCompiler(getConfig(), baseUrl);

  const typeLoader = createTypeLoader();
  const loadModuleTypes = async (editors: Editors, config: Pen) => {
    if (
      editors.script &&
      ['typescript', 'tsx', 'assemblyscript', 'stencil'].includes(editors.script.getLanguage()) &&
      typeof editors.script.addTypes === 'function'
    ) {
      const libs = await typeLoader.load(editors.script.getValue(), config.types);
      libs.forEach((lib) => editors.script.addTypes?.(lib));
    }
  };

  const getEditorLanguage = (editorId: EditorId = 'markup') => editorLanguages[editorId];
  const getEditorLanguages = () => Object.values(editorLanguages);
  const getActiveEditor = () => editors[getConfig().activeEditor || 'markup'];
  const setActiveEditor = async (config: Pen) => showEditor(config.activeEditor);

  const setEditorTitle = (editorId: EditorId, title: string) => {
    const editorTitle = document.querySelector(`#${editorId}-selector span`);
    if (!editorTitle) return;
    editorTitle.innerHTML =
      languages.find((language) => language.name === getLanguageByAlias(title))?.title || '';
  };

  const createCopyButtons = (editors: Editors) => {
    const editorIds: EditorId[] = ['markup', 'style', 'script'];
    editorIds.forEach((editorId) => {
      const copyButton = document.createElement('button');
      copyButton.innerHTML = 'copy';
      copyButton.classList.add('copy-button');
      document.getElementById(editorId)?.appendChild(copyButton);
      eventsManager.addEventListener(copyButton, 'click', () => {
        if (copyToClipboard(editors[editorId].getValue())) {
          copyButton.innerHTML = 'copied';
          setTimeout(() => {
            copyButton.innerHTML = 'copy';
          }, 2000);
        }
      });
    });
  };

  const createEditors = async (config: Pen) => {
    const baseOptions = {
      baseUrl,
      mode: config.mode,
      readonly: config.readonly,
      editor: config.editor,
      editorType: 'code' as EditorOptions['editorType'],
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
      editors[editorId].registerFormatter(await formatter.getFormatFn(editorLanguages[editorId]));
      registerRun(editorId, editors);
    });

    if (config.mode === 'codeblock') {
      createCopyButtons(editors);
    }

    return editors;
  };

  const updateEditors = async (editors: Editors, config: Pen) => {
    const editorIds = Object.keys(editors) as Array<keyof Editors>;
    for (const editorId of editorIds) {
      editors[editorId].setValue(config[editorId].content);
      const language = getLanguageByAlias(config[editorId].language);
      if (language) {
        await changeLanguage(language, true);
      }
    }
  };

  const showMode = (config: Pen) => {
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
    if (editorLanguages.script === 'javascript') {
      if (editors.script && typeof editors.script.addTypes === 'function') {
        consoleInputCodeCompletion = editors.script.addTypes({
          content: editors.script.getValue(),
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

  const changeLanguage = async (language: Language, isUpdate = false) => {
    const editorId = getLanguageEditorId(language);
    if (!editorId || !language || !languageIsEnabled(language, getConfig())) return;
    const editor = editors[editorId];
    editor.setLanguage(language);
    editorLanguages[editorId] = language;
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
      await run(editors);
    }
    addConsoleInputCodeCompletion();
    loadModuleTypes(editors, getConfig());
  };

  // Ctrl/Cmd + Enter triggers run
  const registerRun = (editorId: EditorId, editors: Editors) => {
    const editor = editors[editorId];
    editor.addKeyBinding('run', editor.keyCodes.CtrlEnter, async () => {
      await run(editors);
    });
  };

  const updateCompiledCode = (fromCompiler = true) => {
    const scriptType =
      fromCompiler && getLanguageCompiler(editors.script.getLanguage())?.scriptType;
    const compiledLanguages: { [key in EditorId]: Language } = {
      markup: getEditorLanguage('markup') === 'mdx' ? 'javascript' : 'html',
      style: 'css',
      script: scriptType ? editors.script.getLanguage() : 'javascript',
    };
    if (toolsPane && toolsPane.compiled && lastCompiled) {
      Object.keys(lastCompiled).forEach((editorId) => {
        if (editorId !== getConfig().activeEditor) return;
        let compiledCode = lastCompiled[editorId];
        if (editorId === 'script' && editors.script.getLanguage() === 'php') {
          compiledCode = phpHelper({ code: compiledCode }) || '<?php\n';
        }
        toolsPane.compiled.update(compiledLanguages[editorId], compiledCode);
      });
    }
  };

  const getResultPage = async (
    editors: Editors,
    forExport = false,
    template: string = resultTemplate,
    singleFile = true,
  ) => {
    const getCompiled = (content: string, language: Language) =>
      compiler.compile(content, language, getConfig());

    const compiledCode = {
      markup: {
        language: getEditorLanguage('markup'),
        content: await getCompiled(editors.markup?.getValue(), getEditorLanguage('markup')),
      },
      style: {
        language: getEditorLanguage('style'),
        content: await getCompiled(editors.style?.getValue(), getEditorLanguage('style')),
      },
      script: {
        language: getEditorLanguage('script'),
        content: await getCompiled(editors.script?.getValue(), getEditorLanguage('script')),
      },
    };

    // cache compiled code
    lastCompiled = {
      markup: compiledCode.markup.content,
      style: compiledCode.style.content,
      script: compiledCode.script.content,
    };

    return createResultPage(compiledCode, getConfig(), forExport, template, baseUrl, singleFile);
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

    const titleChanged = () => {
      if (penId) {
        if (title !== storage.getItem(penId)?.pen.title) return true;
        return false;
      }
      if (title !== defaultTitle) return true;
      return false;
    };
    if (titleChanged()) {
      setSavedStatus(false);
    }
    setConfig({ ...getConfig(), title });
    if (getConfig().autosave) {
      save(!penId, false);
    }
    setWindowTitle();
  };

  const setWindowTitle = () => {
    const title = getConfig().title;
    parent.document.title =
      (title && title !== 'Untitled Project' ? title + ' - ' : '') + 'LocalPen';
  };

  const run = async (editors: Editors) => {
    setLoading(true);
    const result = await getResultPage(editors);
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

  const save = (notify = false, setTitle = true) => {
    if (setTitle) {
      setProjectTitle(true);
    }

    if (!penId) {
      penId = storage.addItem(getConfig());
    } else {
      storage.updateItem(penId, getConfig());
    }
    if (notify) {
      notifications.success('Project locally saved to device!');
    }
    share(false).then(() => setSavedStatus(true));
  };

  const fork = () => {
    penId = '';
    loadConfig({ ...getConfig(), title: getConfig().title + ' (fork)' });
    save();
    notifications.success('Forked as a new project');
  };

  const getContentConfig = (config: Pen): ContentPen => ({
    title: config.title,
    activeEditor: config.activeEditor,
    languages: config.languages,
    markup: config.markup,
    style: config.style,
    script: config.script,
    stylesheets: config.stylesheets,
    scripts: config.scripts,
    cssPreset: config.cssPreset,
    imports: config.imports,
    types: config.types,
    processors: config.processors,
    version: config.version,
  });

  const share = async (copy = true): Promise<ShareData> => {
    if (copy) notifications.info('Generating public URL …');
    const content = getContentConfig(getConfig());
    const projectId = copy ? await shareService.shareProject(content) : '';
    const contentHash = projectId
      ? '#id/' + projectId
      : '#code/' + compress(JSON.stringify(content));
    const shareURL = location.origin + location.pathname + contentHash;
    updateUrl(shareURL, true);
    const projectTitle = content.title !== defaultConfig.title ? content.title + ' - ' : '';
    return {
      title: projectTitle + 'LocalPen',
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

  const loadConfig = async (newConfig: Pen, url?: string) => {
    changingContent = true;

    const content = getContentConfig({
      ...defaultConfig,
      ...upgradeAndValidate(newConfig),
    });
    setConfig({ ...getConfig(), ...content, autosave: false });

    // load title
    const projectTitle = UI.getProjectTitleElement();
    projectTitle.textContent = getConfig().title;
    setWindowTitle();

    // reset url params
    updateUrl(url || location.origin + location.pathname);

    // load config
    await bootstrap(true);

    changingContent = false;
  };

  const setSavedStatus = (status: boolean) => {
    isSaved = status;

    const projectTitle = UI.getProjectTitleElement();

    if (!isSaved) {
      projectTitle.classList.add('unsaved');
    } else {
      projectTitle.classList.remove('unsaved');
    }
  };

  const checkSavedStatus = (doNotCloseModal = false) => {
    if (isSaved) {
      return Promise.resolve('is saved');
    }
    return new Promise((resolve, reject) => {
      const div = document.createElement('div');
      div.innerHTML = savePromptScreen;
      modal.show(div.firstChild as HTMLElement, { size: 'small' });
      eventsManager.addEventListener(UI.getModalSaveButton(), 'click', () => {
        save(true);
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
        reject('cancel');
      });
    });
  };

  const checkSavedAndExecute = (fn: () => void) => async () => {
    try {
      await checkSavedStatus(true);
      fn();
    } catch (error) {
      // cancelled
    }
  };

  const configureEmmet = (config: Pen) => {
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
                notifications.success('Logged in as: ' + user.displayName);
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

  const attachEventListeners = (editors: Editors) => {
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
      const contentChanged = async (loading: boolean) => {
        updateConfig();
        setSavedStatus(false);
        addConsoleInputCodeCompletion();

        if (getConfig().autoupdate && !loading) {
          await run(editors);
        }

        if (getConfig().autosave) {
          save();
        }

        loadModuleTypes(editors, getConfig());
      };

      const debouncecontentChanged = debounce(async () => {
        await contentChanged(changingContent);
      }, getConfig().delay ?? 500);

      editors.markup.onContentChanged(debouncecontentChanged);
      editors.style.onContentChanged(debouncecontentChanged);
      editors.script.onContentChanged(debouncecontentChanged);
    };

    const handleHotKeys = () => {
      const ctrl = (e: KeyboardEvent) => (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey);
      const hotKeys = async (e: KeyboardEvent) => {
        if (!e) return;

        // Cmd + Shift + S forks the project (save as...)
        if (ctrl(e) && e.shiftKey && e.keyCode === 83) {
          e.preventDefault();
          fork();
          return;
        }

        // Cmd + S saves the project
        if (ctrl(e) && e.keyCode === 83) {
          e.preventDefault();
          save(true);
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
        await run(editors);
      };
      eventsManager.addEventListener(UI.getRunButton(), 'click', handleRun);
      eventsManager.addEventListener(UI.getCodeRunButton(), 'click', handleRun);
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
            await run(editors);
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

          setConfig({ ...getConfig(), [configKey]: toggle.checked });

          if (configKey === 'autoupdate' && getConfig()[configKey]) {
            await run(editors);
          }
          if (configKey === 'emmet') {
            configureEmmet(getConfig());
          }
          if (configKey === 'autoprefixer') {
            await run(editors);
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
            await run(editors);
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

        modal.show(templatesContainer);
      };
      eventsManager.addEventListener(
        UI.getNewLink(),
        'click',
        checkSavedAndExecute(createTemplatesUI),
        false,
      );
    };

    const handleSave = () => {
      eventsManager.addEventListener(UI.getSaveLink(), 'click', (event) => {
        (event as Event).preventDefault();
        save(true);
      });
    };

    const handleFork = () => {
      eventsManager.addEventListener(UI.getForkLink(), 'click', (event) => {
        (event as Event).preventDefault();
        fork();
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

        const deleteAllButton = UI.getDeleteAllButton(listContainer);
        eventsManager.addEventListener(
          deleteAllButton,
          'click',
          () => {
            storage.clear();
            penId = '';
            if (list) list.remove();
            if (noDataMessage) listContainer.appendChild(noDataMessage);
            deleteAllButton.classList.add('hidden');
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
        } else {
          noDataMessage?.remove();
        }

        modal.show(listContainer);
      };

      eventsManager.addEventListener(
        UI.getOpenLink(),
        'click',
        checkSavedAndExecute(createList),
        false,
      );
    };

    const handleImport = () => {
      const createImportUI = () => {
        const importContainer = UI.createImportContainer(eventsManager);

        const importForm = UI.getUrlImportForm(importContainer);
        const importButton = UI.getUrlImportButton(importContainer);
        eventsManager.addEventListener(importForm, 'submit', async (e) => {
          e.preventDefault();
          importButton.innerHTML = 'Loading...';
          importButton.disabled = true;
          const url = UI.getUrlImportInput(importContainer).value;
          const imported = await importCode(url, {}, defaultConfig);
          if (imported && Object.keys(imported).length > 0) {
            await loadConfig(
              {
                ...defaultConfig,
                ...imported,
              },
              location.origin + location.pathname + '#' + url,
            );
          } else {
            notifications.error('failed to load URL');
          }
          modal.close();
        });

        const importJsonUrlForm = UI.getImportJsonUrlForm(importContainer);
        const importJsonUrlButton = UI.getImportJsonUrlButton(importContainer);
        eventsManager.addEventListener(importJsonUrlForm, 'submit', async (e) => {
          e.preventDefault();
          importJsonUrlButton.innerHTML = 'Loading...';
          importJsonUrlButton.disabled = true;
          const url = UI.getImportJsonUrlInput(importContainer).value;
          const fileConfig = await fetch(url)
            .then((res) => res.json())
            .catch(() => {
              modal.close();
              notifications.error('failed to load URL');
              return;
            });
          if (fileConfig) {
            await loadConfig(fileConfig, location.origin + location.pathname + '?config=' + url);
          }
          modal.close();
        });

        const fileInput = UI.getImportFileInput(importContainer);

        eventsManager.addEventListener(fileInput, 'change', () => {
          if (fileInput.files?.length === 0) return;

          const file = (fileInput.files as FileList)[0];

          const allowedTypes = ['application/json', 'text/plain'];
          if (allowedTypes.indexOf(file.type) === -1) {
            modal.close();
            notifications.error('Error : Incorrect file type');
            return;
          }

          // Max 2 MB allowed
          const maxSizeAllowed = 2 * 1024 * 1024;
          if (file.size > maxSizeAllowed) {
            modal.close();
            notifications.error('Error : Exceeded size 2MB');
            return;
          }

          const reader = new FileReader();

          eventsManager.addEventListener(reader, 'load', async (event: any) => {
            const text = (event.target?.result as string) || '';
            try {
              await loadConfig(JSON.parse(text));
            } catch (error) {
              notifications.error('Invalid configuration file');
            }

            modal.close();
          });

          eventsManager.addEventListener(reader, 'error', () => {
            modal.close();
            notifications.error('Error : Failed to read file');
          });

          reader.readAsText(file);
        });

        modal.show(importContainer);
        UI.getUrlImportInput(importContainer).focus();
      };

      eventsManager.addEventListener(
        UI.getImportLink(),
        'click',
        checkSavedAndExecute(createImportUI),
        false,
      );
    };

    const handleExport = () => {
      eventsManager.addEventListener(
        UI.getExportJSONLink(),
        'click',
        (event: Event) => {
          event.preventDefault();
          updateConfig();
          exportPen(getConfig(), baseUrl, 'json');
        },
        false,
      );

      eventsManager.addEventListener(
        UI.getExportResultLink(),
        'click',
        async (event: Event) => {
          event.preventDefault();
          updateConfig();
          exportPen(getConfig(), baseUrl, 'html', await getResultPage(editors, true));
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
          const html = await getResultPage(editors, true);
          exportPen(getConfig(), baseUrl, 'src', { JSZip, html });
        },
        false,
      );

      eventsManager.addEventListener(
        UI.getExportCodepenLink(),
        'click',
        () => {
          updateConfig();
          exportPen(getConfig(), baseUrl, 'codepen');
        },
        false,
      );

      eventsManager.addEventListener(
        UI.getExportJsfiddleLink(),
        'click',
        () => {
          updateConfig();
          exportPen(getConfig(), baseUrl, 'jsfiddle');
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
          exportPen(getConfig(), baseUrl, 'githubGist', { user });
        },
        false,
      );
    };

    const handleShare = () => {
      eventsManager.addEventListener(
        UI.getShareLink(),
        'click',
        async (event: Event) => {
          event.preventDefault();
          const shareData = await share();
          const shareContainer = UI.createShareContainer(
            shareData,
            baseUrl,
            eventsManager,
            notifications,
          );
          modal.show(shareContainer, { size: 'small', isAsync: true });
        },
        false,
      );
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

          const resultHtml = await getResultPage(editors, forExport, resultTemplate, singleFile);
          const deployResult = await deploy({
            user,
            repo,
            config: getContentConfig(getConfig()),
            content: {
              resultPage: resultHtml,
              style: lastCompiled.style,
              script: lastCompiled.script,
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
        import(baseUrl + 'vendor/autocomplete.js/autoComplete.min.js').then(async () => {
          autoComplete = (globalThis as any).autoComplete;

          if (!user) return;
          const publicRepos = await getUserPublicRepos(user);

          eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
            existingRepoNameInput.focus();
          });

          const autoCompleteJS = new autoComplete({
            selector: '#' + existingRepoNameInput.id,
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
          setSavedStatus(false);
          modal.close();
          await run(editors);
        });
      };
      eventsManager.addEventListener(
        UI.getExternalResourcesLink(),
        'click',
        createExrenalResourcesUI,
        false,
      );
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
        if (
          event.data.type === 'compiled' &&
          event.data.payload &&
          editors.script.getLanguage() === event.data.payload.language
        ) {
          lastCompiled.script = event.data.payload.content;
          updateCompiledCode(false);
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
    handleProcessors();
    handleSettings();
    handleSettingsMenu();
    handleExternalResources();
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

  const loadSettings = (config: Pen) => {
    const autoupdateToggle = UI.getAutoupdateToggle();
    autoupdateToggle.checked = config.autoupdate;

    const autosaveToggle = UI.getAutosaveToggle();
    autosaveToggle.checked = config.autosave;

    const processorToggles = UI.getProcessorToggles();
    processorToggles.forEach((toggle) => {
      const plugin = toggle.dataset.plugin as PluginName;
      if (!plugin) return;
      toggle.checked = config.processors.postcss[plugin];
    });

    const emmetToggle = UI.getEmmetToggle();
    emmetToggle.checked = config.emmet;

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
    await createIframe(UI.getResultElement());

    if (!reload) {
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
      attachEventListeners(editors);
    } else {
      await updateEditors(editors, getConfig());
    }

    phpHelper({ editor: editors.script });
    setLoading(true);

    await setActiveEditor(getConfig());
    loadSettings(getConfig());
    configureEmmet(getConfig());
    showMode(getConfig());
    setSavedStatus(true);
    setTimeout(() => getActiveEditor().focus());
    await toolsPane?.load();
    updateCompiledCode();
    loadModuleTypes(editors, getConfig());

    compiler.load(Object.values(editorLanguages), getConfig()).then(async () => {
      await run(editors);
    });
    formatter.load(getEditorLanguages());
    initializeAuth();
  }
  await bootstrap();

  return {
    run: async () => {
      await run(editors);
    },
    save: () => save(),
    getData: () => JSON.parse(JSON.stringify(getConfig())),
  };
};
