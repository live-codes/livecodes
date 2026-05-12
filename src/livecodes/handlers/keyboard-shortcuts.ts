import type { createSplitPanes } from '../UI';
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
  toolsPane?: ToolsPane;
  split?: ReturnType<typeof createSplitPanes>;
  isEmbed: boolean;
}

/**
 * Module-level state for tracking key sequences
 */
let lastkeys = '';

/**
 * Creates individual shortcut handlers as pure functions
 */
const createCommandPaletteHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  const activeEditor = deps.getActiveEditor();
  if (ctrl(e) && e.code === 'KeyP' && activeEditor.monaco) {
    e.preventDefault();
    activeEditor.monaco.trigger('anyString', 'editor.action.quickCommand');
    lastkeys = 'Ctrl + P';
    return true;
  }
  return false;
};

const createPreventBookmarkHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.code === 'KeyD') {
    e.preventDefault();
    lastkeys = 'Ctrl + D';
    return true;
  }
  return false;
};

const createConsoleToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyC') {
    e.preventDefault();
    UI.getConsoleButton()?.dispatchEvent(new Event('touchstart'));
    lastkeys = 'Ctrl + Alt + C';
    return true;
  }
  return false;
};

const createConsoleMaximizeHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyF' && lastkeys === 'Ctrl + Alt + C') {
    e.preventDefault();
    UI.getConsoleButton()?.dispatchEvent(new Event('dblclick'));
    lastkeys = 'Ctrl + Alt + C, F';
    return true;
  }
  return false;
};

const createRunTestsHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyT') {
    e.preventDefault();
    UI.getRunTestsButton()?.click();
    lastkeys = 'Ctrl + Alt + T';
    return true;
  }
  return false;
};

const createRunHandler = () => (e: KeyboardEvent) => {
  if (e.shiftKey && e.key === 'Enter') {
    e.preventDefault();
    UI.getRunButton()?.click();
    lastkeys = 'Shift + Enter';
    return true;
  }
  return false;
};

const createResultToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyR') {
    e.preventDefault();
    UI.getResultButton()?.click();
    lastkeys = 'Ctrl + Alt + R';
    return true;
  }
  return false;
};

const createZoomToggleHandler = () => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyZ') {
    e.preventDefault();
    UI.getZoomButton()?.click();
    lastkeys = 'Ctrl + Alt + Z';
    return true;
  }
  return false;
};

const createFocusEditorHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (ctrl(e) && e.altKey && e.code === 'KeyE') {
    e.preventDefault();
    deps.getActiveEditor().focus();
    lastkeys = 'Ctrl + Alt + E';
    return true;
  }
  return false;
};

// Esc closes dropdown menus
// Esc + Esc moves focus out of editor
// Esc + Esc + Esc moves focus to logo
const createEscapeHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
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
      lastkeys = 'Esc + Esc';
      return true;
    }
    if (lastkeys === 'Esc + Esc') {
      e.preventDefault();
      UI.getLogoLink()?.focus();
      lastkeys = 'Esc + Esc + Esc';
      return true;
    }
    lastkeys = 'Esc';
    return true;
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
    lastkeys = 'Ctrl + Alt + ' + e.key;
    return true;
  }
  return false;
};

const createNewProjectHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyN') {
    e.preventDefault();
    UI.getNewLink()?.click();
    lastkeys = 'Ctrl + Alt + N';
    return true;
  }
  return false;
};

const createOpenProjectHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.code === 'KeyO') {
    e.preventDefault();
    UI.getOpenLink()?.click();
    lastkeys = 'Ctrl + O';
    return true;
  }
  return false;
};

const createImportHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyI') {
    e.preventDefault();
    UI.getImportLink()?.click();
    lastkeys = 'Ctrl + Alt + I';
    return true;
  }
  return false;
};

const createShareHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyS') {
    e.preventDefault();
    UI.getShareLink()?.click();
    lastkeys = 'Ctrl + Alt + S';
    return true;
  }
  return false;
};

const createForkHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.shiftKey && e.code === 'KeyS') {
    e.preventDefault();
    UI.getForkLink()?.click();
    lastkeys = 'Ctrl + Shift + S';
    return true;
  }
  return false;
};

const createSaveHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.code === 'KeyS') {
    e.preventDefault();
    UI.getSaveLink()?.click();
    lastkeys = 'Ctrl + S';
    return true;
  }
  return false;
};

const createFocusModeHandler = (deps: KeyboardShortcutDeps) => (e: KeyboardEvent) => {
  if (!deps.isEmbed && ctrl(e) && e.altKey && e.code === 'KeyF') {
    e.preventDefault();
    UI.getFocusButton()?.click();
    lastkeys = 'Ctrl + Alt + F';
    return true;
  }
  return false;
};

/**
 * Handles all keyboard shortcuts and event listeners
 */
export const handleKeyboardShortcuts = (deps: KeyboardShortcutDeps): void => {
  const hotKeys = (e: KeyboardEvent) => {
    // Command palette handler
    if (createCommandPaletteHandler(deps)(e)) return;

    // Prevent bookmark dialog
    if (createPreventBookmarkHandler()(e)) return;

    // Console toggle
    if (createConsoleToggleHandler()(e)) return;

    // Console maximize (depends on previous key)
    if (createConsoleMaximizeHandler()(e)) return;

    // Run tests
    if (createRunTestsHandler()(e)) return;

    // Run code
    if (createRunHandler()(e)) return;

    // Result toggle
    if (createResultToggleHandler()(e)) return;

    // Zoom toggle
    if (createZoomToggleHandler()(e)) return;

    // Focus editor
    if (createFocusEditorHandler(deps)(e)) return;

    // Escape handling
    if (createEscapeHandler(deps)(e)) return;

    // Editor switching
    if (createEditorSwitchHandler(deps)(e)) return;

    // Project management shortcuts (only if not embed)
    if (createNewProjectHandler(deps)(e)) return;

    if (createOpenProjectHandler(deps)(e)) return;

    if (createImportHandler(deps)(e)) return;

    if (createShareHandler(deps)(e)) return;

    if (createForkHandler(deps)(e)) return;

    if (createSaveHandler(deps)(e)) return;

    if (createFocusModeHandler(deps)(e)) return;

    // Update lastkeys for non-modifier keys
    if (!ctrl(e) && !e.altKey && !e.shiftKey) {
      lastkeys = e.key;
      return;
    }
  };

  deps.eventsManager.addEventListener(window, 'keydown', hotKeys, true);
};
