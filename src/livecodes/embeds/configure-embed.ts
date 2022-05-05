import { Config } from '../models';
import { createEventsManager } from '../events';
import * as UI from '../UI';

export const configureEmbed = (
  config: Config,
  shareFn: () => Promise<ShareData>,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  document.body.classList.add('embed');
  if (config.mode === 'result') {
    document.body.classList.add('result');
  }

  const logoLink = UI.getLogoLink();
  logoLink.classList.add('hint--bottom-left');
  logoLink.dataset.hint = 'Edit in LiveCodes 🡕';
  logoLink.title = '';

  eventsManager.addEventListener(logoLink, 'click', async (event: Event) => {
    event.preventDefault();
    window.open((await shareFn()).url, '_blank');
  });
};
