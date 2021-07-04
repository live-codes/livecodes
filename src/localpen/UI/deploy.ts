import { createEventsManager } from '../events';
import { deployScreen } from '../html';

export const createDeployContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = deployScreen;
  const deployContainer = div.firstChild as HTMLElement;

  const tabs = deployContainer.querySelectorAll<HTMLElement>('#deploy-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#deploy-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = deployContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return deployContainer;
};
