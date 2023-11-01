/* eslint-disable camelcase */
/// <reference path="../node_modules/@cloudflare/workers-types/index.d.ts" />

import { getProjectInfo } from './utils';

type Env = Record<'API_TOKEN', string>;
type Data = Record<string, unknown>;
type PgFunction = PagesFunction<Env, 'id', Data>;

export const onRequest: PgFunction = async function (context) {
  const request = context.request;
  let url: URL;

  try {
    const urlParam = decodeURIComponent(new URL(request.url).searchParams.get('url') || '');
    url = new URL(urlParam);
  } catch {
    return new Response('Bad Request!', { status: 400 });
  }
  if (request.method !== 'GET') {
    return new Response('Bad Request!', { status: 400 });
  }
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return new Response('Not Found!', { status: 404 });
  }
  if (url.searchParams.get('format') != null && url.searchParams.get('format') !== 'json') {
    return new Response('Not Implemented!', { status: 501 });
  }

  const { title } = await getProjectInfo(url);
  const maxWidth = Number(url.searchParams.get('maxwidth'));
  const maxHeight = Number(url.searchParams.get('maxheight'));
  const thumbnailWidth = maxWidth && maxWidth < 1200 ? maxWidth : 1200;
  const propHeight = maxWidth ? maxWidth * (630 / 1200) : 630;
  const thumbnailHeight = maxHeight && maxHeight < propHeight ? maxHeight : propHeight;

  const body = {
    success: true,
    type: 'rich',
    version: '1.0',
    provider_name: 'LiveCodes',
    provider_url: 'https://livecodes.io',
    title: !title || title === 'Untitled Project' ? 'LiveCodes' : title + ' - LiveCodes',
    height: maxHeight && maxHeight < 300 ? String(maxHeight) : '300',
    width: maxWidth && maxWidth < 800 ? String(maxWidth) : '800',
    thumbnail_width: String(thumbnailWidth),
    thumbnail_height: String(thumbnailHeight),
    thumbnail_url: url.origin + '/livecodes/assets/images/livecodes-text-logo.png',
    html: `<iframe
        src="${url.href}"
        scrolling="no"
        height="300"
        style="border: 1px solid black; border-radius: 5px; width: 100%;${
          maxWidth ? ' max-width: ' + maxWidth + 'px;' : ''
        }${maxHeight ? ' max-height: ' + maxHeight + 'px;' : ''}"
      ></iframe>`,
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
