export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const response = await fetch(request);
  const newResponse = new Response(response.body, response);
  newResponse.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');
  newResponse.headers.append('x-myurl', url.href);
  return newResponse;
}
