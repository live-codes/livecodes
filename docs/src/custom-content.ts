// eslint-disable-next-line import/no-unresolved
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { createContext } from 'react';
import { createSponsorsList } from './sponsors-list';

const adsContainer =
  '<div data-ea-publisher="livecodesio" data-ea-type="image" class="horizontal" data-ea-manual="true"></div>';

const sponsors = createSponsorsList([]);
export const defaultDocContent = adsContainer;
export const defaultTocContent = sponsors;

export const getNewDocContent = () => adsContainer;

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});

export const loadAds = () => {
  if (!ExecutionEnvironment.canUseDOM) return;

  if ((window as any).ethicalads) {
    (window as any).ethicalads.load();
  } else {
    addEventListener('load', () => {
      (window as any).ethicalads?.load();
    });
  }
};

export const getSponsorsData = async (): Promise<string | undefined> => {
  const url = 'https://blog.livecodes.io/data/sponsors.json';

  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const json = await res.json();
    return json.content || createSponsorsList(json.sponsors || []);
  } catch {
    return;
  }
};
