import { templatesScreen } from '../html';
import type { EventsManager, Template } from '../models';

export const createTemplatesContainer = (
  eventsManager: EventsManager,
  loadUserTemplates: () => void,
) => {
  const div = document.createElement('div');
  div.innerHTML = templatesScreen;
  const templatesContainer = div.firstChild as HTMLElement;

  const tabs = templatesContainer.querySelectorAll<HTMLElement>('#templates-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#templates-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = templatesContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      if (tab.dataset.target === 'templates-user') {
        loadUserTemplates();
      }
    });
  });
  return templatesContainer;
};

export const createStarterTemplateLink = (
  template: Template,
  starterTemplatesList: HTMLElement | null,
  baseUrl: string,
) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.href = '?template=' + template.name;
  link.innerHTML = `
<img src="${baseUrl + template.thumbnail}" />
<div>${template.title}</div>
`;
  li.appendChild(link);
  starterTemplatesList?.appendChild(li);
  return link;
};

export const noUserTemplates = () => `
<div class="modal-message no-data">
  <div class="description alert">${window.deps.translateString('templates.noUserTemplates.heading', 'You have no saved templates.')}</div>
  <div class="description help">
    ${window.deps.translateString(
      'templates.noUserTemplates.desc',
      'You can save a project as a template from <wbr />(App&nbsp;menu&nbsp;&gt;&nbsp;Save&nbsp;as&nbsp;&gt; Template).',
      {
        isHTML: true,
      },
    )}
  </div>
</div>
`;
