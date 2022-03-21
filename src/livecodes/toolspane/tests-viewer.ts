import { Config, Editors, EventsManager, Tool } from '../models';

export const createTestsViewer = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
): Tool => {
  let testsViewerElement: HTMLElement;

  const createElements = () => {
    if (testsViewerElement) return;

    const toolsPaneSelector = '#output #tools-pane';
    const toolsPaneElement = document.querySelector(toolsPaneSelector);
    if (!toolsPaneElement) {
      throw new Error('Cannot find element with selector: ' + toolsPaneSelector);
    }

    const container = document.createElement('div');
    container.id = 'tests-container';
    toolsPaneElement.appendChild(container);

    testsViewerElement = document.createElement('div');
    testsViewerElement.id = 'tests-viewer';
    testsViewerElement.innerHTML = 'hi tests!';
    container.appendChild(testsViewerElement);
  };

  return {
    title: 'Tests',
    load: async () => {
      createElements();
    },
    onActivate: () => {
      //
    },
    onDeactivate: () => {
      //
    },
  };
};
