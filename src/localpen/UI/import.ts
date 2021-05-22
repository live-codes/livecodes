import { createEventsManager } from '../events';
import { importScreen } from '../html';

export const createImportContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = importScreen;
  const importContainer = div.firstChild as HTMLElement;

  const tabs = importContainer.querySelectorAll<HTMLElement>('#import-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#import-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = importContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return importContainer;
};
