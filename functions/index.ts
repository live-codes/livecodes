import { encodeHTML, getProjectInfo, type Context, type PgFunction } from './utils.ts';

export const onRequest: PgFunction = async function (context) {
  const { request, env } = context;
  const originalResponse = await env.ASSETS.fetch(request);
  const cf = (request as any).cf;

  // server-side analytics
  const data = {
    url: request.url,
    resource: 'app',
    method: request.method,
    date: String(new Date()),

    colo: cf?.colo,
    country: cf?.country,
    httpProtocol: cf?.httpProtocol,
    city: cf?.city,
    continent: cf?.continent,
    region: cf?.region,
    regionCode: cf?.regionCode,
    timezone: cf?.timezone,

    accept: request.headers.get('accept'),
    'accept-encoding': request.headers.get('accept-encoding'),
    'accept-language': request.headers.get('accept-language'),
    referer: request.headers.get('referer'),
    'sec-ch-ua': request.headers.get('sec-ch-ua'),
    'sec-ch-ua-mobile': request.headers.get('sec-ch-ua-mobile'),
    'sec-ch-ua-platform': request.headers.get('sec-ch-ua-platform'),
    'sec-fetch-dest': request.headers.get('sec-fetch-dest'),
    'sec-fetch-mode': request.headers.get('sec-fetch-mode'),
    'sec-fetch-site': request.headers.get('sec-fetch-site'),
    'user-agent': request.headers.get('user-agent'),
  };

  try {
    // oEmbed & meta tags
    const url = new URL(request.url);
    const oembedUrl = encodeURIComponent(url.href);
    const { title, description } = await getProjectInfo(url);

    const modifiedBody = (await originalResponse.text())
      .replace(
        `href="oembed?url=https%3A%2F%2Flivecodes.io&format=json"`,
        `href="${url.origin}/oembed?url=${oembedUrl}&format=json"`,
      )
      .replace(
        /title" content="LiveCodes"/g,
        `title" content="${
          !title || title === 'Untitled Project' ? 'LiveCodes' : encodeHTML(title) + ' - LiveCodes'
        }"`,
      )
      .replace(
        /content="A Code Playground That Just Works!"/g,
        `content="${
          !title && !description
            ? 'A Code Playground That Just Works!'
            : encodeHTML(description || 'A project on LiveCodes.')
        }"`,
      )
      .replace(/content="https:\/\/livecodes.io\/"/g, `content="${request.url}"`)
      .replace(/content="https:\/\/livecodes.io\/livecodes/g, `content="${url.origin}/livecodes`);

    const response = new Response(modifiedBody, originalResponse);
    const linkHeader = `<${url.origin}/oembed?url=${oembedUrl}&format=json>; rel="alternate"; type="application/json+oembed"; title="LiveCodes"`;
    response.headers.append('Link', linkHeader);

    context.data = {
      ...data,
      ok: response.ok,
      'content-encoding': response.headers.get('content-encoding'),
      'content-type': response.headers.get('content-type'),
      status: response.status,
      statusText: response.statusText,
    };

    context.waitUntil(logToAPI(context));
    return response;
  } catch (err: any) {
    context.data = {
      ...data,
      ok: false,
      error: err.message || err,
    };

    context.waitUntil(logToAPI(context));
    return originalResponse;
  }
};

export const logToAPI = (context: Context) => {
  const { data, env } = context;
  let logUrl = 'https://api2.livecodes.io/log';
  const customLogUrl = (env as any).LOG_URL;
  if (customLogUrl) {
    try {
      logUrl = new URL(customLogUrl).href;
    } catch {
      return Promise.resolve();
    }
  }
  return fetch(logUrl, {
    method: 'POST',
    headers: {
      'API-Token': env.API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'analytics',
      data,
    }),
  }).catch(() => {
    //
  });
};
