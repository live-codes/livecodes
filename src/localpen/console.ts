import LunaConsole from 'luna-console';
import { createEditor } from './editor';
import { createEventsManager } from './events';
import { Editors, Pen, Tool } from './models';
import { monaco } from './monaco';

export const createConsole = (
  config: Pen,
  editors: Editors,
  eventsManager: ReturnType<typeof createEventsManager>,
): Tool => {
  let consoleEmulator: InstanceType<typeof LunaConsole>;
  let editor: any;
  let scriptEditor: any;
  let codeCompletion: any;

  let consoleElement: HTMLElement;
  const sourceSelector = '#result > iframe';
  let clearButton: HTMLButtonElement;

  const commands: string[] = [];
  let commandsIndex = -1;

  const addCodeCompletion = () => {
    if (!scriptEditor) return;
    if (codeCompletion) {
      codeCompletion.dispose();
    }
    codeCompletion = monaco.languages.typescript.typescriptDefaults.addExtraLib(
      scriptEditor.getValue(),
    );
  };

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
      const iframe = document.querySelector(sourceSelector) as HTMLIFrameElement;
      if (
        !iframe ||
        !consoleElement ||
        event.source !== iframe.contentWindow ||
        status === 'none'
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
      if (message.type === 'console' && api.includes(message.method)) {
        consoleEmulator[message.method as keyof typeof consoleEmulator](
          ...convertTypes(message.args),
        );
      }
    });

    return consoleEmulator;
  };

  const createConsoleInput = async () => {
    const editorOptions = {
      baseUrl: config.baseUrl,
      container: document.querySelector('#console-input') as HTMLElement,
      language: 'typescript',
      fontSize: 14,
      lineNumbers: 'off',
      glyphMargin: true,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      minimap: {
        enabled: false,
      },
      scrollbar: {
        vertical: 'auto',
      },
      scrollBeyondLastLine: false,
      contextmenu: false,
      automaticLayout: true,
    };
    const editor = await createEditor(editorOptions);

    const addKeyBinding = (label: string, keybinding: any, callback: () => void) => {
      editor.addAction({
        id: label + '-console',
        label,
        keybindings: [keybinding],
        precondition: '!suggestWidgetVisible && !markersNavigationVisible && !findWidgetVisible',
        run: callback,
      });
    };

    addKeyBinding('exec', monaco.KeyCode.Enter, () => {
      const command = editor.getValue();
      const iframe = document.querySelector(sourceSelector) as HTMLIFrameElement;
      consoleEmulator.insert({
        type: 'input',
        args: [command],
        ignoreFilter: true,
      });
      iframe.contentWindow?.postMessage({ console: command }, '*');
      commands.push(command);
      editor.getModel().setValue('');
      commandsIndex = -1;
    });

    addKeyBinding('prev', monaco.KeyCode.UpArrow, () => {
      const currentIndex = commandsIndex === -1 ? commands.length : commandsIndex;
      commandsIndex = currentIndex === 0 ? 0 : currentIndex - 1;
      editor.getModel().setValue(commands[commandsIndex]);
    });

    addKeyBinding('next', monaco.KeyCode.DownArrow, () => {
      const currentIndex = commandsIndex === -1 ? commands.length - 1 : commandsIndex;
      commandsIndex = currentIndex === commands.length - 1 ? -1 : currentIndex + 1;
      editor.getModel().setValue(commands[commandsIndex] || '');
    });

    const minHeight = 25;
    editorOptions.container.style.minHeight = minHeight + 'px';

    editor.getModel().onDidChangeContent(() => {
      const height =
        editor.getContentHeight() < minHeight ? minHeight : editor.getContentHeight() * 2;
      editorOptions.container.style.height = height + 'px';
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

    const margin = document.querySelector('#console-input .glyph-margin') as HTMLElement;
    const indicator = document.createElement('div') as HTMLElement;
    indicator.id = 'console-input-indicator';
    indicator.innerHTML = `<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: top;"><g><path d="m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z"></path></g></svg>`;
    margin.appendChild(indicator);

    editor.onDidFocusEditorText(() => {
      addCodeCompletion();
    });

    return editor;
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
      clearButton = document.createElement('button');
      clearButton.classList.add('clear-button');
      clearButton.title = 'Clear console';
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
      toolsPaneButtons.prepend(clearButton);
    }
  };

  const load = async () => {
    createConsoleElements();

    scriptEditor = editors.script;
    addCodeCompletion();

    consoleEmulator = createConsoleEmulator();
    editor = await createConsoleInput();
  };

  return {
    title: 'Console',
    load,
    onActivate: () => {
      editor?.focus();
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
