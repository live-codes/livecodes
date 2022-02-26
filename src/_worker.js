export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = env.ASSETS.fetch(request);
    response.headers.append('x-workers-hello', 'Hello from Cloudflare Workers');
    response.headers.append('x-myurl', url.href);
    return response;
  },
};
