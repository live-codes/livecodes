import LunaConsole from 'luna-console';
import { createEditor, getFontFamily } from '../editor';
import type { createEventsManager } from '../events';
import type { Editors, Config, Console, CodeEditor, EditorOptions } from '../models';
import { isMobile } from '../utils';
import { sandboxService } from '../services';
import { getToolspaneButtons, getToolspaneElement, getToolspaneTitles } from '../UI';
import { getLanguageExtension, mapLanguage } from '../languages';
import { getEditorConfig } from '../config';

export const createConsole = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  eventsManager: ReturnType<typeof createEventsManager>,
  isEmbed: boolean,
  _runTests: () => Promise<void>,
): Console => {
  let consoleEmulator: InstanceType<typeof LunaConsole>;
  let editor: CodeEditor;

  let consoleElement: HTMLElement;
  const sourceSelector = '#result > iframe';
  let clearButton: HTMLButtonElement;

  const commands: string[] = [];
  let commandsIndex = -1;

  const blur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const htmlToElement = (html: string) => {
    const tag = html.substr(1, 4);
    if (['html', 'head'].includes(tag)) {
      return html;
    }
    if (tag === 'body') {
      const el = document.createElement(tag);
      el.innerHTML = html;
      return el;
    }
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
  };

  const convertTypes = (
    args: Array<{
      type: 'element' | 'node' | 'document' | 'window' | 'function' | 'other';
      content: any;
    }>,
  ) =>
    args.map((arg) => {
      if (arg.type === 'element') {
        return htmlToElement(arg.content);
      }
      return arg.content;
    });

  const createConsoleEmulator = () => {
    if (consoleEmulator) {
      consoleEmulator.destroy();
      consoleEmulator = new LunaConsole(consoleElement);
      return consoleEmulator;
    }

    consoleEmulator = new LunaConsole(consoleElement);
    eventsManager.addEventListener(window, 'message', (event: any) => {
      if (
        !consoleElement ||
        event.origin !== sandboxService.getOrigin() ||
        event.data.type !== 'console'
      ) {
        return;
      }
      const message = event.data;
      const api = [
        'output', // to output messages from console input
        'log',
        'error',
        'info',
        'warn',
        'dir',
        'time',
        'timeLog',
        'timeEnd',
        'clear',
        'count',
        'countReset',
        'assert',
        'table',
        'group',
        'groupCollapsed',
        'groupEnd',
      ];
      if (api.includes(message.method)) {
        if (message.method === 'clear') {
          // prevent passing args (silent) to `clear` method
          consoleEmulator.clear();
        } else {
          (consoleEmulator as any)[message.method](...convertTypes(message.args));
        }
        updateMark();
      }
    });

    return consoleEmulator;
  };

  const createConsoleInput = async (force = false) => {
    if (editor && !force) return editor;

    const container = document.querySelector('#console-input') as HTMLElement;
    if (!container) throw new Error('Console input container not found');

    const editorOptions: EditorOptions = {
      baseUrl,
      container,
      language: 'javascript',
      value: '',
      readonly: false,
      mode: config.mode,
      editorId: 'console',
      isEmbed,
      isHeadless: false,
      mapLanguage,
      getLanguageExtension,
      getFormatterConfig: () => ({}),
      getFontFamily,
      ...getEditorConfig(config),
    };
    const consoleEditor = await createEditor(editorOptions);

    consoleEditor.addKeyBinding('exec', consoleEditor.keyCodes.Enter, () => {
      const command = consoleEditor.getValue();
      const iframe = document.querySelector(sourceSelector) as HTMLIFrameElement;
      (consoleEmulator as any).insert({
        type: 'input',
        args: [command],
        ignoreFilter: true,
      });
      iframe.contentWindow?.postMessage({ console: command }, '*');
      commands.push(command);
      consoleEditor.setValue('', false);
      commandsIndex = -1;
      updateMark();
    });

    consoleEditor.addKeyBinding('prev', consoleEditor.keyCodes.UpArrow, () => {
      const currentIndex = commandsIndex === -1 ? commands.length : commandsIndex;
      commandsIndex = currentIndex === 0 ? 0 : currentIndex - 1;
      consoleEditor.setValue(commands[commandsIndex]);
    });

    consoleEditor.addKeyBinding('next', consoleEditor.keyCodes.DownArrow, () => {
      const currentIndex = commandsIndex === -1 ? commands.length - 1 : commandsIndex;
      commandsIndex = currentIndex === commands.length - 1 ? -1 : currentIndex + 1;
      consoleEditor.setValue(commands[commandsIndex] || '');
    });

    const minHeight = 25;
    container.style.minHeight = minHeight + 'px';

    consoleEditor.onContentChanged(() => {
      if (!consoleEditor.monaco) return;
      const height =
        consoleEditor.monaco.getContentHeight() < minHeight
          ? minHeight
          : consoleEditor.monaco.getContentHeight() * 2;
      container.style.height = height + 'px';
    });

    if (editor) return consoleEditor;

    // workaround to remove 'luna-console-' added to variable names called by console input
    const observer = new MutationObserver(() => {
      const newLogs = consoleElement.querySelectorAll(
        '.luna-console-input pre.luna-console-code:not(.visible)',
      );
      if (newLogs.length === 0) return;
      newLogs.forEach((log) => {
        const pattern = /(luna-console-)(?!keyword|string|operator|number|json|hidden)/g;
        log.innerHTML = log.innerHTML.replace(pattern, '');
        log.classList.add('visible');
      });
    });
    observer.observe(consoleElement, { subtree: true, childList: true });

    const gutterSelector = consoleEditor.monaco ? '.glyph-margin' : '.cm-gutters';

    const margin = document.querySelector('#console-input ' + gutterSelector) as HTMLElement;
    if (margin) {
      const indicator = document.createElement('div') as HTMLElement;
      indicator.id = 'console-input-indicator';
      indicator.innerHTML = `<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: top;"><g><path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z"></path></g></svg>`;
      margin.appendChild(indicator);
    }

    return consoleEditor;
  };

  const createConsoleElements = () => {
    if (consoleElement) return;
    const toolsPaneElement = getToolspaneElement();

    const container = document.createElement('div');
    container.id = 'console-container';
    toolsPaneElement.appendChild(container);

    consoleElement = document.createElement('div');
    consoleElement.id = 'console';
    container.appendChild(consoleElement);

    const consoleInput = document.createElement('div');
    consoleInput.id = 'console-input';
    container.appendChild(consoleInput);

    const toolsPaneButtons = getToolspaneButtons();
    if (toolsPaneButtons) {
      const btnContainer = document.createElement('span');
      btnContainer.classList.add('hint--top-left');
      btnContainer.dataset.hint = 'Clear console';

      clearButton = document.createElement('button');
      clearButton.classList.add('clear-button');
      clearButton.style.display = 'none';
      eventsManager.addEventListener(
        clearButton,
        'click',
        () => {
          consoleEmulator.clear();
          updateMark();
        },
        false,
      );
      eventsManager.addEventListener(
        clearButton,
        'touchstart',
        () => {
          consoleEmulator.clear();
          updateMark();
        },
        false,
      );
      btnContainer.appendChild(clearButton);
      toolsPaneButtons.prepend(btnContainer);
    }
  };

  const load = async () => {
    createConsoleElements();
    consoleEmulator = createConsoleEmulator();
    if (config.readonly || config.mode === 'codeblock' || config.mode === 'editor') {
      return;
    } else {
      editor = await createConsoleInput();
    }
  };

  const reloadEditor = async (newConfig: Config) => {
    config = newConfig;
    if (!editor) {
      await load();
      return;
    }
    editor?.destroy();
    editor = await createConsoleInput(true);
  };

  const updateMark = () => {
    const toolsPaneTitle = getToolspaneTitles()?.querySelector('.console');
    if (!toolsPaneTitle) return;
    if (!toolsPaneTitle.querySelector('#console-mark')) {
      const mark = document.createElement('span');
      mark.id = 'console-mark';
      mark.classList.add('mark');
      toolsPaneTitle.appendChild(mark);
    }
    setTimeout(() => {
      const logCount = [
        ...document.querySelectorAll<HTMLElement>('.luna-console-log-content'),
      ].filter((log) => log.innerText !== 'Console was cleared').length;
      toolsPaneTitle.classList.toggle('has-mark', logCount > 0);
    }, 50);
  };

  const exec = (fn: () => void) => {
    fn();
    updateMark();
  };

  return {
    name: 'console',
    title: 'Console',
    load,
    onActivate: () => {
      if (!isMobile() && !isEmbed) {
        editor?.focus();
      }
      if (clearButton) {
        clearButton.style.display = 'unset';
      }
    },
    onDeactivate: () => {
      blur();
      if (clearButton) {
        clearButton.style.display = 'none';
      }
    },
    getEditor: () => editor,
    reloadEditor,
    log: (...args) => exec(() => consoleEmulator?.log(...args)),
    info: (...args) => exec(() => consoleEmulator?.info(...args)),
    table: (...args) => exec(() => consoleEmulator?.table(...args)),
    warn: (...args) => exec(() => consoleEmulator?.warn(...args)),
    error: (...args) => exec(() => consoleEmulator?.error(...args)),
    clear: (silent) => exec(() => consoleEmulator?.clear(silent)),
    // filterLog: (filter) => exec(() => consoleEmulator?.filterLog(filter)),
    evaluate: (code) => exec(() => consoleEmulator?.evaluate(code)),
  };
};
