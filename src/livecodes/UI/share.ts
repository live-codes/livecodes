import type { createEventsManager } from '../events';
import { shareScreen } from '../html';
import type { ShareData } from '../models';
import { allowedOrigin } from '../services';
import { copyToClipboard, getAbsoluteUrl, loadScript } from '../utils';
import { qrcodeUrl } from '../vendors';
import { getQrCodeContainer } from './selectors';

interface Service {
  name: string;
  icon: string;
  createShareUrl?: (options: ShareData) => string;
  onClick?: (options: ShareData) => void;
}

const encode = encodeURIComponent;

export const createShareContainer = async (
  shareFn: (shortUrl: boolean) => Promise<ShareData>,
  baseUrl: string,
  eventsManager: ReturnType<typeof createEventsManager>,
) => {
  let messageTimeout: any;
  const copyUrl = (url?: string) => {
    if (!url || !copyToClipboard(url)) {
      setMessage('Copy to clipboard failed!');
    }
    setMessage('URL copied to clipboard');
    messageTimeout = setTimeout(() => {
      setMessage('Click to copy');
    }, 5000);
  };

  const generateQrCode = async () => {
    const qrcodeContainer = getQrCodeContainer();
    items!.style.visibility = 'hidden';
    qrcodeContainer.style.display = 'flex';
    if (qrcodeImg) {
      shareExpiry?.classList.add('short-url');
      if (input && shareDataShort) {
        input.value = shareDataShort.url;
      }
      return;
    }
    await generateShortUrl();
    const qrcode: any = await loadScript(qrcodeUrl, 'qrcode');
    const typeNumber = 0;
    const errorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(shareDataShort.url);
    qr.make();
    qrcodeImg = qr.createImgTag(6, 10);
    qrcodeContainer.innerHTML = qrcodeImg;
  };

  const populateItems = (shareData: ShareData, services: Service[], items: HTMLElement | null) => {
    if (!items) return;
    items.innerHTML = '';
    services.forEach((service) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = service.createShareUrl?.(shareData) || '#';
      link.target = 'blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `
        <span class="share-image-container">
          <img
            src="${getAbsoluteUrl(baseUrl) + 'assets/icons/' + service.icon}"
            alt="${service.name}"
          />
        </span>
        ${service.name}
      `;

      if (service.onClick) {
        eventsManager.addEventListener(link, 'click', async (event: Event) => {
          event.preventDefault();
          service.onClick?.(shareData);
        });
      }
      item.appendChild(link);
      items.appendChild(item);

      if (service.name === 'Share via …' && !navigator.share) {
        item.remove();
      }
    });

    if (input) {
      input.value = shareData.url;
    }
    setMessage('Click to copy');
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
        )}&mini=true&source=LiveCodes`,
    },
    {
      name: 'Dev.to',
      icon: 'dev.svg',
      createShareUrl: ({ url, title }) =>
        `https://dev.to/new?prefill=${encode(
          '---\ntitle: ' + title + '\npublished: true\ntags: livecodes\n---\n\n\n\n' + url,
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
      name: 'Copy URL',
      icon: 'copy.svg',
      onClick: ({ url }) => copyUrl(url),
    },
    {
      name: 'QR code',
      icon: 'qr-code.svg',
      onClick: generateQrCode,
    },
    {
      name: 'Share via …',
      icon: 'share.svg',
      onClick: ({ url, title }) => navigator.share({ url, title }),
    },
  ];

  const selfHosted = !allowedOrigin();
  const div = document.createElement('div');

  const shareData = await shareFn(false);
  let shareDataShort: ShareData;
  let qrcodeImg: string;

  const urlLength = shareData.url.length;
  div.innerHTML = shareScreen
    .replace(/{{urlLength}}/g, urlLength)
    .replace(/{{warnClass}}/g, urlLength > 2048 ? 'danger' : 'warn');

  const shareContainer = div.firstChild as HTMLElement;
  if (selfHosted) {
    (shareContainer.querySelector('#share-expiry') as HTMLElement).outerHTML = '';
  } else {
    (shareContainer.querySelector('#share-expiry-self-hosted') as HTMLElement).outerHTML = '';
  }
  const items = shareContainer.querySelector<HTMLElement>('#share-links');
  const clickToCopy = shareContainer.querySelector('#share-click-to-copy') as HTMLElement;
  const input = shareContainer.querySelector<HTMLInputElement>('#share-url-input');
  const shareExpiry = shareContainer.querySelector<HTMLElement>('.share-expiry');
  const shortUrlLink = shareExpiry?.querySelector('.share-permanent-url-expiry a') as HTMLElement;
  const permanentUrlLink = shareExpiry?.querySelector('.share-short-url-expiry a') as HTMLElement;

  const setMessage = (message: string) => {
    if (!clickToCopy) return;
    clearTimeout(messageTimeout);
    clickToCopy.innerHTML = message;
  };

  populateItems(shareData, services, items);

  const generateShortUrl = async (event?: Event) => {
    event?.preventDefault();
    setMessage('Generating URL …');
    try {
      shareDataShort = shareDataShort || (await shareFn(true));
      populateItems(shareDataShort, services, items);
      shareExpiry?.classList.add('short-url');
    } catch {
      setMessage('Failed to generate short URL!');
    }
  };

  eventsManager.addEventListener(shortUrlLink, 'click', generateShortUrl);

  eventsManager.addEventListener(permanentUrlLink, 'click', (event: Event) => {
    event.preventDefault();
    populateItems(shareData, services, items);
    shareExpiry?.classList.remove('short-url');
    const qrcodeContainer = getQrCodeContainer();
    qrcodeContainer.style.display = 'none';
    items!.style.visibility = 'visible';
  });

  eventsManager.addEventListener(input, 'click', function () {
    copyUrl(input?.value);
    input?.select();
  });

  return shareContainer;
};
