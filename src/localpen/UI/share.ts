import { createEventsManager } from '../events';
import { shareScreen } from '../html';
import { getAbsoluteUrl } from '../utils';

export const createShareContainer = (
  shareData: { title: string; url: string },
  eventsManager: ReturnType<typeof createEventsManager>,
  baseUrl: string,
  copyUrl: (url: string) => void,
) => {
  const div = document.createElement('div');
  div.innerHTML = shareScreen.replace(/{{ __localpen_baseUrl__ }}/g, getAbsoluteUrl(baseUrl));
  const shareContainer = div.firstChild as HTMLElement;

  shareContainer.querySelectorAll('a').forEach((link) => {
    switch (link.dataset.service) {
      case 'facebook':
        link.href = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(shareData.url);
        break;
      case 'twitter':
        link.href =
          'https://twitter.com/intent/tweet?url=' +
          encodeURIComponent(shareData.url) +
          '&text=' +
          encodeURIComponent(shareData.title);
        break;
      case 'hacker-news':
        link.href =
          'https://news.ycombinator.com/submitlink?u=' +
          encodeURIComponent(shareData.url) +
          '&t=' +
          encodeURIComponent(shareData.title);
        break;
      case 'reddit':
        link.href =
          'https://www.reddit.com/submit?url=' +
          encodeURIComponent(shareData.url) +
          '&title=' +
          encodeURIComponent(shareData.title);
        break;
      case 'linkedin':
        link.href =
          'https://www.linkedin.com/shareArticle?url=' +
          encodeURIComponent(shareData.url) +
          '&mini=true&source=LocalPen&title=' +
          encodeURIComponent(shareData.title);
        break;
      case 'dev':
        link.href =
          'https://dev.to/new?prefill=' +
          encodeURIComponent(
            '---\ntitle: ' +
              shareData.title +
              '\npublished: true\ntags: localpen\n---\n\n\n\n' +
              shareData.url,
          );
        break;
      case 'share':
        if (!navigator.share) {
          link.parentElement?.remove();
        } else {
          eventsManager.addEventListener(link, 'click', async (event: Event) => {
            event.preventDefault();
            await navigator.share(shareData);
          });
        }
        break;
      case 'copy':
        eventsManager.addEventListener(link, 'click', (event: Event) => {
          event.preventDefault();
          copyUrl(shareData.url);
        });
        break;
    }
  });

  return shareContainer;
};
