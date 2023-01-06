// eslint-disable-next-line import/no-internal-modules
import { createPlayground, EmbedOptions } from '../../src/sdk';

export type LiveCodesStory = EmbedOptions & { attrs: any };

export const createLiveCodes = ({ attrs = {}, ...options }: LiveCodesStory) => {
  const container = document.createElement('div');
  Object.keys(attrs).forEach((attr) => {
    container.setAttribute(attr, String(attrs[attr]));
  });
  createPlayground(container, options);
  return container;
};
