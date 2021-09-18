import { createEventsManager } from '../events';
import { infoScreen } from '../html';
import { createModal } from '../modal';
import { Config } from '../models';
import { createStorage } from '../storage';
import * as UI from '../UI';
import { loadScript, loadStylesheet } from '../utils';

const tagifyStylesUrl = 'https://cdn.jsdelivr.net/npm/@yaireo/tagify@4.7.2/dist/tagify.css';
const tagifyScriptUrl = 'https://cdn.jsdelivr.net/npm/@yaireo/tagify@4.7.2/dist/tagify.min.js';

export const createProjectInfoUI = async (
  config: Config,
  storage: ReturnType<typeof createStorage>,
  modal: ReturnType<typeof createModal>,
  eventsManager: ReturnType<typeof createEventsManager>,
  onSave: (title: string, description: string, tags: string[]) => void,
) => {
  const div = document.createElement('div');
  div.innerHTML = infoScreen;
  const projectInfoContainer = div.firstChild as HTMLElement;
  modal.show(projectInfoContainer);

  const titleInput = UI.getInfoTitleInput();
  titleInput.value = config.title;
  titleInput.focus();

  const descriptionTextarea = UI.getInfoDescription();
  descriptionTextarea.value = config.description;

  const tagsInput = UI.getInfoTagsInput();
  tagsInput.value = config.tags.join(', ');

  const getTags = (value: string) => {
    try {
      return JSON.parse(value).map((tag: { value: string }) => tag.value);
    } catch {
      // tagify is not loaded
      return value.split(',').map((tag: string) => tag.trim());
    }
  };

  eventsManager.addEventListener(UI.getSaveInfoButton(), 'click', async () => {
    UI.getProjectTitleElement().textContent = titleInput.value;
    onSave(titleInput.value, descriptionTextarea.value, getTags(tagsInput.value));
    modal.close();
  });

  loadStylesheet(tagifyStylesUrl, 'tagify-styles');
  await loadScript(tagifyScriptUrl, 'Tagify');
  const Tagify = (window as any).Tagify;
  if (Tagify) {
    new Tagify(tagsInput, {
      whitelist: Array.from(
        new Set(
          storage
            .getList()
            .map((item) => item.tags)
            .flat(),
        ),
      ).sort((a, b) => (b > a ? -1 : 1)),
      dropdown: {
        maxItems: 40,
        enabled: 0,
        closeOnSelect: false,
        highlightFirst: true,
      },
    });
  }
};
