import { createContext } from 'react';

const eaContainer =
  '<div data-ea-publisher="livecodesio" data-ea-type="image" class="horizontal" data-ea-manual="true"></div>';

export const defaultDocContent = eaContainer;
export const defaultTocContent = '';

export const getNewDocContent = () => eaContainer;

export const getNewTocContent = () => '';

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});
