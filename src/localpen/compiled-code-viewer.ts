import { createEventsManager } from './events';
import { Editors, Pen, Tool } from './models';

export const createCompiledCodeViewer = (
  _config: Pen,
  _editors: Editors,
  _eventsManager: ReturnType<typeof createEventsManager>,
): Tool => {
  let compiledCodeElement: HTMLElement;
  const createElements = () => {
    if (compiledCodeElement) return;

    const toolsPaneSelector = '#output #tools-pane';
    const toolsPaneElement = document.querySelector(toolsPaneSelector);
    if (!toolsPaneElement) {
      throw new Error('Cannot find element with selector: ' + toolsPaneSelector);
    }

    const container = document.createElement('div');
    container.id = 'compiled-code-container';
    toolsPaneElement.appendChild(container);

    compiledCodeElement = document.createElement('div');
    compiledCodeElement.id = 'console';
    compiledCodeElement.innerHTML = 'Compiled Code here!';
    container.appendChild(compiledCodeElement);
  };

  const load = async () => {
    createElements();
  };

  return {
    title: 'Compiled',
    load,
    onActivate: () => {
      //
    },
    onDeactivate: () => {
      //
    },
  } as Tool;
};
