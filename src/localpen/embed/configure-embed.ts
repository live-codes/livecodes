import { createEventsManager } from '../events';
import * as UI from '../UI';

export const isEmbed = () => parent.location.search.indexOf('embed') > -1;

export const configureEmbed = (
  eventsManager: ReturnType<typeof createEventsManager>,
  getShareUrl: (contentOnly: boolean) => string,
) => {
  if (!isEmbed()) return;

  document.body.classList.add('embed');
  const logoLink = UI.getLogoLink();
  logoLink.title = 'Edit in LocalPen 🡕';

  eventsManager.addEventListener(logoLink, 'click', (event: Event) => {
    event.preventDefault();
    window.open(getShareUrl(true), '_blank');
  });
};
