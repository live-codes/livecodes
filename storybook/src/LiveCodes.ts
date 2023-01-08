/* eslint-disable import/no-internal-modules */
import { createPlayground, EmbedOptions } from '../../src/sdk';
// eslint-disable-next-line import/no-internal-modules
import { createStory } from './create-story';

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
