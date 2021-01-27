import LunaConsole from 'luna-console';
import Split from 'split.js';
import { createEventsManager } from './events';
import { Pen } from './models';

export const createConsole = (
  status: Pen['console'],
  consoleSelector: string,
  sourceSelector: string,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
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

  const registerConsole = () => {
    if (status === 'none') return;

    const consoleContainer = document.querySelector(consoleSelector) as HTMLElement;
    const consoleEmulator = new LunaConsole(consoleContainer);
    eventsManager.addEventListener(window, 'message', (event: any) => {
      const iframe = document.querySelector(sourceSelector) as HTMLIFrameElement;
      if (!iframe || !consoleContainer || event.source !== iframe.contentWindow) return;
      const message = event.data;
      if (message.type === 'console' && message.method in consoleEmulator) {
        consoleEmulator[message.method as keyof typeof consoleEmulator](
          ...convertTypes(message.args),
        );
      }
    });
    return consoleEmulator;
  };

  const sizes = {
    closed: [95, 5],
    open: [50, 50],
    full: [5, 95],
    none: [100, 0],
  };

  const result = document.querySelector('#result') as HTMLElement;

  const createConsoleWindow = () => {
    if (status === 'none') return;

    const consoleSplit = Split(['#result', '#console-container'], {
      sizes: sizes[status],
      gutterSize: 30,
      direction: 'vertical',
      onDragStart() {
        result.style.transition = 'none';
      },
      onDragEnd() {
        result.style.transition = 'height 0.5s';
      },
    });

    const consoleBar = document.querySelector('#output .gutter') as HTMLElement;
    consoleBar.id = 'console-bar';
    const consoleTitle = document.createElement('div');
    consoleTitle.id = 'console-title';
    consoleTitle.innerHTML = 'Console';
    let timer: any;
    eventsManager.addEventListener(
      consoleTitle,
      'click',
      (event: any) => {
        if (event.detail === 1) {
          timer = setTimeout(() => {
            if (consoleSplit.getSizes()[0] > 90) {
              consoleSplit.setSizes([50, 50]);
            } else {
              consoleSplit.collapse(1);
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
        } else {
          consoleSplit.collapse(0);
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
        } else if (consoleSplit.getSizes()[0] > 90) {
          consoleSplit.collapse(1);
        }
      },
      false,
    );

    consoleBar.appendChild(consoleTitle);
    return consoleSplit;
  };

  const consoleSplit = createConsoleWindow();
  const consoleEmulator = registerConsole();

  const resize = (newStatus: Pen['console']) => {
    consoleSplit?.setSizes(sizes[newStatus]);
    if (newStatus === 'closed') {
      result.style.height = 'calc(100% - 30px)';
    }

    if (newStatus === 'none') {
      consoleSplit?.destroy();
      document.querySelector(consoleSelector)?.parentElement?.remove();
      result.style.height = '100%';
      result.style.minHeight = '100%';
    }

    status = newStatus;
  };

  resize(status);

  return {
    open: () => resize('open'),
    close: () => resize('closed'),
    maximize: () => resize('full'),
    destroy: () => resize('none'),
    log: (...args: any[]) => consoleEmulator?.log(...args),
    info: (...args: any[]) => consoleEmulator?.info(...args),
    table: (...args: any[]) => consoleEmulator?.table(...args),
    warn: (...args: any[]) => consoleEmulator?.warn(...args),
    error: (...args: any[]) => consoleEmulator?.error(...args),
    clear: () => consoleEmulator?.clear(),
    evaluate: (code: string) => consoleEmulator?.evaluate(code),
  };
};
