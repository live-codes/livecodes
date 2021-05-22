import { createEventsManager } from '../events';
import { templatesScreen } from '../html';
import { Template } from '../models';

export const createTemplatesContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = templatesScreen;
  const templatesContainer = div.firstChild as HTMLElement;

  const tabs = templatesContainer.querySelectorAll('#templates-tabs li') as NodeListOf<HTMLElement>;
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      (document.querySelectorAll('#templates-screens > div') as NodeListOf<HTMLElement>).forEach(
        (screen) => {
          screen.classList.remove('active');
        },
      );
      const target = templatesContainer.querySelector('#' + tab.dataset.target) as HTMLElement;
      target.classList.add('active');
      target.querySelector('input')?.focus();
    });
  });
  return templatesContainer;
};

export const createStarterTemplateLink = (
  template: Template,
  starterTemplatesList: HTMLElement | null,
) => {
  const li = document.createElement('li') as HTMLElement;
  const link = document.createElement('a') as HTMLAnchorElement;
  link.href = '?template=' + template.name;
  link.innerHTML = `
<img src="${baseUrl + template.thumbnail}" />
<div>${template.title}</div>
`;
  li.appendChild(link);
  starterTemplatesList?.appendChild(li);
  return link;
};

export const getStarterTemplatesList = () =>
  document.querySelector<HTMLElement>('#starter-templates-list');

export const getUserTemplatesScreen = () =>
  document.querySelector('#templates-user .modal-screen') as HTMLElement;
