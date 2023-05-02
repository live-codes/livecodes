import { createContext } from 'react';

const adsContainer =
  '<div data-ea-publisher="livecodesio" data-ea-type="image" class="horizontal" data-ea-manual="true"></div>';

export const defaultDocContent = adsContainer;
export const defaultTocContent = '';

export const getNewDocContent = () => adsContainer;

export const getNewTocContent = () => '';

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});
