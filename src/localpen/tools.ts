import Split from 'split.js';
import { createCompiledCodeViewer } from './compiled-code-viewer';
import { createConsole } from './console';
import { createEventsManager } from './events';
import { Editors, Pen } from './models';

export const createToolsPane = (
  config: Pen,
  editors: Editors,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  const consoleWindow = createConsole(config, editors, eventsManager);
  const compiledCodeViewer = createCompiledCodeViewer(config, editors, eventsManager);
  const tools = [consoleWindow, compiledCodeViewer];

  let toolsSplit: Split.Instance;
  let status: Pen['console'];
  let activeToolId = 0;

  const result = document.querySelector('#result') as HTMLElement;
  type Sizes = {
    [key in Pen['console']]: [number, number];
  };

  const sizes: Sizes = {
    closed: [100, 0],
    open: [60, 40],
    full: [0, 100],
    none: [100, 0],
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
      toolsSplit.collapse(1);
      result.style.minHeight = '100%';
    } else {
      result.style.minHeight = 'unset';
    }
  };

  const setActiveTool = (toolId: number) => {
    document.querySelectorAll('#tools-pane-bar .tools-pane-title').forEach((title, index) => {
      if (toolId === index) {
        title.classList.add('active');
      } else {
        title.classList.remove('active');
      }
    });

    document.querySelectorAll('#tools-pane > div').forEach((container, index) => {
      if (toolId === index) {
        container.classList.add('active');
      } else {
        container.classList.remove('active');
      }
    });

    tools.forEach((tool, index) => {
      if (toolId === index) {
        tool.onActivate();
      } else {
        tool.onDeactivate();
      }
    });
  };

  const sizeChanged = () => {
    const consoleButtons = document.querySelector(
      '#tools-pane-bar #tools-pane-buttons',
    ) as HTMLElement;
    if (toolsSplit.getSizes()[0] > 90) {
      consoleButtons.style.display = 'none';
    } else {
      consoleButtons.style.display = 'unset';
      tools[activeToolId].onActivate();
    }
  };

  const open = (toolId: number, maximize = false) => {
    if (maximize) {
      toolsSplit.collapse(0);
    } else {
      toolsSplit.setSizes(sizes.open);
    }
    sizeChanged();
    setActiveTool(toolId);
  };

  const close = () => {
    toolsSplit.collapse(1);
    sizeChanged();
    tools.forEach((tool) => tool.onDeactivate());
  };

  const createToolsSplit = () => {
    if (toolsSplit) {
      return toolsSplit;
    }

    toolsSplit = Split(['#result', '#tools-pane'], {
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

    const toolsPaneBar = document.querySelector('#output .gutter') as HTMLElement;
    toolsPaneBar.id = 'tools-pane-bar';

    const toolsPaneTitles = document.createElement('div');
    toolsPaneTitles.id = 'tools-pane-titles';
    toolsPaneBar.appendChild(toolsPaneTitles);

    tools.forEach((tool, index) => {
      const toolTitle = document.createElement('div');
      toolTitle.dataset.id = String(index);
      toolTitle.classList.add('tools-pane-title');
      toolTitle.innerHTML = tool.title;
      toolsPaneTitles.appendChild(toolTitle);

      let timer: any;
      eventsManager.addEventListener(
        toolTitle,
        'click',
        (event: any) => {
          if (event.detail === 1) {
            timer = setTimeout(() => {
              if (toolsSplit.getSizes()[0] > 90) {
                activeToolId = index;
                open(index);
              } else if (!toolTitle.classList.contains('active')) {
                setActiveTool(index);
              } else {
                close();
              }
            }, 200);
          }
        },
        false,
      );
      eventsManager.addEventListener(
        toolTitle,
        'dblclick',
        () => {
          clearTimeout(timer);
          if (toolsSplit.getSizes()[0] < 10) {
            close();
          } else {
            activeToolId = index;
            open(index, true);
          }
        },
        false,
      );
      eventsManager.addEventListener(
        toolTitle,
        'touchstart',
        () => {
          if (toolsSplit.getSizes()[0] > 90) {
            activeToolId = index;
            open(index);
          } else if (!toolTitle.classList.contains('active')) {
            setActiveTool(index);
          } else {
            close();
          }
        },
        false,
      );
    });

    eventsManager.addEventListener(
      window,
      'resize',
      () => {
        if (toolsSplit.getSizes()[0] < 10) {
          open(activeToolId, true);
        } else if (toolsSplit.getSizes()[0] > 90) {
          close();
        }
      },
      false,
    );

    const buttons = document.createElement('div');
    buttons.id = 'tools-pane-buttons';
    toolsPaneBar.appendChild(buttons);

    const closeButton = document.createElement('button');
    closeButton.classList.add('delete-button');
    closeButton.title = 'Close';
    eventsManager.addEventListener(
      closeButton,
      'click',
      () => {
        close();
      },
      false,
    );
    eventsManager.addEventListener(
      closeButton,
      'touchstart',
      () => {
        close();
      },
      false,
    );
    buttons.appendChild(closeButton);

    return toolsSplit;
  };

  const resize = (newStatus: Pen['console']) => {
    if (newStatus === 'none') {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (newStatus === 'closed') {
      close();
    } else if (newStatus === 'full') {
      open(activeToolId, true);
    } else if (newStatus === 'open') {
      open(activeToolId);
    }

    status = newStatus;
    sizeChanged();
  };

  const load = async () => {
    const initialLoad = status === undefined;
    status = config.console || 'closed';

    if (initialLoad) {
      toolsSplit = createToolsSplit();
      toolsSplit.setSizes(sizes[status]);
      sizeChanged();
      if (status === 'none') {
        setHidden(true);
      }
    }

    tools.forEach(async (tool) => {
      await tool.load();
    });
  };

  return {
    load,
    open: () => resize('open'),
    close: () => resize('closed'),
    maximize: () => resize('full'),
    hide: () => resize('none'),
    console: consoleWindow,
    compiled: compiledCodeViewer,
  };
};
