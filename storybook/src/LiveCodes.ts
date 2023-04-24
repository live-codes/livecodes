/* eslint-disable import/no-internal-modules */
import { createPlayground, type EmbedOptions } from '../../src/sdk';
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
