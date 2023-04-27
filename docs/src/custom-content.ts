import { createContext } from 'react';

export const defaultDocContent = '';
export const defaultTocContent = '';

export const getNewDocContent = () => '';

export const getNewTocContent = () => '';

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});
