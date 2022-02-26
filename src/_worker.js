export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');
    newResponse.headers.append('x-myurl', url.href);
    return newResponse;
  },
};
