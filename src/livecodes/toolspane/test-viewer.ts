import { Config, Editors, EventsManager, Tool } from '../models';

export const createTestViewer = (
  config: Config,
  baseUrl: string,
  _editors: Editors,
  eventsManager: EventsManager,
  isEmbed: boolean,
): Tool => {
  let testViewerElement: HTMLElement;

  const createElements = () => {
    if (testViewerElement) return;

    const toolsPaneSelector = '#output #tools-pane';
    const toolsPaneElement = document.querySelector(toolsPaneSelector);
    if (!toolsPaneElement) {
      throw new Error('Cannot find element with selector: ' + toolsPaneSelector);
    }

    const container = document.createElement('div');
    container.id = 'test-container';
    toolsPaneElement.appendChild(container);

    const testActions = document.createElement('div');
    testActions.id = 'test-actions';
    testActions.innerHTML = `
    <button id="edit-tests-btn">Edit Tests</button>
    <button>Run Tests</button>
    <button>Reset</button>
    `;
    container.appendChild(testActions);

    testViewerElement = document.createElement('div');
    testViewerElement.id = 'test-viewer';
    testViewerElement.classList.add('luna-console');
    testViewerElement.innerHTML = 'hi test!';
    container.appendChild(testViewerElement);
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
