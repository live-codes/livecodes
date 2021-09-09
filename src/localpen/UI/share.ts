import { createEventsManager } from '../events';
import { shareScreen } from '../html';
import { ShareData } from '../models';
import { createNotifications } from '../notifications';
import { copyToClipboard, getAbsoluteUrl } from '../utils';

interface Service {
  name: string;
  icon: string;
  createShareUrl?: (options: ShareData) => string;
  onClick?: (options: ShareData) => void;
}

const encode = encodeURIComponent;

export const createShareContainer = (
  shareData: ShareData,
  baseUrl: string,
  eventsManager: ReturnType<typeof createEventsManager>,
  notifications: ReturnType<typeof createNotifications>,
) => {
  const copyUrl = (data: ShareData) => {
    const copySucceeded = copyToClipboard(data.url);
    if (copySucceeded) {
      notifications.success('URL copied to clipboard');
    } else {
      notifications.error('Copy to clipboard failed!');
    }
  };

  const services: Service[] = [
    {
      name: 'Facebook',
      icon: 'facebook.svg',
      createShareUrl: ({ url }) => `https://www.facebook.com/sharer.php?u=${encode(url)}`,
    },
    {
      name: 'Twitter',
      icon: 'twitter.svg',
      createShareUrl: ({ url, title }) =>
        `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(title)}`,
    },
    {
      name: 'Hacker News',
      icon: 'hacker-news.svg',
      createShareUrl: ({ url, title }) =>
        `https://news.ycombinator.com/submitlink?u=${encode(url)}&t=${encode(title)}`,
    },
    {
      name: 'Reddit',
      icon: 'reddit.svg',
      createShareUrl: ({ url, title }) =>
        `https://www.reddit.com/submit?url=${encode(url)}&title=${encode(title)}`,
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin.svg',
      createShareUrl: ({ url, title }) =>
        `https://www.linkedin.com/shareArticle?url=${encode(url)}&title=${encode(
          title,
        )}&mini=true&source=LocalPen`,
    },
    {
      name: 'Dev.to',
      icon: 'dev.svg',
      createShareUrl: ({ url, title }) =>
        `https://dev.to/new?prefill=${encode(
          '---\ntitle: ' + title + '\npublished: true\ntags: localpen\n---\n\n\n\n' + url,
        )}`,
    },
    {
      name: 'Tumblr',
      icon: 'tumblr.svg',
      createShareUrl: ({ url, title }) => `
      https://www.tumblr.com/share/link?url=${encode(url)}&name=${encode(title)}`,
    },
    {
      name: 'Pinterest',
      icon: 'pinterest.svg',
      createShareUrl: ({ url, title }) =>
        `https://pinterest.com/pin/create/bookmarklet/?url=${encode(url)}&description=${encode(
          title,
        )}`,
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp.svg',
      createShareUrl: ({ url, title }) =>
        `https://api.whatsapp.com/send?text=${encode(title)} ${encode(url)}`,
    },
    {
      name: 'Telegram',
      icon: 'telegram.svg',
      createShareUrl: ({ url, title }) =>
        `https://t.me/share/url?url=${encode(url)}&text=${encode(title)}`,
    },
    {
      name: 'Pocket',
      icon: 'pocket.svg',
      createShareUrl: ({ url, title }) =>
        `https://getpocket.com/save?url=${encode(url)}&title=${encode(title)}`,
    },
    {
      name: 'Email',
      icon: 'email.svg',
      createShareUrl: ({ url, title }) => `mailto:?subject=${encode(title)}&body=${encode(url)}`,
    },
    {
      name: 'Share via …',
      icon: 'share.svg',
      onClick: ({ url, title }) => navigator.share({ url, title }),
    },
    {
      name: 'Copy URL',
      icon: 'copy.svg',
      onClick: copyUrl,
    },
  ];

  const div = document.createElement('div');
  div.innerHTML = shareScreen;
  const shareContainer = div.firstChild as HTMLElement;
  const input = shareContainer.querySelector<HTMLInputElement>('#share-url-input');
  if (input) {
    input.value = shareData.url;
    eventsManager.addEventListener(input, 'click', function () {
      copyUrl(shareData);
      input.select();
    });
  }

  const items = shareContainer.querySelector('#share-links');
  services.forEach((service) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = service.createShareUrl?.(shareData) || '#';
    link.target = 'blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `
        <img
          src="${getAbsoluteUrl(baseUrl) + 'assets/icons/' + service.icon}"
          alt="${service.name}"
        />
        ${service.name}
      `;

    if (service.onClick) {
      eventsManager.addEventListener(link, 'click', async (event: Event) => {
        event.preventDefault();
        service.onClick?.(shareData);
      });
    }
    item.appendChild(link);
    items?.appendChild(item);

    if (service.name === 'Share via …' && !navigator.share) {
      item.remove();
    }
  });

  return shareContainer;
};
