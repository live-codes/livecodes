import { allowedOrigin } from './allowed-origin.ts';
import { encodeHTML, getProjectInfo, type PgFunction } from './utils.ts';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 400;
const THUMB_WIDTH = 1200;
const THUMB_HEIGHT = 630;

export const onRequest: PgFunction = async function (context) {
  const request = context.request;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed!', {
      status: 405,
      headers: { allow: 'GET, HEAD' },
    });
  }

  const requestParams = new URL(request.url).searchParams;

  const format = requestParams.get('format');
  if (format != null && format !== 'json') {
    return new Response('Not Implemented!', { status: 501 });
  }

  let url: URL;
  try {
    const urlParam = decodeURIComponent(requestParams.get('url') || '');
    url = new URL(urlParam);
  } catch {
    return new Response('Bad Request!', { status: 400 });
  }

  if (
    (url.protocol !== 'http:' && url.protocol !== 'https:') ||
    !allowedOrigin(url.origin) ||
    (url.pathname !== '/' && url.pathname !== '/index.html')
  ) {
    return new Response('Not Found!', { status: 404 });
  }

  const getSize = (name: string) => {
    const value = Number(requestParams.get(name));
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  };
  const maxWidth = getSize('maxwidth');
  const maxHeight = getSize('maxheight');

  const { title } = await getProjectInfo(url);
  const fullTitle =
    !title || title === 'Untitled Project' ? 'LiveCodes' : title.slice(0, 160) + ' - LiveCodes';

  const width = maxWidth && maxWidth < DEFAULT_WIDTH ? maxWidth : DEFAULT_WIDTH;
  const height = maxHeight && maxHeight < DEFAULT_HEIGHT ? maxHeight : DEFAULT_HEIGHT;
  const thumbnailWidth = maxWidth && maxWidth < THUMB_WIDTH ? maxWidth : THUMB_WIDTH;
  const propHeight = Math.round(thumbnailWidth * (THUMB_HEIGHT / THUMB_WIDTH));
  const thumbnailHeight = maxHeight && maxHeight < propHeight ? maxHeight : propHeight;

  const body = {
    type: 'rich',
    version: '1.0',
    provider_name: 'LiveCodes',
    provider_url: 'https://livecodes.io',
    title: fullTitle,
    width,
    height,
    thumbnail_url: url.origin + '/livecodes/assets/images/oembed.png',
    thumbnail_width: thumbnailWidth,
    thumbnail_height: thumbnailHeight,
    cache_age: 3600,
    html: `<iframe
        src="${url.href}"
        title="${encodeHTML(fullTitle)}"
        loading="lazy"
        scrolling="no"
        allowfullscreen
        height="${height}"
        style="border: 1px solid black; border-radius: 6px; width: 100%;${
          maxWidth ? ' max-width: ' + maxWidth + 'px;' : ''
        }"
      ></iframe>`,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=3600',
    },
  });
};
