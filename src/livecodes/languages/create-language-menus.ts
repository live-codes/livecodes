import type { createEventsManager } from '../events';
import type { EditorId, Config, Language, Processor, LanguageSpecs, Template } from '../models';
import { languages } from './languages';
import { processors } from './processors';
import { languageIsEnabled, processorIsEnabled } from './utils';

export const createLanguageMenus = (
  config: Config,
  baseUrl: string,
  eventsManager: ReturnType<typeof createEventsManager>,
  showLanguageInfo: (languageInfo: HTMLElement) => void,
  loadStarterTemplate: (templateName: Template['name']) => void,
  importCode: (options: { url: string }) => Promise<boolean>,
) => {
  const editorIds: EditorId[] = ['markup', 'style', 'script'];
  const rootList = document.createElement('ul');
  document.querySelector('#select-editor')?.appendChild(rootList);

  let editorsNumber = editorIds.length;

  editorIds.forEach((editorId) => {
    const editorSelector = document.createElement('li');
    editorSelector.id = editorId + '-selector';
    editorSelector.classList.add('editor-title', 'noselect');
    editorSelector.dataset.editor = editorId;
    editorSelector.tabIndex = 1;
    editorSelector.innerHTML = `
      <span></span>
      <a
        href="javascript:void(0)"
        onclick="event.stopPropagation();"
        tabIndex="1"
        class="language-menu-button hint--bottom"
        data-hint="Change Language"
      >
        <img
          width="20"
          height="20"
          src="${baseUrl}assets/images/down_arrow.svg"
        />
      </a>
    `;
    rootList.appendChild(editorSelector);

    const menuScroller = document.createElement('div');
    menuScroller.classList.add('menu-scroller');
    menuScroller.classList.add('menu-scroller-' + editorId);
    editorSelector.appendChild(menuScroller);

    const languageMenu = document.createElement('ul');
    languageMenu.classList.add('dropdown-menu');
    languageMenu.classList.add('dropdown-menu-' + editorId);
    menuScroller.appendChild(languageMenu);

    const editorLanguages = [...languages]
      .filter((language) => language.editor === editorId)
      .filter((language) => languageIsEnabled(language.name, config));

    if (editorLanguages.length === 0) {
      editorSelector.classList.add('hidden');
      editorsNumber -= 1;
    } else if (editorLanguages.length === 1) {
      const changeLanguageButton =
        editorSelector.querySelector<HTMLElement>('.language-menu-button');
      if (changeLanguageButton) {
        changeLanguageButton.style.display = 'none';
      }
    }

    const enabledProcessors = processors.filter(
      (p) => p.editor === editorId && processorIsEnabled(p.name, config),
    );
    const processorsHeader =
      enabledProcessors.length > 0
        ? {
            name: editorId + '-processors',
            title: 'Processors:',
            longTitle: 'Processors:',
            editor: editorId,
          }
        : undefined;

    if (processorsHeader) {
      editorLanguages.push(processorsHeader as LanguageSpecs);
    }

    editorLanguages.forEach((language) => {
      const languageItem = document.createElement('li');
      languageItem.classList.add('language-item');
      languageMenu.appendChild(languageItem);

      const languageLink = document.createElement('a');
      languageLink.href = '#';
      languageLink.dataset.editor = editorId;
      languageLink.dataset.lang = language.name;
      languageLink.title = language.longTitle || language.title;
      languageLink.innerHTML = language.longTitle || language.title;

      if (!('extensions' in language)) {
        languageLink.classList.add('subtitle');
      }
      if (language.name === ('style-processors' as any)) {
        languageItem.classList.add('column-break');
      }
      languageItem.appendChild(languageLink);

      if (language.info !== false) {
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip', 'hint--bottom-left');
        tooltip.dataset.hint = 'Click for info...';
        tooltip.innerHTML = infoIcon;
        eventsManager.addEventListener(
          tooltip,
          'mousedown',
          async () => {
            const languageInfo = document.createElement('div');
            languageInfo.classList.add('language-info');
            languageInfo.innerHTML = await getLanguageInfo(language.name, baseUrl);
            showLanguageInfo(languageInfo);
            const templateLink: HTMLElement | null = languageInfo.querySelector('a[data-template]');
            const templateName = templateLink?.dataset.template as Template['name'];
            if (templateLink && templateName) {
              eventsManager.addEventListener(
                templateLink,
                'click',
                async (event) => {
                  event.preventDefault();
                  loadStarterTemplate(templateName);
                },
                false,
              );
            }
            const codeLink: HTMLElement | null = languageInfo.querySelector('a[data-code]');
            const codeUrl = codeLink?.dataset.code;
            if (codeLink && codeUrl) {
              eventsManager.addEventListener(
                codeLink,
                'click',
                async (event) => {
                  event.preventDefault();
                  importCode({ url: codeUrl });
                },
                false,
              );
            }
          },
          false,
        );
        languageItem.appendChild(tooltip);
      }
    });
  });

  if (editorsNumber < 3) {
    document.querySelectorAll('.editor-title').forEach((editorSelector) => {
      editorSelector.classList.add('half-width');
    });
  }
};

