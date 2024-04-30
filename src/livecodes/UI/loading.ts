// eslint-disable-next-line import/no-internal-modules
import { markElementForTranslation } from '../i18n/utils';

export const loadingMessage = (message = 'Loading...') => {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = message;
  loadingDiv.classList.add('modal-message');
  markElementForTranslation(loadingDiv, 'generic.loading');
  return loadingDiv;
};
