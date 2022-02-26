export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const res = await env.ASSETS.fetch(request);
  const response = new Response(res.body, res);
  const oembedUrl = encodeURIComponent(url.href);
  const linkHeader = `<https://api.livecodes.io/oembed?url=${oembedUrl}&format=json>; rel="alternate"; type="application/json+oembed"; title="LiveCodes oEmbed"`;
  response.headers.append('Link', linkHeader);
  return response;
}
