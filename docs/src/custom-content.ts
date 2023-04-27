import { createContext } from 'react';

export const defaultDocContent = 'Default Doc Content';
export const defaultTocContent = 'Default TOC Content';

export const getNewDocContent = () => {
  // return '';
  const rnd = Math.floor(Math.random() * 100);
  return 'New Doc content ' + rnd;
};

export const getNewTocContent = () => {
  // return '';
  const rnd = Math.floor(Math.random() * 100);
  return 'New TOC content ' + rnd;
};

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});
