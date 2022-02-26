export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const response = await env.ASSETS.fetch(request);
  const newResponse = new Response(response.body, response);
  newResponse.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');
  newResponse.headers.append('x-myurl', url.href);
  return newResponse;
}
