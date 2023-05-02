import { createContext } from 'react';

const adsContainer =
  '<div data-ea-publisher="livecodesio" data-ea-type="image" class="horizontal" data-ea-manual="true"></div>';

const sponsors = `
<div class="sponsors">
  <div class="sponsors-title">Sponsors</div>
  <ul>
    <li><a href="/docs/sponsor">Your Logo</a></li>
  </ul>
</div>
`;
export const defaultDocContent = adsContainer;
export const defaultTocContent = sponsors;

export const getNewDocContent = () => adsContainer;

export const getNewTocContent = () => sponsors;

export const CustomContentContext = createContext({
  docContent: defaultDocContent,
  tocContent: defaultTocContent,
  updateContent: (): void => undefined,
});
