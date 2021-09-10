import { createEventsManager } from '../events';
import * as UI from '../UI';

export const isEmbed = () => parent.location.search.indexOf('embed') > -1;

export const configureEmbed = (
  eventsManager: ReturnType<typeof createEventsManager>,
  shareFn: () => Promise<ShareData>,
) => {
  if (!isEmbed()) return;

  document.body.classList.add('embed');
  const logoLink = UI.getLogoLink();
  logoLink.title = 'Edit in LocalPen 🡕';

  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open((await shareFn()).url, '_blank');
  });
};
