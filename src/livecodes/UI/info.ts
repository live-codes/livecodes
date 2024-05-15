/* eslint-disable import/no-internal-modules */
import { infoScreen } from '../html';
import type { createModal } from '../modal';
import * as UI from '../UI';
import { loadStylesheet, removeDuplicates } from '../utils/utils';
import { tagifyBaseUrl } from '../vendors';
import type { Config } from '../models';
import type { ProjectStorage } from '../storage';

export const getTags = (value: string): string[] => {
  try {
    return JSON.parse(value).map((tag: { value: string }) => tag.value);
  } catch {
    // tagify is not loaded
    return value.split(',').map((tag: string) => tag.trim());
  }
};

export const createProjectInfoUI = async (
  config: Config,
  storage: ProjectStorage,
  modal: ReturnType<typeof createModal>,
  onUpdate: (
    title: string,
    description: string,
    head: string,
    htmlAttrs: string,
    tags: string[],
  ) => void,
) => {
  const div = document.createElement('div');
  div.innerHTML = infoScreen;
  const projectInfoContainer = div.firstChild as HTMLElement;
  modal.show(projectInfoContainer, { onClose: () => updateInfo() });

  const titleInput = UI.getInfoTitleInput();
  titleInput.value = config.title;
  titleInput.focus();

  const descriptionTextarea = UI.getInfoDescription();
  descriptionTextarea.value = config.description;

  const headTextarea = UI.getInfoHead();
  headTextarea.value = config.head;

  const htmlAttrsTextarea = UI.getInfoHtmlAttrs();
  htmlAttrsTextarea.value =
    typeof config.htmlAttrs === 'string'
      ? config.htmlAttrs
      : JSON.stringify(config.htmlAttrs, null, 2);

  const tagsInput = UI.getInfoTagsInput();
  tagsInput.value = removeDuplicates(config.tags).join(', ');

  const updateInfo = async () => {
    UI.getProjectTitleElement().textContent = titleInput.value;
    onUpdate(
      titleInput.value,
      descriptionTextarea.value,
      headTextarea.value,
      htmlAttrsTextarea.value,
      getTags(tagsInput.value),
    );
  };

  loadStylesheet(tagifyBaseUrl + 'tagify.css', 'tagify-styles');

  const Tagify = (await import(tagifyBaseUrl + 'tagify.esm.js')).default;
  if (Tagify) {
    new Tagify(tagsInput, {
      whitelist: Array.from(
        new Set((await storage.getList()).map((item) => item.tags).flat()),
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
