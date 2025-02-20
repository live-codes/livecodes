import { shareScreen } from '../html';
import type { EventsManager, ShareData } from '../models';
import { allowedOrigin } from '../services/allowed-origin';
import { copyToClipboard } from '../utils/utils';
import { generateQrCode } from './qrcode';
import { getQrCodeContainer } from './selectors';

interface Service {
  name: string;
  icon: string;
  createShareUrl?: (options: ShareData) => string;
  onClick?: (options: ShareData) => void;
}

const encode = encodeURIComponent;

export const createShareContainer = async (
  shareFn: (shortUrl: boolean, permanentUrl: boolean) => Promise<ShareData>,
  baseUrl: string,
  eventsManager: EventsManager,
) => {
  let messageTimeout: any;
  const copyUrl = (url?: string) => {
    if (!url || !copyToClipboard(url)) {
      setMessage(
        window.deps.translateString('share.error.failedToCopy', 'Copy to clipboard failed!'),
      );
    }
    setMessage(window.deps.translateString('share.copy.copied', 'URL copied to clipboard'));
    messageTimeout = setTimeout(() => {
      setMessage(window.deps.translateString('share.copy.clickToCopy', 'Click to copy'));
    }, 5000);
  };

  const showQrCode = async () => {
    const qrcodeContainer = getQrCodeContainer();
    items!.style.visibility = 'hidden';
    qrcodeContainer.style.display = 'flex';
    // TODO: fix qrcodeImg is not assigned
    if (qrcodeImg) {
      shareExpiry?.classList.add('short-url');
      if (input && shareDataShort) {
        input.value = shareDataShort.url;
      }
      return;
    }
    if (!shareDataShort) {
      await generateShortUrl();
    }
    if (!shareDataShort) return;

    await generateQrCode({
      container: qrcodeContainer,
      url: shareDataShort.url,
      title: shareDataShort.title,
      logo: baseUrl + 'assets/images/livecodes-logo.svg',
    });
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
        <i class="${service.icon}"
          alt="${service.name}"
          ${service.name === window.deps.translateString('share.services.twitter', '𝕏 / Twitter') ? 'class="twitter"' : ''}
        ></i>
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

      if (
        service.name === window.deps.translateString('share.services.share', 'Share via …') &&
        !navigator.share
      ) {
        item.remove();
      }
    });

    if (input) {
      input.value = shareData.url;
    }
    setMessage(window.deps.translateString('share.copy.clickToCopy', 'Click to copy'));
  };

  const services: Service[] = [
    {
      name: window.deps.translateString('share.services.facebook', 'Facebook'),
      icon: 'icon-share-facebook',
      createShareUrl: ({ url }) => `https://www.facebook.com/sharer.php?u=${encode(url)}`,
    },
    {
      name: window.deps.translateString('share.services.twitter', '𝕏 / Twitter'),
      icon: 'icon-share-x',
      createShareUrl: ({ url, title }) =>
        `https://twitter.com/intent/tweet?url=${encode(url)}&text=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.hackerNews', 'Hacker News'),
      icon: 'icon-share-hacker',
      createShareUrl: ({ url, title }) =>
        `https://news.ycombinator.com/submitlink?u=${encode(url)}&t=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.reddit', 'Reddit'),
      icon: 'icon-share-reddit',
      createShareUrl: ({ url, title }) =>
        `https://www.reddit.com/submit?url=${encode(url)}&title=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.linkedIn', 'LinkedIn'),
      icon: 'icon-share-linkedin',
      createShareUrl: ({ url, title }) =>
        `https://www.linkedin.com/shareArticle?url=${encode(url)}&title=${encode(
          title,
        )}&mini=true&source=LiveCodes`,
    },
    {
      name: window.deps.translateString('share.services.devTo', 'Dev.to'),
      icon: 'icon-share-dev',
      createShareUrl: ({ url, title }) =>
        `https://dev.to/new?prefill=${encode(
          '---\ntitle: ' + title + '\npublished: true\ntags: livecodes\n---\n\n\n\n' + url,
        )}`,
    },
    {
      name: window.deps.translateString('share.services.tumblr', 'Tumblr'),
      icon: 'icon-share-tumblr',
      createShareUrl: ({ url, title }) =>
        `https://www.tumblr.com/share/link?url=${encode(url)}&name=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.pinterest', 'Pinterest'),
      icon: 'icon-share-pinterest',
      createShareUrl: ({ url, title }) =>
        `https://pinterest.com/pin/create/bookmarklet/?url=${encode(url)}&description=${encode(
          title,
        )}`,
    },
    {
      name: window.deps.translateString('share.services.whatsApp', 'WhatsApp'),
      icon: 'icon-share-whatsapp',
      createShareUrl: ({ url, title }) =>
        `https://api.whatsapp.com/send?text=${encode(title)} ${encode(url)}`,
    },
    {
      name: window.deps.translateString('share.services.telegram', 'Telegram'),
      icon: 'icon-share-telegram',
      createShareUrl: ({ url, title }) =>
        `https://t.me/share/url?url=${encode(url)}&text=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.pocket', 'Pocket'),
      icon: 'icon-share-pocket',
      createShareUrl: ({ url, title }) =>
        `https://getpocket.com/save?url=${encode(url)}&title=${encode(title)}`,
    },
    {
      name: window.deps.translateString('share.services.email', 'Email'),
      icon: 'icon-share-email',
      createShareUrl: ({ url, title }) => `mailto:?subject=${encode(title)}&body=${encode(url)}`,
    },
    {
      name: window.deps.translateString('share.services.qrCode', 'QR code'),
      icon: 'icon-share-qr',
      onClick: showQrCode,
    },
    {
      name: window.deps.translateString('share.services.share', 'Share via …'),
      icon: 'icon-share',
      onClick: ({ url, title }) => navigator.share({ url, title }),
    },
  ];

  const selfHosted = !allowedOrigin();
  const div = document.createElement('div');

  let shareData = await shareFn(false, false);
  let shareDataShort: ShareData;
  let qrcodeImg: string;

  const urlLength = shareData.url.length;
  div.innerHTML = shareScreen
    .replace(/{{urlLength}}/g, String(urlLength))
    .replace(/{{warnClass}}/g, urlLength > 2048 ? 'danger' : 'warn');

  const shareContainer = div.firstChild as HTMLElement;
  if (selfHosted) {
    (shareContainer.querySelector('#share-expiry') as HTMLElement).outerHTML = '';
  } else {
    (shareContainer.querySelector('#share-expiry-self-hosted') as HTMLElement).outerHTML = '';
  }
  const items = shareContainer.querySelector<HTMLElement>('#share-links');
  const permanentUrlCheckbox = shareContainer.querySelector(
    '#share-permanent-url-checkbox',
  ) as HTMLInputElement;
  const clickToCopy = shareContainer.querySelector('#share-click-to-copy') as HTMLElement;
  const input = shareContainer.querySelector<HTMLInputElement>('#share-url-input');
  const shareExpiry = shareContainer.querySelector<HTMLElement>('.share-expiry');
  const shortUrlLink = shareExpiry?.querySelector('.share-encoded-url-expiry a') as HTMLElement;
  const encodedUrlLink = shareExpiry?.querySelector('.share-short-url-expiry a') as HTMLElement;

  const charactersSpan = shareExpiry?.querySelector(
    '.share-encoded-url-expiry span',
  ) as HTMLElement;
  charactersSpan.dataset.i18nInterpolation = JSON.stringify({ urlLength });

  const setMessage = (message: string) => {
    if (!clickToCopy) return;
    clearTimeout(messageTimeout);
    clickToCopy.innerHTML = message;
  };

  populateItems(shareData, services, items);

  const generateShortUrl = async (event?: Event) => {
    event?.preventDefault();
    setMessage(window.deps.translateString('share.generateURL', 'Generating URL …'));
    try {
      shareDataShort = shareDataShort || (await shareFn(true, permanentUrlCheckbox.checked));
      populateItems(shareDataShort, services, items);
      shareExpiry?.classList.add('short-url');
    } catch {
      setMessage(
        window.deps.translateString(
          'share.error.failedToGenerateURL',
          'Failed to generate short URL!',
        ),
      );
    }
  };

  eventsManager.addEventListener(shortUrlLink, 'click', generateShortUrl);

  eventsManager.addEventListener(encodedUrlLink, 'click', (event: Event) => {
    event.preventDefault();
    populateItems(shareData, services, items);
    shareExpiry?.classList.remove('short-url');
    const qrcodeContainer = getQrCodeContainer();
    qrcodeContainer.style.display = 'none';
    items!.style.visibility = 'visible';
  });

  eventsManager.addEventListener(permanentUrlCheckbox, 'change', async () => {
    shareData = await shareFn(false, permanentUrlCheckbox.checked);
    if (shareDataShort) {
      shareDataShort = await shareFn(true, permanentUrlCheckbox.checked);
    }
    const data = shareExpiry?.classList.contains('short-url') ? shareDataShort : shareData;
    populateItems(data, services, items);
  });

  eventsManager.addEventListener(input, 'click', function () {
    copyUrl(input?.value);
    input?.select();
  });

  eventsManager.addEventListener(clickToCopy, 'click', function (ev) {
    ev.preventDefault();
    copyUrl(input?.value);
    input?.select();
  });

  return shareContainer;
};
