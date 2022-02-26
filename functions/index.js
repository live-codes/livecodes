export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const oembedUrl = encodeURIComponent(url.href);
  const originalResponse = await env.ASSETS.fetch(request);
  const modifiedBody = (await originalResponse.text()).replace(
    'href="https://api.livecodes.io/oembed?url=https%3A%2F%2Flivecodes.io&format=json"',
    `href="https://api.livecodes.io/oembed?url=${oembedUrl}&format=json"`,
  );
  const response = new Response(modifiedBody, originalResponse);
  const linkHeader = `<https://api.livecodes.io/oembed?url=${oembedUrl}&format=json>; rel="alternate"; type="application/json+oembed"; title="LiveCodes oEmbed"`;
  response.headers.append('Link', linkHeader);
  return response;
}
