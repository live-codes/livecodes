import Split from 'split.js';
import type {
  Editors,
  Config,
  ToolList,
  ToolsPaneStatus,
  EventsManager,
  ToolsPane,
  Tool,
} from '../models';
import { getResultElement, getToolspaneBar } from '../UI';
import { createCompiledCodeViewer } from './compiled-code-viewer';
import { createConsole } from './console';
import { createTestViewer } from './test-viewer';

export const createToolsPane = (
  config: Config,
  baseUrl: string,
  editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
  runTests: () => Promise<void>,
  setTools: (tools: Config['tools']) => void,
): ToolsPane => {
  let toolsSplit: Split.Instance;
  let status: ToolsPaneStatus;
  let activeToolId = 0;

  const fullList: ToolList = [
    {
      name: 'console',
      factory: createConsole,
    },
    {
      name: 'compiled',
      factory: createCompiledCodeViewer,
    },
    {
      name: 'tests',
      factory: createTestViewer,
    },
  ];

  const isEnabled = (tool: ToolList[number]) =>
    config.tools.enabled === 'all' || config.tools.enabled?.includes(tool.name) === true;

  const toolList: ToolList = fullList.filter(isEnabled);

  const populateTools = (
    config: Config,
    baseUrl: string,
    editors: Editors,
    eventsManager: EventsManager,
    isEmbed: boolean,
    runTests: () => Promise<void>,
  ) =>
    toolList.map((tool) =>
      tool.factory(config, baseUrl, editors, eventsManager, isEmbed, runTests),
    );

  const allTools = populateTools(config, baseUrl, editors, eventsManager, isEmbed, runTests);
  const tools = [...allTools];

  const result = getResultElement();
  const gutterSize = 30;
  type Sizes = {
    [key in ToolsPaneStatus]: [number, number];
  };

  const sizes: Sizes = {
    closed: [100, 0],
    open: [60, 40],
    full: [0, 100],
    none: [100, 0],
    '': [100, 0],
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

  const updateConfig = () => {
    setTools({
      enabled: tools.length === allTools.length ? 'all' : tools.map((tool) => tool.name),
      active: tools[activeToolId]?.name,
      status,
    });
  };

  const setActiveTool = (toolId: number) => {
    activeToolId = toolId;

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
    updateConfig();
  };

  const sizeChanged = () => {
    const consoleButtons = document.querySelector(
      '#tools-pane-bar #tools-pane-buttons',
    ) as HTMLElement;
    if (toolsSplit.getSizes()[0] > 90) {
      consoleButtons.style.visibility = 'hidden';
    } else {
      if (consoleButtons.style.visibility === 'hidden') {
        consoleButtons.style.visibility = 'visible';
        tools[activeToolId]?.onActivate();
      }
    }
    status =
      status === 'none'
        ? 'none'
        : toolsSplit.getSizes()[0] > 90
          ? 'closed'
          : toolsSplit.getSizes()[0] < 10
            ? 'full'
            : 'open';
    updateConfig();
  };

  const open = (toolId: number, maximize = false) => {
    if (maximize) {
      toolsSplit.collapse(0);
      status = 'full';
    } else {
      toolsSplit.setSizes(sizes.open);
      status = 'open';
    }
    sizeChanged();
    setActiveTool(toolId);
  };

  const close = () => {
    toolsSplit.collapse(1);
    status = 'closed';
    sizeChanged();
    tools.forEach((tool) => tool.onDeactivate());
  };

  const createToolsSplit = () => {
    if (toolsSplit) {
      return toolsSplit;
    }

    toolsSplit = Split(['#result', '#tools-pane'], {
      sizes: sizes.closed,
      minSize: [0, 0],
      gutterSize,
      direction: 'vertical',
      elementStyle: (_dimension, size, gutterSize) => ({
        height:
          size < 15
            ? '0'
            : size > 85
              ? `calc(100% - ${gutterSize * 2}px)`
              : `calc(${size}% - ${gutterSize}px)`,
      }),
      gutterStyle: (_dimension, gutterSize) => ({
        height: `${gutterSize}px`,
      }),
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
      toolTitle.classList.add('tools-pane-title', tool.name);
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
                open(index);
              } else if (!toolTitle.classList.contains('active')) {
                setActiveTool(index);
              } else {
                close();
              }
            }, 300);
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
            open(index);
          } else if (!toolTitle.classList.contains('active')) {
            setActiveTool(index);
          } else {
            close();
          }
        },
        {
          capture: false,
          passive: true,
        },
      );
    });

    eventsManager.addEventListener(
      window,
      'resize',
      () => {
        const toolsPane = document.querySelector('#tools-pane') as HTMLElement;
        if (!toolsPane) return;
        if (toolsSplit.getSizes()[0] < 10) {
          result.style.height = '0';
          toolsPane.style.height = `calc(100% - ${gutterSize}px)`;
        } else if (toolsSplit.getSizes()[0] > 90) {
          result.style.height = `calc(100% - ${gutterSize}px)`;
          toolsPane.style.height = '0';
        }
        sizeChanged();
      },
      false,
    );

    const loading = document.createElement('div');
    loading.id = 'tools-pane-loading';
    loading.style.display = 'none';
    toolsPaneBar.appendChild(loading);

    const buttons = document.createElement('div');
    buttons.id = 'tools-pane-buttons';
    toolsPaneBar.appendChild(buttons);

    const btnContainer = document.createElement('span');
    btnContainer.classList.add('hint--top-left');
    btnContainer.dataset.hint = 'Close';
    const closeButton = document.createElement('button');
    closeButton.classList.add('clear-button');
    // Replace with span for icon css¨
    const iconCSS = '<span class="icon-close-button"></span>';
    closeButton.innerHTML = iconCSS;

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
    btnContainer.appendChild(closeButton);
    buttons.appendChild(btnContainer);

    return toolsSplit;
  };

  const resize = (newStatus: ToolsPaneStatus) => {
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
    activeToolId = getToolId(config.tools.active || '');
    status = config.tools.status || 'closed';

    if (initialLoad) {
      toolsSplit = createToolsSplit();
      toolsSplit.setSizes(sizes[status]);
      sizeChanged();
      if (status === 'none') {
        // setHidden(true);
        getToolspaneBar().style.pointerEvents = 'none';
      }
      tools.forEach(async (tool) => {
        await tool.load();
      });
    }
    setActiveTool(activeToolId);
  };

  const getToolId = (name: Tool['name'] | '') => {
    const id = tools.findIndex((t) => t?.name === name);
    return id > -1 ? id : 0;
  };

  const disableTool = (name: Tool['name']) => {
    const id = tools.findIndex((t) => t?.name === name);
    if (id === -1) return;
    delete tools[id];
    if (activeToolId === id) {
      setActiveTool(tools.findIndex((t) => t));
    }
    if (name in api) {
      delete api[name];
    }
    const domTitle = document.querySelector<HTMLElement>('#tools-pane-titles .' + name);
    if (domTitle) {
      domTitle.classList.remove('active');
      domTitle.style.display = 'none';
    }
    if (tools.filter((t) => t).length === 0) {
      resize('none');
    }
    updateConfig();
  };

  const enableTool = (name: Tool['name']) => {
    // wrong title
    const id = allTools.findIndex((t) => t.name === name);
    if (id === -1) return;
    // already enabled
    if (tools.find((t) => t?.name === name)) return;

    if (tools.filter((t) => t).length === 0) {
      resize('closed');
      setActiveTool(id);
    }

    api[name] = allTools[id] as any;
    tools[id] = allTools[id];

    const toolTitle = document.querySelector<HTMLElement>('.tools-pane-title.' + name);
    if (toolTitle) {
      toolTitle.style.display = 'flex';
    }
    updateConfig();
  };

  const api: ToolsPane = {
    load,
    open: () => resize('open'),
    close: () => resize('closed'),
    maximize: () => resize('full'),
    hide: () => resize('none'),
    getStatus: () => status,
    getActiveTool: () => tools[activeToolId]?.name,
    setActiveTool: (title: Tool['name']) => setActiveTool(getToolId(title)),
    disableTool,
    enableTool,
    // console, compiled, tests
    ...toolList.reduce((acc, tool, index) => ({ ...acc, [tool.name]: tools[index] }), {}),
  };

  return api;
};
