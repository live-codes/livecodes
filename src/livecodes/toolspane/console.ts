import LunaConsole from 'luna-console';
import { getToolspaneButtons, getToolspaneElement, getToolspaneTitles } from '../UI';
import { getEditorConfig } from '../config';
import { createEditor, getFontFamily } from '../editor';
import { getLanguageExtension, mapLanguage } from '../languages';
import type {
  CodeEditor,
  Config,
  Console,
  EditorOptions,
  Editors,
  EventsManager,
  Theme,
} from '../models';
import type { ConsoleDisplaySource } from '../result/result-types';
import { isConsoleDisplaySource } from '../result/result-types';
import { sandboxService } from '../services';
import { isMobile, preventFocus } from '../utils';
import { buildSourceLineMap } from '../utils/source-map';

export const createConsole = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
  _runTests: () => Promise<void>,
): Console => {
  let consoleEmulator: InstanceType<typeof LunaConsole>;
  let editor: CodeEditor;
  let sourceLineMap: Map<number, number> | null = null;
  let lineNumbersEnabled = false;
  const lineNumberQueue: Array<string | null> = [];
  let lastProcessedSource: string | null = null;

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
      type: 'element' | 'node' | 'nodelist' | 'document' | 'window' | 'function' | 'other';
      content: any;
    }>,
  ) =>
    args.map((arg) => {
      if (arg.type === 'element') {
        return htmlToElement(arg.content);
      }
      return arg.content;
    });

  const getSource = (source: unknown): ConsoleDisplaySource =>
    isConsoleDisplaySource(source) ? source : 'script';

  const toPositiveLineNumber = (line: unknown): number | undefined => {
    if (typeof line !== 'number' || !Number.isFinite(line)) return undefined;
    return line > 0 ? Math.trunc(line) : undefined;
  };

  // Extends a badge like 'script:1' to 'script:1:5' when lines span a range.
  const updateSourceLineRange = (current: string, newLine: number): string => {
    const match = current.match(/^(\w+):(\d+)(?::(\d+))?$/);
    if (!match) return current;
    const src = match[1];
    const firstLine = parseInt(match[2], 10);
    const lastLine = match[3] ? parseInt(match[3], 10) : firstLine;
    const newLastLine = Math.max(lastLine, newLine);
    if (newLastLine === firstLine) return current;
    return `${src}:${firstLine}:${newLastLine}`;
  };

  const setupInsertListener = () => {
    (consoleEmulator as any).on('insert', (log: any) => {
      const sourceLine = lineNumberQueue.shift() ?? null;
      if (sourceLine == null) return;
      const logItem = log?.container?.querySelector?.('.luna-console-log-item');
      if (!logItem) return;
      let badge = logItem.querySelector('.console-line-number') as HTMLElement | null;
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'console-line-number';
        (logItem as HTMLElement).appendChild(badge);
      }
      if (badge.textContent) {
        // Luna re-emits 'insert' on dedup (addCount) — extend the line range.
        const newLine = parseInt(sourceLine.split(':')[1], 10);
        badge.textContent = updateSourceLineRange(badge.textContent, newLine);
      } else {
        badge.textContent = sourceLine;
      }
    });
  };

  const createConsoleEmulator = () => {
    if (consoleEmulator) {
      consoleEmulator.destroy();
      consoleEmulator = new LunaConsole(consoleElement, { asyncRender: false });
      setupInsertListener();
      return consoleEmulator;
    }

    consoleEmulator = new LunaConsole(consoleElement, { theme: config.theme, asyncRender: false });
    setupInsertListener();

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
          lineNumberQueue.length = 0;
          lastProcessedSource = null;
          consoleEmulator.clear();
        } else {
          const args = convertTypes(message.args);
          // groupEnd modifies an existing log entry — no 'insert' event fires, skip queue
          if (message.method !== 'groupEnd') {
            const lineDisplayMethods = ['log', 'error', 'warn', 'info', 'output'];
            if (
              lineNumbersEnabled &&
              message.lineNumber !== undefined &&
              lineDisplayMethods.includes(message.method)
            ) {
              const source = getSource(message.source);
              const rawLineNumber = toPositiveLineNumber(message.lineNumber);
              if (!rawLineNumber) {
                lineNumberQueue.push(null);
                (consoleEmulator as any)[message.method](...args);
                updateMark();
                return;
              }
              const lineNumber =
                source === 'script'
                  ? toPositiveLineNumber(sourceLineMap?.get(rawLineNumber)) ?? rawLineNumber
                  : rawLineNumber;
              lineNumberQueue.push(`${source}:${lineNumber}`);
              // Break Luna's deduplication only when the source (markup/script) changes.
              // Same source lets Luna group identical messages; the insert handler extends
              // the badge range on each dedup re-emit.
              if (lastProcessedSource !== source) {
                (consoleEmulator as any).lastLog = null;
                lastProcessedSource = source;
              }
            } else {
              lineNumberQueue.push(null);
            }
          }
          (consoleEmulator as any)[message.method](...args);
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
      isLite: false,
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

    const minHeight = 30;
    container.style.minHeight = minHeight + 'px';

    consoleEditor.onContentChanged(() => {
      if (!consoleEditor.monaco) return;
      const height =
        consoleEditor.monaco.getContentHeight() < minHeight
          ? minHeight
          : consoleEditor.monaco.getContentHeight() * 2;
      container.style.height = height + 'px';
    });

    preventFocus(container);

    if (editor) return consoleEditor;

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
    consoleElement.tabIndex = -1;
    container.appendChild(consoleElement);

    const consoleInput = document.createElement('div');
    consoleInput.id = 'console-input';
    container.appendChild(consoleInput);

    const toolsPaneButtons = getToolspaneButtons();
    if (toolsPaneButtons) {
      clearButton = document.createElement('button');
      clearButton.classList.add('console-clear-button');
      clearButton.title = window.deps.translateString('toolspane.console.clear', 'Clear console');
      const iconCSS = '<i class="icon-delete"></i>';
      clearButton.innerHTML = iconCSS;
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
      toolsPaneButtons.prepend(clearButton);
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
    title: window.deps.translateString('toolspane.console.title', 'Console'),
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
    setTheme: (theme: Theme) => exec(() => consoleEmulator?.setOption('theme', theme)),
    setSourceMap: (map: string | null | undefined) => {
      if (typeof map === 'string') {
        sourceLineMap = buildSourceLineMap(map);
        lineNumbersEnabled = true;
      } else if (map === null) {
        sourceLineMap = null; // plain JS: accurate raw lines, no map needed
        lineNumbersEnabled = true;
      } else {
        sourceLineMap = null; // suppress: Python, Ruby, WASM, etc.
        lineNumbersEnabled = false;
      }
    },
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
