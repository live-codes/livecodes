import { templatesScreen } from '../html';
import type { EventsManager, Template } from '../models';
import { debounce, loadScript } from '../utils/utils';
import { flexSearchUrl } from '../vendors';
import { getTemplatesSearchInput } from './selectors';

let searchIndex: Promise<any> | undefined;

export const createTemplatesContainer = (eventsManager: EventsManager) => {
  const div = document.createElement('div');
  div.innerHTML = templatesScreen;
  const templatesContainer = div.firstChild as HTMLElement;

  const tabs = templatesContainer.querySelectorAll<HTMLElement>('#templates-tabs li');
  tabs.forEach((tab) => {
    const link = tab.querySelector('a');
    if (!link) return;
    eventsManager.addEventListener(link, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#templates-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = templatesContainer.querySelector('#' + link.dataset.target);
      target?.classList.add('active');
    });
  });
  setupTemplatesSearch(templatesContainer);
  return templatesContainer;
};

export const createStarterTemplateLink = (
  template: Template & { id: string },
  starterTemplatesList: HTMLElement | null,
  baseUrl: string,
) => {
  const li = document.createElement('li');
  li.dataset.id = template.id;
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

export const initTemplatesSearchIndex = () => {
  searchIndex = loadScript(flexSearchUrl, 'FlexSearch').then(
    async (FlexSearch: any) =>
      new FlexSearch.Document({
        index: ['name', 'title', 'description', 'aliases', 'tags', 'languages'],
        tokenize: 'full',
        worker: true,
      }),
  );
};

export const addTemplateToIndex = ({
  id,
  title,
  name = '',
  description = '',
  aliases = [],
  tags = [],
  languages = [],
}: {
  id: string;
  title: string;
  name?: string;
  description?: string;
  aliases?: string[];
  tags?: string[];
  languages?: string[];
}) => {
  searchIndex?.then((index) => {
    index.add({ id, name, title, description, aliases, tags, languages });
  });
};

export const setupTemplatesSearch = (container: HTMLElement) => {
  const input = getTemplatesSearchInput(container);
  if (!input) return;

  const filterTemplates = (query: string) => {
    searchIndex?.then(async (index) => {
      const mainItems = container.querySelectorAll(
        '#templates-starter li',
      ) as NodeListOf<HTMLElement>;
      const userItems = container.querySelectorAll('#templates-user li') as NodeListOf<HTMLElement>;
      const items = Array.from(mainItems).concat(Array.from(userItems));

      const result =
        query === ''
          ? null
          : (await index.searchAsync(query)).map((field: any) => field.result).flat();

      items.forEach((item) => {
        (item as HTMLElement).style.display =
          query === '' || result.includes(item.dataset.id as string) ? '' : 'none';
      });
    });
  };

  const debouncedFilter = debounce((val: string) => {
    filterTemplates(val.trim());
  }, 150);

  input.addEventListener('input', (e: Event) => {
    const val = (e.target as HTMLInputElement).value || '';
    debouncedFilter(val);
  });
};
