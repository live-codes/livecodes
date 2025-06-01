import { changeLanguage } from 'i18next';
import { createSplitPanes } from '../UI';
import { createProcessorItem } from '../UI/create-language-menus';
import * as UI from '../UI/selectors';
import { getConfig, setConfig } from '../config';
import { customEvents, getEventsManager } from '../events';
import { processorIsEnabled, processors } from '../languages';
import type {
  AppData,
  Await,
  CodeEditor,
  Config,
  EditorId,
  Editors,
  EventsManager,
  Language,
  Processor,
  Screen,
  ToolsPane,
} from '../models';
import { getNotifications } from '../notifications';
import { createTypeLoader } from '../types';
import { copyToClipboard, ctrl, toDataUrl } from '../utils';
import { translateElement } from '../utils/translation';
import { fscreenUrl } from '../vendors';

interface basicHandlersType {
  setSplit: (newSplit: ReturnType<typeof createSplitPanes> | null) => void;
  setTypeLoader: (typeLoader: ReturnType<typeof createTypeLoader>) => void;
  setLayout: (layout: Config['layout']) => void;
  setAppData: (data: AppData) => void;
  setIframeScrollPosition: (x: number, y: number) => void;
  getActiveEditor: () => CodeEditor;
  getEditors: () => Editors;
  getToolsPane: () => ToolsPane | undefined;
  getSplit: () => ReturnType<typeof createSplitPanes> | null;
  showEditor: (editorId?: EditorId, isUpdate?: boolean) => void;
  showScreen: (screen: Screen['screen'], options?: any) => Promise<void>;
  i18n: Await<ReturnType<typeof import('../i18n').init>> | undefined;
  getEditorLanguage: (editorId?: EditorId) => Language | undefined;
  setProjectRecover: (reset?: boolean) => void;
  isEmbed: boolean;
  baseUrl: string;
  handleConsole: () => void;
  handleTestResults: () => void;
  handleExternalResources: () => void;
  handleChangeContent: () => void;
  handleIframeResize: () => void;
  handleResultLoading: () => void;
  format: (allEditors?: boolean) => Promise<void>;
  run: (editorId?: EditorId, runTests?: boolean) => Promise<void>;
  configureEditorTools: (language: Language) => boolean;
  reloadEditors: (config: Config) => Promise<void>;
  dispatchChangeEvent: (...args: unknown[]) => void;
}

// ************* Handlers **************
const handleLogoLink = (isEmbed: boolean, addEventListener: EventsManager['addEventListener']) => {
  if (isEmbed || getConfig().mode === 'result') return;
  const logoLink = UI.getLogoLink();
  addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    parent.postMessage({ args: 'home' }, location.origin);
  });
};

const handleResize = (
  addEventListener: EventsManager['addEventListener'],
  setLayout: basicHandlersType['setLayout'],
  editors: Editors,
) => {
  resizeEditors(editors)();
  setLayout(getConfig().layout);

  addEventListener(window, 'resize', () => setLayout(getConfig().layout), false);
  addEventListener(window, 'resize', resizeEditors(editors), false);
  addEventListener(window, customEvents.resizeEditor, resizeEditors(editors), false);
};

const resizeEditors = (editors: Editors) => () => {
  Object.values(editors).forEach((editor: CodeEditor) => {
    setTimeout(() => {
      if (editor.layout) {
        editor.layout(); // resize monaco editor
      }
    });
  });
};

const handleIframeScroll = (
  addEventListener: EventsManager['addEventListener'],
  setIframeScrollPosition: basicHandlersType['setIframeScrollPosition'],
) => {
  addEventListener(window, 'message', (event: any) => {
    const iframe = UI.getResultIFrameElement();
    if (!iframe || event.source !== iframe.contentWindow || event.data.type !== 'scroll') {
      return;
    }

    const position = event.data.position;
    setIframeScrollPosition(Number(position.x) || 0, Number(position.y) || 0);
  });
};

