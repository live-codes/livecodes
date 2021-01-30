import LunaConsole from 'luna-console';
import Split from 'split.js';
import { createEditor } from './editor';
import { createEventsManager } from './events';
import { Pen } from './models';
import { monaco } from './monaco';

export const createConsole = (
  config: Pen,
  consoleSelector: string,
  sourceSelector: string,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  let consoleSplit: ReturnType<typeof Split>;
  let consoleEmulator: InstanceType<typeof LunaConsole>;
  let status: Pen['console'];
  let editor: any;
  let scriptEditor: any;
  let codeCompletion: any;

  const consoleElement = document.querySelector(consoleSelector) as HTMLElement;
  const result = document.querySelector('#result') as HTMLElement;

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

  const setAnimation = (animate: boolean) => {
    if (animate) {
      result.style.transition = 'height 0.5s';
    } else {
      result.style.transition = 'none';
    }
  };

  const setHidden = (hide: boolean) => {
    if (hide) {
      consoleSplit.collapse(1);
      result.style.minHeight = '100%';
    } else {
      result.style.minHeight = 'unset';
    }
  };

  const sizeChanged = () => {
    const consoleButtons = document.querySelector('#console-bar #console-buttons') as HTMLElement;
    if (consoleSplit.getSizes()[0] > 90) {
      consoleButtons.style.display = 'none';
    } else {
      consoleButtons.style.display = 'unset';
    }
  };

  const blur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  type Sizes = {
    [key in Pen['console']]: [number, number];
  };

  const sizes: Sizes = {
    closed: [100, 0],
    open: [60, 40],
    full: [0, 100],
    none: [100, 0],
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

  const createConsoleSplit = () => {
    if (consoleSplit) {
      return consoleSplit;
    }

    consoleSplit = Split(['#result', '#console-container'], {
      sizes: sizes.closed,
      gutterSize: 30,
      direction: 'vertical',
      onDragStart() {
        setAnimation(false);
      },
      onDragEnd() {
        setAnimation(true);
      },
      onDrag() {
        sizeChanged();
      },
    });

    const consoleBar = document.querySelector('#output .gutter') as HTMLElement;
    consoleBar.id = 'console-bar';
    const consoleTitle = document.createElement('div');
    consoleTitle.id = 'console-title';
    consoleTitle.innerHTML = 'Console';
    consoleBar.appendChild(consoleTitle);

    let timer: any;
    eventsManager.addEventListener(
      consoleTitle,
      'click',
      (event: any) => {
        if (event.detail === 1) {
          timer = setTimeout(() => {
            if (consoleSplit.getSizes()[0] > 90) {
              consoleSplit.setSizes(sizes.open);
              sizeChanged();
              editor?.focus();
            } else {
              consoleSplit.collapse(1);
              sizeChanged();
              blur();
            }
          }, 200);
        }
      },
      false,
    );
    eventsManager.addEventListener(
      consoleTitle,
      'dblclick',
      () => {
        clearTimeout(timer);
        if (consoleSplit.getSizes()[0] < 10) {
          consoleSplit.collapse(1);
          sizeChanged();
          blur();
        } else {
          consoleSplit.collapse(0);
          sizeChanged();
          editor?.focus();
        }
      },
      false,
    );
    eventsManager.addEventListener(
      window,
      'resize',
      () => {
        if (consoleSplit.getSizes()[0] < 10) {
          consoleSplit.collapse(0);
          sizeChanged();
        } else if (consoleSplit.getSizes()[0] > 90) {
          consoleSplit.collapse(1);
          sizeChanged();
          blur();
        }
      },
      false,
    );

    const buttons = document.createElement('div');
    buttons.id = 'console-buttons';
    consoleBar.appendChild(buttons);

    const clearButton = document.createElement('button');
    clearButton.classList.add('clear-button');
    clearButton.title = 'Clear console';
    eventsManager.addEventListener(
      clearButton,
      'click',
      () => {
        consoleEmulator.clear();
      },
      false,
    );
    buttons.appendChild(clearButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('delete-button');
    closeButton.title = 'Close';
    eventsManager.addEventListener(
      closeButton,
      'click',
      () => {
        consoleSplit.collapse(1);
        sizeChanged();
        blur();
      },
      false,
    );
    buttons.appendChild(closeButton);

    return consoleSplit;
  };

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

  const resize = (newStatus: Pen['console']) => {
    if (newStatus === 'none') {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (newStatus === 'closed') {
      consoleSplit.collapse(1);
    } else if (newStatus === 'full') {
      consoleSplit.collapse(0);
    } else if (newStatus === 'open') {
      consoleSplit.setSizes(sizes.open);
    }

    status = newStatus;
    sizeChanged();
  };

  const load = async (newStatus: Pen['console'], scriptEd: any) => {
    scriptEditor = scriptEd;
    addCodeCompletion();

    const initialLoad = !status;
    status = newStatus;
    consoleSplit = createConsoleSplit();
    consoleEmulator = createConsoleEmulator();
    editor = await createConsoleInput();

    if (initialLoad) {
      consoleSplit.setSizes(sizes[status]);
      sizeChanged();
      if (newStatus === 'none') {
        setHidden(true);
      }
    }
  };

  return {
    load,
    open: () => resize('open'),
    close: () => resize('closed'),
    maximize: () => resize('full'),
    hide: () => resize('none'),
    log: (...args: any[]) => consoleEmulator?.log(...args),
    info: (...args: any[]) => consoleEmulator?.info(...args),
    table: (...args: any[]) => consoleEmulator?.table(...args),
    warn: (...args: any[]) => consoleEmulator?.warn(...args),
    error: (...args: any[]) => consoleEmulator?.error(...args),
    clear: () => consoleEmulator?.clear(),
    // filterLog: (filter: string) => consoleEmulator?.filterLog(filter),
    evaluate: (code: string) => consoleEmulator?.evaluate(code),
  };
};
