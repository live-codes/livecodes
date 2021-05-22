import { createEventsManager } from '../events';
import { importScreen } from '../html';

export const createImportContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = importScreen;
  const importContainer = div.firstChild as HTMLElement;

  const tabs = importContainer.querySelectorAll('#import-tabs li') as NodeListOf<HTMLElement>;
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      (document.querySelectorAll('#import-screens > div') as NodeListOf<HTMLElement>).forEach(
        (screen) => {
          screen.classList.remove('active');
        },
      );
      const target = importContainer.querySelector('#' + tab.dataset.target) as HTMLElement;
      target.classList.add('active');
      target.querySelector('input')?.focus();
    });
  });

  return importContainer;
};

export const getUrlImportForm = () => document.querySelector<HTMLFormElement>('#url-import-form');
export const getUrlImportButton = () =>
  document.querySelector('#url-import-btn') as HTMLButtonElement;
export const getUrlImportInput = () => document.querySelector('#code-url') as HTMLInputElement;

export const getImportJsonUrlForm = () =>
  document.querySelector('#json-url-import-form') as HTMLInputElement;
export const getImportJsonUrlButton = () =>
  document.querySelector('#json-url-import-btn') as HTMLInputElement;
export const getImportJsonUrlInput = () => document.querySelector('#json-url') as HTMLInputElement;

export const getImportFileInput = () => document.querySelector('#file-input') as HTMLInputElement;