export const createProcessorItem = (processor: { name: string; title: string }) => {
  const processorItem = document.createElement('li');
  processorItem.classList.add('language-item', 'processor-item');
  processorItem.innerHTML = `
        <label class="switch">
          <span>${processor.title}</span>
          <div>
            <input id="${processor.name}" type="checkbox" data-processor="${processor.name}" />
            <span class="slider round"></span>
          </div>
        </label>
        `;
  return processorItem;
};

const getLanguageInfo = async (language: Language | Processor, baseUrl: string) => {
  const languageInfoHTML = await import(baseUrl + '{{hash:language-info.js}}').then(
    (mod) => mod.languageInfo,
  );
  const domParser = new DOMParser();
  const dom = domParser.parseFromString(languageInfoHTML, 'text/html');
  const info = dom.querySelector(`[data-lang="${language}"]`);
  return info?.innerHTML || '';
};

const infoIcon = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve">
<path style="fill:#5a6074da;" d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085
	c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z"/>
<g>
	<path style="fill:#FFFFFF;" d="M315.249,359.555c-1.387-2.032-4.048-2.755-6.27-1.702c-24.582,11.637-52.482,23.94-57.958,25.015
		c-0.138-0.123-0.357-0.348-0.644-0.737c-0.742-1.005-1.103-2.318-1.103-4.015c0-13.905,10.495-56.205,31.192-125.719
		c17.451-58.406,19.469-70.499,19.469-74.514c0-6.198-2.373-11.435-6.865-15.146c-4.267-3.519-10.229-5.302-17.719-5.302
		c-12.459,0-26.899,4.73-44.146,14.461c-16.713,9.433-35.352,25.41-55.396,47.487c-1.569,1.729-1.733,4.314-0.395,6.228
		c1.34,1.915,3.825,2.644,5.986,1.764c7.037-2.872,42.402-17.359,47.557-20.597c4.221-2.646,7.875-3.989,10.861-3.989
		c0.107,0,0.199,0.004,0.276,0.01c0.036,0.198,0.07,0.5,0.07,0.933c0,3.047-0.627,6.654-1.856,10.703
		c-30.136,97.641-44.785,157.498-44.785,182.994c0,8.998,2.501,16.242,7.432,21.528c5.025,5.393,11.803,8.127,20.146,8.127
		c8.891,0,19.712-3.714,33.08-11.354c12.936-7.392,32.68-23.653,60.363-49.717C316.337,364.326,316.636,361.587,315.249,359.555z"/>
	<path style="fill:#FFFFFF;" d="M314.282,76.672c-4.925-5.041-11.227-7.597-18.729-7.597c-9.34,0-17.475,3.691-24.176,10.971
		c-6.594,7.16-9.938,15.946-9.938,26.113c0,8.033,2.463,14.69,7.32,19.785c4.922,5.172,11.139,7.794,18.476,7.794
		c8.958,0,17.049-3.898,24.047-11.586c6.876-7.553,10.363-16.433,10.363-26.393C321.646,88.105,319.169,81.684,314.282,76.672z"/>
</g>
</svg>`;
