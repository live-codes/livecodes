import { createEventsManager } from '../events';
import * as UI from '../UI';

export const configureEmbed = (
  eventsManager: ReturnType<typeof createEventsManager>,
  shareFn: () => Promise<ShareData>,
) => {
  document.body.classList.add('embed');
  const logoLink = UI.getLogoLink();
  logoLink.title = 'Edit in LiveCodes 🡕';

  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open((await shareFn()).url, '_blank');
  });
};
