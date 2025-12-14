import * as UI from '../UI/selectors';
import type { CodeEditor, Config, EditorId, EventsManager, ToolsPane } from '../models';
import { ctrl } from '../utils';

/**
 * Keyboard shortcut handler dependencies
 */
export interface KeyboardShortcutDeps {
  eventsManager: EventsManager;
  getActiveEditor: () => CodeEditor;
  getConfig: () => Config;
  showEditor: (editorId: EditorId) => void;
  run: () => Promise<void>;
  showScreen: any;
  toolsPane?: ToolsPane;
  split?: any;
  isEmbed: boolean;
}

/**
 * Creates individual shortcut handlers as pure functions
 */
const createCommandPaletteHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  const activeEditor = deps.getActiveEditor();
  if (ctrl(e) && e.code === 'KeyP' && activeEditor.monaco) {
    e.preventDefault();
    activeEditor.monaco.trigger('anyString', 'editor.action.quickCommand');
    return true;
  }
  return false;
};

const createPreventBookmarkHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.code === 'KeyD') {
    e.preventDefault?.();
    return true;
  }
  return false;
};

const createConsoleToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyC') {
    e.preventDefault();
    UI.getConsoleButton()?.dispatchEvent(new Event('touchstart'));
    return true;
  }
  return false;
};

const createConsoleMaximizeHandler = (lastkeys: string) => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyF' && lastkeys === 'Ctrl + Alt + C') {
    e.preventDefault();
    UI.getConsoleButton()?.dispatchEvent(new Event('dblclick'));
    return true;
  }
  return false;
};

const createRunTestsHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyT') {
    e.preventDefault();
    UI.getRunTestsButton()?.click();
    return true;
  }
  return false;
};

const createRunHandler = () => (e: KeyboardEvent) => {
  if (e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    UI.getRunButton()?.click();
    return true;
  }
  return false;
};

const createResultToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyR') {
    e.preventDefault();
    UI.getResultButton()?.click();
    return true;
  }
  return false;
};

const createZoomToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyZ') {
    e.preventDefault();
    UI.getZoomButton()?.click();
    return true;
  }
  return false;
};

const createFocusEditorHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyE') {
    e.preventDefault();
    deps.getActiveEditor().focus();
    return true;
  }
  return false;
};

// Esc closes dropdown menus
// Esc + Esc moves focus out of editor
// Esc + Esc + Esc moves focus to logo
const createEscapeHandler =
  (deps: KeyboardShortcutDeps, lastkeys: string) => (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      document.querySelectorAll('.menu-scroller').forEach((el) => el.classList.add('hidden'));
      if (lastkeys === 'Esc') {
        e.preventDefault();
        if (
          (deps.toolsPane?.getStatus() === 'open' || deps.toolsPane?.getStatus() === 'full') &&
          deps.toolsPane.getActiveTool() === 'console'
        ) {
          UI.getConsoleButton()?.focus();
        } else {
          UI.getFocusButton()?.focus();
        }
        return 'Esc + Esc';
      }
      if (lastkeys === 'Esc + Esc') {
        e.preventDefault();
        UI.getLogoLink()?.focus();
        return 'Esc + Esc + Esc';
      }
      return 'Esc';
    }
    return false;
  };

// Ctrl + Alt + (1-3) activates editor 1-3
// Ctrl + Alt + (ArrowLeft/ArrowRight) activates previous/next editor
const createEditorSwitchHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && ['1', '2', '3', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    const editorIds = (['markup', 'style', 'script'] as const).filter(
      (id) => deps.getConfig()[id].hideTitle !== true,
    );

    e.preventDefault();
    deps.split?.show('code');

    const index = ['1', '2', '3'].includes(e.key)
      ? Number(e.key) - 1
      : e.key === 'ArrowLeft'
        ? editorIds.findIndex((id) => id === deps.getConfig().activeEditor) - 1 || 0
        : e.key === 'ArrowRight'
          ? editorIds.findIndex((id) => id === deps.getConfig().activeEditor) + 1 || 0
          : 0;

    const editorIndex =
      index === editorIds.length ? 0 : index === -1 ? editorIds.length - 1 : index;

    deps.showEditor(editorIds[editorIndex]);
    return true;
  }
  return false;
};

const createNewProjectHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyN') {
    e.preventDefault();
    UI.getNewLink()?.click();
    return true;
  }
  return false;
};

const createOpenProjectHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.code === 'KeyO') {
    e.preventDefault();
    UI.getOpenLink()?.click();
    return true;
  }
  return false;
};

const createImportHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyI') {
    e.preventDefault();
    UI.getImportLink()?.click();
    return true;
  }
  return false;
};

const createShareHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyS') {
    e.preventDefault();
    UI.getShareLink()?.click();
    return true;
  }
  return false;
};

const createForkHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.shiftKey && e.code === 'KeyS') {
    e.preventDefault();
    UI.getForkLink()?.click();
    return true;
  }
  return false;
};

const createSaveHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.code === 'KeyS') {
    e.preventDefault();
    UI.getSaveLink()?.click();
    return true;
  }
  return false;
};

const createFocusModeHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyF') {
    e.preventDefault();
    UI.getFocusButton()?.click();
    return true;
  }
  return false;
};

/**
 * Sets up all keyboard shortcuts and event listeners
 */
export const setupKeyboardShortcuts = (deps: KeyboardShortcutDeps): void => {
  let lastkeys = '';

  const hotKeys = async (e: KeyboardEvent) => {
    // Command palette handler
    if (createCommandPaletteHandler(deps)(e)) {
      lastkeys = 'Ctrl + P';
      return;
    }

    // Prevent bookmark dialog
    if (createPreventBookmarkHandler()(e)) {
      lastkeys = 'Ctrl + D';
      return;
    }

    // Console toggle
    if (createConsoleToggleHandler()(e)) {
      lastkeys = 'Ctrl + Alt + C';
      return;
    }

    // Console maximize (depends on previous key)
    if (createConsoleMaximizeHandler(lastkeys)(e)) {
      lastkeys = 'Ctrl + Alt + C, F';
      return;
    }

    // Run tests
    if (createRunTestsHandler()(e)) {
      lastkeys = 'Ctrl + Alt + T';
      return;
    }

    // Run code
    if (createRunHandler()(e)) {
      lastkeys = 'Shift + Enter';
      return;
    }

    // Result toggle
    if (createResultToggleHandler()(e)) {
      lastkeys = 'Ctrl + Alt + R';
      return;
    }

    // Zoom toggle
    if (createZoomToggleHandler()(e)) {
      lastkeys = 'Ctrl + Alt + Z';
      return;
    }

    // Focus editor
    if (createFocusEditorHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + E';
      return;
    }

    // Escape handling
    const escapeResult = createEscapeHandler(deps, lastkeys)(e);
    if (escapeResult) {
      lastkeys = typeof escapeResult === 'string' ? escapeResult : 'Esc';
      return;
    }

    // Editor switching
    if (createEditorSwitchHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + ' + e.key;
      return;
    }

    // Project management shortcuts (only if not embed)
    if (createNewProjectHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + N';
      return;
    }

    if (createOpenProjectHandler(deps)(e)) {
      lastkeys = 'Ctrl + O';
      return;
    }

    if (createImportHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + I';
      return;
    }

    if (createShareHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + S';
      return;
    }

    if (createForkHandler(deps)(e)) {
      lastkeys = 'Ctrl + Shift + S';
      return;
    }

    if (createSaveHandler(deps)(e)) {
      lastkeys = 'Ctrl + S';
      return;
    }

    if (createFocusModeHandler(deps)(e)) {
      lastkeys = 'Ctrl + Alt + F';
      return;
    }

    // Update lastkeys for non-modifier keys
    if (!ctrl(e) && !e.altKey && !e.shiftKey) {
      lastkeys = e.key;
      return;
    }
  };

  deps.eventsManager.addEventListener(window, 'keydown', hotKeys, true);
};
