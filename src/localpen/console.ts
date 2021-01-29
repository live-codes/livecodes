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

  const sizeChanged = () => {
    const consoleButtons = document.querySelector('#console-bar #console-buttons') as HTMLElement;
    if (consoleSplit.getSizes()[0] > 90) {
      consoleButtons.style.display = 'none';
    } else {
      consoleButtons.style.display = 'unset';
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
            } else {
              consoleSplit.collapse(1);
              sizeChanged();
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
        } else {
          consoleSplit.collapse(0);
          sizeChanged();
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
    sizeChanged();
  };

  const load = (newStatus: Pen['console']) => {
    const initialLoad = !status;
    status = newStatus;
    consoleSplit = createConsoleSplit();
    consoleEmulator = createConsoleEmulator();
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
