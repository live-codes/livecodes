/* eslint-disable import/no-internal-modules */
import type { EmbedOptions } from '../temp/imports';
import { createPlayground } from '../temp/livecodes';
import { createStory } from './create-story';

export { defaultConfig, languages, starterTemplates } from '../temp/livecodes';
export type LiveCodesArgs = EmbedOptions & { attrs?: any };

const createLiveCodes = ({ attrs = {}, ...options }: LiveCodesArgs) => {
  const container = document.createElement('div');
  Object.keys(attrs).forEach((attr) => {
    container.setAttribute(attr, String(attrs[attr]));
  });
  createPlayground(container, options);
  return container;
};

export const livecodesStory = createStory(createLiveCodes);
