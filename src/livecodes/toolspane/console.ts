import LunaConsole from 'luna-console';
import { getToolspaneButtons, getToolspaneElement, getToolspaneTitles } from '../UI';
import {
  buildSourceLineMap,
  getOriginalPosition,
  toPositiveLineNumber,
} from '../compiler/source-maps';
import { getEditorConfig } from '../config';
import { createEditor, getFontFamily } from '../editor';
import { customEvents } from '../events/custom-events';
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
import { sandboxService } from '../services';
import { isMobile, preventFocus } from '../utils';

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
  let sourceMapsRecord: Record<string, string> | null | undefined;
  // Lazy-decoded cache: source map key → decoded line map.
  // Keyed by filename today ('script'), by actual filename in multi-file future ('tax-calculator.ts').
  const sourceLineMapsCache = new Map<string, Map<number, number>>();
  let lineNumbersEnabled = false;

  const getSourceLineMap = (key: string): Map<number, number> | null => {
    if (!sourceMapsRecord) return null;
    if (sourceLineMapsCache.has(key)) return sourceLineMapsCache.get(key)!;
    const raw = sourceMapsRecord[key];
    if (!raw) return null;
    const decoded = buildSourceLineMap(raw);
    sourceLineMapsCache.set(key, decoded);
    return decoded;
  };
  const lineNumberQueue: Array<string | null> = [];
  let lastProcessedSource: string | null = null;
  let lastProcessedLine: number | undefined;

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

  const setupInsertListener = () => {
    (consoleEmulator as any).on('insert', (log: any) => {
      const logItem = log?.container?.querySelector?.('.luna-console-log-item');
      if (!logItem) return;
      const sourceLine = lineNumberQueue.shift() ?? null;
      if (!sourceLine) return;
      // If badge already exists: Luna re-emitted 'insert' for a dedup (addCount) on the same
      // source+line entry. The queue slot is consumed above; keep the existing badge unchanged.
      if (logItem.querySelector('.console-line-number')) return;
      // Parse "key:line" or "key:line:column". Parse from the right.
      const lastColonIdx = sourceLine.lastIndexOf(':');
      const secondLastColonIdx = sourceLine.lastIndexOf(':', lastColonIdx - 1);
      let filename: string;
      let lineStr: string;
      let colStr: string | undefined;
      if (secondLastColonIdx >= 0) {
        // Format: "key:line:column" or "key:line:col" where line/col are numeric
        filename = sourceLine.slice(0, secondLastColonIdx);
        lineStr = sourceLine.slice(secondLastColonIdx + 1, lastColonIdx);
        colStr = sourceLine.slice(lastColonIdx + 1);
      } else if (lastColonIdx >= 0) {
        // Format: "key:line"
        filename = sourceLine.slice(0, lastColonIdx);
        lineStr = sourceLine.slice(lastColonIdx + 1);
      } else {
        // No colons — shouldn't happen with valid input
        filename = '';
        lineStr = '';
      }
      const lineNumber = parseInt(lineStr, 10);
      const columnNumber: number | undefined = colStr ? parseInt(colStr, 10) : undefined;
      const hasColumn = colStr !== undefined && !isNaN(Number(colStr));
      if (filename && !isNaN(lineNumber)) {
        const badge = document.createElement('a');
        badge.href = '#';
        badge.className = 'console-line-number';
        badge.textContent = `${filename}:${lineStr}`;

        badge.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.dispatchEvent(
            new CustomEvent(customEvents.consoleNavigate, {
              detail: {
                editorId: filename,
                line: lineNumber,
                column: hasColumn ? columnNumber : undefined,
              },
            }),
          );
        });
        (logItem as HTMLElement).appendChild(badge);
      }
    });
  };

  const createConsoleEmulator = () => {
    if (consoleEmulator) {
      consoleEmulator.destroy();
      // asyncRender: false is required so that Luna's lastLog dedup check runs synchronously
      // before we reset it for the next message. With async rendering, the reset races the check.
      consoleEmulator = new LunaConsole(consoleElement, {
        theme: config.theme,
        asyncRender: false,
      });
      setupInsertListener();
      return consoleEmulator;
    }

    consoleEmulator = new LunaConsole(consoleElement, {
      theme: config.theme,
      asyncRender: false,
    });
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
          lastProcessedLine = undefined;
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
              const source = message.source;
              const rawLineNumber = toPositiveLineNumber(message.lineNumber);
              const rawColumnNumber = toPositiveLineNumber(message.columnNumber);
              if (!rawLineNumber) {
                lineNumberQueue.push(null);
                (consoleEmulator as any)[message.method](...args);
                updateMark();
                return;
              }
              // Prefer the filename reported by the sandbox (multi-file projects,
              // where each module is a separate data URL with its own source map).
              // Fall back to the first source-map key (single-file script) or the
              // source. Markup-inline call sites must NOT be remapped through a
              // script source map — keep their 'markup' source as-is.
              const messageFilename =
                typeof message.filename === 'string' ? message.filename : undefined;
              const hasMap = !!sourceMapsRecord && Object.keys(sourceMapsRecord).length > 0;
              const mapKey =
                // A filename reported by the sandbox is the most specific key: when it
                // has a source map it is used for mapping; otherwise (e.g. a plain `.js`
                // file with no map) the raw line is already correct, so still label it.
                messageFilename ??
                (hasMap && source !== 'markup'
                  ? Object.keys(sourceMapsRecord!)[0] ?? 'script'
                  : undefined) ??
                source;
              let lineNumber: number = rawLineNumber;
              let columnNumber: number | undefined = rawColumnNumber;
              const hasColumn = columnNumber !== undefined;
              const rawMap = hasMap && mapKey ? sourceMapsRecord![mapKey] : undefined;
              if (rawMap) {
                if (columnNumber !== undefined) {
                  const position = getOriginalPosition(rawMap, rawLineNumber, columnNumber);
                  if (position) {
                    lineNumber = position.line;
                    columnNumber = position.column;
                  }
                } else {
                  const mappedLine = toPositiveLineNumber(
                    getSourceLineMap(mapKey!)?.get(rawLineNumber),
                  );
                  if (mappedLine) {
                    lineNumber = mappedLine;
                  }
                }
              }
              const columnSuffix = hasColumn ? `:${columnNumber}` : '';
              lineNumberQueue.push(`${mapKey}:${lineNumber}${columnSuffix}`);
              // Break Luna's deduplication when the badge identity (file+line) changes.
              // Only identical messages from the same file+line (e.g. a loop) are grouped.
              if (lastProcessedSource !== mapKey || lastProcessedLine !== lineNumber) {
                (consoleEmulator as any).lastLog = null;
                lastProcessedSource = mapKey;
                lastProcessedLine = lineNumber;
              }
            } else if (!message.silent) {
              // Non-display methods that DO produce a Luna DOM entry (group, count, dir, etc.)
              // still need a queue slot so the FIFO stays aligned.
              // Silent methods (time, assert(true), table with no args) produce no DOM entry
              // and must not push — otherwise the queue drifts.
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
    setSourceMap: (sourceMaps: Record<string, string> | null | undefined) => {
      // null  = plain JS (accurate raw lines, no mapping needed) → enable line numbers
      // undefined = suppress (Python, Ruby, WASM, etc.)          → disable line numbers
      // Record   = compiled language with source maps            → enable + map lines
      // Keys today: { script: '...' }. Multi-file future: { 'tax-calculator.ts': '...', 'test.js': '...' }
      sourceMapsRecord = sourceMaps;
      sourceLineMapsCache.clear();
      lineNumbersEnabled = sourceMaps !== undefined;
      // Reset queue state on each run so stale slots from the previous run
      // (e.g. a 'time' call that was later removed) don't shift badges.
      lineNumberQueue.length = 0;
      lastProcessedSource = null;
      lastProcessedLine = undefined;
    },
    log: (...args) => exec(() => consoleEmulator?.log(...args)),
    info: (...args) => exec(() => consoleEmulator?.info(...args)),
    table: (...args) => exec(() => consoleEmulator?.table(...args)),
    warn: (...args) => exec(() => consoleEmulator?.warn(...args)),
    error: (...args) => exec(() => consoleEmulator?.error(...args)),
    clear: (silent) => {
      lineNumberQueue.length = 0;
      lastProcessedSource = null;
      lastProcessedLine = undefined;
      exec(() => consoleEmulator?.clear(silent));
    },
    // filterLog: (filter) => exec(() => consoleEmulator?.filterLog(filter)),
    evaluate: (code) => exec(() => consoleEmulator?.evaluate(code)),
  };
};
