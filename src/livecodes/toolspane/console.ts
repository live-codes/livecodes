import LunaConsole from 'luna-console';
import { createEditor } from '../editor';
import { createEventsManager } from '../events';
import { Editors, Config, Tool, CodeEditor, EditorOptions } from '../models';
import { isMobile } from '../utils';
import { sandboxService } from '../services';

export const createConsole = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  eventsManager: ReturnType<typeof createEventsManager>,
  isEmbed: boolean,
): Tool => {
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
        (consoleEmulator as any)[message.method](...convertTypes(message.args));
      }
    });

    return consoleEmulator;
  };

  const createConsoleInput = async () => {
    if (editor) return editor;

    const container = document.querySelector('#console-input') as HTMLElement;
    if (!container) throw new Error('Console input container not found');

    const editorOptions: EditorOptions = {
      baseUrl,
      container,
      language: 'javascript',
      value: '',
      readonly: false,
      editor: config.editor,
      editorType: 'console',
      theme: config.theme,
      isEmbed,
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

    const toolsPaneSelector = '#output #tools-pane';
    const toolsPaneElement = document.querySelector(toolsPaneSelector);
    if (!toolsPaneElement) {
      throw new Error('Cannot find element with selector: ' + toolsPaneSelector);
    }

    const container = document.createElement('div');
    container.id = 'console-container';
    toolsPaneElement.appendChild(container);

    consoleElement = document.createElement('div');
    consoleElement.id = 'console';
    container.appendChild(consoleElement);

    const consoleInput = document.createElement('div');
    consoleInput.id = 'console-input';
    container.appendChild(consoleInput);

    const toolsPaneButtons = document.querySelector('#tools-pane-buttons');
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
        },
        false,
      );
      eventsManager.addEventListener(
        clearButton,
        'touchstart',
        () => {
          consoleEmulator.clear();
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
    if (
      config.readonly ||
      config.editor === 'prism' ||
      config.mode === 'codeblock' ||
      config.mode === 'editor'
    ) {
      return;
    } else {
      editor = await createConsoleInput();
    }
  };

  return {
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
    log: (...args: any[]) => consoleEmulator?.log(...args),
    info: (...args: any[]) => consoleEmulator?.info(...args),
    table: (...args: any[]) => consoleEmulator?.table(...args),
    warn: (...args: any[]) => consoleEmulator?.warn(...args),
    error: (...args: any[]) => consoleEmulator?.error(...args),
    clear: () => consoleEmulator?.clear(),
    // filterLog: (filter: string) => consoleEmulator?.filterLog(filter),
    evaluate: (code: string) => consoleEmulator?.evaluate(code),
  } as Tool;
};