const handleSelectEditor = (
  addEventListener: EventsManager['addEventListener'],
  setAppData: basicHandlersType['setAppData'],
  showEditor: basicHandlersType['showEditor'],
  getEditorLanguage: basicHandlersType['getEditorLanguage'],
  setProjectRecover: basicHandlersType['setProjectRecover'],
) => {
  UI.getEditorTitles().forEach((title) => {
    addEventListener(
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

const handleChangeLanguage = (
  addEventListener: EventsManager['addEventListener'],
  setAppData: basicHandlersType['setAppData'],
) => {
  if (getConfig().allowLangChange) {
    UI.getLanguageMenuLinks().forEach((menuItem) => {
      addEventListener(
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

// ******* Button Handlers *********
const handleKeyboardShortcuts = (
  addEventListener: EventsManager['addEventListener'],
  isEmbed: boolean,
  showEditor: basicHandlersType['showEditor'],
  getActiveEditor: basicHandlersType['getActiveEditor'],
  toolsPane: ToolsPane | undefined = undefined,
  split: ReturnType<typeof createSplitPanes> | null = null,
) => {
  let lastkeys = '';

  const hotKeys = async (e: KeyboardEvent) => {
    // Ctrl + P opens the command palette
    const activeEditor = getActiveEditor();
    if (ctrl(e) && e.code === 'KeyP' && activeEditor.monaco) {
      e.preventDefault();
      activeEditor.monaco.trigger('anyString', 'editor.action.quickCommand');
      lastkeys = 'Ctrl + P';
      return;
    }

    // Ctrl + D prevents browser bookmark dialog
    if (ctrl(e) && e.code === 'KeyD') {
      e.preventDefault();
      lastkeys = 'Ctrl + D';
      return;
    }

    // Ctrl + Alt + C: toggle console
    if (ctrl(e) && e.altKey && e.code === 'KeyC') {
      e.preventDefault();
      lastkeys = 'Ctrl + Alt + C';
      UI.getConsoleButton()?.dispatchEvent(new Event('touchstart'));
      return;
    }

    // Ctrl + Alt + C, F: maximize console
    if (ctrl(e) && e.altKey && e.code === 'KeyF' && lastkeys === 'Ctrl + Alt + C') {
      e.preventDefault();
      lastkeys = 'Ctrl + Alt + C, F';
      UI.getConsoleButton()?.dispatchEvent(new Event('dblclick'));
      return;
    }

    // Ctrl + Alt + T runs tests
    if (ctrl(e) && e.altKey && e.code === 'KeyT') {
      e.preventDefault();
      UI.getRunTestsButton()?.click();
      lastkeys = 'Ctrl + Alt + T';
      return;
    }

    // Shift + Enter triggers run
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      UI.getRunButton()?.click();
      lastkeys = 'Shift + Enter';
      return;
    }

    // Ctrl + Alt + R toggles result page
    if (ctrl(e) && e.altKey && e.code === 'KeyR') {
      e.preventDefault();
      UI.getResultButton()?.click();
      lastkeys = 'Ctrl + Alt + R';
      return;
    }

    // Ctrl + Alt + Z toggles result zoom
    if (ctrl(e) && e.altKey && e.code === 'KeyZ') {
      e.preventDefault();
      UI.getZoomButton()?.click();
      lastkeys = 'Ctrl + Alt + Z';
      return;
    }

    // Ctrl + Alt + E focuses active editor
    if (ctrl(e) && e.altKey && e.code === 'KeyE') {
      e.preventDefault();
      getActiveEditor().focus();
      lastkeys = 'Ctrl + Alt + E';
      return;
    }

    // Esc closes dropdown menus
    // Esc + Esc moves focus out of editor
    // Esc + Esc + Esc moves focus to logo
    if (e.code === 'Escape') {
      document.querySelectorAll('.menu-scroller').forEach((el) => el.classList.add('hidden'));
      if (lastkeys === 'Esc') {
        e.preventDefault();
        if (
          (toolsPane?.getStatus() === 'open' || toolsPane?.getStatus() === 'full') &&
          toolsPane.getActiveTool() === 'console'
        ) {
          UI.getConsoleButton()?.focus();
        } else {
          UI.getFocusButton()?.focus();
        }
        lastkeys = 'Esc + Esc';
        return;
      }
      if (lastkeys === 'Esc + Esc') {
        e.preventDefault();
        UI.getLogoLink()?.focus();
        lastkeys = 'Esc + Esc + Esc';
        return;
      }
      lastkeys = 'Esc';
      return;
    }

    // Ctrl + Alt + (1-3) activates editor 1-3
    // Ctrl + Alt + (ArrowLeft/ArrowRight) activates previous/next editor
    const editorIds = (['markup', 'style', 'script'] as EditorId[]).filter(
      (id) => getConfig()[id].hideTitle !== true,
    );
    if (ctrl(e) && e.altKey && ['1', '2', '3', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      split?.show('code');
      const index = ['1', '2', '3'].includes(e.key)
        ? Number(e.key) - 1
        : e.key === 'ArrowLeft'
          ? editorIds.findIndex((id) => id === getConfig().activeEditor) - 1 || 0
          : e.key === 'ArrowRight'
            ? editorIds.findIndex((id) => id === getConfig().activeEditor) + 1 || 0
            : 0;
      const editorIndex =
        index === editorIds.length ? 0 : index === -1 ? editorIds.length - 1 : index;
      showEditor(editorIds[editorIndex] as EditorId);
      lastkeys = 'Ctrl + Alt + ' + e.key;
      return;
    }

    if (isEmbed) return;

    // Ctrl + Alt + N: new project
    if (ctrl(e) && e.altKey && e.code === 'KeyN') {
      e.preventDefault();
      UI.getNewLink()?.click();
      lastkeys = 'Ctrl + Alt + N';
      return;
    }

    // Ctrl + O: open project
    if (ctrl(e) && e.code === 'KeyO') {
      e.preventDefault();
      UI.getOpenLink()?.click();
      lastkeys = 'Ctrl + O';
      return;
    }

    // Ctrl + Alt + I: import
    if (ctrl(e) && e.altKey && e.code === 'KeyI') {
      e.preventDefault();
      UI.getImportLink()?.click();
      lastkeys = 'Ctrl + Alt + I';
      return;
    }

    // Ctrl + Alt + S: share
    if (ctrl(e) && e.altKey && e.code === 'KeyS') {
      e.preventDefault();
      UI.getShareLink()?.click();
      lastkeys = 'Ctrl + Alt + S';
      return;
    }

    // Ctrl + Shift + S forks the project (save as...)
    if (ctrl(e) && e.shiftKey && e.code === 'KeyS') {
      e.preventDefault();
      UI.getForkLink()?.click();
      lastkeys = 'Ctrl + Shift + S';
      return;
    }

    // Ctrl + S saves the project
    if (ctrl(e) && e.code === 'KeyS') {
      e.preventDefault();
      UI.getSaveLink()?.click();
      lastkeys = 'Ctrl + S';
      return;
    }

    // Ctrl + Alt + F toggles focus mode
    if (ctrl(e) && e.altKey && e.code === 'KeyF') {
      e.preventDefault();
      UI.getFocusButton()?.click();
      lastkeys = 'Ctrl + Alt + F';
      return;
    }

    if (!ctrl(e) && !e.altKey && !e.shiftKey) {
      lastkeys = e.key;
      return;
    }
  };

  addEventListener(window, 'keydown', hotKeys, true);
};

const handleRunButton = (
  addEventListener: EventsManager['addEventListener'],
  split: ReturnType<typeof createSplitPanes> | null,
  run: any,
) => {
  const handleRun = async () => {
    split?.show('output');
    await run();
  };
  addEventListener(UI.getRunButton(), 'click', handleRun);
};

const handleResultButton = (
  addEventListener: EventsManager['addEventListener'],
  split: ReturnType<typeof createSplitPanes> | null,
) => {
  addEventListener(UI.getResultButton(), 'click', () => split?.show('toggle', true));
};

const handleShareButton = (
  addEventListener: EventsManager['addEventListener'],
  showScreen: basicHandlersType['showScreen'],
) => {
  addEventListener(UI.getShareButton(), 'click', () => showScreen('share'));
};

const handleEditorTools = (
  addEventListener: EventsManager['addEventListener'],
  showScreen: basicHandlersType['showScreen'],
  getActiveEditor: basicHandlersType['getActiveEditor'],
  toolsPane: ToolsPane | undefined = undefined,
  configureEditorTools: basicHandlersType['configureEditorTools'],
  format: basicHandlersType['format'],
) => {
  if (!configureEditorTools(getActiveEditor().getLanguage())) return;
  const notifications = getNotifications();
  const originalMode = getConfig().mode;
  addEventListener(UI.getFocusButton(), 'click', () => {
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

  addEventListener(UI.getCopyButton(), 'click', () => {
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

  addEventListener(UI.getUndoButton(), 'click', () => {
    const activeEditor = getActiveEditor();
    activeEditor.undo();
    activeEditor.focus();
  });

  addEventListener(UI.getRedoButton(), 'click', () => {
    const activeEditor = getActiveEditor();
    activeEditor.redo();
    activeEditor.focus();
  });

  addEventListener(UI.getFormatButton(), 'click', async () => {
    await format(false);
  });

  addEventListener(UI.getCopyAsUrlButton(), 'click', () => {
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

  addEventListener(UI.getCodeToImageButton(), 'click', () => {
    showScreen('code-to-image');
  });

  addEventListener(UI.getEditorStatus(), 'click', () => {
    showScreen('editor-settings', { scrollToSelector: 'label[data-name="editorMode"]' });
  });

  addEventListener(UI.getExternalResourcesBtn(), 'click', () => {
    showScreen('resources');
  });

  addEventListener(UI.getProjectInfoBtn(), 'click', () => {
    showScreen('info');
  });

  addEventListener(UI.getCustomSettingsBtn(), 'click', () => {
    showScreen('custom-settings');
  });

  addEventListener(UI.getEditorSettingsBtn(), 'click', () => {
    showScreen('editor-settings');
  });
};

const handleProcessors = (
  addEventListener: EventsManager['addEventListener'],
  editors: Editors,
  run: basicHandlersType['run'],
  dispatchChangeEvent: basicHandlersType['dispatchChangeEvent'],
  reloadEditors: basicHandlersType['reloadEditors'],
) => {
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
    addEventListener(
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

const handleI18n = (
  addEventListener: EventsManager['addEventListener'],
  i18n: basicHandlersType['i18n'],
) => {
  if (!i18n) return;
  addEventListener(document.body, customEvents.i18n, (e) => {
    const elem = e.target as HTMLElement;
    i18n?.translate(elem);
  });
  translateElement(document.body);
};

const handleFullscreen = async (addEventListener: EventsManager['addEventListener']) => {
  const fullscreenButton = UI.getFullscreenButton();
  const buttonImg = fullscreenButton.querySelector('img');
  const fscreen = (await import(fscreenUrl)).default;
  if (!fscreen.fullscreenEnabled) {
    fullscreenButton.style.visibility = 'hidden';
    return;
  }

  addEventListener(fscreen, 'fullscreenchange', async () => {
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

  addEventListener(fullscreenButton, 'click', async () => {
    if (fscreen.fullscreenElement) {
      await fscreen.exitFullscreen();
      return;
    }
    await fscreen.requestFullscreen(document.body);
  });
};

const initBasicHandlers = ({
  isEmbed,
  setSplit,
  setLayout,
  baseUrl,
  setTypeLoader,
  setAppData,
  setIframeScrollPosition,
  showEditor,
  showScreen,
  getActiveEditor,
  getEditors,
  getToolsPane,
  getSplit,
  getEditorLanguage,
  setProjectRecover,
  i18n,
  handleConsole,
  handleTestResults,
  handleExternalResources,
  handleChangeContent,
  handleIframeResize,
  run,
  format,
  configureEditorTools,
  reloadEditors,
  dispatchChangeEvent,
  handleResultLoading,
}: basicHandlersType) => {
  setSplit(createSplitPanes());
  const { addEventListener } = getEventsManager();
  const editors = getEditors();
  const split = getSplit();
  setTypeLoader(createTypeLoader(baseUrl));
  handleLogoLink(isEmbed, addEventListener);
  handleResize(addEventListener, setLayout, editors);
  handleIframeResize();
  handleIframeScroll(addEventListener, setIframeScrollPosition);
  handleSelectEditor(
    addEventListener,
    setAppData,
    showEditor,
    getEditorLanguage,
    setProjectRecover,
  );
  handleChangeLanguage(addEventListener, setAppData);
  handleChangeContent();
  handleKeyboardShortcuts(addEventListener, isEmbed, showEditor, getActiveEditor, getToolsPane());
  handleRunButton(addEventListener, split, run);
  handleResultButton(addEventListener, split);
  handleShareButton(addEventListener, showScreen);
  handleEditorTools(
    addEventListener,
    showScreen,
    getActiveEditor,
    getToolsPane(),
    configureEditorTools,
    format,
  );
  handleProcessors(addEventListener, editors, run, dispatchChangeEvent, reloadEditors);
  handleResultLoading();
  handleTestResults();
  handleConsole();
  handleI18n(addEventListener, i18n);
  handleFullscreen(addEventListener);
  if (isEmbed) {
    handleExternalResources();
  }
};

export default initBasicHandlers;
