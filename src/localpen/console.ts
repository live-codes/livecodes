import LunaConsole from 'luna-console';
import Split from 'split.js';
import { createEventsManager } from './events';
import { Pen } from './models';

export const createConsole = (
  consoleSelector: string,
  sourceSelector: string,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  let consoleSplit: ReturnType<typeof Split>;
  let consoleEmulator: InstanceType<typeof LunaConsole>;
  let status: Pen['console'];

  const consoleElement = document.querySelector(consoleSelector) as HTMLElement;
  const result = document.querySelector('#result') as HTMLElement;

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
      if (message.type === 'console' && message.method in consoleEmulator) {
        consoleEmulator[message.method as keyof typeof consoleEmulator](
          ...convertTypes(message.args),
        );
      }
    });
    return consoleEmulator;
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
  };

  const load = (newStatus: Pen['console']) => {
    const initialLoad = !status;
    status = newStatus;
    consoleSplit = createConsoleSplit();
    consoleEmulator = createConsoleEmulator();
    if (initialLoad) {
      consoleSplit.setSizes(sizes[status]);
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
